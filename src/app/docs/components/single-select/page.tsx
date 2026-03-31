'use client';

import React, { useState } from 'react';
import SingleSelect from '@/components/SingleSelect';
import PageHeader from '@/components/docs/PageHeader';
import PreviewBox from '@/components/docs/PreviewBox';
import PropsTable from '@/components/docs/PropsTable';
import { User } from 'lucide-react';
import { SubmenuItem } from '@/components/BaseSubmenu';

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

const PEOPLE: SubmenuItem[] = [
  { id: 'phoenix', label: 'Phoenix Baker', icon: <User width={16} height={16} /> },
  { id: 'olivia', label: 'Olivia Rhye', icon: <User width={16} height={16} /> },
  { id: 'lana', label: 'Lana Steiner', icon: <User width={16} height={16} /> },
  { id: 'demi', label: 'Demi Wilkinson', icon: <User width={16} height={16} /> },
  { id: 'candice', label: 'Candice Wu', icon: <User width={16} height={16} /> },
  { id: 'natali', label: 'Natali Craig', icon: <User width={16} height={16} /> },
  { id: 'drew', label: 'Drew Cano', icon: <User width={16} height={16} /> },
];

const ROLES: SubmenuItem[] = [
  { id: 'admin', label: 'Admin' },
  { id: 'editor', label: 'Editor' },
  { id: 'viewer', label: 'Viewer' },
  { id: 'contributor', label: 'Contributor' },
  { id: 'owner', label: 'Owner' },
];

function DefaultDemo() {
  const [selected, setSelected] = useState<string | undefined>(undefined);
  return (
    <SingleSelect
      label="Label Text"
      hintText="This is a hint text to help user."
      placeholder="Select team member"
      items={PEOPLE}
      selected={selected}
      onSelect={setSelected}
    />
  );
}

function FilledDemo() {
  const [selected, setSelected] = useState<string | undefined>('olivia');
  return (
    <SingleSelect
      label="Label Text"
      hintText="This is a hint text to help user."
      placeholder="Select team member"
      items={PEOPLE}
      selected={selected}
      onSelect={setSelected}
    />
  );
}

function IconLeadingDemo() {
  const [selected, setSelected] = useState<string | undefined>(undefined);
  return (
    <SingleSelect
      label="Label Text"
      hintText="This is a hint text to help user."
      placeholder="Select team member"
      items={PEOPLE}
      selected={selected}
      onSelect={setSelected}
      leadingIcon={<User width={16} height={16} />}
    />
  );
}

function IconLeadingFilledDemo() {
  const [selected, setSelected] = useState<string | undefined>('olivia');
  return (
    <SingleSelect
      label="Label Text"
      hintText="This is a hint text to help user."
      placeholder="Select team member"
      items={PEOPLE}
      selected={selected}
      onSelect={setSelected}
      leadingIcon={<User width={16} height={16} />}
    />
  );
}

function NoLabelDemo() {
  const [selected, setSelected] = useState<string | undefined>(undefined);
  return (
    <SingleSelect
      placeholder="Choose a role"
      items={ROLES}
      selected={selected}
      onSelect={setSelected}
    />
  );
}

function DisabledDemo() {
  return (
    <SingleSelect
      label="Label Text"
      hintText="This field is disabled."
      placeholder="Select team member"
      items={PEOPLE}
      selected="olivia"
      disabled
    />
  );
}

export default function SingleSelectPage() {
  return (
    <div>
      <PageHeader
        title="Single Select"
        description="A dropdown select for choosing one option from a list. Supports label, hint text, leading icon, and placeholder. Uses the Base Submenu default variant for the dropdown panel."
      />

      {/* Default — Placeholder */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Default')}
        {sectionDesc('Click to open the dropdown and select an item. The selected item shows a checkmark in the list.')}
        <PreviewBox>
          <div style={{ display: 'flex', gap: 'var(--dimension-tier-11)', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div style={{ width: 320 }}>
              <DefaultDemo />
            </div>
            <div style={{ width: 320 }}>
              <FilledDemo />
            </div>
          </div>
        </PreviewBox>
      </section>

      {/* Icon leading */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('With leading icon')}
        {sectionDesc('Pass a leadingIcon to display an icon before the selected text inside the input.')}
        <PreviewBox>
          <div style={{ display: 'flex', gap: 'var(--dimension-tier-11)', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div style={{ width: 320 }}>
              <IconLeadingDemo />
            </div>
            <div style={{ width: 320 }}>
              <IconLeadingFilledDemo />
            </div>
          </div>
        </PreviewBox>
      </section>

      {/* Without label */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Without label')}
        {sectionDesc('Omit the label and hint text for compact inline usage.')}
        <PreviewBox>
          <div style={{ width: 320 }}>
            <NoLabelDemo />
          </div>
        </PreviewBox>
      </section>

      {/* Disabled */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Disabled')}
        {sectionDesc('Disabled state prevents interaction. The input and label dim to disabled colors.')}
        <PreviewBox>
          <div style={{ width: 320 }}>
            <DisabledDemo />
          </div>
        </PreviewBox>
      </section>

      {/* Props */}
      <section>
        {sectionTitle('Props')}
        <PropsTable rows={[
          { name: 'label', type: 'string', description: 'Label text above the input.' },
          { name: 'hintText', type: 'string', description: 'Hint text between label and input.' },
          { name: 'placeholder', type: 'string', default: '"Select..."', description: 'Placeholder text when no item is selected.' },
          { name: 'items', type: 'SubmenuItem[]', required: true, description: 'Array of selectable items with id and label.' },
          { name: 'selected', type: 'string', description: 'ID of the currently selected item.' },
          { name: 'onSelect', type: '(id: string) => void', description: 'Called when an item is selected.' },
          { name: 'leadingIcon', type: 'ReactNode', description: 'Icon shown before the text inside the input.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the component.' },
          { name: 'width', type: 'number | string', description: 'Override the container width.' },
        ]} />
      </section>
    </div>
  );
}
