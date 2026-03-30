'use client';

import React, { useState } from 'react';
import Radio from '@/components/Radio';
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

function RadioGroupSm() {
  const [value, setValue] = useState('monthly');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-tier-6)' }}>
      {[
        { id: 'monthly', label: 'Monthly billing' },
        { id: 'annual', label: 'Annual billing' },
        { id: 'enterprise', label: 'Enterprise billing' },
      ].map((opt) => (
        <Radio
          key={opt.id}
          name="billing-sm"
          value={opt.id}
          label={opt.label}
          size="sm"
          checked={value === opt.id}
          onChange={() => setValue(opt.id)}
        />
      ))}
    </div>
  );
}

function RadioGroupMd() {
  const [value, setValue] = useState('monthly');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-tier-7)' }}>
      {[
        { id: 'monthly', label: 'Monthly billing' },
        { id: 'annual', label: 'Annual billing' },
        { id: 'enterprise', label: 'Enterprise billing' },
      ].map((opt) => (
        <Radio
          key={opt.id}
          name="billing-md"
          value={opt.id}
          label={opt.label}
          size="md"
          checked={value === opt.id}
          onChange={() => setValue(opt.id)}
        />
      ))}
    </div>
  );
}

function RadioGroupWithSupporting() {
  const [value, setValue] = useState('startup');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-tier-9)' }}>
      {[
        { id: 'startup', label: 'Startup', supportingText: 'Up to 5 users, 10 projects included.' },
        { id: 'growth', label: 'Growth', supportingText: 'Up to 25 users, unlimited projects.' },
        { id: 'enterprise', label: 'Enterprise', supportingText: 'Unlimited users, SSO, SLA support.' },
      ].map((opt) => (
        <Radio
          key={opt.id}
          name="plan"
          value={opt.id}
          label={opt.label}
          supportingText={opt.supportingText}
          size="md"
          checked={value === opt.id}
          onChange={() => setValue(opt.id)}
        />
      ))}
    </div>
  );
}

export default function RadioPage() {
  return (
    <div>
      <PageHeader
        title="Radio"
        description="Radio buttons allow users to select a single option from a list. They come in two sizes and use the Base Radio atom for the circle control."
      />

      {/* Sizes */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Sizes')}
        {sectionDesc('Two sizes: sm (16px circle, 14px text) for compact layouts and md (20px circle, 16px text) for standard forms.')}
        <PreviewBox>
          <div style={{ display: 'flex', gap: 'var(--dimension-tier-13)', alignItems: 'flex-start' }}>
            <div>
              <p style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-body-strongest)', color: 'var(--color-text-moderate)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 'var(--dimension-tier-6)' }}>sm</p>
              <RadioGroupSm />
            </div>
            <div>
              <p style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-body-strongest)', color: 'var(--color-text-moderate)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 'var(--dimension-tier-6)' }}>md</p>
              <RadioGroupMd />
            </div>
          </div>
        </PreviewBox>
      </section>

      {/* With supporting text */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('With supporting text')}
        {sectionDesc('Add supportingText to provide additional context below the label for each option.')}
        <PreviewBox>
          <div style={{ maxWidth: '400px' }}>
            <RadioGroupWithSupporting />
          </div>
        </PreviewBox>
      </section>

      {/* Disabled */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Disabled')}
        {sectionDesc('Disabled radios are non-interactive. Both label and supporting text dim to the disabled color.')}
        <PreviewBox>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-tier-7)', maxWidth: '400px' }}>
            <Radio name="disabled-ex" label="Available option" supportingText="This option can be selected." size="md" checked onChange={() => {}} />
            <Radio name="disabled-ex" label="Disabled unchecked" supportingText="This option is not available." size="md" state="disabled" />
            <Radio name="disabled-ex" label="Disabled checked" supportingText="This was pre-selected and cannot change." size="md" checked state="disabled" onChange={() => {}} />
          </div>
        </PreviewBox>
      </section>

      {/* Read-only */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Read-only')}
        {sectionDesc('Read-only radios display the current selection but prevent changes. Visually similar to disabled but semantically different.')}
        <PreviewBox>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-tier-7)', maxWidth: '400px' }}>
            <Radio name="readonly-ex" label="Selected plan" supportingText="Your current plan is locked." size="md" checked state="readonly" onChange={() => {}} />
            <Radio name="readonly-ex" label="Other plan" supportingText="Cannot switch during billing period." size="md" state="readonly" />
          </div>
        </PreviewBox>
      </section>

      {/* Props */}
      <section>
        {sectionTitle('Props')}
        <PropsTable rows={[
          { name: 'label', type: 'string', description: 'Label text rendered next to the radio control.' },
          { name: 'supportingText', type: 'string', description: 'Secondary text rendered below the label.' },
          { name: 'size', type: "'sm' | 'md'", default: "'sm'", description: 'Controls circle size (16/20px) and font size (14/16px).' },
          { name: 'state', type: "'default' | 'disabled' | 'readonly'", default: "'default'", description: 'Visual and interaction state.' },
          { name: 'checked', type: 'boolean', default: 'false', description: 'Controlled checked state.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Native disabled — equivalent to state="disabled".' },
          { name: 'readOnly', type: 'boolean', default: 'false', description: 'Native readOnly — equivalent to state="readonly".' },
          { name: 'name', type: 'string', description: 'Groups radio buttons. All radios in a group share the same name.' },
          { name: 'value', type: 'string', description: 'Value submitted with the form.' },
          { name: 'onChange', type: '(e) => void', description: 'Change handler for controlled usage.' },
        ]} />
      </section>
    </div>
  );
}
