'use client';

import React from 'react';
import TagCount, { TagCountSize } from '@/components/TagCount';
import TagCloseX, { TagCloseXSize } from '@/components/TagCloseX';
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

const SIZES: { label: string; value: TagCountSize; desc: string }[] = [
  { label: 'sm', value: 'sm', desc: '16×16px, 12px text' },
  { label: 'md', value: 'md', desc: '16×16px, 12px text' },
  { label: 'lg', value: 'lg', desc: '20×20px, 14px text' },
];

export default function BaseTagPage() {
  return (
    <div>
      <PageHeader
        title="Base Tag"
        description="Foundational atoms used inside the Tag component. Includes the Tag Count badge — a small rounded square that displays a numeric count."
      />

      {/* Tag Count — sizes */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Tag Count — Sizes')}
        {sectionDesc('Three sizes matching the parent Tag sizes. sm and md share the same 16px box; lg uses a 20px box with larger text.')}
        <PreviewBox>
          <div style={{ display: 'flex', gap: 'var(--dimension-tier-11)', alignItems: 'flex-end' }}>
            {SIZES.map((s) => (
              <div key={s.value} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--dimension-tier-5)' }}>
                <TagCount count={5} size={s.value} />
                <div style={{ textAlign: 'center' }}>
                  <span style={{ display: 'block', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-body-strongest)', color: 'var(--color-text-moderate)' }}>{s.label}</span>
                  <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-strong)' }}>{s.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </PreviewBox>
      </section>

      {/* Tag Count — different values */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Tag Count — Values')}
        {sectionDesc('The count badge adapts to single and multi-digit numbers.')}
        <PreviewBox>
          <div style={{ display: 'flex', gap: 'var(--dimension-tier-7)', alignItems: 'center' }}>
            {[1, 5, 9, 12, 99].map((n) => (
              <TagCount key={n} count={n} size="lg" />
            ))}
          </div>
        </PreviewBox>
      </section>

      {/* Anatomy */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Anatomy')}
        {sectionDesc('The Tag Count is a square container with a centered number. Background uses --color-surface-moderate, corners use --radius-xs, and text uses --font-weight-body-strong.')}
        <PreviewBox>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--dimension-tier-9)',
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--dimension-tier-3)',
            }}>
              <div style={{
                border: '1px dashed var(--color-border-brand-main)',
                borderRadius: 'var(--radius-xs)',
                padding: 'var(--dimension-tier-2)',
              }}>
                <TagCount count={5} size="lg" />
              </div>
              <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-moderate)' }}>20×20px</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-tier-3)', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-moderate)', lineHeight: 'var(--line-height-body-xs)' }}>
              <span>Background: <code style={{ fontFamily: 'monospace' }}>--color-surface-moderate</code></span>
              <span>Border radius: <code style={{ fontFamily: 'monospace' }}>--radius-xs</code> (4px)</span>
              <span>Padding: <code style={{ fontFamily: 'monospace' }}>--dimension-tier-3</code> (4px) horizontal</span>
              <span>Font: <code style={{ fontFamily: 'monospace' }}>--font-weight-body-strong</code> (500)</span>
            </div>
          </div>
        </PreviewBox>
      </section>

      {/* ── Tag Close X ─────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Tag Close X — Sizes')}
        {sectionDesc('Three sizes matching the parent Tag sizes. On hover, the background fills with --color-surface-moderate and corners round to --radius-xs.')}
        <PreviewBox>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-tier-9)' }}>
            {/* Default state */}
            <div>
              <p style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-body-strongest)', color: 'var(--color-text-moderate)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 'var(--dimension-tier-5)' }}>Default</p>
              <div style={{ display: 'flex', gap: 'var(--dimension-tier-11)', alignItems: 'flex-end' }}>
                {(['sm', 'md', 'lg'] as TagCloseXSize[]).map((s) => (
                  <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--dimension-tier-5)' }}>
                    <TagCloseX size={s} forceState="default" />
                    <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-moderate)' }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Hover state */}
            <div>
              <p style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-body-strongest)', color: 'var(--color-text-moderate)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 'var(--dimension-tier-5)' }}>Hover</p>
              <div style={{ display: 'flex', gap: 'var(--dimension-tier-11)', alignItems: 'flex-end' }}>
                {(['sm', 'md', 'lg'] as TagCloseXSize[]).map((s) => (
                  <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--dimension-tier-5)' }}>
                    <TagCloseX size={s} forceState="hover" />
                    <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-moderate)' }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </PreviewBox>
      </section>

      {/* Props */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('TagCloseX Props')}
        <PropsTable rows={[
          { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Button size: sm = 12px, md = 16px, lg = 20px.' },
          { name: 'onClick', type: '() => void', description: 'Called when the X is clicked.' },
          { name: 'forceState', type: "'default' | 'hover'", description: 'Override visual state for demos.' },
        ]} />
      </section>

      <section>
        {sectionTitle('TagCount Props')}
        <PropsTable rows={[
          { name: 'count', type: 'number | string', required: true, description: 'Value to display inside the badge.' },
          { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Badge size: sm/md = 16px box, lg = 20px box.' },
        ]} />
      </section>
    </div>
  );
}
