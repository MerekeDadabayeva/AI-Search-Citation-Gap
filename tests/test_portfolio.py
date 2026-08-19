import unittest

from src.scraper.ingestion import DeterministicScraper
from src.engine.diff_engine import ZeroExtrapolationGapEngine
from src.engine.portfolio_engine import PortfolioAggregator
from src.utils.presets import (
    PRESETS,
    PORTFOLIO_DEMO_BRAND_URL,
    PORTFOLIO_DEMO_BRAND_HTML,
    PORTFOLIO_DEMO_PROMPTS,
)


def _run_portfolio_demo():
    """Helper: replay the deterministic portfolio demo fixture end-to-end."""
    results = []
    for row in PORTFOLIO_DEMO_PROMPTS:
        brand_payload = DeterministicScraper.parse_html(
            html=PORTFOLIO_DEMO_BRAND_HTML,
            url=PORTFOLIO_DEMO_BRAND_URL,
            domain="our-saas-crm.io",
        )
        comp_payload = DeterministicScraper.parse_html(
            html=row["competitor_html"],
            url=row["competitor_url"],
            domain=row["competitor_url"].split("//")[-1].split("/")[0],
        )
        result = ZeroExtrapolationGapEngine.execute_diff(
            query=row["query"],
            brand_payload=brand_payload,
            competitor_payload=comp_payload,
            execution_time_ms=10.0,
        )
        results.append(result)
    return results


class TestPortfolioEngine(unittest.TestCase):
    def test_aggregate_empty_returns_safe_default(self):
        portfolio = PortfolioAggregator.aggregate(brand_domain="our-saas-crm.io", results=[])
        self.assertEqual(portfolio.total_prompts_analyzed, 0)
        self.assertEqual(portfolio.recurring_gaps, [])
        self.assertIn("No prompts analyzed", portfolio.bulk_markdown_brief)

    def test_aggregate_counts_prompts_and_competitors(self):
        results = _run_portfolio_demo()
        portfolio = PortfolioAggregator.aggregate(brand_domain="our-saas-crm.io", results=results)

        self.assertEqual(portfolio.total_prompts_analyzed, 3)
        self.assertEqual(portfolio.total_distinct_competitors, 3)
        self.assertEqual(len(portfolio.prompts), 3)

    def test_recurring_gap_detected_across_all_three_prompts(self):
        results = _run_portfolio_demo()
        portfolio = PortfolioAggregator.aggregate(brand_domain="our-saas-crm.io", results=results)

        self.assertGreater(len(portfolio.recurring_gaps), 0)
        top = portfolio.recurring_gaps[0]
        self.assertGreaterEqual(top.recurrence_count, 2)
        self.assertLessEqual(top.recurrence_count, portfolio.total_prompts_analyzed)
        self.assertGreater(top.priority_score, 0)

    def test_recurring_gaps_are_ranked_by_priority_score_desc(self):
        results = _run_portfolio_demo()
        portfolio = PortfolioAggregator.aggregate(brand_domain="our-saas-crm.io", results=results)

        scores = [g.priority_score for g in portfolio.recurring_gaps]
        self.assertEqual(scores, sorted(scores, reverse=True))

    def test_gap_key_deduplicates_same_schema_type_across_prompts(self):
        results = _run_portfolio_demo()
        portfolio = PortfolioAggregator.aggregate(brand_domain="our-saas-crm.io", results=results)

        gap_keys = [g.gap_key for g in portfolio.recurring_gaps]
        self.assertEqual(len(gap_keys), len(set(gap_keys)), "gap_key must be unique per recurring insight")

    def test_bulk_markdown_brief_lists_all_recurring_gaps(self):
        results = _run_portfolio_demo()
        portfolio = PortfolioAggregator.aggregate(brand_domain="our-saas-crm.io", results=results)

        for insight in portfolio.recurring_gaps:
            self.assertIn(insight.display_name, portfolio.bulk_markdown_brief)

    def test_top_n_limits_result_size(self):
        results = _run_portfolio_demo()
        portfolio = PortfolioAggregator.aggregate(brand_domain="our-saas-crm.io", results=results, top_n=2)
        self.assertLessEqual(len(portfolio.recurring_gaps), 2)


if __name__ == "__main__":
    unittest.main()
