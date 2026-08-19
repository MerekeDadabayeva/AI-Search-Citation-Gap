import type {
  CitationGapResult,
  RecurringGapInsight,
  PortfolioAnalysisResult,
} from "./types";

export class PortfolioAggregator {
  private static WEIGHT_MULTIPLIERS: Record<string, number> = {
    CRITICAL: 3.0,
    HIGH: 2.0,
    MEDIUM: 1.0,
  };

  static aggregate(
    brandDomain: string,
    results: CitationGapResult[],
    topN: number = 10
  ): PortfolioAnalysisResult {
    if (!results || results.length === 0) {
      return {
        brandDomain,
        totalPromptsAnalyzed: 0,
        totalDistinctCompetitors: 0,
        prompts: [],
        recurringGaps: [],
        bulkMarkdownBrief: `# Peec AI Portfolio Remediation Brief\n\nNo prompts analyzed.`,
        timestamp: new Date().toISOString(),
      };
    }

    const totalPrompts = results.length;
    const distinctCompetitors = new Set<string>();
    const promptsList: string[] = [];

    // Accumulator map: gapKey -> aggregated object
    const accumulator: Map<
      string,
      {
        gapKey: string;
        gapType: 'Schema Markup' | 'Benchmark / Metric' | 'Topic Entity';
        displayName: string;
        citationWeight: 'CRITICAL' | 'HIGH' | 'MEDIUM';
        prompts: Set<string>;
        competitorUrls: Set<string>;
        recs: string[];
      }
    > = new Map();

    for (const res of results) {
      promptsList.push(res.query);
      distinctCompetitors.add(res.competitorPayload.domain);
      const compUrl = res.competitorPayload.url;

      // 1. Process Schema Gaps
      for (const sg of res.schemaGaps) {
        const key = `schema:${sg.schemaType}`;
        if (!accumulator.has(key)) {
          accumulator.set(key, {
            gapKey: key,
            gapType: "Schema Markup",
            displayName: `Schema @type ${sg.schemaType}`,
            citationWeight: "CRITICAL",
            prompts: new Set(),
            competitorUrls: new Set(),
            recs: [],
          });
        }
        const acc = accumulator.get(key)!;
        acc.prompts.add(res.query);
        acc.competitorUrls.add(compUrl);
        if (sg.impactReason && !acc.recs.includes(sg.impactReason)) {
          acc.recs.push(sg.impactReason);
        }
      }

      // 2. Process Benchmark Gaps
      for (const bg of res.benchmarkGaps) {
        const key = `benchmark:${bg.metricName.toLowerCase().trim()}`;
        if (!accumulator.has(key)) {
          accumulator.set(key, {
            gapKey: key,
            gapType: "Benchmark / Metric",
            displayName: `Metric: ${bg.metricName}`,
            citationWeight: "HIGH",
            prompts: new Set(),
            competitorUrls: new Set(),
            recs: [],
          });
        }
        const acc = accumulator.get(key)!;
        acc.prompts.add(res.query);
        acc.competitorUrls.add(compUrl);
        if (bg.recommendation && !acc.recs.includes(bg.recommendation)) {
          acc.recs.push(bg.recommendation);
        }
      }

      // 3. Process Entity Gaps
      for (const eg of res.entityGaps) {
        const key = `entity:${eg.entityName.toLowerCase().trim()}`;
        const weight = eg.citationWeight || "HIGH";
        if (!accumulator.has(key)) {
          accumulator.set(key, {
            gapKey: key,
            gapType: "Topic Entity",
            displayName: `Entity: ${eg.entityName}`,
            citationWeight: weight,
            prompts: new Set(),
            competitorUrls: new Set(),
            recs: [],
          });
        }
        const acc = accumulator.get(key)!;
        acc.prompts.add(res.query);
        acc.competitorUrls.add(compUrl);
        if (eg.actionPlan && !acc.recs.includes(eg.actionPlan)) {
          acc.recs.push(eg.actionPlan);
        }
      }
    }

    const insights: RecurringGapInsight[] = [];
    for (const [key, data] of accumulator.entries()) {
      const recurrence = data.prompts.size;
      const weight = data.citationWeight;
      const multiplier = this.WEIGHT_MULTIPLIERS[weight] || 1.0;
      const score = Math.round(recurrence * multiplier * 10) / 10;
      const repRec = data.recs.length > 0 ? data.recs.slice(0, 2).join("; ") : "Add missing content or schema markup.";

      insights.push({
        gapKey: key,
        gapType: data.gapType,
        displayName: data.displayName,
        citationWeight: weight,
        recurrenceCount: recurrence,
        totalPromptsAnalyzed: totalPrompts,
        affectedPrompts: Array.from(data.prompts).sort(),
        exampleCompetitorUrls: Array.from(data.competitorUrls).sort(),
        representativeRecommendation: repRec,
        priorityScore: score,
      });
    }

    // Sort descending by priorityScore, then recurrenceCount
    insights.sort((a, b) => {
      if (b.priorityScore !== a.priorityScore) {
        return b.priorityScore - a.priorityScore;
      }
      return b.recurrenceCount - a.recurrenceCount;
    });

    const topInsights = insights.slice(0, topN);
    const bulkBrief = this.generateBulkBrief(
      brandDomain,
      totalPrompts,
      distinctCompetitors.size,
      topInsights
    );

    return {
      brandDomain,
      totalPromptsAnalyzed: totalPrompts,
      totalDistinctCompetitors: distinctCompetitors.size,
      prompts: promptsList,
      recurringGaps: topInsights,
      bulkMarkdownBrief: bulkBrief,
      timestamp: new Date().toISOString(),
    };
  }

  private static generateBulkBrief(
    brandDomain: string,
    totalPrompts: int = 0,
    totalComps: number,
    insights: RecurringGapInsight[]
  ): string {
    let md = `# 📦 Peec AI Portfolio Remediation Brief: ${brandDomain}\n\n`;
    md += `* **Target Brand:** \`${brandDomain}\`\n`;
    md += `* **Monitored Prompts Analyzed:** \`${totalPrompts}\`\n`;
    md += `* **Distinct Winning Competitors:** \`${totalComps}\`\n`;
    md += `* **Top Recurring Gaps Identified:** \`${insights.length}\`\n\n`;
    md += `---\n\n## 📌 Executive Summary (High-Leverage Fixes)\n\n`;
    md += `Across ${totalPrompts} monitored AI search prompts where \`${brandDomain}\` is losing citations, the following recurring gaps represent the highest-leverage remediation actions. Fixing these elements once on the core landing page will simultaneously improve visibility across multiple prompt clusters.\n\n`;

    md += `## 🎯 Ranked Recurring Fixes (Fix This Once, Win Multiple Prompts)\n\n`;
    insights.forEach((g, idx) => {
      const pct = g.totalPromptsAnalyzed > 0 ? Math.round((100 * g.recurrenceCount) / g.totalPromptsAnalyzed) : 0;
      md += `### #${idx + 1} · ${g.displayName} (\`${g.citationWeight}\` Priority)\n\n`;
      md += `* **Recurrence:** Appears on **${g.recurrenceCount}/${g.totalPromptsAnalyzed} prompts (${pct}%)**\n`;
      md += `* **Priority Score:** \`${g.priorityScore}\`\n`;
      md += `* **Affected Prompts:**\n`;
      g.affectedPrompts.forEach((p) => {
        md += `  - *"${p}"*\n`;
      });
      md += `* **Seen on Competitor Pages:** ${g.exampleCompetitorUrls.map((u) => `[${u}](${u})`).join(", ")}\n`;
      md += `* **Action Required:** ${g.representativeRecommendation}\n\n`;
    });

    return md;
  }
}
