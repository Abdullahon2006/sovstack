import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, ChevronDown, ChevronUp } from 'lucide-react';
import { CATEGORIES } from '../data/catalog';
import { VENDOR_DOSSIERS } from '../data/dossiers';
import { VendorParent, PackSelection } from '../data/types';

interface VendorRadarViewProps {
  selections: PackSelection;
  onFilterByParent: (parentName: string) => void;
}

export const VendorRadarView: React.FC<VendorRadarViewProps> = ({
  selections,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Group mainstream apps by parent and check eviction status
  const vendorStatus = React.useMemo(() => {
    const parents: Record<
      VendorParent,
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

  const majorVendors: VendorParent[] = [
    'Google (Alphabet)',
    'Meta (Facebook)',
    'Microsoft',
    'Apple',
    'Amazon',
    'ByteDance',
    'OpenAI',
  ];

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white dark:border-slate-800 dark:bg-[#0d121c]/80 p-5 shadow-sm dark:shadow-lg backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-50 text-rose-600 border border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20">
            <ShieldAlert className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
              Big Tech Eviction Matrix
            </h3>
            <p className="text-xs text-zinc-500 dark:text-slate-400">
              Live tracking of your decoupling from surveillance conglomerates
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-700 hover:bg-zinc-100 dark:border-slate-800 dark:bg-slate-900 px-2.5 py-1 text-xs dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <span>{isExpanded ? 'Collapse' : 'Inspect Matrix'}</span>
          {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
        </button>
      </div>

      {/* Quick Pills Overview */}
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
        {majorVendors.map((parent) => {
          const stats = vendorStatus[parent];
          const isEvicted = stats.replacedApps > 0 && stats.replacedApps >= stats.totalApps;
          const isPartiallyReplaced = stats.replacedApps > 0 && stats.replacedApps < stats.totalApps;

          return (
            <div
              key={parent}
              className={`flex flex-col justify-between rounded-xl border p-2.5 transition text-left ${
                isEvicted
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-500/40 dark:bg-emerald-950/20 dark:text-emerald-200'
                  : isPartiallyReplaced
                  ? 'border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-500/40 dark:bg-amber-950/20 dark:text-amber-200'
                  : 'border-zinc-200 bg-zinc-50 text-zinc-600 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold truncate">{parent.split(' ')[0]}</span>
                {isEvicted ? (
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <span className="text-[10px] font-mono font-semibold">
                    {stats.replacedApps}/{stats.totalApps}
                  </span>
                )}
              </div>

              <div className="mt-2 text-[10px]">
                {isEvicted ? (
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">100% Evicted</span>
                ) : isPartiallyReplaced ? (
                  <span className="font-semibold text-amber-600 dark:text-amber-400">
                    {Math.round((stats.replacedApps / stats.totalApps) * 100)}% Replaced
                  </span>
                ) : (
                  <span className="text-zinc-500 dark:text-slate-500">Unmitigated</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Expanded Breakdown */}
      {isExpanded && (
        <div className="mt-5 border-t border-zinc-200 dark:border-slate-800/80 pt-4 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {majorVendors.map((parent) => {
              const stats = vendorStatus[parent];
              const dossier = VENDOR_DOSSIERS[parent];
              return (
                <div
                  key={parent}
                  className="rounded-xl border border-zinc-200 bg-zinc-50 dark:border-slate-800 dark:bg-slate-900/60 p-3.5 text-xs"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-slate-800">
                    <span className="font-bold text-zinc-900 dark:text-white">{parent}</span>
                    <span className="rounded bg-zinc-200 text-zinc-700 dark:bg-slate-800 px-1.5 py-0.5 text-[10px] font-mono dark:text-slate-300">
                      {stats.replacedApps}/{stats.totalApps} Reclaimed
                    </span>
                  </div>
                  <p className="mt-2 text-[11px] text-zinc-600 dark:text-slate-400 line-clamp-2">
                    {dossier.surveillanceScope}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {stats.apps.map((a, i) => (
                      <span
                        key={i}
                        className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${
                          a.isReplaced
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300 dark:border-emerald-800/40'
                            : 'bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-900/40 line-through'
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
