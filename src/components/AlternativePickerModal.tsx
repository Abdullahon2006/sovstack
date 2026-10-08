import React, { useState, useEffect, useRef } from 'react';
import { X, Search, Check, ExternalLink } from 'lucide-react';
import { Category, PrivacyAlternative, PrivacyBadge } from '../data/types';
import { AppIcon } from './AppIcon';

interface AlternativePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: Category;
  selectedAlternativeIds: string[];
  onToggleAlternative: (alternativeId: string) => void;
}

const BADGE_FILTER_OPTIONS: PrivacyBadge[] = [
  'FOSS',
  'E2EE',
  'Self-Hostable',
  'Zero-Knowledge',
];

export const AlternativePickerModal: React.FC<AlternativePickerModalProps> = ({
  isOpen,
  onClose,
  category,
  selectedAlternativeIds,
  onToggleAlternative,
}) => {
  const [query, setQuery] = useState('');
  const [badgeFilter, setBadgeFilter] = useState<PrivacyBadge | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Focus search input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setBadgeFilter(null);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Handle Escape key and outside click
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const handlePointerDown = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handlePointerDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handlePointerDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredAlternatives = category.alternatives.filter((alt) => {
    if (query.trim()) {
      const q = query.toLowerCase();
      const matchName = alt.name.toLowerCase().includes(q);
      const matchDesc = alt.description.toLowerCase().includes(q);
      if (!matchName && !matchDesc) return false;
    }

    if (badgeFilter && !alt.badges.includes(badgeFilter)) {
      return false;
    }

    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        ref={modalRef}
        className="relative flex flex-col w-full max-w-lg max-h-[85vh] overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900 shadow-2xl text-zinc-100"
        role="dialog"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-3.5 bg-zinc-950">
          <div>
            <h2 className="text-sm font-bold text-white">
              Pick {category.name} Alternatives
            </h2>
            <p className="text-[11px] text-zinc-400">
              Selected: {selectedAlternativeIds.length}/3
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-zinc-400 hover:bg-zinc-800 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Search & Quick Filter Pills */}
        <div className="p-3 border-b border-zinc-800/80 bg-zinc-900 space-y-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-500" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${category.alternatives.length} private alternatives...`}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-950 py-1.5 pl-8 pr-7 text-xs text-zinc-200 placeholder-zinc-500 transition focus:border-zinc-500 focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-2.5 top-2 text-zinc-500 hover:text-zinc-300"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-1 overflow-x-auto text-[11px]">
            <button
              onClick={() => setBadgeFilter(null)}
              className={`rounded px-2 py-0.5 font-medium transition ${
                badgeFilter === null
                  ? 'bg-zinc-200 text-black font-semibold'
                  : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
              }`}
            >
              All
            </button>
            {BADGE_FILTER_OPTIONS.map((badge) => (
              <button
                key={badge}
                onClick={() => setBadgeFilter(badgeFilter === badge ? null : badge)}
                className={`rounded px-2 py-0.5 font-medium transition ${
                  badgeFilter === badge
                    ? 'bg-zinc-200 text-black font-semibold'
                    : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                }`}
              >
                {badge}
              </button>
            ))}
          </div>
        </div>

        {/* Alternatives List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1.5 divide-y divide-zinc-800/40">
          {filteredAlternatives.length === 0 ? (
            <div className="p-8 text-center text-xs text-zinc-500">
              No private alternatives match your search.
            </div>
          ) : (
            filteredAlternatives.map((alt) => {
              const isSelected = selectedAlternativeIds.includes(alt.id);
              return (
                <div
                  key={alt.id}
                  onClick={() => onToggleAlternative(alt.id)}
                  className={`flex items-start gap-3 rounded-lg p-2.5 transition cursor-pointer select-none ${
                    isSelected
                      ? 'bg-zinc-800/90 border border-zinc-600'
                      : 'hover:bg-zinc-800/50 border border-transparent'
                  }`}
                >
                  {/* Icon */}
                  <div className="mt-0.5 shrink-0">
                    <AppIcon appId={alt.id} name={alt.name} size={24} />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-semibold text-white truncate">
                          {alt.name}
                        </span>
                        <a
                          href={alt.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          title="Visit official website"
                          className="text-zinc-500 hover:text-zinc-200"
                        >
                          <ExternalLink className="h-2.5 w-2.5" />
                        </a>
                      </div>

                      <div className="flex items-center gap-1">
                        {alt.badges.slice(0, 2).map((b) => (
                          <span
                            key={b}
                            className="rounded bg-zinc-950 px-1.5 py-0.5 text-[9px] font-medium text-zinc-400 border border-zinc-800"
                          >
                            {b}
                          </span>
                        ))}
                      </div>
                    </div>

                    <p className="mt-1 text-[11px] text-zinc-400 line-clamp-2">
                      {alt.description}
                    </p>
                  </div>

                  {/* Checkbox */}
                  <div className="mt-0.5 shrink-0">
                    <div
                      className={`flex h-4 w-4 items-center justify-center rounded border transition ${
                        isSelected
                          ? 'bg-white border-white text-black'
                          : 'border-zinc-700 bg-zinc-950 text-transparent'
                      }`}
                    >
                      <Check className="h-3 w-3 stroke-[3]" />
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-zinc-800 px-5 py-3 bg-zinc-950">
          <span className="text-[11px] text-zinc-500">
            {selectedAlternativeIds.length} of 3 selected
          </span>
          <button
            onClick={onClose}
            className="rounded-lg bg-white px-4 py-1.5 text-xs font-semibold text-black hover:bg-zinc-200"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
