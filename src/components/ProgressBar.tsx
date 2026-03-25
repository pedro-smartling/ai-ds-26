'use client';

import React from 'react';

export type ProgressBarColor = 'brand' | 'success' | 'warning' | 'error';
export type ProgressBarSize = 'xs' | 'sm' | 'md';

interface ProgressBarProps {
  value: number; // 0–100
  color?: ProgressBarColor;
  size?: ProgressBarSize;
  label?: string;
  showValue?: boolean;
}

const trackColors: Record<ProgressBarColor, string> = {
  brand: 'var(--color-surface-brand-moderate)',
  success: 'var(--color-surface-success-moderate)',
  warning: 'var(--color-surface-warning-moderate)',
  error: 'var(--color-surface-error-moderate)',
};

const fillColors: Record<ProgressBarColor, string> = {
  brand: 'var(--color-surface-brand-solid)',
  success: 'var(--color-surface-success-solid)',
  warning: 'var(--color-surface-warning-solid)',
  error: 'var(--color-surface-error-solid)',
};

const heights: Record<ProgressBarSize, string> = {
  xs: '4px',
  sm: '8px',
  md: '12px',
};

export default function ProgressBar({ value, color = 'brand', size = 'sm', label, showValue }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-tier-3)' }}>
      {(label || showValue) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {label && (
            <span style={{
              fontSize: 'var(--font-size-s)',
              fontWeight: 'var(--font-weight-body-strong)',
              color: 'var(--color-text-soft)',
            }}>
              {label}
            </span>
          )}
          {showValue && (
            <span style={{
              fontSize: 'var(--font-size-xs)',
              color: 'var(--color-text-moderate)',
              fontWeight: 'var(--font-weight-body-strong)',
            }}>
              {clamped}%
            </span>
          )}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        style={{
          width: '100%',
          height: heights[size],
          backgroundColor: trackColors[color],
          borderRadius: 'var(--radius-full)',
          overflow: 'hidden',
        }}
      >
        <div style={{
          height: '100%',
          width: `${clamped}%`,
          backgroundColor: fillColors[color],
          borderRadius: 'var(--radius-full)',
          transition: 'width 0.3s ease',
        }} />
      </div>
    </div>
  );
}
