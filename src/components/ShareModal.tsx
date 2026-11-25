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
  AtSign,
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

  const defaultShareText = `I've replaced ${evictedCount} data-collecting platforms and reached ${sovereigntyScore}% digital sovereignty. Check out my privacy stack on SovStack:`;

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
      `My Privacy Wins: ${sovereigntyScore}% Sovereign on SovStack`
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 dark:bg-black/85 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="relative flex flex-col w-full max-w-lg overflow-hidden rounded-xl border border-zinc-200 bg-white text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 shadow-2xl dark:text-zinc-100"
        role="dialog"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 px-6 py-4 dark:bg-zinc-950">
          <div className="flex items-center gap-2.5">
            <Share2 className="h-5 w-5 text-zinc-900 dark:text-white" />
            <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white">Share Your Privacy Wins</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-200/70 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Card Preview Thumbnail */}
          {previewUrl && (
            <div className="flex items-center justify-center rounded-xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-black p-3 max-h-48 overflow-hidden">
              <img
                src={previewUrl}
                alt="Card Preview"
                className="max-h-44 w-auto object-contain rounded-lg"
              />
            </div>
          )}

          {/* Social Share Buttons */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Post to Social Networks
            </span>
            <div className="mt-2.5 grid grid-cols-2 gap-2.5 text-sm font-medium">
              <button
                onClick={shareToTwitter}
                className="flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 p-2.5 text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800/80 dark:text-white dark:hover:bg-zinc-700 transition"
              >
                <AtSign className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
                <span>Post on X</span>
              </button>

              <button
                onClick={shareToBluesky}
                className="flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 p-2.5 text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800/80 dark:text-white dark:hover:bg-zinc-700 transition"
              >
                <Globe className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
                <span>Bluesky</span>
              </button>

              <button
                onClick={shareToMastodon}
                className="flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 p-2.5 text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800/80 dark:text-white dark:hover:bg-zinc-700 transition"
              >
                <MessageSquare className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
                <span>Mastodon</span>
              </button>

              <button
                onClick={shareToReddit}
                className="flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 p-2.5 text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800/80 dark:text-white dark:hover:bg-zinc-700 transition"
              >
                <Share2 className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
                <span>Reddit</span>
              </button>
            </div>
          </div>

          {/* Quick Actions (Copy Link, Copy Image, System Share) */}
          <div className="space-y-2.5 pt-2.5 border-t border-zinc-200 dark:border-zinc-800">
            {typeof navigator !== 'undefined' && typeof navigator.share === 'function' && (
              <button
                onClick={handleNativeShare}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-100 border border-zinc-200 p-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-700 transition"
              >
                <Share2 className="h-4 w-4" />
                <span>Open System Share Sheet</span>
              </button>
            )}

            <div className="grid grid-cols-2 gap-2.5 text-sm">
              <button
                onClick={handleCopyLink}
                className="flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 p-2.5 text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-800 transition"
              >
                {copiedLink ? <Check className="h-4 w-4 text-emerald-500 dark:text-emerald-400" /> : <Copy className="h-4 w-4" />}
                <span>{copiedLink ? 'Copied Link' : 'Copy Link'}</span>
              </button>

              <button
                onClick={handleCopyImage}
                className="flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 p-2.5 text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-800 transition"
              >
                {copiedImage ? <Check className="h-4 w-4 text-emerald-500 dark:text-emerald-400" /> : <Copy className="h-4 w-4" />}
                <span>{copiedImage ? 'Copied Image' : 'Copy PNG'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 px-6 py-3.5 dark:bg-zinc-950">
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            Generated locally · No server upload
          </span>
          <button
            onClick={onClose}
            className="rounded-xl bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-800 px-5 py-2 text-sm font-semibold dark:text-white dark:hover:bg-zinc-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
