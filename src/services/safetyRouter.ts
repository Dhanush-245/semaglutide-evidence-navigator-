/**
 * Pre-Retrieval Safety Router
 * Classifies inbound user requests into 5 formal routes before retrieval:
 * Route A - Allowed Evidence Question
 * Route B - Ambiguous / Missing Context (Clarification needed)
 * Route C - Personalized Medical Request (Controlled Refusal)
 * Route D - Urgent / Serious Escalation (Emergency Advice)
 * Route E - Prohibited Sourcing / Unapproved Manipulation (Refusal)
 */

import { SafetyClassification, SafetyRoute } from '../types';

export class SafetyRouterService {
  /**
   * Rule-based pre-classifier for fast, deterministic safety checks
   */
  public classifyQuery(query: string): SafetyClassification {
    const qLower = query.toLowerCase().trim();

    // --- ROUTE D: URGENT / SERIOUS ESCALATION ---
    const urgentSignals = [
      'severe abdominal pain', 'severe stomach pain', 'radiating to my back',
      'anaphylaxis', 'trouble breathing', 'swelling of my face', 'vision loss',
      'blindness', 'suicidal', 'thoughts of self harm', 'overdose', 'drank the whole pen',
      'passed out', 'unconscious', 'severe reaction right now', 'jaundice', 'yellow eyes',
      'gallbladder attack', 'cholecystitis', 'stopped urinating', 'anuria', 'allergic'
    ];
    for (const signal of urgentSignals) {
      if (qLower.includes(signal)) {
        return {
          route: 'D_URGENT_ESCALATION',
          confidence: 0.98,
          rationale: `Detected potential medical emergency or acute adverse event signal: "${signal}".`,
          detectedSignals: [signal],
          suggestedAction: 'Immediate medical escalation response with contact numbers for local emergency services / healthcare provider.'
        };
      }
    }

    // --- ROUTE E: PROHIBITED / ILLEGAL SOURCING / MANIPULATION ---
    const prohibitedSignals = [
      'without prescription', 'no rx', 'buy online cheap', 'reconstitute peptide',
      'make semaglutide sodium at home', 'black market', 'fake ozempic',
      'bypass doctor', 'fake prescription', 'research chemical site',
      'semaglutide sodium', 'semaglutide acetate', 'lot nar0074', 'bac water',
      'powder formulation', 'custom compounding salt'
    ];
    for (const signal of prohibitedSignals) {
      if (qLower.includes(signal)) {
        return {
          route: 'E_PROHIBITED_REFUSAL',
          confidence: 0.95,
          rationale: `Detected request regarding unapproved sourcing, compounding manipulation, or prescription bypass: "${signal}".`,
          detectedSignals: [signal],
          suggestedAction: 'Refuse response with regulatory warning regarding unapproved compounding and unsafe procurement.'
        };
      }
    }

    // --- ROUTE C: PERSONALIZED MEDICAL GUIDANCE ---
    const personalSignals = [
      'i took', 'i missed my dose', 'my doctor told me', 'should i increase my dose',
      'i am experiencing nausea', 'what dose should i take', 'my current weight is',
      'can i take my dose early', 'my sugar is 250 today should i', 'for my body',
      'i am pregnant', 'trying to get pregnant', 'breastfeeding while taking',
      'i have surgery tomorrow', 'anesthesia fasting', 'doubled my dose'
    ];
    for (const signal of personalSignals) {
      if (qLower.includes(signal)) {
        return {
          route: 'C_PERSONALIZED_REFUSAL',
          confidence: 0.92,
          rationale: `Detected personalized medical context, pregnancy/pre-conception management, or individual treatment decision query: "${signal}".`,
          detectedSignals: [signal],
          suggestedAction: 'Controlled refusal. Explain that system provides evidence lookup, not personalized medical diagnosis or treatment decisions.'
        };
      }
    }

    // --- ROUTE B: AMBIGUOUS / CONTEXT-MISSING ---
    const isGenericDoseQuery = qLower.includes('dosing') || qLower.includes('dose') || qLower.includes('how to take');
    const hasBrandMention = qLower.includes('ozempic') || qLower.includes('wegovy') || qLower.includes('rybelsus');
    const isGenericIndication = qLower.includes('what is it approved for') || qLower.includes('what are the side effects');

    if ((isGenericDoseQuery || isGenericIndication) && !hasBrandMention && qLower.length < 35) {
      return {
        route: 'B_AMBIGUOUS_CLARIFY',
        confidence: 0.85,
        rationale: 'Query asks for dosing or general indication without specifying product formulation (Ozempic [injection T2D], Wegovy [injection Obesity], Rybelsus [oral T2D]) or jurisdiction.',
        detectedSignals: ['missing_product_formulation', 'missing_jurisdiction'],
        suggestedAction: 'Ask user to clarify whether they are asking about FDA or EMA context, and which brand formulation (Ozempic, Wegovy, Rybelsus).'
      };
    }

    // --- ROUTE A: ALLOWED EVIDENCE QUESTION ---
    return {
      route: 'A_ALLOWED_EVIDENCE',
      confidence: 0.95,
      rationale: 'Query is a valid, population-level evidence question regarding product labels, clinical trials, or regulatory safety alerts.',
      detectedSignals: ['regulatory_or_trial_query'],
      suggestedAction: 'Proceed to filtered evidence retrieval and grounded synthesis.'
    };
  }
}

export const safetyRouter = new SafetyRouterService();
