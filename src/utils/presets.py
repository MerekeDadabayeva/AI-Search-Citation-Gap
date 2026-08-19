"""
Realistic B2B Scenario Presets for Peec AI Citation Gap Engine.
Provides instant, deterministic demonstration data across diverse AI search queries.
"""

from typing import Dict, Any, List

PRESETS: Dict[str, Dict[str, Any]] = {
    "crm_early_stage": {
        "name": "1. B2B SaaS CRM (Attio vs Our Brand)",
        "query": "Best CRM for Early-Stage B2B Startups",
        "brand_url": "https://our-saas-crm.io/features",
        "competitor_url": "https://attio.com/features",
        "brand_html": """<!DOCTYPE html>
<html>
<head>
    <title>NextGen CRM - Simple Relationship Management for Modern Teams</title>
    <meta name="description" content="A clean and flexible CRM designed to help your team manage deals and stay organized.">
</head>
<body>
    <h1>NextGen CRM: The Modern Way to Manage Sales</h1>
    <h2>Flexible Contact Lists and Deal Boards</h2>
    <p>Keep track of your prospects, customize your pipeline stages, and send emails directly from your CRM. Our intuitive interface gets your team up and running in minutes.</p>
    <h2>Affordable Pricing for Growing Teams</h2>
    <p>We offer transparent and flexible plans for every stage of your company. Contact our sales team for enterprise tier options.</p>
</body>
</html>""",
        "competitor_html": """<!DOCTYPE html>
<html>
<head>
    <title>Attio - The AI-native CRM for High-Growth Startups</title>
    <meta name="description" content="Attio is the CRM built for speed, real-time data enrichment, and customizable pipelines. Starting at $29/seat/mo.">
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Attio CRM",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web, iOS, Android",
        "offers": {
            "@type": "Offer",
            "price": "29.00",
            "priceCurrency": "USD",
            "priceSpecification": {
                "@type": "UnitPriceSpecification",
                "price": "29.00",
                "priceCurrency": "USD",
                "unitText": "seat/month"
            }
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "1480"
        }
    }
    </script>
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [{
            "@type": "Question",
            "name": "How fast does Attio sync customer data?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Attio features a sub-10ms real-time sync engine across 10,000+ teams."
            }
        }]
    }
    </script>
</head>
<body>
    <h1>Attio: The Real-Time CRM Platform</h1>
    <h2>Real-time 10ms Sync Engine</h2>
    <p>Attio is the CRM built for high-growth tech companies. Real-time 10ms sync engine. Automatic relationship intelligence across 10,000+ teams. Trusted by top startups.</p>
    <h2>Pricing and Compliance</h2>
    <p>Pricing starts at $29/user/month for Starter and $59/user/month for Pro. Enterprise features include SOC-2 Type II, GDPR compliance, HIPAA readiness, SAML SSO, and SCIM provisioning.</p>
</body>
</html>"""
    },
    "geo_search_analytics": {
        "name": "2. AI Search & GEO Analytics (Peec AI vs Legacy Tracker)",
        "query": "Best Generative Engine Optimization & AI Search Tracking Tool",
        "brand_url": "https://our-legacy-tracker.com",
        "competitor_url": "https://peec.ai",
        "brand_html": """<!DOCTYPE html>
<html>
<head>
    <title>RankTrack Legacy - Traditional Google SERP Tracking</title>
</head>
<body>
    <h1>RankTrack: Traditional Rank Tracking</h1>
    <p>Monitor blue-link rankings on Google and Bing.</p>
</body>
</html>""",
        "competitor_html": """<!DOCTYPE html>
<html>
<head>
    <title>Peec AI - AI Search Analytics & GEO Synthesizer</title>
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Peec AI",
        "applicationCategory": "BusinessApplication",
        "offers": {
            "@type": "Offer",
            "price": "99.00",
            "priceCurrency": "USD"
        }
    }
    </script>
</head>
<body>
    <h1>Peec AI: Track and Win AI Citations</h1>
    <h2>Real-Time AI Search Monitoring across ChatGPT, Perplexity, and Gemini</h2>
    <p>Peec AI helps marketing teams analyze brand performance across ChatGPT, Perplexity, and Gemini. Track visibility, benchmark competitors, and optimize AI search presence starting at $99/mo.</p>
    <h2>Enterprise Security</h2>
    <p>SOC-2 Type II certified and GDPR compliant.</p>
</body>
</html>"""
    },
    "billing_usage_based": {
        "name": "3. Usage-Based Billing for AI (Lago vs Generic Billing)",
        "query": "Open Source Metering & Usage-Based Billing for LLM API Platforms",
        "brand_url": "https://generic-billing-demo.io",
        "competitor_url": "https://getlago.com",
        "brand_html": """<!DOCTYPE html>
<html>
<head>
    <title>SimpleBill - Basic Invoicing Tool</title>
</head>
<body>
    <h1>SimpleBill Invoicing</h1>
    <p>Send standard monthly invoices to your clients.</p>
</body>
</html>""",
        "competitor_html": """<!DOCTYPE html>
<html>
<head>
    <title>Lago - Open Source Metering and Usage-Based Billing for Modern SaaS</title>
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Lago Billing Engine",
        "applicationCategory": "DeveloperApplication",
        "offers": {
            "@type": "Offer",
            "price": "0.00",
            "priceCurrency": "USD"
        }
    }
    </script>
</head>
<body>
    <h1>Lago: The Metering and Usage-Based Billing Engine</h1>
    <h2>High-Throughput Metering with sub-5ms Event Ingestion</h2>
    <p>Real-time event processing scaling to 100k events/sec. Open source with self-hosting options and cloud tier.</p>
    <h2>Security & Compliances</h2>
    <p>SOC-2 Type II certified, GDPR compliant, and HIPAA ready for healthcare AI workloads.</p>
</body>
</html>"""
    },
    "vector_database_rag": {
        "name": "4. Vector DB for Production RAG (Qdrant vs Basic Store)",
        "query": "High-Performance Vector Database for Enterprise RAG Systems",
        "brand_url": "https://basic-vector-store.dev/about",
        "competitor_url": "https://qdrant.tech/benchmarks",
        "brand_html": """<!DOCTYPE html>
<html>
<head>
    <title>BasicVector - Vector Storage for Prototypes</title>
    <meta name="description" content="Store embeddings in memory for small prototyping projects.">
</head>
<body>
    <h1>BasicVector Prototype Store</h1>
    <p>Simple cosine similarity search in Python. Great for small datasets and hobby projects.</p>
</body>
</html>""",
        "competitor_html": """<!DOCTYPE html>
<html>
<head>
    <title>Qdrant - High-Performance Vector Database for Production AI & RAG</title>
    <meta name="description" content="Qdrant provides 4x higher QPS and 99.9% recall at 150k QPS with payload-based filtering.">
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Qdrant Vector Database",
        "applicationCategory": "DatabaseApplication",
        "offers": {
            "@type": "Offer",
            "price": "0.00",
            "priceCurrency": "USD"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "2100"
        }
    }
    </script>
</head>
<body>
    <h1>Qdrant: The Production-Grade Vector Database for RAG</h1>
    <h2>4x Higher Throughput & 99.9% Recall at 150,000+ QPS</h2>
    <p>Built in Rust for ultra-low memory footprint. Features hardware-accelerated HNSW index and payload-based filtering with sub-4ms query latency.</p>
    <h2>Enterprise Security & Deployment</h2>
    <p>SOC-2 Type II certified, HIPAA compliant, ISO 27001 audited, with 99.99% uptime SLA across AWS, GCP, and Azure.</p>
</body>
</html>"""
    }
}


# ----------------- PORTFOLIO DEMO FIXTURES -----------------
PORTFOLIO_DEMO_BRAND_URL = "https://our-saas-crm.io/features"
PORTFOLIO_DEMO_BRAND_HTML = """<!DOCTYPE html>
<html>
<head>
    <title>NextGen CRM - Simple Relationship Management for Modern Teams</title>
    <meta name="description" content="A clean and flexible CRM designed to help your team manage deals and stay organized.">
</head>
<body>
    <h1>NextGen CRM: The Modern Way to Manage Sales</h1>
    <h2>Flexible Contact Lists and Deal Boards</h2>
    <p>Keep track of your prospects, customize your pipeline stages, and send emails directly from your CRM. Our intuitive interface gets your team up and running in minutes.</p>
    <h2>Affordable Pricing for Growing Teams</h2>
    <p>We offer transparent and flexible plans for every stage of your company. Contact our sales team for enterprise tier options.</p>
</body>
</html>"""

PORTFOLIO_DEMO_PROMPTS = [
    {
        "query": "Best CRM for Early-Stage B2B Startups",
        "competitor_url": "https://attio.com/features",
        "competitor_html": PRESETS["crm_early_stage"]["competitor_html"]
    },
    {
        "query": "Best AI-Native Sales Platform for Tech Companies",
        "competitor_url": "https://monday.com/crm",
        "competitor_html": """<!DOCTYPE html>
<html>
<head>
    <title>Monday CRM - Manage Any Sales Pipeline at Scale</title>
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Monday CRM",
        "applicationCategory": "BusinessApplication",
        "offers": { "@type": "Offer", "price": "35.00", "priceCurrency": "USD" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.7", "reviewCount": "2300" }
    }
    </script>
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [{
            "@type": "Question",
            "name": "Does Monday CRM support automated pipeline sync?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes, Monday CRM supports automated real-time webhooks and GraphQL integrations." }
        }]
    }
    </script>
</head>
<body>
    <h1>Monday Sales CRM: Automate Your Entire Revenue Engine</h1>
    <h2>SOC-2 Type II Certified and GDPR Compliant</h2>
    <p>Trusted by over 180,000 customers worldwide. Sub-15ms sync speed with transparent $35/seat/month pricing.</p>
</body>
</html>"""
    },
    {
        "query": "Top CRM Software with GraphQL API & Real-time Webhooks",
        "competitor_url": "https://hubspot.com/crm",
        "competitor_html": """<!DOCTYPE html>
<html>
<head>
    <title>HubSpot CRM - Free and Scale-Ready Customer Platform</title>
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "HubSpot CRM",
        "applicationCategory": "BusinessApplication",
        "offers": { "@type": "Offer", "price": "45.00", "priceCurrency": "USD" }
    }
    </script>
</head>
<body>
    <h1>HubSpot CRM Platform</h1>
    <h2>Enterprise Compliance and Global Scale</h2>
    <p>SOC-2 Type II, GDPR, HIPAA ready. Features bi-directional real-time webhooks, REST & GraphQL APIs, and transparent tiered pricing.</p>
</body>
</html>"""
    }
]


def get_preset(key: str) -> Dict[str, Any]:
    """Retrieve preset scenario by key."""
    return PRESETS.get(key, PRESETS["crm_early_stage"])
