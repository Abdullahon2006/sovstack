import { CATEGORIES } from '../data/catalog';
import { CardTheme, CardAspectRatio, PackSelection, PrivacyAlternative } from '../data/types';
import { getAppSvgString } from './iconSvgs';

interface RenderOptions {
  selections: PackSelection;
  theme: CardTheme;
  aspectRatio: CardAspectRatio;
  userName: string;
  customTitle: string;
  sovereigntyScore: number;
  evictedCount: number;
  customAlternatives?: Record<string, PrivacyAlternative[]>;
}

const svgImageCache = new Map<string, HTMLImageElement>();

async function preloadAppIcons(appIds: string[]): Promise<void> {
  if (typeof window === 'undefined' || typeof Image === 'undefined') return;

  const promises = appIds.map((id) => {
    if (svgImageCache.has(id)) return Promise.resolve();
    const svg = getAppSvgString(id);
    if (!svg) return Promise.resolve();

    return new Promise<void>((resolve) => {
      const img = new Image();
      const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      img.onload = () => {
        svgImageCache.set(id, img);
        URL.revokeObjectURL(url);
        resolve();
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        resolve();
      };
      img.src = url;
    });
  });

  await Promise.all(promises);
}

interface ThemeConfig {
  bg: string;
  cardBg: string;
  cardBorder: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  accent: string;
  accentBg: string;
  accentText: string;
  danger: string;
  dangerBg: string;
  fontFamily: string;
}

const THEMES: Record<CardTheme, ThemeConfig> = {
  matrix: {
    bg: '#090a0f',
    cardBg: '#12141c',
    cardBorder: 'rgba(255, 255, 255, 0.09)',
    textPrimary: '#ffffff',
    textSecondary: '#a1a1aa',
    textMuted: '#71717a',
    accent: '#22c55e',
    accentBg: '#14532d',
    accentText: '#ffffff',
    danger: '#f87171',
    dangerBg: '#450a0a',
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
  },
  eink: {
    bg: '#f8f9fa',
    cardBg: '#ffffff',
    cardBorder: '#e4e4e7',
    textPrimary: '#09090b',
    textSecondary: '#52525b',
    textMuted: '#71717a',
    accent: '#18181b',
    accentBg: '#e4e4e7',
    accentText: '#09090b',
    danger: '#71717a',
    dangerBg: '#f4f4f5',
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
  },
  titanium: {
    bg: '#0b0f19',
    cardBg: '#151c2d',
    cardBorder: '#28354f',
    textPrimary: '#f8fafc',
    textSecondary: '#94a3b8',
    textMuted: '#64748b',
    accent: '#38bdf8',
    accentBg: '#0c4a6e',
    accentText: '#ffffff',
    danger: '#fb7185',
    dangerBg: '#4c0519',
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
  },
  terminal: {
    bg: '#050805',
    cardBg: '#0c140c',
    cardBorder: '#163816',
    textPrimary: '#4ade80',
    textSecondary: '#22c55e',
    textMuted: '#15803d',
    accent: '#86efac',
    accentBg: '#14532d',
    accentText: '#050805',
    danger: '#f87171',
    dangerBg: '#450a0a',
    fontFamily: 'JetBrains Mono, monospace',
  },
  emerald: {
    bg: '#022c22',
    cardBg: '#064e3b',
    cardBorder: '#047857',
    textPrimary: '#ecfdf5',
    textSecondary: '#a7f3d0',
    textMuted: '#6ee7b7',
    accent: '#34d399',
    accentBg: '#065f46',
    accentText: '#022c22',
    danger: '#f87171',
    dangerBg: '#7f1d1d',
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
  },
};

// Brand colors for realistic app icon squircles
const BRAND_COLORS: Record<string, string> = {
  gmail: '#EA4335',
  google_search: '#4285F4',
  google_dns: '#4285F4',
  google_analytics: '#E37400',
  google_pay: '#4285F4',
  chrome: '#EA4335',
  google_drive: '#34A853',
  google_photos: '#4285F4',
  google_maps: '#34A853',
  google_keep: '#F9AB00',
  google_docs: '#4285F4',
  google_auth: '#4285F4',
  google_passwords: '#4285F4',
  gboard: '#4285F4',
  stock_android: '#3DDC84',
  youtube: '#FF0000',
  google_gemini: '#4285F4',
  play_store: '#00875A',
  google_home: '#F4B400',
  waze: '#33CCFF',
  windows: '#00A4EF',
  outlook: '#0078D4',
  edge: '#0078D4',
  onedrive: '#0078D4',
  onenote: '#7719AA',
  teams: '#6264A7',
  bing: '#008080',
  ms_copilot: '#0078D4',
  m365: '#D83B01',
  swiftkey: '#0078D4',
  safari: '#006CFF',
  ios: '#333333',
  macos: '#333333',
  icloud_mail: '#007AFF',
  icloud_drive: '#007AFF',
  icloud_keychain: '#FF9500',
  apple_photos: '#FF2D55',
  apple_notes: '#FFCC00',
  apple_maps: '#34C759',
  app_store: '#007AFF',
  imessage: '#34C759',
  whatsapp: '#25D366',
  instagram: '#E1306C',
  facebook: '#1877F2',
  messenger: '#006AFF',
  tiktok: '#FE2C55',
  chatgpt: '#10A37F',
  meta_ai: '#0081FB',
  meta_pixel: '#0081FB',
  dropbox: '#0061FF',
  spotify: '#1DB954',
  netflix: '#E50914',
  amazon_photos: '#FF9900',
  amazon_alexa_ring: '#00CAFF',
  adobe_acrobat: '#FF0000',
  discord: '#5865F2',
  slack: '#4A154B',
  lastpass: '#D32D27',
  dashlane: '#0E3B43',
  proton_mail: '#6D4AFF',
  proton_drive: '#6D4AFF',
  proton_pass: '#6D4AFF',
  proton_vpn: '#6D4AFF',
  tuta_mail: '#EA1A35',
  signal: '#2C6BED',
  simplex_chat: '#00D26A',
  session: '#00E887',
  matrix_element: '#0DBD8B',
  firefox: '#FF7139',
  librewolf: '#0575E6',
  mullvad_browser: '#F2C500',
  mullvad_vpn: '#F2C500',
  mullvad_dns: '#F2C500',
  brave: '#FB542B',
  brave_search: '#FB542B',
  brave_leo: '#FB542B',
  tor_browser: '#7D4698',
  duckduckgo: '#DE5833',
  duckduckgo_ai: '#DE5833',
  kagi: '#F59E0B',
  searxng: '#34A853',
  startpage: '#2463EB',
  grapheneos: '#1E3A8A',
  calyxos: '#15803D',
  debian: '#D70A53',
  arch_linux: '#1793D1',
  linux_mint: '#87CF3E',
  tails: '#563D7C',
  qubes_os: '#3B82F6',
  nextcloud: '#0082C9',
  ente_photos: '#14B8A6',
  ente_auth: '#14B8A6',
  immich: '#4255FF',
  bitwarden: '#175DDC',
  vaultwarden: '#175DDC',
  keepassxc: '#54BA43',
  aegis: '#00A86B',
  twofas: '#E11D48',
  obsidian: '#7C3AED',
  joplin: '#2563EB',
  standard_notes: '#27272A',
  organic_maps: '#15803D',
  osmand: '#EA580C',
  quad9: '#00529B',
  pihole: '#C51A4A',
  adguard_home: '#16A34A',
  futo_keyboard: '#D97706',
  heliboard: '#0284C7',
  florisboard: '#EC4899',
  mastodon: '#6364FF',
  lemmy: '#059669',
  pixelfed: '#6366F1',
  jellyfin: '#00A4DC',
  newpipe: '#DC2626',
  antennapod: '#0284C7',
  libreoffice: '#16A34A',
  cryptpad: '#0284C7',
  home_assistant: '#0284C7',
  plausible: '#6366F1',
  umami: '#10B981',
  monero: '#FF6600',
  cash_physical: '#15803D',
  rustdesk: '#0E7490',
  fdroid: '#1976D2',
  aurora_store: '#3F51B5',
  ollama_local: '#10A37F',
  venice_ai: '#7C3AED',
  wireguard_selfhost: '#88171A',
};

const PALETTE = [
  '#2563EB', '#7C3AED', '#DB2777', '#059669', '#D97706',
  '#DC2626', '#0891B2', '#4F46E5', '#0D9488', '#EA580C',
];

function getBrandColor(appId: string): string {
  if (BRAND_COLORS[appId]) return BRAND_COLORS[appId];
  let hash = 0;
  for (let i = 0; i < appId.length; i++) {
    hash = (hash << 5) - hash + appId.charCodeAt(i);
    hash |= 0;
  }
  return PALETTE[Math.abs(hash) % PALETTE.length];
}

// Extract intuitive monogram letter
function getAppMonogram(appName: string): string {
  if (!appName) return '?';
  const words = appName.trim().split(/\s+/);
  if (words.length > 1) {
    const firstLower = words[0].toLowerCase();
    if (['google', 'microsoft', 'apple', 'amazon', 'meta'].includes(firstLower)) {
      return words[1].charAt(0).toUpperCase();
    }
  }
  return words[0].charAt(0).toUpperCase();
}

// Helper to truncate text with ellipsis if it exceeds maxWidth
function truncateText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string {
  if (ctx.measureText(text).width <= maxWidth) return text;
  let len = text.length;
  while (len > 0 && ctx.measureText(text.slice(0, len) + '…').width > maxWidth) {
    len--;
  }
  return text.slice(0, len) + '…';
}

// Draw a crisp app icon squircle with brand background and monogram or vector icon
function drawAppSquircle(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  appId: string,
  appName: string,
  isEvicted: boolean,
  theme: CardTheme
) {
  const brandColor = getBrandColor(appId);
  const radius = size * 0.28;
  const svgImg = svgImageCache.get(appId);

  if (svgImg) {
    // Squircle background for vector icon
    ctx.fillStyle = theme === 'eink' ? '#f4f4f5' : '#181b24';
    ctx.beginPath();
    ctx.roundRect(x, y, size, size, radius);
    ctx.fill();

    // Subtle border
    ctx.strokeStyle = theme === 'eink' ? '#d4d4d8' : 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = Math.max(1, size * 0.03);
    ctx.stroke();

    // Draw vector icon
    const pad = Math.round(size * 0.16);
    ctx.drawImage(svgImg, x + pad, y + pad, size - pad * 2, size - pad * 2);
  } else {
    // Squircle Background for monogram
    ctx.fillStyle = theme === 'eink' ? '#e4e4e7' : brandColor;
    ctx.beginPath();
    ctx.roundRect(x, y, size, size, radius);
    ctx.fill();

    // Subtle border
    ctx.strokeStyle = theme === 'eink' ? '#18181b' : 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = Math.max(1, size * 0.03);
    ctx.stroke();

    // Monogram letter
    const letter = getAppMonogram(appName);
    ctx.font = `bold ${Math.round(size * 0.48)}px Inter, system-ui, sans-serif`;
    ctx.fillStyle = theme === 'eink' ? '#09090b' : '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(letter, x + size / 2, y + size / 2 + size * 0.02);
  }

  // If evicted mainstream app: draw a distinct red diagonal strikethrough slash
  if (isEvicted) {
    ctx.save();
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = Math.max(3.5, Math.round(size * 0.08));
    ctx.lineCap = 'round';
    ctx.beginPath();
    const offset = size * 0.14;
    ctx.moveTo(x + offset, y + size - offset);
    ctx.lineTo(x + size - offset, y + offset);
    ctx.stroke();
    ctx.restore();
  }
}

// Smart app label drawer: 1 line or 2 lines centered without overflow
function drawSmartAppLabel(
  ctx: CanvasRenderingContext2D,
  name: string,
  x: number,
  centerY: number,
  maxWidth: number,
  fontSize: number,
  fontFamily: string,
  color: string
): void {
  ctx.font = `600 ${fontSize}px ${fontFamily}`;
  ctx.fillStyle = color;
  ctx.textAlign = 'left';

  // Fits on one line
  if (ctx.measureText(name).width <= maxWidth) {
    ctx.textBaseline = 'middle';
    ctx.fillText(name, x, centerY);
    return;
  }

  // Attempt clean 2-line split across words
  const words = name.trim().split(/\s+/);
  if (words.length >= 2) {
    let bestSplit = 1;
    let minDiff = Infinity;

    for (let i = 1; i < words.length; i++) {
      const line1 = words.slice(0, i).join(' ');
      const line2 = words.slice(i).join(' ');
      const w1 = ctx.measureText(line1).width;
      const w2 = ctx.measureText(line2).width;
      const maxW = Math.max(w1, w2);
      if (maxW <= maxWidth) {
        const diff = Math.abs(w1 - w2);
        if (diff < minDiff) {
          minDiff = diff;
          bestSplit = i;
        }
      }
    }

    const line1 = truncateText(ctx, words.slice(0, bestSplit).join(' '), maxWidth);
    const line2 = truncateText(ctx, words.slice(bestSplit).join(' '), maxWidth);

    const lineHeight = fontSize * 1.18;
    ctx.textBaseline = 'middle';
    ctx.fillText(line1, x, centerY - lineHeight / 2);
    ctx.fillText(line2, x, centerY + lineHeight / 2);
    return;
  }

  // Single word exceeds width: truncate with ellipsis
  ctx.textBaseline = 'middle';
  const truncated = truncateText(ctx, name, maxWidth);
  ctx.fillText(truncated, x, centerY);
}

export async function renderCardToCanvas(options: RenderOptions): Promise<HTMLCanvasElement> {
  const {
    selections,
    theme,
    aspectRatio,
    userName,
    customTitle,
    sovereigntyScore,
    evictedCount,
    customAlternatives,
  } = options;

  // Await font readiness if in browser to guarantee accurate text measurements
  if (typeof document !== 'undefined' && document.fonts?.ready) {
    try {
      await document.fonts.ready;
    } catch {
      // Continue if fonts.ready fails
    }
  }

  const t = THEMES[theme] || THEMES.matrix;

  // Crisp standard canvas resolutions
  let width = 1600;
  let height = 1600;

  if (aspectRatio === '16:9') {
    width = 1920;
    height = 1080;
  } else if (aspectRatio === '4:5') {
    width = 1600;
    height = 2000;
  }

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get 2D context');

  // Fill Background
  ctx.fillStyle = t.bg;
  ctx.fillRect(0, 0, width, height);

  // Layout boundaries
  const outerPadding = 64;
  const headerTop = 52;

  // Gather active items from catalog selections and custom alternatives
  const activeItems: {
    categoryName: string;
    mainstreamId: string;
    mainstreamName: string;
    alternatives: { id: string; name: string; badge: string }[];
  }[] = [];

  CATEGORIES.forEach((cat) => {
    const sel = selections[cat.id];
    const customList = (customAlternatives && customAlternatives[cat.id]) || [];

    if (sel && sel.alternativeIds.length > 0) {
      const mainstream = cat.mainstreamApps.find((m) => m.id === sel.mainstreamId) || cat.mainstreamApps[0];
      const alternatives = sel.alternativeIds
        .map((altId) => {
          const alt = cat.alternatives.find((a) => a.id === altId) || customList.find((a) => a.id === altId);
          return alt ? { id: alt.id, name: alt.name, badge: alt.badges[0] || 'FOSS' } : null;
        })
        .filter(Boolean) as { id: string; name: string; badge: string }[];

      if (mainstream && alternatives.length > 0) {
        activeItems.push({
          categoryName: cat.name,
          mainstreamId: mainstream.id,
          mainstreamName: mainstream.name,
          alternatives,
        });
      }
    }
  });

  // Preload authentic vector SVG icons for all active items
  const allAppIds: string[] = [];
  activeItems.forEach((item) => {
    allAppIds.push(item.mainstreamId);
    item.alternatives.forEach((a) => allAppIds.push(a.id));
  });
  await preloadAppIcons(allAppIds);

  // Sovereignty Score Badge (Top Right)
  const scoreText = `${sovereigntyScore}% SOVEREIGN`;
  ctx.font = `bold 22px ${t.fontFamily}`;
  const scoreTextWidth = ctx.measureText(scoreText).width;
  const pillPaddingX = 26;
  const pillWidth = scoreTextWidth + pillPaddingX * 2;
  const pillHeight = 48;
  const pillX = width - outerPadding - pillWidth;
  const pillY = headerTop + 4;

  ctx.fillStyle = t.accentBg;
  ctx.beginPath();
  ctx.roundRect(pillX, pillY, pillWidth, pillHeight, pillHeight / 2);
  ctx.fill();

  ctx.strokeStyle = t.accent;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = t.accentText;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(scoreText, pillX + pillWidth / 2, pillY + pillHeight / 2);

  // Title (Left, constrained so it never touches the score pill)
  const maxTitleWidth = pillX - outerPadding - 28;
  ctx.font = `bold 48px ${t.fontFamily}`;
  const titleString = customTitle || 'My Privacy Wins';
  const displayTitle = truncateText(ctx, titleString, maxTitleWidth);
  ctx.fillStyle = t.textPrimary;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText(displayTitle, outerPadding, headerTop);

  // Subtitle / User Name
  ctx.font = `500 22px ${t.fontFamily}`;
  ctx.fillStyle = t.textSecondary;
  const subString = `Curated by ${userName || 'Digital Sovereign'} · Generated with DeGigamon`;
  const displaySub = truncateText(ctx, subString, maxTitleWidth);
  ctx.fillText(displaySub, outerPadding, headerTop + 58);

  // Header bottom reference
  const headerBottom = headerTop + 96;
  const footerY = height - 42;
  const availableGridWidth = width - outerPadding * 2;
  const availableGridHeight = footerY - 32 - (headerBottom + 24);

  // Empty State if no selections made
  if (activeItems.length === 0) {
    const emptyBoxY = headerBottom + (availableGridHeight - 160) / 2;
    ctx.fillStyle = t.cardBg;
    ctx.beginPath();
    ctx.roundRect(outerPadding, emptyBoxY, availableGridWidth, 160, 16);
    ctx.fill();
    ctx.strokeStyle = t.cardBorder;
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.font = `bold 24px ${t.fontFamily}`;
    ctx.fillStyle = t.textPrimary;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('No Categories Switched Yet', width / 2, emptyBoxY + 60);

    ctx.font = `18px ${t.fontFamily}`;
    ctx.fillStyle = t.textMuted;
    ctx.fillText(
      'Select privacy alternatives in DeGigamon to generate your shareable card.',
      width / 2,
      emptyBoxY + 100
    );
  } else {
    // Adaptive Columns based on aspect ratio and item count
    let columns = 3;
    if (aspectRatio === '16:9') {
      columns = activeItems.length <= 6 ? 3 : (activeItems.length <= 16 ? 4 : 5);
    } else if (aspectRatio === '4:5') {
      columns = activeItems.length <= 6 ? 2 : 3;
    } else {
      // 1:1 Square
      if (activeItems.length <= 4) columns = 2;
      else if (activeItems.length <= 15) columns = 3;
      else columns = 4;
    }

    const rows = Math.max(1, Math.ceil(activeItems.length / columns));
    const gapX = columns >= 4 ? 16 : 22;
    const gapY = rows >= 5 ? 14 : 20;

    const cardWidth = (availableGridWidth - gapX * (columns - 1)) / columns;

    // Card height calculation: expands dynamically without arbitrary clipping
    const targetHeight = Math.floor((availableGridHeight - gapY * (rows - 1)) / rows);
    const maxCardHeight = rows <= 2 ? 240 : (rows <= 4 ? 200 : 160);
    const cardHeight = Math.max(120, Math.min(maxCardHeight, targetHeight));

    // Centered vertical alignment of the grid on the canvas
    const totalGridHeight = rows * cardHeight + (rows - 1) * gapY;
    const gridTop = headerBottom + 24 + Math.max(0, (availableGridHeight - totalGridHeight) / 2);

    // Responsive icon and typography sizing
    const iconSize = Math.max(38, Math.min(58, Math.round(cardHeight * 0.34)));
    const labelFontSize = cardWidth >= 440 ? 19 : (cardWidth >= 340 ? 17 : 15);

    activeItems.forEach((item, index) => {
      const col = index % columns;
      const row = Math.floor(index / columns);
      const cardX = outerPadding + col * (cardWidth + gapX);
      const cardY = gridTop + row * (cardHeight + gapY);

      // 1. Card Container
      ctx.fillStyle = t.cardBg;
      ctx.beginPath();
      ctx.roundRect(cardX, cardY, cardWidth, cardHeight, 14);
      ctx.fill();

      ctx.strokeStyle = t.cardBorder;
      ctx.lineWidth = 1;
      ctx.stroke();

      // 2. Card Eyebrow (Category Name + Badge)
      const paddingX = 16;
      const eyebrowY = cardY + 18;

      ctx.font = `bold 13px ${t.fontFamily}`;
      ctx.fillStyle = t.textMuted;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      const catLabel = item.categoryName.toUpperCase();

      // Eyebrow badge pill
      const firstBadge = item.alternatives[0]?.badge || 'FOSS';
      ctx.font = `bold 11px ${t.fontFamily}`;
      const badgeTextWidth = ctx.measureText(firstBadge).width;
      const bPillW = badgeTextWidth + 14;
      const bPillH = 20;
      const bPillX = cardX + cardWidth - paddingX - bPillW;
      const bPillY = eyebrowY - bPillH / 2;

      ctx.fillStyle = theme === 'eink' ? '#e4e4e7' : 'rgba(255, 255, 255, 0.06)';
      ctx.beginPath();
      ctx.roundRect(bPillX, bPillY, bPillW, bPillH, 5);
      ctx.fill();

      ctx.strokeStyle = t.cardBorder;
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = theme === 'eink' ? '#09090b' : t.accent;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(firstBadge, bPillX + bPillW / 2, eyebrowY);

      // Render category label (clipped so it never touches badge pill)
      ctx.font = `bold 13px ${t.fontFamily}`;
      ctx.fillStyle = t.textMuted;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      const maxCatW = bPillX - (cardX + paddingX) - 10;
      ctx.fillText(truncateText(ctx, catLabel, maxCatW), cardX + paddingX, eyebrowY);

      // Thin separator divider
      ctx.strokeStyle = t.cardBorder;
      ctx.lineWidth = 0.75;
      ctx.beginPath();
      ctx.moveTo(cardX + paddingX, cardY + 34);
      ctx.lineTo(cardX + cardWidth - paddingX, cardY + 34);
      ctx.stroke();

      // 3. Card Body: Horizontal migration layout
      const contentTop = cardY + 35;
      const contentHeight = cardHeight - 35 - 8;
      const centerY = contentTop + contentHeight / 2;

      const arrowWidth = 24;
      const availableBodyW = cardWidth - paddingX * 2;
      const colWidth = (availableBodyW - arrowWidth - 20) / 2;

      const leftX = cardX + paddingX;
      const arrowCenterX = leftX + colWidth + 10 + arrowWidth / 2;
      const rightX = leftX + colWidth + 20 + arrowWidth;

      // Left Side: Mainstream (Evicted)
      const iconY = centerY - iconSize / 2;
      drawAppSquircle(ctx, leftX, iconY, iconSize, item.mainstreamId, item.mainstreamName, true, theme);

      const mainstreamLabelX = leftX + iconSize + 10;
      const mainstreamMaxW = colWidth - iconSize - 10;
      drawSmartAppLabel(
        ctx,
        item.mainstreamName,
        mainstreamLabelX,
        centerY,
        mainstreamMaxW,
        labelFontSize,
        t.fontFamily,
        t.danger
      );

      // Center: Subtle Migration Arrow
      ctx.font = `20px ${t.fontFamily}`;
      ctx.fillStyle = t.textMuted;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('→', arrowCenterX, centerY);

      // Right Side: Alternatives
      const altMaxW = colWidth - iconSize - 10;

      if (item.alternatives.length === 1) {
        const alt = item.alternatives[0];
        drawAppSquircle(ctx, rightX, iconY, iconSize, alt.id, alt.name, false, theme);
        drawSmartAppLabel(
          ctx,
          alt.name,
          rightX + iconSize + 10,
          centerY,
          altMaxW,
          labelFontSize,
          t.fontFamily,
          t.textPrimary
        );
      } else if (item.alternatives.length === 2) {
        // Stack 2 mini rows
        const miniSize = Math.max(26, Math.min(38, Math.round(iconSize * 0.74)));
        const rowGap = 5;
        const stackH = miniSize * 2 + rowGap;
        const stackStartY = centerY - stackH / 2;
        const miniLabelW = colWidth - miniSize - 8;
        const miniFontSize = Math.max(13, Math.round(labelFontSize * 0.86));

        for (let i = 0; i < 2; i++) {
          const a = item.alternatives[i];
          const rowY = stackStartY + i * (miniSize + rowGap);
          drawAppSquircle(ctx, rightX, rowY, miniSize, a.id, a.name, false, theme);
          drawSmartAppLabel(
            ctx,
            a.name,
            rightX + miniSize + 8,
            rowY + miniSize / 2,
            miniLabelW,
            miniFontSize,
            t.fontFamily,
            t.textPrimary
          );
        }
      } else {
        // Stack 3 mini rows
        const miniSize = Math.max(22, Math.min(29, Math.round(iconSize * 0.6)));
        const rowGap = 3;
        const stackH = miniSize * 3 + rowGap * 2;
        const stackStartY = centerY - stackH / 2;
        const miniLabelW = colWidth - miniSize - 6;
        const miniFontSize = Math.max(12, Math.round(labelFontSize * 0.76));

        for (let i = 0; i < Math.min(3, item.alternatives.length); i++) {
          const a = item.alternatives[i];
          const rowY = stackStartY + i * (miniSize + rowGap);
          drawAppSquircle(ctx, rightX, rowY, miniSize, a.id, a.name, false, theme);
          drawSmartAppLabel(
            ctx,
            a.name,
            rightX + miniSize + 6,
            rowY + miniSize / 2,
            miniLabelW,
            miniFontSize,
            t.fontFamily,
            t.textPrimary
          );
        }
      }
    });
  }

  // Footer Divider Line
  ctx.strokeStyle = t.cardBorder;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(outerPadding, footerY - 26);
  ctx.lineTo(width - outerPadding, footerY - 26);
  ctx.stroke();

  // Footer Content
  ctx.font = `500 18px ${t.fontFamily}`;
  ctx.fillStyle = t.textSecondary;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText(
    `${evictedCount} Gigamons Evicted · Reclaim Your Digital Life`,
    outerPadding,
    footerY
  );

  ctx.textAlign = 'right';
  ctx.fillStyle = t.textMuted;
  ctx.fillText('DeGigamon · 100% Client-Side · Zero Telemetry', width - outerPadding, footerY);

  return canvas;
}

export async function exportCardAsBlob(options: RenderOptions): Promise<Blob> {
  const canvas = await renderCardToCanvas(options);
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error('Canvas export failed'));
    }, 'image/png');
  });
}

export async function downloadCardImage(
  options: RenderOptions,
  filename = 'degigamon-privacy-pack.png'
): Promise<void> {
  const blob = await exportCardAsBlob(options);
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export async function copyCardToClipboard(options: RenderOptions): Promise<boolean> {
  try {
    const blob = await exportCardAsBlob(options);
    if (!navigator.clipboard || !window.ClipboardItem) {
      return false;
    }
    await navigator.clipboard.write([
      new window.ClipboardItem({
        'image/png': blob,
      }),
    ]);
    return true;
  } catch (err) {
    console.warn('Clipboard write error:', err);
    return false;
  }
}
