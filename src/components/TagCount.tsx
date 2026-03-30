'use client';

import React from 'react';

export type TagCountSize = 'sm' | 'md' | 'lg';

interface TagCountProps {
  /** Count value to display */
  count: number | string;
  /** Size variant */
  size?: TagCountSize;
}

const SIZE_STYLES: Record<TagCountSize, { box: string; fontSize: string; lineHeight: string }> = {
  sm: { box: 'var(--size-icon-s)', fontSize: 'var(--font-size-xs)', lineHeight: 'var(--line-height-body-xs)' },
  md: { box: 'var(--size-icon-s)', fontSize: 'var(--font-size-xs)', lineHeight: 'var(--line-height-body-xs)' },
  lg: { box: 'var(--size-icon-m)', fontSize: 'var(--font-size-s)', lineHeight: 'var(--line-height-body-s)' },
};

export default function TagCount({ count, size = 'md' }: TagCountProps) {
  const s = SIZE_STYLES[size];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: s.box,
      height: s.box,
      maxHeight: s.box,
      paddingLeft: 'var(--dimension-tier-3)',
      paddingRight: 'var(--dimension-tier-3)',
      borderRadius: 'var(--radius-xs)',
      backgroundColor: 'var(--color-surface-moderate)',
      boxSizing: 'border-box',
      flexShrink: 0,
    }}>
      <span style={{
        fontFamily: 'var(--font-family-base)',
        fontWeight: 'var(--font-weight-body-strong)',
        fontSize: s.fontSize,
        lineHeight: s.lineHeight,
        color: 'var(--color-text-soft)',
        textAlign: 'center',
        whiteSpace: 'nowrap',
      }}>
        {count}
      </span>
    </div>
  );
}
