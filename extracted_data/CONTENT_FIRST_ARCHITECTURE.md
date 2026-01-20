# Content-First Application Architecture

## Overview

This document describes how to build a **Content-First Application** using extracted medical aid data. The core principle is:

> **The plan's content drives the app's structure, not the other way around.**

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     EXTRACTION PIPELINE                         │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐  │
│  │  Images  │───►│Annotated │───►│  Vision  │───►│  JSON    │  │
│  │  (.png)  │    │  Loader  │    │Extractors│    │  Output  │  │
│  └──────────┘    └──────────┘    └──────────┘    └──────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                       EXTRACTED DATA                             │
│                                                                  │
│  extracted_data/                                                 │
│  └── discovery_health_comprehensive/                             │
│      ├── classic-comprehensive-2026.json                        │
│      ├── classic-smart-comprehensive-2026.json                  │
│      └── README.md                                               │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     CONSUMING APPLICATION                        │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    DATA LAYER                             │   │
│  │  - Load JSON files                                        │   │
│  │  - Index by plan_slug, procedure_name                     │   │
│  │  - Build search/filter indexes                            │   │
│  └──────────────────────────────────────────────────────────┘   │
│                              │                                   │
│                              ▼                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                  MODULE RENDERER (SDUI)                   │   │
│  │                                                           │   │
│  │  plan.modules.forEach(module => {                        │   │
│  │    switch(module.type) {                                  │   │
│  │      case 'chronic': render(<ChronicCard />)              │   │
│  │      case 'oncology': render(<OncologyCard />)           │   │
│  │      default: render(<GenericCard />)                    │   │
│  │    }                                                      │   │
│  │  })                                                       │   │
│  └──────────────────────────────────────────────────────────┘   │
│                              │                                   │
│                              ▼                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    ROUTE STRUCTURE                        │   │
│  │                                                           │   │
│  │  /plan/[scheme]/[slug]     → Plan detail                  │   │
│  │  /procedure/[name]         → Procedure across plans       │   │
│  │  /compare/[a]/vs/[b]       → Side-by-side                │   │
│  │  /benefits/[feature]       → Plans with feature           │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Key Principles

### 1. No Fixed Schema Required

Traditional approach:
```sql
-- Forces ALL plans to have these columns
CREATE TABLE plans (
  chronic_benefit_limit INT,
  maternity_waiting_period INT,
  ...50 more columns...
);
```

Content-first approach:
```json
{
  "modules": [
    { "type": "chronic_illness_benefit", "data": {...} },
    { "type": "maternity_benefit", "data": {...} }
  ]
}
```

Benefits:
- ✅ New benefits automatically appear without schema changes
- ✅ Plans only include what they actually offer
- ✅ Zero NULLs or placeholder data

---

### 2. Server-Driven UI (SDUI)

The backend (this pipeline) decides WHAT to show.  
The frontend decides HOW to show it.

```
Pipeline outputs:
{
  "modules": [
    { "type": "screening_benefit", "title": "Screening", "data": {...} }
  ]
}

Frontend interprets:
if (type === "screening_benefit") {
  render(<ScreeningBenefitCard />)
}
```

---

### 3. SEO Through Content Variation

Each plan renders **structurally different pages**:

**Classic Comprehensive** might show:
- ChronicCard
- OncologyCard
- ScreeningCard
- InternationalTravelCard

**Classic Smart** might show:
- DaySurgeryCard
- ScreeningCard

This prevents "scaled content abuse" because pages are genuinely unique.

---

## Implementation Checklist

For your consuming application:

- [ ] Load JSON files at build time (SSG) or request time (SSR)
- [ ] Create a `ModuleRenderer` component that switches on `module.type`
- [ ] Build individual card components for each module type
- [ ] Create a `GenericCard` fallback for unknown types
- [ ] Generate dynamic meta tags from `identity` and `premiums`
- [ ] Build procedure index from `procedures[]` arrays
- [ ] Create comparison logic by loading multiple plan JSONs

---

## Example: Building Procedure Pages

```javascript
// Build an index of procedures across all plans
const procedureIndex = {};

plans.forEach(plan => {
  plan.procedures.forEach(proc => {
    const key = slugify(proc.procedure_name);
    if (!procedureIndex[key]) {
      procedureIndex[key] = [];
    }
    procedureIndex[key].push({
      plan: plan.identity.plan_name,
      copayment: proc.copayment,
      covered: proc.pmb_covered
    });
  });
});

// Now you can render:
// /procedure/gastroscopy → shows gastroscopy across all plans
```

---

## File Organization

```
extracted_data/
├── discovery_health_comprehensive/
│   ├── README.md                              ← Usage guide
│   ├── classic-comprehensive-2026.json        ← Plan data
│   └── classic-smart-comprehensive-2026.json  ← Plan data
│
├── discovery_health_essential/                 ← Future extraction
├── bonitas/                                    ← Future extraction
└── ...
```

Each scheme/product family gets its own directory with:
- Plan JSON files
- README with scheme-specific notes
