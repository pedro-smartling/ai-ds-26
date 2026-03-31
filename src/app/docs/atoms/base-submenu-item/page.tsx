'use client';

import React, { useState } from 'react';
import BaseSubmenuItem, { SubmenuItemVariant, SubmenuItemState } from '@/components/BaseSubmenuItem';
import PageHeader from '@/components/docs/PageHeader';
import PreviewBox from '@/components/docs/PreviewBox';
import PropsTable from '@/components/docs/PropsTable';
import { User, Mail, Settings, Bell } from 'lucide-react';

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

const STATES: { label: string; value: SubmenuItemState }[] = [
  { label: 'Default', value: 'default' },
  { label: 'Hover', value: 'hover' },
  { label: 'Focus', value: 'focus' },
  { label: 'Disabled', value: 'disabled' },
  { label: 'Skeleton', value: 'skeleton' },
];

const colLabel: React.CSSProperties = {
  fontSize: 'var(--font-size-xs)',
  fontWeight: 'var(--font-weight-body-strongest)',
  color: 'var(--color-text-moderate)',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  textAlign: 'left',
};

function InteractiveDemo() {
  const [selected, setSelected] = useState<string>('olivia');
  return (
    <div style={{ maxWidth: 320 }}>
      {[
        { id: 'olivia', label: 'Olivia Rhye' },
        { id: 'phoenix', label: 'Phoenix Baker' },
        { id: 'lana', label: 'Lana Steiner' },
      ].map((item) => (
        <BaseSubmenuItem
          key={item.id}
          variant="default"
          label={item.label}
          leadingIcon={<User width={16} height={16} />}
          selected={selected === item.id}
          onClick={() => setSelected(item.id)}
        />
      ))}
    </div>
  );
}

function CheckboxDemo() {
  const [values, setValues] = useState<Record<string, boolean>>({ olivia: true, phoenix: false, lana: false });
  const toggle = (key: string) => setValues((prev) => ({ ...prev, [key]: !prev[key] }));
  return (
    <div style={{ maxWidth: 320 }}>
      {[
        { id: 'olivia', label: 'Olivia Rhye' },
        { id: 'phoenix', label: 'Phoenix Baker' },
        { id: 'lana', label: 'Lana Steiner' },
      ].map((item) => (
        <BaseSubmenuItem
          key={item.id}
          variant="checkbox"
          label={item.label}
          selected={values[item.id]}
          onClick={() => toggle(item.id)}
        />
      ))}
    </div>
  );
}

function NestedDemo() {
  const [items, setItems] = useState({
    all: false,
    design: true,
    engineering: false,
    marketing: false,
    sub1: false,
    sub2: false,
  });

  const children1 = [items.design, items.engineering, items.marketing];
  const all1Checked = children1.every(Boolean);
  const none1Checked = children1.every((v) => !v);
  const parent1: boolean | 'indeterminate' = all1Checked ? true : none1Checked ? false : 'indeterminate';

  const toggleItem = (key: keyof typeof items) =>
    setItems((prev) => ({ ...prev, [key]: !prev[key] }));
  const toggleAll1 = () => {
    const next = !all1Checked;
    setItems((prev) => ({ ...prev, design: next, engineering: next, marketing: next }));
  };

  return (
    <div style={{ maxWidth: 320 }}>
      <BaseSubmenuItem variant="category-checkable-1" label="Teams" selected={parent1} onClick={toggleAll1} />
      <BaseSubmenuItem variant="checkbox-child-1" label="Design" selected={items.design} onClick={() => toggleItem('design')} />
      <BaseSubmenuItem variant="checkbox-child-1" label="Engineering" selected={items.engineering} onClick={() => toggleItem('engineering')} />
      <BaseSubmenuItem variant="checkbox-child-1" label="Marketing" selected={items.marketing} onClick={() => toggleItem('marketing')} />
      <BaseSubmenuItem variant="category" label="Other" />
      <BaseSubmenuItem variant="checkbox-child-1" label="Sub-item A" selected={items.sub1} onClick={() => toggleItem('sub1')} />
      <BaseSubmenuItem variant="checkbox-child-1" label="Sub-item B" selected={items.sub2} onClick={() => toggleItem('sub2')} />
    </div>
  );
}

export default function BaseSubmenuItemPage() {
  return (
    <div>
      <PageHeader
        title="Base Submenu Item"
        description="The base submenu item is the building block for dropdown and select menus. It supports plain text items, checkbox items with optional supporting text, category headers, and nested hierarchy levels."
      />

      {/* Interactive — Default variant */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Interactive — Default')}
        {sectionDesc('Click an item to select it. The selected item shows a checkmark on the right.')}
        <PreviewBox>
          <InteractiveDemo />
        </PreviewBox>
      </section>

      {/* Interactive — Checkbox variant */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Interactive — Checkbox')}
        {sectionDesc('Click items to toggle their checkbox. Multiple items can be selected.')}
        <PreviewBox>
          <CheckboxDemo />
        </PreviewBox>
      </section>

      {/* Nested hierarchy */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Nested hierarchy')}
        {sectionDesc('Category headers group child items. Checkable categories show indeterminate state when some children are selected.')}
        <PreviewBox>
          <NestedDemo />
        </PreviewBox>
      </section>

      {/* Variants */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Variants')}
        {sectionDesc('All item types in their default state.')}
        <PreviewBox>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-tier-7)' }}>
            {([
              { variant: 'default' as const, label: 'Default', desc: 'Plain text with optional icon' },
              { variant: 'checkbox' as const, label: 'Checkbox', desc: 'Checkbox item' },
              { variant: 'checkbox-tip' as const, label: 'Checkbox + Tip', desc: null },
              { variant: 'checkbox-child-1' as const, label: 'Checkbox — 1st child', desc: 'Indented checkbox' },
              { variant: 'checkbox-child-2' as const, label: 'Checkbox — 2nd child', desc: 'Deeper indent' },
              { variant: 'category' as const, label: 'Category', desc: 'Non-interactive header' },
              { variant: 'category-checkable-1' as const, label: 'Category checkable (1st)', desc: 'Checkable header' },
              { variant: 'category-checkable-2' as const, label: 'Category checkable (2nd)', desc: 'Indented checkable header' },
            ]).map((item) => (
              <div key={item.variant} style={{ maxWidth: 320 }}>
                <p style={{
                  fontSize: 'var(--font-size-xs)',
                  fontWeight: 'var(--font-weight-body-strongest)',
                  color: 'var(--color-text-moderate)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  marginBottom: 'var(--dimension-tier-3)',
                }}>{item.desc || item.label}</p>
                <BaseSubmenuItem
                  variant={item.variant}
                  label={item.label}
                  leadingIcon={item.variant === 'default' ? <User width={16} height={16} /> : undefined}
                  supportingText={item.variant === 'checkbox-tip' ? 'This is a checkbox supporting text.' : undefined}
                  selected={item.variant === 'category' ? false : true}
                  forceState="default"
                />
              </div>
            ))}
          </div>
        </PreviewBox>
      </section>

      {/* States — Default variant */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('States — Default variant')}
        {sectionDesc('All visual states for the default (text) variant, unselected and selected.')}
        <PreviewBox>
          <div style={{ overflowX: 'auto', width: '100%' }}>
            <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 600 }}>
              <thead>
                <tr>
                  <th style={{ ...colLabel, paddingBottom: 'var(--dimension-tier-6)', paddingRight: 'var(--dimension-tier-7)', width: 100 }} />
                  {STATES.map((s) => (
                    <th key={s.value} style={{ ...colLabel, paddingBottom: 'var(--dimension-tier-6)', paddingRight: 'var(--dimension-tier-5)' }}>
                      {s.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[false, true].map((sel) => (
                  <tr key={String(sel)}>
                    <td style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-moderate)', paddingBottom: 'var(--dimension-tier-5)', paddingRight: 'var(--dimension-tier-7)', whiteSpace: 'nowrap' }}>
                      {sel ? 'Selected' : 'Unselected'}
                    </td>
                    {STATES.map((s) => (
                      <td key={s.value} style={{ paddingBottom: 'var(--dimension-tier-5)', paddingRight: 'var(--dimension-tier-5)', verticalAlign: 'top' }}>
                        <div style={{ width: 220 }}>
                          <BaseSubmenuItem
                            variant="default"
                            label="Olivia Rhye"
                            leadingIcon={<User width={16} height={16} />}
                            selected={sel}
                            forceState={s.value}
                          />
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </PreviewBox>
      </section>

      {/* States — Checkbox variant */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('States — Checkbox variant')}
        {sectionDesc('All visual states for checkbox items across unchecked, checked, and indeterminate.')}
        <PreviewBox>
          <div style={{ overflowX: 'auto', width: '100%' }}>
            <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 600 }}>
              <thead>
                <tr>
                  <th style={{ ...colLabel, paddingBottom: 'var(--dimension-tier-6)', paddingRight: 'var(--dimension-tier-7)', width: 120 }} />
                  {STATES.filter((s) => s.value !== 'skeleton').map((s) => (
                    <th key={s.value} style={{ ...colLabel, paddingBottom: 'var(--dimension-tier-6)', paddingRight: 'var(--dimension-tier-5)' }}>
                      {s.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {([
                  { label: 'Unchecked', value: false as const },
                  { label: 'Checked', value: true as const },
                  { label: 'Indeterminate', value: 'indeterminate' as const },
                ]).map((sel) => (
                  <tr key={String(sel.value)}>
                    <td style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-moderate)', paddingBottom: 'var(--dimension-tier-5)', paddingRight: 'var(--dimension-tier-7)', whiteSpace: 'nowrap' }}>
                      {sel.label}
                    </td>
                    {STATES.filter((s) => s.value !== 'skeleton').map((s) => (
                      <td key={s.value} style={{ paddingBottom: 'var(--dimension-tier-5)', paddingRight: 'var(--dimension-tier-5)', verticalAlign: 'top' }}>
                        <div style={{ width: 220 }}>
                          <BaseSubmenuItem
                            variant="checkbox"
                            label="Olivia Rhye"
                            selected={sel.value}
                            forceState={s.value}
                          />
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </PreviewBox>
      </section>

      {/* Checkbox + Tip */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Checkbox + Supporting text')}
        {sectionDesc('Checkbox items with a secondary description below the label.')}
        <PreviewBox>
          <div style={{ display: 'flex', gap: 'var(--dimension-tier-9)', flexWrap: 'wrap' }}>
            <div style={{ width: 300 }}>
              <BaseSubmenuItem variant="checkbox-tip" label="Option A" supportingText="This is a checkbox supporting text." selected={false} forceState="default" />
            </div>
            <div style={{ width: 300 }}>
              <BaseSubmenuItem variant="checkbox-tip" label="Option B" supportingText="This option is currently selected." selected={true} forceState="default" />
            </div>
          </div>
        </PreviewBox>
      </section>

      {/* Props */}
      <section>
        {sectionTitle('Props')}
        <PropsTable rows={[
          { name: 'label', type: 'string', default: "'Menu item'", description: 'Text label displayed in the item.' },
          { name: 'supportingText', type: 'string', description: 'Secondary text shown below the label (checkbox-tip variant only).' },
          { name: 'variant', type: "'default' | 'checkbox' | 'checkbox-tip' | 'checkbox-child-1' | 'checkbox-child-2' | 'category' | 'category-checkable-1' | 'category-checkable-2'", default: "'default'", description: 'Item type controlling layout, indentation, and checkbox visibility.' },
          { name: 'forceState', type: "'default' | 'hover' | 'focus' | 'disabled' | 'skeleton'", description: 'Override visual state for demos. Omit for interactive use.' },
          { name: 'selected', type: "boolean | 'indeterminate'", default: 'false', description: 'Selection state. For default variant, true shows a checkmark. For checkbox variants, controls the checkbox.' },
          { name: 'leadingIcon', type: 'ReactNode', description: 'Icon shown before the label (default variant only).' },
          { name: 'onClick', type: '() => void', description: 'Called when the item is clicked.' },
        ]} />
      </section>
    </div>
  );
}
