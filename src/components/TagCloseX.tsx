'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';

export type TagCloseXSize = 'sm' | 'md' | 'lg';

interface TagCloseXProps {
  size?: TagCloseXSize;
  onClick?: () => void;
  'aria-label'?: string;
  /** Force visual state for demos */
  forceState?: 'default' | 'hover';
}

const SIZE_STYLES: Record<TagCloseXSize, { box: string; icon: number }> = {
  sm: { box: 'var(--size-icon-xs)', icon: 10 },
  md: { box: 'var(--size-icon-s)', icon: 12 },
  lg: { box: 'var(--size-icon-m)', icon: 14 },
};

export default function TagCloseX({
  size = 'md',
  onClick,
  'aria-label': ariaLabel = 'Remove',
  forceState,
}: TagCloseXProps) {
  const [hovered, setHovered] = useState(false);
  const isHovered = forceState ? forceState === 'hover' : hovered;
  const s = SIZE_STYLES[size];

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      onMouseEnter={() => !forceState && setHovered(true)}
      onMouseLeave={() => !forceState && setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: s.box,
        height: s.box,
        padding: 0,
        margin: 0,
        border: 'none',
        cursor: 'pointer',
        flexShrink: 0,
        borderRadius: isHovered ? 'var(--radius-xs)' : '3px',
        backgroundColor: isHovered ? 'var(--color-surface-moderate)' : 'transparent',
        color: 'var(--color-foreground-soft)',
        transition: 'background-color 0.1s',
      }}
    >
      <X size={s.icon} strokeWidth={2} />
    </button>
  );
}
