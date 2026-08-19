import type {
  CitationGapResult,
  RecurringGapInsight,
  PortfolioAnalysisResult,
  PerPromptBreakdown,
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
        perPromptBreakdowns: [],
        recurringGaps: [],
        bulkMarkdownBrief: `# Peec AI Portfolio Remediation Brief\n\nNo prompts analyzed.`,
        sprintJiraBacklog: `# Jira Sprint Backlog\n\nNo issues generated.`,
        timestamp: new Date().toISOString(),
      };
    }

    const totalPrompts = results.length;
    const distinctCompetitors = new Set<string>();
    const promptsList: string[] = [];
    const perPromptBreakdowns: PerPromptBreakdown[] = [];

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
        codeSnippet: string;
        lossReason: string;
      }
    > = new Map();

    for (const res of results) {
      promptsList.push(res.query);
      const compDomain = res.competitorPayload.domain || "competitor.com";
      distinctCompetitors.add(compDomain);
      const compUrl = res.competitorPayload.url;

      perPromptBreakdowns.push({
        query: res.query,
        competitorUrl: compUrl,
        competitorDomain: compDomain,
        schemaGapsCount: res.schemaGaps.length,
        benchmarkGapsCount: res.benchmarkGaps.length,
        entityGapsCount: res.entityGaps.length,
        topMissingSchema: res.schemaGaps.length > 0 ? res.schemaGaps[0].schemaType : "None",
        status: (res.schemaGaps.length > 0 || res.benchmarkGaps.length > 0) ? "CRITICAL_GAPS" : "AUDITED"
      });

      // 1. Process Schema Gaps
      for (const sg of res.schemaGaps) {
        const key = `schema:${sg.schemaType}`;
        if (!accumulator.has(key)) {
          accumulator.set(key, {
            gapKey: key,
            gapType: "Schema Markup",
            displayName: `Schema.org @type ${sg.schemaType}`,
            citationWeight: "CRITICAL",
            prompts: new Set(),
            competitorUrls: new Set(),
            recs: [],
            codeSnippet: sg.recommendedJsonLd || `<script type="application/ld+json">\n{\n  "@context": "https://schema.org",\n  "@type": "${sg.schemaType}"\n}\n</script>`,
            lossReason: sg.impactReason || "Parsed directly by AI search engines (Perplexity, ChatGPT Search) to ground structured answer cards."
          });
        }
        const acc = accumulator.get(key)!;
        acc.prompts.add(res.query);
        acc.competitorUrls.add(compUrl);
        if (sg.impactReason && !acc.recs.includes(sg.impactReason)) {
          acc.recs.push(sg.impactReason);
        }
        if (sg.recommendedJsonLd && acc.codeSnippet.length < sg.recommendedJsonLd.length) {
          acc.codeSnippet = sg.recommendedJsonLd;
        }
      }

      // 2. Process Benchmark Gaps
      for (const bg of res.benchmarkGaps) {
        const key = `benchmark:${bg.metricName.toLowerCase().trim()}`;
        if (!accumulator.has(key)) {
          accumulator.set(key, {
            gapKey: key,
            gapType: "Benchmark / Metric",
            displayName: `Quantitative Metric: ${bg.metricName}`,
            citationWeight: "HIGH",
            prompts: new Set(),
            competitorUrls: new Set(),
            recs: [],
            codeSnippet: `// Suggested landing page stat insertion:\n"${bg.metricName}: ${bg.competitorValue}"\nRecommendation: ${bg.recommendation}`,
            lossReason: `Competitors explicitly quote "${bg.competitorValue}", giving LLMs hard numerical evidence for comparison queries.`
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
            displayName: `Topic Entity: ${eg.entityName}`,
            citationWeight: weight,
            prompts: new Set(),
            competitorUrls: new Set(),
            recs: [],
            codeSnippet: `<!-- Section Insertion Recommendation: -->\n<h3>${eg.entityName}</h3>\n<p>${eg.actionPlan}</p>`,
            lossReason: eg.searchRelevance || "High search frequency in AI query context graphs."
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
        readyCodeSnippet: data.codeSnippet,
        lossReasonSummary: data.lossReason,
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
      topInsights,
      perPromptBreakdowns
    );

    const jiraBacklog = this.generateJiraBacklog(
      brandDomain,
      topInsights
    );

    return {
      brandDomain,
      totalPromptsAnalyzed: totalPrompts,
      totalDistinctCompetitors: distinctCompetitors.size,
      prompts: promptsList,
      perPromptBreakdowns,
      recurringGaps: topInsights,
      bulkMarkdownBrief: bulkBrief,
      sprintJiraBacklog: jiraBacklog,
      timestamp: new Date().toISOString(),
    };
  }

  private static generateBulkBrief(
    brandDomain: string,
    totalPrompts: number,
    totalComps: number,
    insights: RecurringGapInsight[],
    breakdowns: PerPromptBreakdown[]
  ): string {
    let md = `# 📦 Peec AI Portfolio Remediation Brief: ${brandDomain}\n\n`;
    md += `* **Target Brand:** \`${brandDomain}\`\n`;
    md += `* **Monitored Prompts Analyzed:** \`${totalPrompts}\`\n`;
    md += `* **Distinct Winning Competitors:** \`${totalComps}\`\n`;
    md += `* **Top Recurring Fixes Identified:** \`${insights.length}\`\n\n`;
    md += `---\n\n## 📌 Executive Summary (High-Leverage Fixes)\n\n`;
    md += `Across ${totalPrompts} monitored AI search prompts where \`${brandDomain}\` is losing citations, the following recurring gaps represent the highest-leverage remediation actions. Fixing these core items once on your main landing page resolves citation deficits across multiple prompt clusters.\n\n`;

    md += `## 📋 Per-Prompt Audit Summary\n\n`;
    md += `| # | Monitored Prompt Query | Winning Competitor | Missing Schemas | Status |\n`;
    md += `|---|---|---|---|---|\n`;
    breakdowns.forEach((b, i) => {
      md += `| ${i + 1} | *"${b.query}"* | \`${b.competitorDomain}\` | \`${b.topMissingSchema}\` | ${b.status} |\n`;
    });
    md += `\n---\n\n`;

    md += `## 🎯 Ranked Recurring Fixes (Fix This Once, Win Multiple Prompts)\n\n`;
    insights.forEach((g, idx) => {
      const pct = g.totalPromptsAnalyzed > 0 ? Math.round((100 * g.recurrenceCount) / g.totalPromptsAnalyzed) : 0;
      md += `### #${idx + 1} · ${g.displayName} (\`${g.citationWeight}\` Priority)\n\n`;
      md += `* **Recurrence:** Appears on **${g.recurrenceCount}/${g.totalPromptsAnalyzed} prompts (${pct}%)**\n`;
      md += `* **Priority Score:** \`${g.priorityScore}\`\n`;
      md += `* **Why LLMs Favor Competitors:** ${g.lossReasonSummary}\n`;
      md += `* **Affected Prompts:**\n`;
      g.affectedPrompts.forEach((p) => {
        md += `  - *"${p}"*\n`;
      });
      md += `* **Seen on Competitor Pages:** ${g.exampleCompetitorUrls.map((u) => `[${u}](${u})`).join(", ")}\n`;
      md += `* **Action Required:** ${g.representativeRecommendation}\n\n`;
      md += `**Code / Content Remediation Snippet:**\n\`\`\`html\n${g.readyCodeSnippet}\n\`\`\`\n\n`;
    });

    return md;
  }

  private static generateJiraBacklog(
    brandDomain: string,
    insights: RecurringGapInsight[]
  ): string {
    let md = `h1. Peec AI Remediation Sprint Backlog: ${brandDomain}\n\n`;
    md += `*Epic:* PEEC-EPIC-12 (AI Search Citation Actionability)\n`;
    md += `*Target Brand:* ${brandDomain}\n\n`;

    insights.slice(0, 4).forEach((g, idx) => {
      const key = `PEEC-50${idx + 1}`;
      const points = g.citationWeight === "CRITICAL" ? 5 : (g.citationWeight === "HIGH" ? 3 : 2);
      md += `h2. [${key}] Fix Recurring Gap: ${g.displayName} (${points} Story Points)\n\n`;
      md += `*Issue Type:* Story\n`;
      md += `*Priority:* ${g.citationWeight === "CRITICAL" ? "Highest" : "High"}\n`;
      md += `*Recurrence:* ${g.recurrenceCount}/${g.totalPromptsAnalyzed} prompts\n\n`;
      md += `*User Story:*\n`;
      md += `AS A Growth Marketer / SEO Engineer,\n`;
      md += `I WANT TO implement ${g.displayName} on ${brandDomain},\n`;
      md += `SO THAT our brand wins citations across ${g.recurrenceCount} target AI search queries.\n\n`;
      md += `*Acceptance Criteria (Gherkin):*\n`;
      md += `{code}\n`;
      md += `Given the ${brandDomain} landing page is deployed\n`;
      md += `When Perplexity or ChatGPT crawls the HTML\n`;
      md += `Then ${g.displayName} is explicitly verified in the DOM\n`;
      md += `And citation eligibility increases across monitored prompt clusters.\n`;
      md += `{code}\n\n`;
    });

    return md;
  }
}
