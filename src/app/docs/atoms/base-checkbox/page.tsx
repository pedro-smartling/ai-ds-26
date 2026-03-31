'use client';

import React, { useState } from 'react';
import BaseCheckbox, { BaseCheckboxState, BaseCheckboxSize, BaseCheckboxChecked } from '@/components/BaseCheckbox';
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

const STATES: { label: string; value: BaseCheckboxState }[] = [
  { label: 'Default', value: 'default' },
  { label: 'Hover', value: 'hover' },
  { label: 'Focused', value: 'focused' },
  { label: 'Read-only', value: 'readonly' },
  { label: 'Disabled', value: 'disabled' },
];

const SIZES: { label: string; value: BaseCheckboxSize }[] = [
  { label: 'sm — 16px', value: 'sm' },
  { label: 'md — 20px', value: 'md' },
];

const CHECKED_STATES: { label: string; value: BaseCheckboxChecked }[] = [
  { label: 'Unchecked', value: false },
  { label: 'Checked', value: true },
  { label: 'Indeterminate', value: 'indeterminate' },
];

const colLabel: React.CSSProperties = {
  fontSize: 'var(--font-size-xs)',
  fontWeight: 'var(--font-weight-body-strongest)',
  color: 'var(--color-text-moderate)',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  textAlign: 'center',
};

const rowLabel: React.CSSProperties = {
  fontSize: 'var(--font-size-xs)',
  color: 'var(--color-text-moderate)',
  whiteSpace: 'nowrap',
  minWidth: 80,
};

export default function BaseCheckboxPage() {
  const [interactiveChecked, setInteractiveChecked] = useState(false);

  return (
    <div>
      <PageHeader
        title="Base Checkbox"
        description="The base checkbox is the raw square control element. It supports unchecked, checked, and indeterminate states across two sizes and all interactive visual states."
      />

      {/* Interactive */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Interactive')}
        {sectionDesc('Click the checkboxes to toggle between checked and unchecked.')}
        <PreviewBox>
          <div style={{ display: 'flex', gap: 'var(--dimension-tier-9)', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--dimension-tier-5)' }}>
              <BaseCheckbox size="sm" checked={interactiveChecked} onChange={setInteractiveChecked} aria-label="sm checkbox" />
              <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-moderate)' }}>sm</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--dimension-tier-5)' }}>
              <BaseCheckbox size="md" checked={interactiveChecked} onChange={setInteractiveChecked} aria-label="md checkbox" />
              <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-moderate)' }}>md</span>
            </div>
          </div>
        </PreviewBox>
      </section>

      {/* States matrix */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('States')}
        {sectionDesc('All visual states across both sizes. Each row shows unchecked, checked, and indeterminate variants.')}
        <PreviewBox>
          <div style={{ overflowX: 'auto', width: '100%' }}>
            <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 540 }}>
              <thead>
                <tr>
                  <th style={{ ...colLabel, textAlign: 'left', paddingBottom: 'var(--dimension-tier-6)', paddingRight: 'var(--dimension-tier-7)' }}></th>
                  {STATES.map((s) => (
                    <th key={s.value} style={{ ...colLabel, paddingBottom: 'var(--dimension-tier-6)', paddingLeft: 'var(--dimension-tier-5)', paddingRight: 'var(--dimension-tier-5)' }}>
                      {s.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SIZES.map((size) =>
                  CHECKED_STATES.map((cs) => (
                    <tr key={`${size.value}-${cs.value}`}>
                      <td style={{ ...rowLabel, paddingRight: 'var(--dimension-tier-7)', paddingBottom: 'var(--dimension-tier-7)' }}>
                        {size.label}
                        <span style={{
                          display: 'block',
                          fontSize: 'var(--font-size-xs)',
                          color: 'var(--color-text-soft)',
                          fontWeight: 'var(--font-weight-body-strong)',
                        }}>
                          {cs.label}
                        </span>
                      </td>
                      {STATES.map((s) => (
                        <td key={s.value} style={{ textAlign: 'center', paddingBottom: 'var(--dimension-tier-7)', paddingLeft: 'var(--dimension-tier-5)', paddingRight: 'var(--dimension-tier-5)' }}>
                          <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <BaseCheckbox
                              size={size.value}
                              checked={cs.value}
                              forceState={s.value}
                              aria-label={`${size.value} ${cs.label} ${s.label}`}
                            />
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </PreviewBox>
      </section>

      {/* Sizes */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Sizes')}
        {sectionDesc('Two sizes: sm (16px) for compact layouts such as table rows; md (20px) for standard form contexts.')}
        <PreviewBox>
          <div style={{ display: 'flex', gap: 'var(--dimension-tier-11)', alignItems: 'flex-end' }}>
            {SIZES.map((size) => (
              <div key={size.value} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--dimension-tier-5)' }}>
                <BaseCheckbox size={size.value} checked forceState="default" aria-label={size.label} />
                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-moderate)' }}>{size.label}</span>
              </div>
            ))}
          </div>
        </PreviewBox>
      </section>

      {/* Props */}
      <section>
        {sectionTitle('Props')}
        <PropsTable rows={[
          { name: 'checked', type: "boolean | 'indeterminate'", default: 'false', description: 'Checked state. Use true for checked, false for unchecked, or "indeterminate" for the partial state.' },
          { name: 'size', type: "'sm' | 'md'", default: "'md'", description: 'Visual size. sm is 16px; md is 20px.' },
          { name: 'forceState', type: "'default' | 'hover' | 'focused' | 'disabled' | 'readonly'", description: 'Override the visual state. Used in demos and stories. Omit for interactive use.' },
          { name: 'onChange', type: '(checked: boolean) => void', description: 'Called when the user clicks the checkbox. Returns the new boolean checked value.' },
          { name: 'name', type: 'string', description: 'Native checkbox name attribute.' },
          { name: 'value', type: 'string', description: 'Native checkbox value attribute.' },
        ]} />
      </section>
    </div>
  );
}
