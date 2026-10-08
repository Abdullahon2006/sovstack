import React, { useState } from 'react';
import {
  Info,
  ArrowRight,
  Plus,
  X,
  ExternalLink,
  Trash2,
} from 'lucide-react';
import { Category, MainstreamApp } from '../data/types';

interface CategoryPickerCardProps {
  category: Category;
  selectedMainstreamId?: string;
  selectedAlternativeIds: string[];
  onSelectMainstream: (mainstreamId: string) => void;
  onToggleAlternative: (alternativeId: string) => void;
  onRemoveCategory: () => void;
  onInspectMainstream: (app: MainstreamApp) => void;
}

export const CategoryPickerCard: React.FC<CategoryPickerCardProps> = ({
  category,
  selectedMainstreamId,
  selectedAlternativeIds,
  onSelectMainstream,
  onToggleAlternative,
  onRemoveCategory,
  onInspectMainstream,
}) => {
  const [showAltMenu, setShowAltMenu] = useState(false);

  const activeMainstream =
    category.mainstreamApps.find((m) => m.id === selectedMainstreamId) ||
    category.mainstreamApps[0];

  const selectedAlternatives = category.alternatives.filter((alt) =>
    selectedAlternativeIds.includes(alt.id)
  );

  const hasSelections = selectedAlternatives.length > 0;

  return (
    <div
      className={`relative flex flex-col justify-between rounded-xl border p-4 transition-colors ${
        hasSelections
          ? 'border-zinc-700 bg-[#121214]'
          : 'border-zinc-800/80 bg-[#0f0f11] hover:border-zinc-700/60'
      }`}
    >
      {/* Category Header */}
      <div className="flex items-center justify-between pb-2.5 border-b border-zinc-800/60">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-white tracking-wide">
            {category.name}
          </span>
          <span className="text-[11px] text-zinc-500 hidden sm:inline">
            · {category.description}
          </span>
        </div>
        {hasSelections && (
          <button
            onClick={onRemoveCategory}
            title="Reset category"
            className="text-zinc-500 hover:text-zinc-300 p-1"
          >
            <Trash2 className="h-3 w-3" />
          </button>
        )}
      </div>

      {/* Main Row: Mainstream -> Arrow -> Alternatives */}
      <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-12 sm:items-center">
        {/* Left: Mainstream Service */}
        <div className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 py-2 sm:col-span-5">
          <span className="text-base select-none">{activeMainstream.symbol || '•'}</span>
          <div className="relative flex-1">
            <select
              aria-label={`Select mainstream app for ${category.name}`}
              value={activeMainstream.id}
              onChange={(e) => onSelectMainstream(e.target.value)}
              className="w-full appearance-none bg-transparent pr-5 text-xs font-medium text-zinc-200 focus:outline-none cursor-pointer"
            >
              {category.mainstreamApps.map((app) => (
                <option key={app.id} value={app.id} className="bg-zinc-900 text-zinc-200">
                  {app.name} ({app.parent.split(' ')[0]})
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-0 top-1 text-[10px] text-zinc-500">
              ▾
            </div>
          </div>
          <button
            onClick={() => onInspectMainstream(activeMainstream)}
            title="View surveillance dossier"
            className="text-zinc-500 hover:text-zinc-300 p-0.5"
          >
            <Info className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Center: Subtle Migration Arrow */}
        <div className="flex items-center justify-center sm:col-span-2">
          <ArrowRight className="h-3.5 w-3.5 text-zinc-600 hidden sm:block" />
        </div>

        {/* Right: Private Alternatives */}
        <div className="flex flex-wrap items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900/40 p-2 sm:col-span-5 min-h-[40px]">
          {selectedAlternatives.map((alt) => (
            <span
              key={alt.id}
              className="inline-flex items-center gap-1.5 rounded-md border border-zinc-700 bg-zinc-800 px-2 py-1 text-xs font-medium text-zinc-100"
            >
              <span>{alt.name}</span>
              <a
                href={alt.website}
                target="_blank"
                rel="noopener noreferrer"
                title="Website"
                className="text-zinc-400 hover:text-white"
              >
                <ExternalLink className="h-2.5 w-2.5" />
              </a>
              <button
                onClick={() => onToggleAlternative(alt.id)}
                title="Remove"
                className="text-zinc-400 hover:text-zinc-200"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}

          {/* Add Alternative Trigger */}
          <div className="relative">
            <button
              onClick={() => setShowAltMenu(!showAltMenu)}
              className="inline-flex items-center gap-1 rounded-md border border-zinc-700/80 bg-zinc-800/80 px-2 py-1 text-xs font-medium text-zinc-300 transition hover:bg-zinc-700 hover:text-white"
            >
              <Plus className="h-3 w-3" />
              <span>{hasSelections ? 'Add' : 'Pick'}</span>
            </button>

            {/* Dropdown Menu */}
            {showAltMenu && (
              <div className="absolute left-0 top-8 z-30 w-64 max-h-56 overflow-y-auto rounded-lg border border-zinc-700 bg-zinc-900 p-1.5 shadow-xl">
                <div className="flex items-center justify-between px-2 py-1 mb-1 border-b border-zinc-800 text-[11px] font-semibold text-zinc-400">
                  <span>Alternatives</span>
                  <button
                    onClick={() => setShowAltMenu(false)}
                    className="text-zinc-500 hover:text-white"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
                {category.alternatives.map((alt) => {
                  const isSelected = selectedAlternativeIds.includes(alt.id);
                  return (
                    <button
                      key={alt.id}
                      onClick={() => {
                        onToggleAlternative(alt.id);
                        setShowAltMenu(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-xs transition ${
                        isSelected
                          ? 'bg-zinc-800 text-white font-semibold'
                          : 'text-zinc-300 hover:bg-zinc-800/60'
                      }`}
                    >
                      <span>{alt.name}</span>
                      <span className="text-[10px] text-zinc-500">
                        {alt.badges[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
