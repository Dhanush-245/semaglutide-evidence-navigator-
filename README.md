# Semaglutide Evidence Navigator

A **safety-critical, retrieval-augmented, citation-verified medical evidence engine** for Semaglutide, Ozempic, Wegovy, and Rybelsus. Grounded strictly in official US FDA labels, European EMA Summaries of Product Characteristics (SmPC), ClinicalTrials.gov, and peer-reviewed studies.

---

## 🏛️ Architecture Overview

```
                    ┌──────────────────┐
                    │    Streamlit     │
                    │    Frontend      │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │     FastAPI      │
                    │     Backend      │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Question / Safety│
                    │     Router       │
                    └────────┬─────────┘
                             │
                    ┌────────┴────────┐
                    │                 │
                  Allowed           Unsafe
                    │                 │
                    ▼                 ▼
               ┌─────────┐      Refusal /
               │ Retrieval│      Escalation
               └────┬────┘
                    │
                    ▼
               ┌─────────┐
               │  FAISS  │
               └────┬────┘
                    │
                    ▼
              Retrieved Evidence
                    │
                    ▼
              ┌─────────────┐
              │ Pretrained  │
              │     LLM     │
              └──────┬──────┘
                     │
                     ▼
              Citation Validator
                     │
                     ▼
        Answer + Evidence + Sources
        + Jurisdiction + Status
        + Limitations
```

---

## 🚩 Project Boundary (System Scope)

### The System WILL:
- ✅ Retrieve approved and selected medical evidence from regulator documents (FDA / EMA).
- ✅ Explain medical terminology and drug action mechanisms with clear definitions.
- ✅ Summarize label sections (e.g., Indications, Boxed Warnings, Contraindications, Pharmacokinetics).
- ✅ Summarize safety evidence and clinical trial endpoints (SUSTAIN, STEP, PIONEER, SELECT).
- ✅ Compare evidence with explicit jurisdiction identification (US vs. EU / EMA).
- ✅ Provide clickable citations directly linking to official source pages, sections, and page locators.
- ✅ Indicate evidence status and uncertainty level transparently.
- ✅ Abstain automatically when official evidence is missing or insufficient in the corpus.

### The System WILL NOT:
- ❌ Provide clinical diagnoses or substitute for a doctor's evaluation.
- ❌ Determine whether an individual patient should take Ozempic, Wegovy, or Rybelsus.
- ❌ Prescribe medicines or issue medical orders.
- ❌ Personalize dosage schedules or calculate individual titration steps.
- ❌ Direct patients to stop, pause, or switch prescription medications.
- ❌ Generate individualized treatment plans.
- ❌ Facilitate unsafe procurement or non-prescription sources.
- ❌ Provide instructions for unapproved custom compounding or salt manipulation.

---

## 🛣️ 12-Milestone Development Roadmap

| Milestone | Subsystem / Focus | Gate Criteria |
| :--- | :--- | :--- |
| **Milestone 0** | Repository & Engineering Environment | Repo layout, branch protection, CI/CD, README, ADR-0001, Gate Script PASS |
| **Milestone 1** | Medical Source Ingestion Pipeline | FDA/EMA PDF & XML parsers, SHA256 hashes, Metadata Ledger |
| **Milestone 2** | LLM & Transformer Fundamentals | Benchmark tokenizer boundaries, prompt framing, answer contracts |
| **Milestone 3** | Chunking & Vector Embeddings | Token-overlap chunking, biomedical vs general embedding benchmark |
| **Milestone 4** | FAISS Semantic Retrieval Engine | Dense vector indexing, L2 / Cosine similarity search, Top-K retrieval |
| **Milestone 5** | Retrieval Evaluation Suite | Recall@1, Recall@3, Recall@5 ≥ 0.90, MRR benchmarking |
| **Milestone 6** | Baseline RAG Pipeline | Grounded prompt generator, citation tagger, evidence binder |
| **Milestone 7** | 5-Category Safety Router | 120+ safety test prompts, ≥98% accuracy on Category C/D/E refusal/escalation |
| **Milestone 8** | Evidence Synthesis & Citation Verification | Programmatic claim-to-chunk validator, strict anti-hallucination blocker |
| **Milestone 9** | Full System Quality Evaluation Suite | 220+ question test bench across FDA, EMA, Trials, and Refusal cases |
| **Milestone 10** | FastAPI Service & Streamlit UI | REST endpoints, interactive evidence inspector, interactive citations |
| **Milestone 11** | Staging, Docker & Red-Team Testing | Containerization, adversarial prompt injection audit, risk register |
| **Milestone 12** | Release v1.0, Docs & Presentation | System card, data card, architecture decision records, final demo |

---

## 🛠️ Quick Start & Environment Setup

```bash
# Clone the repository
git clone https://github.com/your-org/semaglutide-evidence-navigator.git
cd semaglutide-evidence-navigator

# Create Python 3.11 virtual environment
python3 -m venv venv
source venv/bin/activate

# Install requirements
pip install -r requirements.txt

# Run Week 0 Gate Verification
python scripts/check_week0_gate.py
```

---

## 📜 License & Governance

Educational and medical research prototype. Built under strict compliance with FDA/EMA educational guidelines. See `CONTRIBUTING.md` for branch protection rules and code submission standards.
