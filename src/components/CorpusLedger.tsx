import React, { useState } from 'react';
import {
  Database,
  Filter,
  ExternalLink,
  Hash,
  CheckCircle2,
  AlertOctagon,
  ToggleLeft,
  ToggleRight,
  Layers,
  FileText,
  Search,
  BookOpen,
  ShieldCheck,
  Calendar,
  Globe,
  Info
} from 'lucide-react';
import { DocumentMetadata, DocumentChunk } from '../types';

interface CorpusLedgerProps {
  documents: DocumentMetadata[];
  chunks: DocumentChunk[];
  onToggleDocActive: (docId: string, isActive?: boolean) => void;
}

const APPROVED_STARTING_CORPUS = [
  {
    authority: 'FDA FDALabel / Drugs@FDA',
    scope: 'Current U.S. Ozempic label (NDA 209637)',
    use: 'Primary label truth and version tracking',
    canonicalUrl: 'https://nctr-crs.fda.gov/fdalabel/ui/spl-summaries/criteria/383952'
  },
  {
    authority: 'FDA Drug Safety',
    scope: 'Semaglutide/GLP-1 safety and unapproved-product notices',
    use: 'Safety updates, counterfeit and compounding risks',
    canonicalUrl: 'https://www.fda.gov/drugs/postmarket-drug-safety-information-patients-and-providers/fdas-concerns-unapproved-glp-1-drugs-used-weight-loss'
  },
  {
    authority: 'FDA Safety Alerts',
    scope: 'Counterfeit Ozempic alert',
    use: 'Current regulator alert testing and safety corpus',
    canonicalUrl: 'https://www.fda.gov/drugs/drug-alerts-and-statements/fda-warns-consumers-not-use-counterfeit-ozempic-semaglutide-found-us-drug-supply-chain'
  },
  {
    authority: 'EMA EPAR',
    scope: 'Ozempic EPAR and product information',
    use: 'EU-only comparison corpus with strict jurisdiction tag',
    canonicalUrl: 'https://www.ema.europa.eu/en/medicines/human/EPAR/ozempic'
  },
  {
    authority: 'ClinicalTrials.gov',
    scope: 'Registered semaglutide trials (SUSTAIN, STEP, SELECT, FLOW)',
    use: 'Protocol, endpoints, status and study identifiers',
    canonicalUrl: 'https://clinicaltrials.gov/search?intr=Semaglutide'
  },
  {
    authority: 'PubMed / NLM',
    scope: 'Peer-reviewed semaglutide primary trial literature',
    use: 'Primary study abstracts and full text where licensed',
    canonicalUrl: 'https://pubmed.ncbi.nlm.nih.gov/?term=semaglutide'
  }
];

const REQUIRED_METADATA_FIELDS = [
  { field: 'source_id', meaning: 'Stable internal identifier (e.g. DOC-FDA-OZEMPIC-2024)' },
  { field: 'issuer', meaning: 'FDA, EMA, NLM/ClinicalTrials.gov, or medical journal' },
  { field: 'product', meaning: 'Ozempic, Wegovy, Rybelsus, or general semaglutide comparator' },
  { field: 'active_ingredient', meaning: 'Normalized ingredient name (semaglutide)' },
  { field: 'source_type', meaning: 'Label, safety notice, trial registry, RCT, guideline, or review' },
  { field: 'jurisdiction', meaning: 'US, EU, or Global' },
  { field: 'title', meaning: 'Official document title per regulatory filing' },
  { field: 'publication_date', meaning: 'Publication / issue date (YYYY-MM-DD)' },
  { field: 'effective_date', meaning: 'Label or regulatory effective date' },
  { field: 'retrieved_at', meaning: 'UTC retrieval timestamp for change tracking' },
  { field: 'version', meaning: 'SPL version, revision date, or publication version' },
  { field: 'superseded', meaning: 'Boolean flag plus successor source_id (quarantined from active RAG)' },
  { field: 'section', meaning: 'Exact label section / article heading' },
  { field: 'content_hash', meaning: 'SHA-256 hash for automated change detection' }
];

export const CorpusLedger: React.FC<CorpusLedgerProps> = ({ documents, chunks, onToggleDocActive }) => {
  const [activeTab, setActiveTab] = useState<'documents' | 'approved_sources' | 'metadata_schema'>('documents');
  const [filterIssuer, setFilterIssuer] = useState<string>('ALL');
  const [filterJurisdiction, setFilterJurisdiction] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);

  const filteredDocs = documents.filter(doc => {
    if (filterIssuer !== 'ALL' && doc.issuer !== filterIssuer) return false;
    if (filterJurisdiction !== 'ALL' && doc.jurisdiction !== filterJurisdiction) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = doc.title.toLowerCase().includes(q);
      const matchId = doc.id.toLowerCase().includes(q);
      const matchFormulation = doc.formulation.toLowerCase().includes(q);
      if (!matchTitle && !matchId && !matchFormulation) return false;
    }
    return true;
  });

  const getDocChunks = (docId: string) => chunks.filter(c => c.docId === docId);

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 space-y-6 font-sans">
      
      {/* Header Summary Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Database className="w-4.5 h-4.5 text-blue-600" />
              Verified Medical Evidence Corpus & Provenance Ledger
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed max-w-3xl">
              Inspect all official regulatory label documents, clinical trial publications (SELECT, FLOW, STEP), and FDA drug safety alerts indexed in the FAISS vector database. Toggle individual documents off to evaluate the system's strict abstention safety rule.
            </p>
          </div>
          <div className="bg-slate-50 px-3.5 py-2 rounded-lg border border-slate-200 text-xs font-mono text-slate-800">
            Corpus Size: <strong className="text-slate-900 font-bold">{documents.length} Official Documents</strong> ({chunks.length} Chunks)
          </div>
        </div>
      </div>

      {/* Sub-tabs Switcher */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        {[
          { id: 'documents', label: 'Indexed Documents & Chunks', count: `${filteredDocs.length} Docs` },
          { id: 'approved_sources', label: 'Approved Starting Corpus (Table 2.4)', count: '6 Authorities' },
          { id: 'metadata_schema', label: '14-Field Document Schema (Table 2.3)', count: '14 Fields' }
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

      {/* Tab 1: Indexed Documents */}
      {activeTab === 'documents' && (
        <div className="space-y-4">
          {/* Filter Toolbar */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-2xs">
            <div className="flex flex-wrap items-center gap-3">
              {/* Keyword Search */}
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search documents by title or ID..."
                  className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 pl-8 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 w-64 font-sans"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              </div>

              {/* Issuer Filter */}
              <div className="flex items-center gap-1.5 text-xs">
                <span className="font-bold text-slate-600">Issuer:</span>
                <select
                  value={filterIssuer}
                  onChange={(e) => setFilterIssuer(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-800 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none font-medium cursor-pointer"
                >
                  <option value="ALL">All Authorities</option>
                  <option value="FDA">FDA (US Food & Drug Admin)</option>
                  <option value="EMA">EMA (European Medicines Agency)</option>
                  <option value="CLINICALTRIALS_GOV">ClinicalTrials.gov (Research)</option>
                  <option value="NEJM">NEJM / Medical Journals</option>
                  <option value="FDA_SAFETY">FDA Safety Alerts</option>
                </select>
              </div>

              {/* Jurisdiction Filter */}
              <div className="flex items-center gap-1.5 text-xs">
                <span className="font-bold text-slate-600">Region:</span>
                <select
                  value={filterJurisdiction}
                  onChange={(e) => setFilterJurisdiction(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-800 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none font-medium cursor-pointer"
                >
                  <option value="ALL">All Regions</option>
                  <option value="US">United States (US FDA)</option>
                  <option value="EU">European Union (EU EMA)</option>
                  <option value="GLOBAL">Global Clinical Trials</option>
                </select>
              </div>
            </div>

            <div className="text-xs text-slate-500 font-mono">
              Displaying {filteredDocs.length} of {documents.length} Documents
            </div>
          </div>

          {/* Documents Grid */}
          <div className="grid grid-cols-1 gap-3.5">
            {filteredDocs.map((doc) => {
              const docChunks = getDocChunks(doc.id);
              const isSelected = selectedDocId === doc.id;

              return (
                <div
                  key={doc.id}
                  className={`bg-white border rounded-xl p-5 transition-all shadow-2xs ${
                    doc.isActiveInCorpus
                      ? 'border-slate-200 hover:border-slate-300'
                      : 'border-rose-200 bg-rose-50/20 opacity-80'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                        <span className="font-bold text-blue-800 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                          {doc.id}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                          {doc.issuer} ({doc.jurisdiction})
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                            doc.isCurrent
                              ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                              : 'bg-amber-50 border border-amber-200 text-amber-800'
                          }`}
                        >
                          {doc.isCurrent ? 'Current Official Label' : 'Superseded (Quarantined)'}
                        </span>
                        <span className="text-slate-500">Ver: {doc.version}</span>
                      </div>

                      <h3 className="text-sm font-bold text-slate-900 font-sans">{doc.title}</h3>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 font-mono">
                        <span>Formulation: <strong className="text-slate-900">{doc.formulation}</strong></span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Hash className="w-3 h-3 text-slate-400" />
                          <span>Hash: {doc.contentHash.slice(0, 12)}...</span>
                        </span>
                        <span>•</span>
                        <span>Effective: {doc.effectiveDate}</span>
                      </div>
                    </div>

                    {/* Right Side Action Controls */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => onToggleDocActive(doc.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                          doc.isActiveInCorpus
                            ? 'bg-emerald-50 border border-emerald-300 text-emerald-800 hover:bg-emerald-100'
                            : 'bg-rose-50 border border-rose-300 text-rose-800 hover:bg-rose-100'
                        }`}
                        title="Toggle active status in search index to test missing evidence abstention"
                      >
                        {doc.isActiveInCorpus ? (
                          <>
                            <ToggleRight className="w-4 h-4 text-emerald-600" />
                            <span>Active Index</span>
                          </>
                        ) : (
                          <>
                            <ToggleLeft className="w-4 h-4 text-rose-600" />
                            <span>Disabled (Test Abstain)</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => setSelectedDocId(isSelected ? null : doc.id)}
                        className="text-xs px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold transition-colors border border-slate-200 font-sans cursor-pointer shadow-2xs"
                      >
                        {isSelected ? 'Hide Chunks' : `Chunks (${docChunks.length})`}
                      </button>

                      <a
                        href={doc.canonicalUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 transition-colors border border-slate-200 cursor-pointer shadow-2xs"
                        title="Open Official Source Document URL"
                      >
                        <ExternalLink className="w-4 h-4 text-slate-500" />
                      </a>
                    </div>
                  </div>

                  {/* Chunks Tree Accordion */}
                  {isSelected && (
                    <div className="mt-4 pt-4 border-t border-slate-100 space-y-3 animate-fade-in">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-2 font-mono">
                        <FileText className="w-3.5 h-3.5 text-blue-600" />
                        <span>FAISS Vector Chunks ({docChunks.length})</span>
                      </h4>

                      <div className="grid grid-cols-1 gap-2.5">
                        {docChunks.map((chunk) => (
                          <div key={chunk.id} className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-1.5">
                            <div className="flex items-center justify-between text-xs font-mono">
                              <span className="font-bold text-blue-800">{chunk.id}</span>
                              <span className="text-slate-500">{chunk.pageLocator}</span>
                            </div>
                            <h5 className="text-xs font-bold text-slate-900 font-sans">{chunk.sectionTitle}</h5>
                            <p className="text-xs text-slate-800 font-mono leading-relaxed bg-white p-2.5 rounded border border-slate-200">
                              "{chunk.content}"
                            </p>
                            <div className="flex flex-wrap gap-1 text-[10px] font-mono">
                              {chunk.keywords.map((kw, i) => (
                                <span key={i} className="px-1.5 py-0.5 rounded bg-slate-200/60 text-slate-700 border border-slate-200">
                                  #{kw}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Approved Starting Corpus */}
      {activeTab === 'approved_sources' && (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4 shadow-2xs">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4.5 h-4.5 text-blue-600" />
              Approved Starting Corpus & Canonical URLs (Section 2.4 / Table 2.4)
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              These 6 canonical sources comprise the allow-listed corpus baseline. The ingestion pipeline tracks updates and displays the refresh timestamp.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
                <thead className="bg-slate-100 text-slate-700 font-mono text-[11px]">
                  <tr>
                    <th className="p-3 border-b border-slate-200">Authority</th>
                    <th className="p-3 border-b border-slate-200">Scope</th>
                    <th className="p-3 border-b border-slate-200">Evidentiary Use</th>
                    <th className="p-3 border-b border-slate-200">Canonical URL</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {APPROVED_STARTING_CORPUS.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 font-bold text-slate-900 font-mono text-xs">{item.authority}</td>
                      <td className="p-3 text-slate-800">{item.scope}</td>
                      <td className="p-3 text-slate-600">{item.use}</td>
                      <td className="p-3 font-mono text-blue-600">
                        <a href={item.canonicalUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline">
                          <span className="truncate max-w-[200px]">{item.canonicalUrl}</span>
                          <ExternalLink className="w-3 h-3 shrink-0" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: 14 Metadata Fields */}
      {activeTab === 'metadata_schema' && (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4 shadow-2xs">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-4.5 h-4.5 text-blue-600" />
              14 Required Document Metadata Fields (Section 2.3 / Table 2.3)
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every document in the corpus must maintain these 14 normalized fields to ensure complete provenance, versioning, and jurisdiction isolation.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {REQUIRED_METADATA_FIELDS.map((f, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-xs text-blue-800">{f.field}</span>
                    <span className="text-[10px] font-mono bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded border border-blue-200">Field #{idx + 1}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{f.meaning}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
