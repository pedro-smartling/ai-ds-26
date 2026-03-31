'use client';

import React, { useState } from 'react';
import Checkbox from '@/components/Checkbox';
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

function CheckboxGroupSm() {
  const [values, setValues] = useState<Record<string, boolean>>({ notifications: true });
  const toggle = (key: string) => setValues((prev) => ({ ...prev, [key]: !prev[key] }));
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-tier-6)' }}>
      {[
        { id: 'notifications', label: 'Email notifications' },
        { id: 'updates', label: 'Product updates' },
        { id: 'marketing', label: 'Marketing emails' },
      ].map((opt) => (
        <Checkbox
          key={opt.id}
          name="prefs-sm"
          value={opt.id}
          label={opt.label}
          size="sm"
          checked={!!values[opt.id]}
          onChange={() => toggle(opt.id)}
        />
      ))}
    </div>
  );
}

function CheckboxGroupMd() {
  const [values, setValues] = useState<Record<string, boolean>>({ notifications: true });
  const toggle = (key: string) => setValues((prev) => ({ ...prev, [key]: !prev[key] }));
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-tier-7)' }}>
      {[
        { id: 'notifications', label: 'Email notifications' },
        { id: 'updates', label: 'Product updates' },
        { id: 'marketing', label: 'Marketing emails' },
      ].map((opt) => (
        <Checkbox
          key={opt.id}
          name="prefs-md"
          value={opt.id}
          label={opt.label}
          size="md"
          checked={!!values[opt.id]}
          onChange={() => toggle(opt.id)}
        />
      ))}
    </div>
  );
}

function CheckboxGroupWithSupporting() {
  const [values, setValues] = useState<Record<string, boolean>>({ analytics: true });
  const toggle = (key: string) => setValues((prev) => ({ ...prev, [key]: !prev[key] }));
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-tier-9)' }}>
      {[
        { id: 'analytics', label: 'Usage analytics', supportingText: 'Help us improve by sharing anonymous usage data.' },
        { id: 'cookies', label: 'Cookies', supportingText: 'Allow third-party cookies for personalized content.' },
        { id: 'telemetry', label: 'Crash reports', supportingText: 'Automatically send diagnostic data when errors occur.' },
      ].map((opt) => (
        <Checkbox
          key={opt.id}
          name="privacy"
          value={opt.id}
          label={opt.label}
          supportingText={opt.supportingText}
          size="md"
          checked={!!values[opt.id]}
          onChange={() => toggle(opt.id)}
        />
      ))}
    </div>
  );
}

function IndeterminateExample() {
  const [items, setItems] = useState({ design: true, engineering: true, marketing: false });
  const allChecked = Object.values(items).every(Boolean);
  const noneChecked = Object.values(items).every((v) => !v);
  const parentChecked = allChecked ? true : noneChecked ? false : 'indeterminate' as const;

  const toggleAll = () => {
    const next = !allChecked;
    setItems({ design: next, engineering: next, marketing: next });
  };
  const toggleItem = (key: keyof typeof items) =>
    setItems((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-tier-6)' }}>
      <Checkbox
        label="Select all teams"
        size="md"
        checked={parentChecked}
        onChange={toggleAll}
      />
      <div style={{ paddingLeft: 'var(--dimension-tier-9)', display: 'flex', flexDirection: 'column', gap: 'var(--dimension-tier-6)' }}>
        <Checkbox label="Design" size="md" checked={items.design} onChange={() => toggleItem('design')} />
        <Checkbox label="Engineering" size="md" checked={items.engineering} onChange={() => toggleItem('engineering')} />
        <Checkbox label="Marketing" size="md" checked={items.marketing} onChange={() => toggleItem('marketing')} />
      </div>
    </div>
  );
}

export default function CheckboxPage() {
  return (
    <div>
      <PageHeader
        title="Checkbox"
        description="Checkboxes allow users to select one or more options from a list. They come in two sizes with optional label and supporting text, and use the Base Checkbox atom for the square control."
      />

      {/* Sizes */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Sizes')}
        {sectionDesc('Two sizes: sm (16px control, 14px text) for compact layouts and md (20px control, 16px text) for standard forms.')}
        <PreviewBox>
          <div style={{ display: 'flex', gap: 'var(--dimension-tier-13)', alignItems: 'flex-start' }}>
            <div>
              <p style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-body-strongest)', color: 'var(--color-text-moderate)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 'var(--dimension-tier-6)' }}>sm</p>
              <CheckboxGroupSm />
            </div>
            <div>
              <p style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-body-strongest)', color: 'var(--color-text-moderate)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 'var(--dimension-tier-6)' }}>md</p>
              <CheckboxGroupMd />
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
            <CheckboxGroupWithSupporting />
          </div>
        </PreviewBox>
      </section>

      {/* Indeterminate */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Indeterminate')}
        {sectionDesc('A parent checkbox shows the indeterminate state when only some children are selected. Clicking it toggles all children on or off.')}
        <PreviewBox>
          <div style={{ maxWidth: '400px' }}>
            <IndeterminateExample />
          </div>
        </PreviewBox>
      </section>

      {/* Disabled */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Disabled')}
        {sectionDesc('Disabled checkboxes are non-interactive. Both label and supporting text dim to the disabled color.')}
        <PreviewBox>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-tier-7)', maxWidth: '400px' }}>
            <Checkbox label="Available option" supportingText="This option can be selected." size="md" checked onChange={() => {}} />
            <Checkbox label="Disabled unchecked" supportingText="This option is not available." size="md" state="disabled" />
            <Checkbox label="Disabled checked" supportingText="This was pre-selected and cannot change." size="md" checked state="disabled" onChange={() => {}} />
            <Checkbox label="Disabled indeterminate" supportingText="Partial selection, locked." size="md" checked="indeterminate" state="disabled" />
          </div>
        </PreviewBox>
      </section>

      {/* Read-only */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Read-only')}
        {sectionDesc('Read-only checkboxes display the current selection but prevent changes. Visually similar to disabled but semantically different.')}
        <PreviewBox>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-tier-7)', maxWidth: '400px' }}>
            <Checkbox label="Accepted terms" supportingText="You agreed to the terms of service." size="md" checked state="readonly" onChange={() => {}} />
            <Checkbox label="Optional add-on" supportingText="Not included in your current plan." size="md" state="readonly" />
          </div>
        </PreviewBox>
      </section>

      {/* Props */}
      <section>
        {sectionTitle('Props')}
        <PropsTable rows={[
          { name: 'label', type: 'string', description: 'Label text rendered next to the checkbox control.' },
          { name: 'supportingText', type: 'string', description: 'Secondary text rendered below the label.' },
          { name: 'size', type: "'sm' | 'md'", default: "'sm'", description: 'Controls checkbox size (16/20px) and font size (14/16px).' },
          { name: 'state', type: "'default' | 'disabled' | 'readonly'", default: "'default'", description: 'Visual and interaction state.' },
          { name: 'checked', type: "boolean | 'indeterminate'", default: 'false', description: 'Checked state. Use true, false, or "indeterminate" for partial selection.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Native disabled — equivalent to state="disabled".' },
          { name: 'readOnly', type: 'boolean', default: 'false', description: 'Native readOnly — equivalent to state="readonly".' },
          { name: 'name', type: 'string', description: 'Native checkbox name attribute.' },
          { name: 'value', type: 'string', description: 'Value submitted with the form.' },
          { name: 'onChange', type: '(checked: boolean) => void', description: 'Called when the user toggles the checkbox.' },
        ]} />
      </section>
    </div>
  );
}
