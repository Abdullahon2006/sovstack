import React from 'react';
import { X, ShieldAlert } from 'lucide-react';
import { MainstreamApp } from '../data/types';
import { GIGAMON_DOSSIERS } from '../data/gigamons';

interface GigamonDossierModalProps {
  app: MainstreamApp | null;
  onClose: () => void;
}

export const GigamonDossierModal: React.FC<GigamonDossierModalProps> = ({ app, onClose }) => {
  if (!app) return null;

  const dossier = GIGAMON_DOSSIERS[app.parent] || GIGAMON_DOSSIERS['Other Monoliths'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-xl border border-zinc-700 bg-zinc-900 p-6 shadow-2xl text-zinc-100"
        role="dialog"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-md p-1 text-zinc-400 hover:bg-zinc-800 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <span className="text-2xl">{app.symbol || '•'}</span>
          <div>
            <h2 className="text-lg font-bold text-white">{app.name}</h2>
            <p className="text-xs text-zinc-400">
              Operated by {app.parent} {dossier.ticker ? `(${dossier.ticker})` : ''} · Risk: {app.riskLevel}
            </p>
          </div>
        </div>

        {/* App Profile */}
        <div className="mt-4 rounded-lg border border-zinc-800 bg-zinc-950 p-3 text-xs leading-relaxed text-zinc-300">
          {app.summary}
        </div>

        {/* Harvested Vectors */}
        <div className="mt-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Active Data Collection
          </h3>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {app.surveillanceVectors.map((v) => (
              <span
                key={v}
                className="rounded-md border border-zinc-800 bg-zinc-950 px-2 py-1 text-[11px] text-zinc-300"
              >
                {v}
              </span>
            ))}
          </div>
        </div>

        <hr className="my-4 border-zinc-800" />

        {/* Parent Corporation Details */}
        <div className="space-y-3 text-xs">
          <div>
            <h4 className="font-semibold text-zinc-300">Revenue Model</h4>
            <p className="mt-0.5 leading-relaxed text-zinc-400">{dossier.revenueModel}</p>
          </div>

          <div>
            <h4 className="font-semibold text-zinc-300">Surveillance Scope</h4>
            <p className="mt-0.5 leading-relaxed text-zinc-400">{dossier.surveillanceScope}</p>
          </div>

          <div>
            <h4 className="font-semibold text-zinc-300">Regulatory Actions & Breaches</h4>
            <p className="mt-0.5 leading-relaxed text-zinc-400">{dossier.privacyViolationsHighlight}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-lg bg-zinc-800 px-4 py-1.5 text-xs font-medium text-white transition hover:bg-zinc-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
