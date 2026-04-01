'use client';

import React from 'react';

interface PreviewBoxProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  /** Fill the entire preview area (no centering) */
  fill?: boolean;
  /** Background override */
  bg?: 'default' | 'subtle' | 'dark';
  /** Extra styles applied to the preview container */
  style?: React.CSSProperties;
}

export default function PreviewBox({ title, description, children, fill, bg = 'default', style }: PreviewBoxProps) {
  const bgColors = {
    default: 'var(--color-surface-main)',
    subtle: 'var(--color-surface-soft)',
    dark: 'var(--color-surface-solid)',
  };

  return (
    <section style={{ marginBottom: 'var(--space-page-inside-xxl)' }}>
      {(title || description) && (
        <div style={{ marginBottom: 'var(--dimension-tier-6)' }}>
          {title && (
            <h3 style={{
              fontSize: 'var(--font-size-m)',
              fontWeight: 'var(--font-weight-body-strongest)',
              color: 'var(--color-text-main)',
              margin: '0 0 var(--dimension-tier-3)',
            }}>
              {title}
            </h3>
          )}
          {description && (
            <p style={{
              fontSize: 'var(--font-size-s)',
              color: 'var(--color-text-moderate)',
              margin: 0,
              lineHeight: 'var(--line-height-body-s)',
            }}>
              {description}
            </p>
          )}
        </div>
      )}
      <div style={{
        border: '1px solid var(--color-border-soft)',
        borderRadius: 'var(--radius-l)',
        backgroundColor: bgColors[bg],
        padding: fill ? 0 : 'var(--space-page-inset-l)',
        display: fill ? 'block' : 'flex',
        flexWrap: fill ? undefined : 'wrap',
        alignItems: fill ? undefined : 'center',
        justifyContent: fill ? undefined : 'center',
        gap: fill ? undefined : 'var(--dimension-tier-7)',
        minHeight: '80px',
        ...style,
      }}>
        {children}
      </div>
    </section>
  );
}
