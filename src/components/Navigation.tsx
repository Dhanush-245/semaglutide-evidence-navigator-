import React from 'react';
import { Search, Database, ShieldAlert, BarChart3, Layers, GitBranch } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'navigator', label: 'Search & Evidence', icon: Search, count: 'Ask AI' },
    { id: 'corpus', label: 'Corpus Registry', icon: Database, count: '12 Docs' },
    { id: 'router', label: 'Safety Policy Engine', icon: ShieldAlert, count: '8 Rules' },
    { id: 'eval', label: 'Accuracy & Benchmark', icon: BarChart3, count: '98.4%' },
    { id: 'adr', label: 'System Guide', icon: Layers, count: 'Docs' },
    { id: 'milestones', label: 'Repo Architecture', icon: GitBranch, count: 'Week 0' },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 px-6 py-1.5 sticky top-[61px] z-30">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer relative ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                    isActive
                      ? 'bg-slate-800 text-blue-300 font-semibold border border-slate-700'
                      : 'bg-slate-100 text-slate-500 border border-slate-200'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="hidden lg:flex items-center gap-2 text-[11px] font-mono text-slate-500">
          <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200">Press <kbd className="font-bold text-slate-700">⌘K</kbd> to search</span>
        </div>
      </div>
    </nav>
  );
};

