import React from 'react';
import { ShieldCheck, CheckCircle2, Lock, FileCode } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 space-y-10 animate-in fade-in duration-200">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-950/40 px-3 py-1 text-xs font-semibold dark:text-emerald-400">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Zero-Telemetry Declaration</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
          Privacy Policy & Terms
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
          Effective Date: Permanent · Version 1.0 · Open Source (MIT)
        </p>
      </div>

      {/* Summary Box */}
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-500/30 dark:bg-emerald-950/20 p-6 text-sm dark:text-emerald-300 space-y-2">
        <span className="font-bold text-emerald-950 dark:text-emerald-200 text-base">The 10-Second Summary:</span>
        <p className="leading-relaxed">
          SovStack collects <strong>zero personal data</strong>. We do not use cookies, we do not run Google Analytics, we have no tracking pixels, and we have no server-side database. Everything you do on SovStack stays in your browser.
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-7 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
        <section className="space-y-2.5">
          <h2 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            <span>1. Information We Collect</span>
          </h2>
          <p>
            We collect <strong>no information whatsoever</strong>. When you use SovStack, no IP addresses, user agent strings, device fingerprints, or browsing sessions are recorded, transmitted, or stored on external servers by us.
          </p>
        </section>

        <section className="space-y-2.5">
          <h2 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <Lock className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            <span>2. Local Storage and Client-Side State</span>
          </h2>
          <p>
            Your pack selections and custom alternatives are saved exclusively in your browser’s local storage (<code className="rounded bg-zinc-200 text-zinc-800 dark:bg-zinc-900 px-1.5 py-0.5 dark:text-zinc-300 text-xs">localStorage</code>) to preserve your preferences across visits. This data never leaves your device unless you choose to share a stateful link.
          </p>
          <p>
            When you generate a share link, your configuration is Base64 encoded into the URL hash fragment (<code className="rounded bg-zinc-200 text-zinc-800 dark:bg-zinc-900 px-1.5 py-0.5 dark:text-zinc-300 text-xs">#pack=...</code>). Because URL hash fragments are never sent to web servers during HTTP requests (per RFC 3986), your stack is only decoded by the recipient's client device.
          </p>
        </section>

        <section className="space-y-2.5">
          <h2 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            <span>3. Cookies and Third-Party Requests</span>
          </h2>
          <p>
            SovStack uses <strong>no cookies</strong>, no session identifiers, no advertising pixels, no external font CDNs, and no analytics SDKs. When you click an external link to a listed software project, that third-party site is governed by its own privacy policy.
          </p>
        </section>

        <section className="space-y-2.5">
          <h2 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <FileCode className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            <span>4. Open Source License &amp; Auditing</span>
          </h2>
          <p>
            SovStack is released under the permissive <strong>MIT License</strong>. The complete source code is public and fully auditable.
          </p>
        </section>

        <section className="space-y-2.5 border-t border-zinc-200 dark:border-zinc-800 pt-5">
          <h2 className="text-base font-bold text-zinc-900 dark:text-white">5. Terms of Use &amp; Disclaimer</h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            SovStack is provided &ldquo;as is&rdquo; without warranty of any kind for educational and informational purposes. We evaluate tools based on documented licensing, cryptographic design, and public records, and have no commercial affiliation with listed projects. Users should independently verify software suitability for their own threat model.
          </p>
        </section>
      </div>
    </div>
  );
};
