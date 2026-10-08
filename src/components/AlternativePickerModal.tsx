import React, { useState, useEffect, useRef } from 'react';
import { X, Search, Check, ExternalLink, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { Category, PrivacyAlternative, PrivacyBadge } from '../data/types';
import { AppIcon } from './AppIcon';

interface AlternativePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: Category;
  selectedAlternativeIds: string[];
  onToggleAlternative: (alternativeId: string) => void;
  customAlternatives?: PrivacyAlternative[];
  onAddCustomAlternative?: (
    categoryId: string,
    altData: Omit<PrivacyAlternative, 'id' | 'isCustom'>
  ) => void;
  onDeleteCustomAlternative?: (categoryId: string, altId: string) => void;
}

const BADGE_FILTER_OPTIONS: PrivacyBadge[] = [
  'FOSS',
  'E2EE',
  'Self-Hostable',
  'Zero-Knowledge',
  'Audited',
  'Local-Only',
];

export const AlternativePickerModal: React.FC<AlternativePickerModalProps> = ({
  isOpen,
  onClose,
  category,
  selectedAlternativeIds,
  onToggleAlternative,
  customAlternatives = [],
  onAddCustomAlternative,
  onDeleteCustomAlternative,
}) => {
  const [query, setQuery] = useState('');
  const [badgeFilter, setBadgeFilter] = useState<PrivacyBadge | null>(null);
  const [isAddingCustom, setIsAddingCustom] = useState(false);

  // Custom alternative form state
  const [customName, setCustomName] = useState('');
  const [customWebsite, setCustomWebsite] = useState('');
  const [customDesc, setCustomDesc] = useState('');
  const [customBadges, setCustomBadges] = useState<PrivacyBadge[]>(['FOSS']);

  const modalRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Focus search input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setBadgeFilter(null);
      setIsAddingCustom(false);
      setCustomName('');
      setCustomWebsite('');
      setCustomDesc('');
      setCustomBadges(['FOSS']);
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

  // Combine built-in alternatives with user's custom alternatives for this category
  const allAlternatives: PrivacyAlternative[] = [
    ...category.alternatives,
    ...customAlternatives,
  ];

  const filteredAlternatives = allAlternatives.filter((alt) => {
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

  const handleToggleBadge = (badge: PrivacyBadge) => {
    setCustomBadges((prev) =>
      prev.includes(badge) ? prev.filter((b) => b !== badge) : [...prev, badge]
    );
  };

  const handleSaveCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim() || !onAddCustomAlternative) return;

    let formattedUrl = customWebsite.trim();
    if (formattedUrl && !/^https?:\/\//i.test(formattedUrl)) {
      formattedUrl = `https://${formattedUrl}`;
    }

    onAddCustomAlternative(category.id, {
      name: customName.trim(),
      website: formattedUrl || '#',
      description: customDesc.trim() || 'Custom private alternative added by user.',
      badges: customBadges.length > 0 ? customBadges : ['FOSS'],
    });

    // Reset and collapse form
    setCustomName('');
    setCustomWebsite('');
    setCustomDesc('');
    setCustomBadges(['FOSS']);
    setIsAddingCustom(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        ref={modalRef}
        className="relative flex flex-col w-full max-w-xl max-h-[85vh] overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-900 shadow-2xl text-zinc-100"
        role="dialog"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-4 bg-zinc-950">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white">
              Pick {category.name} Alternatives
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
              Selected: {selectedAlternativeIds.length}/3
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search & Quick Filter Pills */}
        <div className="p-4 border-b border-zinc-800/80 bg-zinc-900 space-y-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-3 h-4 w-4 text-zinc-500" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${allAlternatives.length} private alternatives...`}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-950 py-2.5 pl-10 pr-9 text-sm text-zinc-200 placeholder-zinc-500 transition focus:border-zinc-500 focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-2.5 text-zinc-500 hover:text-zinc-300 p-0.5"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 overflow-x-auto text-xs py-0.5">
              <button
                onClick={() => setBadgeFilter(null)}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium transition ${
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
                  className={`rounded-lg px-2.5 py-1 text-xs font-medium transition ${
                    badgeFilter === badge
                      ? 'bg-zinc-200 text-black font-semibold'
                      : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                  }`}
                >
                  {badge}
                </button>
              ))}
            </div>

            {/* Toggle Add Custom Alternative Form */}
            {onAddCustomAlternative && (
              <button
                onClick={() => setIsAddingCustom(!isAddingCustom)}
                className="flex items-center gap-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 px-2.5 py-1 text-xs font-semibold text-emerald-400 shrink-0 transition"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Custom</span>
                {isAddingCustom ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
              </button>
            )}
          </div>

          {/* Expandable Add Custom Alternative Form */}
          {isAddingCustom && (
            <form onSubmit={handleSaveCustom} className="mt-2.5 rounded-xl border border-zinc-700 bg-zinc-950 p-4 text-xs space-y-3 animate-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-white">Add Custom Alternative</span>
                <span className="text-xs text-zinc-400">Stored locally in your stack</span>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-zinc-400">Tool / Service Name *</label>
                <input
                  type="text"
                  required
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="e.g. K-9 Mail, Seafile, Radicale..."
                  className="mt-1 w-full rounded border border-zinc-700 bg-zinc-900 px-2.5 py-1 text-xs text-white focus:border-zinc-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-zinc-400">Website or Repository URL (optional)</label>
                <input
                  type="text"
                  value={customWebsite}
                  onChange={(e) => setCustomWebsite(e.target.value)}
                  placeholder="e.g. https://k9mail.app"
                  className="mt-1 w-full rounded border border-zinc-700 bg-zinc-900 px-2.5 py-1 text-xs text-white focus:border-zinc-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-zinc-400 mb-1">Trust Badges</label>
                <div className="flex flex-wrap gap-1">
                  {BADGE_FILTER_OPTIONS.map((badge) => {
                    const active = customBadges.includes(badge);
                    return (
                      <button
                        type="button"
                        key={badge}
                        onClick={() => handleToggleBadge(badge)}
                        className={`rounded px-1.5 py-0.5 text-[10px] font-medium transition ${
                          active
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                            : 'bg-zinc-800 text-zinc-400 border border-zinc-700 hover:text-zinc-200'
                        }`}
                      >
                        {badge}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-zinc-400">Description (optional)</label>
                <input
                  type="text"
                  value={customDesc}
                  onChange={(e) => setCustomDesc(e.target.value)}
                  placeholder="e.g. Open-source client with PGP support"
                  className="mt-1 w-full rounded border border-zinc-700 bg-zinc-900 px-2.5 py-1 text-xs text-white focus:border-zinc-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsAddingCustom(false)}
                  className="rounded px-2.5 py-1 text-[11px] font-medium text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!customName.trim()}
                  className="rounded bg-emerald-500 px-3 py-1 text-[11px] font-semibold text-black hover:bg-emerald-400 disabled:opacity-50"
                >
                  Save & Select
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Alternatives List */}
        <div className="flex-1 overflow-y-auto p-3.5 space-y-2 divide-y divide-zinc-800/40">
          {filteredAlternatives.length === 0 ? (
            <div className="p-10 text-center text-sm text-zinc-500">
              No private alternatives match your search.
            </div>
          ) : (
            filteredAlternatives.map((alt) => {
              const isSelected = selectedAlternativeIds.includes(alt.id);
              return (
                <div
                  key={alt.id}
                  onClick={() => onToggleAlternative(alt.id)}
                  className={`flex items-start gap-3.5 rounded-xl p-3.5 transition cursor-pointer select-none ${
                    isSelected
                      ? 'bg-zinc-800/90 border border-zinc-600'
                      : 'hover:bg-zinc-800/50 border border-transparent'
                  }`}
                >
                  {/* Icon */}
                  <div className="mt-0.5 shrink-0 flex items-center justify-center">
                    <AppIcon appId={alt.id} name={alt.name} size={32} />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm sm:text-base font-semibold text-white truncate">
                          {alt.name}
                        </span>
                        {alt.isCustom && (
                          <span className="rounded bg-emerald-950/80 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-800">
                            Custom
                          </span>
                        )}
                        {alt.website && alt.website !== '#' && (
                          <a
                            href={alt.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            title="Visit official website"
                            className="text-zinc-400 hover:text-white p-0.5 transition"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5">
                        {alt.badges.slice(0, 2).map((b) => (
                          <span
                            key={b}
                            className="rounded-md bg-zinc-950 px-2 py-0.5 text-[10px] sm:text-xs font-medium text-zinc-300 border border-zinc-800"
                          >
                            {b}
                          </span>
                        ))}

                        {/* Delete custom alternative button */}
                        {alt.isCustom && onDeleteCustomAlternative && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteCustomAlternative(category.id, alt.id);
                            }}
                            title="Delete custom alternative"
                            className="text-zinc-500 hover:text-red-400 p-1 rounded"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    <p className="mt-1.5 text-xs sm:text-sm text-zinc-400 leading-relaxed line-clamp-2">
                      {alt.description}
                    </p>
                  </div>

                  {/* Checkbox */}
                  <div className="mt-1 shrink-0">
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded-md border transition ${
                        isSelected
                          ? 'bg-white border-white text-black'
                          : 'border-zinc-700 bg-zinc-950 text-transparent'
                      }`}
                    >
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-zinc-800 px-6 py-3.5 bg-zinc-950">
          <span className="text-xs sm:text-sm text-zinc-400">
            {selectedAlternativeIds.length} of 3 selected
          </span>
          <button
            onClick={onClose}
            className="rounded-xl bg-white px-5 py-2 text-sm font-semibold text-black hover:bg-zinc-200 transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
