import React, { useState, useMemo } from 'react';
import { CATEGORIES } from './data/catalog';
import { MainstreamApp } from './data/types';
import { usePackStore } from './store/packStore';
import { Navbar } from './components/Navbar';
import { SovereigntyHeader } from './components/SovereigntyHeader';
import { CategoryPickerCard } from './components/CategoryPickerCard';
import { GigamonDossierModal } from './components/GigamonDossierModal';
import { ExportModal } from './components/ExportModal';
import { ShareModal } from './components/ShareModal';
import { DossiersPage } from './components/pages/DossiersPage';
import { AlternativesPage } from './components/pages/AlternativesPage';
import { AboutPage } from './components/pages/AboutPage';
import { FaqPage } from './components/pages/FaqPage';
import { PrivacyPage } from './components/pages/PrivacyPage';
import { ShieldCheck, Heart } from 'lucide-react';

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
    activeFilter,
    setActiveFilter,
    selectMainstream,
    toggleAlternative,
    removeCategory,
    applyPreset,
    resetPack,
    metrics,
    generateShareableUrl,
  } = usePackStore();

  const [inspectedMainstream, setInspectedMainstream] = useState<MainstreamApp | null>(null);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  // Filter categories according to search and badge filters
  const filteredCategories = useMemo(() => {
    return CATEGORIES.filter((category) => {
      // 1. Search Query filter
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

      // 2. Active Badge filter
      if (activeFilter) {
        const customList = customAlternatives[category.id] || [];
        const hasMatchingAlternative =
          category.alternatives.some((alt) =>
            alt.badges.includes(activeFilter as any)
          ) ||
          customList.some((alt) =>
            alt.badges.includes(activeFilter as any)
          );
        if (!hasMatchingAlternative) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, activeFilter, customAlternatives]);

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col font-sans">
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
              evictedCount={metrics.evictedParents.length}
              neutralizedVectorsCount={metrics.neutralizedVectorsCount}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />

            {/* Category Cards List */}
            <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 w-full space-y-4">
              {filteredCategories.length === 0 ? (
                <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-10 text-center">
                  <p className="text-xs text-zinc-400">No categories match your search.</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setActiveFilter(null);
                    }}
                    className="mt-3 rounded-lg bg-zinc-800 px-3 py-1.5 text-xs font-medium text-white hover:bg-zinc-700"
                  >
                    Clear filters
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
      <footer className="mt-20 border-t border-zinc-800/80 bg-[#0c0c0e] px-4 py-12 sm:px-6 text-sm text-zinc-400">
        <div className="mx-auto max-w-5xl space-y-7">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 border-b border-zinc-800/60 pb-7">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2.5">
                <span className="text-base font-bold text-white">DeGigamon</span>
                <span className="rounded-md bg-emerald-950/80 px-2 py-0.5 text-xs font-medium text-emerald-400 border border-emerald-800/60">
                  Open Source
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400">
                The client-side alternative to PrivacyPack.org · Reclaim your digital sovereignty.
              </p>
            </div>

            {/* Quick Navigation Links */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5 text-sm">
              <button
                onClick={() => setActivePage('builder')}
                className="hover:text-white transition"
              >
                Pack Builder
              </button>
              <button
                onClick={() => setActivePage('dossiers')}
                className="hover:text-white transition"
              >
                Surveillance Dossiers
              </button>
              <button
                onClick={() => setActivePage('alternatives')}
                className="hover:text-white transition"
              >
                Privacy Tools
              </button>
              <button
                onClick={() => setActivePage('about')}
                className="hover:text-white transition"
              >
                Manifesto
              </button>
              <button
                onClick={() => setActivePage('faq')}
                className="hover:text-white transition"
              >
                FAQ & Migration
              </button>
              <button
                onClick={() => setActivePage('privacy')}
                className="hover:text-white transition"
              >
                Zero-Telemetry Privacy
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-zinc-500">
            <p>
              100% Client-Side · Zero Cookies · Zero Tracking · MIT License
            </p>
            <p className="flex items-center gap-1">
              <span>Verified for</span>
              <a
                href="https://privacypack.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 underline hover:text-white"
              >
                PrivacyPack
              </a>
              <span>standard compatibility</span>
            </p>
          </div>
        </div>
      </footer>

      {/* Dossier Modal */}
      <GigamonDossierModal
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
