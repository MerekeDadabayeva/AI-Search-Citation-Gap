# ⚡ Autonomous Generative Citation Gap & Content Remediation Synthesizer

[![Organization: Peec AI](https://img.shields.io/badge/Organization-Peec%20AI%20(Berlin)-6366F1)](https://peec.ai)
[![Author: Mereke Dadabayeva](https://img.shields.io/badge/Author-Mereke%20Dadabayeva%20(PM)-10B981)](#)
[![Status: Sprint Ready](https://img.shields.io/badge/Status-Sprint%20Ready%20(PEEC--408)-06B6D4)](#)
[![Estimate: 5 Story Points](https://img.shields.io/badge/Estimate-5%20Story%20Points-F59E0B)](#)
[![Tests: 8 Passed](https://img.shields.io/badge/Tests-8%20Passing%20(100%25)-10B981)](#)

> **Closing Peec AI's Core Market Challenge — The "Actionability Gap":**  
> Users see when they lose generative search citations (in ChatGPT Search, Perplexity AI, Google Gemini) to competitors, but lack the exact structured content adjustments needed to win them back. This engine bridges diagnostic AI search visibility data directly to engineering and marketing execution.

---

## 📌 Executive Summary & Problem Framing

Modern generative search engines synthesize answers by parsing authoritative topic entities, structured Schema.org JSON-LD definitions (`SoftwareApplication`, `FAQPage`, `PricingPlan`), and verifiable numerical benchmarks.

While AI search monitors detect **when** a brand loses citation visibility and **which** competitor URLs were cited instead, growth and marketing teams face a severe **actionability bottleneck**:
* Teams spend **45+ minutes per query** manually cross-referencing competitor pages.
* Marketers guess whether citation failure was due to missing statistics, entity depth, or technical schema markup.
* Engineering squads receive vague requests without strict Gherkin acceptance criteria or scope limits.

The **Autonomous Generative Citation Gap & Content Remediation Synthesizer** automates deterministic extraction, enforces a **Zero-Extrapolation Constraint**, and immediately outputs dual handoffs:
1. **Track A (Marketer Brief):** 1-Click exportable Markdown Content Brief with copy-pasteable JSON-LD schemas, benchmark comparisons, and topic entities.
2. **Track B (Engineering Jira Spec):** Sprint-ready Agile story (`PEEC-408`, 5 Story Points, `AI-Gateway`) with strict Gherkin acceptance criteria and hard V1 scope boundaries.

---

## 🏗️ System Execution Pipeline

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        GEO CITATION GAP & REMEDIATION PIPELINE                         │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ [Tracked Prompt + User Domain + Cited Competitor URL]                                  │
│           ➔ [Deterministic Scraper: Ingest HTML, Schemas, & Authority Claims]          │
│           ➔ [LLM Gateway: Zero-Extrapolation Semantic & Entity Delta Diff]             │
│           ➔ [Dual Output Handoff]                                                      │
│               ├─ Marketer: 1-Click Markdown Remediation Brief                          │
│               └─ Dev Squad: Sprint-Ready Jira Ticket (Gherkin AC + V1 Scope Limits)    │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Key Deliverables & Documentation

| Deliverable | Description | Location / File |
| :--- | :--- | :--- |
| 💻 **Interactive Live App** | Streamlit Web Application with presets, side-by-side inspection, and export | [`app.py`](app.py) |
| 📄 **PRD Document** | Full Product Requirements Document (Pipeline, Architecture, KPIs) | [`PRD.md`](PRD.md) |
| 🎫 **Jira Ticket Spec** | Developer Jira Specification (`PEEC-408`, Gherkin Scenarios, V1 Limits) | [`JIRA_PEEC_102.md`](JIRA_PEEC_102.md) |
| 📊 **Executive Pitch Deck** | 5-Slide Pitch Deck with speaker notes & teardown | [`PRESENTATION.md`](PRESENTATION.md) |
| 🧪 **Automated Test Suite** | 8 unit and end-to-end pipeline verification tests | [`tests/test_pipeline.py`](tests/test_pipeline.py) |

---

## 🎯 Scope Matrix (Agile Boundaries)

| ✅ In-Scope (Version 1 MVP) | 🛑 Explicitly Out-of-Scope (V1 Limits) |
| :--- | :--- |
| • Side-by-side entity and factual delta parser | 🛑 Direct CMS auto-publishing (WordPress/Webflow) |
| • JSON-LD schema and microdata extractor | 🛑 Automated cold backlink/PR email outreach |
| • Instant 1-click **Markdown Content Brief** export | 🛑 Real-time scraping behind paid paywalls |
| • Asynchronous processing with 24-hour cache TTL (< 1.5s) | 🛑 Multi-tenant workspace role management |
| • Graceful 403 / Anti-bot fallback handler | 🛑 Custom LLM model fine-tuning |
| • Inspectable raw scraped payload drawer with primary source links | |

---

## 🧪 Data Provenance & Zero-Extrapolation Guardrail

To eliminate AI hallucinations and establish trust with enterprise marketing teams:
1. **Deterministic Primary Ingestion:** Raw HTML, JSON-LD schemas (`application/ld+json`), and OpenGraph metadata are parsed directly from target URLs.
2. **Zero-Extrapolation Constraint:** The diff engine is strictly constrained to cite facts *only* if they exist verbatim in the scraped text corpus; otherwise omitted.
3. **Inspectable Scraped Payload Drawer:** Collapsible UI drawer provides full transparency into HTTP status (`200 OK` / `403 Fallback`), fetch timestamp, content length, and raw extracted text.
4. **Primary Source Anchors:** Every benchmark comparison includes an active `Verify Source ↗` hyperlink pointing directly to the live competitor page.

---

## ⚡ Quick Start & Installation

### 1. Prerequisites
- Python 3.10+ (Tested on Python 3.11)

### 2. Setup Virtual Environment & Install Dependencies
```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

### 3. Run the Interactive Streamlit App
```bash
streamlit run app.py
```

### 4. Run Automated Test Suite
```bash
pytest -v
```

---

## 📊 Presentation Assets for Peec AI

| Asset | Where to Host / Present | What It Proves to Peec AI Founders & Leads |
| :--- | :--- | :--- |
| **Interactive Live App** | Streamlit Cloud / Local | Shows ability to prototype working AI products before engineering commits sprint capacity. |
| **Public GitHub Repo** | `github.com/MerekeDadabayeva` | Clean Python code, Pydantic data schemas, robust ingestion, and async caching architecture. |
| **1-Page Teardown & PRD** | Attached to LinkedIn / Email | Proves deep domain fluency in Generative Engine Optimization (GEO) and sprint-ready Gherkin spec writing. |

---

## 👤 Author & Organization

* **Lead Author & Product Manager:** Mereke Dadabayeva
* **Target Organization:** Peec AI (Berlin)
* **Status:** Sprint Ready (Ticket: `PEEC-408` / `PEEC-102` Series)\n