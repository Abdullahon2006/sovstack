import React, { useState } from 'react';
import { Search, ShieldAlert, AlertTriangle, ExternalLink } from 'lucide-react';
import { GIGAMON_DOSSIERS } from '../../data/gigamons';
import { CATEGORIES } from '../../data/catalog';
import { GigamonParent } from '../../data/types';
import { AppIcon } from '../AppIcon';

export const DossiersPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectedParent, setSelectedParent] = useState<string | null>(null);

  const parentList = Object.keys(GIGAMON_DOSSIERS) as GigamonParent[];

  const filteredDossiers = parentList.filter((parent) => {
    if (selectedParent && selectedParent !== parent) return false;
    if (query.trim()) {
      const q = query.toLowerCase();
      const d = GIGAMON_DOSSIERS[parent];
      const matchName = parent.toLowerCase().includes(q);
      const matchModel = d.revenueModel.toLowerCase().includes(q);
      const matchScope = d.surveillanceScope.toLowerCase().includes(q);
      const matchViolations = d.privacyViolationsHighlight.toLowerCase().includes(q);
      if (!matchName && !matchModel && !matchScope && !matchViolations) return false;
    }
    return true;
  });

  // Collect mainstream apps associated with each parent
  const getAppsForParent = (parent: GigamonParent) => {
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
        <div className="inline-flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-950/40 px-3 py-1 text-xs font-semibold text-red-400">
          <ShieldAlert className="h-3.5 w-3.5" />
          <span>Surveillance Dossiers</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-4xl">
          The Gigamons In Plain Sight
        </h1>
        <p className="mx-auto max-w-2xl text-xs sm:text-sm text-zinc-400 leading-relaxed">
          Detailed corporate surveillance profiles of the tech conglomerates dominating the consumer web: their revenue models, tracking scopes, and documented regulatory privacy penalties.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="pointer-events-none absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search dossier records, fines, or companies..."
            className="w-full rounded-lg border border-zinc-800 bg-zinc-900/90 py-1.5 pl-8 pr-3 text-xs text-zinc-200 placeholder-zinc-500 transition focus:border-zinc-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setSelectedParent(null)}
            className={`rounded-lg px-2.5 py-1 text-xs font-medium transition ${
              selectedParent === null
                ? 'bg-zinc-200 text-black font-semibold'
                : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 border border-zinc-800'
            }`}
          >
            All Monoliths
          </button>
          {parentList.map((p) => (
            <button
              key={p}
              onClick={() => setSelectedParent(selectedParent === p ? null : p)}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition ${
                selectedParent === p
                  ? 'bg-zinc-200 text-black font-semibold'
                  : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 border border-zinc-800'
              }`}
            >
              {p.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Dossier Cards Grid */}
      <div className="space-y-6">
        {filteredDossiers.map((parent) => {
          const d = GIGAMON_DOSSIERS[parent];
          const apps = getAppsForParent(parent);

          return (
            <article
              key={parent}
              className="rounded-xl border border-zinc-800 bg-[#0f1117] p-5 sm:p-6 shadow-lg transition hover:border-zinc-700 space-y-5"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800/80 pb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-lg font-bold"
                    style={{ backgroundColor: `${d.accentColor}25`, color: d.accentColor }}
                  >
                    {parent.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-base font-bold text-white">{parent}</h2>
                      {d.ticker && (
                        <span className="rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] font-mono text-zinc-300">
                          {d.ticker}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-zinc-400">
                      Surveillance Monolith Dossier
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 self-start sm:self-auto">
                  <span className="inline-flex items-center gap-1 rounded bg-red-950/60 border border-red-800/80 px-2 py-0.5 text-[11px] font-semibold text-red-400">
                    <AlertTriangle className="h-3 w-3" />
                    <span>Active Behavioral Harvester</span>
                  </span>
                </div>
              </div>

              {/* Core Intel 3-Column Grid */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 text-xs">
                {/* Revenue Model */}
                <div className="rounded-lg border border-zinc-800/70 bg-zinc-950/60 p-3.5 space-y-1.5">
                  <span className="font-semibold uppercase tracking-wider text-zinc-400 text-[10px]">
                    Revenue Model
                  </span>
                  <p className="text-zinc-300 leading-relaxed">
                    {d.revenueModel}
                  </p>
                </div>

                {/* Surveillance Scope */}
                <div className="rounded-lg border border-zinc-800/70 bg-zinc-950/60 p-3.5 space-y-1.5">
                  <span className="font-semibold uppercase tracking-wider text-zinc-400 text-[10px]">
                    Surveillance Scope
                  </span>
                  <p className="text-zinc-300 leading-relaxed">
                    {d.surveillanceScope}
                  </p>
                </div>

                {/* Documented Violations */}
                <div className="rounded-lg border border-zinc-800/70 bg-zinc-950/60 p-3.5 space-y-1.5">
                  <span className="font-semibold uppercase tracking-wider text-red-400 text-[10px]">
                    Regulatory Penalties & Fines
                  </span>
                  <p className="text-zinc-300 leading-relaxed">
                    {d.privacyViolationsHighlight}
                  </p>
                </div>
              </div>

              {/* Tracked Applications */}
              {apps.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-zinc-800/60">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                    Consumer Apps Ingested By This Monolith ({apps.length})
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {apps.map((app) => (
                      <span
                        key={app.id}
                        className="inline-flex items-center gap-1.5 rounded-md border border-zinc-800 bg-zinc-900/90 px-2 py-1 text-xs text-zinc-300"
                      >
                        <AppIcon appId={app.id} name={app.name} size={14} />
                        <span>{app.name}</span>
                        <span className="text-[10px] text-zinc-500 font-mono">({app.category})</span>
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
