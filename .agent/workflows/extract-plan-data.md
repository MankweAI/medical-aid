---
description: Extract medical aid plan data from images with multi-phase validation
---

# Data Extraction Workflow

This workflow extracts structured plan data from images in `raw_data/` using a multi-phase, multi-model validation pipeline.

## Trigger Phrases

| Phrase | Action |
|--------|--------|
| `Extract data from raw_data/{scheme}/{plan}/` | Start Phase 1-3.1 (Sonnet 4.5) |
| `Proceed with final Cross-Validation` | Start Phase 3.2-4 (Opus 4.5) |

---

## Phase 1: Image Categorization (Sonnet 4.5)

**Input**: Image folder path (e.g., `raw_data/discovery-health/active-smart-2026/`)

**Steps**:
1. List all images in the folder
2. View each image and classify by content type:

| Category | Description | Priority |
|----------|-------------|----------|
| `premiums` | Premium tables, income bands | 🔴 High |
| `hospital` | Hospital benefits, networks, DSP rules | 🔴 High |
| `procedures` | Procedure co-payments (Scopes, MRI, Dental, etc.) | 🔴 High |
| `day_to_day` | GP, Dentist, Optom, Specialist limits | 🟡 Medium |
| `chronic` | Chronic Disease List (CDL), medicine lists | 🟡 Medium |
| `oncology` | Cancer benefit limits, innovation benefits | 🟡 Medium |
| `maternity` | Maternity benefits, waiting periods | 🟢 Low |
| `modules` | Optional extras (Travel, Mental Health, etc.) | 🟢 Low |
| `other` | Cover pages, ToC, etc. | ⚪ Skip |

3. Output: `staging/{plan}/manifest.json`

**Manifest Schema**:
```json
{
  "plan": "active-smart-2026",
  "scheme": "discovery-health",
  "created_at": "2026-01-19T14:00:00Z",
  "model": "claude-sonnet-4.5",
  "images": [
    { "file": "page_01.png", "category": "premiums", "confidence": "high" },
    { "file": "page_05.png", "category": "day_to_day", "confidence": "medium" },
    { "file": "page_08.png", "category": "chronic", "confidence": "high" }
  ]
}
```

---

## Phase 2: Category-Specific Extraction (Sonnet 4.5)

**Process 1-3 images per category pass**:

// turbo-all
1. Read manifest to get image groupings
2. For each category, view relevant images and extract to partial JSON
3. Output: `staging/{plan}/{category}.json`

### Extraction Schemas by Category:

**`premiums.json`**:
```json
{
  "main_member": 3886,
  "adult_dependant": 2914,
  "child_dependant": 1556,
  "msa_percentage": 10,
  "notes": ["Jan-Mar premiums differ"]
}
```

**`procedures.json`** (target 20+ per plan):
```json
{
  "procedures": [
    { "procedure_name": "Gastroscopy", "copayment": 0, "pmb_covered": true, "notes": "Day Surgery Network only" },
    { "procedure_name": "Hip Replacement", "copayment": 7250, "pmb_covered": true, "notes": "" },
    { "procedure_name": "MRI Scan", "copayment": 3500, "pmb_covered": false, "notes": "Pre-auth required" },
    { "procedure_name": "Cataract Surgery", "copayment": 0, "pmb_covered": true, "notes": "DSP required" }
  ]
}
```

**`day_to_day.json`**:
```json
{
  "gp_visits": { "limit": "Unlimited", "network": "Smart Network", "copayment": 75 },
  "specialist_visits": { "limit": 6, "annual_cap": null },
  "dentist": { "limit": 3500, "notes": "Basic dentistry only" },
  "optometry": { "limit": 2000, "notes": "Includes frames" }
}
```

**`chronic.json`**:
```json
{
  "cdl_conditions_covered": 27,
  "medicine_formulary": "Discovery Chronic Medicine List",
  "additional_disease_list": true,
  "examples": ["Diabetes Type 2", "Hypertension", "Asthma"]
}
```

**`oncology.json`**:
```json
{
  "oncology_benefit_limit": 250000,
  "pmb_unlimited": true,
  "innovation_benefit": true,
  "extended_benefit": true,
  "notes": "12-month cycle"
}
```

**`maternity.json`**:
```json
{
  "waiting_period_months": 9,
  "antenatal_visits": "Unlimited",
  "delivery_cover": "100% DHR",
  "scan_limit": 4,
  "notes": "Caesarean requires pre-auth"
}
```

---

## Phase 3.1: Self-Validation (Sonnet 4.5)

Run basic sanity checks on extracted data:

| Check | Rule | Action |
|-------|------|--------|
| Range | Premium between R500-R15,000 | Flag if outside |
| Consistency | Hospital copay ≤ Procedure copay | Flag if mismatch |
| Completeness | Required fields present | Flag if missing |

**Output**: `staging/{plan}/validation_phase1.json`

```json
{
  "phase": "3.1",
  "model": "claude-sonnet-4.5",
  "status": "awaiting_cross_validation",
  "checks_passed": 12,
  "checks_flagged": 2,
  "flags": [
    { "category": "procedures", "field": "gastroscopy.copayment", "value": 7750, "issue": "exceeds hospital copay 5500", "severity": "warning" }
  ]
}
```

**⚠️ SESSION END POINT**: After Phase 3.1, the extraction session ends. User must switch to Opus 4.5.

---

## Phase 3.2: Cross-Validation (Opus 4.5)

**Trigger**: `Proceed with final Cross-Validation`

**Input**: `staging/{plan}/` directory with all partial JSONs and Phase 3.1 validation report

**Steps**:
1. Read all partial JSONs and validation report
2. Re-view flagged source images to verify values
3. Run independent consistency checks
4. Generate final validation report

**Output**: `staging/{plan}/validation_final.json`

```json
{
  "phase": "3.2",
  "model": "claude-opus-4.5",
  "status": "approved" | "requires_correction",
  "corrections": [],
  "notes": "All values verified against source images."
}
```

---

## Phase 4: Promotion (Opus 4.5)

If validation passes:

1. Merge all partial JSONs into single `ExtractedPlan` object
2. Add extraction metadata:
   ```json
   "extraction_metadata": {
     "extraction_method": "claude-vision-pipeline",
     "extracted_at": "2026-01-19T14:30:00Z",
     "extraction_model": "claude-sonnet-4.5",
     "validation_model": "claude-opus-4.5",
     "confidence_score": 0.95,
     "requires_review": false
   }
   ```
3. Write to `extracted_data/{scheme}/{plan}.json`
4. Archive staging folder to `staging/archive/{plan}-{timestamp}/`

---

## Directory Structure

```
raw_data/
├── discovery-health/
│   └── active-smart-2026/
│       ├── page_01.png
│       └── page_02.png

staging/
├── active-smart-2026/
│   ├── manifest.json
│   ├── premiums.json
│   ├── hospital.json
│   ├── procedures.json
│   ├── validation_phase1.json
│   └── validation_final.json
└── archive/

extracted_data/
└── discovery_health/
    └── active-smart-2026.json
```

---

## Error Recovery

| Scenario | Action |
|----------|--------|
| Image unreadable | Flag in manifest, skip category, note in metadata |
| Extraction ambiguous | Set low confidence, add flag for human review |
| Validation fails | Do not promote, list corrections needed |
| User correction | Re-run from Phase 2 for affected category only |
