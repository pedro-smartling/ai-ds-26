'use client';

import React from 'react';
import TagCount from '@/components/TagCount';
import TagCloseX from '@/components/TagCloseX';

export type TagSize = 'sm' | 'md' | 'lg';

interface TagProps {
  /** Label text */
  label: string;
  /** Size variant */
  size?: TagSize;
  /** Leading icon element */
  icon?: React.ReactNode;
  /** Show a status dot instead of an icon */
  dot?: boolean;
  /** Dot color — defaults to green-500 */
  dotColor?: string;
  /** Count badge number */
  count?: number;
  /** Show dismiss X button */
  dismissible?: boolean;
  /** Called when X is clicked */
  onDismiss?: () => void;
  /** Focused state — dark bg, white text, amber focus ring */
  focused?: boolean;
}

const SIZE_STYLES: Record<TagSize, { height: string; fontSize: string; lineHeight: string; iconSize: number; gap: number }> = {
  sm: { height: 'var(--size-actions-xs)', fontSize: 'var(--font-size-xs)', lineHeight: 'var(--line-height-body-xs)', iconSize: 12, gap: 4 },
  md: { height: 'var(--size-actions-xs)', fontSize: 'var(--font-size-s)', lineHeight: 'var(--line-height-body-s)', iconSize: 16, gap: 5 },
  lg: { height: 'var(--size-actions-s)', fontSize: 'var(--font-size-s)', lineHeight: 'var(--line-height-body-s)', iconSize: 16, gap: 6 },
};

export default function Tag({
  label,
  size = 'md',
  icon,
  dot,
  dotColor = 'var(--color-green-500)',
  count,
  dismissible,
  onDismiss,
  focused,
}: TagProps) {
  const s = SIZE_STYLES[size];
  const hasLeading = !!(icon || dot);

  const basePadLeft = hasLeading
    ? (size === 'sm' ? 'var(--dimension-tier-4)' : 'var(--space-page-inside-xs)')
    : (size === 'lg' ? 'var(--space-page-inside-s)' : 'var(--space-page-inside-xs)');
  const basePadRight = dismissible
    ? 'var(--dimension-tier-4)'
    : count !== undefined
    ? 'var(--dimension-tier-4)'
    : (size === 'lg' ? 'var(--space-page-inside-s)' : 'var(--space-page-inside-xs)');

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: s.height,
      maxHeight: s.height,
      gap: s.gap,
      paddingTop: focused ? 'calc(var(--space-page-inside-xxs) - 1px)' : 'var(--space-page-inside-xxs)',
      paddingBottom: focused ? 'calc(var(--space-page-inside-xxs) - 1px)' : 'var(--space-page-inside-xxs)',
      paddingLeft: focused ? `calc(${basePadLeft} - 1px)` : basePadLeft,
      paddingRight: focused ? `calc(${basePadRight} - 1px)` : basePadRight,
      backgroundColor: focused ? 'var(--color-surface-form-selected)' : 'var(--color-surface-main)',
      border: focused
        ? '2px solid var(--color-border-solid)'
        : 'var(--border-width-tier-2) solid var(--color-border-main)',
      borderRadius: 'var(--radius-s)',
      boxSizing: 'border-box',
      boxShadow: focused
        ? '0px 0px 0px 2px var(--color-surface-main), 0px 0px 0px 6px var(--color-amber-300)'
        : undefined,
    }}>
      {/* Content row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: s.gap,
        flexShrink: 0,
      }}>
        {/* Dot */}
        {dot && (
          <span style={{
            width: 'var(--dimension-tier-5)',
            height: 'var(--dimension-tier-5)',
            borderRadius: 'var(--radius-full)',
            backgroundColor: dotColor,
            flexShrink: 0,
          }} />
        )}

        {/* Custom icon */}
        {icon && (
          <span style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: s.iconSize,
            height: s.iconSize,
            flexShrink: 0,
            color: focused ? 'var(--color-foreground-form-selected)' : 'var(--color-foreground-soft)',
          }}>
            {icon}
          </span>
        )}

        {/* Label */}
        <span style={{
          fontFamily: 'var(--font-family-base)',
          fontWeight: 'var(--font-weight-body-strong)',
          fontSize: s.fontSize,
          lineHeight: s.lineHeight,
          color: focused ? 'var(--color-foreground-form-selected)' : 'var(--color-text-soft)',
          whiteSpace: 'nowrap',
          textAlign: 'center',
        }}>
          {label}
        </span>

        {/* Count badge */}
        {count !== undefined && (
          <TagCount count={count} size={size} />
        )}
      </div>

      {/* Dismiss X */}
      {dismissible && (
        <TagCloseX size={size} onClick={onDismiss} aria-label={`Remove ${label}`} parentFocused={focused} />
      )}
    </div>
  );
}
