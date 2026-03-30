'use client';

import React from 'react';

export type FeaturedIconColor = 'brand' | 'success' | 'warning' | 'error' | 'default';
export type FeaturedIconSize = 'sm' | 'md' | 'lg' | 'xl';
export type FeaturedIconTheme =
  | 'light-circle'
  | 'light-double-circle'
  | 'light-brand-square'
  | 'light-square'
  | 'solid-brand-square'
  | 'dark-brand-square';

interface FeaturedIconProps {
  icon: React.ReactNode;
  color?: FeaturedIconColor;
  size?: FeaturedIconSize;
  theme?: FeaturedIconTheme;
}

/* ── Size → container / icon / radius tokens ───────────────────────── */
const SIZES: Record<FeaturedIconSize, { container: string; icon: string; circleRadius: string; doubleCircleBorder: string; squareRadius: string }> = {
  sm:  { container: 'var(--size-actions-m)',  icon: 'var(--size-icon-s)',  circleRadius: '16px',  doubleCircleBorder: '4px',  squareRadius: 'var(--radius-xs)' },
  md:  { container: 'var(--size-actions-xl)', icon: 'var(--size-icon-m)',  circleRadius: '20px',  doubleCircleBorder: '6px',  squareRadius: 'var(--radius-s)' },
  lg:  { container: 'var(--size-actions-3xl)', icon: 'var(--size-icon-l)', circleRadius: '24px',  doubleCircleBorder: '8px',  squareRadius: 'var(--radius-m)' },
  xl:  { container: 'var(--dimension-tier-16)', icon: 'var(--dimension-tier-10)', circleRadius: '28px', doubleCircleBorder: '10px', squareRadius: 'var(--radius-l)' },
};

/* ── Color → background / icon color / outer ring tokens ───────────── */
const COLORS: Record<FeaturedIconColor, { bg: string; iconColor: string; outerRing: string }> = {
  brand:   { bg: 'var(--color-surface-brand-moderate)',   iconColor: 'var(--color-foreground-brand-main)',   outerRing: 'var(--color-surface-brand-main)' },
  default: { bg: 'var(--color-surface-moderate)',         iconColor: 'var(--color-foreground-moderate)',      outerRing: 'var(--color-surface-soft)' },
  error:   { bg: 'var(--color-surface-error-moderate)',   iconColor: 'var(--color-foreground-error-soft)',    outerRing: 'var(--color-surface-error-main)' },
  warning: { bg: 'var(--color-surface-warning-moderate)', iconColor: 'var(--color-foreground-warning-soft)',  outerRing: 'var(--color-surface-warning-main)' },
  success: { bg: 'var(--color-surface-success-moderate)', iconColor: 'var(--color-foreground-success-main)', outerRing: 'var(--color-surface-success-main)' },
};

export default function FeaturedIcon({ icon, color = 'brand', size = 'md', theme = 'light-circle' }: FeaturedIconProps) {
  const s = SIZES[size];
  const c = COLORS[color];

  // Container background
  let bg: string;
  let iconColor: string = c.iconColor;
  let border: string | undefined;
  let borderRadius: string;
  let boxShadow: string | undefined;

  switch (theme) {
    case 'light-circle':
      bg = c.bg;
      borderRadius = s.circleRadius;
      break;
    case 'light-double-circle':
      bg = c.bg;
      borderRadius = s.circleRadius;
      border = `${s.doubleCircleBorder} solid ${c.outerRing}`;
      break;
    case 'light-brand-square':
      bg = 'var(--color-surface-brand-main)';
      iconColor = 'var(--color-foreground-brand-main)';
      borderRadius = s.squareRadius;
      break;
    case 'light-square':
      bg = 'var(--color-surface-main)';
      iconColor = 'var(--color-foreground-brand-main)';
      borderRadius = s.squareRadius;
      border = '1px solid var(--color-border-soft)';
      boxShadow = 'var(--shadow-xs)';
      break;
    case 'solid-brand-square':
      bg = 'var(--color-surface-brand-solid)';
      iconColor = 'var(--color-foreground-main-onbrand)';
      borderRadius = s.squareRadius;
      break;
    case 'dark-brand-square':
      bg = 'var(--color-surface-brand-solid-hover)';
      iconColor = 'var(--color-foreground-main-onbrand)';
      borderRadius = s.squareRadius;
      break;
  }

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: s.container,
      height: s.container,
      borderRadius,
      backgroundColor: bg,
      border,
      boxShadow,
      color: iconColor,
      flexShrink: 0,
      boxSizing: 'border-box',
    }}>
      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: s.icon, height: s.icon, lineHeight: 0 }}>
        {icon}
      </span>
    </div>
  );
}
