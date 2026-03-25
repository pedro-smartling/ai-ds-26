'use client';

import React from 'react';
import Card from '@/components/Card';
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

const CardContent = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div>
    <p style={{ fontSize: 'var(--font-size-s)', fontWeight: 'var(--font-weight-body-strongest)', color: 'var(--color-text-main)', margin: '0 0 var(--dimension-tier-2)' }}>
      {title}
    </p>
    {subtitle && <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-moderate)', margin: 0 }}>{subtitle}</p>}
  </div>
);

export default function CardPage() {
  return (
    <div>
      <PageHeader
        title="Card"
        description="A surface container with configurable padding, border, and elevation. Supports click interaction with hover feedback."
      />

      {/* Padding */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Padding')}
        {sectionDesc('Four padding options: none, sm, md (default), and lg.')}
        <PreviewBox bg="subtle">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 'var(--dimension-tier-6)', width: '100%' }}>
            <div>
              <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-moderate)', margin: '0 0 var(--dimension-tier-4)' }}>none</p>
              <Card padding="none" shadow="none"><div style={{ height: '48px', backgroundColor: 'var(--color-surface-brand-moderate)', borderRadius: 'var(--radius-l)' }} /></Card>
            </div>
            <div>
              <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-moderate)', margin: '0 0 var(--dimension-tier-4)' }}>sm</p>
              <Card padding="sm" shadow="none"><CardContent title="Small padding" /></Card>
            </div>
            <div>
              <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-moderate)', margin: '0 0 var(--dimension-tier-4)' }}>md</p>
              <Card padding="md" shadow="none"><CardContent title="Medium padding" /></Card>
            </div>
            <div>
              <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-moderate)', margin: '0 0 var(--dimension-tier-4)' }}>lg</p>
              <Card padding="lg" shadow="none"><CardContent title="Large padding" /></Card>
            </div>
          </div>
        </PreviewBox>
      </section>

      {/* Shadows */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Elevation')}
        {sectionDesc('Four shadow levels: none, xs, s (default), m.')}
        <PreviewBox bg="subtle">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 'var(--dimension-tier-9)', width: '100%' }}>
            {(['none', 'xs', 's', 'm'] as const).map((shadow) => (
              <div key={shadow}>
                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-moderate)', margin: '0 0 var(--dimension-tier-4)' }}>{shadow}</p>
                <Card shadow={shadow}><CardContent title={`Shadow ${shadow}`} subtitle="Elevation level" /></Card>
              </div>
            ))}
          </div>
        </PreviewBox>
      </section>

      {/* Without border */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Border')}
        {sectionDesc('Set border={false} to remove the 1px border. Useful for elevation-only cards.')}
        <PreviewBox bg="subtle">
          <div style={{ display: 'flex', gap: 'var(--dimension-tier-7)', flexWrap: 'wrap' }}>
            <div>
              <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-moderate)', margin: '0 0 var(--dimension-tier-4)' }}>With border</p>
              <Card shadow="s" border={true} style={{ minWidth: '160px' }}><CardContent title="Border on" subtitle="Default" /></Card>
            </div>
            <div>
              <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-moderate)', margin: '0 0 var(--dimension-tier-4)' }}>Without border</p>
              <Card shadow="s" border={false} style={{ minWidth: '160px' }}><CardContent title="Border off" subtitle="Shadow only" /></Card>
            </div>
          </div>
        </PreviewBox>
      </section>

      {/* Clickable */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Clickable')}
        {sectionDesc('Pass an onClick handler to make the card interactive. It adds cursor pointer and a hover shadow effect.')}
        <PreviewBox bg="subtle">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--dimension-tier-6)', maxWidth: '560px' }}>
            {['Analytics', 'Reports', 'Settings'].map((title) => (
              <Card key={title} onClick={() => alert(`Clicked: ${title}`)}>
                <CardContent title={title} subtitle="Click me" />
              </Card>
            ))}
          </div>
        </PreviewBox>
      </section>

      {/* Props */}
      <section>
        {sectionTitle('Props')}
        <PropsTable rows={[
          { name: 'children', type: 'React.ReactNode', required: true, description: 'Content rendered inside the card.' },
          { name: 'padding', type: "'none' | 'sm' | 'md' | 'lg'", default: "'md'", description: 'Internal padding amount.' },
          { name: 'border', type: 'boolean', default: 'true', description: 'Shows or hides the 1px border.' },
          { name: 'shadow', type: "'none' | 'xs' | 's' | 'm'", default: "'s'", description: 'Box shadow elevation level.' },
          { name: 'onClick', type: '() => void', description: 'Makes the card interactive with pointer cursor and hover shadow.' },
          { name: 'className', type: 'string', description: 'Additional CSS class names.' },
          { name: 'style', type: 'React.CSSProperties', description: 'Inline style overrides.' },
        ]} />
      </section>
    </div>
  );
}
