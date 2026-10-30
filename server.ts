/**
 * Semaglutide/Ozempic Evidence Navigator - Full-Stack Express Server
 */

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { vectorStore } from './src/services/vectorStore';
import { safetyRouter } from './src/services/safetyRouter';
import { citationValidator } from './src/services/citationValidator';
import { evaluator, BENCHMARK_TEST_CASES } from './src/services/evaluator';
import { EvidenceResponse, Jurisdiction, ProductBrand } from './src/types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini AI Client lazily/safely
  const getGeminiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('GEMINI_API_KEY environment variable is not set. Gemini API calls will fallback to offline evidence synthesis.');
      return null;
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  };

  // --- API ROUTES ---

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'Semaglutide Evidence Navigator API' });
  });

  // 1. Core End-to-End Evidence Query Pipeline
  app.post('/api/navigator/query', async (req, res) => {
    const startTime = Date.now();
    const { query, jurisdiction = 'ALL', product = 'ALL', currentVersionOnly = true } = req.body;

    if (!query || typeof query !== 'string') {
      res.status(400).json({ error: 'Query parameter is required' });
      return;
    }

    try {
      // Layer 1: Safety Pre-Router
      const classification = safetyRouter.classifyQuery(query);

      // Handle Non-Allowed Routes Immediately
      if (classification.route === 'D_URGENT_ESCALATION') {
        const response: EvidenceResponse = {
          query,
          timestamp: new Date().toISOString(),
          safetyClassification: classification,
          jurisdictionContext: jurisdiction as Jurisdiction,
          productContext: product as ProductBrand,
          retrievedEvidence: [],
          isAbstained: true,
          abstentionReason: 'SAFETY_ESCALATION: Urgent symptom or emergency event detected.',
          answerText: `🚨 **URGENT MEDICAL WARNING & ESCALATION**\n\nThe symptoms described (such as severe abdominal pain radiating to the back, vomiting, vision changes, or severe allergic reaction) may indicate a serious medical complication such as **acute pancreatitis** or severe acute reaction.\n\n**Immediate Required Action:**\n- Stop using Semaglutide/Ozempic/Wegovy immediately.\n- Seek immediate emergency medical attention or contact your local emergency number (e.g., 911 / 112) or go to the nearest emergency room.\n- Contact your prescribing physician or pharmacist right away.\n\n*Note: This evidence tool cannot assess or treat medical emergencies.*`,
          citations: [],
          citationValidityScore: 100,
          limitations: ['Immediate human medical escalation required.'],
          executionTimeMs: Date.now() - startTime
        };
        res.json(response);
        return;
      }

      if (classification.route === 'C_PERSONALIZED_REFUSAL') {
        const response: EvidenceResponse = {
          query,
          timestamp: new Date().toISOString(),
          safetyClassification: classification,
          jurisdictionContext: jurisdiction as Jurisdiction,
          productContext: product as ProductBrand,
          retrievedEvidence: [],
          isAbstained: true,
          abstentionReason: 'SAFETY_REFUSAL: Personalized medical or treatment decision request.',
          answerText: `⚠️ **CONTROLLED MEDICAL REFUSAL**\n\nThis application is a **safety-critical educational research prototype** designed strictly for navigating population-level medical evidence, FDA/EMA prescribing labels, and clinical trial datasets.\n\nIt **cannot** evaluate personal medical history, recommend individual dose adjustments, manage missed doses, or provide diagnostic advice.\n\n**What you should do:**\n- Contact your prescribing physician, endocrinologist, or licensed pharmacist for personalized clinical guidance.\n- Refer to the patient information leaflet provided with your official prescription pen or medication box.`,
          citations: [],
          citationValidityScore: 100,
          limitations: ['Personalized medical guidance is strictly restricted.'],
          executionTimeMs: Date.now() - startTime
        };
        res.json(response);
        return;
      }

      if (classification.route === 'E_PROHIBITED_REFUSAL') {
        const response: EvidenceResponse = {
          query,
          timestamp: new Date().toISOString(),
          safetyClassification: classification,
          jurisdictionContext: jurisdiction as Jurisdiction,
          productContext: product as ProductBrand,
          retrievedEvidence: [],
          isAbstained: true,
          abstentionReason: 'SAFETY_REFUSAL: Prohibited unapproved compounding or prescription bypass request.',
          answerText: `🚫 **SAFETY POLICY REFUSAL**\n\nThe request involves unapproved semaglutide salt formulations (e.g., semaglutide sodium/acetate), compounding pharmacy shortcuts, or obtaining prescription medication without licensed medical supervision.\n\n**FDA Regulatory Warning:**\nAccording to the FDA Safety Alert [DOC-FDA-SAFETY-COMPOUNDING-2024], compounded semaglutide salt forms are not FDA-approved, have different active ingredients, and pose severe health risks. Semaglutide should only be obtained via a valid prescription from state-licensed pharmacies.`,
          citations: [],
          citationValidityScore: 100,
          limitations: ['Unapproved compounding and illegal sourcing are strictly prohibited.'],
          executionTimeMs: Date.now() - startTime
        };
        res.json(response);
        return;
      }

      if (classification.route === 'B_AMBIGUOUS_CLARIFY') {
        const response: EvidenceResponse = {
          query,
          timestamp: new Date().toISOString(),
          safetyClassification: classification,
          jurisdictionContext: jurisdiction as Jurisdiction,
          productContext: product as ProductBrand,
          retrievedEvidence: [],
          isAbstained: true,
          abstentionReason: 'CLARIFICATION_REQUIRED: Query lacks specific brand formulation or jurisdiction context.',
          answerText: `🔍 **CONTEXT CLARIFICATION REQUIRED**\n\nYour query asks a general question without specifying the exact brand formulation or regulatory jurisdiction:\n\n1. **Which product formulation?**\n   - **Ozempic** (Subcutaneous injection for Type 2 Diabetes & MACE risk reduction)\n   - **Wegovy** (Subcutaneous 2.4mg injection for Chronic Weight Management & CVD risk reduction)\n   - **Rybelsus** (Oral tablets for Type 2 Diabetes)\n\n2. **Which jurisdiction?**\n   - **US FDA** (United States Prescribing Information)\n   - **EU EMA** (European Summary of Product Characteristics)\n\nPlease clarify your request or select the filters above so the system can retrieve the exact evidence.`,
          citations: [],
          citationValidityScore: 100,
          limitations: ['Clarification needed to prevent mixing distinct product indications or jurisdictions.'],
          executionTimeMs: Date.now() - startTime
        };
        res.json(response);
        return;
      }

      // Layer 2: Filtered Vector Retrieval
      const retrieval = vectorStore.retrieve(query, {
        jurisdiction: jurisdiction as Jurisdiction,
        product: product as ProductBrand,
        currentVersionOnly,
        minSimilarityScore: 0.18
      });

      // Layer 3: Abstention Check (Principle 2: Know what it does NOT know)
      if (retrieval.isAbstained || retrieval.results.length === 0) {
        const response: EvidenceResponse = {
          query,
          timestamp: new Date().toISOString(),
          safetyClassification: classification,
          jurisdictionContext: jurisdiction as Jurisdiction,
          productContext: product as ProductBrand,
          retrievedEvidence: [],
          isAbstained: true,
          abstentionReason: retrieval.abstentionReason || 'INSUFFICIENT_EVIDENCE: No matching passages found in the active evidence corpus.',
          answerText: `🔴 **INSUFFICIENT EVIDENCE (SYSTEM ABSTENTION)**\n\nThe active evidence corpus does not contain sufficient verified document passages to safely answer this question under your selected filters (Jurisdiction: ${jurisdiction}, Product: ${product}).\n\n**System Guarantee:** The Semaglutide Evidence Navigator is strictly constrained to grounded evidence synthesis. Rather than speculating or relying on LLM parametric memory, the system abstains when required documents are absent or unverified.`,
          citations: [],
          citationValidityScore: 100,
          limitations: ['Abstained due to absent or low-confidence evidence chunks.'],
          executionTimeMs: Date.now() - startTime
        };
        res.json(response);
        return;
      }

      // Layer 4: Grounded Synthesis with Gemini AI
      const ai = getGeminiClient();
      let answerText = '';
      let promptTokens = 0;
      let completionTokens = 0;

      const formattedContext = retrieval.results.map((res, idx) => `
EVIDENCE PASSAGE #${idx + 1}:
Doc ID: [${res.docMetadata.id}]
Doc Title: ${res.docMetadata.title}
Issuer: ${res.docMetadata.issuer} | Jurisdiction: ${res.docMetadata.jurisdiction} | Version: ${res.docMetadata.version}
Section: ${res.chunk.sectionTitle} (${res.chunk.pageLocator})
Canonical URL: ${res.docMetadata.canonicalUrl}
Content:
"""
${res.chunk.content}
"""
`).join('\n\n');

      if (ai) {
        const systemInstruction = `You are the Semaglutide Evidence Navigator, an evidence-grounded AI synthesis engine.
Your sole duty is to explain authoritative medical evidence based EXCLUSIVELY on the provided retrieved passages.

STRICT RULES:
1. Use ONLY the provided evidence passages. Do NOT use outside knowledge or speculate.
2. Every material statement or factual claim MUST end with an exact citation tag in brackets matching the Doc ID, e.g. [${retrieval.results[0].docMetadata.id}].
3. Explicitly distinguish between US FDA regulatory status and EU EMA status if relevant.
4. Note any version differences or superseded status if present in the text.
5. If the evidence is incomplete, state clearly what is unknown.
6. Do NOT provide personalized medical recommendations or dosage changes for specific patients. Keep answer population-level.
7. Format with clear Markdown headers, bullet points, and citation tags.`;

        const userPrompt = `USER QUESTION: ${query}

RETRIEVED GROUND-TRUTH EVIDENCE:
${formattedContext}

Synthesize a clear, structured, evidence-grounded response with claim-linked citation tags.`;

        try {
          const aiResponse = await ai.models.generateContent({
            model: 'gemini-3.6-flash',
            contents: userPrompt,
            config: {
              systemInstruction,
              temperature: 0.1 // Low temperature for factual precision
            }
          });

          answerText = aiResponse.text || '';
          promptTokens = 450 + formattedContext.length / 4;
          completionTokens = answerText.length / 4;
        } catch (aiErr) {
          console.error('Gemini synthesis error:', aiErr);
          // Deterministic fallback synthesis if Gemini API call fails or key is invalid
          answerText = buildDeterministicSynthesis(query, retrieval.results);
        }
      } else {
        // Deterministic fallback if GEMINI_API_KEY is not set
        answerText = buildDeterministicSynthesis(query, retrieval.results);
      }

      // Layer 5: Citation Validation
      const citationAudit = citationValidator.validateCitations(answerText, retrieval.results);

      const response: EvidenceResponse = {
        query,
        timestamp: new Date().toISOString(),
        safetyClassification: classification,
        jurisdictionContext: jurisdiction as Jurisdiction,
        productContext: product as ProductBrand,
        retrievedEvidence: retrieval.results,
        isAbstained: false,
        answerText,
        citations: citationAudit.citations,
        citationValidityScore: citationAudit.validityScore,
        limitations: [
          'Educational prototype boundary: Educational research assistance only, not for direct clinical treatment.',
          'Grounded strictly in ingested FDA/EMA prescribing labels and clinical trial records.'
        ],
        executionTimeMs: Date.now() - startTime,
        tokenStats: {
          promptTokens: Math.round(promptTokens),
          completionTokens: Math.round(completionTokens),
          totalTokens: Math.round(promptTokens + completionTokens)
        }
      };

      res.json(response);
    } catch (err: any) {
      console.error('Error processing navigator query:', err);
      res.status(500).json({ error: err.message || 'Internal server error' });
    }
  });

  // 2. Safety Router Inspection Endpoint
  app.post('/api/navigator/route', (req, res) => {
    const { query } = req.body;
    if (!query) {
      res.status(400).json({ error: 'Query parameter required' });
      return;
    }
    const classification = safetyRouter.classifyQuery(query);
    res.json(classification);
  });

  // 3. Document Corpus Endpoint
  app.get('/api/corpus/documents', (req, res) => {
    res.json({
      documents: vectorStore.getAllDocuments(),
      chunks: vectorStore.getAllChunks()
    });
  });

  // 4. Toggle Document Active State Endpoint (Missing Document Testing)
  app.post('/api/corpus/toggle-document', (req, res) => {
    const { docId, isActive } = req.body;
    if (!docId) {
      res.status(400).json({ error: 'docId required' });
      return;
    }
    const updated = vectorStore.toggleDocumentActive(docId, isActive);
    res.json({ updatedDoc: updated });
  });

  // 5. Evaluation Benchmark Suite Endpoint
  app.post('/api/eval/run', (req, res) => {
    const metrics = evaluator.runBenchmarkSuite();
    res.json({
      metrics,
      testCases: BENCHMARK_TEST_CASES
    });
  });

  // 6. Human Review Scoring Endpoint
  app.post('/api/eval/human-score', (req, res) => {
    const score = req.body;
    evaluator.saveHumanReview(score);
    res.json({ status: 'saved', score });
  });

  // --- VITE MIDDLEWARE SETUP ---
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Semaglutide Evidence Navigator server listening on http://0.0.0.0:${PORT}`);
  });
}

function buildDeterministicSynthesis(query: string, results: any[]): string {
  if (results.length === 0) return 'No evidence passages found.';
  let text = `### Evidence Synthesis\n\nBased on verified evidence passages in the active corpus:\n\n`;
  results.forEach(res => {
    text += `#### ${res.chunk.sectionTitle} [${res.docMetadata.id}]\n`;
    text += `- **Issuer & Jurisdiction:** ${res.docMetadata.issuer} (${res.docMetadata.jurisdiction}) | **Version:** ${res.docMetadata.version}\n`;
    text += `- **Section & Page:** ${res.chunk.sectionTitle} (${res.chunk.pageLocator})\n`;
    text += `- **Evidence Summary:** ${res.chunk.summary} [${res.docMetadata.id}]\n\n`;
    text += `> "${res.chunk.content}" [${res.docMetadata.id}]\n\n`;
  });
  text += `---\n*Citations validated against active corpus manifest.*`;
  return text;
}

startServer();
