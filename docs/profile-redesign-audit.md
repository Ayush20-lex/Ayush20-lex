# AYUSH.EXE Profile Redesign — Phase 1 Audit & Current-State Findings

**Target Profile:** [Ayush20-lex (Ayush Kumar)](https://github.com/Ayush20-lex)  
**Target Repository:** [`Ayush20-lex/Ayush20-lex`](https://github.com/Ayush20-lex/Ayush20-lex)  
**Date:** October 2026  
**Auditor / Designer:** Developer Experience & Visual Architecture Agent (Antigravity)  
**Status:** Completed Pre-Implementation Audit  

---

## 1. Executive Summary

A comprehensive inspection of the current `Ayush20-lex/Ayush20-lex` repository, the live GitHub profile, public repositories (specifically [AirLytics NCR](https://github.com/Ayush20-lex/airlytics-ncr)), and referenced media assets was conducted.

The existing README establishes a genuine and friendly persona (machine learning student, gamer, anime/light-novel/manhwa enthusiast, calisthenics practitioner), but suffers from significant architectural, visual, and technical debt:
1. **Broken Asset Architecture:** All primary visuals and technology badges link directly to `/blob/` web pages on an external user's repository (`Xx-Ashutosh-xX/Xx-Ashutosh-xX`) rather than direct image endpoints or native local assets.
2. **HTML Formatting & Typographical Errors:** HTML image tags consistently misspell the height attribute (`hight="50"` across 10+ badges and banners), causing distorted aspect ratios, layout shifts, and non-standard HTML.
3. **Excessive Vertical Whitespace (`<br>` sprawl):** Multiple clusters of triple-stacked `</br></br></br>` tags are used to force vertical spacing, breaking mobile layouts and creating uneven gaps on different screen DPIs.
4. **Absence of Real Engineering Work:** The profile does not highlight Ayush's standout engineering work—most notably **AirLytics NCR** (a Smart India Hackathon environmental intelligence system with 72-hour validated forecasting, CPCB mesh integration, and grounded AI assistant)—nor his personal AI assistant engineering.
5. **Vulnerability to External Breakage:** The stats visual uses an external generator with a syntax error (`&&show_icons=true`) that lacks graceful degradation if Vercel or third-party badge providers fail.

A clean, reversible backup of the original README has been created at `README.original.md`.

---

## 2. Current-State Findings & Inventory

### 2.1 Repository Structure
```
Ayush20-lex/Ayush20-lex (Remote Main Branch)
├── README.md (2,924 bytes)
└── assets/
    ├── 13626.gif (991 KB)
    ├── 15682.gif (991 KB)
    ├── 1936.gif (4.90 MB)
    ├── 208593.gif (1.11 MB)
    ├── 35467.gif (2.03 MB)
    ├── 5132.gif (351 KB)
    ├── 93195.gif (1.96 MB)
    └── icons/
        ├── ai.png, aws.png, azure.png, bash.png, datascience.png, edge.png,
        ├── gmail.png, google_cloud_platform.png, intellij.png, java.png,
        ├── linkedin.png, pc.png, playstation@3x.png, python.png, reddit.png,
        └── steam.png, telegram.png, visualstudio_code.png, wordpress.png
```

### 2.2 Content & Section Breakdown

| Current Section | Implementation | Technical & Visual Defects | Recommended Action |
|---|---|---|---|
| **Header** | `# Konichiwa 👋` + centered GIF | Links to external user's GitHub `/blob/` URL; typo `hight="300"`; massive file load; no professional developer headline or tagline. | **Replace** with custom self-contained SVG header (`assets/profile-header.svg`) displaying `AYUSH.EXE`, "Build. Explore. Repeat.", and subtle terminal accents. |
| **Spacing** | `</br></br></br>` | Invalid HTML (`</br>` is not a valid closing tag; standard is `<br>` or CSS margins); creates irregular gaps on mobile viewports. | **Remove** all pseudo-closing `<br>` stacks; rely on standard Markdown block spacing. |
| **About Me** | Bullet points + right-aligned GIF | Typo `hight="400"`; links to external 4.9MB GIF; describes age ("20 years old") which becomes stale; misses university/degree context. | **Restructure** into an authentic, sharp profile summary emphasizing Computer Science & Engineering, AI/ML focus, and Linux terminal interests. |
| **Projects** | *Completely absent* | Major omission. No mention of AirLytics NCR or AI software development. | **Add Featured Project Showcase** with AirLytics NCR front-and-center, accompanied by technical architecture highlights and live demo links, followed by the high-level Personal AI Assistant. |
| **Languages & Tools** | Center-aligned PNG icon badges | All 10 badges point to `https://github.com/Xx-Ashutosh-xX/.../blob/...`; incorrect `hight="50"`; badges have mismatched aspect ratios (e.g., width 270 vs 90 vs 240); includes non-dev items ("edge", "pc", "playstation"). | **Overhaul** into structured technical categories (Languages, AI & Data, Systems & Dev Tools) using clean, high-contrast, standardized badges/icons. |
| **Contact Me** | Text + distorted Gmail/LinkedIn PNGs | Images use `width="130" height="100"` and `width="150" height="100"` which squashes standard square logos into distorted oblongs; links wrapped in unclosed paragraph tags. | **Modernize** with sleek, accessible badge/button links (Email, LinkedIn, GitHub) with proper aspect ratios and clean typography. |
| **GitHub Stats** | `github-readme-stats.vercel.app` widget | Query string has double ampersand syntax (`&&show_icons=true`); radical theme clashes with profile colors; no fallback if Vercel service is throttled/down. | **Retune** with a custom dark theme matching the cyan/violet palette, or pair with a resilient SVG fallback card. |
| **Divider** | `*************` | Generic raw asterisks. | **Replace** with clean thematic terminal divider or standard Markdown HR. |

---

## 3. Asset Analysis: Reuse vs. Replace vs. Remove

### 3.1 Reusable Assets
- **`assets/icons/python.png`, `bash.png`, `java.png`, `datascience.png`, `ai.png`, `visualstudio_code.png`**:
  - *Status:* Reusable if standardized, but official SVG icons or curated Shields/Simple-Icons in a cohesive dark theme provide much sharper rendering on Retina/HiDPI screens and dark-mode GitHub.
- **Contact Channels:**
  - `ayushkumargbp@gmail.com`
  - `https://www.linkedin.com/in/ayush-kumar-942081322/`
  - `https://github.com/Ayush20-lex`

### 3.2 Assets to Replace
- **Header GIF (`208593.gif` / 1.11 MB):** Replace with an original, lightweight, zero-dependency SVG banner (`assets/profile-header.svg`, ~15–25 KB).
- **Side GIF (`1936.gif` / 4.90 MB):** Excessive page weight causing slow mobile load times; replace with a clean terminal-styled interest matrix or subtle custom badge design.
- **Third-Party Icons from External Repos:** Replace external hotlinks to `Xx-Ashutosh-xX` with reliable, self-hosted or deterministic SVG badges.
- **Distorted Contact Icons (`gmail.png`, `linkedin.png`):** Replace squished 130×100 bitmaps with crisp, modern vector badges.

### 3.3 Assets to Remove
- Generic or unrelated icons: `wordpress.png`, `edge.png`, `pc.png`, `playstation@3x.png` from the primary technical stack. Gaming is moved to a dedicated "Outside the Terminal" section where it belongs naturally without diluting professional engineering credibility.
- Bulky, untracked GIFs totaling ~12 MB that slow down mobile and low-bandwidth connections.

---

## 4. Public Project Verification: AirLytics NCR

The public repository [`Ayush20-lex/airlytics-ncr`](https://github.com/Ayush20-lex/airlytics-ncr) was directly audited:
- **Verified Problem Statement:** Smart India Hackathon (SIH26082), Ministry of Earth Sciences / NCMRWF.
- **Core Capability:** 72-hour air quality forecast for Delhi NCR with full measurement provenance (every number traceable to station, hour, and CPCB 2014 arithmetic rules).
- **Verified Technical Stack:** TypeScript, React 19, Vite, Python (FastAPI), Open-Meteo, NASA VIIRS fire feeds, CPCB / WAQI station feeds.
- **Verified Benchmark / Accuracy:** Blend baseline at 61.12 µg/m³ RMSE (re-scored continuously via archive refresh pipeline).
- **Grounded AI Assistant:** Integrated 8-tool assistant strictly bounded to system endpoints (zero hallucination policy).
- **Verified Live Deployment:** [`https://airlytics-ncr.vercel.app/`](https://airlytics-ncr.vercel.app/)

*Rule Applied:* Only verified metrics and architecture from the actual project README are included. No fabricated claims or inflated numbers.

---

## 5. Private AI Assistant Project Handling

- **Classification:** Private personal project.
- **Constraints Enforced:**
  - Do NOT expose internal architecture, source code files, repository names, API keys, credentials, or private URLs.
  - High-level representation only: Characterized as a custom autonomous personal assistant focused on developer workflows, context management, and local productivity.

---

## 6. Risks, Limitations, and Assumptions

1. **GitHub Markdown Rendering Constraints:**
   - GitHub strips custom `<style>` blocks, external CSS stylesheets, and any `<script>` tags.
   - SVG files embedded via `<img>` tags cannot execute JavaScript or load external fonts/images over the network.
   - *Mitigation:* The custom banner must be 100% self-contained SVG using system fallback font stacks (`ui-monospace, SFMono-Regular, "Cascadia Code", "Fira Code", monospace`) and pure inline SVG vector shapes, gradients, and CSS keyframe animations.
2. **Third-Party Widget Reliability:**
   - External services like `github-readme-stats` occasionally suffer rate-limiting, downtime, or cold-start latency.
   - *Mitigation:* Profile must maintain full visual integrity and layout elegance even if third-party stats images return an empty response or broken icon.
3. **Workspace State:**
   - Local directory was freshly opened without an initialized git repo.
   - *Mitigation:* Work is conducted safely with `README.original.md` backup created immediately.

---

## 7. Proposed Final Section Architecture

```
1. Signature Banner (assets/profile-header.svg — "AYUSH.EXE // Build. Explore. Repeat.")
2. Identity Micro-Bar (Quick status, CSE student @ India, core focus areas)
3. About Me & Engineering Philosophy (Concise, authentic, no corporate buzzwords)
4. Featured Project Showcase:
   ├── Project 01: AirLytics NCR (Smart India Hackathon — Environmental Intelligence)
   └── Project 02: Autonomous Developer Assistant (High-Level Private Project)
5. Technical Arsenal & Tooling (Grouped: Languages, AI/ML & Data, Systems & Dev Tools)
6. GitHub Activity & Engineering Rhythm (Themed stats + streaks with graceful degradation)
7. Outside the Terminal (Gaming / Metroidvanias, Anime & Novels, Calisthenics)
8. Connect & Terminal Exit (Clean, accessible email, LinkedIn, and GitHub links)
```

---

## 8. Rollback & Recovery Strategy

- Original content backed up at: `c:\Users\ayush\OneDrive\Desktop\github-readme\README.original.md`
- Any change to `README.md` is non-destructive and can be reverted by copying `README.original.md` over `README.md`.
