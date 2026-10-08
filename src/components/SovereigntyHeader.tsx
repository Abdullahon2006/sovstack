import React from 'react';
import { Search, X } from 'lucide-react';
import { PrivacyBadge } from '../data/types';

interface SovereigntyHeaderProps {
  sovereigntyScore: number;
  activeCategoriesCount: number;
  totalCategoriesCount: number;
  evictedCount: number;
  neutralizedVectorsCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeFilter: string | null;
  onFilterChange: (filter: string | null) => void;
}

const BADGE_FILTERS: PrivacyBadge[] = [
  'FOSS',
  'E2EE',
  'Self-Hostable',
  'Zero-Knowledge',
  'Audited',
  'Local-Only',
];

export const SovereigntyHeader: React.FC<SovereigntyHeaderProps> = ({
  sovereigntyScore,
  activeCategoriesCount,
  totalCategoriesCount,
  evictedCount,
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
}) => {
  return (
    <section className="border-b border-zinc-800/80 bg-[#0c0c0e] px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-4xl text-center">
        {/* Clean Headline */}
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-4xl">
          Your Privacy Wins, in One Card.
        </h1>
        <p className="mt-3 text-sm sm:text-base leading-relaxed text-zinc-300 max-w-2xl mx-auto">
          Select the mainstream services you used before, pick the privacy-respecting tools you have switched to, and share your stack.
        </p>

        {/* Minimal Progress Line */}
        <div className="mx-auto mt-6 max-w-md">
          <div className="flex items-center justify-between text-sm font-medium text-zinc-300 mb-2">
            <span>
              {activeCategoriesCount} of {totalCategoriesCount} categories switched
            </span>
            <span className="text-white font-semibold">{sovereigntyScore}% Sovereign</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800">
            <div
              className="h-full rounded-full bg-white transition-all duration-300"
              style={{ width: `${Math.max(4, sovereigntyScore)}%` }}
            />
          </div>
        </div>

        {/* Search Bar & Minimal Filter Chips */}
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
          {/* Search Box */}
          <div className="relative w-full sm:max-w-sm">
            <Search className="pointer-events-none absolute left-3.5 top-3 h-4 w-4 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search apps or categories..."
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900/90 py-2.5 pl-10 pr-8 text-sm text-zinc-200 placeholder-zinc-500 transition focus:border-zinc-500 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-2.5 text-zinc-500 hover:text-zinc-300 p-0.5"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            <button
              onClick={() => onFilterChange(null)}
              className={`rounded-lg px-3 py-1.5 text-xs sm:text-sm font-medium transition ${
                activeFilter === null
                  ? 'bg-zinc-200 text-black font-semibold'
                  : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 border border-zinc-800'
              }`}
            >
              All
            </button>
            {BADGE_FILTERS.map((badge) => (
              <button
                key={badge}
                onClick={() => onFilterChange(activeFilter === badge ? null : badge)}
                className={`rounded-lg px-3 py-1.5 text-xs sm:text-sm font-medium transition ${
                  activeFilter === badge
                    ? 'bg-zinc-200 text-black font-semibold'
                    : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 border border-zinc-800'
                }`}
              >
                {badge}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
