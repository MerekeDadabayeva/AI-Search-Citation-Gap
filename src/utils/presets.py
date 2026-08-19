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
            "name": "Does Attio support bidirectional sync with email and calendar?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, Attio offers sub-second bidirectional sync with Google Workspace and Microsoft 365."
            }
        }]
    }
    </script>
</head>
<body>
    <h1>Attio: The Powerful CRM for Modern B2B Startups</h1>
    <h2>Real-time Pipeline Sync & Automated Data Enrichment</h2>
    <p>Sync contacts with Google Workspace and Microsoft 365 in real time with sub-50ms latency. Over 10,000+ fast-growing teams rely on Attio for automated enrichment and custom workflows.</p>
    <h2>Transparent Pricing: From Free to Enterprise</h2>
    <p>Start for free with up to 3 seats. Pro plan is $29/user/month billed annually. Enterprise plans include dedicated SAML SSO and audit logs.</p>
    <h2>Enterprise Security & Compliance</h2>
    <p>Built with enterprise-grade security: SOC-2 Type II certified, GDPR compliant, and 99.99% uptime SLA guarantee.</p>
    <h2>Integrations & Extensibility</h2>
    <p>Connect with REST API, GraphQL, Webhooks, Notion Sync, Slack Notifications, and Stripe Billing in one click.</p>
</body>
</html>"""
    },
    "geo_search_analytics": {
        "name": "2. AI Search & GEO Analytics (Peec AI vs Legacy Tracker)",
        "query": "Best Generative Engine Optimization (GEO) & AI Search Monitoring Platform",
        "brand_url": "https://legacy-serp-tracker.com/features",
        "competitor_url": "https://peec.ai/platform",
        "brand_html": """<!DOCTYPE html>
<html>
<head>
    <title>Legacy SERP Tracker - Daily Google Search Rank Analytics</title>
    <meta name="description" content="Track traditional Google organic search rankings across desktop and mobile devices.">
</head>
<body>
    <h1>Legacy SERP Rank Tracker</h1>
    <h2>Daily Rank Tracking across 100+ Search Engines</h2>
    <p>Monitor your position in Google search results pages. Receive weekly email reports with keyword position changes.</p>
</body>
</html>""",
        "competitor_html": """<!DOCTYPE html>
<html>
<head>
    <title>Peec AI - Autonomous Generative Engine Optimization & Citation Intelligence</title>
    <meta name="description" content="Peec AI tracks citations across ChatGPT Search, Perplexity AI, and Google Gemini with sub-1.5s automated remediation briefs.">
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Peec AI",
        "applicationCategory": "AnalyticsPlatform",
        "offers": {
            "@type": "Offer",
            "price": "99.00",
            "priceCurrency": "USD"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "320"
        }
    }
    </script>
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [{
            "@type": "Question",
            "name": "How does Peec AI resolve the AI search Actionability Gap?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Peec AI ingests winning competitor citations and deterministically synthesizes 1-click Markdown briefs and sprint-ready Jira stories in < 1.5s."
            }
        }]
    }
    </script>
</head>
<body>
    <h1>Peec AI: Diagnostic AI Search Visibility & Citation Remediation</h1>
    <h2>Real-time Citation Monitoring across ChatGPT, Perplexity & Gemini</h2>
    <p>Track over 500,000+ monitored prompts with automated citation gap detection. Close the actionability bottleneck with 1-click remediation briefs generated in < 1.5s latency.</p>
    <h2>Sprint-Ready Engineering Backlog Integration</h2>
    <p>Export sprint-ready Gherkin Jira specifications (PEEC-408) directly to engineering boards with clear V1 scope limits. Integrates via REST API, Webhooks, and GraphQL.</p>
    <h2>Transparent Pricing: From $99/mo</h2>
    <p>Starter plans begin at $99/mo for up to 100 monitored prompts. Scale seamlessly with dedicated SAML SSO and audit logs.</p>
    <h2>Enterprise Trust & Security</h2>
    <p>Certified SOC-2 Type II, GDPR compliant, with 99.95% API uptime SLA and deterministic zero-extrapolation verification.</p>
</body>
</html>"""
    },
    "billing_usage_based": {
        "name": "3. Usage-Based Billing for AI (Lago vs Generic Billing)",
        "query": "Top Usage-Based Billing & Metering Software for AI Apps",
        "brand_url": "https://generic-billing-demo.io/pricing",
        "competitor_url": "https://getlago.com/features",
        "brand_html": """<!DOCTYPE html>
<html>
<head>
    <title>SimpleBilling - Easy SaaS Invoicing</title>
    <meta name="description" content="Create subscriptions and charge credit cards easily with our basic invoicing API.">
</head>
<body>
    <h1>SimpleBilling: Subscriptions Made Easy</h1>
    <p>Accept credit cards for flat-rate monthly recurring billing. Simple setup with Stripe.</p>
</body>
</html>""",
        "competitor_html": """<!DOCTYPE html>
<html>
<head>
    <title>Lago - Open-Source Metering & Usage-Based Billing for AI Companies</title>
    <meta name="description" content="Lago delivers real-time event metering at 100,000+ events/sec with sub-5ms ingestion latency.">
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Lago Metering & Billing",
        "applicationCategory": "BillingEngine",
        "offers": {
            "@type": "Offer",
            "price": "0.00",
            "priceCurrency": "USD"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.85",
            "reviewCount": "850"
        }
    }
    </script>
</head>
<body>
    <h1>Lago: High-Performance Metering for AI & API-First Companies</h1>
    <h2>Sub-5ms Event Ingestion at 100,000+ events/sec</h2>
    <p>Meter token usage, compute hours, and API calls with sub-5ms latency and 99.99% uptime SLA. Open source with over 6,500+ GitHub stars.</p>
    <h2>Flexible Pricing Models: Free Open Source & Cloud</h2>
    <p>100% free open-source tier. Cloud plans start at $250/mo with dedicated high-throughput Kafka clusters.</p>
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


def get_preset(key: str) -> Dict[str, Any]:
    """Retrieve preset scenario by key."""
    return PRESETS.get(key, PRESETS["crm_early_stage"])
