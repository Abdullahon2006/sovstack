import React, { useState } from 'react';
import { Search, ShieldAlert, AlertTriangle } from 'lucide-react';
import { VENDOR_DOSSIERS } from '../../data/dossiers';
import { CATEGORIES } from '../../data/catalog';
import { VendorParent } from '../../data/types';
import { AppIcon } from '../AppIcon';

export const DossiersPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectedParent, setSelectedParent] = useState<string | null>(null);

  const parentList = Object.keys(VENDOR_DOSSIERS) as VendorParent[];

  const filteredDossiers = parentList.filter((parent) => {
    if (selectedParent && selectedParent !== parent) return false;
    if (query.trim()) {
      const q = query.toLowerCase();
      const d = VENDOR_DOSSIERS[parent];
      const matchName = parent.toLowerCase().includes(q);
      const matchModel = d.revenueModel.toLowerCase().includes(q);
      const matchScope = d.surveillanceScope.toLowerCase().includes(q);
      const matchViolations = d.privacyViolationsHighlight.toLowerCase().includes(q);
      if (!matchName && !matchModel && !matchScope && !matchViolations) return false;
    }
    return true;
  });

  // Collect mainstream apps associated with each parent
  const getAppsForParent = (parent: VendorParent) => {
    const apps: { id: string; name: string; category: string }[] = [];
    CATEGORIES.forEach((cat) => {
      cat.mainstreamApps.forEach((m) => {
        if (m.parent === parent) {
          apps.push({ id: m.id, name: m.name, category: cat.name });
        }
      });
    });
    return apps;
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 text-red-700 dark:border-red-500/30 dark:bg-red-950/40 px-3 py-1 text-xs font-semibold dark:text-red-400">
          <ShieldAlert className="h-3.5 w-3.5" />
          <span>Big Tech Profiles</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
          Big Tech Surveillance Profiles
        </h1>
        <p className="mx-auto max-w-2xl text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Detailed corporate surveillance profiles of major tech platforms: their revenue models, tracking scopes, and documented regulatory privacy penalties.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 dark:text-zinc-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search dossier records, fines, or companies..."
            className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-10 pr-4 text-sm text-zinc-900 placeholder-zinc-400 focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900/90 dark:text-zinc-200 dark:placeholder-zinc-500 transition dark:focus:border-zinc-500 focus:outline-none"
          />
        </div>

        <div className="relative">
          <select
            aria-label="Filter by company"
            value={selectedParent || ''}
            onChange={(e) => setSelectedParent(e.target.value || null)}
            className="w-full sm:w-auto appearance-none rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 pr-9 text-sm font-medium text-zinc-700 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/90 dark:text-zinc-300 transition dark:hover:border-zinc-700 focus:border-zinc-400 dark:focus:border-zinc-500 focus:outline-none cursor-pointer"
          >
            <option value="">All Companies ({parentList.length})</option>
            {parentList.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 text-xs">
            ▾
          </div>
        </div>
      </div>

      {/* Dossier Cards Grid */}
      <div className="space-y-6">
        {filteredDossiers.map((parent) => {
          const d = VENDOR_DOSSIERS[parent];
          const apps = getAppsForParent(parent);

          return (
            <article
              key={parent}
              className="rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-[#0f1117] p-6 sm:p-7 shadow-sm dark:shadow-lg transition hover:border-zinc-300 dark:hover:border-zinc-700 space-y-6"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800/80 pb-5">
                <div className="flex items-center gap-3.5">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl text-xl font-bold shadow-sm"
                    style={{ backgroundColor: `${d.accentColor}25`, color: d.accentColor }}
                  >
                    {parent.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold text-zinc-900 dark:text-white">{parent}</h2>
                      {d.ticker && (
                        <span className="rounded-md bg-zinc-100 text-zinc-700 dark:bg-zinc-800 px-2 py-0.5 text-xs font-mono dark:text-zinc-300">
                          {d.ticker}
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-zinc-500 dark:text-zinc-400">
                      Corporate Surveillance Profile
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 self-start sm:self-auto">
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-red-50 border border-red-200 text-red-700 dark:bg-red-950/60 dark:border-red-800/80 px-2.5 py-1 text-xs font-semibold dark:text-red-400 whitespace-nowrap">
                    <AlertTriangle className="h-3.5 w-3.5" />
                    <span>Data Collector</span>
                  </span>
                </div>
              </div>

              {/* Core Intel 3-Column Grid */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 text-sm">
                {/* Revenue Model */}
                <div className="rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800/70 dark:bg-zinc-950/60 p-4 space-y-2">
                  <span className="font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 text-xs">
                    Revenue Model
                  </span>
                  <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    {d.revenueModel}
                  </p>
                </div>

                {/* Surveillance Scope */}
                <div className="rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800/70 dark:bg-zinc-950/60 p-4 space-y-2">
                  <span className="font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 text-xs">
                    Surveillance Scope
                  </span>
                  <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    {d.surveillanceScope}
                  </p>
                </div>

                {/* Documented Violations */}
                <div className="rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800/70 dark:bg-zinc-950/60 p-4 space-y-2">
                  <span className="font-semibold uppercase tracking-wider text-red-600 dark:text-red-400 text-xs">
                    Regulatory Penalties & Fines
                  </span>
                  <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    {d.privacyViolationsHighlight}
                  </p>
                </div>
              </div>

              {/* Tracked Applications */}
              {apps.length > 0 && (
                <div className="space-y-2.5 pt-3 border-t border-zinc-200 dark:border-zinc-800/60">
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    Consumer Apps Ingested By This Monolith ({apps.length})
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    {apps.map((app) => (
                      <span
                        key={app.id}
                        className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900/90 px-3 py-1.5 text-sm dark:text-zinc-200"
                      >
                        <AppIcon appId={app.id} name={app.name} size={20} />
                        <span>{app.name}</span>
                        <span className="text-xs text-zinc-500 font-mono">({app.category})</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
};
