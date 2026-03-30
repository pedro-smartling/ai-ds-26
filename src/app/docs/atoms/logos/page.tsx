import React from 'react';
import PageHeader from '@/components/docs/PageHeader';
import PreviewBox from '@/components/docs/PreviewBox';

const LOGO_URL = 'https://www.smartling.com/hubfs/SmartlingWebsite-WCS/Frame%20(17).svg';

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

type LogoVariant = {
  label: string;
  bg: string;
  filter?: string;
  description: string;
};

const variants: LogoVariant[] = [
  {
    label: 'Default',
    bg: '#ffffff',
    description: 'Use on light backgrounds. Full-color brandmark with dark logotype.',
  },
  {
    label: 'White',
    bg: '#1a1a1a',
    filter: 'brightness(0) invert(1)',
    description: 'Use on dark or photographic backgrounds where the default feels too prominent.',
  },
  {
    label: 'Black',
    bg: '#f5f5f5',
    filter: 'brightness(0)',
    description: 'Use on light or white backgrounds as a single-color alternative.',
  },
];

export default function LogosPage() {
  return (
    <div>
      <PageHeader
        title="Logos"
        description="The Smartling logo comes in three color variants. Always maintain clear space around the logo and never distort, recolor, or modify it."
      />

      {/* Variants */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Variants')}
        {sectionDesc('Three variants cover all background contexts: Default for dark backgrounds, White for high contrast on dark, and Black for light backgrounds.')}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-tier-6)' }}>
          {variants.map((v) => (
            <div key={v.label}>
              <div style={{
                backgroundColor: v.bg,
                borderRadius: 'var(--radius-l) var(--radius-l) 0 0',
                padding: 'var(--dimension-tier-11)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '120px',
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={LOGO_URL}
                  alt={`Smartling logo — ${v.label}`}
                  style={{ height: 32, filter: v.filter, display: 'block' }}
                />
              </div>
              <div style={{
                backgroundColor: 'var(--color-surface-main)',
                border: '1px solid var(--color-border-soft)',
                borderTop: 'none',
                borderRadius: '0 0 var(--radius-l) var(--radius-l)',
                padding: 'var(--dimension-tier-7)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 'var(--dimension-tier-6)',
              }}>
                <span style={{
                  fontSize: 'var(--font-size-xs)',
                  fontWeight: 'var(--font-weight-body-strongest)',
                  color: 'var(--color-text-main)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  whiteSpace: 'nowrap',
                  paddingTop: '2px',
                }}>
                  {v.label}
                </span>
                <span style={{
                  fontSize: 'var(--font-size-s)',
                  color: 'var(--color-text-moderate)',
                  lineHeight: 'var(--line-height-body-s)',
                }}>
                  {v.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Brandmark only */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Brandmark only')}
        {sectionDesc('The brandmark can be used independently in contexts where the Smartling name is already established, such as app icons or favicons.')}
        <PreviewBox>
          <div style={{ display: 'flex', gap: 'var(--dimension-tier-9)', alignItems: 'center', flexWrap: 'wrap' }}>
            {[
              { label: 'sm — 16px', size: 16 },
              { label: 'md — 24px', size: 24 },
              { label: 'lg — 32px', size: 32 },
              { label: 'xl — 48px', size: 48 },
            ].map(({ label, size }) => (
              <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--dimension-tier-5)' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={LOGO_URL}
                  alt="Smartling brandmark"
                  style={{ height: size, width: 'auto', objectFit: 'contain', objectPosition: 'left' }}
                />
                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-moderate)' }}>{label}</span>
              </div>
            ))}
          </div>
        </PreviewBox>
      </section>

      {/* Clear space */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Usage guidelines')}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-tier-6)' }}>
          {[
            { rule: 'Do', text: 'Maintain clear space equal to the height of the brandmark on all sides.' },
            { rule: 'Do', text: 'Use the provided variants — Default on light, White on dark.' },
            { rule: 'Do', text: 'Scale proportionally, keeping the original aspect ratio.' },
            { rule: "Don't", text: 'Recolor, skew, rotate, or add effects to the logo.' },
            { rule: "Don't", text: 'Place the logo on backgrounds that reduce legibility.' },
            { rule: "Don't", text: 'Use the logotype without the brandmark, or vice versa, outside approved contexts.' },
          ].map(({ rule, text }, i) => (
            <div key={i} style={{ display: 'flex', gap: 'var(--dimension-tier-6)', alignItems: 'flex-start' }}>
              <span style={{
                fontSize: 'var(--font-size-xs)',
                fontWeight: 'var(--font-weight-body-strongest)',
                color: rule === 'Do' ? 'var(--color-text-success-main)' : 'var(--color-text-error-main)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                whiteSpace: 'nowrap',
                paddingTop: '2px',
                minWidth: '44px',
              }}>
                {rule}
              </span>
              <span style={{
                fontSize: 'var(--font-size-s)',
                color: 'var(--color-text-moderate)',
                lineHeight: 'var(--line-height-body-s)',
              }}>
                {text}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
