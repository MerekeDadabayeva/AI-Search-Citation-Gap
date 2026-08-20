/**
 * Data contracts for Peec AI Citation Gap Engine (TypeScript / Astro)
 */

export interface ScrapedPayload {
  url: string;
  domain: string;
  statusCode: number;
  isFallback: boolean;
  isSnapshotFallback?: boolean;
  snapshotSource?: string;
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
  verified: boolean;
}

export interface BenchmarkGap {
  metricName: string;
  competitorValue: string;
  brandValue: string;
  competitorEvidence: string;
  sourceUrl: string;
  recommendation: string;
  verified: boolean;
}

export interface EntityGap {
  entityName: string;
  category: string;
  citationWeight: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  searchRelevance: string;
  actionPlan: string;
  verified: boolean;
}

export interface QueryIntent {
  intentKey: string;
  title: string;
  description: string;
  brandCovered: boolean;
  compCovered: boolean;
  evidence: string;
  recommendation: string;
}

export type TargetEngine = 'chatgpt' | 'perplexity' | 'gemini';

export interface EngineSpecificAdvice {
  engine: TargetEngine;
  name: string;
  badge: string;
  geoFocus: string;
  keyRankingSignal: string;
  strategicAdvice: string;
  schemaWeightMultiplier: number;
  benchmarkWeightMultiplier: number;
}

export interface DataSanitizationMetrics {
  rawDomBytes: number;
  sanitizedBytes: number;
  tokenSavingsPercent: number;
  rawEstimatedTokens: number;
  sanitizedEstimatedTokens: number;
  estimatedLatencyMs: number;
  cogsSavingsPercent: number;
}

export interface RemediationBrief {
  title?: string;
  targetQuery?: string;
  targetBrand?: string;
  competitorBrand?: string;
  promptQuery?: string;
  brandDomain?: string;
  competitorDomain?: string;
  currentCitationShareBrand?: string;
  currentCitationShareCompetitor?: string;
  executiveSummary: string;
  missingSchemasSummary?: string[];
  benchmarkComparisonTable?: string;
  topicEntitiesCoverage?: string[];
  suggestedPageSections?: string[];
  markdownContent: string;
  generatedAt: string;
}

export interface JiraTicket {
  ticketKey: string;
  summary: string;
  issueType?: string;
  storyPoints: number;
  priority?: string;
  component?: string;
  assigneeRole?: string;
  gherkinScenarios?: string;
  v1InScope?: string[];
  v1ScopeLimits?: string[];
  definitionOfDone?: string[];
  jiraMarkdown: string;
  generatedAt: string;
}

export interface CitationGapResult {
  query: string;
  brandPayload: ScrapedPayload;
  competitorPayload: ScrapedPayload;
  schemaGaps: SchemaGap[];
  benchmarkGaps: BenchmarkGap[];
  entityGaps: EntityGap[];
  queryIntents: QueryIntent[];
  targetEngine: TargetEngine;
  engineAdvice: EngineSpecificAdvice;
  sanitizationMetrics: DataSanitizationMetrics;
  marketerBrief: RemediationBrief;
  engineeringJira: JiraTicket;
  executionTimeMs: number;
  isCached: boolean;
  isFallback: boolean;
  isCORSBlockedFallback: boolean;
  corsMessage?: string;
  dataQuality: 'live_both' | 'live_partial' | 'snapshot_verified' | 'fallback_heuristic';
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

export interface PerPromptBreakdown {
  query: string;
  competitorUrl: string;
  competitorDomain: string;
  schemaGapsCount: number;
  benchmarkGapsCount: number;
  entityGapsCount: number;
  topMissingSchema: string;
  status: 'AUDITED' | 'CRITICAL_GAPS';
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
  readyCodeSnippet: string;
  lossReasonSummary: string;
  priorityScore: number;
}

export interface PortfolioAnalysisResult {
  brandDomain: string;
  totalPromptsAnalyzed: number;
  totalDistinctCompetitors: number;
  prompts: string[];
  perPromptBreakdowns: PerPromptBreakdown[];
  recurringGaps: RecurringGapInsight[];
  bulkMarkdownBrief: string;
  sprintJiraBacklog: string;
  timestamp: string;
}

