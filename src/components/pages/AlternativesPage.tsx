import React, { useState, useMemo } from 'react';
import { Search, ExternalLink, ShieldCheck, Filter } from 'lucide-react';
import { CATEGORIES } from '../../data/catalog';
import { PrivacyBadge, PrivacyAlternative } from '../../data/types';
import { AppIcon } from '../AppIcon';

interface AlternativesPageProps {
  onSelectAlternativeForCategory?: (categoryId: string, altId: string) => void;
  onNavigateToBuilder?: () => void;
}

const BADGES: PrivacyBadge[] = [
  'FOSS',
  'E2EE',
  'Self-Hostable',
  'Zero-Knowledge',
  'Audited',
  'Decentralized',
  'Local-Only',
  'No-Logs',
];

export const AlternativesPage: React.FC<AlternativesPageProps> = ({
  onSelectAlternativeForCategory,
  onNavigateToBuilder,
}) => {
  const [query, setQuery] = useState('');
  const [activeBadge, setActiveBadge] = useState<PrivacyBadge | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Flatten all alternatives with their category metadata
  const allAlternativesWithMeta = useMemo(() => {
    const list: {
      alt: PrivacyAlternative;
      categoryId: string;
      categoryName: string;
      replacesMainstream: string[];
    }[] = [];

    CATEGORIES.forEach((cat) => {
      cat.alternatives.forEach((alt) => {
        list.push({
          alt,
          categoryId: cat.id,
          categoryName: cat.name,
          replacesMainstream: cat.mainstreamApps.map((m) => m.name),
        });
      });
    });

    return list;
  }, []);

  const filteredItems = useMemo(() => {
    return allAlternativesWithMeta.filter(({ alt, categoryId, categoryName, replacesMainstream }) => {
      if (selectedCategory && selectedCategory !== categoryId) return false;

      if (activeBadge && !alt.badges.includes(activeBadge)) return false;

      if (query.trim()) {
        const q = query.toLowerCase();
        const matchName = alt.name.toLowerCase().includes(q);
        const matchDesc = alt.description.toLowerCase().includes(q);
        const matchCat = categoryName.toLowerCase().includes(q);
        const matchReplaces = replacesMainstream.some((m) => m.toLowerCase().includes(q));
        if (!matchName && !matchDesc && !matchCat && !matchReplaces) return false;
      }

      return true;
    });
  }, [allAlternativesWithMeta, selectedCategory, activeBadge, query]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3 py-1 text-xs font-semibold text-emerald-400">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Curated Privacy Index</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-4xl">
          The Privacy Tools Directory
        </h1>
        <p className="mx-auto max-w-2xl text-xs sm:text-sm text-zinc-400 leading-relaxed">
          Explore independent, open-source, and end-to-end encrypted tools across {CATEGORIES.length} categories. Every tool is verified for client data sovereignty.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="space-y-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="pointer-events-none absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tools, categories, or services they replace..."
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900/90 py-1.5 pl-8 pr-3 text-xs text-zinc-200 placeholder-zinc-500 transition focus:border-zinc-500 focus:outline-none"
            />
          </div>

          {/* Category Dropdown */}
          <div className="relative">
            <select
              aria-label="Filter by category"
              value={selectedCategory || ''}
              onChange={(e) => setSelectedCategory(e.target.value || null)}
              className="appearance-none rounded-lg border border-zinc-800 bg-zinc-900/90 px-3 py-1.5 pr-7 text-xs font-medium text-zinc-300 transition hover:border-zinc-700 focus:border-zinc-500 focus:outline-none cursor-pointer"
            >
              <option value="">All Categories ({CATEGORIES.length})</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-2.5 top-2.5 text-zinc-500 text-[10px]">
              ▾
            </div>
          </div>
        </div>

        {/* Badge Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <button
            onClick={() => setActiveBadge(null)}
            className={`rounded-lg px-2.5 py-1 text-xs font-medium transition ${
              activeBadge === null
                ? 'bg-zinc-200 text-black font-semibold'
                : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 border border-zinc-800'
            }`}
          >
            All Badges
          </button>
          {BADGES.map((b) => (
            <button
              key={b}
              onClick={() => setActiveBadge(activeBadge === b ? null : b)}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition ${
                activeBadge === b
                  ? 'bg-zinc-200 text-black font-semibold'
                  : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 border border-zinc-800'
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map(({ alt, categoryId, categoryName, replacesMainstream }) => (
          <div
            key={`${categoryId}-${alt.id}`}
            className="flex flex-col justify-between rounded-xl border border-zinc-800 bg-[#0f1117] p-4 transition hover:border-zinc-700 shadow-sm"
          >
            <div className="space-y-2.5">
              {/* Category Eyebrow & Badges */}
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-semibold uppercase tracking-wider text-zinc-500">
                  {categoryName}
                </span>
                <div className="flex items-center gap-1">
                  {alt.badges.slice(0, 2).map((b) => (
                    <span
                      key={b}
                      className="rounded bg-zinc-900 px-1.5 py-0.5 text-[9px] font-medium text-emerald-400 border border-zinc-800"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>

              {/* Title & App Icon */}
              <div className="flex items-center gap-2.5">
                <AppIcon appId={alt.id} name={alt.name} size={28} />
                <div className="min-w-0 flex-1">
                  <h2 className="text-sm font-bold text-white truncate">{alt.name}</h2>
                  <p className="text-[10px] text-zinc-500 truncate">
                    Replaces {replacesMainstream.slice(0, 2).join(', ')}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                {alt.description}
              </p>
            </div>

            {/* Actions Footer */}
            <div className="mt-4 flex items-center justify-between border-t border-zinc-800/80 pt-3">
              <a
                href={alt.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-zinc-400 hover:text-white transition"
              >
                <span>Official Site</span>
                <ExternalLink className="h-3 w-3" />
              </a>

              {onSelectAlternativeForCategory && onNavigateToBuilder && (
                <button
                  onClick={() => {
                    onSelectAlternativeForCategory(categoryId, alt.id);
                    onNavigateToBuilder();
                  }}
                  className="rounded-lg bg-zinc-800 hover:bg-zinc-700 px-2.5 py-1 text-xs font-semibold text-zinc-200 transition"
                >
                  Use in Stack
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
