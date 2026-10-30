# ADR-0001: System Scope and Medical Safety Boundaries

* **Status:** Approved
* **Date:** 2026-08-11
* **Authors:** Semaglutide Evidence Navigator Architecture Team
* **Milestone:** Milestone 0 (Engineering Environment & Scope Definition)

---

## 1. Context & Problem Statement

Large Language Models (LLMs) applied in clinical and pharmaceutical domains risk hallucinating unverified medical claims, providing personalized dosage advice without clinical context, or generating unsafe off-label recommendations.

To build a safety-critical evidence engine for GLP-1 receptor agonists (Semaglutide, Ozempic, Wegovy, Rybelsus), we must establish a non-negotiable architectural boundary BEFORE building retrieval or LLM generation modules.

---

## 2. Decision

We define the strict **In-Scope (WILL)** and **Out-of-Scope (WILL NOT)** system boundaries as an immutable constraint across all downstream milestones.

### In-Scope Constraints (System WILL):
1. **Retrieve Official Evidence:** Extract and present factual excerpts exclusively from FDA drug labels, EMA SmPC documents, ClinicalTrials.gov summaries, and peer-reviewed journals.
2. **Medical Terminology Explanation:** Explain active ingredient mechanisms, pharmacological terms, and trial design parameters.
3. **Regulatory Label Summarization:** Summarize label sections (e.g., Indications and Usage, Contraindications, Warnings, Pharmacokinetics) with exact section titles and page locators.
4. **Clinical Trial Endpoint Evidence:** Summarize trial metrics (e.g., HbA1c reduction %, mean weight loss %, MACE hazard ratios) directly from published trial data.
5. **Jurisdiction Differentiation:** Explicitly flag whether evidence originates from US FDA or European EMA regulatory frameworks.
6. **Citation Transparency:** Attach clickable, verified citations linking every factual claim to its exact source chunk, section, and URL.
7. **Abstention Policy:** Automatically decline to generate answers when official evidence is missing or insufficient in the active corpus.

### Out-of-Scope Constraints (System WILL NOT):
1. **No Individual Diagnosis:** Refuse queries asking for patient diagnosis or symptom assessment.
2. **No Treatment Eligibility Guidance:** Refuse queries asking whether a specific person "should" take a medication.
3. **No Prescribing or Orders:** Prohibit order generation, script requests, or pharmacy routing.
4. **No Dosage Personalization:** Refuse customized dose calculation or individual titration scheduling.
5. **No Medication Stopping/Switching Orders:** Refuse requests to stop, pause, or substitute GLP-1 medications.
6. **No Unsafe Procurement:** Refuse requests to source non-prescription, custom compounded, or unverified semaglutide salts.

---

## 3. Consequences & Architectural Impact

- **Router Pre-Filter:** A dedicated 5-category Safety Router (`safety/router.py`) must evaluate every incoming query BEFORE semantic retrieval or LLM execution.
- **Audit Compliance:** Non-compliant prompts (Categories C, D, E) will trigger instant deterministic refusals or medical escalation notices without invoking LLM generation.
- **Citation Gate:** A programmatic citation validator (`generation/rag_engine.py`) will block any generated output if citations do not strictly map to retrieved source chunks.
