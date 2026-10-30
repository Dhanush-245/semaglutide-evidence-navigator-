/**
 * Vector Store & Hybrid Retrieval Engine
 * Manages corpus state, vector embedding simulation, metadata filtering, hybrid search,
 * and evidence confidence abstention.
 */

import { DocumentMetadata, DocumentChunk, RetrievalFilter, RetrievalResult } from '../types';
import { INITIAL_DOCUMENTS, INITIAL_CHUNKS } from '../data/evidenceCorpus';

class VectorStoreService {
  private documents: Map<string, DocumentMetadata> = new Map();
  private chunks: Map<string, DocumentChunk> = new Map();

  constructor() {
    this.resetCorpus();
  }

  public resetCorpus() {
    this.documents.clear();
    this.chunks.clear();

    INITIAL_DOCUMENTS.forEach(doc => {
      this.documents.set(doc.id, { ...doc });
    });

    INITIAL_CHUNKS.forEach(chunk => {
      this.chunks.set(chunk.id, { ...chunk });
    });
  }

  public getAllDocuments(): DocumentMetadata[] {
    return Array.from(this.documents.values());
  }

  public getAllChunks(): DocumentChunk[] {
    return Array.from(this.chunks.values());
  }

  public toggleDocumentActive(docId: string, isActive?: boolean): DocumentMetadata | null {
    const doc = this.documents.get(docId);
    if (!doc) return null;
    doc.isActiveInCorpus = isActive !== undefined ? isActive : !doc.isActiveInCorpus;
    return { ...doc };
  }

  /**
   * Simple TF-IDF & Token Vectorizer for hybrid semantic similarity scoring
   */
  private tokenize(text: string): string[] {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter(t => t.length > 2);
  }

  private computeCosineSimilarity(queryTokens: string[], chunk: DocumentChunk, doc: DocumentMetadata): { score: number; reasons: string[] } {
    const reasons: string[] = [];
    if (queryTokens.length === 0) return { score: 0, reasons };

    const chunkText = `${chunk.sectionTitle} ${chunk.content} ${chunk.summary} ${chunk.keywords.join(' ')} ${doc.title} ${doc.product}`.toLowerCase();
    const chunkTokens = new Set(this.tokenize(chunkText));

    let matchCount = 0;
    queryTokens.forEach(token => {
      if (chunkTokens.has(token)) {
        matchCount++;
      } else {
        // Partial substring matching
        for (const cToken of chunkTokens) {
          if (cToken.includes(token) || token.includes(cToken)) {
            matchCount += 0.5;
            break;
          }
        }
      }
    });

    // Jaccard / Overlap similarity
    let score = matchCount / (queryTokens.length + Math.sqrt(chunkTokens.size) * 0.2);

    // Boost exact keyword hits
    chunk.keywords.forEach(kw => {
      const kwLower = kw.toLowerCase();
      if (queryTokens.some(qt => kwLower.includes(qt))) {
        score += 0.12;
        reasons.push(`Matched core keyword: "${kw}"`);
      }
    });

    // Title / Section match boost
    const sectionLower = chunk.sectionTitle.toLowerCase();
    if (queryTokens.some(qt => sectionLower.includes(qt))) {
      score += 0.15;
      reasons.push(`Matched section title: "${chunk.sectionTitle}"`);
    }

    // Normalizing score to max 1.0
    score = Math.min(1.0, score);

    return { score, reasons: Array.from(new Set(reasons)) };
  }

  /**
   * Search vector store with strict metadata filtering & confidence thresholding
   */
  public retrieve(query: string, filter: RetrievalFilter = {}): {
    results: RetrievalResult[];
    isAbstained: boolean;
    abstentionReason?: string;
  } {
    const queryTokens = this.tokenize(query);
    const minScore = filter.minSimilarityScore ?? 0.22;

    const candidates: RetrievalResult[] = [];

    this.chunks.forEach(chunk => {
      const doc = this.documents.get(chunk.docId);
      if (!doc) return;

      // Rule 1: Skip if document is deactivated in corpus
      if (!doc.isActiveInCorpus) return;

      // Rule 2: Jurisdiction filter
      if (filter.jurisdiction && filter.jurisdiction !== 'ALL') {
        if (doc.jurisdiction !== 'GLOBAL' && doc.jurisdiction !== filter.jurisdiction) {
          return; // Strict jurisdiction isolation
        }
      }

      // Rule 3: Product filter
      if (filter.product && filter.product !== 'ALL') {
        if (doc.product !== 'GENERAL_SEMAGLUTIDE' && doc.product !== filter.product) {
          return; // Product/Brand isolation
        }
      }

      // Rule 4: Current version filter
      if (filter.currentVersionOnly && !doc.isCurrent) {
        return; // Superseded document exclusion
      }

      // Rule 5: Tier filter
      if (filter.tiers && filter.tiers.length > 0) {
        if (!filter.tiers.includes(doc.tier)) {
          return;
        }
      }

      // Compute similarity score
      const { score, reasons } = this.computeCosineSimilarity(queryTokens, chunk, doc);

      if (score >= minScore) {
        candidates.push({
          chunk,
          docMetadata: doc,
          similarityScore: score,
          matchReasons: reasons
        });
      }
    });

    // Sort by similarity score descending
    candidates.sort((a, b) => b.similarityScore - a.similarityScore);

    // Limit top K = 5
    const topResults = candidates.slice(0, 5);

    if (topResults.length === 0) {
      return {
        results: [],
        isAbstained: true,
        abstentionReason: `INSUFFICIENT_EVIDENCE: No active documents in the corpus satisfied the active filters (Jurisdiction: ${filter.jurisdiction || 'ANY'}, Product: ${filter.product || 'ANY'}) with adequate semantic confidence for this query.`
      };
    }

    return {
      results: topResults,
      isAbstained: false
    };
  }
}

export const vectorStore = new VectorStoreService();
