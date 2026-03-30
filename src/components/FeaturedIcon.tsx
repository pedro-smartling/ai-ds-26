'use client';

import React from 'react';

export type FeaturedIconColor = 'brand' | 'success' | 'warning' | 'error' | 'neutral';
export type FeaturedIconSize = 'sm' | 'md' | 'lg' | 'xl';

interface FeaturedIconProps {
  icon: React.ReactNode;
  color?: FeaturedIconColor;
  size?: FeaturedIconSize;
}

const bgColors: Record<FeaturedIconColor, string> = {
  brand: 'var(--color-surface-brand-moderate)',
  success: 'var(--color-surface-success-moderate)',
  warning: 'var(--color-surface-warning-moderate)',
  error: 'var(--color-surface-error-moderate)',
  neutral: 'var(--color-surface-moderate)',
};

const iconColors: Record<FeaturedIconColor, string> = {
  brand: 'var(--color-foreground-brand-main)',
  success: 'var(--color-foreground-success-main)',
  warning: 'var(--color-foreground-warning-main)',
  error: 'var(--color-foreground-error-main)',
  neutral: 'var(--color-foreground-soft)',
};

const sizes: Record<FeaturedIconSize, { container: string; icon: string }> = {
  sm: { container: 'var(--size-actions-m)', icon: 'var(--size-icon-s)' },
  md: { container: 'var(--size-actions-xl)', icon: 'var(--size-icon-m)' },
  lg: { container: 'var(--size-actions-3xl)', icon: 'var(--size-icon-l)' },
  xl: { container: 'var(--dimension-tier-16)', icon: 'var(--dimension-tier-10)' },
};

export default function FeaturedIcon({ icon, color = 'brand', size = 'md' }: FeaturedIconProps) {
  const { container, icon: iconSize } = sizes[size];

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: container,
      height: container,
      borderRadius: 'var(--radius-l)',
      backgroundColor: bgColors[color],
      color: iconColors[color],
      flexShrink: 0,
    }}>
      <span style={{ display: 'flex', width: iconSize, height: iconSize }}>
        {icon}
      </span>
    </div>
  );
}
