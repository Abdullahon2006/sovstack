import React from 'react';
import { getAppSvgDataUri } from '../lib/iconSvgs';

interface AppIconProps {
  appId: string;
  name: string;
  size?: number;
  className?: string;
}

export const AppIcon: React.FC<AppIconProps> = ({ appId, name, size = 20, className = '' }) => {
  const s = size;
  const dataUri = getAppSvgDataUri(appId);

  if (dataUri) {
    return (
      <img
        src={dataUri}
        alt={name}
        width={s}
        height={s}
        style={{ width: s, height: s, minWidth: s, minHeight: s }}
        className={`shrink-0 select-none rounded-md object-contain ${className}`}
        draggable={false}
      />
    );
  }

  // Fallback for user-added custom alternatives
  const initial = (name || '?').charAt(0).toUpperCase();
  const fontSize = Math.max(11, Math.round(s * 0.44));
  return (
    <div
      style={{ width: s, height: s, minWidth: s, fontSize: `${fontSize}px` }}
      className={`flex items-center justify-center rounded-lg bg-zinc-100 text-zinc-800 border border-zinc-300 dark:bg-zinc-800 font-bold dark:text-zinc-100 dark:border-zinc-700 select-none ${className}`}
    >
      {initial}
    </div>
  );
};
