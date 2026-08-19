# Jira Ticket Specification: PEEC-102

**Ticket Key:** `PEEC-102`  
**Summary:** Build Diagnostic Side-by-Side Semantic & Entity Citation Gap Engine  
**Project:** Peec AI Analytics Platform  
**Component:** `Analytics-Engine / AI-Gateway`  
**Issue Type:** Story  
**Story Points:** `5`  
**Epic Link:** `PEEC-EPIC-12` (AI Search Actionability & Remediation)  
**Reporter:** Mereke Dadabayeva (Product Manager)  
**Assignee:** Core Backend / Full-Stack Engineer  
**Priority:** High  

---

## 1. User Story

* **AS A** Growth Marketing Manager tracking AI search visibility in Peec AI,
* **I WANT TO** inspect the semantic, factual, and JSON-LD schema gap between my domain and winning competitor citation URLs,
* **SO THAT** I can immediately update my pages with the exact missing data points required to win LLM citations in ChatGPT, Perplexity, and Gemini.

---

## 2. Technical Context & Overview

When an AI search monitor flags that a client's page lost citation rank to a competitor on a monitored prompt (e.g., *"Best CRM for Startups"*), this ticket implements the backend pipeline and frontend modal to:
1. Ingest raw HTML and JSON-LD from both the brand's landing page and the winning competitor URL(s).
2. Execute a deterministic entity and factual delta comparison (under a zero-extrapolation constraint).
3. Render a side-by-side gap analysis modal with a 1-click Markdown Content Brief generator.
4. Provide a collapsible raw payload drawer with timestamps, HTTP status codes, and direct `Verify Source ↗` anchors.

---

## 3. Acceptance Criteria (Gherkin Scenarios)

```gherkin
Feature: Autonomous AI Search Citation Gap & Remediation (PEEC-102)

  Background:
    Given the user is authenticated in Peec AI Dashboard
    And has at least one tracked query with active generative search monitoring data

  Scenario: Successful Citation Gap Inspection and Markdown Brief Export
    Given a tracked prompt where brand visibility rank is > 2 or unmentioned
    When the user clicks "Inspect Citation Gap" for a target competitor source
    Then the system retrieves the analysis from Redis cache in < 1.5 seconds (or triggers Celery scraping worker)
    And renders a side-by-side modal displaying:
      | Section                       | Details & Verification                                          |
      | 1. Missing JSON-LD Schema     | Missing @type definitions (FAQPage, Product), missing attributes |
      | 2. Numerical Benchmarks       | Verbatim stats, pricing figures, and claims present on competitor|
      | 3. Remediation Brief Export   | 1-click formatted Markdown brief ready for copywriters          |
    And each recommended benchmark includes an active "Verify Source ↗" hyperlink
    And a collapsible "[ 🔍 View Scraped Payload ]" drawer displays the raw HTML/JSON snippet and fetch timestamp.

  Scenario: Anti-Scraping / 403 Graceful Degradation
    Given a target competitor URL protected by Cloudflare, CAPTCHA, or returning HTTP 403
    When the ingestion worker attempts scraping and receives a non-200 block status
    Then the engine falls back gracefully to SERP-level snippet and domain authority signals
    And renders an alert banner: "Target page protected by anti-bot. Showing domain authority and SERP delta."
    And the application does NOT crash or return an unhandled HTTP 500 error.

  Scenario: Zero-Extrapolation Hallucination Prevention
    Given a raw scraped payload from a competitor URL
    When the LLM diffing prompt processes the target and competitor text corpora
    Then the engine only returns factual gaps that exist verbatim in the scraped text
    And returns `null` or omits any entity not directly verified in the raw payload.
```

---

## 4. Implementation Sub-Tasks & Architecture

### Sub-Task 1: Ingestion & Scraping Worker (`PEEC-102-A`)
- [ ] Implement async crawler using HTTPX with browser header emulation (or Playwright fallback).
- [ ] Add 24-hour Redis caching layer keyed by `hash(target_url + competitor_url)`.
- [ ] Implement 403 / CAPTCHA detection and fallback signal generator.

### Sub-Task 2: Schema & Entity Delta Parser (`PEEC-102-B`)
- [ ] Extract JSON-LD microdata (`extruct` / BeautifulSoup parser).
- [ ] Identify schema delta (e.g. missing `FAQPage`, missing `Review`, missing `AggregateRating`).
- [ ] Implement zero-extrapolation prompt with strict JSON schema response validation.

### Sub-Task 3: UI Modal & Markdown Exporter (`PEEC-102-C`)
- [ ] Build responsive side-by-side comparison modal in React / Tailwind.
- [ ] Add 1-click "Copy Markdown Brief" button.
- [ ] Add collapsible Raw Payload Inspection Drawer showing HTTP code, timestamp, and raw DOM snippet.
- [ ] Add direct `Verify Source ↗` outbound link with `rel="noopener noreferrer"`.

---

## 5. Definition of Done (DoD)
- [ ] Unit tests pass with > 85% coverage across diffing and fallback logic.
- [ ] Cached modal response latency verified at < 1.5 seconds.
- [ ] Zero-extrapolation verification tests confirm no fabricated metrics are generated.
- [ ] Manual QA verified on sample prompt: *"Best CRM for Startups"*.
