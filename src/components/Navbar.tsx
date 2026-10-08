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
    { id: 'builder', label: 'Builder', icon: <Layers className="h-3.5 w-3.5" /> },
    { id: 'dossiers', label: 'Gigamons', icon: <ShieldAlert className="h-3.5 w-3.5" /> },
    { id: 'alternatives', label: 'Alternatives', icon: <Sparkles className="h-3.5 w-3.5" /> },
    { id: 'about', label: 'Manifesto', icon: <BookOpen className="h-3.5 w-3.5" /> },
    { id: 'faq', label: 'FAQ', icon: <HelpCircle className="h-3.5 w-3.5" /> },
  ];

  const handleNavClick = (page: ActivePage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-[#09090b]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2.5 sm:px-6">
        {/* Brand & Left Navigation */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => handleNavClick('builder')}
            className="flex items-center gap-2.5 focus:outline-none text-left"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 text-white border border-zinc-700">
              <Shield className="h-4 w-4 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold tracking-tight text-white">DeGigamon</span>
                {activePage === 'builder' && (
                  <span className="text-[11px] text-zinc-500 font-medium hidden md:inline">
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
                  className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition ${
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
              className="appearance-none rounded-lg border border-zinc-800 bg-zinc-900/90 px-3 py-1.5 pr-7 text-xs font-medium text-zinc-300 transition hover:border-zinc-700 focus:border-zinc-500 focus:outline-none cursor-pointer"
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

          {/* Share Button */}
          <button
            onClick={onOpenShare}
            title="Share your stack on social networks or copy link"
            className="flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Share</span>
          </button>

          {/* Reset Button */}
          <button
            onClick={onReset}
            title="Reset stack"
            className="hidden items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-zinc-200 sm:flex"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>

          {/* Export Card CTA */}
          <button
            onClick={onOpenExport}
            className="flex items-center gap-1.5 rounded-lg bg-white px-3.5 py-1.5 text-xs font-semibold text-black transition hover:bg-zinc-200 active:scale-95 shadow-sm"
          >
            <Download className="h-3.5 w-3.5" />
            <span>EXPORT</span>
          </button>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg border border-zinc-800 bg-zinc-900 p-1.5 text-zinc-400 hover:text-white lg:hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
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
