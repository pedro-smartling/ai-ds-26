'use client';

import React from 'react';
import Tooltip, { TooltipArrow } from '@/components/Tooltip';
import Button from '@/components/Button';
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

const arrowPositions: { label: string; value: TooltipArrow }[] = [
  { label: 'None', value: 'none' },
  { label: 'Bottom left', value: 'bottom-left' },
  { label: 'Bottom center', value: 'bottom-center' },
  { label: 'Bottom right', value: 'bottom-right' },
  { label: 'Top center', value: 'top-center' },
  { label: 'Left', value: 'left' },
  { label: 'Right', value: 'right' },
];

export default function TooltipPage() {
  return (
    <div>
      <PageHeader
        title="Tooltip"
        description="Tooltips display contextual information on hover or focus. They support optional supporting text and 7 arrow positions."
      />

      {/* With supporting text */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('With supporting text')}
        {sectionDesc('When supporting text is provided, the tooltip uses a wider layout with 12px padding and a 12px gap between title and description.')}
        <PreviewBox>
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 'var(--space-page-inside-xxl)', paddingBottom: 'var(--space-page-inside-l)' }}>
            <Tooltip
              text="This is a tooltip"
              supportingText="Tooltips are used to describe or identify an element."
              arrow="bottom-center"
            >
              <Button variant="secondary">Hover me</Button>
            </Tooltip>
          </div>
        </PreviewBox>
      </section>

      {/* Without supporting text */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Without supporting text')}
        {sectionDesc('A compact single-line tooltip with tighter vertical padding (8px vertical, 12px horizontal).')}
        <PreviewBox>
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 'var(--space-page-inside-xxl)', paddingBottom: 'var(--space-page-inside-l)' }}>
            <Tooltip text="This is a tooltip" arrow="bottom-center">
              <Button variant="secondary">Hover me</Button>
            </Tooltip>
          </div>
        </PreviewBox>
      </section>

      {/* Arrow positions */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Arrow positions')}
        {sectionDesc('Seven arrow positions control where the tooltip appears relative to the trigger. Hover over each button to see the arrow direction.')}
        <PreviewBox>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--dimension-tier-9)',
            justifyContent: 'center',
            padding: 'var(--space-page-inside-xxl) var(--space-page-inside-l)',
          }}>
            {arrowPositions.map((pos) => (
              <Tooltip key={pos.value} text="This is a tooltip" arrow={pos.value}>
                <Button variant="secondary" size="sm">{pos.label}</Button>
              </Tooltip>
            ))}
          </div>
        </PreviewBox>
      </section>

      {/* On icons */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('On icon buttons')}
        {sectionDesc('Tooltips are commonly used on icon-only buttons to provide accessible labels.')}
        <PreviewBox>
          <div style={{ display: 'flex', gap: 'var(--dimension-tier-7)', justifyContent: 'center', padding: 'var(--space-page-inside-xxl) var(--space-page-inside-l)' }}>
            <Tooltip text="Edit" arrow="bottom-center">
              <Button variant="tertiary" size="sm">Edit</Button>
            </Tooltip>
            <Tooltip text="Delete" arrow="bottom-center">
              <Button variant="tertiary" size="sm">Delete</Button>
            </Tooltip>
            <Tooltip text="Share" arrow="bottom-center">
              <Button variant="tertiary" size="sm">Share</Button>
            </Tooltip>
          </div>
        </PreviewBox>
      </section>

      {/* Props */}
      <section>
        {sectionTitle('Props')}
        <PropsTable rows={[
          { name: 'text', type: 'string', required: true, description: 'Primary tooltip label.' },
          { name: 'supportingText', type: 'string', description: 'Optional secondary description shown below the title.' },
          { name: 'arrow', type: "'none' | 'bottom-left' | 'bottom-center' | 'bottom-right' | 'top-center' | 'left' | 'right'", default: "'bottom-center'", description: 'Arrow position relative to the tooltip box.' },
          { name: 'children', type: 'React.ReactElement', required: true, description: 'Trigger element. Tooltip shows on hover/focus.' },
        ]} />
      </section>
    </div>
  );
}
