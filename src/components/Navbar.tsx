import React, { useState } from 'react';
import { Download, RotateCcw, Share2, Menu, X, BookOpen, Layers, ShieldAlert, Sparkles, HelpCircle, Sun, Moon } from 'lucide-react';
import { PRESET_STACKS } from '../data/presets';
import { ActivePage } from '../data/types';
import { ColorMode } from '../store/packStore';

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
  colorMode: ColorMode;
  onToggleColorMode: () => void;
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
  colorMode,
  onToggleColorMode,
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
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200 bg-white/95 dark:border-zinc-800/80 dark:bg-[#09090b]/95 backdrop-blur-md transition-colors duration-200">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand & Left Navigation */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => handleNavClick('builder')}
            className="flex items-center gap-3 focus:outline-none text-left"
          >
            <svg viewBox="0 0 64 64" className="h-9 w-9 shrink-0" aria-hidden="true">
              <defs>
                <linearGradient id="navBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#18181B" />
                  <stop offset="100%" stopColor="#09090B" />
                </linearGradient>
                <linearGradient id="navTopPlate" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6EE7B7" />
                  <stop offset="55%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
              </defs>
              <rect x="2" y="2" width="60" height="60" rx="14" fill="url(#navBgGrad)" stroke="#27272A" strokeWidth="1.5" />
              <path d="M17 39.5 L32 47.5 L47 39.5" fill="none" stroke="#047857" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M17 31.5 L32 39.5 L47 31.5" fill="none" stroke="#10B981" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M32 16 L47 24 L32 32 L17 24 Z" fill="url(#navTopPlate)" stroke="url(#navTopPlate)" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M19 23.6 L32 16.8 L45 23.6" fill="none" stroke="#ECFDF5" strokeWidth="1.1" strokeLinecap="round" opacity="0.65" />
              <path d="M32 20.2 L37.8 23.3 L32 26.4 L26.2 23.3 Z" fill="#064E3B" opacity="0.35" />
            </svg>
            <div>
              <span className="text-base sm:text-lg font-bold tracking-tight text-zinc-900 dark:text-white">SovStack</span>
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
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition whitespace-nowrap ${
                    isActive
                      ? 'bg-zinc-100 text-zinc-900 font-semibold dark:bg-zinc-800 dark:text-white'
                      : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-200'
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
              className="appearance-none rounded-xl border border-zinc-200 bg-white px-3.5 py-2 pr-8 text-sm font-medium text-zinc-700 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/90 dark:text-zinc-300 transition dark:hover:border-zinc-700 focus:border-zinc-400 dark:focus:border-zinc-500 focus:outline-none cursor-pointer"
            >
              <option value="" disabled>Presets...</option>
              {PRESET_STACKS.map((preset) => (
                <option key={preset.id} value={preset.id}>
                  {preset.title}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 text-xs">
              ▾
            </div>
          </div>

          {/* One-Click Day / Night Mode Switch */}
          <button
            onClick={onToggleColorMode}
            title={colorMode === 'dark' ? 'Switch to Day Mode' : 'Switch to Night Mode'}
            aria-label={colorMode === 'dark' ? 'Switch to Day Mode' : 'Switch to Night Mode'}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white transition shrink-0"
          >
            {colorMode === 'dark' ? (
              <Sun className="h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="h-4 w-4 text-indigo-600" />
            )}
          </button>

          {/* Share Button */}
          <button
            onClick={onOpenShare}
            title="Share your stack on social networks or copy link"
            className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3.5 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 transition dark:hover:bg-zinc-800 dark:hover:text-white whitespace-nowrap"
          >
            <Share2 className="h-4 w-4" />
            <span className="hidden sm:inline">Share</span>
          </button>

          {/* Reset Button */}
          <button
            onClick={onReset}
            title="Reset stack"
            className="hidden h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 transition dark:hover:bg-zinc-800 dark:hover:text-zinc-200 sm:flex shrink-0"
          >
            <RotateCcw className="h-4 w-4" />
          </button>

          {/* Export Card CTA */}
          <button
            onClick={onOpenExport}
            className="flex items-center gap-2 rounded-xl bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white px-4 py-2 text-sm font-semibold dark:text-black transition dark:hover:bg-zinc-200 shadow-sm whitespace-nowrap"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-xl border border-zinc-200 bg-white p-2 text-zinc-600 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:text-white lg:hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 p-4 space-y-2 lg:hidden animate-in slide-in-from-top-2 duration-150">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-zinc-200 dark:border-zinc-800">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition ${
                    isActive
                      ? 'bg-zinc-100 text-zinc-900 font-semibold dark:bg-zinc-800 dark:text-white'
                      : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white'
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
              className="text-[11px] text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            >
              Reset Stack
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
