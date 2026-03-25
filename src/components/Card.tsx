'use client';

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  border?: boolean;
  shadow?: 'none' | 'xs' | 's' | 'm';
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const paddings = {
  none: '0',
  sm: 'var(--space-page-inside-m)',
  md: 'var(--space-page-inset-m)',
  lg: 'var(--space-page-inset-l)',
};

const shadows = {
  none: 'none',
  xs: 'var(--shadow-xs)',
  s: 'var(--shadow-s)',
  m: 'var(--shadow-m)',
};

export default function Card({
  children,
  padding = 'md',
  border = true,
  shadow = 's',
  className,
  style,
  onClick,
}: CardProps) {
  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        backgroundColor: 'var(--color-surface-main)',
        borderRadius: 'var(--radius-l)',
        border: border ? '1px solid var(--color-border-soft)' : 'none',
        boxShadow: shadows[shadow],
        padding: paddings[padding],
        cursor: onClick ? 'pointer' : 'default',
        transition: onClick ? 'box-shadow 0.15s, border-color 0.15s' : undefined,
        ...style,
      }}
      onMouseEnter={onClick ? (e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-m)';
        e.currentTarget.style.borderColor = 'var(--color-border-main)';
      } : undefined}
      onMouseLeave={onClick ? (e) => {
        e.currentTarget.style.boxShadow = shadows[shadow];
        e.currentTarget.style.borderColor = 'var(--color-border-soft)';
      } : undefined}
    >
      {children}
    </div>
  );
}
