import { useState, useEffect, useCallback, useMemo } from 'react';
import { CATEGORIES } from '../data/catalog';
import { PRESET_STACKS } from '../data/presets';
import {
  CardTheme,
  CardAspectRatio,
  PackSelection,
  GigamonParent,
  PrivacyAlternative,
  ActivePage,
} from '../data/types';

const STORAGE_KEY = 'sovstack_pack_v1';
const CUSTOM_ALTS_KEY = 'sovstack_custom_alts_v1';
const COLOR_MODE_KEY = 'sovstack_color_mode_v1';
const LEGACY_STORAGE_KEY = 'degigamon_pack_v1';
const LEGACY_CUSTOM_ALTS_KEY = 'degigamon_custom_alts_v1';

export type ColorMode = 'dark' | 'light';

function parseHashPage(hash: string): ActivePage {
  const clean = hash.replace(/^[#\/]+/, '').split('?')[0].split('&')[0];
  if (clean === 'dossiers') return 'dossiers';
  if (clean === 'alternatives') return 'alternatives';
  if (clean === 'about') return 'about';
  if (clean === 'faq') return 'faq';
  if (clean === 'privacy') return 'privacy';
  return 'builder';
}

export function usePackStore() {
  // Navigation / active page state synced with hash
  const [activePage, setActivePageState] = useState<ActivePage>(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      return parseHashPage(window.location.hash);
    }
    return 'builder';
  });

  const setActivePage = useCallback((page: ActivePage) => {
    setActivePageState(page);
    if (typeof window !== 'undefined') {
      if (page === 'builder') {
        // Keep hash clean or preserve pack param if any
        if (window.location.hash.includes('pack=')) {
          // keep pack
        } else {
          history.pushState(null, '', window.location.pathname + window.location.search);
        }
      } else {
        window.location.hash = `#/${page}`;
      }
    }
  }, []);

  // Listen to hash change for browser back/forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const page = parseHashPage(window.location.hash);
      setActivePageState(page);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Custom alternatives state
  const [customAlternatives, setCustomAlternatives] = useState<Record<string, PrivacyAlternative[]>>(() => {
    // 1. Try URL hash payload
    if (typeof window !== 'undefined' && window.location.hash) {
      try {
        const hash = window.location.hash.slice(1);
        const params = new URLSearchParams(hash);
        const packData = params.get('pack');
        if (packData) {
          const decoded = JSON.parse(decodeURIComponent(atob(packData)));
          if (decoded && decoded.custom && typeof decoded.custom === 'object') {
            return decoded.custom;
          }
        }
      } catch (e) {
        console.warn('Failed to parse custom alts from hash:', e);
      }
    }

    // 2. Try localStorage (with legacy key fallback)
    if (typeof window !== 'undefined') {
      const saved =
        localStorage.getItem(CUSTOM_ALTS_KEY) ??
        localStorage.getItem(LEGACY_CUSTOM_ALTS_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
    }

    return {};
  });

  // Save custom alternatives to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CUSTOM_ALTS_KEY, JSON.stringify(customAlternatives));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [customAlternatives]);

  // Selections state
  const [selections, setSelections] = useState<PackSelection>(() => {
    // 1. Try URL hash first
    if (typeof window !== 'undefined' && window.location.hash) {
      try {
        const hash = window.location.hash.slice(1);
        const params = new URLSearchParams(hash);
        const packData = params.get('pack');
        if (packData) {
          const decoded = JSON.parse(decodeURIComponent(atob(packData)));
          if (decoded && typeof decoded === 'object') {
            if (decoded.selections) return decoded.selections;
            return decoded; // legacy format
          }
        }
      } catch (e) {
        console.warn('Failed to parse pack from URL hash:', e);
      }
    }

    // 2. Try localStorage (with legacy key fallback)
    if (typeof window !== 'undefined') {
      const saved =
        localStorage.getItem(STORAGE_KEY) ??
        localStorage.getItem(LEGACY_STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
    }

    // Default: use De-Google preset
    const defaultPreset = PRESET_STACKS[0];
    return defaultPreset ? defaultPreset.selections : {};
  });

  const [theme, setTheme] = useState<CardTheme>('matrix');
  const [aspectRatio, setAspectRatio] = useState<CardAspectRatio>('1:1');
  const [userName, setUserName] = useState<string>('Sovereign Citizen');
  const [customTitle, setCustomTitle] = useState<string>('My Privacy Wins');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [colorMode, setColorMode] = useState<ColorMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(COLOR_MODE_KEY);
      if (saved === 'light' || saved === 'dark') return saved;
    }
    return 'dark';
  });

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const isDark = colorMode === 'dark';
      document.documentElement.classList.toggle('dark', isDark);
      document.documentElement.style.colorScheme = colorMode;
    }
    try {
      localStorage.setItem(COLOR_MODE_KEY, colorMode);
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [colorMode]);

  const toggleColorMode = useCallback(() => {
    setColorMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

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
        mainstreamId: CATEGORIES.find((c) => c.id === categoryId)?.mainstreamApps[0]?.id || '',
        alternativeIds: [],
      };

      const exists = current.alternativeIds.includes(alternativeId);
      let updated: string[];

      if (exists) {
        updated = current.alternativeIds.filter((id) => id !== alternativeId);
      } else {
        // limit to 3 alternatives per category cell
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

  const addCustomAlternative = useCallback(
    (categoryId: string, altData: Omit<PrivacyAlternative, 'id' | 'isCustom'>): string => {
      const newId = `custom_${Date.now()}`;
      const newAlt: PrivacyAlternative = {
        ...altData,
        id: newId,
        isCustom: true,
      };

      setCustomAlternatives((prev) => {
        const list = prev[categoryId] || [];
        return {
          ...prev,
          [categoryId]: [...list, newAlt],
        };
      });

      // Automatically select the newly created alternative
      toggleAlternative(categoryId, newId);
      return newId;
    },
    [toggleAlternative]
  );

  const deleteCustomAlternative = useCallback((categoryId: string, altId: string) => {
    setCustomAlternatives((prev) => {
      const list = prev[categoryId] || [];
      return {
        ...prev,
        [categoryId]: list.filter((a) => a.id !== altId),
      };
    });

    // Deselect if currently active
    setSelections((prev) => {
      const sel = prev[categoryId];
      if (!sel || !sel.alternativeIds.includes(altId)) return prev;
      return {
        ...prev,
        [categoryId]: {
          ...sel,
          alternativeIds: sel.alternativeIds.filter((id) => id !== altId),
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
    const preset = PRESET_STACKS.find((p) => p.id === presetId);
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
      const customList = customAlternatives[cat.id] || [];

      if (selection && selection.alternativeIds.length > 0) {
        activeCategoriesCount++;
        const mainstream = cat.mainstreamApps.find((m) => m.id === selection.mainstreamId);
        if (mainstream) {
          evictedParents.add(mainstream.parent);
          mainstream.surveillanceVectors.forEach((v) => neutralizedVectors.add(v));
          totalScorePoints += 10;
        }

        // Extra points for trust badges
        selection.alternativeIds.forEach((altId) => {
          const alt = cat.alternatives.find((a) => a.id === altId) || customList.find((a) => a.id === altId);
          if (alt) {
            if (alt.badges.includes('Zero-Knowledge')) totalScorePoints += 3;
            if (alt.badges.includes('E2EE')) totalScorePoints += 2;
            if (alt.badges.includes('FOSS')) totalScorePoints += 2;
            if (alt.badges.includes('Self-Hostable')) totalScorePoints += 2;
          }
        });
      }

      cat.mainstreamApps.forEach((m) => trackedParents.add(m.parent));
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
  }, [selections, customAlternatives]);

  const generateShareableUrl = useCallback(() => {
    try {
      const payload = {
        selections,
        custom: customAlternatives,
      };
      const encoded = btoa(encodeURIComponent(JSON.stringify(payload)));
      const url = new URL(window.location.href);
      url.hash = `pack=${encoded}`;
      return url.toString();
    } catch (e) {
      return window.location.href;
    }
  }, [selections, customAlternatives]);

  return {
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
  };
}
