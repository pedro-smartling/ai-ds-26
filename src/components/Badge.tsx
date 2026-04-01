'use client';

import React from 'react';

export type BadgeSize = 'sm' | 'md' | 'lg';
export type BadgeType = 'default' | 'success' | 'warning' | 'error';

interface BadgeProps {
  label: string;
  size?: BadgeSize;
  type?: BadgeType;
}

const textTrim = {
  textBoxTrim: 'trim-both',
  textBoxEdge: 'cap alphabetic',
} as React.CSSProperties;

const SIZE_MAP: Record<BadgeSize, {
  height: string;
  px: string;
  fontSize: string;
  lineHeight: string;
}> = {
  sm: {
    height: 'var(--size-actions-xxs)',
    px: 'var(--space-page-inside-xs)',
    fontSize: 'var(--font-size-xs)',
    lineHeight: 'var(--line-height-body-xs)',
  },
  md: {
    height: 'var(--size-actions-xs)',
    px: 'var(--space-page-inside-s)',
    fontSize: 'var(--font-size-s)',
    lineHeight: 'var(--line-height-body-s)',
  },
  lg: {
    height: 'var(--size-actions-s)',
    px: 'var(--space-page-inside-s)',
    fontSize: 'var(--font-size-m)',
    lineHeight: 'var(--line-height-body-m)',
  },
};

const TYPE_MAP: Record<BadgeType, {
  bg: string;
  border: string;
  textSm: string;
  textMdLg: string;
}> = {
  default: {
    bg: 'var(--color-surface-soft)',
    border: 'var(--color-border-soft)',
    textSm: 'var(--color-text-soft)',
    textMdLg: 'var(--color-text-soft)',
  },
  success: {
    bg: 'var(--color-surface-success-main)',
    border: 'var(--color-border-success-main)',
    textSm: 'var(--color-text-success-soft)',
    textMdLg: 'var(--color-text-success-soft)',
  },
  warning: {
    bg: 'var(--color-surface-warning-main)',
    border: 'var(--color-border-warning-main)',
    textSm: 'var(--color-text-warning-soft)',
    textMdLg: 'var(--color-text-warning-main)',
  },
  error: {
    bg: 'var(--color-surface-error-main)',
    border: 'var(--color-border-error-main)',
    textSm: 'var(--color-text-error-soft)',
    textMdLg: 'var(--color-text-error-main)',
  },
};

export default function Badge({ label, size = 'sm', type = 'default' }: BadgeProps) {
  const s = SIZE_MAP[size];
  const t = TYPE_MAP[type];
  const textColor = size === 'sm' ? t.textSm : t.textMdLg;

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      height: s.height,
      paddingLeft: s.px,
      paddingRight: s.px,
      backgroundColor: t.bg,
      border: `var(--border-width-tier-2) solid ${t.border}`,
      borderRadius: 'var(--radius-full)',
      boxSizing: 'border-box',
    }}>
      <span style={{
        fontFamily: 'var(--font-family-base)',
        fontWeight: 'var(--font-weight-body-strong)',
        fontSize: s.fontSize,
        lineHeight: s.lineHeight,
        color: textColor,
        whiteSpace: 'nowrap',
        textAlign: 'center',
        ...textTrim,
      }}>
        {label}
      </span>
    </div>
  );
}
