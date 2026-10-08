import { useState, useEffect, useCallback, useMemo } from 'react';
import { CATEGORIES } from '../data/catalog';
import { PRESET_STACKS } from '../data/presets';
import { CardTheme, CardAspectRatio, PackSelection, GigamonParent } from '../data/types';

const STORAGE_KEY = 'degigamon_pack_v1';

export interface PackStoreState {
  selections: PackSelection;
  theme: CardTheme;
  aspectRatio: CardAspectRatio;
  userName: string;
  customTitle: string;
  searchQuery: string;
  activeFilter: string | null;
}

export function usePackStore() {
  const [selections, setSelections] = useState<PackSelection>(() => {
    // Check URL hash first for shared pack links
    if (typeof window !== 'undefined' && window.location.hash) {
      try {
        const hash = window.location.hash.slice(1);
        const params = new URLSearchParams(hash);
        const packData = params.get('pack');
        if (packData) {
          const decoded = JSON.parse(decodeURIComponent(atob(packData)));
          if (decoded && typeof decoded === 'object') {
            return decoded;
          }
        }
      } catch (e) {
        console.warn('Failed to parse pack from URL hash:', e);
      }
    }

    // Otherwise check local storage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
    }

    // Default: use the Everyday Practical Privacy preset
    const defaultPreset = PRESET_STACKS[0]; // degoogle preset
    return defaultPreset ? defaultPreset.selections : {};
  });

  const [theme, setTheme] = useState<CardTheme>('matrix');
  const [aspectRatio, setAspectRatio] = useState<CardAspectRatio>('1:1');
  const [userName, setUserName] = useState<string>('Sovereign Citizen');
  const [customTitle, setCustomTitle] = useState<string>('My Privacy Wins');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  // Save selections to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(selections));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [selections]);

  const selectMainstream = useCallback((categoryId: string, mainstreamId: string) => {
    setSelections((prev) => {
      const current = prev[categoryId] || { mainstreamId: '', alternativeIds: [] };
      return {
        ...prev,
        [categoryId]: {
          ...current,
          mainstreamId,
        },
      };
    });
  }, []);

  const toggleAlternative = useCallback((categoryId: string, alternativeId: string) => {
    setSelections((prev) => {
      const current = prev[categoryId] || {
        mainstreamId: CATEGORIES.find(c => c.id === categoryId)?.mainstreamApps[0]?.id || '',
        alternativeIds: []
      };

      const exists = current.alternativeIds.includes(alternativeId);
      let updated: string[];

      if (exists) {
        updated = current.alternativeIds.filter(id => id !== alternativeId);
      } else {
        // limit to 3 alternatives per card cell
        if (current.alternativeIds.length >= 3) {
          updated = [...current.alternativeIds.slice(1), alternativeId];
        } else {
          updated = [...current.alternativeIds, alternativeId];
        }
      }

      return {
        ...prev,
        [categoryId]: {
          ...current,
          alternativeIds: updated,
        },
      };
    });
  }, []);

  const removeCategory = useCallback((categoryId: string) => {
    setSelections((prev) => {
      const next = { ...prev };
      delete next[categoryId];
      return next;
    });
  }, []);

  const applyPreset = useCallback((presetId: string) => {
    const preset = PRESET_STACKS.find(p => p.id === presetId);
    if (preset) {
      setSelections(preset.selections);
    }
  }, []);

  const resetPack = useCallback(() => {
    setSelections({});
  }, []);

  // Sovereignty Metrics Calculation
  const metrics = useMemo(() => {
    let activeCategoriesCount = 0;
    const evictedParents = new Set<GigamonParent>();
    const trackedParents = new Set<GigamonParent>();
    const neutralizedVectors = new Set<string>();
    let totalScorePoints = 0;

    CATEGORIES.forEach((cat) => {
      const selection = selections[cat.id];
      if (selection && selection.alternativeIds.length > 0) {
        activeCategoriesCount++;
        const mainstream = cat.mainstreamApps.find(m => m.id === selection.mainstreamId);
        if (mainstream) {
          evictedParents.add(mainstream.parent);
          mainstream.surveillanceVectors.forEach(v => neutralizedVectors.add(v));
          totalScorePoints += 10;
        }

        // Extra points for E2EE or FOSS badges
        selection.alternativeIds.forEach(altId => {
          const alt = cat.alternatives.find(a => a.id === altId);
          if (alt) {
            if (alt.badges.includes('Zero-Knowledge')) totalScorePoints += 3;
            if (alt.badges.includes('E2EE')) totalScorePoints += 2;
            if (alt.badges.includes('FOSS')) totalScorePoints += 2;
            if (alt.badges.includes('Self-Hostable')) totalScorePoints += 2;
          }
        });
      }

      cat.mainstreamApps.forEach(m => trackedParents.add(m.parent));
    });

    // Score normalized to 0-100%
    const maxPossiblePoints = CATEGORIES.length * 15;
    const sovereigntyPercentage = Math.min(100, Math.round((totalScorePoints / maxPossiblePoints) * 100));

    return {
      activeCategoriesCount,
      evictedParents: Array.from(evictedParents),
      neutralizedVectorsCount: neutralizedVectors.size,
      sovereigntyPercentage,
      totalScorePoints,
    };
  }, [selections]);

  const generateShareableUrl = useCallback(() => {
    try {
      const encoded = btoa(encodeURIComponent(JSON.stringify(selections)));
      const url = new URL(window.location.href);
      url.hash = `pack=${encoded}`;
      return url.toString();
    } catch (e) {
      return window.location.href;
    }
  }, [selections]);

  return {
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
  };
}
