# Discovery Health Comprehensive Plans - Extracted Data

> **Content-First Approach**: This data is designed to drive your application's UI, not the other way around.

## Quick Start

```javascript
// Load a plan
const plan = require('./classic-comprehensive-2026.json');

// Render modules dynamically
plan.modules.forEach(module => {
  renderComponent(module.type, module.data);
});
```

---

## Data Files

| File | Plan | Premium (Main) |
|------|------|----------------|
| `classic-comprehensive-2026.json` | Classic Comprehensive | R10,037/mo |
| `classic-smart-comprehensive-2026.json` | Classic Smart Comprehensive | R8,576/mo |

---

## Schema Reference

### Root Structure

```json
{
  "identity": { ... },           // Plan identification
  "extraction_metadata": { ... }, // Data quality info
  "premiums": { ... },           // Monthly costs
  "hospital_benefits": { ... },  // Hospital cover
  "procedures": [ ... ],         // Procedure-specific limits
  "modules": [ ... ]             // Dynamic benefit blocks (SDUI)
}
```

### Identity

```json
{
  "scheme_slug": "discovery-health",
  "plan_slug": "classic-comprehensive",
  "plan_name": "Classic Comprehensive",
  "year": 2026
}
```

### Premiums

```json
{
  "main_member": 10037,
  "adult_dependant": 9492,
  "child_dependant": 2002,
  "msa_percentage": 25,
  "notes": ["Applicable from 1 April 2026..."]
}
```

### Modules (Server-Driven UI)

Each module is a self-contained benefit block:

```json
{
  "type": "screening_benefit",
  "title": "Screening and Prevention",
  "description": "Covers various screening tests...",
  "data": {
    "tests": ["Mammogram", "Colonoscopy"],
    "vaccines": ["Flu vaccine", "Pneumococcal"]
  }
}
```

**Module Types**:
| Type | Description |
|------|-------------|
| `chronic_illness_benefit` | Chronic disease coverage |
| `oncology_benefit` | Cancer treatment |
| `screening_benefit` | Preventive care |
| `day_surgery_network` | Day surgery facilities |
| `international_travel_benefit` | Overseas cover |

---

## Content-First App Architecture

### The Problem with Traditional Approaches

❌ **Schema-First**: Define rigid database columns, force all plans to fit  
❌ **UI-First**: Build fixed components, hide missing data

### The Content-First Solution

✅ **Plan Drives the App**: Each plan's `modules[]` array determines what the UI renders.

```
Plan JSON ──► Module Renderer ──► Dynamic Components
                    │
                    ├─► chronic_illness_benefit ──► ChronicCard
                    ├─► screening_benefit ──► ScreeningCard
                    └─► [unknown_type] ──► GenericCard
```

### Implementation Pattern

```typescript
// ModuleRenderer.tsx
function ModuleRenderer({ modules }) {
  return modules.map(module => {
    switch (module.type) {
      case 'chronic_illness_benefit':
        return <ChronicCard data={module.data} />;
      case 'screening_benefit':
        return <ScreeningCard data={module.data} />;
      default:
        return <GenericCard module={module} />;
    }
  });
}
```

---

## pSEO Route Suggestions

Use this data to generate these high-value pages:

### 1. Plan Detail Pages
```
/plan/{scheme_slug}/{plan_slug}
```
Data: Full JSON file

### 2. Procedure Pages
```
/procedure/{procedure_name}
/procedure/{procedure_name}/{plan_slug}
```
Data: `procedures[]` array, filtered/grouped

### 3. Comparison Pages
```
/compare/{plan_a}/vs/{plan_b}
```
Data: Load both JSONs, diff premiums/benefits

### 4. Feature Hub Pages
```
/benefits/chronic-cover
/benefits/unlimited-hospital
```
Data: Filter plans where `modules[].type === 'chronic_illness_benefit'`

---

## Jargon Reference

Include these definitions in your UI for user education:

| Term | Meaning |
|------|---------|
| **PMB** | Prescribed Minimum Benefits - legally required coverage |
| **MSA** | Medical Savings Account - funds for day-to-day expenses |
| **DSP** | Designated Service Provider - in-network provider |
| **Co-payment** | Out-of-pocket amount you pay per service |
| **Pre-authorization** | Approval required before hospital admission |
| **DHR** | Discovery Health Rate - scheme's payment rate |

---

## Data Quality

The `extraction_metadata` object indicates data reliability:

```json
{
  "confidence_score": 0.86,      // 0-1 scale
  "requires_review": true,       // Manual check needed?
  "review_notes": ["PMB with high co-payment"]
}
```

**Recommendation**: Flag pages with `requires_review: true` for human verification.

---

## Updating Data

Run the extraction pipeline:

```bash
python src/category_pipeline.py data/raw/ \
  --scheme-slug discovery-health \
  --plan-slug comprehensive-classic \
  --plan-name "Comprehensive Classic" \
  --year 2026
```

Output will be saved to `data/output/` and can be copied here.

---

## License & Attribution

Data extracted from publicly available Discovery Health brochures.
For internal use only. Verify with official sources before publishing.
