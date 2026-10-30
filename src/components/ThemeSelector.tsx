import React from 'react';
import { Palette, Check, Sparkles, Sun, Moon, Eye, Shield } from 'lucide-react';
import { AppTheme } from '../types';

export interface ThemeOption {
  id: AppTheme;
  name: string;
  tagline: string;
  isDark: boolean;
  accentColor: string;
  badgeBg: string;
  badgeText: string;
  previewBg: string;
  previewCardBg: string;
  previewText: string;
  swatches: string[];
  description: string;
}

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'google-ai-studio-light',
    name: '1. Google AI Studio (Clean Light)',
    tagline: 'Official Google AI White & Gemini Gradient',
    isDark: false,
    accentColor: 'indigo',
    badgeBg: 'bg-indigo-50 border-indigo-200',
    badgeText: 'text-indigo-700',
    previewBg: 'bg-slate-50 border-slate-200',
    previewCardBg: 'bg-white',
    previewText: 'text-slate-900',
    swatches: ['#ffffff', '#f8fafc', '#1a73e8', '#8b5cf6'],
    description: 'Crisp white canvas featuring official Google Blue (#1a73e8), Gemini gradient accents, and sharp high-contrast typography.'
  },
  {
    id: 'clinical-light',
    name: '2. Clean Clinical (Medical White & Cyan)',
    tagline: 'Hospital-Grade White & Medical Cyan',
    isDark: false,
    accentColor: 'cyan',
    badgeBg: 'bg-cyan-50 border-cyan-200',
    badgeText: 'text-cyan-800',
    previewBg: 'bg-slate-50 border-slate-200',
    previewCardBg: 'bg-white',
    previewText: 'text-slate-900',
    swatches: ['#f8fafc', '#ffffff', '#0284c7', '#0891b2'],
    description: 'Clean hospital-grade medical light layout with high-contrast slate body text and bright cyan highlights.'
  },
  {
    id: 'warm-paper-light',
    name: '3. Warm Paper & Amber (Eye-Comfort Light)',
    tagline: 'Soft Cream Canvas & Warm Amber Highlights',
    isDark: false,
    accentColor: 'amber',
    badgeBg: 'bg-amber-50 border-amber-200',
    badgeText: 'text-amber-800',
    previewBg: 'bg-[#fdfbf7] border-amber-200/60',
    previewCardBg: 'bg-white',
    previewText: 'text-stone-900',
    swatches: ['#fdfbf7', '#ffffff', '#d97706', '#f59e0b'],
    description: 'Warm cream-tinted paper background with gentle amber accents for comfortable reading during extended research.'
  },
  {
    id: 'emerald-mint-light',
    name: '4. Fresh Mint & Emerald Light',
    tagline: 'Light Mint Canvas & Forest Emerald',
    isDark: false,
    accentColor: 'emerald',
    badgeBg: 'bg-emerald-50 border-emerald-200',
    badgeText: 'text-emerald-800',
    previewBg: 'bg-emerald-50/40 border-emerald-100',
    previewCardBg: 'bg-white',
    previewText: 'text-zinc-900',
    swatches: ['#f0fdf4', '#ffffff', '#059669', '#10b981'],
    description: 'Refreshing light mint theme with forest emerald buttons and crisp dark zinc text.'
  },
  {
    id: 'soft-lavender-light',
    name: '5. Soft Lilac & Royal Indigo Light',
    tagline: 'Soft Lilac Tint & Royal Indigo',
    isDark: false,
    accentColor: 'indigo',
    badgeBg: 'bg-indigo-50 border-indigo-200',
    badgeText: 'text-indigo-800',
    previewBg: 'bg-indigo-50/30 border-indigo-100',
    previewCardBg: 'bg-white',
    previewText: 'text-slate-900',
    swatches: ['#f5f3ff', '#ffffff', '#4f46e5', '#6366f1'],
    description: 'Gentle lilac-tinted background with royal indigo accents and clean dark slate typography.'
  }
];

interface ThemeSelectorProps {
  currentTheme: AppTheme;
  onSelectTheme: (theme: AppTheme) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const ThemeSelectorModal: React.FC<ThemeSelectorProps> = ({
  currentTheme,
  onSelectTheme,
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-4xl w-full p-6 space-y-6 shadow-2xl relative animate-in fade-in zoom-in duration-200">
        
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-slate-200 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-blue-50 text-blue-600 border border-blue-200">
                <Palette className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                Select Your Light Colour Theme
              </h2>
            </div>
            <p className="text-xs text-slate-600">
              Choose from 5 clean, bright light themes. Click any theme below to instantly customize your view!
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg p-2 text-xs font-semibold transition-colors"
          >
            ✕ Close
          </button>
        </div>

        {/* Theme Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {THEME_OPTIONS.map((theme) => {
            const isSelected = currentTheme === theme.id;
            return (
              <div
                key={theme.id}
                onClick={() => {
                  onSelectTheme(theme.id);
                }}
                className={`group relative cursor-pointer rounded-xl border p-4 transition-all duration-200 ${
                  isSelected
                    ? 'border-blue-600 ring-2 ring-blue-500/20 bg-blue-50/40 shadow-md'
                    : 'border-slate-200 hover:border-blue-300 bg-white hover:bg-slate-50'
                }`}
              >
                {/* Active Tag */}
                {isSelected && (
                  <span className="absolute top-3 right-3 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-600 text-white shadow-xs">
                    <Check className="w-3 h-3" /> Selected
                  </span>
                )}

                {/* Theme Name & Tagline */}
                <div className="space-y-1 pr-16">
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {theme.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {theme.tagline}
                  </p>
                </div>

                {/* Swatches Bar */}
                <div className="my-3 flex items-center gap-2">
                  <span className="text-[10px] text-slate-500 font-mono uppercase">Palette:</span>
                  <div className="flex items-center gap-1.5 p-1 rounded-lg bg-slate-100 border border-slate-200">
                    {theme.swatches.map((color, idx) => (
                      <div
                        key={idx}
                        className="w-4 h-4 rounded-full border border-slate-300 shadow-xs"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                  <span className="ml-auto text-[10px] text-amber-700 font-semibold flex items-center gap-1 font-mono">
                    <Sun className="w-3 h-3 text-amber-500" /> Light Theme
                  </span>
                </div>

                {/* Live Mini Preview Box */}
                <div className={`p-3 rounded-lg border text-xs space-y-2 ${theme.previewBg}`}>
                  <div className={`p-2 rounded border flex items-center justify-between text-[11px] ${theme.previewCardBg}`}>
                    <span className={theme.previewText}>Sample Medical Document</span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded border ${theme.badgeBg} ${theme.badgeText}`}>
                      FDA Verified
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-600 leading-tight">
                    {theme.description}
                  </p>
                </div>

                {/* Selection Action */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectTheme(theme.id);
                  }}
                  className={`mt-3 w-full text-xs font-semibold py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                    isSelected
                      ? 'bg-blue-600 text-white font-bold shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Active Theme</span>
                    </>
                  ) : (
                    <span>Apply This Theme</span>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Click any light theme card above to select it for your entire workspace.</span>
          </div>
          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-lg transition-colors shadow-xs"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
