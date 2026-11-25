import React, { useState, useMemo, useEffect } from 'react';
import { CATEGORIES } from './data/catalog';
import { MainstreamApp, ActivePage } from './data/types';
import { usePackStore } from './store/packStore';
import { Navbar } from './components/Navbar';
import { SovereigntyHeader } from './components/SovereigntyHeader';
import { CategoryPickerCard } from './components/CategoryPickerCard';
import { VendorDossierModal } from './components/VendorDossierModal';
import { ExportModal } from './components/ExportModal';
import { ShareModal } from './components/ShareModal';
import { DossiersPage } from './components/pages/DossiersPage';
import { AlternativesPage } from './components/pages/AlternativesPage';
import { AboutPage } from './components/pages/AboutPage';
import { FaqPage } from './components/pages/FaqPage';
import { PrivacyPage } from './components/pages/PrivacyPage';

const PAGE_TITLES: Record<ActivePage, string> = {
  builder: 'SovStack · Digital Sovereignty Stack Builder',
  dossiers: 'Big Tech Profiles · SovStack',
  alternatives: 'Privacy Tools Directory · SovStack',
  about: 'Manifesto · SovStack',
  faq: 'FAQ & Migration · SovStack',
  privacy: 'Privacy Policy & Terms · SovStack',
};

export const App: React.FC = () => {
  const {
    activePage,
    setActivePage,
    selections,
    customAlternatives,
    addCustomAlternative,
    deleteCustomAlternative,
    theme,
    setTheme,
    aspectRatio,
    setAspectRatio,
    userName,
    setUserName,
    customTitle,
    setCustomTitle,
    searchQuery,
    setSearchQuery,
    selectMainstream,
    toggleAlternative,
    removeCategory,
    colorMode,
    toggleColorMode,
    applyPreset,
    resetPack,
    metrics,
    generateShareableUrl,
  } = usePackStore();

  const [inspectedMainstream, setInspectedMainstream] = useState<MainstreamApp | null>(null);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = PAGE_TITLES[activePage] || PAGE_TITLES.builder;
    }
  }, [activePage]);

  // Filter categories according to search query
  const filteredCategories = useMemo(() => {
    return CATEGORIES.filter((category) => {
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesCategory =
          category.name.toLowerCase().includes(query) ||
          category.description.toLowerCase().includes(query);
        const matchesMainstream = category.mainstreamApps.some(
          (m) =>
            m.name.toLowerCase().includes(query) ||
            m.parent.toLowerCase().includes(query)
        );
        const customList = customAlternatives[category.id] || [];
        const matchesAlternatives =
          category.alternatives.some(
            (a) =>
              a.name.toLowerCase().includes(query) ||
              a.description.toLowerCase().includes(query)
          ) ||
          customList.some(
            (a) =>
              a.name.toLowerCase().includes(query) ||
              a.description.toLowerCase().includes(query)
          );

        if (!matchesCategory && !matchesMainstream && !matchesAlternatives) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, customAlternatives]);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-[#09090b] dark:text-zinc-100 flex flex-col font-sans transition-colors duration-200">
      {/* Navbar with page routing */}
      <Navbar
        activePage={activePage}
        onNavigate={setActivePage}
        sovereigntyScore={metrics.sovereigntyPercentage}
        activeCategoriesCount={metrics.activeCategoriesCount}
        totalCategoriesCount={CATEGORIES.length}
        onOpenExport={() => setIsExportOpen(true)}
        onOpenShare={() => setIsShareOpen(true)}
        onApplyPreset={applyPreset}
        onReset={resetPack}
        colorMode={colorMode}
        onToggleColorMode={toggleColorMode}
      />

      {/* Main Content Area Driven by activePage */}
      <div className="flex-1">
        {activePage === 'builder' && (
          <>
            {/* Minimal Header */}
            <SovereigntyHeader
              sovereigntyScore={metrics.sovereigntyPercentage}
              activeCategoriesCount={metrics.activeCategoriesCount}
              totalCategoriesCount={CATEGORIES.length}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />

            {/* Category Cards List */}
            <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 w-full space-y-4">
              {filteredCategories.length === 0 ? (
                <div className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 p-10 text-center">
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">No categories match your search.</p>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="mt-3 rounded-lg bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-800 px-3 py-1.5 text-xs font-medium dark:text-white dark:hover:bg-zinc-700"
                  >
                    Clear search
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredCategories.map((category) => (
                    <CategoryPickerCard
                      key={category.id}
                      category={category}
                      selectedMainstreamId={selections[category.id]?.mainstreamId}
                      selectedAlternativeIds={selections[category.id]?.alternativeIds || []}
                      onSelectMainstream={(mainstreamId) => selectMainstream(category.id, mainstreamId)}
                      onToggleAlternative={(altId) => toggleAlternative(category.id, altId)}
                      onRemoveCategory={() => removeCategory(category.id)}
                      onInspectMainstream={(app) => setInspectedMainstream(app)}
                      customAlternatives={customAlternatives[category.id]}
                      onAddCustomAlternative={addCustomAlternative}
                      onDeleteCustomAlternative={deleteCustomAlternative}
                    />
                  ))}
                </div>
              )}
            </main>
          </>
        )}

        {activePage === 'dossiers' && <DossiersPage />}

        {activePage === 'alternatives' && (
          <AlternativesPage
            onSelectAlternativeForCategory={toggleAlternative}
            onNavigateToBuilder={() => setActivePage('builder')}
          />
        )}

        {activePage === 'about' && (
          <AboutPage onNavigateToBuilder={() => setActivePage('builder')} />
        )}

        {activePage === 'faq' && <FaqPage />}

        {activePage === 'privacy' && <PrivacyPage />}
      </div>

      {/* Comprehensive Publishable Footer */}
      <footer className="mt-20 border-t border-zinc-200 bg-white text-zinc-600 dark:border-zinc-800/80 dark:bg-[#0c0c0e] dark:text-zinc-400 px-4 py-12 sm:px-6 text-sm transition-colors duration-200">
        <div className="mx-auto max-w-5xl space-y-7">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 border-b border-zinc-200 dark:border-zinc-800/60 pb-7">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2.5">
                <span className="text-base font-bold text-zinc-900 dark:text-white">SovStack</span>
                <span className="rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/80 px-2 py-0.5 text-xs font-medium dark:text-emerald-400 dark:border-emerald-800/60">
                  Open Source
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                Open-source digital sovereignty suite · Reclaim your digital independence.
              </p>
            </div>

            {/* Quick Navigation Links */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5 text-sm">
              <button
                onClick={() => setActivePage('builder')}
                className="hover:text-zinc-900 dark:hover:text-white transition"
              >
                Pack Builder
              </button>
              <button
                onClick={() => setActivePage('dossiers')}
                className="hover:text-zinc-900 dark:hover:text-white transition"
              >
                Big Tech
              </button>
              <button
                onClick={() => setActivePage('alternatives')}
                className="hover:text-zinc-900 dark:hover:text-white transition"
              >
                Privacy Tools
              </button>
              <button
                onClick={() => setActivePage('about')}
                className="hover:text-zinc-900 dark:hover:text-white transition"
              >
                Manifesto
              </button>
              <button
                onClick={() => setActivePage('faq')}
                className="hover:text-zinc-900 dark:hover:text-white transition"
              >
                FAQ & Migration
              </button>
              <button
                onClick={() => setActivePage('privacy')}
                className="hover:text-zinc-900 dark:hover:text-white transition"
              >
                Privacy & Terms
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-zinc-500">
            <p>MIT License</p>
          </div>
        </div>
      </footer>

      {/* Dossier Modal */}
      <VendorDossierModal
        app={inspectedMainstream}
        onClose={() => setInspectedMainstream(null)}
      />

      {/* Export Studio Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        selections={selections}
        theme={theme}
        onThemeChange={setTheme}
        aspectRatio={aspectRatio}
        onAspectRatioChange={setAspectRatio}
        userName={userName}
        onUserNameChange={setUserName}
        customTitle={customTitle}
        onCustomTitleChange={setCustomTitle}
        sovereigntyScore={metrics.sovereigntyPercentage}
        evictedCount={metrics.evictedParents.length}
        customAlternatives={customAlternatives}
      />

      {/* Social & Link Share Modal */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        selections={selections}
        theme={theme}
        aspectRatio={aspectRatio}
        userName={userName}
        customTitle={customTitle}
        sovereigntyScore={metrics.sovereigntyPercentage}
        evictedCount={metrics.evictedParents.length}
        shareUrl={generateShareableUrl()}
        customAlternatives={customAlternatives}
      />
    </div>
  );
};

export default App;
