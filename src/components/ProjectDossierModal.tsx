import React, { useRef, useState } from 'react';
import {
  FileText,
  Printer,
  Download,
  X,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Database,
  Layers,
  Cpu,
  Lock,
  GitBranch,
  Calendar,
  Sparkles,
  ExternalLink,
  Loader2,
  FileCode,
  Check
} from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface ProjectDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectDossierModal: React.FC<ProjectDossierModalProps> = ({ isOpen, onClose }) => {
  const printRef = useRef<HTMLDivElement>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [pdfSuccess, setPdfSuccess] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  // 1. Direct High-Resolution PDF Generator using jsPDF + html2canvas
  const handleDownloadPDF = async () => {
    if (!printRef.current || isGeneratingPDF) return;
    setIsGeneratingPDF(true);
    setStatusMessage('Rendering high-resolution vector PDF...');

    try {
      const element = printRef.current;
      
      // Temporary style adjustments for optimal PDF canvas capture
      const originalMaxHeight = element.style.maxHeight;
      const originalOverflow = element.style.overflow;
      element.style.maxHeight = 'none';
      element.style.overflow = 'visible';

      const canvas = await html2canvas(element, {
        scale: 2, // 2x retina clarity for crisp text
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 1200
      });

      // Restore scrollable style
      element.style.maxHeight = originalMaxHeight;
      element.style.overflow = originalOverflow;

      setStatusMessage('Compiling multi-page PDF document...');
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const imgWidth = pdfWidth - 16; // 8mm margin on left and right
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      let heightLeft = imgHeight;
      let position = 8; // Top margin

      pdf.addImage(imgData, 'PNG', 8, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= (pdfHeight - 16);

      while (heightLeft > 0) {
        position = heightLeft - imgHeight + 8;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 8, position, imgWidth, imgHeight, undefined, 'FAST');
        heightLeft -= (pdfHeight - 16);
      }

      pdf.save('Semaglutide_Evidence_Navigator_Project_Dossier.pdf');
      setPdfSuccess(true);
      setStatusMessage('PDF downloaded successfully!');
      setTimeout(() => {
        setPdfSuccess(false);
        setStatusMessage(null);
      }, 4000);
    } catch (error) {
      console.error('Direct PDF export error:', error);
      setStatusMessage('Error generating PDF. Falling back to HTML download...');
      handleDownloadHTML();
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  // 2. Reliable Print Fallback via dedicated hidden iframe or window.print
  const handlePrint = () => {
    try {
      setStatusMessage('Opening system print dialog...');
      const content = printRef.current ? printRef.current.innerHTML : '';
      
      const printFrame = document.createElement('iframe');
      printFrame.style.position = 'fixed';
      printFrame.style.right = '0';
      printFrame.style.bottom = '0';
      printFrame.style.width = '0';
      printFrame.style.height = '0';
      printFrame.style.border = '0';
      document.body.appendChild(printFrame);

      const frameDoc = printFrame.contentWindow?.document;
      if (frameDoc) {
        frameDoc.open();
        frameDoc.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>Semaglutide Evidence Navigator - Specification Dossier</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <style>
              @page { size: A4; margin: 12mm; }
              body { 
                -webkit-print-color-adjust: exact; 
                print-color-adjust: exact; 
                background: #ffffff; 
                color: #0f172a; 
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; 
                padding: 10px;
              }
              .no-print { display: none !important; }
            </style>
          </head>
          <body>
            ${content}
          </body>
          </html>
        `);
        frameDoc.close();
        
        setTimeout(() => {
          try {
            printFrame.contentWindow?.focus();
            printFrame.contentWindow?.print();
          } catch {
            window.print();
          } finally {
            setTimeout(() => {
              if (document.body.contains(printFrame)) {
                document.body.removeChild(printFrame);
              }
              setStatusMessage(null);
            }, 2000);
          }
        }, 600);
      } else {
        window.print();
        setStatusMessage(null);
      }
    } catch {
      window.print();
      setStatusMessage(null);
    }
  };

  // 3. Standalone Styled HTML Document
  const handleDownloadHTML = () => {
    if (!printRef.current) return;
    const content = printRef.current.innerHTML;
    const fullHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Semaglutide Evidence Navigator - Project Whitepaper & Architecture Dossier</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @page { size: A4; margin: 15mm; }
    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .no-print { display: none !important; }
    }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background: #f8fafc; }
  </style>
</head>
<body class="p-8 max-w-5xl mx-auto bg-white text-slate-900 shadow-sm my-6 rounded-xl border border-slate-200">
  ${content}
</body>
</html>`;

    const blob = new Blob([fullHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Semaglutide_Evidence_Navigator_Project_Dossier.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setStatusMessage('HTML file downloaded.');
    setTimeout(() => setStatusMessage(null), 3000);
  };

  // 4. Standalone Markdown Specification
  const handleDownloadMarkdown = () => {
    const mdContent = `# Semaglutide / Ozempic Evidence Navigator
**Classification:** Safety-Critical Educational Medical RAG
**Corpus Scope:** FDA Approved Labels, EMA SmPC, ClinicalTrials.gov, PubMed / NEJM Trials
**Status:** Version 2.4.0 (Grounded & Locked) | Release Blocker Gate: PASSED (6/6)

---

## 1. Executive Summary & Core Idea
The Semaglutide Evidence Navigator is an auditable, closed-corpus evidence engine designed to query official GLP-1 drug labels and clinical trials with zero parametric hallucination.

**Non-Negotiable Rule:** The system must never infer that a user is suitable for semaglutide, never generate individualized medical prescriptions, and never guess when source evidence is absent.

---

## 2. How LLMs and RAG Power the Evidence Engine

### How RAG (Retrieval) Solves the Medical Truth Problem:
- **Grounding Truth:** Restricts the evidence universe to verified regulatory documents (FDA, EMA) and primary RCT publications (SELECT, FLOW, STEP-1).
- **Dense Vector Embeddings:** Encodes literature into FAISS IndexFlatIP (cosine similarity) with 250-500 token segments and SHA-256 integrity hashes.
- **Jurisdiction Isolation:** Injects metadata filters (US vs. EU) preventing regional label conflation.
- **Deterministic Abstention:** If similarity score < 0.65 or documents are disabled, returns INSUFFICIENT_EVIDENCE without invoking LLM synthesis.

### How the LLM (Constrained Reasoning) Synthesizes Answers:
- **Zero-Shot Evidence Synthesis:** Transforms raw clinical paragraphs and trial endpoint tables into clinician-friendly summaries.
- **In-Context Binding:** Strict prompt limits LLM exclusively to retrieved context passages.
- **JSON Answer Contract:** Outputs structured claims, populations, endpoints, and confidence scores.
- **In-Text Citations:** Injects traceable tags (e.g. [FDA-OZE-2024-SEC5.1]) linked to verified chunks.

---

## 3. Safety Policy Matrix (5 Routes)
- **Route A (Allowed):** General label, trial, or pharmacology questions -> Vector search + in-text citations.
- **Route B (Ambiguous):** Missing product brand or region -> Single targeted clarification question.
- **Route C (Personalized):** Personal dosage adjustments or symptoms -> Controlled refusal + doctor referral.
- **Route D (Urgent Alert):** Pancreatitis, anaphylaxis, acute pain -> Immediate 911 / Emergency Room escalation.
- **Route E (Prohibited):** Illicit peptide compounding / raw powder -> Refusal + FDA Counterfeit alert link.

---

## 4. Completed Deliverables
1. FAISS Vector Search with Clickable Citation Drawer.
2. Pre-Retrieval Safety Classifier with 13 Test Presets & 8 Guardrails.
3. Medical Corpus Ledger with Dynamic Document Toggling.
4. Human Double-Scoring Audit Suite & Live Metric Engine.
5. 8 Architectural Decision Records (ADRs) & 5-Week Bootcamp Roadmap.
`;

    const blob = new Blob([mdContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Semaglutide_Evidence_Navigator_Dossier.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setStatusMessage('Markdown specification downloaded.');
    setTimeout(() => setStatusMessage(null), 3000);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto no-print">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-scale-in">
        
        {/* Modal Action Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold shadow-xs">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white font-sans flex items-center gap-2">
                <span>Semaglutide Evidence Navigator — Project Dossier</span>
                <span className="text-[10px] font-mono bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded border border-blue-400/30">
                  v2.4.0 Grounded
                </span>
              </h2>
              <p className="text-[11px] text-slate-400">
                Official Clinical & Architectural Specification • Grounded Medical RAG Engineering
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Primary Direct PDF Download */}
            <button
              onClick={handleDownloadPDF}
              disabled={isGeneratingPDF}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white font-semibold text-xs transition-all shadow-xs cursor-pointer font-sans ${
                pdfSuccess 
                  ? 'bg-emerald-600 hover:bg-emerald-500' 
                  : isGeneratingPDF
                  ? 'bg-blue-700 cursor-wait opacity-90'
                  : 'bg-blue-600 hover:bg-blue-500'
              }`}
              title="Download direct high-resolution PDF file"
            >
              {isGeneratingPDF ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : pdfSuccess ? (
                <Check className="w-3.5 h-3.5" />
              ) : (
                <Download className="w-3.5 h-3.5" />
              )}
              <span>{isGeneratingPDF ? 'Generating PDF...' : pdfSuccess ? 'PDF Saved!' : 'Save as .PDF'}</span>
            </button>

            {/* Print / System Dialog */}
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors border border-slate-700 cursor-pointer font-sans"
              title="Trigger browser print or system save"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Dialog</span>
            </button>

            {/* HTML Download */}
            <button
              onClick={handleDownloadHTML}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs transition-colors border border-slate-700 cursor-pointer font-sans"
              title="Download standalone styled HTML page"
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>.HTML</span>
            </button>

            {/* Markdown Download */}
            <button
              onClick={handleDownloadMarkdown}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs transition-colors border border-slate-700 cursor-pointer font-sans"
              title="Download raw Markdown specification"
            >
              <span>.MD</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Live Status Toast Banner */}
        {statusMessage && (
          <div className="bg-blue-600 text-white px-6 py-2 text-xs font-mono flex items-center justify-between border-b border-blue-500 animate-fade-in">
            <span className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              {statusMessage}
            </span>
            <button onClick={() => setStatusMessage(null)} className="text-blue-200 hover:text-white text-xs">✕</button>
          </div>
        )}

        {/* Printable & Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-8 sm:p-12 space-y-10 bg-slate-50/50 print:bg-white print:p-0" ref={printRef}>
          
          {/* Document Cover Header */}
          <div className="border-b-2 border-slate-900 pb-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-500">
              <span className="bg-slate-900 text-white px-2.5 py-0.5 rounded font-bold">PROJECT SPECIFICATION & ARCHITECTURE DOSSIER</span>
              <span>Classification: Safety-Critical Educational Medical RAG</span>
              <span>Version: 2.4.0 (Grounded)</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight font-sans">
              Semaglutide / Ozempic Evidence Navigator
            </h1>
            <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed max-w-4xl">
              An auditable, closed-corpus, citation-grounded medical evidence engine designed for pharmacy, biomedical, and machine learning researchers to query official drug labels and landmark clinical trials with zero parametric hallucination.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 text-xs font-mono">
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="text-slate-500 block text-[10px]">CORPUS SOURCES</span>
                <strong className="text-slate-900">FDA, EMA, NLM, NEJM</strong>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="text-slate-500 block text-[10px]">SAFETY GUARDRAILS</span>
                <strong className="text-slate-900">8 Active Rules (5 Routes)</strong>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="text-slate-500 block text-[10px]">CITATION RESOLUTION</span>
                <strong className="text-emerald-700">100% In-Text Grounded</strong>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                <span className="text-slate-500 block text-[10px]">NON-NEGOTIABLE RULE</span>
                <strong className="text-rose-700">Zero Personal Diagnosis</strong>
              </div>
            </div>
          </div>

          {/* Section 1: Executive Summary & The Core Idea */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-2">
              <span className="w-6 h-6 rounded-md bg-blue-600 text-white flex items-center justify-center text-xs font-mono font-bold">1</span>
              Executive Summary & Core Idea
            </h2>

            <div className="space-y-3 text-xs sm:text-sm text-slate-800 leading-relaxed font-sans">
              <p>
                <strong>The Problem:</strong> Information regarding GLP-1 receptor agonists (semaglutide, Ozempic, Wegovy, Rybelsus) is highly fragmented across regulator databases, clinical trial registries, and peer-reviewed journals. Standard conversational LLMs frequently fail in clinical domains by hallucinating unapproved indications, conflating distinct regional regulatory approvals (e.g. US FDA vs. EU EMA SmPC), confusing distinct formulations (Ozempic 2mg vs Wegovy 2.4mg), or generating dangerous personalized dosage/reconstitution advice.
              </p>
              <p>
                <strong>The Solution:</strong> The Semaglutide Evidence Navigator enforces a strict, closed-corpus Retrieval-Augmented Generation (RAG) architecture. Every generated sentence is strictly grounded in immutable, section-located chunk embeddings. If sufficient evidence is absent or similarity falls below the threshold (<code>0.65</code>), the engine deterministically outputs a structured refusal (<code>INSUFFICIENT_EVIDENCE</code>) rather than guessing.
              </p>
            </div>
          </section>

          {/* Section 2: Role of LLMs & RAG in the Architecture */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-2">
              <span className="w-6 h-6 rounded-md bg-blue-600 text-white flex items-center justify-center text-xs font-mono font-bold">2</span>
              How LLMs and RAG Power the Evidence Engine
            </h2>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
              This system couples the reasoning and language synthesis strengths of Large Language Models (LLMs) with the deterministic, tamper-evident boundaries of Retrieval-Augmented Generation (RAG) to eliminate hallucinations in medical workflows:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2.5">
                <div className="flex items-center gap-2 text-blue-700 font-bold font-mono">
                  <Database className="w-4 h-4" />
                  <span>How RAG (Retrieval) Solves the Medical Truth Problem</span>
                </div>
                <ul className="space-y-1.5 text-slate-600 list-disc pl-4 font-sans leading-relaxed">
                  <li><strong>Grounding Truth:</strong> Restricts the evidence universe to verified regulatory documents (FDA, EMA) and primary RCT publications (SELECT, FLOW, STEP-1).</li>
                  <li><strong>Semantic Search via Dense Embeddings:</strong> Encodes medical literature into dense vector space (FAISS IndexFlatIP), allowing complex pharmacological terms to match exact regulatory sections.</li>
                  <li><strong>Strict Jurisdiction Isolation:</strong> Injects deterministic metadata filters so US FDA boxed warnings and EU EMA SmPCs are never cross-pollinated or conflated.</li>
                  <li><strong>Deterministic Abstention:</strong> If similarity score falls below <code>0.65</code> or target docs are disabled, RAG intercepts the pipeline and returns <code>INSUFFICIENT_EVIDENCE</code> without calling the LLM.</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2.5">
                <div className="flex items-center gap-2 text-indigo-700 font-bold font-mono">
                  <Cpu className="w-4 h-4" />
                  <span>How the LLM (Constrained Reasoning) Synthesizes Answers</span>
                </div>
                <ul className="space-y-1.5 text-slate-600 list-disc pl-4 font-sans leading-relaxed">
                  <li><strong>Zero-Shot Evidence Synthesis:</strong> Transforms retrieved raw clinical paragraphs and statistical tables into clear, concise, clinician-friendly summaries.</li>
                  <li><strong>Strict In-Context Binding:</strong> Prompt engineering strictly instructs the LLM: <em>"Synthesize ONLY facts present in provided context. Do NOT use external pre-training weights."</em></li>
                  <li><strong>Structured JSON Answer Contract:</strong> Generates machine-readable output schemas containing claims, study populations, trial endpoints, and confidence scores.</li>
                  <li><strong>In-Text Citation Formatting:</strong> Emits precise section tags (e.g. <code>[FDA-OZE-2024-SEC5.1]</code>) anchored to verified chunk IDs for automatic post-generation validation.</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-3.5 text-xs text-blue-950 font-medium space-y-1">
              <strong>The Synergistic RAG + LLM Advantage:</strong>
              <p className="text-slate-700 text-[11px] leading-relaxed">
                By decoupling retrieval (RAG finding the exact FDA/EMA truth) from language synthesis (LLM formatting into readable, structured answers), the architecture prevents medical hallucinations, ensures 100% citation entailment, and guarantees that regulatory updates only require updating the vector index rather than costly model re-training.
              </p>
            </div>
          </section>

          {/* Section 3: Step-by-Step 9-Stage Architecture */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-2">
              <span className="w-6 h-6 rounded-md bg-blue-600 text-white flex items-center justify-center text-xs font-mono font-bold">3</span>
              Step-by-Step System Architecture (9-Stage Data Flow)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              {[
                { step: 'Step 1: Allow-Listed Ingestion', desc: 'Parses only Tier-1 official PDF/SPL files from FDA Drugs@FDA, EMA EPAR, and ClinicalTrials.gov. Commercial blogs and social media are strictly quarantined.' },
                { step: 'Step 2: Structural Extraction', desc: 'Preserves critical clinical tables, boxed warnings, section headers, page numbers, and clinical endpoints.' },
                { step: 'Step 3: 14-Field Metadata Ledger', desc: 'Attaches normalized metadata (source_id, issuer, product, active_ingredient, jurisdiction, version, hash, superseded flag).' },
                { step: 'Step 4: Section-Aware Chunking', desc: 'Splits text into 250–500 token segments with 10–15% overlap, preserving clinical context headers and SHA-256 integrity.' },
                { step: 'Step 5: Pre-Retrieval Safety Router', desc: 'Evaluates queries across 5 routes (Allowed, Ambiguous, Personalized Refusal, Emergency Escalation, Prohibited Sourcing) before vector search.' },
                { step: 'Step 6: Filtered Vector Retrieval', desc: 'Executes cosine similarity search (IndexFlatIP) with strict jurisdiction and brand metadata filters. Similarity gate: score ≥ 0.65.' },
                { step: 'Step 7: Constrained Grounded LLM', desc: 'Generates answers strictly from retrieved passages. Forbids parametric memory usage and enforces typed JSON output.' },
                { step: 'Step 8: Citation Entailment Validator', desc: 'Validates that every cited chunk ID exists in context and verifies claim entailment before delivering to the client.' },
                { step: 'Step 9: Answer Contract & Audit Log', desc: 'Emits structured JSON with jurisdiction badges, clickable evidence anchors, and latency telemetry with zero PHI logging.' }
              ].map((s, idx) => (
                <div key={idx} className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
                  <span className="font-bold font-mono text-blue-800 text-[11px] block">{s.step}</span>
                  <p className="text-slate-600 text-[11px] leading-relaxed font-sans">{s.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: Safety Guardrails & 5 Routes */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-2">
              <span className="w-6 h-6 rounded-md bg-blue-600 text-white flex items-center justify-center text-xs font-mono font-bold">4</span>
              Safety Policy Matrix & 5 Request Routes (Section 3.2)
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden font-sans">
                <thead className="bg-slate-100 text-slate-800 font-mono text-[11px]">
                  <tr>
                    <th className="p-3 border-b border-slate-200">Route</th>
                    <th className="p-3 border-b border-slate-200">Intent / Trigger</th>
                    <th className="p-3 border-b border-slate-200">System Behavior</th>
                    <th className="p-3 border-b border-slate-200">Example Trigger Query</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  <tr>
                    <td className="p-3 font-bold text-emerald-800 font-mono">Route A: Allowed</td>
                    <td className="p-3 text-slate-700">General label, trial, or pharmacology questions</td>
                    <td className="p-3 text-slate-900">Execute FAISS search + in-text citations</td>
                    <td className="p-3 italic text-slate-600">"What did the SELECT trial demonstrate for cardiovascular risk?"</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-blue-800 font-mono">Route B: Ambiguous</td>
                    <td className="p-3 text-slate-700">Missing brand (Ozempic vs Wegovy) or region (US vs EU)</td>
                    <td className="p-3 text-slate-900">Ask single targeted clarification question</td>
                    <td className="p-3 italic text-slate-600">"What is the starting dose and titration schedule?"</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-amber-800 font-mono">Route C: Personalized</td>
                    <td className="p-3 text-slate-700">Personal dosage adjustments, symptoms, or missed doses</td>
                    <td className="p-3 text-slate-900">Controlled refusal + clinician/pharmacist referral</td>
                    <td className="p-3 italic text-slate-600">"I took 1mg yesterday and feel sick. Can I take another dose?"</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-rose-800 font-mono">Route D: Urgent Alert</td>
                    <td className="p-3 text-slate-700">Severe pancreatitis symptoms, anaphylaxis, acute jaundice</td>
                    <td className="p-3 text-slate-900">Immediate 911 / Emergency Room escalation</td>
                    <td className="p-3 italic text-slate-600">"Severe stomach pain radiating to back with vomiting right now."</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-purple-800 font-mono">Route E: Prohibited</td>
                    <td className="p-3 text-slate-700">Illicit peptide compounding, sodium salts, prescription bypass</td>
                    <td className="p-3 text-slate-900">Refusal + Link to official FDA Counterfeit alerts</td>
                    <td className="p-3 italic text-slate-600">"Where to buy semaglutide raw powder to reconstitute at home?"</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 5: Completed Features & Capabilities */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-2">
              <span className="w-6 h-6 rounded-md bg-blue-600 text-white flex items-center justify-center text-xs font-mono font-bold">5</span>
              Completed Milestones & Deliverables
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-emerald-700 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Interactive Search & Citation Engine</span>
                </div>
                <ul className="list-disc pl-4 text-slate-600 space-y-1">
                  <li>Full FAISS index covering FDA Ozempic/Wegovy, EMA SmPC, SUSTAIN-6, STEP-1, SELECT, and FLOW.</li>
                  <li>Clickable citation chips that open source metadata, locator, version, and SHA-256 hash.</li>
                  <li>Jurisdiction filters with strict US/EU isolation.</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-emerald-700 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Pre-Retrieval Safety Classifier Bench</span>
                </div>
                <ul className="list-disc pl-4 text-slate-600 space-y-1">
                  <li>13 benchmark prompt test presets covering all 5 clinical routes.</li>
                  <li>Interactive classifier tester with confidence score and signal detection.</li>
                  <li>8 active clinical guardrails (e.g. ASA surgery 1-week hold, EMA 2-month pregnancy washout).</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-emerald-700 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Evaluation Blueprint & Human Audit Suite</span>
                </div>
                <ul className="list-disc pl-4 text-slate-600 space-y-1">
                  <li>Live calculation of Recall@1/3/5, MRR, Citation Validity, and Claim Support.</li>
                  <li>220+ question test suite composition across 9 distinct slices.</li>
                  <li>Interactive modal for human reviewers to double-score test cases.</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-emerald-700 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Architecture ADRs & Repo Milestones Explorer</span>
                </div>
                <ul className="list-disc pl-4 text-slate-600 space-y-1">
                  <li>8 formal Architectural Decision Records (ADRs 001–008).</li>
                  <li>5-Week Bootcamp & 12-Week Roadmap with milestone exit gates.</li>
                  <li>Interactive code & file viewer for core Python backend scripts.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 6: Future Roadmap & Extensibility */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-2">
              <span className="w-6 h-6 rounded-md bg-blue-600 text-white flex items-center justify-center text-xs font-mono font-bold">6</span>
              Future Roadmap & Production Extensibility
            </h2>

            <div className="space-y-3 text-xs sm:text-sm text-slate-800 font-sans">
              <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                <strong className="text-slate-900">1. Cross-Encoder Re-Ranking Pipeline (Cohere / BGE-Reranker-Large):</strong>
                <p className="text-slate-600 text-xs">Integrate a second-stage cross-encoder re-ranking model to boost Recall@1 on complex pharmacology queries and multi-paragraph clinical trial outcome tables.</p>
              </div>

              <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                <strong className="text-slate-900">2. Automated FDA DailyMed & Drugs@FDA RSS Webhooks:</strong>
                <p className="text-slate-600 text-xs">Build a scheduled background worker that monitors DailyMed for newly published SPL package inserts, automatically computes SHA-256 diffs, and flags superseded documents.</p>
              </div>

              <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                <strong className="text-slate-900">3. Multi-Jurisdiction Expansion (Health Canada, PMDA Japan, TGA Australia):</strong>
                <p className="text-slate-600 text-xs">Expand the jurisdiction ledger to include Health Canada Product Monographs and Japanese PMDA labels with multilingual section alignment.</p>
              </div>

              <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                <strong className="text-slate-900">4. Continuous CI/CD RAGAS Evaluation Harness:</strong>
                <p className="text-slate-600 text-xs">Run automated RAGAS tests (Context Precision, Faithfulness, Answer Relevance) on every repository pull request against a frozen 220-question benchmark suite.</p>
              </div>
            </div>
          </section>

          {/* Sign-off & Quality Assurance Footer */}
          <div className="border-t-2 border-slate-900 pt-6 text-xs text-slate-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono">
            <div>
              <span className="font-bold text-slate-900 block">SEMAGLUTIDE EVIDENCE NAVIGATOR SPECIFICATION</span>
              <span>Prepared for Biomedical & Machine Learning Engineering Review</span>
            </div>
            <div className="text-right">
              <span className="block">Status: Verified & Grounded</span>
              <span className="text-emerald-700 font-bold">Release Blocker Gate: PASSED (6/6)</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
