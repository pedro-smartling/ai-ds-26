'use client';

import React, { useState } from 'react';
import BaseRadio, { BaseRadioState, BaseRadioSize } from '@/components/BaseRadio';
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

const STATES: { label: string; value: BaseRadioState }[] = [
  { label: 'Default', value: 'default' },
  { label: 'Hover', value: 'hover' },
  { label: 'Focused', value: 'focused' },
  { label: 'Disabled', value: 'disabled' },
  { label: 'Read-only', value: 'readonly' },
];

const SIZES: { label: string; value: BaseRadioSize }[] = [
  { label: 'sm — 16px', value: 'sm' },
  { label: 'md — 20px', value: 'md' },
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

export default function BaseRadioPage() {
  const [interactiveChecked, setInteractiveChecked] = useState(false);

  return (
    <div>
      <PageHeader
        title="Base Radio"
        description="The base radio is the raw circular control element. It handles all visual states and both checked/unchecked appearances across two sizes."
      />

      {/* Interactive */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Interactive')}
        {sectionDesc('Click the radio to toggle between checked and unchecked.')}
        <PreviewBox>
          <div style={{ display: 'flex', gap: 'var(--dimension-tier-9)', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--dimension-tier-5)' }}>
              <BaseRadio size="sm" checked={interactiveChecked} onChange={setInteractiveChecked} aria-label="sm radio" />
              <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-moderate)' }}>sm</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--dimension-tier-5)' }}>
              <BaseRadio size="md" checked={interactiveChecked} onChange={setInteractiveChecked} aria-label="md radio" />
              <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-moderate)' }}>md</span>
            </div>
          </div>
        </PreviewBox>
      </section>

      {/* States matrix */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('States')}
        {sectionDesc('All visual states across both sizes. Each cell shows unchecked (left) and checked (right).')}
        <PreviewBox>
          <div style={{ overflowX: 'auto', width: '100%' }}>
            <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 480 }}>
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
                  [false, true].map((checked) => (
                    <tr key={`${size.value}-${checked}`}>
                      <td style={{ ...rowLabel, paddingRight: 'var(--dimension-tier-7)', paddingBottom: 'var(--dimension-tier-7)' }}>
                        {size.label}
                        <span style={{
                          display: 'block',
                          fontSize: 'var(--font-size-xs)',
                          color: 'var(--color-text-soft)',
                          fontWeight: 'var(--font-weight-body-strong)',
                        }}>
                          {checked ? 'Checked' : 'Unchecked'}
                        </span>
                      </td>
                      {STATES.map((s) => (
                        <td key={s.value} style={{ textAlign: 'center', paddingBottom: 'var(--dimension-tier-7)', paddingLeft: 'var(--dimension-tier-5)', paddingRight: 'var(--dimension-tier-5)' }}>
                          <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <BaseRadio
                              size={size.value}
                              checked={checked}
                              forceState={s.value}
                              aria-label={`${size.value} ${checked ? 'checked' : 'unchecked'} ${s.label}`}
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
                <BaseRadio size={size.value} checked forceState="default" aria-label={size.label} />
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
          { name: 'checked', type: 'boolean', default: 'false', description: 'Whether the radio is in the checked (selected) state.' },
          { name: 'size', type: "'sm' | 'md'", default: "'md'", description: 'Visual size. sm is 16px; md is 20px.' },
          { name: 'forceState', type: "'default' | 'hover' | 'focused' | 'disabled' | 'readonly'", description: 'Override the visual state. Used in demos and stories. Omit for interactive use.' },
          { name: 'onChange', type: '(checked: boolean) => void', description: 'Called when the user clicks the radio.' },
          { name: 'name', type: 'string', description: 'Native radio group name.' },
          { name: 'value', type: 'string', description: 'Native radio value.' },
        ]} />
      </section>
    </div>
  );
}
