
# 🧭 HealthOS 2.0: The Virtual Actuary Protocol
**UX Strategy & Product Definition Document**

## 1. The Core Philosophy
**From "Shopping" to "Engineering".**
We are deprecating the e-commerce model (Search -> Filter -> Browse List) in favor of a **Simulation-First Architecture**.
* **Old World:** "Here are 50 plans. Good luck figuring out which one covers a C-Section."
* **New World:** "We simulated a C-Section on 50 plans. Here is the one where you pay the least cash."

## 2. The User Journey (The "Sarah" Archetype)

### Phase 1: The Context Landing
The user does not land on a generic homepage. They land on a **Living Persona** page (e.g., `/simulate/maternity-first`).

* **The Hook:** A natural-language statement that instantly validates their intent.
    > *"Simulating a **Natural Birth (Private)** for a family earning **R35,000** in **Cape Town**."*
* **The Control:** This statement is interactive. Clicking any bolded term opens a **Smart Input Deck** to refine the variable (Income, Location, Risk Tolerance).

### Phase 2: The Simulation Stage (Main View)
Instead of a list of plan cards, the user sees a single **Clinical Timeline**.

* **Visual Metaphor:** A vertical "Flight Path" representing the clinical journey.
* **The Story:**
    * *Month 3:* 🟢 **Antenatal Scan** (Paid by Risk).
    * *Month 7:* 🔴 **Gynae Check-up** (Out of Pocket - Savings Depleted).
    * *Month 9:* 🟡 **Anaesthetist** (Shortfall - Scheme Rate vs Private Rate).
* **The Bottom Line:** A prominent scorecard showing the **Total Event Cost** vs. **Your Cash Exposure**.

### Phase 3: The Experiment (Interactive Optimization)
The user is empowered to "fix" the red flags in the simulation.

* **The "What If?" Toggle:** A switch to stress-test the plan (e.g., *Natural Birth* vs. *Emergency C-Section*).
* **The Challenger Dock:** A horizontal rail of alternative plans at the bottom.
    * *Plan A (Current):* "Lowest Premium."
    * *Plan B (Challenger):* "Zero Shortfall (Adds R800pm)."
* **The Swap:** Clicking a challenger instantly re-runs the simulation on the Main Stage, turning Red nodes to Green.

### Phase 4: The Artifact (Tangible Value)
* **The Human Receipt:** A button flips the timeline into a stylized "Medical Invoice," grounding abstract math in reality.
* **The Share:** A WhatsApp-ready summary for the spouse/partner decision-maker.

---

## 3. Key Components & Features

### A. The Smart Input Deck (Hero Section)
* **Function:** Replaces complex filter sidebars.
* **Behavior:**
    * **Natural Language Form:** "I am a **[Single Member]** looking for **[Chronic Care]**."
    * **Psychographic Toggles:** A sliding scale for *Admin Tolerance* ("I handle paperwork" vs "I hate admin") and *Financial Certainty* ("Low Premium" vs "No Surprises").

### B. The Simulator Stage (Centerpiece)
* **Function:** Visualizes the `SimulationResult`.
* **Elements:**
    * **Timeline Nodes:** Color-coded (Green/Yellow/Red) steps in the medical event.
    * **Insight Tooltips:** Hovering explains *why* a cost occurred (e.g., *"This plan uses a State Medicine Formulary"*).
    * **Sensitivity Toggle:** Switches the `ClinicalScenario` variant (e.g., *Routine* vs *Critical*).

### C. The Strategy Dock (Footer)
* **Function:** Context-aware navigation between plans.
* **Logic:** Limits choice to 3 strategic options:
    1.  **The Efficient Choice:** Lowest premium that covers the *Critical* events.
    2.  **The Safety Choice:** Higher premium, zero shortfalls (Peace of Mind).
    3.  **The Budget Choice:** Lowest premium, accepts calculated risks.

### D. The Delight Layer
* **"Human Receipt" View:** A CSS-styled invoice showing line-item costs.
* **Spouse Share:** Generates a text summary: *"Plan A costs R2k/pm but leaves us with a R10k birth bill. Plan B costs R3k/pm but covers everything. I prefer B."*

---

## 4. Data Requirements

To power this experience, our data architecture must evolve:

1.  **Persona 2.0:** Needs `behavioral_profile` (Risk/Admin tolerance) and `active_simulations` (e.g., linking "Young Couple" to "Maternity Scenario").
2.  **PlanProduct 2.0:** Needs `scores` (Admin Burden, Certainty) and specific `rule_logic` for clinical events (e.g., "Anaesthetist covered at 200%").
3.  **ClinicalScenario (New):** A standardized "Bill of Materials" for medical events (Cost, Tariff Codes, Frequency) to run against the plans.

---

## 5. Success Metrics
We know this redesign works when:
1.  **Time on Page increases:** Users spend time toggling scenarios and swapping plans.
2.  **"Share" actions increase:** Users generate the WhatsApp summary for their partners.
3.  **Lead Quality improves:** Users clicking "Check Availability" effectively "know" the plan's trade-offs, leading to higher conversion for brokers.

***