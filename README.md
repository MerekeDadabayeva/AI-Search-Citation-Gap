# ⚡ Autonomous Generative Citation Gap & Content Remediation Synthesizer

[![Organization: Peec AI](https://img.shields.io/badge/Organization-Peec%20AI%20(Berlin)-6366F1)](https://peec.ai)
[![Author: Mereke Dadabayeva](https://img.shields.io/badge/Author-Mereke%20Dadabayeva%20(PM)-10B981)](#)
[![Framework: Astro Static](https://img.shields.io/badge/Framework-Astro%20v4-FF5D01)](https://astro.build)
[![Deployment: GitHub Pages](https://img.shields.io/badge/Deployment-GitHub%20Pages-22C55E)](https://merekedadabayeva.github.io/AI-Search-Citation-Gap/)
[![Status: Sprint Ready](https://img.shields.io/badge/Status-Sprint%20Ready%20(PEEC--408)-06B6D4)](#)
[![Estimate: 5 Story Points](https://img.shields.io/badge/Estimate-5%20Story%20Points-F59E0B)](#)

> **Closing Peec AI's Core Market Challenge — The "Actionability Gap":**  
> Users see when they lose generative search citations (in ChatGPT Search, Perplexity AI, Google Gemini) to competitors, but lack the exact structured content adjustments needed to win them back. This engine bridges diagnostic AI search visibility data directly to engineering and marketing execution.

---

## 🌐 Live Interactive Application (GitHub Pages)

👉 **[https://merekedadabayeva.github.io/AI-Search-Citation-Gap/](https://merekedadabayeva.github.io/AI-Search-Citation-Gap/)**

Built with **Astro** for sub-10ms instant client-side execution, zero backend hosting overhead, and automated CI/CD deployment via GitHub Actions.

---

## 📌 Executive Summary & Problem Framing

Modern generative search engines synthesize answers by parsing authoritative topic entities, structured Schema.org JSON-LD definitions (`SoftwareApplication`, `FAQPage`, `PricingPlan`), and verifiable numerical benchmarks.

While AI search monitors detect **when** a brand loses citation visibility and **which** competitor URLs were cited instead, growth and marketing teams face a severe **actionability bottleneck**:
* Teams spend **45+ minutes per query** manually cross-referencing competitor pages.
* Marketers guess whether citation failure was due to missing statistics, entity depth, or technical schema markup.
* Engineering squads receive vague requests without strict Gherkin acceptance criteria or scope limits.

The **Autonomous Generative Citation Gap & Content Remediation Synthesizer** automates deterministic extraction, enforces a **Zero-Extrapolation Constraint**, and immediately outputs dual handoffs:
1. **Track A (Marketer Brief):** 1-Click exportable Markdown Content Brief with copy-pasteable JSON-LD schemas, benchmark comparisons, and topic entities (agency client deliverable).
2. **Track B (Engineering Jira Spec):** Sprint-ready Agile story (`PEEC-408`, 5 Story Points, `AI-Gateway`) with strict Gherkin acceptance criteria and hard V1 scope boundaries.
3. **Continuous Retention Loop:** "Verify Live Remediation" interactive DOM audit validator.

---

## 🏗️ System Execution Pipeline

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        GEO CITATION GAP & REMEDIATION PIPELINE                         │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ [Tracked Prompt + User Domain + Cited Competitor URL]                                  │
│           ➔ [Deterministic Ingestion: Ingest HTML, Schemas, & Authority Claims]        │
│           ➔ [LLM Gateway: Zero-Extrapolation Semantic & Entity Delta Diff]             │
│           ➔ [Dual Output Handoff]                                                      │
│               ├─ Marketer: 1-Click Markdown Remediation Brief (Agency-Ready)           │
│               └─ Dev Squad: Sprint-Ready Jira Ticket (Gherkin AC + V1 Scope Limits)    │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Key Features

* **⚡ Quick Wins vs. Strategic Refactors Filter:** Filter gaps by `< 15 min` markup fixes vs. 1–2 day content refactors.
* **🔄 Closed-Loop DOM Verification:** Re-audits live pages to verify if missing Schema.org JSON-LD definitions were deployed, computing projected citation win probabilities.
* **📋 Agency Deliverables:** 1-Click copy-to-clipboard and Markdown download for client reports.
* **🛡️ Zero-Extrapolation Guardrail:** Every claim is verified verbatim against primary source text with `Verify Source ↗` anchors.

---

## ⚡ Local Development & Build

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Astro Development Server
```bash
npm run dev
```

### 3. Build Production Static Site
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```

---

## 👤 Author & Organization

* **Lead Product Manager & Engineer:** Mereke Dadabayeva
* **Target Organization:** Peec AI (Berlin)
* **Status:** Sprint Ready (Ticket: `PEEC-408` Series)
