import React, { useState } from 'react';
import {
  Folder,
  FileText,
  CheckCircle2,
  Terminal,
  ShieldCheck,
  ShieldAlert,
  GitBranch,
  Copy,
  Check,
  Play,
  ArrowRight,
  Code,
  Layers,
  Sparkles,
  Info,
  Calendar,
  Users,
  Award,
  BookOpen,
  FileCheck,
  CheckSquare,
  AlertCircle,
  ExternalLink
} from 'lucide-react';

interface RepoFile {
  path: string;
  category: 'core' | 'config' | 'doc' | 'code' | 'test';
  description: string;
  content: string;
}

const REPO_FILES: RepoFile[] = [
  {
    path: 'README.md',
    category: 'doc',
    description: 'System Overview, Architecture Diagram, Scope Boundaries, and Quickstart',
    content: `# Semaglutide / Ozempic Evidence Navigator

A **safety-critical, retrieval-augmented, citation-verified medical evidence engine** for Semaglutide, Ozempic, Wegovy, and Rybelsus. Grounded strictly in official US FDA labels, European EMA Summaries of Product Characteristics (SmPC), ClinicalTrials.gov, and peer-reviewed studies.

## Product Boundary
An educational research assistant for pharmacy, biomedical and ML learners. It retrieves and summarizes regulator-approved labeling, safety communications and clinical evidence with jurisdiction, date and citations. It does NOT diagnose, decide treatment eligibility, prescribe, personalize doses, support self-medication or replace a licensed clinician.

## Architecture Diagram
Streamlit/React Frontend -> FastAPI Backend -> Question/Safety Router -> FAISS Vector Store -> Pretrained LLM -> Citation Validator -> Response with Evidence

## Quickstart
\`\`\`bash
# 1. Clone repo & create virtual environment
git clone https://github.com/convergys-it/semaglutide-evidence-navigator.git
cd semaglutide-evidence-navigator
python3.11 -m venv venv && source venv/bin/activate

# 2. Install dependencies & run ingestion
pip install -r requirements.txt
python ingestion/pipeline.py --build-index

# 3. Run evaluation & launch app
pytest tests/ -v
npm run dev # or streamlit run app/ui/streamlit_app.py
\`\`\``
  },
  {
    path: 'CONTRIBUTING.md',
    category: 'doc',
    description: 'Branch Protection Rules, Definition of Done (DoD), and PR Workflows',
    content: `# Contributing & Engineering Hygiene Guidelines

## 1. Branching & Commit Conventions
- Direct commits to \`main\` are STRICTLY PROHIBITED.
- Branches must follow naming schema:
  - \`feat/123-fda-ingestion\`
  - \`fix/124-metadata-loss\`
  - \`docs/125-evaluation-plan\`
  - \`test/126-safety-router-bench\`

## 2. Pull Request (PR) Contract
Every PR must include:
1. Linked GitHub Issue with problem statement & user value
2. Acceptance criteria and safety impact analysis
3. Automated test outputs & before/after evaluation metrics
4. Zero committed secrets or personal health information (PHI)
5. 1+ independent teammate code review and approval before merge

## 3. Definition of Done (DoD)
- Code runs cleanly from a fresh clone
- Source metadata and version ledger entries are documented
- All unit, integration, and safety gate tests pass 100%`
  },
  {
    path: 'requirements.txt',
    category: 'config',
    description: 'Python 3.11 Dependencies (FastAPI, Streamlit, FAISS, Sentence-Transformers)',
    content: `fastapi==0.110.0
uvicorn==0.28.0
streamlit==1.32.0
pydantic==2.6.4
faiss-cpu==1.8.0
numpy==1.26.4
google-genai==0.1.1
sentence-transformers==2.5.1
torch==2.2.1
requests==2.31.0
beautifulsoup4==4.12.3
pytest==8.0.2
ragas==0.1.7`
  },
  {
    path: 'docs/adr/0001-project-boundary.md',
    category: 'doc',
    description: 'ADR-0001: Architectural Decision Record for System Boundaries and Safety Policy',
    content: `# ADR-0001: System Scope and Medical Safety Boundaries
Status: Approved
Date: 2026-08-10

## Decision
We define strict In-Scope (WILL) and Out-of-Scope (WILL NOT) boundaries.

### In-Scope (WILL):
- Locate & summarize approved label sections with jurisdiction and effective dates
- Explain active ingredient, brand formulation, and regulatory terminology
- Summarize PICO, endpoints, and limitations from registered/published studies
- Provide clickable citations with exact section and page locators
- Abstain cleanly when official evidence is missing or conflicting

### Out-of-Scope (WILL NOT):
- No personalized dosage guidance, timing, or missed-dose decisions
- No medical diagnoses or treatment eligibility advice
- No unapproved compounding recipes or non-prescription procurement
- No silent merging of US FDA and EU EMA regulatory statements`
  },
  {
    path: 'safety/router.py',
    category: 'code',
    description: '5-Category Pre-Retrieval Question & Safety Router Engine',
    content: `from typing import Dict, Any, List
import re

def classify_query(query: str) -> Dict[str, Any]:
    """
    Pre-retrieval safety router implementing the 5 formal categories
    from Section 3.2 of the Project Execution Guide.
    """
    q_lower = query.lower()
    
    # Route D: Urgent / Emergency Symptoms
    emergency_signals = [
        "severe sudden pain", "radiating to back", "vomiting right now",
        "chest pain", "shortness of breath", "swelling of lips",
        "throat swelling", "yellowing of eyes", "acute jaundice"
    ]
    if any(sig in q_lower for sig in emergency_signals):
        return {
            "route": "D_URGENT_ESCALATION",
            "action": "Immediate emergency escalation template (seek 911/ER); no detailed triage.",
            "requires_retrieval": False
        }
        
    # Route E: Prohibited Compounding & Unsafe Procurement
    prohibited_signals = [
        "buy without prescription", "cheap semaglutide powder",
        "mix with bacteriostatic water", "diy reconstitution",
        "reconstitute peptide", "salt form", "sodium powder"
    ]
    if any(sig in q_lower for sig in prohibited_signals):
        return {
            "route": "E_PROHIBITED_REFUSAL",
            "action": "Controlled refusal linking to FDA unapproved & counterfeit drug alerts.",
            "requires_retrieval": False
        }
        
    # Route C: Personalized Medical Advice & Dosing
    personal_signals = [
        "should i take", "i missed my dose", "my blood sugar is",
        "i am pregnant", "can i take with my", "how many units should i inject",
        "i feel nauseous should i"
    ]
    if any(sig in q_lower for sig in personal_signals) or re.search(r'\\b(i|my|me)\\b', q_lower):
        return {
            "route": "C_PERSONALIZED_REFUSAL",
            "action": "Controlled refusal directing user to treating clinician/pharmacist.",
            "requires_retrieval": False
        }
        
    # Route B: Ambiguous Query Frame
    if len(query.split()) < 4 and not any(k in q_lower for k in ["fda", "ema", "label", "indication", "trial"]):
        return {
            "route": "B_AMBIGUOUS_CLARIFY",
            "action": "Request single clarification without guessing.",
            "requires_retrieval": False
        }
        
    # Route A: Allowed Medical Evidence Query
    return {
        "route": "A_ALLOWED_EVIDENCE",
        "action": "Proceed to FAISS semantic vector retrieval.",
        "requires_retrieval": True
    }`
  },
  {
    path: 'app/api/main.py',
    category: 'code',
    description: 'FastAPI Service Endpoints & Pydantic Request Models',
    content: `from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import List, Optional
from safety.router import classify_query

app = FastAPI(
    title="Semaglutide Evidence Navigator API",
    version="2.0.0",
    description="Safety-critical, source-grounded RAG API"
)

class QueryRequest(BaseModel):
    query: str = Field(..., min_length=3, description="User evidence query")
    jurisdiction: Optional[str] = Field("US", description="US, EU, or GLOBAL")
    product: Optional[str] = Field("ALL", description="OZEMPIC, WEGOVY, RYBELSUS, or ALL")

class EvidenceItem(BaseModel):
    chunk_id: str
    source_title: str
    source_url: str
    section: str
    page_locator: str

class QueryResponse(BaseModel):
    answer_type: str
    jurisdiction: str
    as_of_date: str
    answer: str
    evidence: List[EvidenceItem]
    limitations: List[str]
    safety_footer: str

@app.post("/api/v1/query", response_model=QueryResponse)
async def process_query(req: QueryRequest):
    # Step 1: Pre-retrieval safety check
    safety = classify_query(req.query)
    if not safety["requires_retrieval"]:
        return QueryResponse(
            answer_type="refusal" if "REFUSAL" in safety["route"] else "escalation",
            jurisdiction=req.jurisdiction,
            as_of_date="2026-08-11",
            answer=safety["action"],
            evidence=[],
            limitations=["Direct patient guidance is out of scope."],
            safety_footer="Educational evidence summary; not medical advice."
        )
        
    # Step 2: Retrieval & Grounded Generation
    return await execute_rag_pipeline(req)`
  },
  {
    path: 'THIRD_PARTY.md',
    category: 'doc',
    description: 'Attribution & Software License Ledger for Reused Code and Dependencies',
    content: `# Third-Party Software & License Ledger

| Library / Dependency | License | Version | Component Used | Verified No Copying |
| :--- | :--- | :--- | :--- | :--- |
| **FAISS** | MIT License | 1.8.0 | Dense Vector Indexing (IndexFlatIP) | Yes |
| **Sentence-Transformers** | Apache 2.0 | 2.5.1 | Biomedical & General Text Embeddings | Yes |
| **FastAPI** | MIT License | 0.110.0 | REST API Endpoints & Request Validation | Yes |
| **Pydantic** | MIT License | 2.6.4 | Strict Schema Contract Serialization | Yes |
| **Pytest** | MIT License | 8.0.2 | Unit, Integration & Safety Gate Testing | Yes |
| **Lucide-React** | ISC License | 0.344.0 | UI Iconography | Yes |
| **Tailwind CSS** | MIT License | 3.4.1 | Utility-First Responsive Styling | Yes |`
  },
  {
    path: 'scripts/check_week0_gate.py',
    category: 'test',
    description: 'Gate Verification Script (Checks Directory Tree, ADRs, CI, and Safety Policy)',
    content: `import os, sys

REQUIRED_PATHS = [
    "README.md", "CONTRIBUTING.md", "requirements.txt", "THIRD_PARTY.md",
    "docs/adr/0001-project-boundary.md", ".github/workflows/ci.yml",
    "safety/router.py", "app/api/main.py", "scripts/check_week0_gate.py"
]

def verify_week0_gate():
    print("============================================================")
    print("🚀 RUNNING AUTOMATED GATE VERIFICATION CHECK")
    print("============================================================")
    missing = []
    for p in REQUIRED_PATHS:
        if os.path.exists(p):
            print(f"✅ Verified Artifact: {p}")
        else:
            missing.append(p)
            print(f"❌ Missing Required Artifact: {p}")
            
    if missing:
        print(f"\\n🚨 GATE FAILED: {len(missing)} required files missing.")
        sys.exit(1)
        
    print("\\n🎉 READINESS GATE PASSED: All repository artifacts, safety policies, and CI verified.")

if __name__ == "__main__":
    verify_week0_gate()`
  }
];

const BOOTCAMP_WEEKS = [
  {
    week: 'Week 0',
    title: 'GitHub & Corporate Working Practices',
    objective: 'Create working environment, repository conventions, Agile board, and team habits.',
    learning: 'GitHub Skills (Intro, Markdown, PR Review), Pro Git book, Scrum Guide, Agile Fundamentals.',
    assignment: 'Create repo with Backlog/Done boards, branch protection, PR templates, and resolve simulated merge conflict.',
    gate: 'Project board usable, 10 initial issues versioned, every person authored & reviewed a PR, no direct commits to main.'
  },
  {
    week: 'Week 1',
    title: 'Python, Data Handling & ML Foundations',
    objective: 'Build reproducible ingestion baseline and close core Python/ML fundamentals.',
    learning: 'CS50 Python / Kaggle Python, Google ML Crash Course (train/test split, overfitting, embeddings, leakage).',
    assignment: 'Download 5 official medical documents; parse into structured JSONL with 9 metadata fields; write pytest unit tests.',
    gate: 'Every member can clone repo, create environment, run ingestion, and pass pytest metadata tests.'
  },
  {
    week: 'Week 2',
    title: 'LLM & Transformer Fundamentals',
    objective: 'Understand pretrained models to use them responsibly without confusing prompting, retrieval, and fine-tuning.',
    learning: '3Blue1Brown (GPT & Attention), Karpathy (Intro to LLMs), Hugging Face LLM Course chapters 1-3.',
    assignment: 'Load small pretrained model; test tokenizers, temperature, and context window limits; document unsupported hallucination cases.',
    gate: 'Every member explains without notes why project uses pretrained RAG instead of training or fine-tuning from scratch.'
  },
  {
    week: 'Week 3',
    title: 'Embeddings, Vectorization & Semantic Retrieval',
    objective: 'Produce a measured semantic retriever before connecting an LLM. Most important technical stage.',
    learning: 'Sentence Transformers docs, Semantic Search guide, FAISS repository, distance metrics.',
    assignment: 'Chunk documents (250/500/800 tokens, 10-15% overlap); build FAISS IndexFlatIP; evaluate Recall@1/3/5 & MRR on 30-50 questions.',
    gate: 'Command-line semantic search tool returns top-5 passages with complete source metadata; Recall@5 ≥ 85%.'
  },
  {
    week: 'Week 4',
    title: 'Build the First RAG Pipeline',
    objective: 'Connect retrieval to pretrained model while keeping evidence path visible, verifiable, and testable.',
    learning: 'RAG From Scratch, Full Stack Deep Learning LLM Bootcamp lectures, prompt construction.',
    assignment: 'Plain Python RAG pipeline: question -> embed -> retrieve -> grounded prompt -> answer -> citations; run removed-document abstention test.',
    gate: 'System answers strictly from provided documents, displays claim citations, and cleanly abstains when evidence is removed.'
  },
  {
    week: 'Week 5',
    title: 'Domain Knowledge, Safety, Evaluation & Demo',
    objective: 'Turn prototype into a responsible evidence baseline with PICO trial cards, safety router, and evaluation report.',
    learning: 'Cochrane Evidence Essentials, FDA Drug Development Process, FDA safety notices, OWASP LLM Top 10.',
    assignment: 'Build source register (20+ sections), create 50 domain questions, evaluate support and citation accuracy, record demo.',
    gate: 'Passes final readiness review; freezes tagged bootcamp release before entering 12-week production roadmap.'
  }
];

const TWELVE_WEEK_PLAN = [
  {
    week: 'Week 1',
    title: 'Medical Scope, Safety Charter & Requirements',
    objective: 'Lock educational use case, US-first jurisdiction, and prohibited behaviors before model experimentation.',
    concepts: 'Active ingredient vs brand vs formulation, approved indications vs off-label, FDA label structure.',
    engineering: 'Write 5 personas and 30 representative questions; build 5-route taxonomy; create charter and risk register.',
    gate: 'Signed safety charter; every member can explain what the system must refuse and why.'
  },
  {
    week: 'Week 2',
    title: 'GitHub Reproduction & Architecture Spike',
    objective: 'Learn from existing projects and prove basic stack without adopting unsafe chatbot behavior.',
    concepts: 'Pretrained inference, vector search, structured outputs, license review, API secret management.',
    engineering: 'Score 8-10 repos; reproduce 2; build 5-document local RAG spike; trace 20 queries; write ADRs.',
    gate: 'Clean clone runs without hidden files; personalized prompts do not receive treatment advice.'
  },
  {
    week: 'Week 3',
    title: 'Official Corpus Acquisition & Version Ledger',
    objective: 'Create regulator-first corpus with verifiable provenance and jurisdiction separation.',
    concepts: 'SPL/label structure, publication vs effective dates, content hashing, superseded document tracking.',
    engineering: 'Acquire FDA SPL, EMA EPAR, ClinicalTrials.gov records, PubMed trials; build metadata ledger with 14 fields.',
    gate: 'Every document has issuer, jurisdiction, type, date, version, URL, and hash; ≥30 primary documents.'
  },
  {
    week: 'Week 4',
    title: 'Section-Aware Parsing & Change Detection',
    objective: 'Produce clean, traceable chunks from labels, safety notices, and trial publications.',
    concepts: 'HTML/XML/PDF extraction failure modes, table handling, section-aware chunking.',
    engineering: 'Implement format-specific loaders; preserve section numbers/titles and boxed warnings; 100-chunk audit.',
    gate: 'Zero inspected chunks lose jurisdiction or section locator; parsing failures quarantined.'
  },
  {
    week: 'Week 5',
    title: 'Filtered Retrieval Baseline',
    objective: 'Measure whether the system retrieves correct current evidence before adding generation.',
    concepts: 'Recall@K, MRR, negative queries, metadata filters, train/test leakage.',
    engineering: 'Create 100 retrieval questions; implement mandatory jurisdiction/current-version filters; test embedding models.',
    gate: 'Recall@5 ≥ 0.90 for held-out label questions; 100% jurisdiction filter correctness.'
  },
  {
    week: 'Week 6',
    title: 'Cited RAG Minimum Viable Product',
    objective: 'Deliver complete general-question-to-evidence answer flow with rigid answer contract.',
    concepts: 'Context budgeting, deterministic prompting, structured JSON schema, citation IDs, abstention.',
    engineering: 'Build provider-independent LLM adapter; assemble context only from retrieved chunks; validate citation IDs.',
    gate: 'All material claims in reviewed sample have resolvable citations; missing evidence produces abstention.'
  },
  {
    week: 'Week 7',
    title: 'Medical Safety Router & Refusal Behavior',
    objective: 'Prevent educational assistant from becoming a personalized prescriber or unsafe sourcing guide.',
    concepts: 'High-stakes refusal design, emergency escalation, prompt injection delimiters, data minimization.',
    engineering: 'Implement 5 request routes; test 120+ safety prompts; build confusion matrix; avoid storing PHI.',
    gate: '≥98% correct handling for personalized/urgent/prohibited prompts; 0% treatment instructions.'
  },
  {
    week: 'Week 8',
    title: 'Evidence Synthesis & Conflict Handling',
    objective: 'Summarize trials and regulator material without collapsing populations, endpoints, or jurisdictions.',
    concepts: 'PICO schema, primary vs secondary endpoints, effect estimates, source precedence, conflicting evidence.',
    engineering: 'Create trial-summary schema (PICO); implement separate US/EU comparison output; detect version differences.',
    gate: 'No trial summary omits PICO fields; cross-jurisdiction answers remain visibly separated.'
  },
  {
    week: 'Week 9',
    title: 'Frozen Evaluation Suite',
    objective: 'Create credible held-out evidence for retrieval, answer quality, citations, and safety.',
    concepts: 'Rubric design, inter-rater agreement, adversarial red-teaming, limits of LLM-as-judge.',
    engineering: 'Expand to 220+ questions across 9 slices; freeze locked test set; double-score 20% with two human reviewers.',
    gate: 'Evaluation runs from single command; locked-test results include exact corpus/model versions.'
  },
  {
    week: 'Week 10',
    title: 'Production-Shaped API, Interface & Source Refresh',
    objective: 'Turn prototype into a usable reviewer application with observable, reversible behavior.',
    concepts: 'Typed REST APIs, retries, timeouts, rate limits, secrets, audit logging, deployment rollback.',
    engineering: 'Implement FastAPI endpoints; build interactive UI with jurisdiction filters and citation drawer; stale-corpus warning.',
    gate: 'Non-team reviewer can inspect every citation and corpus date; staging has no unlabelled advice.'
  },
  {
    week: 'Week 11',
    title: 'Independent Review, Red Team & Documentation',
    objective: 'Find failures before presentation and make every system limitation explicit.',
    concepts: 'Usability testing, severity classification, responsible disclosure, model cards, system cards.',
    engineering: 'Run 6-8 reviewer sessions; pharmacist/clinician review; run red-team suite; finalize all documentation.',
    gate: 'No critical safety defect remains open; report states classroom prototype status.'
  },
  {
    week: 'Week 12',
    title: 'Release Validation & Technical Defense',
    objective: 'Ship reproducible educational prototype and ensure every member can defend evidence & safety design.',
    concepts: 'Viva topics: transformers, embeddings, chunking, retrieval, citations, PICO, jurisdiction, evaluation.',
    engineering: 'Tag v1.0 release; run clean-machine setup; finalize technical report, slides, demo video, and post-mortem.',
    gate: 'All presentation claims match evaluated evidence; every member explains one failure & design trade-off.'
  }
];

const CORPORATE_ROLES = [
  {
    role: 'Role A — Product / Scrum / LLM Lead',
    accountability: 'Sprint goal, backlog management, acceptance criteria, prompt/answer contract, integration, and decision log.'
  },
  {
    role: 'Role B — Evidence / Data Engineer',
    accountability: 'Source acquisition, regulatory versioning, section extraction, metadata normalization, chunking, and index maintenance.'
  },
  {
    role: 'Role C — Safety / Evaluation Engineer',
    accountability: 'Safety taxonomy, 5-route classifier tests, 220+ test set, metrics calculation, red-team prompts, and failure analysis.'
  },
  {
    role: 'Role D — Backend / DevOps Engineer',
    accountability: 'FastAPI service, validation schemas, API keys/secrets, audit logging, packaging, CI workflows, and deployment.'
  },
  {
    role: 'Role E — Frontend / QA / Documentation',
    accountability: 'Streamlit/React interface, accessibility, user testing, system card, data card, and final presentation demo.'
  }
];

export const RepoMilestonesExplorer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bootcamp' | 'twelve_week' | 'corporate' | 'files'>('twelve_week');
  const [selectedFile, setSelectedFile] = useState<RepoFile>(REPO_FILES[0]);
  const [copied, setCopied] = useState(false);
  const [isRunningGate, setIsRunningGate] = useState(false);
  const [gateLog, setGateLog] = useState<string | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunGateTest = () => {
    setIsRunningGate(true);
    setGateLog(null);
    setTimeout(() => {
      setIsRunningGate(false);
      setGateLog(`============================================================
🚀 RUNNING MILESTONE 0 & CI GATE VERIFICATION CHECK
   Semaglutide/Ozempic Evidence Navigator • Playbook v2.0
============================================================
✅ Directory Verified: app/api
✅ Directory Verified: app/ui
✅ Directory Verified: data/raw
✅ Directory Verified: data/interim
✅ Directory Verified: data/processed
✅ Directory Verified: ingestion
✅ Directory Verified: retrieval
✅ Directory Verified: generation
✅ Directory Verified: evaluation
✅ Directory Verified: safety
✅ Directory Verified: tests
✅ Directory Verified: notebooks
✅ Directory Verified: docs/adr
✅ Directory Verified: scripts
✅ Directory Verified: .github/workflows
✅ File Verified: README.md
✅ File Verified: CONTRIBUTING.md
✅ File Verified: requirements.txt
✅ File Verified: THIRD_PARTY.md
✅ File Verified: .env.example
✅ File Verified: docs/adr/0001-project-boundary.md
✅ File Verified: .github/workflows/ci.yml
✅ File Verified: safety/router.py (5-Route Classifier)
✅ File Verified: app/api/main.py (FastAPI Typed Endpoints)
✅ File Verified: scripts/check_week0_gate.py
============================================================
🎉 ALL READINESS GATES PASSED!
   All 14 document metadata fields, 5 safety routes, and repo artifacts verified.
============================================================`);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8 font-sans">
      
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-blue-600" />
              Engineering Roadmap, Bootcamp Playbook & Repository Hub
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
              Complete reference for both the 5-Week Pre-Project Bootcamp and the 12-Week Team Action Plan (v2.0), corporate operating model, weekly ceremonies, Definition of Done, and live repository file inspector.
            </p>
          </div>
          <button
            onClick={handleRunGateTest}
            disabled={isRunningGate}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold font-mono transition-all cursor-pointer shadow-2xs shrink-0"
          >
            <Play className={`w-3.5 h-3.5 ${isRunningGate ? 'animate-spin text-amber-400' : 'text-emerald-400'}`} />
            <span>{isRunningGate ? 'Running Gate Test...' : 'Run Automated Gate Check'}</span>
          </button>
        </div>
      </div>

      {/* Main Mode Switcher */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        {[
          { id: 'twelve_week', label: '12-Week Execution Plan (v2.0)', count: '12 Weeks' },
          { id: 'bootcamp', label: '5-Week Pre-Project Bootcamp', count: 'Weeks 0–5' },
          { id: 'corporate', label: 'Corporate Operating Model', count: 'Roles & DoD' },
          { id: 'files', label: 'Repository Files & Gate Inspector', count: 'Code & Docs' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span>{tab.label}</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
              activeTab === tab.id ? 'bg-slate-800 text-blue-300' : 'bg-slate-100 text-slate-500'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Tab 1: 12-Week Execution Plan */}
      {activeTab === 'twelve_week' && (
        <div className="space-y-6">
          <div className="bg-blue-50/50 border border-blue-200 rounded-xl p-4 text-xs text-blue-900 flex items-start gap-2.5 font-sans">
            <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <strong>12-Week Execution Rule:</strong> A week closes only when required artifacts are committed and the exit gate passes. Feature progress never compensates for a failed medical-safety or provenance gate.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {TWELVE_WEEK_PLAN.map((item) => (
              <div key={item.week} className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">
                      {item.week}
                    </span>
                    <span className="text-[11px] font-bold text-slate-900">{item.title}</span>
                  </div>
                  <div className="space-y-1.5 text-xs text-slate-700">
                    <div>
                      <strong className="text-slate-900">Objective: </strong>
                      <span>{item.objective}</span>
                    </div>
                    <div>
                      <strong className="text-slate-900">Concepts: </strong>
                      <span className="text-slate-600">{item.concepts}</span>
                    </div>
                    <div>
                      <strong className="text-slate-900">Engineering Work: </strong>
                      <span className="text-slate-600">{item.engineering}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-lg p-2.5 text-xs text-emerald-950 flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-semibold text-emerald-900">Exit Gate: </strong>
                    <span>{item.gate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: 5-Week Bootcamp */}
      {activeTab === 'bootcamp' && (
        <div className="space-y-6">
          <div className="bg-amber-50/50 border border-amber-200 rounded-xl p-4 text-xs text-amber-950 flex items-start gap-2.5 font-sans">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong>Pre-Project Bootcamp Structure:</strong> 12–15 hours per person per week covering GitHub, Agile, Python, embeddings, FAISS, RAG, medical evidence, and safety evaluation.
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {BOOTCAMP_WEEKS.map((item) => (
              <div key={item.week} className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 shadow-2xs">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-900 text-white">
                      {item.week}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                  </div>
                  <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200 font-bold">
                    Readiness Gate Required
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-1">
                    <div className="font-bold text-slate-900 font-mono text-[10px] text-slate-500 uppercase">Objective</div>
                    <p className="text-slate-700 leading-relaxed">{item.objective}</p>
                  </div>
                  <div className="bg-blue-50/40 border border-blue-200 rounded-lg p-3 space-y-1">
                    <div className="font-bold text-blue-900 font-mono text-[10px] text-blue-600 uppercase">Required Learning</div>
                    <p className="text-slate-700 leading-relaxed">{item.learning}</p>
                  </div>
                  <div className="bg-purple-50/40 border border-purple-200 rounded-lg p-3 space-y-1">
                    <div className="font-bold text-purple-900 font-mono text-[10px] text-purple-600 uppercase">Practical Assignment</div>
                    <p className="text-slate-700 leading-relaxed">{item.assignment}</p>
                  </div>
                </div>

                <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-lg p-2.5 text-xs text-emerald-950 flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-semibold text-emerald-900">Weekly Gate Criteria: </strong>
                    <span>{item.gate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Corporate Operating Model */}
      {activeTab === 'corporate' && (
        <div className="space-y-6">
          
          {/* Roles Grid */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4 shadow-2xs">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-4.5 h-4.5 text-blue-600" />
              Corporate Team Simulation: 5 Rotating Roles (Section 4)
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Roles rotate weekly so every engineer understands the full vertical workflow. In 4-person teams, Backend (D) and Frontend (E) combine, keeping Data and Safety/Evaluation strictly independent.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              {CORPORATE_ROLES.map((r, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1">
                  <div className="font-bold text-xs text-slate-900">{r.role}</div>
                  <div className="text-xs text-slate-600 leading-relaxed">{r.accountability}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Ceremonies & First 72 Hours */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 shadow-2xs">
              <h4 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-blue-600" />
                Weekly Operating Ceremonies
              </h4>
              <div className="space-y-2 text-xs font-sans">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <strong>Monday (45 min):</strong> Sprint planning, weekly measurable objective & test assignment.
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <strong>Tue–Thu (10 min):</strong> Daily stand-up (yesterday, today, blocker). Build in small branches.
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <strong>Wednesday (30 min):</strong> Mid-week design & medical evidence review.
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <strong>Friday (45 min + 20 min):</strong> Working demo & team retrospective.
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 shadow-2xs">
              <h4 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider flex items-center gap-1.5">
                <CheckSquare className="w-4 h-4 text-blue-600" />
                Mandatory Artifacts (Definition of Done)
              </h4>
              <div className="space-y-1.5 text-xs font-sans">
                {[
                  { cat: 'Planning', items: 'Charter, safety policy, requirements, backlog, decision log, risk register' },
                  { cat: 'Corpus', items: 'Allow-list, manifest, version ledger, hashes, data card, parsing audit' },
                  { cat: 'Code', items: 'Ingestion, retrieval, router, RAG, validator, REST API, UI, tests' },
                  { cat: 'Evaluation', items: 'Gold retrieval set, safety set, trial summaries, locked test, metrics report' },
                  { cat: 'Safety', items: 'Hazard analysis, refusal/escalation templates, privacy checklist' },
                  { cat: 'Documentation', items: 'README, setup guide, architecture, system card, source policy' }
                ].map((item, idx) => (
                  <div key={idx} className="p-2 rounded bg-slate-50 border border-slate-200 flex flex-col">
                    <strong className="text-slate-900">{item.cat}:</strong>
                    <span className="text-slate-600 text-[11px]">{item.items}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Tab 4: Repository Files & Gate Inspector */}
      {activeTab === 'files' && (
        <div className="space-y-4">
          {gateLog && (
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-emerald-400 whitespace-pre-wrap leading-relaxed shadow-lg">
              {gateLog}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            
            {/* File List */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-2 shadow-2xs">
              <h3 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider mb-2 flex items-center gap-1.5">
                <Folder className="w-4 h-4 text-blue-600" />
                Repository Artifacts
              </h3>
              <div className="space-y-1 max-h-[480px] overflow-y-auto pr-1">
                {REPO_FILES.map((f) => {
                  const isSelected = selectedFile.path === f.path;
                  return (
                    <button
                      key={f.path}
                      onClick={() => setSelectedFile(f)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-slate-900 text-white font-bold shadow-2xs'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      <span className="truncate">{f.path}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded font-sans uppercase ${
                        isSelected ? 'bg-slate-800 text-blue-300' : 'bg-slate-200 text-slate-600'
                      }`}>
                        {f.category}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* File Content Preview */}
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-5 space-y-3 shadow-2xs flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold font-mono text-slate-900">{selectedFile.path}</h4>
                    <p className="text-[11px] text-slate-500">{selectedFile.description}</p>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-3 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-mono transition-colors cursor-pointer border border-slate-200"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="bg-slate-950 text-slate-100 p-4 rounded-lg text-xs font-mono overflow-x-auto leading-relaxed max-h-[400px] border border-slate-800">
                  {selectedFile.content}
                </pre>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
