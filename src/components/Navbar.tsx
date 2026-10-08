import React, { useState } from 'react';
import { Shield, Download, RotateCcw, Share2, Menu, X, BookOpen, Layers, ShieldAlert, Sparkles, HelpCircle } from 'lucide-react';
import { PRESET_STACKS } from '../data/presets';
import { ActivePage } from '../data/types';

interface NavbarProps {
  activePage: ActivePage;
  onNavigate: (page: ActivePage) => void;
  sovereigntyScore: number;
  activeCategoriesCount: number;
  totalCategoriesCount: number;
  onOpenExport: () => void;
  onOpenShare: () => void;
  onApplyPreset: (presetId: string) => void;
  onReset: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onNavigate,
  sovereigntyScore,
  activeCategoriesCount,
  totalCategoriesCount,
  onOpenExport,
  onOpenShare,
  onApplyPreset,
  onReset,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: ActivePage; label: string; icon: React.ReactNode }[] = [
    { id: 'builder', label: 'Builder', icon: <Layers className="h-4 w-4" /> },
    { id: 'dossiers', label: 'Gigamons', icon: <ShieldAlert className="h-4 w-4" /> },
    { id: 'alternatives', label: 'Alternatives', icon: <Sparkles className="h-4 w-4" /> },
    { id: 'about', label: 'Manifesto', icon: <BookOpen className="h-4 w-4" /> },
    { id: 'faq', label: 'FAQ', icon: <HelpCircle className="h-4 w-4" /> },
  ];

  const handleNavClick = (page: ActivePage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-[#09090b]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand & Left Navigation */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => handleNavClick('builder')}
            className="flex items-center gap-3 focus:outline-none text-left"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-800 text-white border border-zinc-700 shadow-sm">
              <Shield className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <span className="text-base sm:text-lg font-bold tracking-tight text-white">DeGigamon</span>
                {activePage === 'builder' && (
                  <span className="text-xs text-zinc-400 font-medium hidden md:inline">
                    {activeCategoriesCount}/{totalCategoriesCount} switched
                  </span>
                )}
              </div>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                    isActive
                      ? 'bg-zinc-800 text-white font-semibold'
                      : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
                  }`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Preset Selector (Visible on Builder page or desktop) */}
          <div className="relative hidden sm:block">
            <select
              aria-label="Presets"
              onChange={(e) => {
                if (e.target.value) {
                  onApplyPreset(e.target.value);
                  if (activePage !== 'builder') onNavigate('builder');
                }
              }}
              defaultValue=""
              className="appearance-none rounded-xl border border-zinc-800 bg-zinc-900/90 px-3.5 py-2 pr-8 text-sm font-medium text-zinc-300 transition hover:border-zinc-700 focus:border-zinc-500 focus:outline-none cursor-pointer"
            >
              <option value="" disabled>Presets...</option>
              {PRESET_STACKS.map((preset) => (
                <option key={preset.id} value={preset.id}>
                  {preset.title}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-3 top-2.5 text-zinc-500 text-xs">
              ▾
            </div>
          </div>

          {/* Share Button */}
          <button
            onClick={onOpenShare}
            title="Share your stack on social networks or copy link"
            className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-sm font-medium text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
          >
            <Share2 className="h-4 w-4" />
            <span className="hidden sm:inline">Share</span>
          </button>

          {/* Reset Button */}
          <button
            onClick={onReset}
            title="Reset stack"
            className="hidden items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 p-2.5 text-zinc-400 transition hover:bg-zinc-800 hover:text-zinc-200 sm:flex"
          >
            <RotateCcw className="h-4 w-4" />
          </button>

          {/* Export Card CTA */}
          <button
            onClick={onOpenExport}
            className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-zinc-200 active:scale-95 shadow-sm"
          >
            <Download className="h-4 w-4" />
            <span>EXPORT</span>
          </button>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-xl border border-zinc-800 bg-zinc-900 p-2 text-zinc-400 hover:text-white lg:hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="border-t border-zinc-800 bg-zinc-950 p-4 space-y-2 lg:hidden animate-in slide-in-from-top-2 duration-150">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-zinc-800">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition ${
                    isActive
                      ? 'bg-zinc-800 text-white font-semibold'
                      : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                  }`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 flex items-center justify-between">
            <span className="text-[11px] text-zinc-500">
              {activeCategoriesCount} of {totalCategoriesCount} switched ({sovereigntyScore}%)
            </span>
            <button
              onClick={() => {
                onReset();
                setMobileMenuOpen(false);
              }}
              className="text-[11px] text-zinc-400 hover:text-white"
            >
              Reset Stack
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
