'use client';

import React from 'react';
import Badge, { BadgeSize, BadgeType } from '@/components/Badge';
import PageHeader from '@/components/docs/PageHeader';
import PreviewBox from '@/components/docs/PreviewBox';
import PropsTable from '@/components/docs/PropsTable';

const sectionTitle = (text: string) => (
  <h2 style={{
    fontSize: 'var(--font-size-l)',
    fontWeight: 'var(--font-weight-heading)',
    color: 'var(--color-text-main)',
    margin: '0 0 var(--dimension-tier-6)',
  }}>{text}</h2>
);

const sectionDesc = (text: string) => (
  <p style={{
    fontSize: 'var(--font-size-s)',
    color: 'var(--color-text-moderate)',
    margin: '0 0 var(--dimension-tier-7)',
    lineHeight: 'var(--line-height-body-s)',
  }}>{text}</p>
);

const SIZES: { label: string; value: BadgeSize }[] = [
  { label: 'sm — 20px', value: 'sm' },
  { label: 'md — 24px', value: 'md' },
  { label: 'lg — 28px', value: 'lg' },
];

const TYPES: { label: string; value: BadgeType }[] = [
  { label: 'Default', value: 'default' },
  { label: 'Success', value: 'success' },
  { label: 'Warning', value: 'warning' },
  { label: 'Error', value: 'error' },
];

const colLabel: React.CSSProperties = {
  fontSize: 'var(--font-size-xs)',
  fontWeight: 'var(--font-weight-body-strongest)',
  color: 'var(--color-text-moderate)',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  textAlign: 'center',
};

const rowLabel: React.CSSProperties = {
  fontSize: 'var(--font-size-xs)',
  color: 'var(--color-text-moderate)',
  whiteSpace: 'nowrap',
  minWidth: 80,
};

export default function BadgePage() {
  return (
    <div>
      <PageHeader
        title="Badge"
        description="Badges are small visual indicators used to convey status, categories, counts, or labels. They support four semantic types and three sizes."
      />

      {/* Matrix */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Types & Sizes')}
        {sectionDesc('All combinations of type and size. Each type uses semantic color tokens for background, border, and text.')}
        <PreviewBox>
          <div style={{ overflowX: 'auto', width: '100%' }}>
            <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 400 }}>
              <thead>
                <tr>
                  <th style={{ ...colLabel, textAlign: 'left', paddingBottom: 'var(--dimension-tier-6)', paddingRight: 'var(--dimension-tier-7)' }} />
                  {TYPES.map((t) => (
                    <th key={t.value} style={{ ...colLabel, paddingBottom: 'var(--dimension-tier-6)', paddingLeft: 'var(--dimension-tier-5)', paddingRight: 'var(--dimension-tier-5)' }}>
                      {t.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SIZES.map((s) => (
                  <tr key={s.value}>
                    <td style={{ ...rowLabel, paddingRight: 'var(--dimension-tier-7)', paddingBottom: 'var(--dimension-tier-7)' }}>
                      {s.label}
                    </td>
                    {TYPES.map((t) => (
                      <td key={t.value} style={{ textAlign: 'center', paddingBottom: 'var(--dimension-tier-7)', paddingLeft: 'var(--dimension-tier-5)', paddingRight: 'var(--dimension-tier-5)' }}>
                        <Badge label="Label" size={s.value} type={t.value} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </PreviewBox>
      </section>

      {/* In context */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('In context')}
        {sectionDesc('Badges used to indicate status in a list.')}
        <PreviewBox>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-tier-6)' }}>
            {[
              { label: 'Active', type: 'success' as const },
              { label: 'Pending review', type: 'warning' as const },
              { label: 'Failed', type: 'error' as const },
              { label: 'Draft', type: 'default' as const },
              { label: '3 new', type: 'success' as const },
              { label: 'Expired', type: 'error' as const },
            ].map((item) => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 'var(--dimension-tier-5)' }}>
                <Badge label={item.label} size="sm" type={item.type} />
              </div>
            ))}
          </div>
        </PreviewBox>
      </section>

      {/* Props */}
      <section>
        {sectionTitle('Props')}
        <PropsTable rows={[
          { name: 'label', type: 'string', required: true, description: 'Badge text content.' },
          { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'sm'", description: 'Badge height: sm (20px), md (24px), lg (28px).' },
          { name: 'type', type: "'default' | 'success' | 'warning' | 'error'", default: "'default'", description: 'Semantic color variant controlling background, border, and text color.' },
        ]} />
      </section>
    </div>
  );
}
