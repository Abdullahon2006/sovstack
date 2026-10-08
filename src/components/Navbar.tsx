import React from 'react';
import { Shield, Download, RotateCcw, Check, Link } from 'lucide-react';
import { PRESET_STACKS } from '../data/presets';

interface NavbarProps {
  sovereigntyScore: number;
  activeCategoriesCount: number;
  totalCategoriesCount: number;
  onOpenExport: () => void;
  onApplyPreset: (presetId: string) => void;
  onReset: () => void;
  onShareUrl: () => void;
  copiedUrl: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  sovereigntyScore,
  activeCategoriesCount,
  totalCategoriesCount,
  onOpenExport,
  onApplyPreset,
  onReset,
  onShareUrl,
  copiedUrl,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-[#09090b]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 text-white border border-zinc-700">
            <Shield className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold tracking-tight text-white">DeGigamon</span>
              <span className="text-[11px] text-zinc-500 font-medium">
                {activeCategoriesCount}/{totalCategoriesCount} switched
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Preset Selector */}
          <div className="relative">
            <select
              aria-label="Presets"
              onChange={(e) => {
                if (e.target.value) onApplyPreset(e.target.value);
              }}
              defaultValue=""
              className="appearance-none rounded-lg border border-zinc-800 bg-zinc-900/90 px-3 py-1.5 pr-7 text-xs font-medium text-zinc-300 transition hover:border-zinc-700 focus:border-zinc-500 focus:outline-none"
            >
              <option value="" disabled>Presets...</option>
              {PRESET_STACKS.map((preset) => (
                <option key={preset.id} value={preset.id}>
                  {preset.title}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-2.5 top-2.5 text-zinc-500 text-[10px]">
              ▾
            </div>
          </div>

          {/* Share Link */}
          <button
            onClick={onShareUrl}
            title="Copy shareable link"
            className="flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
          >
            {copiedUrl ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Link className="h-3.5 w-3.5" />}
            <span className="hidden sm:inline">{copiedUrl ? 'Copied' : 'Share'}</span>
          </button>

          {/* Reset */}
          <button
            onClick={onReset}
            title="Reset stack"
            className="hidden items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-zinc-200 sm:flex"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>

          {/* Export Card CTA - High Contrast Minimal White Button */}
          <button
            onClick={onOpenExport}
            className="flex items-center gap-1.5 rounded-lg bg-white px-3.5 py-1.5 text-xs font-semibold text-black transition hover:bg-zinc-200 active:scale-95"
          >
            <Download className="h-3.5 w-3.5" />
            <span>EXPORT</span>
          </button>
        </div>
      </div>
    </header>
  );
};
