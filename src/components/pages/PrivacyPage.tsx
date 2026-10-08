import React from 'react';
import { ShieldCheck, CheckCircle2, Lock, FileCode } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 space-y-10 animate-in fade-in duration-200">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3 py-1 text-xs font-semibold text-emerald-400">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Zero-Telemetry Declaration</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-4xl">
          Privacy Policy & Terms
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400">
          Effective Date: Permanent · Version 1.0 · Open Source (MIT)
        </p>
      </div>

      {/* Summary Box */}
      <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-5 text-xs text-emerald-300 space-y-2">
        <span className="font-bold text-emerald-200 text-sm">The 10-Second Summary:</span>
        <p className="leading-relaxed">
          DeGigamon collects <strong>zero personal data</strong>. We do not use cookies, we do not run Google Analytics, we have no tracking pixels, and we have no server-side database. Everything you do on DeGigamon stays in your browser.
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-6 text-xs text-zinc-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>1. Information We Collect</span>
          </h2>
          <p>
            We collect <strong>no information whatsoever</strong>. When you use DeGigamon, no IP addresses, user agent strings, device fingerprints, or browsing sessions are recorded, transmitted, or stored on external servers by us.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Lock className="h-4 w-4 text-emerald-400" />
            <span>2. Local Storage and Client-Side State</span>
          </h2>
          <p>
            Your pack selections and custom alternatives are saved exclusively in your browser’s local storage (<code className="rounded bg-zinc-900 px-1 py-0.5 text-zinc-300">localStorage</code>) to preserve your preferences across visits. This data never leaves your device unless you choose to share a stateful link.
          </p>
          <p>
            When you generate a share link, your configuration is Base64 encoded into the URL hash fragment (<code className="rounded bg-zinc-900 px-1 py-0.5 text-zinc-300">#pack=...</code>). Because URL hash fragments are never sent to web servers during HTTP requests (per RFC 3986), your stack is only decoded by the recipient's client device.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>3. Cookies and Third-Party Trackers</span>
          </h2>
          <p>
            DeGigamon uses <strong>no cookies</strong>, no session cookies, no persistent identifiers, no advertising pixels, and no surveillance beacons. We do not integrate third-party advertising or analytics SDKs.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <FileCode className="h-4 w-4 text-emerald-400" />
            <span>4. Open Source License & Auditing</span>
          </h2>
          <p>
            DeGigamon is released under the permissive <strong>MIT License</strong>. The complete source code is public and fully auditable by anyone in the security and privacy research community.
          </p>
        </section>

        <section className="space-y-2 border-t border-zinc-800 pt-4">
          <h2 className="text-sm font-bold text-white">5. Disclaimer</h2>
          <p className="text-zinc-400">
            DeGigamon is an educational and digital rights initiative. We evaluate privacy tools based on documented cryptographic standards, licensing, and security audits. However, users should always exercise their own diligence when deploying software for mission-critical or life-safety threat models.
          </p>
        </section>
      </div>
    </div>
  );
};
