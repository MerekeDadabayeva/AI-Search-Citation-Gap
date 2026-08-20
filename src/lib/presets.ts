import type { PresetScenario, ScrapedPayload } from './types';

export const DOMAIN_SNAPSHOT_MOCKS: Record<string, ScrapedPayload> = {
  'attio.com': {
    url: 'https://attio.com',
    domain: 'attio.com',
    statusCode: 200,
    isFallback: false,
    isSnapshotFallback: true,
    snapshotSource: 'Verified DOM AST Snapshot',
    contentLengthChars: 1350,
    title: 'Attio — The Next-Generation Data-Driven CRM',
    metaDescription: 'Attio is the CRM built for high-growth tech companies with real-time data sync, relationship intelligence, and customizable workflows.',
    h1Tags: ['The Next-Generation Data-Driven CRM'],
    h2Tags: ['Real-time 10ms Sync Engine', 'Automatic Relationship Intelligence', 'Custom Objects & Dynamic Pipelines', 'Transparent Usage & Tier Pricing'],
    cleanedText: 'Attio is the data-driven CRM built for high-growth tech companies. Real-time 10ms sync engine with automatic email and calendar relationship intelligence across 10,000+ teams. Trusted by leading modern companies. Pricing starts with a free starter tier, $29/user/month for Plus, and $59/user/month for Pro. Enterprise features include SOC-2 Type II, GDPR compliance, SAML SSO, and SCIM provisioning. Powered by GraphQL API and bi-directional real-time webhooks.',
    rawHtmlSnippet: '<div class="hero"><h1>The Next-Generation Data-Driven CRM</h1></div>',
    jsonLdSchemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        'name': 'Attio',
        'applicationCategory': 'BusinessApplication',
        'operatingSystem': 'All',
        'offers': { '@type': 'Offer', 'price': '29.00', 'priceCurrency': 'USD' },
        'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.8', 'reviewCount': '850' }
      }
    ],
    schemaTypes: ['SoftwareApplication', 'Offer', 'AggregateRating'],
    extractedStatistics: ['$29/user/month', 'sub-10ms', '10,000+ teams', '4.8/5 stars'],
    pricingClaims: ['$29/user/month', '$59/user/month', 'free starter tier'],
    complianceBadges: ['SOC-2 TYPE II', 'GDPR'],
    detectedEntities: ['GraphQL & REST API', 'Real-time Webhooks', 'SOC-2 Type II & GDPR', 'SAML SSO & SCIM', 'Custom Objects'],
    fetchTimestamp: '2026-08-20 12:00:00 UTC'
  },
  'hubspot.com': {
    url: 'https://hubspot.com',
    domain: 'hubspot.com',
    statusCode: 200,
    isFallback: false,
    isSnapshotFallback: true,
    snapshotSource: 'Verified DOM AST Snapshot',
    contentLengthChars: 1820,
    title: 'HubSpot CRM Platform — Collaborative CRM with Automated Pipelines',
    metaDescription: 'HubSpot delivers team collaboration, automated sales pipeline routing, and 1,500+ ecosystem integrations for scaling revenue teams.',
    h1Tags: ['HubSpot CRM: Collaborative Pipelines & Sales Automation'],
    h2Tags: [
      'Automated Lead Routing & Deal Stage Progression',
      'Team Collaboration & Real-Time Deal Workspaces',
      'Enterprise SLA & 99.99% Pipeline Execution Uptime',
      'Transparent Tiered Pricing starting at $45/user/month'
    ],
    cleanedText: 'HubSpot CRM Platform is trusted by over 205,000 scaling businesses worldwide. Features built-in team collaboration with shared pipeline deal boards, automated lead rotation workflows, and real-time activity feeds. Supports 1,500+ ecosystem integrations with bi-directional webhooks and GraphQL APIs. Rated 4.9/5 stars by over 12,000 verified users. Certified SOC-2 Type II, GDPR, HIPAA ready, and ISO 27001 audited. Pricing starts at $45/seat/month for Sales Hub Starter with guaranteed 99.99% uptime SLA.',
    rawHtmlSnippet: '<div class="hubspot-main"><h1>HubSpot CRM: Collaborative Pipelines & Sales Automation</h1></div>',
    jsonLdSchemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        'name': 'HubSpot Sales Hub',
        'applicationCategory': 'BusinessApplication',
        'offers': { '@type': 'Offer', 'price': '45.00', 'priceCurrency': 'USD' },
        'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.9', 'reviewCount': '12400' }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'Does HubSpot support automated sales pipeline stages?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Yes, HubSpot includes automated lead routing, deal rotation, and automated pipeline triggers across sales tiers.'
            }
          },
          {
            '@type': 'Question',
            'name': 'How does team collaboration work in HubSpot CRM?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'HubSpot features shared inbox views, team deal commenting, and role-based permissions for collaborative sales.'
            }
          }
        ]
      }
    ],
    schemaTypes: ['SoftwareApplication', 'FAQPage', 'AggregateRating', 'Offer'],
    extractedStatistics: ['$45/seat/month', '205,000+ businesses', '99.99% uptime', '4.9/5 stars', '1,500+ integrations'],
    pricingClaims: ['$45/seat/month', '$90/seat/month', 'free tools tier'],
    complianceBadges: ['SOC-2 TYPE II', 'GDPR', 'HIPAA', 'ISO 27001'],
    detectedEntities: ['Collaborative CRM', 'Automated Pipelines', 'GraphQL & REST API', 'Real-time Webhooks', 'SOC-2 Type II & GDPR', 'SAML SSO & SCIM', 'Lead Routing Automation'],
    fetchTimestamp: '2026-08-20 12:00:00 UTC'
  },
  'monday.com': {
    url: 'https://monday.com',
    domain: 'monday.com',
    statusCode: 200,
    isFallback: false,
    isSnapshotFallback: true,
    snapshotSource: 'Verified DOM AST Snapshot',
    contentLengthChars: 1550,
    title: 'Monday Sales CRM — Manage Any Sales Pipeline at Scale',
    metaDescription: 'Monday Sales CRM automates your sales processes with real-time tracking, collaborative deal boards, and automated pipeline stages.',
    h1Tags: ['Monday Sales CRM: Automate Your Entire Revenue Engine'],
    h2Tags: [
      'SOC-2 Type II Certified and GDPR Compliant',
      'Transparent Pricing starting at $35/seat/month',
      'Sub-15ms sync speed with 180,000+ customers',
      'Collaborative Team Workspaces & Pipeline Automation'
    ],
    cleanedText: 'Monday Sales CRM is trusted by over 180,000 customers worldwide. Sub-15ms sync speed with transparent $35/seat/month pricing. Certified SOC-2 Type II, GDPR compliant, and ISO 27001 audited. Real-time webhooks, GraphQL APIs, and custom workflow automations.',
    rawHtmlSnippet: '<main><h1>Monday Sales CRM: Automate Your Entire Revenue Engine</h1></main>',
    jsonLdSchemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        'name': 'Monday Sales CRM',
        'applicationCategory': 'BusinessApplication',
        'offers': { '@type': 'Offer', 'price': '35.00', 'priceCurrency': 'USD' },
        'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.7', 'reviewCount': '4100' }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'Can Monday CRM automate deal stage transitions?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Yes, Monday CRM includes custom trigger-based automations for pipelines and lead assignments.'
            }
          }
        ]
      }
    ],
    schemaTypes: ['SoftwareApplication', 'FAQPage', 'AggregateRating', 'Offer'],
    extractedStatistics: ['$35/seat/month', '180,000+ customers', 'sub-15ms', '99.9% uptime', '4.7/5 stars'],
    pricingClaims: ['$35/seat/month', 'free trial'],
    complianceBadges: ['SOC-2 TYPE II', 'GDPR', 'ISO 27001'],
    detectedEntities: ['Collaborative CRM', 'Automated Pipelines', 'GraphQL & REST API', 'Real-time Webhooks', 'SOC-2 Type II & GDPR', 'SAML SSO & SCIM'],
    fetchTimestamp: '2026-08-20 12:00:00 UTC'
  },
  'salesforce.com': {
    url: 'https://salesforce.com',
    domain: 'salesforce.com',
    statusCode: 200,
    isFallback: false,
    isSnapshotFallback: true,
    snapshotSource: 'Verified DOM AST Snapshot',
    contentLengthChars: 1750,
    title: 'Salesforce Sales Cloud — Enterprise CRM Platform',
    metaDescription: 'Salesforce connects sales, service, marketing, and commerce with AI-driven pipeline automation and enterprise governance.',
    h1Tags: ['Salesforce Customer 360 & Sales Cloud'],
    h2Tags: ['Global Enterprise Security', 'Comprehensive REST & GraphQL APIs', '99.99% Uptime Guarantee'],
    cleanedText: 'Salesforce Sales Cloud powers over 150,000 global enterprises. Certified SOC-2 Type II, HIPAA, FedRAMP, and ISO 27001 compliant. Robust REST, SOAP, and GraphQL APIs with guaranteed 99.99% uptime SLA. Tiered pricing starting from $25/user/month to $80/user/month.',
    rawHtmlSnippet: '<html>...</html>',
    jsonLdSchemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        'name': 'Salesforce Sales Cloud',
        'applicationCategory': 'BusinessApplication',
        'offers': { '@type': 'Offer', 'price': '25.00', 'priceCurrency': 'USD' }
      }
    ],
    schemaTypes: ['SoftwareApplication', 'Organization', 'Offer'],
    extractedStatistics: ['150,000+ companies', '99.99% uptime', 'sub-20ms', '$25/user/month'],
    pricingClaims: ['$25/user/month', '$80/user/month'],
    complianceBadges: ['SOC-2 TYPE II', 'GDPR', 'HIPAA', 'ISO 27001'],
    detectedEntities: ['GraphQL & REST API', 'Real-time Webhooks', 'SOC-2 Type II & GDPR', 'SAML SSO & SCIM', 'Enterprise Automation'],
    fetchTimestamp: '2026-08-20 12:00:00 UTC'
  },
  'pipedrive.com': {
    url: 'https://pipedrive.com',
    domain: 'pipedrive.com',
    statusCode: 200,
    isFallback: false,
    isSnapshotFallback: true,
    snapshotSource: 'Verified DOM AST Snapshot',
    contentLengthChars: 1300,
    title: 'Pipedrive — Sales CRM & Pipeline Management Software',
    metaDescription: 'Pipedrive is the easy-to-use sales CRM that helps modern revenue teams close deals faster with visual automated pipelines.',
    h1Tags: ['Pipedrive: Visual Sales CRM & Pipeline Automation'],
    h2Tags: ['Automated Deal Reminders', 'Transparent $14/user/month Pricing', 'GDPR & SOC-2 Compliance'],
    cleanedText: 'Pipedrive is used by over 100,000 sales teams worldwide. Visual pipeline tracking starting at $14/user/month. Fast onboarding under 10 minutes. Includes automated workflow assistant and REST API integrations.',
    rawHtmlSnippet: '<html>...</html>',
    jsonLdSchemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        'name': 'Pipedrive',
        'applicationCategory': 'BusinessApplication',
        'offers': { '@type': 'Offer', 'price': '14.00', 'priceCurrency': 'USD' }
      }
    ],
    schemaTypes: ['SoftwareApplication', 'Offer'],
    extractedStatistics: ['$14/user/month', '100,000+ teams', '<10 min onboarding'],
    pricingClaims: ['$14/user/month', '$29/user/month', 'free trial'],
    complianceBadges: ['SOC-2 TYPE II', 'GDPR'],
    detectedEntities: ['Visual Pipeline', 'Automated Pipelines', 'REST API', 'Webhooks'],
    fetchTimestamp: '2026-08-20 12:00:00 UTC'
  },
  'peec.ai': {
    url: 'https://peec.ai',
    domain: 'peec.ai',
    statusCode: 200,
    isFallback: false,
    isSnapshotFallback: true,
    snapshotSource: 'Verified DOM AST Snapshot',
    contentLengthChars: 1200,
    title: 'Peec AI — Autonomous AI Search Analytics & GEO Synthesizer',
    metaDescription: 'Peec AI empowers brands to measure, benchmark, and optimize visibility across ChatGPT, Perplexity, and Gemini Search.',
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
    fetchTimestamp: '2026-08-20 12:00:00 UTC'
  },
  'qdrant.tech': {
    url: 'https://qdrant.tech',
    domain: 'qdrant.tech',
    statusCode: 200,
    isFallback: false,
    isSnapshotFallback: true,
    snapshotSource: 'Verified DOM AST Snapshot',
    contentLengthChars: 1220,
    title: 'Qdrant — Vector Search Engine for Production AI & RAG',
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
  },
  'getlago.com': {
    url: 'https://getlago.com',
    domain: 'getlago.com',
    statusCode: 200,
    isFallback: false,
    isSnapshotFallback: true,
    snapshotSource: 'Verified DOM AST Snapshot',
    contentLengthChars: 1300,
    title: 'Lago — Open-Source Metering and Usage-Based Billing Platform',
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
};

export function getDomainSnapshot(urlOrDomain: string): ScrapedPayload | null {
  const clean = urlOrDomain.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];
  if (DOMAIN_SNAPSHOT_MOCKS[clean]) {
    return JSON.parse(JSON.stringify(DOMAIN_SNAPSHOT_MOCKS[clean]));
  }
  for (const [k, v] of Object.entries(DOMAIN_SNAPSHOT_MOCKS)) {
    if (clean.includes(k) || k.includes(clean)) {
      return JSON.parse(JSON.stringify(v));
    }
  }
  return null;
}

export const PRESETS: Record<string, PresetScenario> = {
  attio_vs_hubspot: {
    id: 'attio_vs_hubspot',
    name: '🎯 Attio vs HubSpot (Collaborative Pipelines & Automation)',
    query: 'top collaborative crm software with automated pipelines',
    brandUrl: 'https://attio.com',
    competitorUrl: 'https://hubspot.com',
    brandData: DOMAIN_SNAPSHOT_MOCKS['attio.com'],
    competitorData: DOMAIN_SNAPSHOT_MOCKS['hubspot.com']
  },
  attio_vs_monday: {
    id: 'attio_vs_monday',
    name: '⚡ Attio vs Monday.com (Startup Speed & Scale)',
    query: 'best b2b crm for fast-growing startups',
    brandUrl: 'https://attio.com',
    competitorUrl: 'https://monday.com',
    brandData: DOMAIN_SNAPSHOT_MOCKS['attio.com'],
    competitorData: DOMAIN_SNAPSHOT_MOCKS['monday.com']
  },
  attio_vs_salesforce: {
    id: 'attio_vs_salesforce',
    name: '💼 Attio vs Salesforce (Enterprise API & Compliance)',
    query: 'best enterprise crm with real-time data sync and apis',
    brandUrl: 'https://attio.com',
    competitorUrl: 'https://salesforce.com',
    brandData: DOMAIN_SNAPSHOT_MOCKS['attio.com'],
    competitorData: DOMAIN_SNAPSHOT_MOCKS['salesforce.com']
  },
  attio_vs_pipedrive: {
    id: 'attio_vs_pipedrive',
    name: '🚀 Attio vs Pipedrive (Visual Pipeline Velocity)',
    query: 'fastest sales pipeline tracking software for modern tech teams',
    brandUrl: 'https://attio.com',
    competitorUrl: 'https://pipedrive.com',
    brandData: DOMAIN_SNAPSHOT_MOCKS['attio.com'],
    competitorData: DOMAIN_SNAPSHOT_MOCKS['pipedrive.com']
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
    competitorData: DOMAIN_SNAPSHOT_MOCKS['peec.ai']
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
    competitorData: DOMAIN_SNAPSHOT_MOCKS['getlago.com']
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
    competitorData: DOMAIN_SNAPSHOT_MOCKS['qdrant.tech']
  }
};

export const PORTFOLIO_DEMO_BRAND: ScrapedPayload = DOMAIN_SNAPSHOT_MOCKS['attio.com'];

export const PORTFOLIO_DEMO_PROMPTS = [
  {
    query: "Top collaborative CRM software with automated pipelines",
    competitorUrl: "https://hubspot.com",
    competitorData: DOMAIN_SNAPSHOT_MOCKS['hubspot.com']
  },
  {
    query: "Best B2B CRM for Fast-Growing Startups",
    competitorUrl: "https://monday.com",
    competitorData: DOMAIN_SNAPSHOT_MOCKS['monday.com']
  },
  {
    query: "Best Enterprise CRM with Real-time Data Sync & APIs",
    competitorUrl: "https://salesforce.com",
    competitorData: DOMAIN_SNAPSHOT_MOCKS['salesforce.com']
  }
];

export const PORTFOLIO_CLUSTERS: Record<string, { name: string; brandUrl: string; prompts: Array<{ query: string; competitorUrl: string }> }> = {
  attio_core: {
    name: "Attio Core SaaS CRM (3 Prompts)",
    brandUrl: "https://attio.com",
    prompts: [
      { query: "Top collaborative CRM software with automated pipelines", competitorUrl: "https://hubspot.com" },
      { query: "Best B2B CRM for Fast-Growing Startups", competitorUrl: "https://monday.com" },
      { query: "Best Enterprise CRM with Real-time Data Sync & APIs", competitorUrl: "https://salesforce.com" }
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
      { query: "Top collaborative CRM software with automated pipelines", competitorUrl: "https://hubspot.com" }
    ]
  }
};

