/**
 * Semaglutide/Ozempic Evidence Navigator - Domain Type Definitions
 */

export type AppTheme = 
  | 'google-ai-studio-light' 
  | 'clinical-light' 
  | 'warm-paper-light' 
  | 'emerald-mint-light' 
  | 'soft-lavender-light';

export type Jurisdiction = 'US' | 'EU' | 'GLOBAL';

export type ProductBrand = 'OZEMPIC' | 'WEGOVY' | 'RYBELSUS' | 'GENERAL_SEMAGLUTIDE';

export type SourceIssuer = 'FDA' | 'EMA' | 'CLINICALTRIALS_GOV' | 'NEJM' | 'LANCET' | 'FDA_SAFETY';

export type SourceType = 'LABEL' | 'SAFETY_COMMUNICATION' | 'TRIAL_REGISTRY' | 'PEER_REVIEWED_STUDY' | 'GUIDELINE';

export type SourceTier = 'TIER_1_REGULATORY' | 'TIER_2_CLINICAL_TRIAL' | 'TIER_3_PEER_REVIEWED' | 'TIER_4_GUIDELINES';

export interface DocumentMetadata {
  id: string;
  title: string;
  issuer: SourceIssuer;
  product: ProductBrand;
  activeIngredient: 'semaglutide';
  formulation: string; // e.g. "Subcutaneous Injection 0.5mg/1mg/2mg", "Oral Tablet 7mg/14mg"
  sourceType: SourceType;
  tier: SourceTier;
  jurisdiction: Jurisdiction;
  version: string; // e.g. "v2024.03"
  isCurrent: boolean;
  publicationDate: string; // ISO string e.g. "2024-03-08"
  effectiveDate: string;
  canonicalUrl: string;
  contentHash: string;
  isActiveInCorpus: boolean; // toggleable for missing document testing
}

export interface DocumentChunk {
  id: string; // e.g. "FDA-OZE-2024-SEC5.1-C1"
  docId: string;
  sectionTitle: string;
  pageLocator: string; // e.g. "Section 5.1, Page 4"
  content: string;
  summary: string;
  keywords: string[];
  embeddingVector?: number[]; // Simulating dense vector representations
}

export type SafetyRoute = 
  | 'A_ALLOWED_EVIDENCE'
  | 'B_AMBIGUOUS_CLARIFY'
  | 'C_PERSONALIZED_REFUSAL'
  | 'D_URGENT_ESCALATION'
  | 'E_PROHIBITED_REFUSAL';

export interface SafetyClassification {
  route: SafetyRoute;
  confidence: number; // 0.0 to 1.0
  rationale: string;
  detectedSignals: string[];
  suggestedAction: string;
}

export interface RetrievalFilter {
  jurisdiction?: Jurisdiction | 'ALL';
  product?: ProductBrand | 'ALL';
  currentVersionOnly?: boolean;
  tiers?: SourceTier[];
  minSimilarityScore?: number;
}

export interface RetrievalResult {
  chunk: DocumentChunk;
  docMetadata: DocumentMetadata;
  similarityScore: number;
  matchReasons: string[];
}

export interface CitationReference {
  citationId: string; // e.g. "[FDA-OZE-2024-SEC5.1]"
  chunkId: string;
  docTitle: string;
  issuer: SourceIssuer;
  jurisdiction: Jurisdiction;
  sectionTitle: string;
  pageLocator: string;
  url: string;
  version: string;
  isVerified: boolean;
  supportSnippet: string;
  claimText: string;
}

export interface EvidenceResponse {
  query: string;
  timestamp: string;
  safetyClassification: SafetyClassification;
  jurisdictionContext: Jurisdiction;
  productContext: ProductBrand | 'ALL';
  retrievedEvidence: RetrievalResult[];
  isAbstained: boolean;
  abstentionReason?: string;
  answerText: string;
  citations: CitationReference[];
  citationValidityScore: number; // Percentage 0-100
  limitations: string[];
  executionTimeMs: number;
  tokenStats?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface BenchmarkTestCase {
  id: string;
  category: 'ALLOWED_EVIDENCE' | 'JURISDICTION_SPLIT' | 'SUPERSEDED_VERSION' | 'SAFETY_PERSONALIZED' | 'SAFETY_URGENT' | 'MISSING_DOC_ABSTENTION';
  question: string;
  expectedRoute: SafetyRoute;
  expectedJurisdiction: Jurisdiction;
  expectedDocIds: string[];
  description: string;
  difficulty: 'BASIC' | 'INTERMEDIATE' | 'ADVANCED';
}

export interface EvaluationMetrics {
  totalTestsRun: number;
  recallAt1: number;
  recallAt3: number;
  recallAt5: number;
  mrr: number; // Mean Reciprocal Rank
  claimSupportPercentage: number;
  citationValidityPercentage: number;
  jurisdictionAccuracyPercentage: number;
  safetyRouteAccuracyPercentage: number;
  abstentionAccuracyPercentage: number;
  avgLatencyMs: number;
  totalTokensUsed: number;
  estCostUsd: number;
}

export interface HumanReviewScore {
  testId: string;
  isCorrectRoute: boolean;
  isRetrievalAccurate: boolean;
  isAnswerGrounded: boolean;
  areCitationsValid: boolean;
  failureCategory?: 'WRONG_JURISDICTION' | 'SUPERSEDED_DOC_USED' | 'UNSUPPORTED_CLAIM' | 'UNNECESSARY_HALLUCINATION' | 'FALSE_REFUSAL' | 'SAFETY_LEAK' | 'NONE';
  reviewerNotes: string;
  timestamp: string;
}
