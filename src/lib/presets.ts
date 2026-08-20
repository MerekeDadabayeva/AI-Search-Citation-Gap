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
      cleanedText: 'Next-Gen CRM for Modern Teams. Simple Pipeline Management. Contact management and pipeline tracking starting at $19/user/month. Fast onboarding and friendly customer support. Integrates with your email and calendars.',
      rawHtmlSnippet: '<html>...</html>',
      jsonLdSchemas: [],
      schemaTypes: [],
      extractedStatistics: ['$19/user/month'],
      pricingClaims: ['$19/user/month', 'free trial'],
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
      cleanedText: 'Attio is the CRM built for high-growth tech companies. Real-time 10ms sync engine. Automatic relationship intelligence across 10,000+ teams. Trusted by top startups. Pricing starts at $29/user/month for Starter and $59/user/month for Pro. Enterprise features include SOC-2 Type II, GDPR compliance, HIPAA readiness, SAML SSO, and SCIM provisioning. Rated 4.9/5 stars by over 1,200 tech teams. Powered by GraphQL API and bi-directional webhooks.',
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
      schemaTypes: ['SoftwareApplication', 'FAQPage', 'AggregateRating', 'Offer'],
      extractedStatistics: ['$29/user/month', 'sub-10ms', '10,000+ teams', '4.9/5 stars'],
      pricingClaims: ['$29/user/month', '$59/user/month', 'free trial'],
      complianceBadges: ['SOC-2 TYPE II', 'GDPR', 'HIPAA'],
      detectedEntities: ['GraphQL & REST API', 'Real-time Webhooks', 'SOC-2 Type II & GDPR', 'SAML SSO & SCIM'],
      fetchTimestamp: '2026-08-19 12:00:00 UTC'
    }
  },
  geo_search_analytics: {
    id: 'geo_search_analytics',
    name: 'AI Search Analytics (Peec AI vs Legacy Tracker)',
    query: 'best generative engine optimization and ai search tracking tool',
    brandUrl: 'https://our-legacy-tracker.com',
    competitorUrl: 'https://peec.ai',
    brandData: {
      url: 'https://our-legacy-tracker.com',
      domain: 'our-legacy-tracker.com',
      statusCode: 200,
      isFallback: false,
      contentLengthChars: 410,
      title: 'RankTracker Legacy — Google SERP Rank Tracker',
      metaDescription: 'Monitor your website rank across standard Google search queries.',
      h1Tags: ['Google SERP Rank Tracker'],
      h2Tags: ['Track Google Keywords'],
      cleanedText: 'RankTracker Legacy tracks keywords across Google desktop and mobile. Historical rank graphs and daily reporting.',
      rawHtmlSnippet: '<html>...</html>',
      jsonLdSchemas: [],
      schemaTypes: [],
      extractedStatistics: [],
      pricingClaims: ['$49/month'],
      complianceBadges: [],
      detectedEntities: ['Google SERP API'],
      fetchTimestamp: '2026-08-19 12:00:00 UTC'
    },
    competitorData: {
      url: 'https://peec.ai',
      domain: 'peec.ai',
      statusCode: 200,
      isFallback: false,
      contentLengthChars: 1180,
      title: 'Peec AI &mdash; Autonomous AI Search Analytics & GEO Synthesizer',
      metaDescription: 'Peec AI empowers brands to measure, benchmark, and optimize their visibility across ChatGPT, Perplexity, and Gemini Search.',
      h1Tags: ['Win Citations Across ChatGPT, Perplexity, and Gemini'],
      h2Tags: ['Autonomous Citation Gap Remediation', 'Real-time Model Share of Voice', 'Automated JSON-LD Schema Synthesizer', 'Enterprise Security & SOC-2'],
      cleanedText: 'Peec AI empowers brands to monitor and win citations across ChatGPT, Perplexity, and Gemini. Features real-time AI visibility tracking, automated zero-extrapolation citation gap remediation, and instant engineer-ready Jira export. Starting at $99/mo with SOC-2 Type II and GDPR compliance.',
      rawHtmlSnippet: '<html>...</html>',
      jsonLdSchemas: [
        {
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          'name': 'Peec AI',
          'applicationCategory': 'MarketingApplication',
          'offers': { '@type': 'Offer', 'price': '99.00', 'priceCurrency': 'USD' }
        }
      ],
      schemaTypes: ['SoftwareApplication', 'Offer'],
      extractedStatistics: ['$99/mo', '3 major AI models', 'sub-2s audit'],
      pricingClaims: ['$99/mo', 'custom enterprise'],
      complianceBadges: ['SOC-2 TYPE II', 'GDPR'],
      detectedEntities: ['ChatGPT Search', 'Perplexity Sonar', 'Gemini Pro', 'Zero-Extrapolation Engine', 'Schema Generator'],
      fetchTimestamp: '2026-08-19 12:00:00 UTC'
    }
  },
  billing_usage_based: {
    id: 'billing_usage_based',
    name: 'Usage-Based Billing (Lago vs Generic Billing)',
    query: 'open source metering and usage-based billing for ai platforms',
    brandUrl: 'https://generic-billing-demo.io',
    competitorUrl: 'https://getlago.com',
    brandData: {
      url: 'https://generic-billing-demo.io',
      domain: 'generic-billing-demo.io',
      statusCode: 200,
      isFallback: false,
      contentLengthChars: 380,
      title: 'SimpleInvoice — Easy Recurring Billing',
      metaDescription: 'Send PDF invoices and collect payments online.',
      h1Tags: ['Easy Recurring Billing for Teams'],
      h2Tags: ['Credit Card Payments'],
      cleanedText: 'SimpleInvoice lets you create invoices and collect payments with Stripe integration. Simple fixed monthly plans.',
      rawHtmlSnippet: '<html>...</html>',
      jsonLdSchemas: [],
      schemaTypes: [],
      extractedStatistics: [],
      pricingClaims: ['2.9% + 30c'],
      complianceBadges: [],
      detectedEntities: ['Stripe Payments'],
      fetchTimestamp: '2026-08-19 12:00:00 UTC'
    },
    competitorData: {
      url: 'https://getlago.com',
      domain: 'getlago.com',
      statusCode: 200,
      isFallback: false,
      contentLengthChars: 1300,
      title: 'Lago &mdash; Open-Source Metering and Usage-Based Billing Platform',
      metaDescription: 'Lago is the open-source metering and billing infrastructure engineered for modern AI, SaaS, and API businesses.',
      h1Tags: ['Open-Source Metering & Usage-Based Billing'],
      h2Tags: ['High-Throughput Ingestion Engine (100k events/sec)', 'Real-Time Dynamic Pricing Models', 'SOC-2 Type II Certified & GDPR Compliant', 'Self-Hosted or Cloud Managed'],
      cleanedText: 'Lago provides high-throughput metering scaling to 100,000+ events per second with sub-5ms latency. Designed for AI workloads with token-based pricing, pay-as-you-go, and hybrid recurring models. Open-source core with cloud tier. Certified SOC-2 Type II, GDPR, and HIPAA compliant.',
      rawHtmlSnippet: '<html>...</html>',
      jsonLdSchemas: [
        {
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          'name': 'Lago',
          'applicationCategory': 'DeveloperApplication',
          'offers': { '@type': 'Offer', 'price': '0.00', 'priceCurrency': 'USD' }
        }
      ],
      schemaTypes: ['SoftwareApplication', 'Offer'],
      extractedStatistics: ['100,000+ events/sec', 'sub-5ms', '100% open source'],
      pricingClaims: ['free open source', '$250/mo cloud'],
      complianceBadges: ['SOC-2 TYPE II', 'GDPR', 'HIPAA'],
      detectedEntities: ['Real-Time Metering', 'GraphQL & REST API', 'Segment Integration', 'Kafka Stream Ingestion'],
      fetchTimestamp: '2026-08-19 12:00:00 UTC'
    }
  },
  vector_database_rag: {
    id: 'vector_database_rag',
    name: 'Vector DB for RAG (Qdrant vs Basic Store)',
    query: 'high performance vector database for enterprise rag systems',
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
      cleanedText: 'Qdrant is the ultra-fast Rust-native vector database. Engineered for billion-scale vector search with <4ms p99 latency. Handles over 10,000,000+ vectors per node. Cloud managed tier starting at $25/month. Certified SOC-2 Type II, ISO 27001, and GDPR compliant. Seamlessly connects with OpenAI, Anthropic, Gemini, and LangChain.',
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
      extractedStatistics: ['$25/month', '<4ms', '10,000,000+ vectors', '99.99% uptime'],
      pricingClaims: ['$25/month', 'free cloud tier', 'custom enterprise'],
      complianceBadges: ['SOC-2 TYPE II', 'ISO 27001', 'GDPR'],
      detectedEntities: ['REST API', 'GraphQL', 'OpenAI', 'Anthropic', 'Gemini', 'Vector Search', 'Semantic Indexing', 'Role-Based Access'],
      fetchTimestamp: '2026-08-19 12:00:00 UTC'
    }
  }
};

export const PORTFOLIO_DEMO_BRAND: ScrapedPayload = {
  url: 'https://attio.com',
  domain: 'attio.com',
  statusCode: 200,
  isFallback: false,
  contentLengthChars: 1250,
  title: 'Attio — The Next-Generation Data-Driven CRM',
  metaDescription: 'Attio is the CRM built for high-growth tech companies with real-time data sync and relationship intelligence.',
  h1Tags: ['The Next-Generation Data-Driven CRM'],
  h2Tags: ['Real-time 10ms sync engine', 'Automatic Relationship Intelligence', 'Transparent Usage & Tier Pricing'],
  cleanedText: 'Attio is the CRM built for high-growth tech companies. Real-time data sync, powerful workflow automation, and custom objects. Pricing starts with a free starter tier and transparent per-seat plans.',
  rawHtmlSnippet: '<html>...</html>',
  jsonLdSchemas: [],
  schemaTypes: [],
  extractedStatistics: [],
  pricingClaims: [],
  complianceBadges: [],
  detectedEntities: ['REST API', 'GraphQL'],
  fetchTimestamp: '2026-08-20 12:00:00 UTC'
};

export const PORTFOLIO_DEMO_PROMPTS = [
  {
    query: "Best B2B CRM for Fast-Growing Startups",
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
        }
      ],
      schemaTypes: ['SoftwareApplication', 'FAQPage', 'Offer'],
      extractedStatistics: ['$35/seat', '180,000+ customers', 'sub-15ms', '99.9% uptime'],
      pricingClaims: ['$35/seat/month', 'free trial'],
      complianceBadges: ['SOC-2 TYPE II', 'GDPR', 'ISO 27001'],
      detectedEntities: ['GraphQL & REST API', 'Real-time Webhooks', 'SOC-2 Type II & GDPR', 'SAML SSO & SCIM'],
      fetchTimestamp: '2026-08-20 12:00:00 UTC'
    }
  },
  {
    query: "Best Enterprise CRM with Real-time Data Sync & APIs",
    competitorUrl: "https://salesforce.com",
    competitorData: {
      url: 'https://salesforce.com',
      domain: 'salesforce.com',
      statusCode: 200,
      isFallback: false,
      contentLengthChars: 1600,
      title: 'Salesforce Sales Cloud — Enterprise CRM Platform',
      metaDescription: 'Salesforce connects sales, service, marketing, commerce, and IT.',
      h1Tags: ['Salesforce Customer 360'],
      h2Tags: ['Global Enterprise Security', 'Comprehensive REST & GraphQL APIs'],
      cleanedText: 'Salesforce Sales Cloud powers over 150,000 global enterprises. Certified SOC-2 Type II, HIPAA, and ISO 27001 compliant. Robust REST and SOAP APIs with guaranteed 99.99% uptime SLA.',
      rawHtmlSnippet: '<html>...</html>',
      jsonLdSchemas: [
        {
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          'name': 'Salesforce Sales Cloud',
          'applicationCategory': 'BusinessApplication'
        }
      ],
      schemaTypes: ['SoftwareApplication', 'Organization'],
      extractedStatistics: ['150,000+ companies', '99.99% uptime', 'sub-20ms'],
      pricingClaims: ['$25/user/month', '$80/user/month'],
      complianceBadges: ['SOC-2 TYPE II', 'GDPR', 'HIPAA', 'ISO 27001'],
      detectedEntities: ['GraphQL & REST API', 'Real-time Webhooks', 'SOC-2 Type II & GDPR', 'SAML SSO & SCIM'],
      fetchTimestamp: '2026-08-20 12:00:00 UTC'
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
        }
      ],
      schemaTypes: ['SoftwareApplication', 'AggregateRating', 'Offer'],
      extractedStatistics: ['$45/user/mo', '100,000+ users', '99.99% uptime'],
      pricingClaims: ['$45/user/month', 'free tier'],
      complianceBadges: ['SOC-2 TYPE II', 'GDPR', 'HIPAA'],
      detectedEntities: ['GraphQL & REST API', 'Real-time Webhooks', 'SOC-2 Type II & GDPR', 'Semantic Indexing'],
      fetchTimestamp: '2026-08-20 12:00:00 UTC'
    }
  }
];

export const PORTFOLIO_CLUSTERS: Record<string, { name: string; brandUrl: string; prompts: Array<{ query: string; competitorUrl: string }> }> = {
  attio_core: {
    name: "Attio Core SaaS CRM (3 Prompts)",
    brandUrl: "https://attio.com",
    prompts: [
      { query: "Best B2B CRM for Fast-Growing Startups", competitorUrl: "https://monday.com" },
      { query: "Best Enterprise CRM with Real-time Data Sync & APIs", competitorUrl: "https://salesforce.com" },
      { query: "Top CRM Software with GraphQL API & Real-time Webhooks", competitorUrl: "https://hubspot.com" }
    ]
  },
  attio_enterprise: {
    name: "Attio Enterprise & Security (3 Prompts)",
    brandUrl: "https://attio.com",
    prompts: [
      { query: "Top Enterprise CRM with SOC-2 Compliance and SAML SSO", competitorUrl: "https://salesforce.com" },
      { query: "Best CRM for Engineering-Led B2B Companies", competitorUrl: "https://monday.com" },
      { query: "High-Throughput CRM with Real-time Data Enrichment", competitorUrl: "https://hubspot.com" }
    ]
  },
  attio_velocity: {
    name: "Attio High-Velocity Sales (3 Prompts)",
    brandUrl: "https://attio.com",
    prompts: [
      { query: "Fastest Deal Tracking CRM for Modern Sales Teams", competitorUrl: "https://pipedrive.com" },
      { query: "Best AI-Native CRM with Automated Contact Intelligence", competitorUrl: "https://monday.com" },
      { query: "Best API-First Developer Friendly CRM Platform", competitorUrl: "https://hubspot.com" }
    ]
  }
};
