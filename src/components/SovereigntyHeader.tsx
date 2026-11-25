import React from 'react';
import { Search, X } from 'lucide-react';

interface SovereigntyHeaderProps {
  sovereigntyScore: number;
  activeCategoriesCount: number;
  totalCategoriesCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const SovereigntyHeader: React.FC<SovereigntyHeaderProps> = ({
  sovereigntyScore,
  activeCategoriesCount,
  totalCategoriesCount,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <section className="border-b border-zinc-200 bg-white dark:border-zinc-800/80 dark:bg-[#0c0c0e] px-4 py-10 sm:px-6 transition-colors duration-200">
      <div className="mx-auto max-w-4xl text-center">
        {/* Clean Headline */}
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
          Your Privacy Wins, in One Card
        </h1>
        <p className="mt-3 text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto">
          Select the mainstream services you used before, pick the privacy-respecting tools you have switched to, and share your stack.
        </p>

        {/* Minimal Progress Line */}
        <div className="mx-auto mt-6 max-w-md">
          <div className="flex items-center justify-between text-sm font-medium text-zinc-600 dark:text-zinc-300 mb-2 tabular-nums">
            <span>
              {activeCategoriesCount} of {totalCategoriesCount} categories switched
            </span>
            <span className="text-zinc-900 dark:text-white font-semibold">{sovereigntyScore}% Sovereign</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
            <div
              className="h-full rounded-full bg-emerald-600 dark:bg-white transition-all duration-300"
              style={{ width: sovereigntyScore === 0 ? '0%' : `${Math.max(4, sovereigntyScore)}%` }}
            />
          </div>
        </div>

        {/* Ordinary Search Bar */}
        <div className="mx-auto mt-7 max-w-md">
          <div className="relative w-full">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 dark:text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search apps or categories..."
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-2.5 pl-10 pr-8 text-sm text-zinc-900 placeholder-zinc-400 focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900/90 dark:text-zinc-200 dark:placeholder-zinc-500 transition dark:focus:border-zinc-500 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300 p-0.5"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
