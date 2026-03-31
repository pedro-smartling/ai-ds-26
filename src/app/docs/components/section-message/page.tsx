'use client';

import React from 'react';
import SectionMessage, { SectionMessageType } from '@/components/SectionMessage';
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

const TYPES: { label: string; value: SectionMessageType; title: string; supporting: string }[] = [
  { label: 'Error', value: 'error', title: 'This account has been permanently deleted', supporting: "The user `GraceCocco` no longer has access to Smartling services." },
  { label: 'Warning', value: 'warning', title: 'Your trial expires in 3 days', supporting: 'Upgrade your plan to continue using all features without interruption.' },
  { label: 'Info', value: 'info', title: 'A new version of the dashboard is available', supporting: 'We\'ve made improvements to performance and added new analytics views.' },
  { label: 'Default', value: 'default', title: 'Did you know you can customise your workflow?', supporting: 'Visit the settings page to set up automation rules that save you time.' },
];

export default function SectionMessagePage() {
  return (
    <div>
      <PageHeader
        title="Section Message"
        description="Section messages are prominent banners used to communicate important information, warnings, errors, or tips within a page section. They support a title, optional description, and action links."
      />

      {/* All types */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Types')}
        {sectionDesc('Four types: error (red), warning (amber), info (violet), and default (neutral). Each has a unique left accent bar, border color, and icon.')}
        <PreviewBox>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-tier-9)', width: '100%' }}>
            {TYPES.map((t) => (
              <SectionMessage
                key={t.value}
                type={t.value}
                title={t.title}
                supportingText={t.supporting}
                actions={[
                  { label: 'Dismiss', onClick: () => {} },
                  { label: 'View changes', onClick: () => {} },
                ]}
              />
            ))}
          </div>
        </PreviewBox>
      </section>

      {/* Without supporting text */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Without supporting text')}
        {sectionDesc('Title-only messages for concise alerts.')}
        <PreviewBox>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-tier-9)', width: '100%' }}>
            <SectionMessage
              type="error"
              title="Payment failed — please update your billing information."
              actions={[{ label: 'Update billing', onClick: () => {} }]}
            />
            <SectionMessage
              type="warning"
              title="Your session will expire in 5 minutes."
            />
          </div>
        </PreviewBox>
      </section>

      {/* Without actions */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Without actions')}
        {sectionDesc('Informational messages that don\'t require user action.')}
        <PreviewBox>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-tier-9)', width: '100%' }}>
            <SectionMessage
              type="info"
              title="Scheduled maintenance"
              supportingText="The platform will be briefly unavailable on Sunday, March 30 from 2:00 AM to 4:00 AM UTC."
            />
            <SectionMessage
              type="default"
              title="Pro tip"
              supportingText="You can use keyboard shortcuts to navigate faster. Press ? to see all available shortcuts."
            />
          </div>
        </PreviewBox>
      </section>

      {/* Title only */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Minimal')}
        {sectionDesc('Title only, no supporting text or actions — the most compact form.')}
        <PreviewBox>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-tier-9)', width: '100%' }}>
            {TYPES.map((t) => (
              <SectionMessage
                key={t.value}
                type={t.value}
                title={t.title}
              />
            ))}
          </div>
        </PreviewBox>
      </section>

      {/* Props */}
      <section>
        {sectionTitle('Props')}
        <PropsTable rows={[
          { name: 'title', type: 'string', required: true, description: 'Main message text (bold).' },
          { name: 'supportingText', type: 'string', description: 'Secondary description text below the title.' },
          { name: 'type', type: "'error' | 'warning' | 'info' | 'default'", default: "'error'", description: 'Controls accent color, border, and icon.' },
          { name: 'actions', type: '{ label: string; onClick?: () => void }[]', description: 'Underlined action buttons below the text.' },
          { name: 'icon', type: 'ReactNode', description: 'Custom icon override. Defaults to a type-specific icon.' },
        ]} />
      </section>
    </div>
  );
}
