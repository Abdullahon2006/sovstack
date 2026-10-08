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

export const App: React.FC = () => {
  const {
    selections,
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
        const matchesAlternatives = category.alternatives.some(
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
        const hasMatchingAlternative = category.alternatives.some((alt) =>
          alt.badges.includes(activeFilter as any)
        );
        if (!hasMatchingAlternative) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, activeFilter]);

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col font-sans">
      {/* Navbar */}
      <Navbar
        sovereigntyScore={metrics.sovereigntyPercentage}
        activeCategoriesCount={metrics.activeCategoriesCount}
        totalCategoriesCount={CATEGORIES.length}
        onOpenExport={() => setIsExportOpen(true)}
        onOpenShare={() => setIsShareOpen(true)}
        onApplyPreset={applyPreset}
        onReset={resetPack}
      />

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

      {/* Main Content Area */}
      <main className="mx-auto max-w-5xl flex-1 px-4 py-6 sm:px-6 w-full space-y-4">
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
              />
            ))}
          </div>
        )}
      </main>

      {/* Minimal Footer */}
      <footer className="mt-16 border-t border-zinc-800/80 bg-[#0c0c0e] px-4 py-8 sm:px-6 text-center text-xs text-zinc-500">
        <p className="font-medium text-zinc-400">DeGigamon</p>
        <p className="mt-1 text-[11px] text-zinc-600">
          Open-source alternative to{' '}
          <a
            href="https://privacypack.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 underline hover:text-white"
          >
            PrivacyPack.org
          </a>{' '}
          · 100% Client-Side · Zero Telemetry · MIT License
        </p>
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
      />
    </div>
  );
};

export default App;
