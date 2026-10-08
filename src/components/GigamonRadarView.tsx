import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { CATEGORIES } from '../data/catalog';
import { GIGAMON_DOSSIERS } from '../data/gigamons';
import { GigamonParent, PackSelection } from '../data/types';

interface GigamonRadarViewProps {
  selections: PackSelection;
  onFilterByParent: (parentName: string) => void;
}

export const GigamonRadarView: React.FC<GigamonRadarViewProps> = ({
  selections,
  onFilterByParent,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Group mainstream apps by parent and check eviction status
  const gigamonStatus = React.useMemo(() => {
    const parents: Record<
      GigamonParent,
      { totalApps: number; replacedApps: number; apps: { catName: string; appName: string; isReplaced: boolean }[] }
    > = {
      'Google (Alphabet)': { totalApps: 0, replacedApps: 0, apps: [] },
      'Meta (Facebook)': { totalApps: 0, replacedApps: 0, apps: [] },
      'Microsoft': { totalApps: 0, replacedApps: 0, apps: [] },
      'Apple': { totalApps: 0, replacedApps: 0, apps: [] },
      'Amazon': { totalApps: 0, replacedApps: 0, apps: [] },
      'ByteDance': { totalApps: 0, replacedApps: 0, apps: [] },
      'OpenAI': { totalApps: 0, replacedApps: 0, apps: [] },
      'Adobe': { totalApps: 0, replacedApps: 0, apps: [] },
      'Commercial Data Brokers': { totalApps: 0, replacedApps: 0, apps: [] },
      'Other Monoliths': { totalApps: 0, replacedApps: 0, apps: [] },
    };

    CATEGORIES.forEach((cat) => {
      cat.mainstreamApps.forEach((app) => {
        const parentKey = app.parent;
        if (!parents[parentKey]) return;

        parents[parentKey].totalApps++;
        const sel = selections[cat.id];
        const isReplaced = sel ? sel.mainstreamId === app.id && sel.alternativeIds.length > 0 : false;
        if (isReplaced) {
          parents[parentKey].replacedApps++;
        }

        parents[parentKey].apps.push({
          catName: cat.name,
          appName: app.name,
          isReplaced,
        });
      });
    });

    return parents;
  }, [selections]);

  const majorGigamons: GigamonParent[] = [
    'Google (Alphabet)',
    'Meta (Facebook)',
    'Microsoft',
    'Apple',
    'Amazon',
    'ByteDance',
    'OpenAI',
  ];

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#0d121c]/80 p-5 shadow-lg backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <ShieldAlert className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">
              Gigamons Eviction Matrix
            </h3>
            <p className="text-xs text-slate-400">
              Live tracking of your decoupling from surveillance conglomerates
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1 text-xs text-slate-300 hover:bg-slate-800"
        >
          <span>{isExpanded ? 'Collapse' : 'Inspect Matrix'}</span>
          {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
        </button>
      </div>

      {/* Quick Pills Overview */}
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
        {majorGigamons.map((parent) => {
          const stats = gigamonStatus[parent];
          const dossier = GIGAMON_DOSSIERS[parent];
          const isEvicted = stats.replacedApps > 0 && stats.replacedApps >= stats.totalApps;
          const isPartiallyReplaced = stats.replacedApps > 0 && stats.replacedApps < stats.totalApps;

          return (
            <div
              key={parent}
              className={`flex flex-col justify-between rounded-xl border p-2.5 transition text-left ${
                isEvicted
                  ? 'border-emerald-500/40 bg-emerald-950/20 text-emerald-200'
                  : isPartiallyReplaced
                  ? 'border-amber-500/40 bg-amber-950/20 text-amber-200'
                  : 'border-slate-800 bg-slate-900/40 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold truncate">{parent.split(' ')[0]}</span>
                {isEvicted ? (
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                ) : (
                  <span className="text-[10px] font-mono font-semibold">
                    {stats.replacedApps}/{stats.totalApps}
                  </span>
                )}
              </div>

              <div className="mt-2 text-[10px]">
                {isEvicted ? (
                  <span className="font-semibold text-emerald-400">100% Evicted</span>
                ) : isPartiallyReplaced ? (
                  <span className="font-semibold text-amber-400">
                    {Math.round((stats.replacedApps / stats.totalApps) * 100)}% Replaced
                  </span>
                ) : (
                  <span className="text-slate-500">Unmitigated</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Expanded Breakdown */}
      {isExpanded && (
        <div className="mt-5 border-t border-slate-800/80 pt-4 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {majorGigamons.map((parent) => {
              const stats = gigamonStatus[parent];
              const dossier = GIGAMON_DOSSIERS[parent];
              return (
                <div
                  key={parent}
                  className="rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 text-xs"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="font-bold text-white">{parent}</span>
                    <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] font-mono text-slate-300">
                      {stats.replacedApps}/{stats.totalApps} Reclaimed
                    </span>
                  </div>
                  <p className="mt-2 text-[11px] text-slate-400 line-clamp-2">
                    {dossier.surveillanceScope}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {stats.apps.map((a, i) => (
                      <span
                        key={i}
                        className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${
                          a.isReplaced
                            ? 'bg-emerald-900/40 text-emerald-300 border border-emerald-800/40'
                            : 'bg-rose-950/40 text-rose-300 border border-rose-900/40 line-through'
                        }`}
                      >
                        {a.appName}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
