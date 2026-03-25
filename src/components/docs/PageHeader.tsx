'use client';

import React from 'react';

interface PageHeaderProps {
  title: string;
  description: string;
  figmaKey?: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div style={{ marginBottom: 'var(--space-page-inset-l)', paddingBottom: 'var(--space-page-inset-m)', borderBottom: '1px solid var(--color-border-soft)' }}>
      <h1 style={{
        fontSize: 'var(--font-size-3xl)',
        fontWeight: 'var(--font-weight-heading)',
        color: 'var(--color-text-main)',
        margin: '0 0 var(--dimension-tier-6)',
        lineHeight: 1.2,
      }}>
        {title}
      </h1>
      <p style={{
        fontSize: 'var(--font-size-m)',
        color: 'var(--color-text-soft)',
        margin: 0,
        lineHeight: 'var(--line-height-body-m)',
        maxWidth: '640px',
      }}>
        {description}
      </p>
    </div>
  );
}
