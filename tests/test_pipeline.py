import unittest
import time
from urllib.parse import urlparse

from src.models.schemas import (
    ScrapedPayload,
    SchemaGap,
    BenchmarkGap,
    EntityGap,
    RemediationBrief,
    JiraTicket,
    CitationGapResult
)
from src.scraper.ingestion import DeterministicScraper, ScraperCache
from src.engine.diff_engine import ZeroExtrapolationGapEngine
from src.engine.brief_generator import BriefGenerator
from src.utils.presets import PRESETS, get_preset


class TestPipeline(unittest.TestCase):
    def test_models_instantiation(self):
        payload = ScrapedPayload(
            url="https://test.com",
            domain="test.com",
            title="Test Page",
            meta_description="A test meta description",
            cleaned_text="Test pricing starting at $29/mo with SOC-2 compliance.",
            schema_types=["SoftwareApplication"],
            extracted_statistics=["$29/mo", "99.99% uptime"],
            compliance_badges=["SOC-2 TYPE II"]
        )
        self.assertEqual(payload.domain, "test.com")
        self.assertIn("SoftwareApplication", payload.schema_types)
        self.assertEqual(len(payload.extracted_statistics), 2)

    def test_scraper_parse_html(self):
        sample_html = """<!DOCTYPE html>
<html>
<head>
    <title>SaaS Platform - High Speed API</title>
    <meta name="description" content="Sub-millisecond latency for modern AI apps.">
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "SaaS Platform"
    }
    </script>
</head>
<body>
    <h1>Real-time Event Streaming</h1>
    <p>Starting at $49/user/month with 99.99% uptime SLA. SOC-2 Type II certified and GDPR compliant.</p>
</body>
</html>"""
        payload = DeterministicScraper.parse_html(
            html=sample_html,
            url="https://saas-platform.io/pricing",
            domain="saas-platform.io"
        )
        self.assertEqual(payload.status_code, 200)
        self.assertFalse(payload.is_fallback)
        self.assertIn("SoftwareApplication", payload.schema_types)
        self.assertTrue(any("SOC-2" in b for b in payload.compliance_badges))

    def test_scraper_fallback_on_block(self):
        fallback_payload = DeterministicScraper._generate_fallback_payload(
            url="https://blocked-competitor.com/features",
            domain="blocked-competitor.com",
            status_code=403,
            reason="Cloudflare Bot Management 403"
        )
        self.assertEqual(fallback_payload.status_code, 403)
        self.assertTrue(fallback_payload.is_fallback)
        self.assertIn("SoftwareApplication", fallback_payload.schema_types)
        self.assertGreater(len(fallback_payload.cleaned_text), 0)

    def test_scraper_cache(self):
        cache = ScraperCache(ttl_seconds=2)
        payload = ScrapedPayload(url="https://cache-test.com", domain="cache-test.com")
        cache.set("https://cache-test.com", payload)
        
        cached = cache.get("https://cache-test.com")
        self.assertIsNotNone(cached)
        self.assertEqual(cached.domain, "cache-test.com")
        
        time.sleep(2.1)
        expired = cache.get("https://cache-test.com")
        self.assertIsNone(expired)

    def test_zero_extrapolation_diff_engine(self):
        preset = get_preset("crm_early_stage")
        brand_payload = DeterministicScraper.parse_html(
            html=preset["brand_html"],
            url=preset["brand_url"],
            domain="our-saas-crm.io"
        )
        comp_payload = DeterministicScraper.parse_html(
            html=preset["competitor_html"],
            url=preset["competitor_url"],
            domain="attio.com"
        )
        
        result = ZeroExtrapolationGapEngine.execute_diff(
            query=preset["query"],
            brand_payload=brand_payload,
            competitor_payload=comp_payload,
            execution_time_ms=12.5
        )
        
        self.assertIsInstance(result, CitationGapResult)
        self.assertGreater(len(result.schema_gaps), 0)
        self.assertTrue(any(g.schema_type == "SoftwareApplication" for g in result.schema_gaps))
        self.assertGreater(len(result.benchmark_gaps), 0)
        self.assertGreater(len(result.entity_gaps), 0)
        self.assertLess(result.execution_time_ms, 1500)

    def test_marketer_brief_synthesis(self):
        preset = get_preset("crm_early_stage")
        brand_payload = DeterministicScraper.parse_html(
            html=preset["brand_html"],
            url=preset["brand_url"],
            domain="our-saas-crm.io"
        )
        comp_payload = DeterministicScraper.parse_html(
            html=preset["competitor_html"],
            url=preset["competitor_url"],
            domain="attio.com"
        )
        
        result = ZeroExtrapolationGapEngine.execute_diff(
            query=preset["query"],
            brand_payload=brand_payload,
            competitor_payload=comp_payload
        )
        
        brief = result.marketer_brief
        self.assertIsInstance(brief, RemediationBrief)
        self.assertIn("AI Search Content Remediation Brief", brief.title)
        self.assertIn("Missing JSON-LD Schemas", brief.markdown_content)
        self.assertIn("application/ld+json", brief.markdown_content)
        self.assertGreater(len(brief.suggested_page_sections), 0)

    def test_jira_ticket_synthesis(self):
        preset = get_preset("crm_early_stage")
        brand_payload = DeterministicScraper.parse_html(
            html=preset["brand_html"],
            url=preset["brand_url"],
            domain="our-saas-crm.io"
        )
        comp_payload = DeterministicScraper.parse_html(
            html=preset["competitor_html"],
            url=preset["competitor_url"],
            domain="attio.com"
        )
        
        result = ZeroExtrapolationGapEngine.execute_diff(
            query=preset["query"],
            brand_payload=brand_payload,
            competitor_payload=comp_payload
        )
        
        jira = result.engineering_jira
        self.assertIsInstance(jira, JiraTicket)
        self.assertEqual(jira.ticket_key, "PEEC-408")
        self.assertEqual(jira.story_points, 5)
        self.assertEqual(jira.component, "AI-Gateway")
        self.assertIn("Feature: Diagnostic Side-by-Side", jira.gherkin_scenarios)
        self.assertGreater(len(jira.v1_scope_limits), 0)
        self.assertGreater(len(jira.v1_in_scope), 0)
        self.assertGreater(len(jira.definition_of_done), 0)

    def test_all_presets_e2e(self):
        for key, preset in PRESETS.items():
            b_domain = urlparse(preset["brand_url"]).netloc or "our-brand.io"
            c_domain = urlparse(preset["competitor_url"]).netloc or "competitor.com"
            
            brand_payload = DeterministicScraper.parse_html(
                html=preset["brand_html"],
                url=preset["brand_url"],
                domain=b_domain
            )
            comp_payload = DeterministicScraper.parse_html(
                html=preset["competitor_html"],
                url=preset["competitor_url"],
                domain=c_domain
            )
            
            start_t = time.time()
            result = ZeroExtrapolationGapEngine.execute_diff(
                query=preset["query"],
                brand_payload=brand_payload,
                competitor_payload=comp_payload,
                execution_time_ms=round((time.time() - start_t) * 1000, 2)
            )
            
            self.assertEqual(result.query, preset["query"])
            self.assertGreaterEqual(len(result.schema_gaps), 1)
            self.assertGreaterEqual(len(result.benchmark_gaps), 1)
            self.assertGreater(len(result.marketer_brief.markdown_content), 1000)
            self.assertEqual(result.engineering_jira.ticket_key, "PEEC-408")


if __name__ == "__main__":
    unittest.main()