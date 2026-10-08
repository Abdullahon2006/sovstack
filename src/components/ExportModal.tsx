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
}

const THEME_OPTIONS: { id: CardTheme; name: string }[] = [
  { id: 'eink', name: 'Monochrome (Clean White)' },
  { id: 'matrix', name: 'Dark Charcoal' },
  { id: 'terminal', name: 'Terminal Monospace' },
  { id: 'titanium', name: 'Titanium Dark' },
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
  }, [isOpen, selections, theme, aspectRatio, userName, customTitle, sovereigntyScore, evictedCount]);

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
    });
    if (success) {
      setCopiedImage(true);
      setTimeout(() => setCopiedImage(false), 2000);
    } else {
      alert('Clipboard image copy is not supported in this browser. Please use Download.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="relative flex flex-col w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900 shadow-2xl text-zinc-100"
        role="dialog"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-3.5">
          <h2 className="text-sm font-bold text-white">Export Privacy Card</h2>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-zinc-400 hover:bg-zinc-800 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 grid grid-cols-1 gap-5 md:grid-cols-12">
          {/* Controls */}
          <div className="space-y-4 md:col-span-5 text-xs">
            <div>
              <label className="font-medium text-zinc-400">Card Title</label>
              <input
                type="text"
                value={customTitle}
                onChange={(e) => onCustomTitleChange(e.target.value)}
                className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-1.5 text-xs text-white focus:border-zinc-500 focus:outline-none"
                placeholder="My Privacy Wins"
              />
            </div>

            <div>
              <label className="font-medium text-zinc-400">Your Name / Handle</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => onUserNameChange(e.target.value)}
                className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-1.5 text-xs text-white focus:border-zinc-500 focus:outline-none"
                placeholder="@username"
              />
            </div>

            <div>
              <label className="font-medium text-zinc-400">Style</label>
              <div className="mt-1 grid grid-cols-2 gap-1.5">
                {THEME_OPTIONS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => onThemeChange(t.id)}
                    className={`rounded-lg border px-2.5 py-1.5 text-left text-xs transition ${
                      theme === t.id
                        ? 'border-white bg-zinc-800 text-white font-semibold'
                        : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-medium text-zinc-400">Aspect Ratio</label>
              <div className="mt-1 grid grid-cols-3 gap-1.5">
                {ASPECT_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => onAspectRatioChange(opt.id)}
                    className={`rounded-lg border px-2 py-1.5 text-center text-xs transition ${
                      aspectRatio === opt.id
                        ? 'border-white bg-zinc-800 text-white font-semibold'
                        : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    {opt.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Live Preview */}
          <div className="flex flex-col items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950 p-3 md:col-span-7">
            <div className="relative flex items-center justify-center w-full max-h-[420px] overflow-hidden rounded-lg bg-black">
              {isRendering ? (
                <div className="flex h-48 items-center justify-center text-xs text-zinc-500">
                  Rendering...
                </div>
              ) : previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Card Preview"
                  className="max-h-[400px] w-auto object-contain rounded"
                />
              ) : null}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-zinc-800 px-5 py-3 bg-zinc-950">
          <span className="text-[11px] text-zinc-500">
            Rendered locally in browser · High-resolution PNG
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyClipboard}
              className="flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-900 px-3.5 py-1.5 text-xs font-medium text-zinc-200 transition hover:bg-zinc-800 hover:text-white"
            >
              {copiedImage ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copiedImage ? 'Copied' : 'Copy Image'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 rounded-lg bg-white px-4 py-1.5 text-xs font-semibold text-black transition hover:bg-zinc-200 active:scale-95"
            >
              <Download className="h-3.5 w-3.5" />
              <span>DOWNLOAD</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
