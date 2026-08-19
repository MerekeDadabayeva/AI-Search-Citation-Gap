"""
Portfolio Aggregator for Peec AI Citation Gap Engine.
Aggregates N independent CitationGapResults to identify recurring gap patterns across prompts.
"""

from typing import List, Dict
from src.models.schemas import (
    CitationGapResult,
    RecurringGapInsight,
    PortfolioAnalysisResult,
)


class PortfolioAggregator:
    """
    Rolls up N independent CitationGapResults, groups gaps by unique stable keys,
    computes priority scores based on recurrence across prompts and citation weights,
    and produces a comprehensive bulk remediation markdown brief.
    """

    WEIGHT_MULTIPLIERS = {
        "CRITICAL": 3.0,
        "HIGH": 2.0,
        "MEDIUM": 1.0,
    }

    @classmethod
    def aggregate(
        cls,
        brand_domain: str,
        results: List[CitationGapResult],
        top_n: int = 10,
    ) -> PortfolioAnalysisResult:
        if not results:
            return PortfolioAnalysisResult(
                brand_domain=brand_domain,
                total_prompts_analyzed=0,
                total_distinct_competitors=0,
                prompts=[],
                recurring_gaps=[],
                bulk_markdown_brief="# Peec AI Portfolio Remediation Brief\n\nNo prompts analyzed.",
            )

        total_prompts = len(results)
        distinct_competitors = set()
        prompts_list = []

        # Key -> Aggregation accumulator
        # gap_key: { 'gap_type', 'display_name', 'citation_weight', 'prompts': set(), 'competitor_urls': set(), 'recs': [] }
        accumulator: Dict[str, Dict] = {}

        for res in results:
            prompts_list.append(res.query)
            comp_domain = res.competitor_payload.domain
            distinct_competitors.add(comp_domain)
            comp_url = res.competitor_payload.url

            # 1. Process Schema Gaps
            for sg in res.schema_gaps:
                key = f"schema:{sg.schema_type}"
                if key not in accumulator:
                    accumulator[key] = {
                        "gap_key": key,
                        "gap_type": "Schema Markup",
                        "display_name": f"Schema @type {sg.schema_type}",
                        "citation_weight": "CRITICAL",
                        "prompts": set(),
                        "competitor_urls": set(),
                        "recs": [],
                    }
                accumulator[key]["prompts"].add(res.query)
                accumulator[key]["competitor_urls"].add(comp_url)
                if sg.impact_reason and sg.impact_reason not in accumulator[key]["recs"]:
                    accumulator[key]["recs"].append(sg.impact_reason)

            # 2. Process Benchmark Gaps
            for bg in res.benchmark_gaps:
                key = f"benchmark:{bg.metric_name.lower().strip()}"
                if key not in accumulator:
                    accumulator[key] = {
                        "gap_key": key,
                        "gap_type": "Benchmark / Metric",
                        "display_name": f"Metric: {bg.metric_name}",
                        "citation_weight": "HIGH",
                        "prompts": set(),
                        "competitor_urls": set(),
                        "recs": [],
                    }
                accumulator[key]["prompts"].add(res.query)
                accumulator[key]["competitor_urls"].add(comp_url)
                if bg.recommendation and bg.recommendation not in accumulator[key]["recs"]:
                    accumulator[key]["recs"].append(bg.recommendation)

            # 3. Process Entity Gaps
            for eg in res.entity_gaps:
                key = f"entity:{eg.entity_name.lower().strip()}"
                weight = eg.citation_weight or "HIGH"
                if key not in accumulator:
                    accumulator[key] = {
                        "gap_key": key,
                        "gap_type": "Topic Entity",
                        "display_name": f"Entity: {eg.entity_name}",
                        "citation_weight": weight,
                        "prompts": set(),
                        "competitor_urls": set(),
                        "recs": [],
                    }
                accumulator[key]["prompts"].add(res.query)
                accumulator[key]["competitor_urls"].add(comp_url)
                if eg.action_plan and eg.action_plan not in accumulator[key]["recs"]:
                    accumulator[key]["recs"].append(eg.action_plan)

        insights: List[RecurringGapInsight] = []
        for key, data in accumulator.items():
            recurrence = len(data["prompts"])
            weight = data["citation_weight"]
            multiplier = cls.WEIGHT_MULTIPLIERS.get(weight, 1.0)
            score = round(recurrence * multiplier, 2)

            rep_rec = "; ".join(data["recs"][:2]) if data["recs"] else "Add missing content or schema definition."

            insights.append(
                RecurringGapInsight(
                    gap_key=key,
                    gap_type=data["gap_type"],
                    display_name=data["display_name"],
                    citation_weight=weight,
                    recurrence_count=recurrence,
                    total_prompts_analyzed=total_prompts,
                    affected_prompts=sorted(list(data["prompts"])),
                    example_competitor_urls=sorted(list(data["competitor_urls"])),
                    representative_recommendation=rep_rec,
                    priority_score=score,
                )
            )

        # Sort descending by priority_score, then recurrence_count
        insights.sort(key=lambda x: (x.priority_score, x.recurrence_count), reverse=True)
        insights = insights[:top_n]

        bulk_brief = cls._generate_bulk_brief(brand_domain, total_prompts, len(distinct_competitors), insights)

        return PortfolioAnalysisResult(
            brand_domain=brand_domain,
            total_prompts_analyzed=total_prompts,
            total_distinct_competitors=len(distinct_competitors),
            prompts=prompts_list,
            recurring_gaps=insights,
            bulk_markdown_brief=bulk_brief,
        )

    @classmethod
    def _generate_bulk_brief(
        cls,
        brand_domain: str,
        total_prompts: int,
        total_comps: int,
        insights: List[RecurringGapInsight],
    ) -> str:
        md = f"# 📦 Peec AI Portfolio Remediation Brief: {brand_domain}\n\n"
        md += f"* **Target Brand:** `{brand_domain}`\n"
        md += f"* **Monitored Prompts Analyzed:** `{total_prompts}`\n"
        md += f"* **Distinct Winning Competitors:** `{total_comps}`\n"
        md += f"* **Top Recurring Gaps Identified:** `{len(insights)}`\n\n"
        md += "---\n\n## 📌 Executive Summary (High-Leverage Fixes)\n\n"
        md += (
            f"Across {total_prompts} monitored AI search prompts where `{brand_domain}` is losing citations, "
            f"the following recurring gaps represent the highest-leverage remediation actions. "
            f"Fixing these elements once on the core landing page will simultaneously improve visibility across multiple prompt clusters.\n\n"
        )

        md += "## 🎯 Ranked Recurring Fixes (Fix This Once, Win Multiple Prompts)\n\n"
        for idx, g in enumerate(insights, start=1):
            pct = round(100 * g.recurrence_count / g.total_prompts_analyzed) if g.total_prompts_analyzed else 0
            md += f"### #{idx} · {g.display_name} (`{g.citation_weight}` Priority)\n\n"
            md += f"* **Recurrence:** Appears on **{g.recurrence_count}/{g.total_prompts_analyzed} prompts ({pct}%)**\n"
            md += f"* **Priority Score:** `{g.priority_score}`\n"
            md += f"* **Affected Prompts:**\n"
            for p in g.affected_prompts:
                md += f"  - *\"{p}\"*\n"
            md += f"* **Seen on Competitor Pages:** {', '.join(f'[{u}]({u})' for u in g.example_competitor_urls)}\n"
            md += f"* **Action Required:** {g.representative_recommendation}\n\n"

        return md
