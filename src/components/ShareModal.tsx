import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Share2,
  Copy,
  Check,
  Download,
  ExternalLink,
  MessageSquare,
  Globe,
} from 'lucide-react';
import { PackSelection, CardTheme, CardAspectRatio } from '../data/types';
import {
  renderCardToCanvas,
  downloadCardImage,
  copyCardToClipboard,
} from '../lib/cardRenderer';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  selections: PackSelection;
  theme: CardTheme;
  aspectRatio: CardAspectRatio;
  userName: string;
  customTitle: string;
  sovereigntyScore: number;
  evictedCount: number;
  shareUrl: string;
  customAlternatives?: Record<string, import('../data/types').PrivacyAlternative[]>;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  selections,
  theme,
  aspectRatio,
  userName,
  customTitle,
  sovereigntyScore,
  evictedCount,
  shareUrl,
  customAlternatives,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedImage, setCopiedImage] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
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
        }
      } catch (e) {
        console.error(e);
      }
    };

    render();

    return () => {
      isMounted = false;
    };
  }, [isOpen, selections, theme, aspectRatio, userName, customTitle, sovereigntyScore, evictedCount, customAlternatives]);

  if (!isOpen) return null;

  const defaultShareText = `I've evicted ${evictedCount} data-collecting gigamons and reached ${sovereigntyScore}% digital sovereignty! Check out my privacy stack on DeGigamon:`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyImage = async () => {
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

  const handleNativeShare = async () => {
    if (navigator.share && canvasRef.current) {
      try {
        canvasRef.current.toBlob(async (blob) => {
          if (!blob) return;
          const file = new File([blob], 'privacy-pack.png', { type: 'image/png' });
          await navigator.share({
            title: customTitle,
            text: defaultShareText,
            url: shareUrl,
            files: [file],
          });
        });
      } catch (err) {
        console.warn('Share cancelled or not permitted:', err);
      }
    } else if (navigator.share) {
      navigator.share({
        title: customTitle,
        text: defaultShareText,
        url: shareUrl,
      });
    }
  };

  const shareToTwitter = () => {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      defaultShareText
    )}&url=${encodeURIComponent(shareUrl)}`;
    window.open(tweetUrl, '_blank', 'noopener,noreferrer');
  };

  const shareToBluesky = () => {
    const bskyUrl = `https://bsky.app/intent/compose?text=${encodeURIComponent(
      `${defaultShareText} ${shareUrl}`
    )}`;
    window.open(bskyUrl, '_blank', 'noopener,noreferrer');
  };

  const shareToReddit = () => {
    const redditUrl = `https://reddit.com/submit?title=${encodeURIComponent(
      `My Privacy Wins: ${sovereigntyScore}% Sovereign on DeGigamon`
    )}&url=${encodeURIComponent(shareUrl)}`;
    window.open(redditUrl, '_blank', 'noopener,noreferrer');
  };

  const shareToMastodon = () => {
    const instance = prompt('Enter your Mastodon instance domain (e.g. mastodon.social):');
    if (instance) {
      const cleanInstance = instance.replace(/^https?:\/\//, '').trim();
      const mastoUrl = `https://${cleanInstance}/share?text=${encodeURIComponent(
        `${defaultShareText} ${shareUrl}`
      )}`;
      window.open(mastoUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="relative flex flex-col w-full max-w-lg overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900 shadow-2xl text-zinc-100"
        role="dialog"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-3.5 bg-zinc-950">
          <div className="flex items-center gap-2">
            <Share2 className="h-4 w-4 text-white" />
            <h2 className="text-sm font-bold text-white">Share Your Privacy Wins</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-zinc-400 hover:bg-zinc-800 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Card Preview Thumbnail */}
          {previewUrl && (
            <div className="flex items-center justify-center rounded-lg border border-zinc-800 bg-black p-2 max-h-44 overflow-hidden">
              <img
                src={previewUrl}
                alt="Card Preview"
                className="max-h-40 w-auto object-contain rounded"
              />
            </div>
          )}

          {/* Social Share Buttons */}
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
              Post to Social Networks
            </span>
            <div className="mt-2 grid grid-cols-2 gap-2 text-xs font-medium">
              <button
                onClick={shareToTwitter}
                className="flex items-center justify-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800/80 p-2 text-white hover:bg-zinc-700 transition"
              >
                <span>𝕏</span>
                <span>Post on X</span>
              </button>

              <button
                onClick={shareToBluesky}
                className="flex items-center justify-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800/80 p-2 text-white hover:bg-zinc-700 transition"
              >
                <span>🦋</span>
                <span>Bluesky</span>
              </button>

              <button
                onClick={shareToMastodon}
                className="flex items-center justify-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800/80 p-2 text-white hover:bg-zinc-700 transition"
              >
                <span>🐘</span>
                <span>Mastodon</span>
              </button>

              <button
                onClick={shareToReddit}
                className="flex items-center justify-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800/80 p-2 text-white hover:bg-zinc-700 transition"
              >
                <span>🤖</span>
                <span>Reddit</span>
              </button>
            </div>
          </div>

          {/* Quick Actions (Copy Link, Copy Image, System Share) */}
          <div className="space-y-2 pt-2 border-t border-zinc-800">
            {typeof navigator !== 'undefined' && typeof navigator.share === 'function' && (
              <button
                onClick={handleNativeShare}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-800 border border-zinc-700 p-2.5 text-xs font-semibold text-white hover:bg-zinc-700 transition"
              >
                <Share2 className="h-4 w-4" />
                <span>Open System Share Sheet (Mobile / AirDrop)</span>
              </button>
            )}

            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={handleCopyLink}
                className="flex items-center justify-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-950 p-2 text-zinc-200 hover:bg-zinc-800 transition"
              >
                {copiedLink ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedLink ? 'Copied Link!' : 'Copy Link'}</span>
              </button>

              <button
                onClick={handleCopyImage}
                className="flex items-center justify-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-950 p-2 text-zinc-200 hover:bg-zinc-800 transition"
              >
                {copiedImage ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedImage ? 'Copied Image!' : 'Copy PNG'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-zinc-800 px-5 py-3 bg-zinc-950">
          <span className="text-[11px] text-zinc-500">
            100% Client-Side · No server upload required
          </span>
          <button
            onClick={onClose}
            className="rounded-lg bg-zinc-800 px-4 py-1.5 text-xs font-semibold text-white hover:bg-zinc-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
