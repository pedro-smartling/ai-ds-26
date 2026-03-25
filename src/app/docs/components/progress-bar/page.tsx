'use client';

import React from 'react';
import ProgressBar from '@/components/ProgressBar';
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

export default function ProgressBarPage() {
  return (
    <div>
      <PageHeader
        title="Progress Bar"
        description="Communicates the completion of a task or process. Four semantic color roles and three sizes."
      />

      {/* Colors */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Colors')}
        {sectionDesc('Four semantic colors: brand (default), success, warning, and error.')}
        <PreviewBox>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-tier-7)', width: '100%', maxWidth: '480px' }}>
            <ProgressBar value={65} color="brand" label="Brand" showValue />
            <ProgressBar value={80} color="success" label="Success" showValue />
            <ProgressBar value={45} color="warning" label="Warning" showValue />
            <ProgressBar value={30} color="error" label="Error" showValue />
          </div>
        </PreviewBox>
      </section>

      {/* Sizes */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Sizes')}
        {sectionDesc('Three track heights: xs (4px), sm (8px), md (12px).')}
        <PreviewBox>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-tier-7)', width: '100%', maxWidth: '480px' }}>
            <ProgressBar value={60} size="xs" label="Extra small (xs)" />
            <ProgressBar value={60} size="sm" label="Small (sm)" />
            <ProgressBar value={60} size="md" label="Medium (md)" />
          </div>
        </PreviewBox>
      </section>

      {/* With value */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('With value label')}
        {sectionDesc('Set showValue to display the percentage to the right of the label.')}
        <PreviewBox>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-tier-7)', width: '100%', maxWidth: '480px' }}>
            <ProgressBar value={72} label="Uploading…" showValue />
            <ProgressBar value={100} color="success" label="Complete" showValue />
          </div>
        </PreviewBox>
      </section>

      {/* Edge cases */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Edge values')}
        {sectionDesc('Value is clamped between 0 and 100.')}
        <PreviewBox>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-tier-7)', width: '100%', maxWidth: '480px' }}>
            <ProgressBar value={0} label="Not started" showValue />
            <ProgressBar value={1} label="Just started" showValue />
            <ProgressBar value={99} color="success" label="Almost done" showValue />
            <ProgressBar value={100} color="success" label="Complete" showValue />
          </div>
        </PreviewBox>
      </section>

      {/* Props */}
      <section>
        {sectionTitle('Props')}
        <PropsTable rows={[
          { name: 'value', type: 'number', required: true, description: 'Progress value from 0 to 100. Automatically clamped.' },
          { name: 'color', type: "'brand' | 'success' | 'warning' | 'error'", default: "'brand'", description: 'Semantic color role.' },
          { name: 'size', type: "'xs' | 'sm' | 'md'", default: "'sm'", description: 'Track height.' },
          { name: 'label', type: 'string', description: 'Text label rendered above the bar.' },
          { name: 'showValue', type: 'boolean', default: 'false', description: 'Shows the percentage value to the right of the label.' },
        ]} />
      </section>
    </div>
  );
}
