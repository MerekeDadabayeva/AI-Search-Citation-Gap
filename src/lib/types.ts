/**
 * Data contracts for Peec AI Citation Gap Engine (TypeScript / Astro)
 */

export interface ScrapedPayload {
  url: string;
  domain: string;
  statusCode: number;
  isFallback: boolean;
  contentLengthChars: number;
  title: string;
  metaDescription: string;
  h1Tags: string[];
  h2Tags: string[];
  cleanedText: string;
  rawHtmlSnippet: string;
  jsonLdSchemas: any[];
  schemaTypes: string[];
  extractedStatistics: string[];
  pricingClaims: string[];
  complianceBadges: string[];
  detectedEntities: string[];
  fetchTimestamp: string;
}

export interface SchemaGap {
  schemaType: string;
  status: 'MISSING_ON_BRAND' | 'INCOMPLETE_ATTRIBUTES' | 'MATCHED';
  missingProperties: string[];
  recommendedJsonLd: string;
  impactReason: string;
}

export interface BenchmarkGap {
  metricName: string;
  competitorValue: string;
  brandValue: string;
  competitorEvidence: string;
  sourceUrl: string;
  recommendation: string;
}

export interface EntityGap {
  entityName: string;
  category: string;
  citationWeight: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  searchRelevance: string;
  actionPlan: string;
}

export interface RemediationBrief {
  title: string;
  targetQuery: string;
  brandDomain: string;
  competitorDomain: string;
  executiveSummary: string;
  missingSchemasSummary: string[];
  benchmarkComparisonTable: string;
  topicEntitiesCoverage: string[];
  suggestedPageSections: string[];
  markdownContent: string;
}

export interface JiraTicket {
  ticketKey: string;
  summary: string;
  issueType: string;
  storyPoints: number;
  component: string;
  assigneeRole: string;
  gherkinScenarios: string;
  v1InScope: string[];
  v1ScopeLimits: string[];
  definitionOfDone: string[];
  jiraMarkdown: string;
}

export interface CitationGapResult {
  query: string;
  brandPayload: ScrapedPayload;
  competitorPayload: ScrapedPayload;
  schemaGaps: SchemaGap[];
  benchmarkGaps: BenchmarkGap[];
  entityGaps: EntityGap[];
  marketerBrief: RemediationBrief;
  engineeringJira: JiraTicket;
  executionTimeMs: number;
  isCached: boolean;
  isFallback: boolean;
}

export interface PresetScenario {
  id: string;
  name: string;
  query: string;
  brandUrl: string;
  competitorUrl: string;
  brandData: ScrapedPayload;
  competitorData: ScrapedPayload;
}

export interface RecurringGapInsight {
  gapKey: string;
  gapType: 'Schema Markup' | 'Benchmark / Metric' | 'Topic Entity';
  displayName: string;
  citationWeight: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  recurrenceCount: number;
  totalPromptsAnalyzed: number;
  affectedPrompts: string[];
  exampleCompetitorUrls: string[];
  representativeRecommendation: string;
  priorityScore: number;
}

export interface PortfolioAnalysisResult {
  brandDomain: string;
  totalPromptsAnalyzed: number;
  totalDistinctCompetitors: number;
  prompts: string[];
  recurringGaps: RecurringGapInsight[];
  bulkMarkdownBrief: string;
  timestamp: string;
}
