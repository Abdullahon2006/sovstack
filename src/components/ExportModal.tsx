import React, { useState, useEffect, useRef } from 'react';
import { X, Download, Copy, Share2, Check } from 'lucide-react';
import { CardTheme, CardAspectRatio, PackSelection } from '../data/types';
import {
  renderCardToCanvas,
  downloadCardImage,
  copyCardToClipboard,
} from '../lib/cardRenderer';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  selections: PackSelection;
  theme: CardTheme;
  onThemeChange: (theme: CardTheme) => void;
  aspectRatio: CardAspectRatio;
  onAspectRatioChange: (ratio: CardAspectRatio) => void;
  userName: string;
  onUserNameChange: (name: string) => void;
  customTitle: string;
  onCustomTitleChange: (title: string) => void;
  sovereigntyScore: number;
  evictedCount: number;
  customAlternatives?: Record<string, import('../data/types').PrivacyAlternative[]>;
}

const THEME_OPTIONS: { id: CardTheme; name: string }[] = [
  { id: 'matrix', name: 'Dark Charcoal' },
  { id: 'eink', name: 'Clean White' },
  { id: 'titanium', name: 'Titanium Slate' },
  { id: 'terminal', name: 'Terminal Green' },
  { id: 'emerald', name: 'Emerald Forest' },
];

const ASPECT_OPTIONS: { id: CardAspectRatio; name: string }[] = [
  { id: '1:1', name: '1:1 Square' },
  { id: '16:9', name: '16:9 Banner' },
  { id: '4:5', name: '4:5 Portrait' },
];

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  selections,
  theme,
  onThemeChange,
  aspectRatio,
  onAspectRatioChange,
  userName,
  onUserNameChange,
  customTitle,
  onCustomTitleChange,
  sovereigntyScore,
  evictedCount,
  customAlternatives,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [copiedImage, setCopiedImage] = useState(false);
  const [isRendering, setIsRendering] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    setIsRendering(true);

    const render = async () => {
      try {
        const canvas = await renderCardToCanvas({
          selections,
          theme,
          aspectRatio,
          userName,
          customTitle,
          sovereigntyScore,
          evictedCount,
          customAlternatives,
        });

        if (isMounted) {
          canvasRef.current = canvas;
          setPreviewUrl(canvas.toDataURL('image/png'));
          setIsRendering(false);
        }
      } catch (err) {
        console.error('Render error:', err);
        setIsRendering(false);
      }
    };

    render();

    return () => {
      isMounted = false;
    };
  }, [isOpen, selections, theme, aspectRatio, userName, customTitle, sovereigntyScore, evictedCount, customAlternatives]);

  if (!isOpen) return null;

  const handleDownload = async () => {
    await downloadCardImage(
      {
        selections,
        theme,
        aspectRatio,
        userName,
        customTitle,
        sovereigntyScore,
        evictedCount,
        customAlternatives,
      },
      `privacy-pack-${(userName || 'stack').toLowerCase().replace(/\s+/g, '-')}.png`
    );
  };

  const handleCopyClipboard = async () => {
    const success = await copyCardToClipboard({
      selections,
      theme,
      aspectRatio,
      userName,
      customTitle,
      sovereigntyScore,
      evictedCount,
      customAlternatives,
    });
    if (success) {
      setCopiedImage(true);
      setTimeout(() => setCopiedImage(false), 2000);
    } else {
      alert('Clipboard image copy is not supported in this browser. Please use Download.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 dark:bg-black/85 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="relative flex flex-col w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-xl border border-zinc-200 bg-white text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 shadow-2xl dark:text-zinc-100"
        role="dialog"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 px-6 py-4 dark:bg-zinc-950">
          <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">Export Privacy Card</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-200/70 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 gap-6 md:grid-cols-12">
          {/* Controls */}
          <div className="space-y-4 md:col-span-5 text-sm">
            <div>
              <label className="font-medium text-zinc-700 dark:text-zinc-300 text-xs sm:text-sm">Card Title</label>
              <input
                type="text"
                value={customTitle}
                onChange={(e) => onCustomTitleChange(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-zinc-300 bg-zinc-50 px-3.5 py-2 text-sm text-zinc-900 focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white focus:outline-none"
                placeholder="My Privacy Wins"
              />
            </div>

            <div>
              <label className="font-medium text-zinc-700 dark:text-zinc-300 text-xs sm:text-sm">Your Name / Handle</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => onUserNameChange(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-zinc-300 bg-zinc-50 px-3.5 py-2 text-sm text-zinc-900 focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white focus:outline-none"
                placeholder="@username"
              />
            </div>

            <div>
              <label className="font-medium text-zinc-700 dark:text-zinc-300 text-xs sm:text-sm">Style</label>
              <div className="mt-1.5 grid grid-cols-2 gap-2">
                {THEME_OPTIONS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => onThemeChange(t.id)}
                    className={`rounded-xl border px-3 py-2 text-left text-xs sm:text-sm transition ${
                      theme === t.id
                        ? 'border-zinc-900 bg-zinc-900 text-white font-semibold dark:border-white dark:bg-zinc-800 dark:text-white'
                        : 'border-zinc-200 bg-zinc-50 text-zinc-600 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400 dark:hover:border-zinc-700'
                    }`}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-medium text-zinc-700 dark:text-zinc-300 text-xs sm:text-sm">Aspect Ratio</label>
              <div className="mt-1.5 grid grid-cols-3 gap-2">
                {ASPECT_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => onAspectRatioChange(opt.id)}
                    className={`rounded-xl border px-2.5 py-2 text-center text-xs sm:text-sm transition whitespace-nowrap ${
                      aspectRatio === opt.id
                        ? 'border-zinc-900 bg-zinc-900 text-white font-semibold dark:border-white dark:bg-zinc-800 dark:text-white'
                        : 'border-zinc-200 bg-zinc-50 text-zinc-600 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400 dark:hover:border-zinc-700'
                    }`}
                  >
                    {opt.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Live Preview */}
          <div className="flex flex-col items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 p-4 md:col-span-7">
            <div className="relative flex items-center justify-center w-full max-h-[420px] overflow-hidden rounded-xl bg-zinc-200/70 dark:bg-black">
              {isRendering ? (
                <div className="flex h-48 items-center justify-center text-sm text-zinc-500">
                  Rendering...
                </div>
              ) : previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Card Preview"
                  className="max-h-[400px] w-auto object-contain rounded-lg"
                />
              ) : null}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 px-6 py-4 dark:bg-zinc-950">
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            Rendered locally in browser · High-resolution PNG
          </span>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleCopyClipboard}
              className="flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 transition dark:hover:bg-zinc-800 dark:hover:text-white"
            >
              {copiedImage ? <Check className="h-4 w-4 text-emerald-500 dark:text-emerald-400" /> : <Copy className="h-4 w-4" />}
              <span>{copiedImage ? 'Copied' : 'Copy Image'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-2 rounded-xl bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white px-5 py-2 text-sm font-semibold dark:text-black transition dark:hover:bg-zinc-200 shadow-sm"
            >
              <Download className="h-4 w-4" />
              <span>Download</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
