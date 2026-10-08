import { CATEGORIES } from '../data/catalog';
import { CardTheme, CardAspectRatio, PackSelection } from '../data/types';

interface RenderOptions {
  selections: PackSelection;
  theme: CardTheme;
  aspectRatio: CardAspectRatio;
  userName: string;
  customTitle: string;
  sovereigntyScore: number;
  evictedCount: number;
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
  danger: string;
  dangerBg: string;
  fontFamily: string;
}

const THEMES: Record<CardTheme, ThemeConfig> = {
  matrix: {
    bg: '#0a0a0c',
    cardBg: '#141417',
    cardBorder: '#27272a',
    textPrimary: '#ffffff',
    textSecondary: '#a1a1aa',
    textMuted: '#71717a',
    accent: '#f4f4f5',
    accentBg: '#27272a',
    danger: '#a1a1aa',
    dangerBg: '#27272a',
    fontFamily: 'Inter, system-ui, sans-serif',
  },
  titanium: {
    bg: '#0f172a',
    cardBg: '#1e293b',
    cardBorder: '#334155',
    textPrimary: '#ffffff',
    textSecondary: '#cbd5e1',
    textMuted: '#94a3b8',
    accent: '#38bdf8',
    accentBg: '#0369a1',
    danger: '#fb7185',
    dangerBg: '#9f1239',
    fontFamily: 'Inter, system-ui, sans-serif',
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
    danger: '#f87171',
    dangerBg: '#7f1d1d',
    fontFamily: 'Inter, system-ui, sans-serif',
  },
  terminal: {
    bg: '#050805',
    cardBg: '#0c140c',
    cardBorder: '#1b3b1b',
    textPrimary: '#4ade80',
    textSecondary: '#22c55e',
    textMuted: '#15803d',
    accent: '#86efac',
    accentBg: '#14532d',
    danger: '#f87171',
    dangerBg: '#450a0a',
    fontFamily: 'JetBrains Mono, Courier New, monospace',
  },
  eink: {
    bg: '#ffffff',
    cardBg: '#f8fafc',
    cardBorder: '#000000',
    textPrimary: '#000000',
    textSecondary: '#333333',
    textMuted: '#666666',
    accent: '#000000',
    accentBg: '#e2e8f0',
    danger: '#000000',
    dangerBg: '#cbd5e1',
    fontFamily: 'JetBrains Mono, Courier New, monospace',
  },
};

export async function renderCardToCanvas(options: RenderOptions): Promise<HTMLCanvasElement> {
  const {
    selections,
    theme,
    aspectRatio,
    userName,
    customTitle,
    sovereigntyScore,
    evictedCount,
  } = options;

  const t = THEMES[theme] || THEMES.matrix;

  // Determine canvas pixel dimensions
  let width = 2400;
  let height = 2400; // 1:1

  if (aspectRatio === '16:9') {
    width = 2560;
    height = 1440;
  } else if (aspectRatio === '4:5') {
    width = 2000;
    height = 2500;
  }

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get 2D context');

  // Background
  ctx.fillStyle = t.bg;
  ctx.fillRect(0, 0, width, height);

  // Decorative subtle grid or border
  ctx.strokeStyle = t.cardBorder;
  ctx.lineWidth = 4;
  ctx.strokeRect(40, 40, width - 80, height - 80);

  // Header Area
  const headerY = 130;
  ctx.font = `bold 64px ${t.fontFamily}`;
  ctx.fillStyle = t.textPrimary;
  ctx.textAlign = 'left';
  ctx.fillText(customTitle || 'My Privacy Wins', 90, headerY);

  // Subtitle / User Name
  ctx.font = `32px ${t.fontFamily}`;
  ctx.fillStyle = t.textSecondary;
  ctx.fillText(`Curated by ${userName || 'Digital Sovereign'} · Generated with DeGigamon`, 90, headerY + 48);

  // Score Pill Badge (top right)
  const badgeWidth = 420;
  const badgeHeight = 76;
  const badgeX = width - 90 - badgeWidth;
  const badgeY = headerY - 56;

  // Pill Background
  ctx.fillStyle = t.accentBg;
  ctx.beginPath();
  ctx.roundRect(badgeX, badgeY, badgeWidth, badgeHeight, 38);
  ctx.fill();
  ctx.strokeStyle = t.accent;
  ctx.lineWidth = 3;
  ctx.stroke();

  // Pill Text
  ctx.font = `bold 30px ${t.fontFamily}`;
  ctx.fillStyle = theme === 'eink' ? '#000000' : '#ffffff';
  ctx.fillText(`${sovereigntyScore}% SOVEREIGN`, badgeX + badgeWidth / 2, badgeY + 48);

  // Active Category Items
  const activeItems: {
    categoryName: string;
    mainstreamName: string;
    mainstreamSymbol: string;
    alternatives: { name: string; symbol: string; badge: string }[];
  }[] = [];

  CATEGORIES.forEach((cat) => {
    const sel = selections[cat.id];
    if (sel && sel.alternativeIds.length > 0) {
      const mainstream = cat.mainstreamApps.find((m) => m.id === sel.mainstreamId) || cat.mainstreamApps[0];
      const alternatives = sel.alternativeIds
        .map((altId) => {
          const alt = cat.alternatives.find((a) => a.id === altId);
          return alt ? { name: alt.name, symbol: alt.symbol || '🛡️', badge: alt.badges[0] || 'FOSS' } : null;
        })
        .filter(Boolean) as { name: string; symbol: string; badge: string }[];

      if (mainstream && alternatives.length > 0) {
        activeItems.push({
          categoryName: cat.name,
          mainstreamName: mainstream.name,
          mainstreamSymbol: mainstream.symbol || '⚠️',
          alternatives,
        });
      }
    }
  });

  // Calculate Grid Layout
  const gridStartX = 90;
  const gridStartY = 240;
  const gridEndX = width - 90;
  const gridEndY = height - 160;
  const availableWidth = gridEndX - gridStartX;
  const availableHeight = gridEndY - gridStartY;

  // Choose columns based on item count and aspect ratio
  let columns = 3;
  if (aspectRatio === '16:9') {
    columns = activeItems.length > 12 ? 4 : 3;
  } else if (activeItems.length > 15) {
    columns = 4;
  } else if (activeItems.length <= 6) {
    columns = 2;
  }

  const rows = Math.ceil(activeItems.length / columns) || 1;
  const gapX = 32;
  const gapY = 24;
  const itemWidth = (availableWidth - gapX * (columns - 1)) / columns;
  const itemHeight = Math.min(180, (availableHeight - gapY * (rows - 1)) / rows);

  activeItems.forEach((item, index) => {
    const col = index % columns;
    const row = Math.floor(index / columns);
    const x = gridStartX + col * (itemWidth + gapX);
    const y = gridStartY + row * (itemHeight + gapY);

    // Card Box
    ctx.fillStyle = t.cardBg;
    ctx.beginPath();
    ctx.roundRect(x, y, itemWidth, itemHeight, 18);
    ctx.fill();
    ctx.strokeStyle = t.cardBorder;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Category Label (top left inside card)
    ctx.font = `bold 18px ${t.fontFamily}`;
    ctx.fillStyle = t.textMuted;
    ctx.textAlign = 'left';
    ctx.fillText(item.categoryName.toUpperCase(), x + 20, y + 32);

    // Left Side: Mainstream / Gigamon (Strikethrough)
    const mainstreamY = y + 74;
    ctx.font = `bold 24px ${t.fontFamily}`;
    ctx.fillStyle = t.danger;
    ctx.fillText(item.mainstreamName, x + 20, mainstreamY);

    // Subtle strikethrough line over gigamon name
    const mainstreamWidth = ctx.measureText(item.mainstreamName).width;
    ctx.strokeStyle = t.danger;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(x + 18, mainstreamY - 8);
    ctx.lineTo(x + 22 + mainstreamWidth, mainstreamY - 8);
    ctx.stroke();

    // Transition Arrow
    ctx.font = `bold 20px ${t.fontFamily}`;
    ctx.fillStyle = t.textMuted;
    ctx.fillText('→', x + 20, mainstreamY + 36);

    // Right Side / Bottom: Alternatives
    const altNames = item.alternatives.map((a) => a.name).join(' · ');
    ctx.font = `bold 23px ${t.fontFamily}`;
    ctx.fillStyle = t.accent;
    ctx.fillText(altNames, x + 50, mainstreamY + 36);

    // Badges pill
    const firstBadge = item.alternatives[0]?.badge || 'FOSS';
    ctx.font = `14px ${t.fontFamily}`;
    ctx.fillStyle = t.textSecondary;
    ctx.fillText(`[${firstBadge}]`, x + itemWidth - 75, y + 32);
  });

  // Footer Area
  const footerY = height - 70;
  ctx.font = `24px ${t.fontFamily}`;
  ctx.fillStyle = t.textMuted;
  ctx.textAlign = 'left';
  ctx.fillText(`⚡ ${evictedCount} Gigamons Evicted · Reclaim Your Digital Self · https://privacypack.org/ alternative`, 90, footerY);

  ctx.textAlign = 'right';
  ctx.fillText('100% Client-Side · Zero Telemetry', width - 90, footerY);

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

export async function downloadCardImage(options: RenderOptions, filename = 'degigamon-privacy-pack.png'): Promise<void> {
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
