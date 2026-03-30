'use client';

import React from 'react';
import BaseTooltip, { BaseTooltipPosition } from '@/components/BaseTooltip';
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

const positions: { label: string; value: BaseTooltipPosition }[] = [
  { label: 'Top', value: 'top' },
  { label: 'Top left', value: 'top-left' },
  { label: 'Top right', value: 'top-right' },
  { label: 'Bottom', value: 'bottom' },
  { label: 'Left', value: 'left' },
  { label: 'Right', value: 'right' },
];

export default function BaseTooltipPage() {
  return (
    <div>
      <PageHeader
        title="Base Tooltip"
        description="A question-mark icon that reveals a tooltip on hover or focus. Wraps the Tooltip component with a CircleHelp icon trigger. Supports 6 positions and optional supporting text."
      />

      {/* Without supporting text */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Without supporting text')}
        {sectionDesc('A compact tooltip with just a title. Hover over each icon to see the tooltip in different positions.')}
        <PreviewBox>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--dimension-tier-15)',
            justifyContent: 'center',
            padding: 'var(--space-page-inside-xxl) var(--space-page-inside-l)',
          }}>
            {positions.map((pos) => (
              <div key={pos.value} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--dimension-tier-5)' }}>
                <BaseTooltip text="This is a tooltip" position={pos.value} />
                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-moderate)' }}>{pos.label}</span>
              </div>
            ))}
          </div>
        </PreviewBox>
      </section>

      {/* With supporting text */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('With supporting text')}
        {sectionDesc('A wider tooltip layout with title and description. Hover over each icon to preview.')}
        <PreviewBox>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--dimension-tier-15)',
            justifyContent: 'center',
            padding: 'var(--space-page-inside-xxl) var(--space-page-inside-l)',
          }}>
            {positions.map((pos) => (
              <div key={pos.value} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--dimension-tier-5)' }}>
                <BaseTooltip
                  text="This is a tooltip"
                  supportingText="Tooltips are used to describe or identify an element."
                  position={pos.value}
                />
                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-moderate)' }}>{pos.label}</span>
              </div>
            ))}
          </div>
        </PreviewBox>
      </section>

      {/* Inline usage */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Inline usage')}
        {sectionDesc('The base tooltip is designed to sit inline next to labels and headings to provide contextual help.')}
        <PreviewBox>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-tier-7)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--dimension-tier-3)' }}>
              <span style={{ fontSize: 'var(--font-size-s)', fontWeight: 'var(--font-weight-body-strong)', color: 'var(--color-text-soft)' }}>
                API Rate Limit
              </span>
              <BaseTooltip text="Maximum requests per minute" supportingText="Exceeding this limit will result in 429 responses." position="top" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--dimension-tier-3)' }}>
              <span style={{ fontSize: 'var(--font-size-s)', fontWeight: 'var(--font-weight-body-strong)', color: 'var(--color-text-soft)' }}>
                Webhook URL
              </span>
              <BaseTooltip text="Endpoint for event callbacks" position="right" />
            </div>
          </div>
        </PreviewBox>
      </section>

      {/* Props */}
      <section>
        {sectionTitle('Props')}
        <PropsTable rows={[
          { name: 'text', type: 'string', required: true, description: 'Primary tooltip label.' },
          { name: 'supportingText', type: 'string', description: 'Optional secondary description below the title.' },
          { name: 'position', type: "'top' | 'top-left' | 'top-right' | 'bottom' | 'left' | 'right'", default: "'top'", description: 'Where the tooltip appears relative to the icon.' },
          { name: 'size', type: 'number', default: '16', description: 'Icon size in pixels.' },
          { name: 'color', type: 'string', default: 'var(--color-foreground-moderate)', description: 'Icon color.' },
        ]} />
      </section>
    </div>
  );
}
