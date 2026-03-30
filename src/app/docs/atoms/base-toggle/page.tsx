'use client';

import React, { useState } from 'react';
import BaseToggle, { BaseToggleState, BaseToggleSize } from '@/components/BaseToggle';
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

const STATES: { label: string; value: BaseToggleState }[] = [
  { label: 'Default', value: 'default' },
  { label: 'Hover', value: 'hover' },
  { label: 'Focused', value: 'focused' },
  { label: 'Disabled', value: 'disabled' },
  { label: 'Read-only', value: 'readonly' },
];

const SIZES: { label: string; value: BaseToggleSize }[] = [
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

export default function BaseTogglePage() {
  const [interactiveChecked, setInteractiveChecked] = useState(false);

  return (
    <div>
      <PageHeader
        title="Base Toggle"
        description="The base toggle is the raw switch control element. It supports checked/unchecked states, two sizes, and all interactive visual states including focus with an amber ring."
      />

      {/* Interactive */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Interactive')}
        {sectionDesc('Click the toggles to switch between on and off.')}
        <PreviewBox>
          <div style={{ display: 'flex', gap: 'var(--dimension-tier-9)', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--dimension-tier-5)' }}>
              <BaseToggle size="sm" checked={interactiveChecked} onChange={setInteractiveChecked} aria-label="sm toggle" />
              <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-moderate)' }}>sm</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--dimension-tier-5)' }}>
              <BaseToggle size="md" checked={interactiveChecked} onChange={setInteractiveChecked} aria-label="md toggle" />
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
            <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 520 }}>
              <thead>
                <tr>
                  <th style={{ ...colLabel, textAlign: 'left', paddingBottom: 'var(--dimension-tier-6)', paddingRight: 'var(--dimension-tier-7)' }} />
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
                          {checked ? 'On' : 'Off'}
                        </span>
                      </td>
                      {STATES.map((s) => (
                        <td key={s.value} style={{ textAlign: 'center', paddingBottom: 'var(--dimension-tier-7)', paddingLeft: 'var(--dimension-tier-5)', paddingRight: 'var(--dimension-tier-5)' }}>
                          <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <BaseToggle
                              size={size.value}
                              checked={checked}
                              forceState={s.value}
                              aria-label={`${size.value} ${checked ? 'on' : 'off'} ${s.label}`}
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
        {sectionDesc('Two sizes: sm (16px track height) for compact layouts and md (20px track height) for standard forms.')}
        <PreviewBox>
          <div style={{ display: 'flex', gap: 'var(--dimension-tier-11)', alignItems: 'flex-end' }}>
            {SIZES.map((size) => (
              <div key={size.value} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--dimension-tier-5)' }}>
                <BaseToggle size={size.value} checked forceState="default" aria-label={size.label} />
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
          { name: 'checked', type: 'boolean', default: 'false', description: 'Whether the toggle is in the on state.' },
          { name: 'size', type: "'sm' | 'md'", default: "'md'", description: 'Track height: sm is 16px; md is 20px.' },
          { name: 'forceState', type: "'default' | 'hover' | 'focused' | 'disabled' | 'readonly'", description: 'Override visual state for demos. Omit for interactive use.' },
          { name: 'onChange', type: '(checked: boolean) => void', description: 'Called when the user toggles the switch.' },
        ]} />
      </section>
    </div>
  );
}
