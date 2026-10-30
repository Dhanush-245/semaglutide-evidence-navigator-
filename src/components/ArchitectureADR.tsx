import React, { useState } from 'react';
import {
  Layers,
  CheckCircle2,
  Shield,
  Cpu,
  BookOpen,
  FileCode,
  CheckSquare,
  Award,
  AlertTriangle,
  ArrowRight,
  Database,
  Search,
  Filter,
  Check,
  Scale,
  Lock,
  GitBranch,
  FileText,
  Clock,
  Sparkles,
  ExternalLink,
  ShieldAlert,
  HelpCircle,
  BarChart3
} from 'lucide-react';

export const ArchitectureADR: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'overview' | 'dataflow' | 'adrs' | 'hierarchy' | 'stack' | 'rules'>('overview');

  const nineStepDataFlow = [
    {
      step: 1,
      title: 'Acquisition & Allow-Listing',
      badge: 'Step 1 • Ingestion',
      desc: 'Acquire only allow-listed official source documents (FDA SPL, EMA EPAR, ClinicalTrials.gov, PubMed) and record the retrieval event timestamp.',
      safetyGate: 'Unverified or promotional sources (social media, blogs, unverified SEO articles) are quarantined and excluded from the answer corpus.'
    },
    {
      step: 2,
      title: 'Structured Extraction & Parsing',
      badge: 'Step 2 • Parsing',
      desc: 'Extract structured label/article sections; preserve headings, dose tables, boxed warnings, page/section locators, and reference indices.',
      safetyGate: 'Quarantine empty or malformed extracts; zero inspected chunks may lose section locators.'
    },
    {
      step: 3,
      title: 'Metadata Normalization & Versioning',
      badge: 'Step 3 • Version Ledger',
      desc: 'Normalize metadata (14 required schema fields), calculate SHA-256 hashes, detect new vs superseded versions, and track effective dates.',
      safetyGate: 'Superseded versions (e.g. 2021 Ozempic label) remain archived for historical provenance but are locked out of current-answer retrieval.'
    },
    {
      step: 4,
      title: 'Section-Aware Chunking & Vectors',
      badge: 'Step 4 • Vectorization',
      desc: 'Create section-aware chunks (250–500 tokens with 10–15% overlap) and embed via biomedical/general embedding models; maintain separate US, EU, trial, and literature indices.',
      safetyGate: 'Every chunk retains immutable parent document ID, stable chunk ID, section title, page locator, issuer, and jurisdiction tag.'
    },
    {
      step: 5,
      title: '5-Category Safety Request Router',
      badge: 'Step 5 • Pre-Retrieval Router',
      desc: 'Classify user prompt BEFORE retrieval: Route A (Allowed Evidence), Route B (Ambiguous), Route C (Personalized Medical), Route D (Urgent/Emergency), or Route E (Prohibited).',
      safetyGate: 'Personalized dosing, acute emergencies, and illicit compounding bypass retrieval immediately with controlled deterministic responses.'
    },
    {
      step: 6,
      title: 'Filtered Semantic Retrieval & Reranking',
      badge: 'Step 6 • FAISS Search',
      desc: 'For allowed queries, retrieve top-k passages from FAISS IndexFlatIP using mandatory jurisdiction/product metadata filters and minimum similarity thresholds.',
      safetyGate: 'If active corpus has no matching chunks or documents are toggled off, system returns structured INSUFFICIENT_EVIDENCE abstention.'
    },
    {
      step: 7,
      title: 'Constrained Grounded Synthesis',
      badge: 'Step 7 • Pretrained LLM',
      desc: 'Construct a strict grounded prompt containing ONLY retrieved chunks. Generate answer type, jurisdiction, as-of date, concise synthesis, and chunk-linked citation IDs.',
      safetyGate: 'LLM acts strictly as a contextual interpreter. Parametric memory generation is forbidden.'
    },
    {
      step: 8,
      title: 'Post-Generation Citation Entailment',
      badge: 'Step 8 • Citation Validator',
      desc: 'Validate every generated citation ID against retrieved chunk IDs. Verify semantic entailment between claims and cited source text.',
      safetyGate: 'Block output and fail safe if citation ID is missing, unresolved, or claims hallucinate beyond the cited passage.'
    },
    {
      step: 9,
      title: 'Audit Logging & Observability',
      badge: 'Step 9 • Telemetry & Privacy',
      desc: 'Log safety route, source IDs, model version, latency, and feedback without retaining unnecessary personal health information (PHI).',
      safetyGate: 'Strict data minimization: No free-text personal health information is persisted in operational logs.'
    }
  ];

  const adrs = [
    {
      id: 'ADR-0001',
      title: 'Project Boundary & Educational Research Scope',
      status: 'APPROVED',
      date: '2026-08-10',
      context: 'Users may seek direct medical advice, diagnostic triage, individualized dosing, or illicit compounding instructions from healthcare AI.',
      decision: 'The system is strictly an educational research assistant for pharmacy, biomedical, and ML learners. It retrieves and summarizes regulator-approved labeling and clinical evidence. It does NOT diagnose, prescribe, personalize doses, or support self-medication.',
      consequences: 'Enforces mandatory disclaimers, pre-retrieval safety routing, and classroom/reviewer-only release condition without clinician sign-off.'
    },
    {
      id: 'ADR-0002',
      title: 'Evidence Before Generation & Strict Closed-Corpus Principle',
      status: 'APPROVED',
      date: '2026-08-10',
      context: 'Pretrained foundation models suffer from parametric hallucination and outdated training cutoffs when answering drug questions.',
      decision: 'Zero open-web generation at runtime. Answers MUST originate entirely from allow-listed, pre-indexed documents in the local vector store. The model receives only retrieved passages in its context window.',
      consequences: 'Eliminates ungrounded generative hallucinations; all factual claims are auditable to official source records.'
    },
    {
      id: 'ADR-0003',
      title: 'System Abstention on Missing or Sub-Threshold Evidence',
      status: 'APPROVED',
      date: '2026-08-11',
      context: 'Conventional chatbots guess or hallucinate answers when queried on topics outside their retrieval corpus.',
      decision: 'When retrieved vector similarity falls below the relevance threshold (0.65) or when required source documents are absent/disabled, the system MUST return a structured INSUFFICIENT_EVIDENCE abstention rather than guessing.',
      consequences: 'Guarantees truthful boundaries; evaluated rigorously in the benchmark suite via document-toggling tests.'
    },
    {
      id: 'ADR-0004',
      title: 'Strict Jurisdiction and Version Ledger Isolation',
      status: 'APPROVED',
      date: '2026-08-11',
      context: 'US FDA labels and EU EMA SmPCs differ significantly in approved indications, retinopathy warnings, pregnancy washout rules, and max doses.',
      decision: 'Jurisdiction (US vs EU vs Global) and version status (Current vs Superseded) are first-class immutable metadata attributes. System defaults to US FDA, requires explicit EU tags, and never merges cross-jurisdiction claims into an unlabeled answer.',
      consequences: 'Prevents silent cross-border regulatory confusion; superseding label updates archive older versions automatically.'
    },
    {
      id: 'ADR-0005',
      title: 'Deterministic 5-Route Pre-Retrieval Safety Classifier',
      status: 'APPROVED',
      date: '2026-08-12',
      context: 'High-risk queries (acute pancreatitis symptoms, pregnancy advice, missed dose questions, compounding) require immediate standard responses.',
      decision: 'Implement a 5-route classifier (A: Allowed Evidence, B: Ambiguous, C: Personalized Refusal, D: Urgent Escalation, E: Prohibited) that evaluates the prompt BEFORE any vector retrieval or LLM execution.',
      consequences: 'Ensures zero-latency emergency escalation (Category D) and controlled clinical referral (Category C) with ≥98% test accuracy target.'
    },
    {
      id: 'ADR-0006',
      title: 'Claim-Level Citation Entailment & Programmatic Validation',
      status: 'APPROVED',
      date: '2026-08-12',
      context: 'LLMs can generate plausible-looking citation tags that point to non-existent sections or do not support the claim.',
      decision: 'Every material claim must include a machine-verifiable citation ID (e.g. [FDA-OZE-2024-SEC5.1]). A post-generation citation validator checks that the ID exists in retrieved context and entails the claim text.',
      consequences: 'Output is blocked or flagged if unverified citations are detected; target ≥95% claim support in human evaluation.'
    },
    {
      id: 'ADR-0007',
      title: 'Standard Answer Contract Schema (JSON/Structured)',
      status: 'APPROVED',
      date: '2026-08-13',
      context: 'Inconsistent unstructured LLM outputs make downstream validation and UI citation mapping brittle.',
      decision: 'All responses adhere to a rigid answer contract containing: answer_type, jurisdiction, as_of_date, answer, evidence array (chunk_id, source_title, section, url), limitations list, and safety_footer.',
      consequences: 'Enables clean UI rendering of clickable citation badges, jurisdiction chips, and source provenance drawer.'
    },
    {
      id: 'ADR-0008',
      title: 'Evaluation Blueprint with 220+ Test Bench & Human Review',
      status: 'APPROVED',
      date: '2026-08-14',
      context: 'Automated LLM-as-judge metrics are insufficient for medical safety validation and can mask critical errors.',
      decision: 'Adopt a frozen 220+ question test suite spanning 9 distinct slices, measuring 10 formal metrics (Recall@1/3/5, MRR, claim support, safety accuracy). Require 20% double-scoring by human reviewers.',
      consequences: 'Provides objective proof of readiness; failure taxonomy is published openly rather than masked by aggregate scores.'
    }
  ];

  const sourceHierarchy = [
    {
      tier: 'Tier 1: Regulator Labeling & Safety Communications',
      examples: 'FDA Prescribing Information (SPL), Drugs@FDA, FDA Safety Notices, EMA EPAR / Summary of Product Characteristics (SmPC)',
      permittedUse: 'Authoritative ground truth for jurisdiction-specific approved indications, boxed warnings, contraindications, and dosing schedules.',
      color: 'border-blue-300 bg-blue-50/40 text-blue-900'
    },
    {
      tier: 'Tier 2: Trial Registry Records & Guideline Syntheses',
      examples: 'ClinicalTrials.gov (NCT records, primary/secondary endpoints, status), ADA Standards of Care 2024',
      permittedUse: 'Protocol details, study design, prespecified endpoints, sample sizes, and recognized clinical practice guideline context.',
      color: 'border-emerald-300 bg-emerald-50/40 text-emerald-900'
    },
    {
      tier: 'Tier 3: Peer-Reviewed Primary Randomized Controlled Trials',
      examples: 'PubMed-indexed primary trial publications (SUSTAIN-6, STEP-1, SELECT, FLOW, PIONEER-6 in NEJM / Lancet)',
      permittedUse: 'Trial results, hazard ratios (HR), relative risk reductions, 95% confidence intervals, and documented study limitations.',
      color: 'border-purple-300 bg-purple-50/40 text-purple-900'
    },
    {
      tier: 'Tier 4: Government Reviews & Systematic Analyses',
      examples: 'Cochrane Systematic Reviews, NIH/NCBI monographs, government evidence syntheses',
      permittedUse: 'Secondary synthesis and historical context; NEVER used to overwrite current regulator approved labeling.',
      color: 'border-amber-300 bg-amber-50/40 text-amber-900'
    },
    {
      tier: 'EXCLUDED: Unverified, Social & Commercial Sources',
      examples: 'Social media posts (Reddit, TikTok), personal blogs, Quora, vendor promo, unverified SEO articles',
      permittedUse: 'STRICTLY EXCLUDED from the answer corpus. May only be used for discovery of potential user misconception topics during testing.',
      color: 'border-rose-300 bg-rose-50/40 text-rose-900'
    }
  ];

  const finalDecisionRules = [
    {
      rule: '1. Medical Safety Outranks Feature Volume',
      desc: 'Medical safety, provenance integrity, and evaluation rigor strictly outrank feature count. If a release gate fails, repair the gate before adding new features.'
    },
    {
      rule: '2. Brand vs Active Ingredient Separation',
      desc: 'Ozempic, Wegovy, and Rybelsus are distinct brand products with different indications, formulations, and doses. They must NEVER be treated as interchangeable.'
    },
    {
      rule: '3. Data & Retrieval First, Not Prompt Hacking',
      desc: 'Fix corpus extraction, chunking, and semantic retrieval before repeatedly altering LLM prompts. A clean retrieval context is the best anti-hallucination defense.'
    },
    {
      rule: '4. Regulatory Labels Are Ultimate Ground Truth',
      desc: 'The current approved regulator label outranks older literature, observational studies, or trial hypotheses for approved indications and safety warnings in that jurisdiction.'
    },
    {
      rule: '5. Disciplined MVP Scope Boundaries',
      desc: 'Agents, voice synthesis, autonomous web scraping, and LLM fine-tuning are optional future research—NOT MVP requirements. Keep the core RAG pipeline simple, verifiable, and transparent.'
    },
    {
      rule: '6. Graceful Schedule De-Scoping Priority',
      desc: 'If implementation schedules slip, drop optional features (e.g. secondary rerankers); NEVER compromise citations, version isolation, safety tests, or documentation.'
    },
    {
      rule: '7. Mandatory Demonstration Failure Modes',
      desc: 'Every valid system demonstration must prove 5 distinct behaviors: (1) Correct grounded answer with citations, (2) Clean abstention on missing data, (3) Personalized advice refusal, (4) Urgent medical escalation, and (5) Acknowledged limitation.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8 font-sans">
      
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-600" />
              System Architecture, ADRs & Medical Evidence Policy
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
              Complete engineering design blueprints, 9-step data flow pipeline, Architectural Decision Records (ADRs), 4-tier source hierarchy, and the 7 final medical decision rules from the Project Execution Guide (v2.0).
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 font-bold">
              Specification: v2.0 Released
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        {[
          { id: 'overview', label: 'Architecture Overview' },
          { id: 'dataflow', label: '9-Step End-to-End Data Flow' },
          { id: 'adrs', label: 'Architectural Decision Records (ADRs)' },
          { id: 'hierarchy', label: '4-Tier Source Policy' },
          { id: 'stack', label: 'Baseline Stack & Schema' },
          { id: 'rules', label: '7 Final Decision Rules' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id as any)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeSection === tab.id
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Section 1: Overview */}
      {activeSection === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-2 shadow-2xs">
              <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                <Shield className="w-4.5 h-4.5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">1. Evidence Grounded</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Zero parametric hallucination. Answers are synthesized exclusively from official FDA prescribing labels, EMA SmPCs, and registered clinical trials.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-2 shadow-2xs">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                <Scale className="w-4.5 h-4.5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">2. Strict Jurisdiction Isolation</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                US FDA and European EMA approvals, warnings, and indications are kept strictly segregated. Cross-jurisdiction claims are never merged into unlabeled text.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-2 shadow-2xs">
              <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                <ShieldAlert className="w-4.5 h-4.5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">3. 5-Route Pre-Retrieval Safety</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Emergency symptoms (pancreatitis, anaphylaxis), personalized dosing requests, and unapproved compounding recipes are intercepted before vector retrieval.
              </p>
            </div>
          </div>

          {/* System Pipeline Summary Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-2xs">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Cpu className="w-4.5 h-4.5 text-blue-600" />
              System Architecture Topology
            </h3>
            <div className="bg-slate-900 text-slate-100 rounded-xl p-4 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
              <div className="text-blue-400 font-bold mb-2"># End-to-End Pipeline Representation</div>
              <div>User Query ──────► [ 5-Category Request Router ]</div>
              <div className="pl-24">│</div>
              <div className="pl-24">├─► [Route D: Emergency / Acute Symptoms] ──► Immediate Escalation Notice (No RAG)</div>
              <div className="pl-24">├─► [Route C: Personalized Dose / Advice] ──► Controlled Refusal + Doctor Referral</div>
              <div className="pl-24">├─► [Route E: Illicit Compounding / Sourcing] ──► FDA Safety Alert & Prohibited Notice</div>
              <div className="pl-24">├─► [Route B: Ambiguous Query Frame] ──────► Single Clarification Request</div>
              <div className="pl-24">│</div>
              <div className="pl-24">└─► [Route A: Allowed Medical Evidence Query]</div>
              <div className="pl-36">│</div>
              <div className="pl-36">▼</div>
              <div className="pl-30">[ FAISS Vector Store IndexFlatIP ] (Metadata Filter: Jurisdiction + Product)</div>
              <div className="pl-36">│</div>
              <div className="pl-36">▼</div>
              <div className="pl-26">[ Relevant Chunks Retrieved (Top-k) ] ── (If None / Low Score ──► Abstain)</div>
              <div className="pl-36">│</div>
              <div className="pl-36">▼</div>
              <div className="pl-26">[ Grounded Prompt Assembly ] ──► [ Pretrained LLM Adapter (Gemini 3.6 Flash) ]</div>
              <div className="pl-36">│</div>
              <div className="pl-36">▼</div>
              <div className="pl-26">[ Post-Gen Citation Validator ] ──► [ Standard Answer Contract JSON ]</div>
            </div>
          </div>
        </div>
      )}

      {/* Section 2: 9-Step Data Flow */}
      {activeSection === 'dataflow' && (
        <div className="space-y-4">
          <div className="bg-blue-50/50 border border-blue-200 rounded-xl p-4 text-xs text-blue-900 flex items-start gap-2.5 font-sans">
            <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <p>
              <strong>Section 3.1 Data Flow Protocol:</strong> Every query passes through an auditable, deterministic sequence with explicit verification gates at each step.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3.5">
            {nineStepDataFlow.map((step) => (
              <div key={step.step} className="bg-white border border-slate-200 rounded-xl p-5 space-y-2.5 shadow-2xs hover:border-slate-300 transition-all">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-mono text-xs flex items-center justify-center font-bold">
                      {step.step}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">{step.title}</h4>
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                    {step.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-sans">{step.desc}</p>
                <div className="bg-amber-50/60 border border-amber-200/80 rounded-lg p-2.5 flex items-start gap-2 text-xs text-amber-950 font-sans">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-semibold text-amber-900">Safety & Integrity Gate: </strong>
                    <span>{step.safetyGate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Section 3: ADRs */}
      {activeSection === 'adrs' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {adrs.map((adr) => (
              <div key={adr.id} className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 shadow-2xs">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-blue-50 border border-blue-200 text-blue-800">
                      {adr.id}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">{adr.title}</h4>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                      {adr.status}
                    </span>
                    <span>Date: {adr.date}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-1">
                    <div className="font-bold text-slate-900 uppercase font-mono text-[10px] text-slate-500">Context</div>
                    <p className="text-slate-700 leading-relaxed">{adr.context}</p>
                  </div>
                  <div className="bg-blue-50/40 border border-blue-200 rounded-lg p-3 space-y-1">
                    <div className="font-bold text-blue-900 uppercase font-mono text-[10px] text-blue-600">Decision</div>
                    <p className="text-slate-800 leading-relaxed">{adr.decision}</p>
                  </div>
                  <div className="bg-emerald-50/40 border border-emerald-200 rounded-lg p-3 space-y-1">
                    <div className="font-bold text-emerald-900 uppercase font-mono text-[10px] text-emerald-600">Consequence</div>
                    <p className="text-slate-800 leading-relaxed">{adr.consequences}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Section 4: Source Hierarchy */}
      {activeSection === 'hierarchy' && (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4 shadow-2xs">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Database className="w-4.5 h-4.5 text-blue-600" />
              Official Source Policy & Evidence Hierarchy (Section 2.1)
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              To prevent medical misinformation, evidence sources are strictly tiered. Regulator-approved labeling is the sole authority for approved indications and boxed warnings.
            </p>

            <div className="grid grid-cols-1 gap-3 pt-2">
              {sourceHierarchy.map((item, idx) => (
                <div key={idx} className={`border rounded-xl p-4 space-y-2 ${item.color}`}>
                  <div className="flex items-center justify-between font-bold text-xs">
                    <span>{item.tier}</span>
                  </div>
                  <div className="text-xs space-y-1 font-sans">
                    <div>
                      <strong className="font-semibold">Examples: </strong>
                      <span className="font-mono text-[11px]">{item.examples}</span>
                    </div>
                    <div>
                      <strong className="font-semibold">Permitted Evidentiary Role: </strong>
                      <span>{item.permittedUse}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Section 5: Stack & Schema */}
      {activeSection === 'stack' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Tech Stack Table */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 shadow-2xs">
              <h4 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-blue-600" />
                Baseline Technical Stack (Table 3.4)
              </h4>
              <div className="divide-y divide-slate-100 text-xs font-sans">
                {[
                  { layer: 'Language', baseline: 'Python 3.11+ / Node.js TypeScript', reason: 'One unified type-safe environment across ingestion, RAG, API & evaluation' },
                  { layer: 'Pretrained LLM', baseline: 'Gemini 3.6 Flash / Adapter', reason: 'No pretraining; stable deterministic zero-temperature settings' },
                  { layer: 'Embeddings', baseline: 'Biomedical + General Embeddings', reason: 'Evaluated on held-out medical retrieval benchmarks' },
                  { layer: 'Vector Store', baseline: 'FAISS IndexFlatIP Dense Index', reason: 'Sub-millisecond cosine similarity with mandatory metadata filters' },
                  { layer: 'Backend Service', baseline: 'Express / FastAPI + Pydantic', reason: 'Typed safety routing contract and structured JSON schema validation' },
                  { layer: 'Frontend UI', baseline: 'React 18 + Tailwind CSS', reason: 'High-density evidence drawer, citation inspector, and theme switcher' },
                  { layer: 'Evaluation', baseline: 'pytest + Versioned JSONL Test Sets', reason: 'Isolated testing for retrieval, answer support, and safety rules' }
                ].map((row, idx) => (
                  <div key={idx} className="py-2.5 flex flex-col space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{row.layer}</span>
                      <span className="font-mono text-[11px] bg-slate-100 text-slate-800 px-2 py-0.5 rounded border border-slate-200">{row.baseline}</span>
                    </div>
                    <span className="text-slate-500 text-[11px]">{row.reason}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Answer Contract Schema */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 shadow-2xs">
              <h4 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider flex items-center gap-1.5">
                <FileCode className="w-4 h-4 text-blue-600" />
                Standard Answer Contract (Section 3.3)
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                All generated responses adhere to this exact JSON schema contract before client-side rendering:
              </p>
              <pre className="bg-slate-950 text-slate-100 p-3.5 rounded-lg text-[11px] font-mono overflow-x-auto leading-relaxed border border-slate-800">
{`{
  "answer_type": "label_fact | safety_notice | trial_summary | refusal | clarification",
  "jurisdiction": "US | EU | GLOBAL",
  "as_of_date": "2026-08-11",
  "answer": "Concise factual synthesis with claim-linked citation tags...",
  "evidence": [
    {
      "chunk_id": "FDA-OZE-2024-SEC5.1-C1",
      "source_title": "FDA Ozempic Prescribing Information",
      "source_url": "https://nctr-crs.fda.gov/...",
      "section": "Section 5.1: Risk of Thyroid C-Cell Tumors",
      "page_locator": "Page 4"
    }
  ],
  "limitations": [
    "Evidence applies strictly to adult patients with T2D.",
    "US FDA labeling does not reflect EU EMA pediatric rules."
  ],
  "safety_footer": "Educational evidence summary; not personalized medical advice."
}`}
              </pre>
            </div>

          </div>
        </div>
      )}

      {/* Section 6: 7 Decision Rules */}
      {activeSection === 'rules' && (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4 shadow-2xs">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <CheckSquare className="w-4.5 h-4.5 text-blue-600" />
              The 7 Final Decision Rules (Section 11)
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              These principles govern all architectural choices, engineering trade-offs, and release readiness reviews throughout the project lifecycle:
            </p>

            <div className="grid grid-cols-1 gap-3 pt-2">
              {finalDecisionRules.map((rule, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-1 hover:border-slate-300 transition-all">
                  <h4 className="text-xs font-bold text-slate-900 font-sans">{rule.rule}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">{rule.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
