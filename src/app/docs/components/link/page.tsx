'use client';

import React from 'react';
import Link from '@/components/Link';
import type { LinkSize, LinkWeight, LinkState } from '@/components/Link';
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

const SIZES: { label: string; value: LinkSize }[] = [
  { label: 'xs — 12px', value: 'xs' },
  { label: 'sm — 14px', value: 'sm' },
  { label: 'md — 16px', value: 'md' },
  { label: 'lg — 18px', value: 'lg' },
];

const WEIGHTS: { label: string; value: LinkWeight }[] = [
  { label: 'Regular (400)', value: 'regular' },
  { label: 'Medium (500)', value: 'medium' },
  { label: 'Strongest (600)', value: 'strongest' },
];

const STATES: { label: string; value: LinkState }[] = [
  { label: 'Default', value: 'default' },
  { label: 'Hover', value: 'hover' },
  { label: 'Pressed', value: 'pressed' },
  { label: 'Disabled', value: 'disabled' },
];

const colLabel: React.CSSProperties = {
  fontSize: 'var(--font-size-xs)',
  fontWeight: 'var(--font-weight-body-strongest)',
  color: 'var(--color-text-moderate)',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  textAlign: 'left',
};

const rowLabel: React.CSSProperties = {
  fontSize: 'var(--font-size-xs)',
  color: 'var(--color-text-moderate)',
  whiteSpace: 'nowrap',
  minWidth: 100,
};

export default function LinkPage() {
  return (
    <div>
      <PageHeader
        title="Link"
        description="Hyperlinks navigate users to other pages or external resources. They support four sizes, three font weights, an optional trailing icon, and interactive states including hover underline and pressed highlight."
      />

      {/* Sizes */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Sizes')}
        {sectionDesc('Four sizes: xs (12px), sm (14px), md (16px), and lg (18px). Icon size scales accordingly (12px for xs/sm, 16px for md/lg).')}
        <PreviewBox>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-tier-7)' }}>
            {SIZES.map((s) => (
              <div key={s.value} style={{ display: 'flex', alignItems: 'center', gap: 'var(--dimension-tier-9)' }}>
                <span style={{ ...rowLabel }}>{s.label}</span>
                <Link size={s.value} icon>This is a hyperlink</Link>
              </div>
            ))}
          </div>
        </PreviewBox>
      </section>

      {/* Weights */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Weights')}
        {sectionDesc('Three font weights: regular (400), medium (500), and strongest (600).')}
        <PreviewBox>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-tier-7)' }}>
            {WEIGHTS.map((w) => (
              <div key={w.value} style={{ display: 'flex', alignItems: 'center', gap: 'var(--dimension-tier-9)' }}>
                <span style={{ ...rowLabel, minWidth: 140 }}>{w.label}</span>
                <Link size="md" weight={w.value} icon>This is a hyperlink</Link>
              </div>
            ))}
          </div>
        </PreviewBox>
      </section>

      {/* States matrix */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('States')}
        {sectionDesc('All visual states across sizes and weights. Default shows blue text, hover adds underline, pressed shows amber background with dark text, disabled reduces opacity.')}
        <PreviewBox>
          <div style={{ overflowX: 'auto', width: '100%' }}>
            <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 600 }}>
              <thead>
                <tr>
                  <th style={{ ...colLabel, paddingBottom: 'var(--dimension-tier-6)', paddingRight: 'var(--dimension-tier-7)' }} />
                  {STATES.map((s) => (
                    <th key={s.value} style={{ ...colLabel, paddingBottom: 'var(--dimension-tier-6)', paddingRight: 'var(--dimension-tier-9)' }}>
                      {s.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {WEIGHTS.map((w) =>
                  SIZES.map((size) => (
                    <tr key={`${w.value}-${size.value}`}>
                      <td style={{ ...rowLabel, paddingRight: 'var(--dimension-tier-7)', paddingBottom: 'var(--dimension-tier-6)' }}>
                        {size.label}
                        <span style={{
                          display: 'block',
                          fontSize: 'var(--font-size-xs)',
                          color: 'var(--color-text-soft)',
                          fontWeight: 'var(--font-weight-body-strong)',
                        }}>
                          {w.label}
                        </span>
                      </td>
                      {STATES.map((s) => (
                        <td key={s.value} style={{ paddingBottom: 'var(--dimension-tier-6)', paddingRight: 'var(--dimension-tier-9)' }}>
                          <Link size={size.value} weight={w.value} forceState={s.value} icon>
                            This is a hyperlink
                          </Link>
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </PreviewBox>
      </section>

      {/* Without icon */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Without icon')}
        {sectionDesc('Links without the trailing external-link icon for inline usage within text.')}
        <PreviewBox>
          <div style={{ display: 'flex', gap: 'var(--dimension-tier-9)', alignItems: 'center' }}>
            <Link size="sm">Learn more</Link>
            <Link size="md" weight="medium">View documentation</Link>
            <Link size="lg" weight="strongest">Get started</Link>
          </div>
        </PreviewBox>
      </section>

      {/* In context */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('In context')}
        {sectionDesc('Links used inline within body text.')}
        <PreviewBox>
          <p style={{
            fontFamily: 'var(--font-family-base)',
            fontSize: 'var(--font-size-m)',
            lineHeight: 'var(--line-height-body-m)',
            color: 'var(--color-text-moderate)',
            margin: 0,
            maxWidth: 560,
          }}>
            By continuing, you agree to our{' '}
            <Link size="md" weight="medium">Terms of Service</Link>
            {' '}and{' '}
            <Link size="md" weight="medium">Privacy Policy</Link>
            . For questions, visit our{' '}
            <Link size="md" weight="medium" icon>Help Center</Link>.
          </p>
        </PreviewBox>
      </section>

      {/* Props */}
      <section>
        {sectionTitle('Props')}
        <PropsTable rows={[
          { name: 'children', type: 'ReactNode', required: true, description: 'Link text content.' },
          { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg'", default: "'sm'", description: 'Font size: xs (12px), sm (14px), md (16px), lg (18px).' },
          { name: 'weight', type: "'regular' | 'medium' | 'strongest'", default: "'regular'", description: 'Font weight: regular (400), medium (500), strongest (600).' },
          { name: 'forceState', type: "'default' | 'hover' | 'pressed' | 'disabled'", description: 'Override visual state for demos.' },
          { name: 'icon', type: 'boolean', default: 'false', description: 'Show trailing external-link icon.' },
          { name: 'trailingIcon', type: 'ReactNode', description: 'Custom trailing icon override.' },
          { name: 'href', type: 'string', description: 'Link destination URL.' },
          { name: 'onClick', type: '(e) => void', description: 'Click handler.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the link (reduced opacity, no interaction).' },
        ]} />
      </section>
    </div>
  );
}
