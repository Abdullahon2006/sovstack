import React from 'react';
import { X } from 'lucide-react';
import { MainstreamApp } from '../data/types';
import { VENDOR_DOSSIERS } from '../data/dossiers';
import { AppIcon } from './AppIcon';

interface VendorDossierModalProps {
  app: MainstreamApp | null;
  onClose: () => void;
}

export const VendorDossierModal: React.FC<VendorDossierModalProps> = ({ app, onClose }) => {
  if (!app) return null;

  const dossier = VENDOR_DOSSIERS[app.parent] || VENDOR_DOSSIERS['Other Monoliths'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 dark:bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl border border-zinc-200 bg-white text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 p-6 sm:p-7 shadow-2xl dark:text-zinc-100"
        role="dialog"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white transition"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3.5 pr-8">
          <div className="shrink-0 flex items-center justify-center">
            <AppIcon appId={app.id} name={app.name} size={40} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">{app.name}</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
              Operated by {app.parent} {dossier.ticker ? `(${dossier.ticker})` : ''} · Risk: {app.riskLevel}
            </p>
          </div>
        </div>

        {/* App Profile */}
        <div className="mt-5 rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 p-4 text-sm leading-relaxed dark:text-zinc-300">
          {app.summary}
        </div>

        {/* Harvested Vectors */}
        <div className="mt-5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Active Data Collection
          </h3>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {app.surveillanceVectors.map((v) => (
              <span
                key={v}
                className="rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 px-2.5 py-1 text-xs dark:text-zinc-300"
              >
                {v}
              </span>
            ))}
          </div>
        </div>

        <hr className="my-5 border-zinc-200 dark:border-zinc-800" />

        {/* Parent Corporation Details */}
        <div className="space-y-4 text-sm">
          <div>
            <h4 className="font-semibold text-zinc-900 dark:text-zinc-200">Revenue Model</h4>
            <p className="mt-1 leading-relaxed text-zinc-600 dark:text-zinc-400">{dossier.revenueModel}</p>
          </div>

          <div>
            <h4 className="font-semibold text-zinc-900 dark:text-zinc-200">Surveillance Scope</h4>
            <p className="mt-1 leading-relaxed text-zinc-600 dark:text-zinc-400">{dossier.surveillanceScope}</p>
          </div>

          <div>
            <h4 className="font-semibold text-zinc-900 dark:text-zinc-200">Regulatory Actions &amp; Breaches</h4>
            <p className="mt-1 leading-relaxed text-zinc-600 dark:text-zinc-400">{dossier.privacyViolationsHighlight}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-xl bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-800 px-5 py-2 text-sm font-semibold dark:text-white transition dark:hover:bg-zinc-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
