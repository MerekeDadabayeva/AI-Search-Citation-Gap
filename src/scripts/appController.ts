import type { CitationGapResult, PortfolioAnalysisResult } from '../lib/types';
import { PORTFOLIO_DEMO_PROMPTS, PORTFOLIO_CLUSTERS } from '../lib/presets';
import { LiveSynthesizer } from '../lib/liveSynthesizer';
import { PortfolioAggregator } from '../lib/portfolioEngine';

export class AppController {
  private userGeminiApiKey: string = '';
  private currentSingleResult: CitationGapResult | null = null;
  private currentPortfolioResult: PortfolioAnalysisResult | null = null;
  private currentViewMode: 'marketer' | 'developer' = 'marketer';

  private portfolioRows = [
    { query: PORTFOLIO_DEMO_PROMPTS[0].query, competitorUrl: PORTFOLIO_DEMO_PROMPTS[0].competitorUrl },
    { query: PORTFOLIO_DEMO_PROMPTS[1].query, competitorUrl: PORTFOLIO_DEMO_PROMPTS[1].competitorUrl },
    { query: PORTFOLIO_DEMO_PROMPTS[2].query, competitorUrl: PORTFOLIO_DEMO_PROMPTS[2].competitorUrl },
  ];

  init() {
    this.initApiKey();
    this.initNavigation();
    this.initSingleMode();
    this.initPortfolioMode();
    this.initExportHandlers();

    // Initial Execution
    this.runSingleAnalysis();
    this.renderPortfolioRows();
    this.runPortfolioAnalysis();
  }

  // ── 1. API Key Management ─────────────────────────────────────────────
  private initApiKey() {
    this.userGeminiApiKey = localStorage.getItem('peec_gemini_api_key') || '';

    document.getElementById('btnOpenApiKeyModal')?.addEventListener('click', () => {
      const modal = document.getElementById('apiKeyModal');
      const input = document.getElementById('apiKeyInput') as HTMLInputElement;
      if (input) input.value = this.userGeminiApiKey;
      if (modal) modal.style.display = 'flex';
    });

    document.getElementById('btnCloseApiKeyModal')?.addEventListener('click', () => {
      const modal = document.getElementById('apiKeyModal');
      if (modal) modal.style.display = 'none';
    });

    document.getElementById('btnSaveApiKey')?.addEventListener('click', () => {
      const input = document.getElementById('apiKeyInput') as HTMLInputElement;
      this.userGeminiApiKey = input.value.trim();
      localStorage.setItem('peec_gemini_api_key', this.userGeminiApiKey);
      const modal = document.getElementById('apiKeyModal');
      if (modal) modal.style.display = 'none';
      alert(this.userGeminiApiKey ? '✅ Gemini API Key saved! Live AI Synthesis enabled.' : 'Live AI Key cleared. Using native live scraper.');
    });

    document.getElementById('btnClearApiKey')?.addEventListener('click', () => {
      this.userGeminiApiKey = '';
      localStorage.removeItem('peec_gemini_api_key');
      const input = document.getElementById('apiKeyInput') as HTMLInputElement;
      if (input) input.value = '';
      const modal = document.getElementById('apiKeyModal');
      if (modal) modal.style.display = 'none';
    });
  }

  // ── 2. View & Tab Navigation ──────────────────────────────────────────
  private initNavigation() {
    const navButtons = document.querySelectorAll('.nav-item[data-view]');
    const viewPanes = document.querySelectorAll('.view-pane');

    const switchView = (viewId: string) => {
      viewPanes.forEach(pane => pane.classList.remove('active'));
      navButtons.forEach(btn => btn.classList.remove('active'));

      const targetPane = document.getElementById(viewId);
      if (targetPane) targetPane.classList.add('active');

      const targetBtn = document.querySelector(`.nav-item[data-view="${viewId}"]`);
      if (targetBtn) targetBtn.classList.add('active');
    };

    navButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const viewId = (btn as HTMLElement).dataset.view!;
        switchView(viewId);
      });
    });

    document.getElementById('openGapFromBanner')?.addEventListener('click', () => switchView('view-gap'));
    document.getElementById('btnGoToGap')?.addEventListener('click', () => switchView('view-gap'));

    document.querySelectorAll('.table-diagnose-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const comp = (btn as HTMLElement).dataset.comp || 'monday.com';
        const compInput = document.getElementById('compUrlInput') as HTMLInputElement;
        if (compInput) compInput.value = `https://${comp}`;
        switchView('view-gap');
        this.runSingleAnalysis();
      });
    });

    // Single vs Portfolio Mode Switcher
    const btnSingleMode = document.getElementById('btnSingleMode');
    const btnPortfolioMode = document.getElementById('btnPortfolioMode');
    const singleContainer = document.getElementById('singleModeContainer');
    const portfolioContainer = document.getElementById('portfolioModeContainer');

    btnSingleMode?.addEventListener('click', () => {
      btnSingleMode.classList.add('active');
      btnPortfolioMode?.classList.remove('active');
      singleContainer?.classList.add('active');
      portfolioContainer?.classList.remove('active');
    });

    btnPortfolioMode?.addEventListener('click', () => {
      btnPortfolioMode.classList.add('active');
      btnSingleMode?.classList.remove('active');
      portfolioContainer?.classList.add('active');
      singleContainer?.classList.remove('active');
      this.renderPortfolioRows();
      this.runPortfolioAnalysis();
    });
  }

  // ── 3. Single Prompt Controller ───────────────────────────────────────
  private initSingleMode() {
    const analyzeBtn = document.getElementById('analyzeBtn');
    analyzeBtn?.addEventListener('click', () => this.runSingleAnalysis());

    const btnMarketerView = document.getElementById('btnMarketerView');
    const btnDevView = document.getElementById('btnDevView');

    btnMarketerView?.addEventListener('click', () => {
      btnMarketerView.classList.add('active');
      btnDevView?.classList.remove('active');
      this.currentViewMode = 'marketer';
      if (this.currentSingleResult) this.renderActionFeed(this.currentSingleResult);
    });

    btnDevView?.addEventListener('click', () => {
      btnDevView.classList.add('active');
      btnMarketerView?.classList.remove('active');
      this.currentViewMode = 'developer';
      if (this.currentSingleResult) this.renderActionFeed(this.currentSingleResult);
    });

    // Scenario preset chips
    document.querySelectorAll('.chip[data-brand]').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.chip[data-brand]').forEach(c => c.classList.remove('chip-active'));
        chip.classList.add('chip-active');

        const brandInput = document.getElementById('brandUrlInput') as HTMLInputElement;
        const compInput = document.getElementById('compUrlInput') as HTMLInputElement;
        const queryInput = document.getElementById('queryInput') as HTMLInputElement;

        if (brandInput) brandInput.value = (chip as HTMLElement).dataset.brand!;
        if (compInput) compInput.value = (chip as HTMLElement).dataset.comp!;
        if (queryInput) queryInput.value = (chip as HTMLElement).dataset.query!;

        this.runSingleAnalysis();
      });
    });
  }

  private async runSingleAnalysis() {
    const brandInput = document.getElementById('brandUrlInput') as HTMLInputElement;
    const compInput = document.getElementById('compUrlInput') as HTMLInputElement;
    const queryInput = document.getElementById('queryInput') as HTMLInputElement;
    const analyzeBtn = document.getElementById('analyzeBtn') as HTMLButtonElement;

    if (!analyzeBtn || !brandInput || !compInput || !queryInput) return;

    // Show live scanning progress state
    const scannerCard = document.getElementById('diagnosticScannerCard');
    const scanTitle = document.getElementById('scanStepTitle');
    const scanDesc = document.getElementById('scanStepDesc');
    const scanProgress = document.getElementById('scanProgressFill');
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const step3 = document.getElementById('step3');

    if (scannerCard) scannerCard.style.display = 'block';
    analyzeBtn.innerHTML = '<span>🔍 Diagnosing Live...</span>';
    analyzeBtn.disabled = true;

    if (step1) step1.className = 'step-item active';
    if (step2) step2.className = 'step-item';
    if (step3) step3.className = 'step-item';
    if (scanProgress) scanProgress.style.width = '30%';
    if (scanTitle) scanTitle.textContent = `Connecting to ${compInput.value}...`;
    if (scanDesc) scanDesc.textContent = 'Fetching live HTML & extracting competitor pricing, numbers, and features';

    setTimeout(() => {
      if (step2) step2.className = 'step-item active';
      if (scanProgress) scanProgress.style.width = '70%';
      if (scanTitle) scanTitle.textContent = `Prompting AI Search expectations for "${queryInput.value}"...`;
      if (scanDesc) scanDesc.textContent = 'Diffing competitor claims with your brand page content';
    }, 450);

    try {
      const result = await LiveSynthesizer.synthesizeGap(
        queryInput.value,
        brandInput.value,
        compInput.value,
        this.userGeminiApiKey ? { apiKey: this.userGeminiApiKey, apiProvider: 'gemini' } : undefined
      );

      if (step3) step3.className = 'step-item active';
      if (scanProgress) scanProgress.style.width = '100%';
      if (scanTitle) scanTitle.textContent = 'Synthesizing plain-English remediation actions...';
      if (scanDesc) scanDesc.textContent = `Found ${result.schemaGaps.length + result.benchmarkGaps.length} gaps explaining why ${this.getDomain(compInput.value)} wins citations`;

      setTimeout(() => {
        this.renderSingleUI(result);
        if (scannerCard) scannerCard.style.display = 'none';
        analyzeBtn.innerHTML = '<span>🚀 Synthesize Citation Gap</span>';
        analyzeBtn.disabled = false;

        document.getElementById('executiveSummaryCard')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    } catch (err) {
      console.error(err);
      analyzeBtn.innerHTML = '<span>🚀 Synthesize Citation Gap</span>';
      analyzeBtn.disabled = false;
      if (scannerCard) scannerCard.style.display = 'none';
    }
  }

  private renderSingleUI(result: CitationGapResult) {
    this.currentSingleResult = result;
    const brandDom = this.getDomain(result.brandPayload.url);
    const compDom = this.getDomain(result.competitorPayload.url);

    // Executive Summary
    const execTitle = document.getElementById('execTitle');
    const execText = document.getElementById('execText');
    const execTime = document.getElementById('execTimestamp');

    if (execTitle) {
      execTitle.textContent = `Why ${compDom} is Winning Citations on "${result.query}"`;
    }
    if (execText) {
      const topProof = result.benchmarkGaps.slice(0, 2).map(b => `"${b.competitorValue}"`).join(' and ');
      execText.innerHTML = `
        When people search AI for <strong>"${this.escHtml(result.query)}"</strong>, AI engines (ChatGPT, Perplexity, Gemini) recommend <strong>${this.escHtml(compDom)}</strong> because their website provides <strong>clear numbers (${this.escHtml(topProof)})</strong> and <strong>readable product tags</strong>. Your page (<strong>${this.escHtml(brandDom)}</strong>) is currently missing these specific proof points, so AI passes you over.
      `;
    }
    if (execTime) {
      execTime.textContent = `Live Scraped • Verified against AI Search • ${result.executionTimeMs}ms`;
    }

    // Scorecard stats
    const statSchema = document.getElementById('statSchemaCount');
    const statBench = document.getElementById('statBenchmarkCount');
    const statEntity = document.getElementById('statEntityCount');
    if (statSchema) statSchema.textContent = String(result.schemaGaps.length);
    if (statBench) statBench.textContent = String(result.benchmarkGaps.length);
    if (statEntity) statEntity.textContent = String(result.entityGaps.length);

    // Matrix
    const labelBrand = document.getElementById('labelBrand');
    const labelComp = document.getElementById('labelComp');
    if (labelBrand) labelBrand.textContent = `Your Page (${brandDom})`;
    if (labelComp) labelComp.textContent = `Winning Competitor (${compDom})`;

    const cellSchemaBrand = document.getElementById('cellSchemaBrand');
    const textSchemaBrand = document.getElementById('textSchemaBrand');
    const textSchemaComp = document.getElementById('textSchemaComp');
    if (result.schemaGaps.length > 0) {
      if (cellSchemaBrand) cellSchemaBrand.className = 'row-cell cell-missing';
      if (textSchemaBrand) textSchemaBrand.textContent = `Missing Product & FAQ tags (AI is blind to your pricing & features)`;
      if (textSchemaComp) textSchemaComp.textContent = `Has verified ${result.schemaGaps.map(g => g.schemaType).join(' & ')} tags`;
    } else {
      if (cellSchemaBrand) cellSchemaBrand.className = 'row-cell cell-has';
      if (textSchemaBrand) textSchemaBrand.textContent = 'All machine tags matched';
    }

    const textBenchmarkBrand = document.getElementById('textBenchmarkBrand');
    const textBenchmarkComp = document.getElementById('textBenchmarkComp');
    if (result.benchmarkGaps.length > 0) {
      const compProof = result.benchmarkGaps.slice(0, 2).map(g => g.competitorValue).join(', ');
      if (textBenchmarkBrand) textBenchmarkBrand.textContent = 'No specific numbers on speed, customers, or pricing';
      if (textBenchmarkComp) textBenchmarkComp.textContent = `Quotes exact proof: ${compProof}`;
    }

    const textEntityBrand = document.getElementById('textEntityBrand');
    const textEntityComp = document.getElementById('textEntityComp');
    if (textEntityBrand) textEntityBrand.textContent = `Missing ${result.entityGaps.length} keywords AI expects for this search`;
    if (textEntityComp) textEntityComp.textContent = `Complete coverage across all category search terms`;

    this.renderActionFeed(result);
  }

  private renderActionFeed(result: CitationGapResult) {
    const list = document.getElementById('actionItemsList');
    if (!list) return;

    const isMarketer = this.currentViewMode === 'marketer';
    const actions: Array<{ title: string; desc: string; why: string; tag: string; snippet?: string; copyText: string }> = [];

    // 1. Schema Actions
    result.schemaGaps.forEach(g => {
      actions.push({
        title: isMarketer
          ? `Tell AI What Your Product Is & Costs (Add ${g.schemaType} tag)`
          : `Inject Schema.org @type ${g.schemaType}`,
        desc: isMarketer
          ? `AI search engines (ChatGPT, Perplexity) look for standard product tags in your website code. Without this tag, AI doesn't know your price or category and quotes competitors instead.`
          : g.impactReason,
        why: isMarketer
          ? `💡 Why AI cares: Competitor has this tag, allowing AI to show their product card in search results.`
          : `Technical requirement for Perplexity Sonar & ChatGPT Search parsers.`,
        tag: isMarketer ? 'Website Setup • 10 min fix' : 'Technical SEO • <15 min',
        snippet: !isMarketer ? g.recommendedJsonLd : undefined,
        copyText: g.recommendedJsonLd
      });
    });

    // 2. Benchmark Actions
    result.benchmarkGaps.forEach(g => {
      actions.push({
        title: isMarketer
          ? `Put Hard Numbers on Your Page: ${g.metricName}`
          : `Add Quantitative Metric: ${g.metricName}`,
        desc: isMarketer
          ? `Your competitor explicitly quotes "${g.competitorValue}". To beat them, ${g.recommendation.toLowerCase()}`
          : `Competitor explicitly states "${g.competitorValue}". Action: ${g.recommendation}`,
        why: isMarketer
          ? `💡 Why AI cares: AI search engines favor pages with hard numbers over vague marketing copy.`
          : g.competitorEvidence,
        tag: isMarketer ? 'Homepage Copy • 15 min fix' : 'Landing Page Copy • <20 min',
        copyText: `Recommendation for ${g.metricName}: ${g.recommendation}`
      });
    });

    // 3. Topic Entity Actions
    result.entityGaps.forEach(g => {
      if (g && g.entityName) {
        actions.push({
          title: isMarketer
            ? `Mention Key Feature: "${g.entityName}"`
            : `Cover Topic Entity: ${g.entityName}`,
          desc: isMarketer
            ? `When users search for this query, AI expects to see "${g.entityName}". ${g.actionPlan}`
            : `${g.searchRelevance}. ${g.actionPlan}`,
          why: isMarketer
            ? `💡 Why AI cares: Competitors mention this term; adding it ensures AI includes you in comparisons.`
            : g.searchRelevance,
          tag: isMarketer ? 'Feature Section • 20 min fix' : `${g.category} • <30 min`,
          copyText: `Add mention of '${g.entityName}' to product features: ${g.actionPlan}`
        });
      }
    });

    const countElem = document.getElementById('remediationCount');
    if (countElem) countElem.textContent = `${actions.length} Simple Fixes`;

    list.innerHTML = actions.map((act, i) => `
      <div class="action-item-card">
        <div class="action-num">${i + 1}</div>
        <div class="action-content">
          <div class="action-title">${this.escHtml(act.title)}</div>
          <div class="action-desc">${this.escHtml(act.desc)}</div>
          <div class="action-why">${this.escHtml(act.why)}</div>
          ${act.snippet ? `<div class="action-code-snippet"><pre><code>${this.escHtml(act.snippet)}</code></pre></div>` : ''}
          <div class="action-tags">
            <span class="action-tag">${act.tag}</span>
          </div>
        </div>
        <button class="btn-copy-fix" data-copy="${encodeURIComponent(act.copyText)}">
          ${isMarketer ? 'Copy Recommendation' : 'Copy Code Fix'}
        </button>
      </div>
    `).join('');

    list.querySelectorAll('.btn-copy-fix').forEach(btn => {
      btn.addEventListener('click', () => {
        const text = decodeURIComponent((btn as HTMLElement).dataset.copy || '');
        navigator.clipboard.writeText(text).then(() => {
          btn.textContent = 'Copied ✓';
          btn.classList.add('copied');
          setTimeout(() => {
            btn.textContent = isMarketer ? 'Copy Recommendation' : 'Copy Code Fix';
            btn.classList.remove('copied');
          }, 2000);
        });
      });
    });
  }

  // ── 4. Portfolio Controller ───────────────────────────────────────────
  private initPortfolioMode() {
    // Cluster preset chips
    document.querySelectorAll('.chip[data-cluster]').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.chip[data-cluster]').forEach(c => c.classList.remove('chip-active'));
        chip.classList.add('chip-active');
        const key = (chip as HTMLElement).dataset.cluster!;
        const cluster = PORTFOLIO_CLUSTERS[key];
        if (cluster) {
          const brandInput = document.getElementById('portfolioBrandUrlInput') as HTMLInputElement;
          if (brandInput) brandInput.value = cluster.brandUrl;
          this.portfolioRows = cluster.prompts.map(p => ({ query: p.query, competitorUrl: p.competitorUrl }));
          this.renderPortfolioRows();
          this.runPortfolioAnalysis();
        }
      });
    });

    document.getElementById('btnAddPromptRow')?.addEventListener('click', () => {
      this.portfolioRows.push({
        query: 'Top Software with SOC-2 Compliance and Instant Onboarding',
        competitorUrl: 'https://monday.com/crm'
      });
      this.renderPortfolioRows();
      const inputs = document.querySelectorAll('.prompt-query-input');
      const lastInput = inputs[inputs.length - 1] as HTMLInputElement;
      lastInput?.focus();
    });

    document.getElementById('btnResetPortfolio')?.addEventListener('click', () => {
      this.portfolioRows = [
        { query: PORTFOLIO_DEMO_PROMPTS[0].query, competitorUrl: PORTFOLIO_DEMO_PROMPTS[0].competitorUrl },
        { query: PORTFOLIO_DEMO_PROMPTS[1].query, competitorUrl: PORTFOLIO_DEMO_PROMPTS[1].competitorUrl },
        { query: PORTFOLIO_DEMO_PROMPTS[2].query, competitorUrl: PORTFOLIO_DEMO_PROMPTS[2].competitorUrl },
      ];
      this.renderPortfolioRows();
      this.runPortfolioAnalysis();
    });

    document.getElementById('btnRunPortfolio')?.addEventListener('click', () => this.runPortfolioAnalysis());
  }

  private renderPortfolioRows() {
    const container = document.getElementById('portfolioRowsList');
    if (!container) return;

    container.innerHTML = this.portfolioRows.map((row, idx) => `
      <div class="prompt-row-card" data-idx="${idx}">
        <div class="row-num-badge">${idx + 1}</div>
        <div class="row-fields">
          <div class="row-field">
            <span class="field-sublabel">Search Query</span>
            <input class="input prompt-query-input" type="text" value="${this.escHtml(row.query)}" placeholder="e.g. Best CRM for Startups" data-idx="${idx}" />
          </div>
          <div class="row-field">
            <span class="field-sublabel">Winning Competitor URL</span>
            <input class="input prompt-comp-input" type="url" value="${this.escHtml(row.competitorUrl)}" placeholder="https://competitor.com/features" data-idx="${idx}" />
          </div>
        </div>
        <button class="btn-remove-row" data-idx="${idx}" title="Remove prompt row">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
      </div>
    `).join('');

    container.querySelectorAll('.prompt-query-input').forEach(input => {
      input.addEventListener('input', (e) => {
        const idx = parseInt((input as HTMLElement).dataset.idx || '0');
        this.portfolioRows[idx].query = (e.target as HTMLInputElement).value;
      });
    });

    container.querySelectorAll('.prompt-comp-input').forEach(input => {
      input.addEventListener('input', (e) => {
        const idx = parseInt((input as HTMLElement).dataset.idx || '0');
        this.portfolioRows[idx].competitorUrl = (e.target as HTMLInputElement).value;
      });
    });

    container.querySelectorAll('.btn-remove-row').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt((btn as HTMLElement).dataset.idx || '0');
        if (this.portfolioRows.length > 1) {
          this.portfolioRows.splice(idx, 1);
          this.renderPortfolioRows();
          this.runPortfolioAnalysis();
        }
      });
    });
  }

  private async runPortfolioAnalysis() {
    const brandUrl = (document.getElementById('portfolioBrandUrlInput') as HTMLInputElement)?.value || 'https://our-saas-crm.io';
    const brandDomain = this.getDomain(brandUrl);
    const results: CitationGapResult[] = [];

    for (const row of this.portfolioRows) {
      const res = await LiveSynthesizer.synthesizeGap(row.query, brandUrl, row.competitorUrl);
      results.push(res);
    }

    const portfolio = PortfolioAggregator.aggregate(brandDomain, results);
    this.currentPortfolioResult = portfolio;
    this.renderPortfolioUI(portfolio);
  }

  private renderPortfolioUI(portfolio: PortfolioAnalysisResult) {
    const resultsArea = document.getElementById('portfolioResultsArea');
    if (resultsArea) resultsArea.style.display = 'block';

    const pPrompts = document.getElementById('portStatPrompts');
    const pComps = document.getElementById('portStatCompetitors');
    const pGaps = document.getElementById('portStatGaps');
    const pMax = document.getElementById('portStatMaxRecur');

    if (pPrompts) pPrompts.textContent = String(portfolio.totalPromptsAnalyzed);
    if (pComps) pComps.textContent = String(portfolio.totalDistinctCompetitors);
    if (pGaps) pGaps.textContent = String(portfolio.recurringGaps.length);
    if (pMax && portfolio.recurringGaps.length > 0) {
      const top = portfolio.recurringGaps[0];
      pMax.textContent = `${top.recurrenceCount} / ${portfolio.totalPromptsAnalyzed}`;
    }

    const tbody = document.getElementById('perPromptTableBody');
    if (tbody) {
      tbody.innerHTML = portfolio.perPromptBreakdowns.map((b, i) => `
        <tr>
          <td>${i + 1}</td>
          <td><strong>${this.escHtml(b.query)}</strong></td>
          <td><span class="pill-stat">${this.escHtml(b.competitorDomain)}</span></td>
          <td><span class="stat-badge red">${this.escHtml(b.topMissingSchema)}</span></td>
          <td><span class="stat-badge amber">${b.schemaGapsCount + b.benchmarkGapsCount} Gaps Detected</span></td>
        </tr>
      `).join('');
    }

    const barsList = document.getElementById('recurrenceBarsList');
    if (barsList) {
      const total = portfolio.totalPromptsAnalyzed || 1;
      barsList.innerHTML = portfolio.recurringGaps.map(g => {
        const pct = Math.round((g.recurrenceCount / total) * 100);
        const fillClass = g.citationWeight === 'CRITICAL' ? 'critical' : (g.citationWeight === 'HIGH' ? 'high' : '');
        return `
          <div class="bar-row">
            <div class="bar-label" title="${this.escHtml(g.displayName)}">${this.escHtml(g.displayName)}</div>
            <div class="bar-track">
              <div class="bar-fill ${fillClass}" style="width: ${pct}%;"></div>
            </div>
            <div class="bar-val">${g.recurrenceCount} / ${total} (${pct}%)</div>
          </div>
        `;
      }).join('');
    }

    const insightsList = document.getElementById('portfolioInsightsList');
    if (insightsList) {
      insightsList.innerHTML = portfolio.recurringGaps.map((g, idx) => {
        const pct = Math.round((g.recurrenceCount / (portfolio.totalPromptsAnalyzed || 1)) * 100);
        const isFull = pct === 100;
        return `
          <div class="insight-card">
            <div class="insight-header">
              <div class="insight-title-group">
                <span class="insight-rank-badge">#${idx + 1} HIGHEST ROI</span>
                <span class="insight-title">${this.escHtml(g.displayName)}</span>
              </div>
              <span class="insight-recur-badge ${isFull ? 'full' : ''}">Helps win back ${g.recurrenceCount} of ${portfolio.totalPromptsAnalyzed} Searches (${pct}% of losses)</span>
            </div>
            
            <div class="insight-meta">
              <strong>Why Competitor Wins:</strong> ${this.escHtml(g.lossReasonSummary)}
            </div>
            
            <div class="insight-meta">
              <strong>Recommendation:</strong> ${this.escHtml(g.representativeRecommendation)}
            </div>

            <div class="insight-code-box">
              <button class="insight-btn-copy" data-copy="${encodeURIComponent(g.readyCodeSnippet)}">Copy Fix</button>
              <pre><code>${this.escHtml(g.readyCodeSnippet)}</code></pre>
            </div>

            <div class="insight-prompts">
              <strong>Affected Search Queries:</strong>
              ${g.affectedPrompts.map(p => `<span class="prompt-pill-tag">"${this.escHtml(p)}"</span>`).join(' ')}
            </div>
          </div>
        `;
      }).join('');

      insightsList.querySelectorAll('.insight-btn-copy').forEach(btn => {
        btn.addEventListener('click', () => {
          const text = decodeURIComponent((btn as HTMLElement).dataset.copy || '');
          navigator.clipboard.writeText(text).then(() => {
            btn.textContent = 'Copied ✓';
            btn.classList.add('copied');
            setTimeout(() => {
              btn.textContent = 'Copy Fix';
              btn.classList.remove('copied');
            }, 2000);
          });
        });
      });
    }
  }

  // ── 5. Handoff & Export Handlers ──────────────────────────────────────
  private initExportHandlers() {
    document.getElementById('btnCopyBrief')?.addEventListener('click', () => {
      if (!this.currentSingleResult) return;
      navigator.clipboard.writeText(this.currentSingleResult.marketerBrief.markdownContent).then(() => {
        const btn = document.getElementById('btnCopyBrief');
        if (btn) btn.innerHTML = '<span>Copied Summary ✓</span>';
        setTimeout(() => {
          if (btn) btn.innerHTML = '<span>Copy Marketing Summary</span>';
        }, 2000);
      });
    });

    document.getElementById('btnDownloadBrief')?.addEventListener('click', () => {
      if (!this.currentSingleResult) return;
      const blob = new Blob([this.currentSingleResult.marketerBrief.markdownContent], { type: 'text/markdown' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `peec-ai-citation-gap-${this.getDomain(this.currentSingleResult.brandPayload.url)}-vs-${this.getDomain(this.currentSingleResult.competitorPayload.url)}.md`;
      a.click();
    });

    document.getElementById('btnCopyJira')?.addEventListener('click', () => {
      if (!this.currentSingleResult) return;
      navigator.clipboard.writeText(this.currentSingleResult.engineeringJira.jiraMarkdown).then(() => {
        const btn = document.getElementById('btnCopyJira');
        if (btn) btn.innerHTML = '<span>Copied Jira Story ✓</span>';
        setTimeout(() => {
          if (btn) btn.innerHTML = '<span>Copy Developer Jira Story</span>';
        }, 2000);
      });
    });

    document.getElementById('btnCopyPortfolioBrief')?.addEventListener('click', () => {
      if (!this.currentPortfolioResult) return;
      navigator.clipboard.writeText(this.currentPortfolioResult.bulkMarkdownBrief).then(() => {
        const btn = document.getElementById('btnCopyPortfolioBrief');
        if (btn) btn.innerHTML = '<span>Copied Bulk Summary ✓</span>';
        setTimeout(() => {
          if (btn) btn.innerHTML = '<span>Copy Bulk Summary</span>';
        }, 2000);
      });
    });

    document.getElementById('btnCopyJiraBacklog')?.addEventListener('click', () => {
      if (!this.currentPortfolioResult) return;
      navigator.clipboard.writeText(this.currentPortfolioResult.sprintJiraBacklog).then(() => {
        const btn = document.getElementById('btnCopyJiraBacklog');
        if (btn) btn.innerHTML = '<span>Copied Jira Backlog ✓</span>';
        setTimeout(() => {
          if (btn) btn.innerHTML = '<span>Copy Jira Backlog</span>';
        }, 2000);
      });
    });

    document.getElementById('btnDownloadPortfolioBrief')?.addEventListener('click', () => {
      if (!this.currentPortfolioResult) return;
      const blob = new Blob([this.currentPortfolioResult.bulkMarkdownBrief], { type: 'text/markdown' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `peec_ai_portfolio_brief_${this.currentPortfolioResult.brandDomain}.md`;
      a.click();
    });

    document.getElementById('headerExportBtn')?.addEventListener('click', () => {
      const targetBtn = document.querySelector('.nav-item[data-view="view-gap"]');
      (targetBtn as HTMLElement)?.click();
      document.getElementById('btnDownloadBrief')?.click();
    });
  }

  // ── Helper Utilities ──────────────────────────────────────────────────
  private getDomain(url: string): string {
    try { return new URL(url).hostname.replace(/^www\./, ''); }
    catch { return url.replace(/^www\./, '').split('/')[0]; }
  }

  private escHtml(str: string): string {
    if (str === undefined || str === null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
}

export function initApp() {
  const controller = new AppController();
  controller.init();
}
