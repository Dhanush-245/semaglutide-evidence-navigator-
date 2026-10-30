import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { EvidenceNavigator } from './components/EvidenceNavigator';
import { CorpusLedger } from './components/CorpusLedger';
import { SafetyRouterBench } from './components/SafetyRouterBench';
import { EvaluationSuite } from './components/EvaluationSuite';
import { ArchitectureADR } from './components/ArchitectureADR';
import { RepoMilestonesExplorer } from './components/RepoMilestonesExplorer';
import { ThemeSelectorModal } from './components/ThemeSelector';
import { ProjectDossierModal } from './components/ProjectDossierModal';
import { DocumentMetadata, DocumentChunk, EvidenceResponse, SafetyClassification, EvaluationMetrics, BenchmarkTestCase, HumanReviewScore, Jurisdiction, ProductBrand, AppTheme } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState('navigator');
  const [currentTheme, setCurrentTheme] = useState<AppTheme>('google-ai-studio-light');
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [isDossierOpen, setIsDossierOpen] = useState(false);
  const [documents, setDocuments] = useState<DocumentMetadata[]>([]);
  const [chunks, setChunks] = useState<DocumentChunk[]>([]);
  const [humanReviews, setHumanReviews] = useState<HumanReviewScore[]>([]);

  // Fetch initial corpus metadata
  useEffect(() => {
    fetchCorpus();
  }, []);

  const fetchCorpus = async () => {
    try {
      const res = await fetch('/api/corpus/documents');
      if (res.ok) {
        const data = await res.json();
        setDocuments(data.documents || []);
        setChunks(data.chunks || []);
      }
    } catch (err) {
      console.error('Error fetching corpus:', err);
    }
  };

  const handleRunQuery = async (query: string, jurisdiction: Jurisdiction | 'ALL', product: ProductBrand | 'ALL'): Promise<EvidenceResponse | null> => {
    try {
      const res = await fetch('/api/navigator/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, jurisdiction, product })
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      console.error('Error running navigator query:', err);
    }
    return null;
  };

  const handleRouteQuery = async (query: string): Promise<SafetyClassification | null> => {
    try {
      const res = await fetch('/api/navigator/route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      console.error('Error testing route:', err);
    }
    return null;
  };

  const handleToggleDocActive = async (docId: string, isActive?: boolean) => {
    try {
      const res = await fetch('/api/corpus/toggle-document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ docId, isActive })
      });
      if (res.ok) {
        fetchCorpus(); // Refresh corpus state
      }
    } catch (err) {
      console.error('Error toggling document state:', err);
    }
  };

  const handleRunEval = async (): Promise<{ metrics: EvaluationMetrics; testCases: BenchmarkTestCase[] } | null> => {
    try {
      const res = await fetch('/api/eval/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      console.error('Error running evaluation suite:', err);
    }
    return null;
  };

  const handleSaveHumanReview = async (review: HumanReviewScore) => {
    try {
      const res = await fetch('/api/eval/human-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review)
      });
      if (res.ok) {
        setHumanReviews(prev => [...prev.filter(r => r.testId !== review.testId), review]);
      }
    } catch (err) {
      console.error('Error saving human review:', err);
    }
  };

  const activeDocCount = documents.filter(d => d.isActiveInCorpus).length;

  const themeClasses: Record<AppTheme, string> = {
    'google-ai-studio-light': 'bg-slate-50 text-slate-900',
    'clinical-light': 'bg-slate-100 text-slate-900',
    'warm-paper-light': 'bg-[#fdfbf7] text-stone-900',
    'emerald-mint-light': 'bg-emerald-50/30 text-zinc-900',
    'soft-lavender-light': 'bg-indigo-50/20 text-slate-900'
  };

  return (
    <div className={`min-h-screen ${themeClasses[currentTheme]} flex flex-col font-sans antialiased transition-colors duration-300 selection:bg-blue-600 selection:text-white`}>
      
      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        corpusDocCount={activeDocCount}
        currentTheme={currentTheme}
        onOpenThemeSelector={() => setIsThemeModalOpen(true)}
        onOpenDossier={() => setIsDossierOpen(true)}
      />

      {/* Primary Navigation */}
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* View Contents */}
      <main className="flex-1">
        {activeTab === 'navigator' && (
          <EvidenceNavigator onRunQuery={handleRunQuery} />
        )}

        {activeTab === 'corpus' && (
          <CorpusLedger
            documents={documents}
            chunks={chunks}
            onToggleDocActive={handleToggleDocActive}
          />
        )}

        {activeTab === 'router' && (
          <SafetyRouterBench onRouteQuery={handleRouteQuery} />
        )}

        {activeTab === 'eval' && (
          <EvaluationSuite
            onRunEval={handleRunEval}
            onSaveHumanReview={handleSaveHumanReview}
            humanReviews={humanReviews}
          />
        )}

        {activeTab === 'adr' && (
          <ArchitectureADR />
        )}

        {activeTab === 'milestones' && (
          <RepoMilestonesExplorer />
        )}
      </main>

      {/* Project Specification & PDF Dossier Modal */}
      <ProjectDossierModal
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
      />

      {/* Theme Selection Modal */}
      <ThemeSelectorModal
        currentTheme={currentTheme}
        onSelectTheme={(theme) => {
          setCurrentTheme(theme);
        }}
        isOpen={isThemeModalOpen}
        onClose={() => setIsThemeModalOpen(false)}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 px-6 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Semaglutide/Ozempic Evidence Navigator • Safety-Critical Educational Research Prototype</span>
          <span>FDA/EMA Label Grounded • No Unsubstantiated Parametric Memory Generation</span>
        </div>
      </footer>

    </div>
  );
}
