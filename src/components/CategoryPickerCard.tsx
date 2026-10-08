import React, { useState } from 'react';
import {
  Info,
  ArrowRight,
  Plus,
  X,
  ExternalLink,
  Trash2,
} from 'lucide-react';
import { Category, MainstreamApp, PrivacyAlternative } from '../data/types';
import { AppIcon } from './AppIcon';
import { AlternativePickerModal } from './AlternativePickerModal';

interface CategoryPickerCardProps {
  category: Category;
  selectedMainstreamId?: string;
  selectedAlternativeIds: string[];
  onSelectMainstream: (mainstreamId: string) => void;
  onToggleAlternative: (alternativeId: string) => void;
  onRemoveCategory: () => void;
  onInspectMainstream: (app: MainstreamApp) => void;
  customAlternatives?: PrivacyAlternative[];
  onAddCustomAlternative?: (
    categoryId: string,
    altData: Omit<PrivacyAlternative, 'id' | 'isCustom'>
  ) => void;
  onDeleteCustomAlternative?: (categoryId: string, altId: string) => void;
}

export const CategoryPickerCard: React.FC<CategoryPickerCardProps> = ({
  category,
  selectedMainstreamId,
  selectedAlternativeIds,
  onSelectMainstream,
  onToggleAlternative,
  onRemoveCategory,
  onInspectMainstream,
  customAlternatives = [],
  onAddCustomAlternative,
  onDeleteCustomAlternative,
}) => {
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const activeMainstream =
    category.mainstreamApps.find((m) => m.id === selectedMainstreamId) ||
    category.mainstreamApps[0];

  const allAlternatives = [
    ...category.alternatives,
    ...customAlternatives,
  ];

  const selectedAlternatives = allAlternatives.filter((alt) =>
    selectedAlternativeIds.includes(alt.id)
  );

  const hasSelections = selectedAlternatives.length > 0;

  return (
    <div
      className={`relative flex flex-col justify-between rounded-xl border p-5 transition-colors ${
        hasSelections
          ? 'border-zinc-700 bg-[#121214]'
          : 'border-zinc-800/80 bg-[#0f0f11] hover:border-zinc-700/60'
      }`}
    >
      {/* Category Header */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800/60">
        <div className="flex items-center gap-2.5">
          <span className="text-sm sm:text-base font-semibold text-white tracking-tight">
            {category.name}
          </span>
          <span className="text-xs sm:text-sm text-zinc-400 hidden sm:inline">
            · {category.description}
          </span>
        </div>
        {hasSelections && (
          <button
            onClick={onRemoveCategory}
            title="Reset category"
            className="text-zinc-500 hover:text-zinc-300 p-1.5 rounded hover:bg-zinc-800/60 transition"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Main Row: Mainstream -> Arrow -> Alternatives */}
      <div className="mt-3.5 grid grid-cols-1 gap-2.5 sm:grid-cols-12 sm:items-center">
        {/* Left: Mainstream Service */}
        <div className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900/70 px-3.5 py-2.5 sm:col-span-5">
          <div className="shrink-0 flex items-center justify-center">
            <AppIcon appId={activeMainstream.id} name={activeMainstream.name} size={30} />
          </div>
          <div className="relative flex-1 min-w-0">
            <select
              aria-label={`Select mainstream app for ${category.name}`}
              value={activeMainstream.id}
              onChange={(e) => onSelectMainstream(e.target.value)}
              className="w-full appearance-none bg-transparent pr-5 text-sm font-medium text-zinc-200 focus:outline-none cursor-pointer truncate"
            >
              {category.mainstreamApps.map((app) => (
                <option key={app.id} value={app.id} className="bg-zinc-900 text-zinc-200 text-sm">
                  {app.name} ({app.parent.split(' ')[0]})
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-0 top-1 text-xs text-zinc-500">
              ▾
            </div>
          </div>
          <button
            onClick={() => onInspectMainstream(activeMainstream)}
            title="View surveillance dossier"
            className="text-zinc-400 hover:text-zinc-200 p-1.5 shrink-0 rounded-lg hover:bg-zinc-800 transition"
          >
            <Info className="h-4 w-4" />
          </button>
        </div>

        {/* Center: Migration Flow Indicator */}
        <div className="flex items-center justify-center sm:col-span-2 py-1 sm:py-0">
          <ArrowRight className="h-4 w-4 text-zinc-500 hidden sm:block" />
          <div className="flex items-center gap-1 text-xs uppercase font-semibold tracking-wider text-zinc-500 sm:hidden">
            <span>switched to ↓</span>
          </div>
        </div>

        {/* Right: Private Alternatives */}
        <div className="sm:col-span-5">
          {!hasSelections ? (
            <button
              onClick={() => setIsPickerOpen(true)}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-zinc-800 bg-zinc-900/30 py-2.5 px-4 text-sm font-medium text-zinc-400 transition hover:border-zinc-600 hover:bg-zinc-800/40 hover:text-zinc-200"
            >
              <Plus className="h-4 w-4 text-zinc-400" />
              <span>Choose privacy alternative...</span>
            </button>
          ) : (
            <div className="flex flex-wrap items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/50 p-2.5 min-h-[46px]">
              {selectedAlternatives.map((alt) => (
                <span
                  key={alt.id}
                  className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-sm font-medium text-zinc-100 shadow-sm"
                >
                  <AppIcon appId={alt.id} name={alt.name} size={20} />
                  <span>{alt.name}</span>
                  <a
                    href={alt.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Website"
                    className="text-zinc-400 hover:text-white p-0.5"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                  <button
                    onClick={() => onToggleAlternative(alt.id)}
                    title="Remove"
                    className="text-zinc-400 hover:text-zinc-200 p-0.5 rounded hover:bg-zinc-700 transition"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </span>
              ))}

              {/* Add More Alternatives Trigger */}
              <button
                onClick={() => setIsPickerOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-700/80 bg-zinc-800/80 px-3 py-1.5 text-sm font-medium text-zinc-300 transition hover:bg-zinc-700 hover:text-white"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Dedicated Searchable Picker Modal */}
      <AlternativePickerModal
        isOpen={isPickerOpen}
        onClose={() => setIsPickerOpen(false)}
        category={category}
        selectedAlternativeIds={selectedAlternativeIds}
        onToggleAlternative={onToggleAlternative}
        customAlternatives={customAlternatives}
        onAddCustomAlternative={onAddCustomAlternative}
        onDeleteCustomAlternative={onDeleteCustomAlternative}
      />
    </div>
  );
};
