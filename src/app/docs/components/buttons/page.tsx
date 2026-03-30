'use client';

import React from 'react';
import Button from '@/components/Button';
import PageHeader from '@/components/docs/PageHeader';
import PreviewBox from '@/components/docs/PreviewBox';
import PropsTable from '@/components/docs/PropsTable';
import { Plus, Download, ArrowRight } from 'lucide-react';

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

export default function ButtonsPage() {
  return (
    <div>
      <PageHeader
        title="Buttons"
        description="Buttons trigger actions and navigation. They come in 7 variants, 3 sizes, and support leading icons and icon-only mode."
      />

      {/* Variants */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Variants')}
        {sectionDesc('Seven semantic variants covering the full range of action hierarchy — from primary CTA to destructive and link styles.')}
        <PreviewBox>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--dimension-tier-6)', alignItems: 'center' }}>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="tertiary">Tertiary</Button>
            <Button variant="delete-primary">Delete primary</Button>
            <Button variant="delete-secondary">Delete secondary</Button>
            <Button variant="link-color">Link color</Button>
            <Button variant="link-gray">Link gray</Button>
          </div>
        </PreviewBox>
      </section>

      {/* Sizes */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Sizes')}
        {sectionDesc('Four sizes scale with content density. Use xl for hero actions, lg for primary, md as default, sm for compact UIs.')}
        <PreviewBox>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--dimension-tier-6)', alignItems: 'center' }}>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button size="xl">Extra large</Button>
          </div>
        </PreviewBox>
      </section>

      {/* Disabled */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Disabled state')}
        {sectionDesc('All variants support a disabled state. Use disabled to prevent interaction and communicate unavailability.')}
        <PreviewBox>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--dimension-tier-6)', alignItems: 'center' }}>
            <Button variant="primary" disabled>Primary</Button>
            <Button variant="secondary" disabled>Secondary</Button>
            <Button variant="tertiary" disabled>Tertiary</Button>
            <Button variant="delete-primary" disabled>Delete primary</Button>
            <Button variant="delete-secondary" disabled>Delete secondary</Button>
            <Button variant="link-color" disabled>Link color</Button>
            <Button variant="link-gray" disabled>Link gray</Button>
          </div>
        </PreviewBox>
      </section>

      {/* With icons */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('With leading icon')}
        {sectionDesc('Pass any React node as icon. The icon renders before the label with auto spacing.')}
        <PreviewBox>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--dimension-tier-6)', alignItems: 'center' }}>
            <Button icon={<Plus width={16} height={16} />}>Add item</Button>
            <Button variant="secondary" icon={<Download width={16} height={16} />}>Download</Button>
            <Button variant="tertiary" icon={<ArrowRight width={16} height={16} />}>Continue</Button>
          </div>
        </PreviewBox>
      </section>

      {/* Icon only */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Icon only')}
        {sectionDesc('Set iconOnly to collapse the button to a square, showing only the icon. Always pair with an aria-label.')}
        <PreviewBox>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--dimension-tier-6)', alignItems: 'center' }}>
            <Button icon={<Plus width={16} height={16} />} iconOnly aria-label="Add" size="sm" />
            <Button icon={<Plus width={16} height={16} />} iconOnly aria-label="Add" />
            <Button icon={<Plus width={16} height={16} />} iconOnly aria-label="Add" size="lg" />
            <Button variant="secondary" icon={<Download width={16} height={16} />} iconOnly aria-label="Download" />
            <Button variant="tertiary" icon={<Plus width={16} height={16} />} iconOnly aria-label="Add" />
          </div>
        </PreviewBox>
      </section>

      {/* Props table */}
      <section>
        {sectionTitle('Props')}
        <PropsTable rows={[
          { name: 'variant', type: "'primary' | 'secondary' | 'tertiary' | 'delete-primary' | 'delete-secondary' | 'link-color' | 'link-gray'", default: "'primary'", description: 'Visual style and semantic role of the button.' },
          { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Controls button height and padding.' },
          { name: 'icon', type: 'React.ReactNode', description: 'Optional icon rendered before the label.' },
          { name: 'iconOnly', type: 'boolean', default: 'false', description: 'Collapses to a square icon button. Requires aria-label.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Prevents interaction and applies disabled visual style.' },
          { name: 'children', type: 'React.ReactNode', description: 'Button label text.' },
          { name: 'className', type: 'string', description: 'Additional CSS class names.' },
          { name: '...props', type: 'React.ButtonHTMLAttributes<HTMLButtonElement>', description: 'All native button attributes are forwarded.' },
        ]} />
      </section>
    </div>
  );
}
