import type { PresetScenario, ScrapedPayload } from './types';

export const PRESETS: Record<string, PresetScenario> = {
  crm_early_stage: {
    id: 'crm_early_stage',
    name: 'B2B SaaS CRM (Attio vs Our Brand)',
    query: 'best b2b crm for fast-growing startups',
    brandUrl: 'https://our-saas-crm.io',
    competitorUrl: 'https://attio.com',
    brandData: {
      url: 'https://our-saas-crm.io',
      domain: 'our-saas-crm.io',
      statusCode: 200,
      isFallback: false,
      contentLengthChars: 480,
      title: 'Next-Gen CRM for Modern Teams',
      metaDescription: 'Manage your contacts and deals easily with modern pipelines.',
      h1Tags: ['Next-Gen CRM for Modern Teams'],
      h2Tags: ['Simple Pipeline Management', 'Affordable Pricing'],
      cleanedText: 'Next-Gen CRM for Modern Teams. Simple Pipeline Management. Contact management and pipeline tracking starting at \/user/month. Fast onboarding and friendly customer support. Integrates with your email and calendars.',
      rawHtmlSnippet: '<html>...</html>',
      jsonLdSchemas: [],
      schemaTypes: [],
      extractedStatistics: ['\/user/month'],
      pricingClaims: ['\/user/month', 'free trial'],
      complianceBadges: [],
      detectedEntities: ['REST API', 'CSV Export'],
      fetchTimestamp: '2026-08-19 12:00:00 UTC'
    },
    competitorData: {
      url: 'https://attio.com',
      domain: 'attio.com',
      statusCode: 200,
      isFallback: false,
      contentLengthChars: 1250,
      title: 'Attio &mdash; The Next-Generation Data-Driven CRM',
      metaDescription: 'Attio is the CRM built for high-growth tech companies with real-time data sync and automatic relationship intelligence.',
      h1Tags: ['The Next-Generation Data-Driven CRM'],
      h2Tags: ['Real-time 10ms sync engine', 'Automatic Relationship Intelligence', 'SOC-2 Type II Certified Security', 'Transparent Usage & Tier Pricing'],
      cleanedText: 'Attio is the CRM built for high-growth tech companies. Real-time 10ms sync engine. Automatic relationship intelligence across 10,000+ teams. Trusted by top startups. Pricing starts at \/user/month for Starter and \/user/month for Pro. Enterprise features include SOC-2 Type II, GDPR compliance, HIPAA readiness, SAML SSO, and SCIM provisioning. Rated 4.9/5 stars by over 1,200 tech teams. Powered by GraphQL API and bi-directional webhooks.',
      rawHtmlSnippet: '<html>...</html>',
      jsonLdSchemas: [
        {
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          'name': 'Attio',
          'applicationCategory': 'BusinessApplication',
          'offers': { '@type': 'Offer', 'price': '29.00', 'priceCurrency': 'USD' },
          'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.9', 'reviewCount': '1200' }
        },
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          'mainEntity': [
            {
              '@type': 'Question',
              'name': 'How fast does Attio sync customer data?',
              'acceptedAnswer': { '@type': 'Answer', 'text': 'Attio features a sub-10ms real-time sync engine.' }
            }
          ]
        }
      ],
      schemaTypes: ['SoftwareApplication', 'FAQPage', 'Offer', 'AggregateRating'],
      extractedStatistics: ['\/user/month', '\/user/month', '10ms', '10,000+ teams', '4.9/5 stars', '1,200 tech teams'],
      pricingClaims: ['\/user/month', '\/user/month', 'custom enterprise'],
      complianceBadges: ['SOC-2 TYPE II', 'GDPR', 'HIPAA'],
      detectedEntities: ['REST API', 'GraphQL', 'Webhooks', 'SOC-2', 'SAML SSO', 'SCIM', 'Audit Logs', 'Real-time Collaboration'],
      fetchTimestamp: '2026-08-19 12:00:00 UTC'
    }
  },
  geo_search_analytics: {
    id: 'geo_search_analytics',
    name: 'AI Search & GEO Analytics (Peec AI vs Legacy Tracker)',
    query: 'best generative engine optimization and ai search tracking tool',
    brandUrl: 'https://legacy-rank-tracker.com',
    competitorUrl: 'https://peec.ai',
    brandData: {
      url: 'https://legacy-rank-tracker.com',
      domain: 'legacy-rank-tracker.com',
      statusCode: 200,
      isFallback: false,
      contentLengthChars: 410,
      title: 'Traditional Search Rank Tracker & SERP Checker',
      metaDescription: 'Check your Google keyword rank position and weekly organic search visibility.',
      h1Tags: ['Traditional Search Rank Tracker'],
      h2Tags: ['Track Google Keyword Rankings', 'Weekly Email Reports'],
      cleanedText: 'Traditional Search Rank Tracker. Check your Google keyword rank position and weekly organic search visibility. Weekly SERP tracking starting at \/month for 500 keywords.',
      rawHtmlSnippet: '<html>...</html>',
      jsonLdSchemas: [],
      schemaTypes: [],
      extractedStatistics: ['\/month', '500 keywords'],
      pricingClaims: ['\/month'],
      complianceBadges: [],
      detectedEntities: ['CSV Export'],
      fetchTimestamp: '2026-08-19 12:00:00 UTC'
    },
    competitorData: {
      url: 'https://peec.ai',
      domain: 'peec.ai',
      statusCode: 200,
      isFallback: false,
      contentLengthChars: 1100,
      title: 'Peec AI &mdash; Generative Engine Optimization (GEO) & AI Search Intelligence',
      metaDescription: 'Peec AI tracks and optimizes your brand visibility across ChatGPT Search, Perplexity AI, Google Gemini, and Claude.',
      h1Tags: ['Generative Engine Optimization (GEO) & AI Search Intelligence'],
      h2Tags: ['Multi-LLM Citation Tracking', 'Actionable Entity Delta Diff', 'Sub-second Diagnostic API', 'SOC-2 Type II Enterprise Security'],
      cleanedText: 'Peec AI tracks brand visibility across ChatGPT Search, Perplexity AI, Google Gemini, and Claude. Ingests 50,000+ generative prompts daily with sub-1.5s cached latency. Features zero-extrapolation semantic entity diffs. Pricing starts at \/month for Growth and \/month for Agencies. Built with SOC-2 Type II and GDPR compliance. Trusted by over 500+ fast-growing enterprise marketing squads.',
      rawHtmlSnippet: '<html>...</html>',
      jsonLdSchemas: [
        {
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          'name': 'Peec AI',
          'applicationCategory': 'MarketingApplication',
          'offers': { '@type': 'Offer', 'price': '199.00', 'priceCurrency': 'USD' }
        },
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          'mainEntity': [
            {
              '@type': 'Question',
              'name': 'Which AI search engines does Peec AI track?',
              'acceptedAnswer': { '@type': 'Answer', 'text': 'Peec AI monitors ChatGPT Search, Perplexity AI, Google Gemini, and Claude in real time.' }
            }
          ]
        }
      ],
      schemaTypes: ['SoftwareApplication', 'FAQPage', 'Offer'],
      extractedStatistics: ['\/month', '\/month', '50,000+ prompts', 'sub-1.5s', '500+ teams'],
      pricingClaims: ['\/month', '\/month', 'custom enterprise'],
      complianceBadges: ['SOC-2 TYPE II', 'GDPR'],
      detectedEntities: ['REST API', 'Webhooks', 'OpenAI', 'Gemini', 'Anthropic', 'Semantic Indexing', 'Audit Logs'],
      fetchTimestamp: '2026-08-19 12:00:00 UTC'
    }
  },
  billing_usage_based: {
    id: 'billing_usage_based',
    name: 'Usage-Based Billing for AI (Lago vs Generic Billing)',
    query: 'open source meter-based billing software for ai agents',
    brandUrl: 'https://generic-billing-software.io',
    competitorUrl: 'https://getlago.com',
    brandData: {
      url: 'https://generic-billing-software.io',
      domain: 'generic-billing-software.io',
      statusCode: 200,
      isFallback: false,
      contentLengthChars: 380,
      title: 'Simple Invoice Generator and Subscription Manager',
      metaDescription: 'Create monthly recurring subscription invoices for your customers.',
      h1Tags: ['Simple Subscription Invoicing'],
      h2Tags: ['Monthly Recurring Billing'],
      cleanedText: 'Simple Subscription Invoicing. Create monthly recurring subscription invoices for your customers. Pricing starts at \/month for up to 100 invoices. Stripe integration included.',
      rawHtmlSnippet: '<html>...</html>',
      jsonLdSchemas: [],
      schemaTypes: [],
      extractedStatistics: ['\/month', '100 invoices'],
      pricingClaims: ['\/month'],
      complianceBadges: [],
      detectedEntities: ['Stripe Billing'],
      fetchTimestamp: '2026-08-19 12:00:00 UTC'
    },
    competitorData: {
      url: 'https://getlago.com',
      domain: 'getlago.com',
      statusCode: 200,
      isFallback: false,
      contentLengthChars: 1180,
      title: 'Lago &mdash; Open-Source Metering & Usage-Based Billing for AI',
      metaDescription: 'Lago is the leading open-source usage-based billing platform designed for high-scale AI API metering and hybrid models.',
      h1Tags: ['Open-Source Metering & Usage-Based Billing for AI'],
      h2Tags: ['High-throughput event ingestion (100k+ events/sec)', 'Real-time prepaid credits and wallets', 'SOC-2 Type II Certified', 'Developer-first REST and GraphQL APIs'],
      cleanedText: 'Lago is the open-source usage-based billing platform designed for high-scale AI API metering. Handles 100,000+ events/sec with sub-5ms ingestion latency. Open-source AGPL-3.0 with over 6,500+ GitHub stars. Cloud tier starts at \/month. SOC-2 Type II certified and PCI-DSS Level 1 compliant. Native integrations with Stripe Billing, Segment, and Snowflake.',
      rawHtmlSnippet: '<html>...</html>',
      jsonLdSchemas: [
        {
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          'name': 'Lago',
          'applicationCategory': 'FinanceApplication',
          'offers': { '@type': 'Offer', 'price': '290.00', 'priceCurrency': 'USD' }
        }
      ],
      schemaTypes: ['SoftwareApplication', 'Offer'],
      extractedStatistics: ['\/month', '100,000+ events/sec', 'sub-5ms', '6,500+ stars'],
      pricingClaims: ['\/month', 'open-source free tier', 'enterprise custom'],
      complianceBadges: ['SOC-2 TYPE II', 'PCI-DSS'],
      detectedEntities: ['REST API', 'GraphQL', 'Webhooks', 'Stripe Billing', 'Snowflake', 'PostgreSQL', 'Role-Based Access'],
      fetchTimestamp: '2026-08-19 12:00:00 UTC'
    }
  },
  vector_database_rag: {
    id: 'vector_database_rag',
    name: 'Vector DB for Production RAG (Qdrant vs Basic Store)',
    query: 'fastest vector database for billion-scale production rag',
    brandUrl: 'https://basic-vector-store.dev',
    competitorUrl: 'https://qdrant.tech',
    brandData: {
      url: 'https://basic-vector-store.dev',
      domain: 'basic-vector-store.dev',
      statusCode: 200,
      isFallback: false,
      contentLengthChars: 350,
      title: 'Lightweight Vector Index for Embeddings',
      metaDescription: 'Store vector embeddings in memory for prototyping search applications.',
      h1Tags: ['Lightweight In-Memory Vector Index'],
      h2Tags: ['Simple Python Wrapper'],
      cleanedText: 'Lightweight In-Memory Vector Index. Store vector embeddings in memory for prototyping search applications. Free for small local datasets.',
      rawHtmlSnippet: '<html>...</html>',
      jsonLdSchemas: [],
      schemaTypes: [],
      extractedStatistics: ['Free tier'],
      pricingClaims: ['Free tier'],
      complianceBadges: [],
      detectedEntities: ['REST API'],
      fetchTimestamp: '2026-08-19 12:00:00 UTC'
    },
    competitorData: {
      url: 'https://qdrant.tech',
      domain: 'qdrant.tech',
      statusCode: 200,
      isFallback: false,
      contentLengthChars: 1220,
      title: 'Qdrant &mdash; Vector Search Engine for Production AI & RAG',
      metaDescription: 'Qdrant is the ultra-fast Rust-native vector database engineered for billion-scale semantic search and RAG.',
      h1Tags: ['Vector Search Engine for Production AI & RAG'],
      h2Tags: ['Rust-Native Performance (<4ms search latency)', 'Payload-based dynamic filtering', 'Billion-Scale Distributed Clustering', 'SOC-2 Type II and ISO 27001 Certified'],
      cleanedText: 'Qdrant is the ultra-fast Rust-native vector database. Engineered for billion-scale vector search with <4ms p99 latency. Handles over 10,000,000+ vectors per node. Cloud managed tier starting at \/month. Certified SOC-2 Type II, ISO 27001, and GDPR compliant. Seamlessly connects with OpenAI, Anthropic, Gemini, and LangChain.',
      rawHtmlSnippet: '<html>...</html>',
      jsonLdSchemas: [
        {
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          'name': 'Qdrant',
          'applicationCategory': 'DeveloperApplication',
          'offers': { '@type': 'Offer', 'price': '25.00', 'priceCurrency': 'USD' }
        }
      ],
      schemaTypes: ['SoftwareApplication', 'Offer'],
      extractedStatistics: ['\/month', '<4ms', '10,000,000+ vectors', '99.99% uptime'],
      pricingClaims: ['\/month', 'free cloud tier', 'custom enterprise'],
      complianceBadges: ['SOC-2 TYPE II', 'ISO 27001', 'GDPR'],
      detectedEntities: ['REST API', 'GraphQL', 'OpenAI', 'Anthropic', 'Gemini', 'Vector Search', 'Semantic Indexing', 'Role-Based Access'],
      fetchTimestamp: '2026-08-19 12:00:00 UTC'
    }
  }
};

export const PORTFOLIO_DEMO_BRAND: ScrapedPayload = PRESETS.crm_early_stage.brandData;

export const PORTFOLIO_DEMO_PROMPTS = [
  {
    query: "Best CRM for Early-Stage B2B Startups",
    competitorUrl: "https://attio.com",
    competitorData: PRESETS.crm_early_stage.competitorData,
  },
  {
    query: "Best AI-Native Sales Platform for Tech Companies",
    competitorUrl: "https://monday.com",
    competitorData: {
      url: 'https://monday.com',
      domain: 'monday.com',
      statusCode: 200,
      isFallback: false,
      contentLengthChars: 1400,
      title: 'Monday Sales CRM — Manage Any Sales Pipeline at Scale',
      metaDescription: 'Monday Sales CRM automates your sales processes with real-time tracking.',
      h1Tags: ['Monday Sales CRM: Automate Your Entire Revenue Engine'],
      h2Tags: ['SOC-2 Type II Certified and GDPR Compliant', 'Transparent Pricing starting at $35/seat'],
      cleanedText: 'Monday Sales CRM is trusted by over 180,000 customers worldwide. Sub-15ms sync speed with transparent $35/seat/month pricing. Certified SOC-2 Type II, GDPR compliant, and ISO 27001 audited. Real-time webhooks and GraphQL APIs.',
      rawHtmlSnippet: '<html>...</html>',
      jsonLdSchemas: [
        {
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          'name': 'Monday CRM',
          'applicationCategory': 'BusinessApplication',
          'offers': { '@type': 'Offer', 'price': '35.00', 'priceCurrency': 'USD' }
        },
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          'mainEntity': [
            {
              '@type': 'Question',
              'name': 'Does Monday CRM support automated pipeline sync?',
              'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes, Monday CRM supports automated real-time webhooks and GraphQL integrations.' }
            }
          ]
        }
      ],
      schemaTypes: ['SoftwareApplication', 'FAQPage', 'Offer'],
      extractedStatistics: ['$35/seat', '180,000+ customers', 'sub-15ms', '99.9% uptime'],
      pricingClaims: ['$35/seat/month', 'free trial'],
      complianceBadges: ['SOC-2 TYPE II', 'GDPR', 'ISO 27001'],
      detectedEntities: ['GraphQL & REST API', 'Real-time Webhooks', 'SOC-2 Type II & GDPR', 'SAML SSO & SCIM'],
      fetchTimestamp: '2026-08-19 12:00:00 UTC'
    }
  },
  {
    query: "Top CRM Software with GraphQL API & Real-time Webhooks",
    competitorUrl: "https://hubspot.com",
    competitorData: {
      url: 'https://hubspot.com',
      domain: 'hubspot.com',
      statusCode: 200,
      isFallback: false,
      contentLengthChars: 1350,
      title: 'HubSpot CRM — Free and Scale-Ready Customer Platform',
      metaDescription: 'HubSpot CRM platform for growing teams with developer APIs.',
      h1Tags: ['HubSpot CRM Platform'],
      h2Tags: ['Enterprise Compliance and Global Scale', 'Bi-directional Real-time Webhooks'],
      cleanedText: 'HubSpot CRM Platform provides enterprise compliance and global scale. Certified SOC-2 Type II, GDPR, and HIPAA ready. Features bi-directional real-time webhooks, REST & GraphQL APIs, and transparent tiered pricing from $45/user/month.',
      rawHtmlSnippet: '<html>...</html>',
      jsonLdSchemas: [
        {
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          'name': 'HubSpot CRM',
          'applicationCategory': 'BusinessApplication',
          'offers': { '@type': 'Offer', 'price': '45.00', 'priceCurrency': 'USD' }
        },
        {
          '@context': 'https://schema.org',
          '@type': 'AggregateRating',
          'ratingValue': '4.6',
          'reviewCount': '3500'
        }
      ],
      schemaTypes: ['SoftwareApplication', 'AggregateRating', 'Offer'],
      extractedStatistics: ['$45/user/mo', '100,000+ users', '99.99% uptime'],
      pricingClaims: ['$45/user/month', 'free tier'],
      complianceBadges: ['SOC-2 TYPE II', 'GDPR', 'HIPAA'],
      detectedEntities: ['GraphQL & REST API', 'Real-time Webhooks', 'SOC-2 Type II & GDPR', 'Semantic Indexing'],
      fetchTimestamp: '2026-08-19 12:00:00 UTC'
    }
  }
];

