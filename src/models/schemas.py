"""
Pydantic Data Schemas for Peec AI Citation Gap & Remediation Engine.
Enforces zero-extrapolation and strict data contracts across the pipeline.
"""

from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field
from datetime import datetime


class ScrapedPayload(BaseModel):
    """Primary ingested page payload with deterministic DOM & metadata extractions."""
    url: str = Field(description="Target page URL")
    domain: str = Field(description="Domain name extracted from URL")
    status_code: int = Field(default=200, description="HTTP response status code")
    is_fallback: bool = Field(default=False, description="True if fallback/synthetic domain signals were used")
    fetch_timestamp: str = Field(default_factory=lambda: datetime.utcnow().isoformat() + 'Z')
    content_length_chars: int = Field(default=0, description="Length of extracted text corpus")
    title: str = Field(default="", description="Page title tag")
    meta_description: str = Field(default="", description="Meta description tag")
    h1_tags: List[str] = Field(default_factory=list, description="Primary H1 headings")
    h2_tags: List[str] = Field(default_factory=list, description="Secondary H2 headings")
    cleaned_text: str = Field(default="", description="Sanitized visible text payload")
    raw_html_snippet: str = Field(default="", description="First 2000 characters of raw HTML for inspection drawer")
    json_ld_schemas: List[Dict[str, Any]] = Field(default_factory=list, description="Parsed JSON-LD schema objects")
    schema_types: List[str] = Field(default_factory=list, description="Extracted Schema.org @types (e.g. SoftwareApplication)")
    extracted_statistics: List[str] = Field(default_factory=list, description="Verbatim numbers, percentages, and benchmark claims")
    pricing_claims: List[str] = Field(default_factory=list, description="Extracted pricing tiers, free tier stats, and currency mentions")
    compliance_badges: List[str] = Field(default_factory=list, description="Compliance/security standards (e.g. SOC-2, GDPR, HIPAA)")
    detected_entities: List[str] = Field(default_factory=list, description="Key software entities, integrations, and capabilities")


class SchemaGap(BaseModel):
    """Structured JSON-LD schema delta between brand and winning competitor."""
    schema_type: str = Field(description="Schema.org type (e.g. SoftwareApplication, FAQPage, AggregateRating)")
    status: str = Field(default="MISSING_IN_BRAND", description="Status: MISSING_IN_BRAND | INCOMPLETE | MATCHED")
    competitor_has: bool = Field(default=True, description="Whether the cited competitor implements this schema")
    brand_has: bool = Field(default=False, description="Whether the user brand implements this schema")
    missing_properties: List[str] = Field(default_factory=list, description="List of missing required/recommended schema attributes")
    recommended_json_ld: str = Field(description="Valid, copy-pasteable JSON-LD code block for immediate remediation")
    impact_reason: str = Field(description="How this schema directly influences LLM search citation grounding")


class BenchmarkGap(BaseModel):
    """Verbatim numerical benchmark and metric disparity between competitor and brand."""
    metric_name: str = Field(description="Name of the benchmark or statistic")
    competitor_value: str = Field(description="Exact numerical figure or metric from competitor page")
    brand_value: Optional[str] = Field(default=None, description="Brand value if present, or None if completely missing")
    competitor_evidence: str = Field(description="Verbatim text snippet from competitor payload proving existence")
    source_url: str = Field(description="Direct URL to the cited competitor page for verification")
    recommendation: str = Field(description="Concrete content remediation action for copywriters")


class EntityGap(BaseModel):
    """Topic entity, technical capability, or proof point missing from brand page."""
    entity_name: str = Field(description="Entity or topic name (e.g. Real-time Webhooks, Free Tier Migration)")
    category: str = Field(description="Category: Technical Schema | Feature Depth | Pricing & Commercial | Trust & Compliance")
    competitor_present: bool = Field(default=True)
    brand_present: bool = Field(default=False)
    citation_weight: str = Field(default="HIGH", description="CRITICAL | HIGH | MEDIUM")
    search_engine_relevance: str = Field(description="Why Perplexity, ChatGPT Search, and Gemini favor this entity for citations")
    action_plan: str = Field(description="Specific paragraph or section insertion recommendation")


class RemediationBrief(BaseModel):
    """Track A: Marketer & Content Copywriter 1-Click Markdown Remediation Brief."""
    title: str = Field(description="Title of remediation brief")
    target_prompt: str = Field(description="Target search query monitored in Peec AI")
    brand_url: str = Field(description="User brand URL")
    competitor_url: str = Field(description="Winning competitor citation URL")
    executive_summary: str = Field(description="High-level gap analysis summary")
    schema_recommendations: List[SchemaGap] = Field(default_factory=list)
    benchmark_recommendations: List[BenchmarkGap] = Field(default_factory=list)
    entity_recommendations: List[EntityGap] = Field(default_factory=list)
    suggested_page_sections: List[str] = Field(default_factory=list)
    copywriting_snippets: List[Dict[str, str]] = Field(default_factory=list)
    markdown_content: str = Field(default="", description="Complete exportable Markdown document")


class JiraTicket(BaseModel):
    """Track B: Developer & Engineering Squad Sprint-Ready Jira Story (PEEC-408 / PEEC-102)."""
    ticket_key: str = Field(default="PEEC-408", description="Jira Ticket ID")
    summary: str = Field(description="Jira Ticket Summary")
    epic: str = Field(default="PEEC-EPIC-12 (AI Search Actionability & Remediation)")
    component: str = Field(default="AI-Gateway")
    story_points: int = Field(default=5)
    issue_type: str = Field(default="Story")
    priority: str = Field(default="High")
    reporter: str = Field(default="Mereke Dadabayeva (Product Manager)")
    assignee: str = Field(default="Core Backend / Full-Stack Engineer")
    user_story: str = Field(description="Agile User Story: AS A... I WANT TO... SO THAT...")
    gherkin_scenarios: str = Field(description="Gherkin Acceptance Criteria (Given/When/Then)")
    v1_scope_limits: List[str] = Field(default_factory=list, description="Hard boundaries explicitly excluded from V1 sprint")
    v1_in_scope: List[str] = Field(default_factory=list, description="Deliverables strictly included in V1")
    definition_of_done: List[str] = Field(default_factory=list, description="DoD checklist")
    jira_markdown: str = Field(default="", description="Complete exportable Jira Markdown")


class CitationGapResult(BaseModel):
    """Master output envelope combining ingestion, diffing, and dual-track handoffs."""
    query: str
    brand_url: str
    competitor_url: str
    execution_time_ms: float
    is_cached: bool = False
    is_fallback: bool = False
    timestamp: str = Field(default_factory=lambda: datetime.utcnow().isoformat() + 'Z')
    brand_payload: ScrapedPayload
    competitor_payload: ScrapedPayload
    schema_gaps: List[SchemaGap] = Field(default_factory=list)
    benchmark_gaps: List[BenchmarkGap] = Field(default_factory=list)
    entity_gaps: List[EntityGap] = Field(default_factory=list)
    marketer_brief: RemediationBrief
    engineering_jira: JiraTicket


class RecurringGapInsight(BaseModel):
    """A recurring gap pattern detected across multiple monitored prompts."""
    gap_key: str = Field(description="Unique key (e.g. 'schema:FAQPage', 'entity:SOC-2')")
    gap_type: str = Field(description="'schema' | 'benchmark' | 'entity'")
    display_name: str = Field(description="Human readable gap title")
    citation_weight: str = Field(default="HIGH", description="CRITICAL | HIGH | MEDIUM")
    recurrence_count: int = Field(description="Number of prompts this gap appeared on")
    total_prompts_analyzed: int = Field(description="Total prompts in portfolio")
    affected_prompts: List[str] = Field(default_factory=list)
    example_competitor_urls: List[str] = Field(default_factory=list)
    representative_recommendation: str = Field(default="")
    priority_score: float = Field(description="recurrence_count * weight_multiplier")


class PortfolioAnalysisResult(BaseModel):
    """Aggregated portfolio-level analysis across N prompts."""
    brand_domain: str
    total_prompts_analyzed: int
    total_distinct_competitors: int
    prompts: List[str] = Field(default_factory=list)
    recurring_gaps: List[RecurringGapInsight] = Field(default_factory=list)
    bulk_markdown_brief: str = Field(default="")
    timestamp: str = Field(default_factory=lambda: datetime.utcnow().isoformat() + 'Z')
