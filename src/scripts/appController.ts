import type { CitationGapResult, PortfolioAnalysisResult, TargetEngine } from '../lib/types';
import { PORTFOLIO_DEMO_PROMPTS, PORTFOLIO_CLUSTERS } from '../lib/presets';
import { LiveSynthesizer } from '../lib/liveSynthesizer';
import { PortfolioAggregator } from '../lib/portfolioEngine';
import { TelemetryService } from '../lib/telemetry';

export class AppController {
  private userGeminiApiKey: string = '';
  private currentTargetEngine: TargetEngine = 'chatgpt';
  private currentSingleResult: CitationGapResult | null = null;
  private currentPortfolioResult: PortfolioAnalysisResult | null = null;
  private currentViewMode: 'marketer' | 'developer' = 'marketer';

  private portfolioRows = [
    { query: PORTFOLIO_DEMO_PROMPTS[0].query, competitorUrl: PORTFOLIO_DEMO_PROMPTS[0].competitorUrl },
    { query: PORTFOLIO_DEMO_PROMPTS[1].query, competitorUrl: PORTFOLIO_DEMO_PROMPTS[1].competitorUrl },
    { query: PORTFOLIO_DEMO_PROMPTS[2].query, competitorUrl: PORTFOLIO_DEMO_PROMPTS[2].competitorUrl },
  ];

  init() {
    TelemetryService.init();
    this.initApiKey();
    this.initNavigation();
    this.initSingleMode();
    this.initPortfolioMode();
    this.initEngineSelector();
    this.initSanitizationDrawer();
    this.initTelemetryDrawer();
    this.initCtaTracking();
    this.initExportHandlers();

    // Render portfolio table rows
    this.renderPortfolioRows();
    this.runPortfolioAnalysis();
    
    // Cold start & deep link state restoration
    this.restoreUrlState();
  }

  // ── 1. API Key Management ─────────────────────────────────────────────
  private initApiKey() {
    this.userGeminiApiKey = localStorage.getItem('peec_gemini_api_key') || '';

    document.getElementById('btnOpenApiKeyModal')?.addEventListener('click', () => {
      const modal = document.getElementById('apiKeyModal');
      const input = document.getElementById('apiKeyInput') as HTMLInputElement;
      if (input) input.value = this.userGeminiApiKey;
      if (modal) modal.style.display = 'flex';
      TelemetryService.track('api_key_modal_opened');
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
      TelemetryService.track('api_key_saved', { hasKey: !!this.userGeminiApiKey });
      alert(this.userGeminiApiKey ? '✅ Gemini API Key saved! Live AI Synthesis enabled.' : 'Live AI Key cleared. Using deterministic AST synthesizer.');
    });

    document.getElementById('btnClearApiKey')?.addEventListener('click', () => {
      this.userGeminiApiKey = '';
      localStorage.removeItem('peec_gemini_api_key');
      const input = document.getElementById('apiKeyInput') as HTMLInputElement;
      if (input) input.value = '';
      const modal = document.getElementById('apiKeyModal');
      if (modal) modal.style.display = 'none';
      TelemetryService.track('api_key_cleared');
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

      TelemetryService.track('view_switched', { targetView: viewId });
    };

    navButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const viewId = (btn as HTMLElement).dataset.view!;
        switchView(viewId);
      });
    });

    // Interactive Overview Chart Hover
    const chartCols = document.querySelectorAll('#chartHoverRegions .chart-col');
    const chartTooltip = document.getElementById('interactiveChartTooltip');
    const titleEl = document.getElementById('tooltipMonthTitle');
    const valM = document.getElementById('tooltipValMonday');
    const valS = document.getElementById('tooltipValSalesforce');
    const valA = document.getElementById('tooltipValAttio');
    const valZ = document.getElementById('tooltipValZero');
    const valP = document.getElementById('tooltipValPipedrive');

    chartCols.forEach(col => {
      const handleHover = () => {
        chartCols.forEach(c => c.classList.remove('active'));
        col.classList.add('active');
        const el = col as HTMLElement;
        if (chartTooltip && el.dataset.left) chartTooltip.style.left = el.dataset.left;
        if (titleEl && el.dataset.month) titleEl.textContent = `${el.dataset.month} 2026`;
        if (valM && el.dataset.m) valM.textContent = el.dataset.m;
        if (valS && el.dataset.s) valS.textContent = el.dataset.s;
        if (valA && el.dataset.a) valA.textContent = el.dataset.a;
        if (valZ && el.dataset.z) valZ.textContent = el.dataset.z;
        if (valP && el.dataset.p) valP.textContent = el.dataset.p;
      };
      col.addEventListener('mouseenter', handleHover);
      col.addEventListener('click', handleHover);
    });

    document.getElementById('openGapFromBanner')?.addEventListener('click', () => {
      const brandInput = document.getElementById('brandUrlInput') as HTMLInputElement;
      const compInput = document.getElementById('compUrlInput') as HTMLInputElement;
      const queryInput = document.getElementById('queryInput') as HTMLInputElement;
      if (brandInput) brandInput.value = 'https://attio.com';
      if (compInput) compInput.value = 'https://hubspot.com';
      if (queryInput) queryInput.value = 'top collaborative crm software with automated pipelines';
      switchView('view-gap');
      this.runSingleAnalysis();
    });

    document.getElementById('btnGoToGap')?.addEventListener('click', () => {
      switchView('view-gap');
      document.getElementById('btnPortfolioMode')?.click();
    });

    document.querySelectorAll('.table-diagnose-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const comp = (btn as HTMLElement).dataset.comp || 'hubspot.com';
        const query = (btn as HTMLElement).dataset.query || 'top collaborative crm software with automated pipelines';
        const brandInput = document.getElementById('brandUrlInput') as HTMLInputElement;
        const compInput = document.getElementById('compUrlInput') as HTMLInputElement;
        const queryInput = document.getElementById('queryInput') as HTMLInputElement;
        if (brandInput) brandInput.value = 'https://attio.com';
        if (compInput) compInput.value = comp.startsWith('http') ? comp : `https://${comp}`;
        if (queryInput) queryInput.value = query;
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
      TelemetryService.track('mode_toggled', { mode: 'single' });
    });

    btnPortfolioMode?.addEventListener('click', () => {
      btnPortfolioMode.classList.add('active');
      btnSingleMode?.classList.remove('active');
      portfolioContainer?.classList.add('active');
      singleContainer?.classList.remove('active');
      TelemetryService.track('mode_toggled', { mode: 'portfolio' });
      this.renderPortfolioRows();
      this.runPortfolioAnalysis();
    });
  }

  // ── 3. Target Engine GEO Switcher (Diagnostic 8) ──────────────────────
  private initEngineSelector() {
    const engineBtns = document.querySelectorAll('.engine-pill-btn[data-engine]');
    engineBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        engineBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentTargetEngine = ((btn as HTMLElement).dataset.engine || 'chatgpt') as TargetEngine;
        TelemetryService.track('target_engine_switched', { engine: this.currentTargetEngine });
        this.runSingleAnalysis();
      });
    });
  }

  // ── 4. Single Prompt Controller ───────────────────────────────────────
  private initSingleMode() {
    const analyzeBtn = document.getElementById('analyzeBtn');
    analyzeBtn?.addEventListener('click', () => this.runSingleAnalysis());

    // Top-Level Quick Export Shortcuts
    document.getElementById('btnTopCopyJira')?.addEventListener('click', () => {
      document.getElementById('btnCopyJira')?.click();
    });
    document.getElementById('btnTopCopyBrief')?.addEventListener('click', () => {
      document.getElementById('btnCopyBrief')?.click();
    });
    document.getElementById('btnTopDownloadBrief')?.addEventListener('click', () => {
      document.getElementById('btnDownloadBrief')?.click();
    });

    const btnMarketerView = document.getElementById('btnMarketerView');
    const btnDevView = document.getElementById('btnDevView');

    btnMarketerView?.addEventListener('click', () => {
      btnMarketerView.classList.add('active');
      btnDevView?.classList.remove('active');
      this.currentViewMode = 'marketer';
      TelemetryService.track('view_perspective_toggled', { perspective: 'marketer' });
      if (this.currentSingleResult) this.renderActionFeed(this.currentSingleResult);
    });

    btnDevView?.addEventListener('click', () => {
      btnDevView.classList.add('active');
      btnMarketerView?.classList.remove('active');
      this.currentViewMode = 'developer';
      TelemetryService.track('view_perspective_toggled', { perspective: 'developer' });
      if (this.currentSingleResult) this.renderActionFeed(this.currentSingleResult);
    });

    // Deselect preset chip when user manually types
    ['brandUrlInput', 'compUrlInput', 'queryInput'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => {
        document.querySelectorAll('.chip[data-brand]').forEach(c => c.classList.remove('chip-active'));
      });
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

        TelemetryService.track('preset_chip_clicked', {
          brand: brandInput?.value,
          comp: compInput?.value,
          query: queryInput?.value
        });

        this.runSingleAnalysis();
      });
    });

    // Audit Drawer toggle
    document.getElementById('btnToggleAuditDrawer')?.addEventListener('click', () => {
      const drawer = document.getElementById('auditDrawerContent');
      const header = document.getElementById('btnToggleAuditDrawer');
      const toggleText = document.getElementById('auditToggleText');
      if (!drawer) return;
      const isHidden = drawer.style.display === 'none';
      drawer.style.display = isHidden ? 'block' : 'none';
      header?.classList.toggle('open', isHidden);
      if (toggleText) toggleText.textContent = isHidden ? 'Hide Raw Payload ▴' : 'Show Raw Payload ▾';
      TelemetryService.track('audit_payload_drawer_toggled', { open: isHidden });
    });
  }

  private initSanitizationDrawer() {
    document.getElementById('btnToggleSanitization')?.addEventListener('click', () => {
      const content = document.getElementById('sanitizationContent');
      const toggleText = document.getElementById('sanitizationToggleText');
      if (!content) return;
      const isHidden = content.style.display === 'none';
      content.style.display = isHidden ? 'block' : 'none';
      if (toggleText) toggleText.textContent = isHidden ? 'Hide Pipeline Architecture ▴' : 'Show Pipeline Architecture ▾';
      TelemetryService.track('token_sanitization_drawer_toggled', { open: isHidden });
    });
  }

  private initTelemetryDrawer() {
    const drawer = document.getElementById('telemetryDrawerCard');
    const toggleBtn = document.getElementById('btnToggleTelemetry');
    const closeBtn = document.getElementById('btnCloseTelemetry');

    const updateEventList = () => {
      const stream = document.getElementById('telemetryEventStream');
      const count = document.getElementById('telemetryEventCount');
      const events = TelemetryService.getRecentEvents();
      if (count) count.textContent = `${events.length} Events`;
      if (stream) {
        stream.innerHTML = events.slice(0, 10).map(e => `
          <div class="telemetry-event-row">
            <span class="telemetry-time">${new Date(e.timeMs).toLocaleTimeString()}</span>
            <span class="telemetry-name">${this.escHtml(e.eventName)}</span>
            <span class="telemetry-props">${this.escHtml(JSON.stringify(e.properties))}</span>
          </div>
        `).join('');
      }
    };

    toggleBtn?.addEventListener('click', () => {
      if (!drawer) return;
      const isHidden = drawer.style.display === 'none';
      drawer.style.display = isHidden ? 'block' : 'none';
      if (isHidden) updateEventList();
      TelemetryService.track('telemetry_drawer_toggled', { open: isHidden });
    });

    closeBtn?.addEventListener('click', () => {
      if (drawer) drawer.style.display = 'none';
    });

    window.addEventListener('peec:telemetry', () => {
      if (drawer && drawer.style.display !== 'none') updateEventList();
    });
  }

  private initCtaTracking() {
    // Conversion Modal Open/Close (Floating Button)
    const conversionModal = document.getElementById('conversionModal');
    const btnFloatingConversion = document.getElementById('btnFloatingConversion');
    const btnCloseConversionModal = document.getElementById('btnCloseConversionModal');

    const openConversionModal = () => {
      if (conversionModal) conversionModal.style.display = 'flex';
      TelemetryService.track('conversion_modal_opened');
    };

    const closeConversionModal = () => {
      if (conversionModal) conversionModal.style.display = 'none';
      TelemetryService.track('conversion_modal_closed');
    };

    btnFloatingConversion?.addEventListener('click', openConversionModal);
    btnCloseConversionModal?.addEventListener('click', closeConversionModal);
    conversionModal?.addEventListener('click', (e) => {
      if (e.target === conversionModal) closeConversionModal();
    });

    // Resume Modal Open/Close
    const resumeModal = document.getElementById('resumeModal');
    const openResume = () => {
      if (resumeModal) resumeModal.style.display = 'flex';
      TelemetryService.track('cta_view_resume_clicked');
    };

    document.getElementById('ctaViewResume')?.addEventListener('click', () => {
      closeConversionModal();
      openResume();
    });
    document.querySelector('.sidebar-footer .user-pill')?.addEventListener('click', openResume);

    document.getElementById('btnCloseResumeModal')?.addEventListener('click', () => {
      if (resumeModal) resumeModal.style.display = 'none';
    });

    resumeModal?.addEventListener('click', (e) => {
      if (e.target === resumeModal) resumeModal.style.display = 'none';
    });

    // Global Escape Key Listener
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (conversionModal && conversionModal.style.display === 'flex') {
          closeConversionModal();
        }
        if (resumeModal && resumeModal.style.display === 'flex') {
          resumeModal.style.display = 'none';
        }
      }
    });

    // Download CV as Markdown
    document.getElementById('btnDownloadResumeMd')?.addEventListener('click', () => {
      const cvMarkdown = `# MEREKE DADABAYEVA
**Technical Product Manager / Technical Product Owner**
Berlin, Germany | +49 179 108 2712 | merekedadabayeva@gmail.com | https://linkedin.com/in/mereke | https://calendar.app.google/RizPgktVUDzH2xtx7

---

## PROFESSIONAL SUMMARY
Technical Product Manager with a Computer Science background and a decade of experience delivering high-impact software solutions for enterprise clients like Samsung and Goldn. Expert at driving growth through data-backed UX and SEO strategies, evidenced by a 65% increase in conversion traffic. Skilled in bridging the gap between complex technical engineering and business strategy to launch scalable B2B SaaS features, manage complex backlogs, and define winning product roadmaps in Agile environments.

---

## CORE COMPETENCIES & STACK
- **Product & Delivery:** Product Management, Project Management, MVP Scoping, User Stories & Journeys, Product Flowcharts, Backlog Grooming, Feature Launches
- **UX & Optimisation:** User Experience (UX) Design, User Flow Optimisation, SEO Optimisation, Keyword Analysis, Competitor & Market Research
- **Technical & Methods:** Computer Science Foundation, Mobile App Development, Agile / Scrum Methodologies, Software Development Lifecycle (SDLC), AI Agents & Vibe Coding
- **Languages:** English (Fluent), German (Intermediate), Russian (Native), Kazakh (Native), Turkish (Intermediate)

---

## PROFESSIONAL EXPERIENCE

### Technical Product Manager | Goldn
*Nov 2021 – Jan 2023 | Heidelberg, Germany*
- **Problem:** Stagnant organic traffic on the B2B marketplace; **Action:** Executed a comprehensive SEO and UX audit, followed by keyword optimisation; **Result:** Increased marketing website clicks by +65%; **Insight:** Data-driven UX improvements are as critical as technical SEO for conversion; **Skill:** SEO & UX Optimisation.
- **Problem:** Lack of standardised vendor terms leading to customer friction; **Action:** Led deep-dive vendor service research to define pricing and refund policies; **Result:** Increased customer satisfaction scores and platform trust; **Insight:** Transparent commercial policies directly reduce churn in B2B SaaS; **Skill:** Market Research & Policy Design.
- **Problem:** Siloed development slowing down feature releases; **Action:** Facilitated cross-functional workshops between design and engineering to launch new B2B tools; **Result:** Achieved seamless integration and high user adoption rates; **Insight:** Early engineering involvement in the design phase prevents technical debt; **Skill:** Cross-functional Leadership.
- **Problem:** High competitive pressure in the cosmetic supplier niche; **Action:** Conducted in-depth competitor benchmarking to pivot the product roadmap; **Result:** Identified 3 key differentiation opportunities now central to the company strategy; **Insight:** Competitive intelligence must be continuous, not a one-off project; **Skill:** Strategic Roadmapping.

### Product Management Associate / Intern | Product People
*Nov 2020 – Feb 2021 | Berlin, Germany (Remote)*
- Scoped MVPs and designed product flowcharts, user stories, and user journeys for healthcare and mobility startups (Doctorly, Tier Mobility), accelerating early product development.
- Conducted comprehensive market research on food delivery and meal kit sectors for a global supply chain client to support strategic planning.
- Supported the growth of the Product People online community by defining target audience personas and engagement strategies.

### IT Project Manager / Technical Delivery Lead | iBEC Systems
*Dec 2014 – Aug 2017 | Almaty, Kazakhstan*
- Led a 5-person international software development team to build a distributor fraud-detection application for Samsung Asia & Pacific, successfully launched in Central Asian markets.
- Directed a comprehensive website re-architecture project for Eurasian Resources Group (ERG), driving a +40% increase in website traffic and improved user experience.
- Delivered cross-functional client software projects across SaaS, B2B, and B2C business models utilising structured product research and data analysis.

### Career Break — Parental Leave | Personal Focus
*Jan 2023 – Present | Berlin, Germany*
- Planned parental leave period in Germany while maintaining active knowledge in modern software product management practices and in AI Agents: Intensive Vibe Coding.

---

## EDUCATION & CERTIFICATIONS
- **BSc in Computer Science** — SDU University, Kazakhstan (2012 – 2016)
- **Google Project Management Professional Certificate** — Issued by Coursera (May 2021 | ID: V4U2RJCZXKPB)
- **Agile Project Management Certification** — Issued by Coursera (Jul 2021 | ID: 9CY3ZZUA7C6H)
`;
      const blob = new Blob([cvMarkdown], { type: 'text/markdown' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'Mereke_Dadabayeva_Technical_Product_Owner_CV.md';
      a.click();
      TelemetryService.track('cv_markdown_downloaded');
    });

    document.getElementById('ctaBookCall')?.addEventListener('click', () => {
      TelemetryService.track('cta_book_call_clicked');
    });
    document.getElementById('ctaLinkedIn')?.addEventListener('click', () => {
      TelemetryService.track('cta_linkedin_clicked');
    });
    document.getElementById('ctaGithub')?.addEventListener('click', () => {
      TelemetryService.track('cta_github_clicked');
    });
  }

  private async runSingleAnalysis() {
    const brandInput = document.getElementById('brandUrlInput') as HTMLInputElement;
    const compInput = document.getElementById('compUrlInput') as HTMLInputElement;
    const queryInput = document.getElementById('queryInput') as HTMLInputElement;
    const analyzeBtn = document.getElementById('analyzeBtn') as HTMLButtonElement;

    if (!analyzeBtn || !brandInput || !compInput || !queryInput) return;

    const brandUrl = this.normalizeUrl(brandInput.value || 'https://attio.com');
    const compUrl = this.normalizeUrl(compInput.value || 'https://hubspot.com');
    const query = queryInput.value.trim() || 'top collaborative crm software with automated pipelines';

    TelemetryService.track('analysis_started', {
      brand: brandUrl,
      comp: compUrl,
      query,
      targetEngine: this.currentTargetEngine
    });

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
    if (scanTitle) scanTitle.textContent = `Connecting to ${compUrl}...`;
    if (scanDesc) scanDesc.textContent = 'Fetching live DOM with graceful Cloudflare/CORS snapshot fallback';

    setTimeout(() => {
      if (step2) step2.className = 'step-item active';
      if (scanProgress) scanProgress.style.width = '70%';
      if (scanTitle) scanTitle.textContent = `Decomposing query intents for "${query}"...`;
      if (scanDesc) scanDesc.textContent = `Aligning ranking signals for ${this.currentTargetEngine.toUpperCase()}`;
    }, 350);

    try {
      const result = await LiveSynthesizer.synthesizeGap(
        query,
        brandUrl,
        compUrl,
        {
          apiKey: this.userGeminiApiKey || undefined,
          apiProvider: this.userGeminiApiKey ? 'gemini' : undefined,
          targetEngine: this.currentTargetEngine
        }
      );

      if (step3) step3.className = 'step-item active';
      if (scanProgress) scanProgress.style.width = '100%';
      if (scanTitle) scanTitle.textContent = 'Synthesizing zero-extrapolation remediation plan...';
      if (scanDesc) scanDesc.textContent = `Found ${result.schemaGaps.length + result.benchmarkGaps.length} verifiable gaps`;

      setTimeout(() => {
        this.renderSingleUI(result);
        this.syncUrlState('single', { brand: brandUrl, comp: compUrl, query, engine: this.currentTargetEngine });
        if (scannerCard) scannerCard.style.display = 'none';
        analyzeBtn.innerHTML = '<span>🚀 Synthesize Citation Gap</span>';
        analyzeBtn.disabled = false;

        TelemetryService.track('analysis_completed', {
          executionTimeMs: result.executionTimeMs,
          totalGaps: result.schemaGaps.length + result.benchmarkGaps.length + result.entityGaps.length,
          dataQuality: result.dataQuality,
          isCORSBlocked: result.isCORSBlockedFallback
        });

        document.getElementById('executiveSummaryCard')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 250);
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

    // Reveal all results sections
    const executiveSummaryCard = document.getElementById('executiveSummaryCard');
    const queryIntentCard = document.getElementById('queryIntentCard');
    const scorecardGrid = document.getElementById('scorecardGrid');
    const matrixCard = document.getElementById('matrixCard');
    const sanitizationPipelineCard = document.getElementById('sanitizationPipelineCard');
    const actionsSection = document.getElementById('actionsSection');
    const exportHandoffCard = document.getElementById('exportHandoffCard');

    if (executiveSummaryCard) executiveSummaryCard.style.display = '';
    if (queryIntentCard) queryIntentCard.style.display = '';
    if (scorecardGrid) scorecardGrid.style.display = '';
    if (matrixCard) matrixCard.style.display = '';
    if (sanitizationPipelineCard) sanitizationPipelineCard.style.display = '';
    if (actionsSection) actionsSection.style.display = '';
    if (exportHandoffCard) exportHandoffCard.style.display = '';

    // CORS Degradation Banner (Diagnostic 1)
    const corsBanner = document.getElementById('corsNoticeBanner');
    const corsText = document.getElementById('corsNoticeText');
    if (corsBanner) {
      if (result.isCORSBlockedFallback) {
        corsBanner.style.display = 'flex';
        if (corsText && result.corsMessage) corsText.textContent = result.corsMessage;
      } else {
        corsBanner.style.display = 'none';
      }
    }

    // Executive Summary
    const execTitle = document.getElementById('execTitle');
    const execText = document.getElementById('execText');
    const execTime = document.getElementById('execTimestamp');
    const execEngineBadge = document.getElementById('execEngineBadge');

    if (execTitle) {
      execTitle.textContent = `Why ${compDom} is Winning Citations on "${result.query}"`;
    }
    if (execEngineBadge) {
      execEngineBadge.textContent = result.engineAdvice.badge;
    }
    if (execText) {
      const topProof = result.benchmarkGaps.slice(0, 2).map(b => `"${b.competitorValue}"`).join(' and ') || 'structured proof points';
      execText.innerHTML = `
        When users query <strong>${result.engineAdvice.name}</strong> for <em>"${this.escHtml(result.query)}"</em>, AI cites <strong>${this.escHtml(compDom)}</strong> because their landing page provides <strong>concrete numerical proof (${this.escHtml(topProof)})</strong>, machine-readable <strong>Schema.org tags</strong>, and explicit coverage of multi-intent workflows. Your brand (<strong>${this.escHtml(brandDom)}</strong>) is currently missing these specific signals.
      `;
    }
    if (execTime) {
      const qualityLabel = result.dataQuality === 'live_both' ? '🟢 Both Pages Live Scraped'
        : result.dataQuality === 'snapshot_verified' ? '🛡️ Verified Domain Snapshot'
        : result.dataQuality === 'live_partial' ? '🟡 Partial Live Scraping'
        : '⚠️ Heuristic Fallback';
      execTime.textContent = `${qualityLabel} • ${result.executionTimeMs}ms SLA`;
    }

    // Engine Strategic Advice Box (Diagnostic 8)
    const adviceTitle = document.getElementById('engineAdviceTitle');
    const adviceText = document.getElementById('engineAdviceText');
    if (adviceTitle) adviceTitle.textContent = `🎯 ${result.engineAdvice.name} Ranking Signal:`;
    if (adviceText) {
      adviceText.innerHTML = `
        <p style="margin: 0 0 4px 0; color: #4B5563;">${this.escHtml(result.engineAdvice.keyRankingSignal)}</p>
        <p style="margin: 0; color: #1F2937; font-weight: 600;">💡 Recommendation: ${this.escHtml(result.engineAdvice.strategicAdvice)}</p>
      `;
    }

    // Query Intent Extraction Cards (Diagnostic 2)
    const intentGrid = document.getElementById('intentGrid');
    if (intentGrid && result.queryIntents) {
      intentGrid.innerHTML = result.queryIntents.map(intent => `
        <div class="intent-card">
          <div class="intent-card-header">
            <strong class="intent-title">${this.escHtml(intent.title)}</strong>
            <div class="intent-status-badges">
              <span class="intent-badge ${intent.compCovered ? 'pass' : 'fail'}">${compDom}: ${intent.compCovered ? '✓ Covered' : '✗ Missing'}</span>
              <span class="intent-badge ${intent.brandCovered ? 'pass' : 'fail'}">${brandDom}: ${intent.brandCovered ? '✓ Covered' : '✗ Gap Detected'}</span>
            </div>
          </div>
          <p class="intent-desc">${this.escHtml(intent.description)}</p>
          <div class="intent-evidence">
            <span class="intent-evidence-label">Grounding Proof:</span> ${this.escHtml(intent.evidence)}
          </div>
          <div class="intent-rec">
            <span class="intent-rec-label">Remediation:</span> ${this.escHtml(intent.recommendation)}
          </div>
        </div>
      `).join('');
    }

    // Scorecard stats
    const statSchema = document.getElementById('statSchemaCount');
    const statSchemaBadge = document.getElementById('statSchemaBadge');
    const statSchemaHint = document.getElementById('statSchemaHint');
    const statBench = document.getElementById('statBenchmarkCount');
    const statBenchBadge = document.getElementById('statBenchmarkBadge');
    const statBenchHint = document.getElementById('statBenchmarkHint');
    const statEntity = document.getElementById('statEntityCount');
    const statEntityBadge = document.getElementById('statEntityBadge');
    const statEntityHint = document.getElementById('statEntityHint');

    if (statSchema) statSchema.textContent = String(result.schemaGaps.length);
    if (statSchemaBadge) statSchemaBadge.textContent = `${result.schemaGaps.length} Missing`;
    if (statSchemaHint) statSchemaHint.textContent = result.schemaGaps.length === 0 ? 'All machine tags matched' : `Missing: ${result.schemaGaps.map(g => g.schemaType).join(', ')}`;

    if (statBench) statBench.textContent = String(result.benchmarkGaps.length);
    if (statBenchBadge) statBenchBadge.textContent = `${result.benchmarkGaps.length} Gaps`;
    if (statBenchHint) {
      const topQuotes = result.benchmarkGaps.slice(0, 2).map(b => b.competitorValue).join(', ');
      statBenchHint.textContent = topQuotes ? `Quotes: ${topQuotes}` : 'Your page lacks hard proof stats';
    }

    if (statEntity) statEntity.textContent = String(result.entityGaps.length);
    if (statEntityBadge) statEntityBadge.textContent = `${result.entityGaps.length} Keywords`;
    if (statEntityHint) {
      const topEntities = result.entityGaps.slice(0, 2).map(e => e.entityName).join(', ');
      statEntityHint.textContent = topEntities ? `Missing: ${topEntities}` : 'Category terms AI expects';
    }

    // Evidence Grounding ratio
    const allItems = [...result.schemaGaps, ...result.benchmarkGaps, ...result.entityGaps];
    const verifiedCount = allItems.filter(i => i.verified).length;
    const verifiedPct = allItems.length > 0 ? Math.round((100 * verifiedCount) / allItems.length) : 0;
    const statWinProb = document.getElementById('statWinProb');
    const statWinHint = document.getElementById('statWinHint');
    const statWinBadge = document.getElementById('statWinBadge');
    
    if (statWinProb) statWinProb.textContent = allItems.length > 0 ? `${verifiedCount}/${allItems.length}` : '0/0';
    if (statWinHint) statWinHint.textContent = `${verifiedPct}% confirmed from live DOM / snapshot corpus`;
    if (statWinBadge) statWinBadge.textContent = result.dataQuality === 'snapshot_verified' ? 'Snapshot Verified' : result.dataQuality === 'live_both' ? 'Live Data' : 'Fallback';

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
      if (textBenchmarkBrand) textBenchmarkBrand.textContent = 'No specific numbers on latency, pricing, or uptime';
      if (textBenchmarkComp) textBenchmarkComp.textContent = `Quotes exact proof: ${compProof}`;
    }

    const textEntityBrand = document.getElementById('textEntityBrand');
    const textEntityComp = document.getElementById('textEntityComp');
    if (textEntityBrand) textEntityBrand.textContent = `Missing ${result.entityGaps.length} keywords AI expects for this search`;
    if (textEntityComp) textEntityComp.textContent = `Complete coverage across collaborative CRM search terms`;

    // Sanitization Pipeline Metrics (Diagnostic 5)
    const sanRaw = document.getElementById('sanRawDomMetric');
    const sanCorpus = document.getElementById('sanCorpusMetric');
    const sanSavings = document.getElementById('sanSavingsMetric');
    if (sanRaw && result.sanitizationMetrics) {
      sanRaw.textContent = `~${Math.round(result.sanitizationMetrics.rawDomBytes / 1024)} KB`;
    }
    if (sanCorpus && result.sanitizationMetrics) {
      sanCorpus.textContent = `~${(result.sanitizationMetrics.sanitizedBytes / 1024).toFixed(1)} KB`;
    }
    if (sanSavings && result.sanitizationMetrics) {
      sanSavings.textContent = `${result.sanitizationMetrics.tokenSavingsPercent}% Token Savings`;
    }

    // Inspectable Grounding Payload Drawer
    const auditPayloadCard = document.getElementById('auditPayloadCard');
    if (auditPayloadCard) auditPayloadCard.style.display = '';

    const auditBrandStatus = document.getElementById('auditBrandStatus');
    const auditCompStatus = document.getElementById('auditCompStatus');
    const auditVerifySourceLink = document.getElementById('auditVerifySourceLink') as HTMLAnchorElement;
    const auditTimestampText = document.getElementById('auditTimestampText');
    const auditBrandCorpus = document.getElementById('auditBrandCorpus');
    const auditCompCorpus = document.getElementById('auditCompCorpus');

    if (auditBrandStatus) {
      auditBrandStatus.textContent = `${result.brandPayload.statusCode} OK • ${result.brandPayload.snapshotSource || 'Live Ingested'} (${result.brandPayload.contentLengthChars} chars)`;
    }
    if (auditCompStatus) {
      auditCompStatus.textContent = `${result.competitorPayload.statusCode} OK • ${result.competitorPayload.snapshotSource || 'Live Ingested'} (${result.competitorPayload.contentLengthChars} chars)`;
    }
    if (auditVerifySourceLink) {
      auditVerifySourceLink.href = result.competitorPayload.url;
      auditVerifySourceLink.textContent = `Verify ${this.getDomain(result.competitorPayload.url)} Live Source ↗`;
    }
    if (auditTimestampText) {
      auditTimestampText.textContent = result.competitorPayload.fetchTimestamp || new Date().toUTCString();
    }
    if (auditBrandCorpus) {
      auditBrandCorpus.textContent = JSON.stringify({
        sourceUrl: result.brandPayload.url,
        pageTitle: result.brandPayload.title,
        heading1: result.brandPayload.h1Tags,
        schemasDetected: result.brandPayload.schemaTypes,
        pricingExtracted: result.brandPayload.pricingClaims,
        sampleScrapedText: result.brandPayload.cleanedText.slice(0, 320) + (result.brandPayload.cleanedText.length > 320 ? '...' : '')
      }, null, 2);
    }
    if (auditCompCorpus) {
      auditCompCorpus.textContent = JSON.stringify({
        sourceUrl: result.competitorPayload.url,
        pageTitle: result.competitorPayload.title,
        heading1: result.competitorPayload.h1Tags,
        schemasDetected: result.competitorPayload.schemaTypes,
        statisticsExtracted: result.competitorPayload.extractedStatistics,
        pricingExtracted: result.competitorPayload.pricingClaims,
        complianceBadges: result.competitorPayload.complianceBadges,
        sampleScrapedText: result.competitorPayload.cleanedText.slice(0, 320) + (result.competitorPayload.cleanedText.length > 320 ? '...' : '')
      }, null, 2);
    }

    this.renderActionFeed(result);
  }

  private renderActionFeed(result: CitationGapResult) {
    const list = document.getElementById('actionItemsList');
    if (!list) return;

    const isMarketer = this.currentViewMode === 'marketer';
    const actions: Array<{ 
      title: string; 
      desc: string; 
      why: string; 
      tag: string; 
      snippet?: string; 
      copyText: string; 
      verified: boolean;
      engines: Array<{ name: string; cls: string }>;
    }> = [];

    // 1. Schema Actions
    result.schemaGaps.forEach(g => {
      actions.push({
        title: isMarketer
          ? `Tell AI What Your Product Is & Costs (Add ${g.schemaType} tag)`
          : `Inject Schema.org @type ${g.schemaType}`,
        desc: isMarketer
          ? `AI search engines (${result.engineAdvice.name}) look for standard product tags in your website code. ${g.verified ? "Your competitor has this tag; you don't." : "This is a general best-practice recommendation."}`
          : g.impactReason,
        why: isMarketer
          ? (g.verified ? `💡 Confirmed: this tag was detected on the competitor's page.` : `💡 Suggested best practice for generative search engines.`)
          : `Technical requirement for ${result.engineAdvice.name} parsers.`,
        tag: isMarketer ? 'Website Setup • 10 min fix' : 'Technical SEO • <15 min',
        snippet: !isMarketer ? g.recommendedJsonLd : undefined,
        copyText: g.recommendedJsonLd,
        verified: g.verified,
        engines: [
          { name: result.engineAdvice.name, cls: 'chatgpt' },
          { name: 'Google Gemini', cls: 'gemini' }
        ]
      });
    });

    // 2. Benchmark Actions
    result.benchmarkGaps.forEach(g => {
      actions.push({
        title: isMarketer
          ? `Put Hard Numbers on Your Page: ${g.metricName}`
          : `Add Quantitative Metric: ${g.metricName}`,
        desc: isMarketer
          ? `${g.verified ? `Your competitor states "${g.competitorValue}".` : `Competitors in this category state "${g.competitorValue}".`} To beat them, ${g.recommendation.toLowerCase()}`
          : `${g.verified ? `Competitor states "${g.competitorValue}".` : `Typical category value: "${g.competitorValue}".`} Action: ${g.recommendation}`,
        why: isMarketer
          ? `💡 Why AI cares: Generative search engines favor pages with hard numbers over vague marketing copy.`
          : g.competitorEvidence,
        tag: isMarketer ? 'Homepage Copy • 15 min fix' : 'Landing Page Copy • <20 min',
        copyText: `Recommendation for ${g.metricName}: ${g.recommendation}`,
        verified: g.verified,
        engines: [
          { name: 'Perplexity Sonar', cls: 'perplexity' },
          { name: 'ChatGPT Search', cls: 'chatgpt' }
        ]
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
            ? `${g.verified ? `Your competitor's page mentions "${g.entityName}".` : `AI expects to see "${g.entityName}" for this search.`} ${g.actionPlan}`
            : `${g.searchRelevance}. ${g.actionPlan}`,
          why: isMarketer
            ? (g.verified ? `💡 Confirmed: this term appears in competitor's text.` : `💡 Suggested topic for category relevance.`)
            : g.searchRelevance,
          tag: isMarketer ? 'Feature Section • 20 min fix' : `${g.category} • <30 min`,
          copyText: `Add mention of '${g.entityName}' to product features: ${g.actionPlan}`,
          verified: g.verified,
          engines: [
            { name: 'Perplexity Sonar', cls: 'perplexity' },
            { name: 'Google Gemini', cls: 'gemini' }
          ]
        });
      }
    });

    const verifiedActionCount = actions.filter(a => a.verified).length;
    const countElem = document.getElementById('remediationCount');
    if (countElem) countElem.textContent = `${actions.length} Fixes (${verifiedActionCount} Confirmed, ${actions.length - verifiedActionCount} Suggested)`;

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
            <span class="action-tag" style="${act.verified ? 'background:rgba(16,185,129,0.15);color:#065F46;' : 'background:rgba(245,158,11,0.15);color:#92400E;'}">${act.verified ? '✓ Confirmed Live' : '~ Suggested'}</span>
            ${act.engines.map(e => `<span class="engine-pill ${e.cls}">${e.name}</span>`).join('')}
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
          TelemetryService.track('action_fix_copied', { textSnippet: text.slice(0, 40) });
          setTimeout(() => {
            btn.textContent = isMarketer ? 'Copy Recommendation' : 'Copy Code Fix';
            btn.classList.remove('copied');
          }, 2000);
        });
      });
    });
  }

  // ── 5. Portfolio Controller ───────────────────────────────────────────
  private initPortfolioMode() {
    // Deselect cluster preset chips on custom brand input
    document.getElementById('portfolioBrandUrlInput')?.addEventListener('input', () => {
      document.querySelectorAll('.chip[data-cluster]').forEach(c => c.classList.remove('chip-active'));
    });

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
          TelemetryService.track('portfolio_cluster_selected', { clusterKey: key });
          this.renderPortfolioRows();
          this.runPortfolioAnalysis();
        }
      });
    });

    document.getElementById('btnAddPromptRow')?.addEventListener('click', () => {
      this.portfolioRows.push({
        query: 'Top Software with SOC-2 Compliance and Instant Onboarding',
        competitorUrl: 'https://monday.com'
      });
      this.renderPortfolioRows();
      TelemetryService.track('portfolio_row_added', { totalRows: this.portfolioRows.length });
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
    const brandUrl = (document.getElementById('portfolioBrandUrlInput') as HTMLInputElement)?.value || 'https://attio.com';
    const brandDomain = this.getDomain(brandUrl);
    const results: CitationGapResult[] = [];

    for (const row of this.portfolioRows) {
      const res = await LiveSynthesizer.synthesizeGap(row.query, brandUrl, row.competitorUrl);
      results.push(res);
    }

    const portfolio = PortfolioAggregator.aggregate(brandDomain, results);
    this.currentPortfolioResult = portfolio;
    this.renderPortfolioUI(portfolio);
    this.syncUrlState('portfolio', { brand: brandUrl });
    TelemetryService.track('portfolio_analysis_run', { brandDomain, promptCount: results.length });
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

    // Gap Coverage Banner
    const liftTitle = document.getElementById('liftTitle');
    const liftDesc = document.getElementById('liftDesc');
    const liftBarFill = document.getElementById('liftBarFill');
    const liftBarLabel = document.getElementById('liftBarLabel');
    const topFixes = portfolio.recurringGaps.slice(0, 2);
    const coveredPrompts = new Set<string>();
    topFixes.forEach(g => g.affectedPrompts.forEach(p => coveredPrompts.add(p)));
    const coveragePct = portfolio.totalPromptsAnalyzed > 0
      ? Math.round((100 * coveredPrompts.size) / portfolio.totalPromptsAnalyzed)
      : 0;

    if (liftTitle) {
      liftTitle.textContent = topFixes.length > 0
        ? `Top ${topFixes.length} Fix${topFixes.length > 1 ? 'es' : ''} Would Resolve Gaps on ${coveredPrompts.size}/${portfolio.totalPromptsAnalyzed} Prompts (${coveragePct}%)`
        : 'No recurring gaps detected across analyzed prompts';
    }
    if (liftDesc) {
      liftDesc.textContent = topFixes.length > 0
        ? `Deploying "${topFixes.map(g => g.displayName).join('" and "')}" addresses at least one detected gap on the prompts listed below.`
        : 'Run the analysis with more monitored prompts.';
    }
    if (liftBarFill) liftBarFill.style.width = `${coveragePct}%`;
    if (liftBarLabel) liftBarLabel.textContent = `${coveragePct}% Gap Coverage`;

    // 1. Ranked High-Leverage Fixes
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
              <div class="insight-recur-group">
                <div class="insight-mini-bar-track" title="${pct}% of losses">
                  <div class="insight-mini-bar-fill ${isFull ? 'full' : ''}" style="width: ${pct}%;"></div>
                </div>
                <span class="insight-recur-badge ${isFull ? 'full' : ''}">Resolves ${g.recurrenceCount} of ${portfolio.totalPromptsAnalyzed} Prompts (${pct}%)</span>
              </div>
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
              <strong>Affected Search Queries (Click to diagnose):</strong>
              ${g.affectedPrompts.map(p => `<span class="prompt-pill-tag clickable" data-query="${encodeURIComponent(p)}" title="Click to diagnose this search prompt in Single Mode">"${this.escHtml(p)}" ↗</span>`).join(' ')}
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
            TelemetryService.track('portfolio_fix_copied', { textSnippet: text.slice(0, 40) });
            setTimeout(() => {
              btn.textContent = 'Copy Fix';
              btn.classList.remove('copied');
            }, 2000);
          });
        });
      });

      insightsList.querySelectorAll('.prompt-pill-tag.clickable').forEach(pill => {
        pill.addEventListener('click', (e) => {
          e.stopPropagation();
          const query = decodeURIComponent((pill as HTMLElement).dataset.query || '');
          const brandInput = document.getElementById('brandUrlInput') as HTMLInputElement;
          const queryInput = document.getElementById('queryInput') as HTMLInputElement;
          if (queryInput) queryInput.value = query;
          if (brandInput) brandInput.value = (document.getElementById('portfolioBrandUrlInput') as HTMLInputElement)?.value || 'https://attio.com';
          
          document.getElementById('btnSingleMode')?.click();
          this.runSingleAnalysis();
        });
      });
    }

    // 2. Per-Prompt Loss Audit Breakdown Table
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
  }

  // ── URL State Sync Helper & Cold Start (Diagnostic 7) ───────────────────
  private syncUrlState(mode: 'single' | 'portfolio', params?: Record<string, string>) {
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('mode', mode);
      if (params) {
        Object.entries(params).forEach(([k, v]) => {
          if (v) url.searchParams.set(k, v);
        });
      }
      window.history.replaceState({}, '', url.toString());
    } catch {
      // Ignored in sandbox
    }
  }

  private restoreUrlState() {
    try {
      const url = new URL(window.location.href);
      const mode = url.searchParams.get('mode');
      const brand = url.searchParams.get('brand');
      const comp = url.searchParams.get('comp');
      const query = url.searchParams.get('query');
      const engine = url.searchParams.get('engine') as TargetEngine;

      if (engine && ['chatgpt', 'perplexity', 'gemini'].includes(engine)) {
        this.currentTargetEngine = engine;
        document.querySelectorAll('.engine-pill-btn').forEach(btn => {
          btn.classList.toggle('active', (btn as HTMLElement).dataset.engine === engine);
        });
      }

      if (brand) {
        const normalizedBrand = this.normalizeUrl(brand);
        const bIn = document.getElementById('brandUrlInput') as HTMLInputElement;
        if (bIn) bIn.value = normalizedBrand;
        const pBIn = document.getElementById('portfolioBrandUrlInput') as HTMLInputElement;
        if (pBIn) pBIn.value = normalizedBrand;
      }

      if (comp) {
        const normalizedComp = this.normalizeUrl(comp);
        const cIn = document.getElementById('compUrlInput') as HTMLInputElement;
        if (cIn) cIn.value = normalizedComp;
      }

      if (query) {
        const qIn = document.getElementById('queryInput') as HTMLInputElement;
        if (qIn) qIn.value = query;
      }

      if (mode === 'portfolio') {
        document.getElementById('btnPortfolioMode')?.click();
      } else {
        // Cold Start: Automatically hydrate and execute default diagnostic analysis
        this.runSingleAnalysis();
      }
    } catch {
      this.runSingleAnalysis();
    }
  }

  // ── 6. Handoff & Export Handlers ──────────────────────────────────────
  private initExportHandlers() {
    document.getElementById('btnCopyBrief')?.addEventListener('click', () => {
      if (!this.currentSingleResult) return;
      navigator.clipboard.writeText(this.currentSingleResult.marketerBrief.markdownContent).then(() => {
        const btn = document.getElementById('btnCopyBrief');
        if (btn) btn.innerHTML = '<span>Copied Summary ✓</span>';
        TelemetryService.track('brief_copied', {
          brand: this.currentSingleResult?.brandPayload.domain,
          comp: this.currentSingleResult?.competitorPayload.domain
        });
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
      TelemetryService.track('brief_downloaded', {
        brand: this.currentSingleResult?.brandPayload.domain,
        comp: this.currentSingleResult?.competitorPayload.domain
      });
    });

    document.getElementById('btnCopyJira')?.addEventListener('click', () => {
      if (!this.currentSingleResult) return;
      navigator.clipboard.writeText(this.currentSingleResult.engineeringJira.jiraMarkdown).then(() => {
        const btn = document.getElementById('btnCopyJira');
        if (btn) btn.innerHTML = '<span>Copied Jira Story ✓</span>';
        TelemetryService.track('jira_story_copied', {
          ticketKey: this.currentSingleResult?.engineeringJira.ticketKey,
          storyPoints: this.currentSingleResult?.engineeringJira.storyPoints
        });
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
        TelemetryService.track('portfolio_brief_copied');
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
        TelemetryService.track('jira_backlog_copied');
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
      TelemetryService.track('portfolio_brief_downloaded');
    });

    document.getElementById('headerExportBtn')?.addEventListener('click', () => {
      const targetBtn = document.querySelector('.nav-item[data-view="view-gap"]');
      (targetBtn as HTMLElement)?.click();
      document.getElementById('btnDownloadBrief')?.click();
    });
  }

  // ── Helper Utilities ──────────────────────────────────────────────────
  private normalizeUrl(url: string): string {
    const trimmed = url.trim();
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
    return `https://${trimmed}`;
  }

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

