import React, { useState, useMemo } from 'react';
import { Search, ExternalLink, ShieldCheck } from 'lucide-react';
import { CATEGORIES } from '../../data/catalog';
import { PrivacyAlternative } from '../../data/types';
import { AppIcon } from '../AppIcon';

interface AlternativesPageProps {
  onSelectAlternativeForCategory?: (categoryId: string, altId: string) => void;
  onNavigateToBuilder?: () => void;
}

export const AlternativesPage: React.FC<AlternativesPageProps> = ({
  onSelectAlternativeForCategory,
  onNavigateToBuilder,
}) => {
  const [query, setQuery] = useState('');
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
  }, [allAlternativesWithMeta, selectedCategory, query]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-950/40 px-3 py-1 text-xs font-semibold dark:text-emerald-400">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Curated Privacy Index</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
          The Privacy Tools Directory
        </h1>
        <p className="mx-auto max-w-2xl text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Explore independent, open-source, and end-to-end encrypted tools across {CATEGORIES.length} categories. Every tool is verified for client data sovereignty.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="space-y-3.5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 dark:text-zinc-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tools, categories, or services they replace..."
              className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-10 pr-4 text-sm text-zinc-900 placeholder-zinc-400 focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900/90 dark:text-zinc-200 dark:placeholder-zinc-500 transition dark:focus:border-zinc-500 focus:outline-none"
            />
          </div>

          {/* Category Dropdown */}
          <div className="relative">
            <select
              aria-label="Filter by category"
              value={selectedCategory || ''}
              onChange={(e) => setSelectedCategory(e.target.value || null)}
              className="w-full sm:w-auto appearance-none rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 pr-9 text-sm font-medium text-zinc-700 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/90 dark:text-zinc-300 transition dark:hover:border-zinc-700 focus:border-zinc-400 dark:focus:border-zinc-500 focus:outline-none cursor-pointer"
            >
              <option value="">All Categories ({CATEGORIES.length})</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 text-xs">
              ▾
            </div>
          </div>
        </div>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map(({ alt, categoryId, categoryName, replacesMainstream }) => (
          <div
            key={`${categoryId}-${alt.id}`}
            className="flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white hover:border-zinc-300 dark:border-zinc-800 dark:bg-[#0f1117] p-5 transition dark:hover:border-zinc-700 shadow-xs dark:shadow-sm"
          >
            <div className="space-y-3">
              {/* Category Eyebrow & Badges */}
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 truncate">
                  {categoryName}
                </span>
                <div className="flex items-center gap-1.5 shrink-0">
                  {alt.badges.slice(0, 2).map((b) => (
                    <span
                      key={b}
                      className="whitespace-nowrap rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-zinc-900 px-2 py-0.5 text-[10px] sm:text-xs font-medium dark:text-emerald-400 dark:border-zinc-800"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>

              {/* Title & App Icon */}
              <div className="flex items-center gap-3">
                <div className="shrink-0 flex items-center justify-center">
                  <AppIcon appId={alt.id} name={alt.name} size={36} />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-base font-bold text-zinc-900 dark:text-white truncate">{alt.name}</h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                    Replaces {replacesMainstream.slice(0, 2).join(', ')}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-zinc-600 dark:text-zinc-300 line-clamp-3 leading-relaxed">
                {alt.description}
              </p>
            </div>

            {/* Actions Footer */}
            <div className="mt-5 flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800/80 pt-3.5">
              <a
                href={alt.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition"
              >
                <span>Official Site</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>

              {onSelectAlternativeForCategory && onNavigateToBuilder && (
                <button
                  onClick={() => {
                    onSelectAlternativeForCategory(categoryId, alt.id);
                    onNavigateToBuilder();
                  }}
                  className="rounded-lg bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 px-3 py-1.5 text-sm font-semibold dark:text-zinc-100 transition"
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
