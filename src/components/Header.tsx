import React from 'react';
import { ShieldCheck, BookOpen, ShieldAlert, Palette, FileText, Printer } from 'lucide-react';
import { AppTheme } from '../types';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  corpusDocCount: number;
  currentTheme: AppTheme;
  onOpenThemeSelector: () => void;
  onOpenDossier: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  corpusDocCount,
  currentTheme,
  onOpenThemeSelector,
  onOpenDossier
}) => {
  const themeShortNames: Record<AppTheme, string> = {
    'google-ai-studio-light': 'Studio Light',
    'clinical-light': 'Clinical Light',
    'warm-paper-light': 'Warm Journal',
    'emerald-mint-light': 'Mint & Emerald',
    'soft-lavender-light': 'Soft Lilac'
  };

  return (
    <header className="bg-white border-b border-slate-200 text-slate-800 px-6 py-3.5 sticky top-0 z-40 shadow-2xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        
        {/* Brand Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white font-bold text-lg shadow-xs ring-1 ring-slate-900/10">
            <ShieldCheck className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-lg font-extrabold tracking-tight text-slate-900 font-sans">
                Semaglutide Evidence Navigator
              </h1>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-mono font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                v2.4 Grounded
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
              <span>FDA & EMA Official Label Registry</span>
              <span className="text-slate-300">•</span>
              <span>NEJM / STEP / FLOW Trial Citation Engine</span>
            </p>
          </div>
        </div>

        {/* System Status Indicators & Actions */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-50 border border-slate-200 text-slate-700 font-mono text-[11px]">
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            <span>Library: <strong className="text-slate-900 font-bold">{corpusDocCount} Docs</strong></span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-50 border border-slate-200 text-slate-700 font-mono text-[11px]">
            <ShieldAlert className="w-3.5 h-3.5 text-emerald-600" />
            <span>Safety: <strong className="text-slate-900 font-bold">8 Rules Active</strong></span>
          </div>

          {/* Dossier & PDF Export Button */}
          <button
            onClick={onOpenDossier}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-800 font-sans font-semibold text-xs transition-all shadow-2xs cursor-pointer"
            title="Open Project Specification Dossier & Export to PDF"
          >
            <FileText className="w-3.5 h-3.5 text-blue-600" />
            <span>PDF Dossier</span>
          </button>

          {/* Theme Selector Button */}
          <button
            onClick={onOpenThemeSelector}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-sans font-medium text-xs transition-all shadow-2xs group cursor-pointer"
            title="Switch visual theme"
          >
            <Palette className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-600 transition-colors" />
            <span>Theme: <strong className="text-slate-900 font-semibold">{themeShortNames[currentTheme]}</strong></span>
          </button>
        </div>

      </div>
    </header>
  );
};

