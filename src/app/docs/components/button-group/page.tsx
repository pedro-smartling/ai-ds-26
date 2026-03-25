'use client';

import React from 'react';
import Button from '@/components/Button';
import ButtonGroup from '@/components/ButtonGroup';
import PageHeader from '@/components/docs/PageHeader';
import PreviewBox from '@/components/docs/PreviewBox';
import PropsTable from '@/components/docs/PropsTable';
import { AlignLeft, AlignCenter, AlignRight, Bold, Italic, Underline } from 'lucide-react';

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

export default function ButtonGroupPage() {
  return (
    <div>
      <PageHeader
        title="Button Group"
        description="Groups related buttons into a single joined control. Supports horizontal and vertical orientation, and works with any button variant."
      />

      {/* Horizontal */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Horizontal')}
        {sectionDesc('Default orientation. Buttons are joined side-by-side with shared borders and no gap.')}
        <PreviewBox>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-tier-7)', alignItems: 'flex-start' }}>
            <ButtonGroup>
              <Button variant="secondary">Left</Button>
              <Button variant="secondary">Center</Button>
              <Button variant="secondary">Right</Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button variant="secondary" icon={<AlignLeft width={16} height={16} />} iconOnly aria-label="Align left" />
              <Button variant="secondary" icon={<AlignCenter width={16} height={16} />} iconOnly aria-label="Align center" />
              <Button variant="secondary" icon={<AlignRight width={16} height={16} />} iconOnly aria-label="Align right" />
            </ButtonGroup>
          </div>
        </PreviewBox>
      </section>

      {/* Vertical */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Vertical')}
        {sectionDesc('Stack buttons vertically. Useful for sidebar controls or stacked action menus.')}
        <PreviewBox>
          <div style={{ display: 'flex', gap: 'var(--dimension-tier-9)', alignItems: 'flex-start' }}>
            <ButtonGroup orientation="vertical">
              <Button variant="secondary">Top</Button>
              <Button variant="secondary">Middle</Button>
              <Button variant="secondary">Bottom</Button>
            </ButtonGroup>
            <ButtonGroup orientation="vertical">
              <Button variant="secondary" icon={<Bold width={16} height={16} />} iconOnly aria-label="Bold" />
              <Button variant="secondary" icon={<Italic width={16} height={16} />} iconOnly aria-label="Italic" />
              <Button variant="secondary" icon={<Underline width={16} height={16} />} iconOnly aria-label="Underline" />
            </ButtonGroup>
          </div>
        </PreviewBox>
      </section>

      {/* With sizes */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Sizes')}
        {sectionDesc('Button size applies to the whole group. Mix sizes within a group is not recommended.')}
        <PreviewBox>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-tier-7)', alignItems: 'flex-start' }}>
            <ButtonGroup>
              <Button variant="secondary" size="sm">Small</Button>
              <Button variant="secondary" size="sm">Group</Button>
              <Button variant="secondary" size="sm">Buttons</Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button variant="secondary" size="md">Medium</Button>
              <Button variant="secondary" size="md">Group</Button>
              <Button variant="secondary" size="md">Buttons</Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button variant="secondary" size="lg">Large</Button>
              <Button variant="secondary" size="lg">Group</Button>
              <Button variant="secondary" size="lg">Buttons</Button>
            </ButtonGroup>
          </div>
        </PreviewBox>
      </section>

      {/* Two buttons */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Two buttons')}
        {sectionDesc('Works with any number of children, including just two.')}
        <PreviewBox>
          <ButtonGroup>
            <Button variant="secondary">Cancel</Button>
            <Button variant="primary">Confirm</Button>
          </ButtonGroup>
        </PreviewBox>
      </section>

      {/* Props */}
      <section>
        {sectionTitle('Props')}
        <PropsTable rows={[
          { name: 'children', type: 'React.ReactNode', required: true, description: 'Button components to group. Each child receives adjusted border-radius and separator borders.' },
          { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Layout direction of grouped buttons.' },
        ]} />
      </section>
    </div>
  );
}
