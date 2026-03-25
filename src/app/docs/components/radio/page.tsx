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

function RadioGroup() {
  const [value, setValue] = useState('monthly');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-tier-5)' }}>
      {[
        { id: 'monthly', label: 'Monthly billing' },
        { id: 'annual', label: 'Annual billing' },
        { id: 'enterprise', label: 'Enterprise billing' },
      ].map((opt) => (
        <Radio
          key={opt.id}
          name="billing"
          value={opt.id}
          label={opt.label}
          checked={value === opt.id}
          onChange={() => setValue(opt.id)}
        />
      ))}
    </div>
  );
}

function RadioGroupWithDesc() {
  const [value, setValue] = useState('startup');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-tier-7)' }}>
      {[
        { id: 'startup', label: 'Startup', description: 'Up to 5 users, 10 projects included.' },
        { id: 'growth', label: 'Growth', description: 'Up to 25 users, unlimited projects.' },
        { id: 'enterprise', label: 'Enterprise', description: 'Unlimited users, SSO, SLA support.' },
      ].map((opt) => (
        <Radio
          key={opt.id}
          name="plan"
          value={opt.id}
          label={opt.label}
          description={opt.description}
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
        description="Radio buttons allow users to select a single option from a list. Use within a controlled group with shared name."
      />

      {/* Basic group */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Radio group')}
        {sectionDesc('Wrap multiple Radio components with a shared name attribute. Manage state externally.')}
        <PreviewBox>
          <RadioGroup />
        </PreviewBox>
      </section>

      {/* With description */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('With description')}
        {sectionDesc('Add a description to provide supplemental context for each option.')}
        <PreviewBox>
          <RadioGroupWithDesc />
        </PreviewBox>
      </section>

      {/* Disabled */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Disabled state')}
        {sectionDesc('Disabled radios are non-interactive and visually dimmed.')}
        <PreviewBox>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-tier-5)' }}>
            <Radio name="disabled-ex" label="Available option" defaultChecked />
            <Radio name="disabled-ex" label="Disabled option" disabled />
            <Radio name="disabled-ex" label="Disabled checked" checked disabled onChange={() => {}} />
          </div>
        </PreviewBox>
      </section>

      {/* Props */}
      <section>
        {sectionTitle('Props')}
        <PropsTable rows={[
          { name: 'label', type: 'string', description: 'Label text rendered next to the radio control.' },
          { name: 'description', type: 'string', description: 'Supplemental description rendered below the label.' },
          { name: 'checked', type: 'boolean', description: 'Controlled checked state.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the radio and dims the label.' },
          { name: 'name', type: 'string', description: 'Groups radio buttons. All radios in a group share the same name.' },
          { name: 'value', type: 'string', description: 'Value submitted with the form.' },
          { name: 'onChange', type: '(e: React.ChangeEvent<HTMLInputElement>) => void', description: 'Change handler for controlled usage.' },
          { name: '...props', type: 'React.InputHTMLAttributes<HTMLInputElement>', description: 'All native input attributes are forwarded.' },
        ]} />
      </section>
    </div>
  );
}
