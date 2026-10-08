import React from 'react';
import { ShieldCheck, Lock, Cpu, Globe, Heart, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  onNavigateToBuilder?: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigateToBuilder }) => {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 space-y-12 animate-in fade-in duration-200">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 text-xs font-semibold text-zinc-300">
          <span>The DeGigamon Manifesto</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
          Digital Sovereignty Is A Right, Not A Feature.
        </h1>
        <p className="mx-auto max-w-2xl text-sm sm:text-base text-zinc-400 leading-relaxed">
          The modern consumer web was captured by a handful of data-collecting monopolies. DeGigamon is the free, open-source platform helping you break free and reclaim your digital life.
        </p>
      </div>

      {/* Core Principles Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="rounded-xl border border-zinc-800 bg-[#0f1117] p-6 space-y-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-950/60 text-emerald-400 border border-emerald-800/60">
            <Cpu className="h-5 w-5" />
          </div>
          <h2 className="text-base font-bold text-white">100% Client-Side Custody</h2>
          <p className="text-xs text-zinc-400 leading-relaxed">
            DeGigamon runs entirely in your browser. There is no remote user database, no tracking pixels, no third-party telemetry, and no ad network scripts. Your stack configuration lives on your own device and in URL hashes you choose to share.
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-[#0f1117] p-6 space-y-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-950/60 text-blue-400 border border-blue-800/60">
            <Lock className="h-5 w-5" />
          </div>
          <h2 className="text-base font-bold text-white">Cryptographic Verification</h2>
          <p className="text-xs text-zinc-400 leading-relaxed">
            We prioritize end-to-end encrypted (E2EE) and zero-knowledge architectures where even the service provider cannot read your files, emails, or password vaults without your private key.
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-[#0f1117] p-6 space-y-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-950/60 text-purple-400 border border-purple-800/60">
            <Globe className="h-5 w-5" />
          </div>
          <h2 className="text-base font-bold text-white">Open Source & Auditability</h2>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Closed-source software asks for blind trust. Free and Open Source Software (FOSS) guarantees public auditability, reproducible builds, and community resilience against corporate acquisitions or policy reversals.
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-[#0f1117] p-6 space-y-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-950/60 text-amber-400 border border-amber-800/60">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h2 className="text-base font-bold text-white">Anti-Monopolistic Defense</h2>
          <p className="text-xs text-zinc-400 leading-relaxed">
            When one company runs your search, browser, email, files, maps, phone OS, and authentication, they own your digital identity. DeGigamon distributes your digital stack across independent, specialized providers.
          </p>
        </div>
      </div>

      {/* Threat Modeling & Why DeGigamon Section */}
      <section className="rounded-2xl border border-zinc-800 bg-[#0a0c10] p-6 sm:p-8 space-y-5">
        <h2 className="text-xl font-bold text-white">The Surveillance Capitalism Problem</h2>
        <div className="space-y-3 text-xs sm:text-sm text-zinc-300 leading-relaxed">
          <p>
            For two decades, tech monoliths traded "free" software for total behavioral surveillance. Every keystroke, location ping, private message graph, and search query is converted into behavioral prediction products sold to advertisers and ingested into opaque AI models.
          </p>
          <p>
            When you see the cumulative scale of tracking detailed in our{' '}
            <a href="#/dossiers" className="text-emerald-400 underline hover:text-emerald-300">
              Surveillance Dossiers
            </a>
            , the reality becomes clear: convenience came at the cost of basic civil liberty.
          </p>
          <p>
            DeGigamon provides an uncompromising, battle-tested roadmap for breaking out. Built as an open-source, non-commercial alternative to PrivacyPack.org, we believe digital autonomy should be accessible to everyone—from everyday smartphone users to advanced homelab sysadmins.
          </p>
        </div>

        <div className="pt-4 border-t border-zinc-800/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <Heart className="h-4 w-4 text-red-400 fill-red-400" />
            <span>100% Free · Open-Source MIT License · Zero Telemetry</span>
          </div>

          {onNavigateToBuilder && (
            <button
              onClick={onNavigateToBuilder}
              className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-xs font-semibold text-black hover:bg-zinc-200 transition"
            >
              <span>Build Your Privacy Stack</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </section>
    </div>
  );
};
