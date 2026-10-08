import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, BookOpen, Key, Mail, HardDrive, Shield } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'How is the Digital Sovereignty Score calculated?',
    answer:
      'Your score is based on the total categories where you have replaced a surveillance monolith with a privacy alternative. Each category switch earns baseline sovereignty points (10 pts). Bonus points are awarded for strong cryptographic and architectural guarantees: +3 points for Zero-Knowledge architectures, +2 points for End-to-End Encryption (E2EE), +2 points for Free and Open Source (FOSS) licenses, and +2 points for Self-Hostable capability. The score is normalized to a clean 0–100% scale.',
  },
  {
    question: 'Does DeGigamon send my stack or selections to any server?',
    answer:
      'No. DeGigamon has zero backend databases, zero telemetry, zero cookies, and zero external analytical scripts. All state is processed entirely within your browser runtime using the standard Web APIs and localStorage. When you share a stack, the data is compressed into a stateful URL hash (#pack=...) that executes client-side on the recipient device.',
  },
  {
    question: 'Can I add custom or niche privacy tools not in the directory?',
    answer:
      'Yes! Open the alternative picker on any category and click "Custom". You can input your tool\'s name, official website, trust badges (FOSS, E2EE, Self-Hostable, etc.), and description. Custom tools are saved locally and encoded into your shareable link.',
  },
  {
    question: 'How do I migrate from Gmail to Proton Mail or Tuta without losing email?',
    answer:
      'Both Proton Mail (via Proton Easy Switch) and Tuta Mail support automated IMAP/OAuth forwarding and migration tools. You can export your Gmail archive using Google Takeout or connect directly via Easy Switch to import all existing emails, folders, and calendar entries while setting up an automatic forwarding rule during your transition period.',
  },
  {
    question: 'What is the easiest way to switch from Google Passwords to Bitwarden or KeePassXC?',
    answer:
      '1. In Google Chrome, go to chrome://password-manager/settings and click "Export passwords" to download your passwords as a CSV file. 2. Log in to Bitwarden (vault.bitwarden.com), go to Tools -> Import Data, select "Chrome (csv)", and upload the file. 3. Immediately delete the unencrypted CSV file from your computer using secure deletion or empty your trash bin.',
  },
  {
    question: 'Why not just use Brave or DuckDuckGo and keep Google for everything else?',
    answer:
      'While switching your browser and search engine cuts off significant web-tracking vectors, Google and other monoliths still correlate your identity through your Android/iOS accounts, Google Drive documents, Google Photos face-clustering, and Google Maps location pings. A multi-vector privacy defense distributes your dependencies across independent entities.',
  },
  {
    question: 'How does DeGigamon compare to PrivacyPack.org?',
    answer:
      'DeGigamon was built as an open-source, client-side, zero-telemetry alternative to PrivacyPack.org. It features an expanded catalog of 24 categories and 231 services across all major monoliths (including Microsoft, Apple, Amazon, ByteDance, and OpenAI), custom manual alternative adding, high-resolution vector export cards, and complete corporate surveillance dossiers.',
  },
];

export const FaqPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 space-y-12 animate-in fade-in duration-200">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 text-xs font-semibold text-zinc-300">
          <HelpCircle className="h-3.5 w-3.5 text-emerald-400" />
          <span>Knowledge Base & FAQ</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-4xl">
          Frequently Asked Questions
        </h1>
        <p className="mx-auto max-w-2xl text-xs sm:text-sm text-zinc-400 leading-relaxed">
          Everything you need to know about digital sovereignty, score calculations, practical migration playbooks, and how DeGigamon operates.
        </p>
      </div>

      {/* Migration Playbooks Highlights */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-zinc-800 bg-[#0f1117] p-5 space-y-2.5">
          <div className="flex items-center gap-2 text-sm font-semibold text-emerald-400">
            <Mail className="h-5 w-5" />
            <span>Email Migration</span>
          </div>
          <p className="text-sm text-zinc-300 leading-relaxed">
            Use Proton Easy Switch or Tuta Mail import to seamlessly transfer Gmail folders and contacts.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-[#0f1117] p-5 space-y-2.5">
          <div className="flex items-center gap-2 text-sm font-semibold text-blue-400">
            <Key className="h-5 w-5" />
            <span>Password Vaults</span>
          </div>
          <p className="text-sm text-zinc-300 leading-relaxed">
            Export Chrome CSV credentials into Bitwarden or KeePassXC with zero-knowledge master passwords.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-[#0f1117] p-5 space-y-2.5">
          <div className="flex items-center gap-2 text-sm font-semibold text-purple-400">
            <Shield className="h-5 w-5" />
            <span>Encrypted DNS</span>
          </div>
          <p className="text-sm text-zinc-300 leading-relaxed">
            Switch your router or phone Private DNS to Quad9 (9.9.9.9) or self-hosted Pi-hole to block trackers at the wire.
          </p>
        </div>
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-3.5">
        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="rounded-2xl border border-zinc-800 bg-[#0f1117] transition hover:border-zinc-700/80 overflow-hidden"
            >
              <button
                onClick={() => toggle(index)}
                className="flex w-full items-center justify-between p-5 sm:p-6 text-left text-sm sm:text-base font-semibold text-white focus:outline-none"
              >
                <span>{faq.question}</span>
                {isOpen ? (
                  <ChevronUp className="h-5 w-5 text-zinc-400 shrink-0 ml-3" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-zinc-400 shrink-0 ml-3" />
                )}
              </button>

              {isOpen && (
                <div className="border-t border-zinc-800/80 bg-zinc-950/60 p-5 sm:p-6 text-sm text-zinc-300 leading-relaxed animate-in slide-in-from-top-1 duration-150">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
