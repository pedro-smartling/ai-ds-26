'use client';

import React from 'react';
import Dropdown from '@/components/Dropdown';
import Button from '@/components/Button';
import PageHeader from '@/components/docs/PageHeader';
import PreviewBox from '@/components/docs/PreviewBox';
import PropsTable from '@/components/docs/PropsTable';
import { ChevronDown, Pencil, Copy, Download, Trash2, Share } from 'lucide-react';

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

const basicItems = [
  { id: 'edit', label: 'Edit' },
  { id: 'duplicate', label: 'Duplicate' },
  { id: 'share', label: 'Share' },
  { id: 'delete', label: 'Delete' },
];

const itemsWithIcons = [
  { id: 'edit', label: 'Edit', icon: <Pencil width={16} height={16} /> },
  { id: 'copy', label: 'Copy', icon: <Copy width={16} height={16} /> },
  { id: 'download', label: 'Download', icon: <Download width={16} height={16} />, dividerAfter: true },
  { id: 'delete', label: 'Delete', icon: <Trash2 width={16} height={16} /> },
];

const itemsWithDividers = [
  { id: 'edit', label: 'Edit', icon: <Pencil width={16} height={16} /> },
  { id: 'duplicate', label: 'Duplicate', icon: <Copy width={16} height={16} /> },
  { id: 'share', label: 'Share', icon: <Share width={16} height={16} />, dividerAfter: true },
  { id: 'download', label: 'Download', icon: <Download width={16} height={16} />, dividerAfter: true },
  { id: 'delete', label: 'Delete', icon: <Trash2 width={16} height={16} /> },
];

const itemsWithDisabled = [
  { id: 'edit', label: 'Edit', icon: <Pencil width={16} height={16} /> },
  { id: 'copy', label: 'Copy link', icon: <Copy width={16} height={16} />, disabled: true },
  { id: 'delete', label: 'Delete', icon: <Trash2 width={16} height={16} /> },
];

export default function DropdownPage() {
  return (
    <div>
      <PageHeader
        title="Dropdown"
        description="A floating menu triggered by any element. Supports icons, dividers, disabled items, and left/right alignment."
      />

      {/* Basic */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Basic')}
        {sectionDesc('Pass any element as trigger. The menu opens on click and closes on outside click or item selection.')}
        <PreviewBox style={{ minHeight: '220px', alignItems: 'flex-start', paddingTop: 'var(--dimension-tier-9)' }}>
          <Dropdown
            trigger={
              <Button variant="secondary" icon={<ChevronDown width={16} height={16} />}>
                Options
              </Button>
            }
            items={basicItems}
          />
        </PreviewBox>
      </section>

      {/* With icons */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('With icons')}
        {sectionDesc('Each item can include an icon rendered to the left of the label.')}
        <PreviewBox style={{ minHeight: '220px', alignItems: 'flex-start', paddingTop: 'var(--dimension-tier-9)' }}>
          <Dropdown
            trigger={<Button variant="secondary">Actions</Button>}
            items={itemsWithIcons}
          />
        </PreviewBox>
      </section>

      {/* With dividers */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('With dividers')}
        {sectionDesc('Set dividerAfter: true on any item to insert a separator line after it.')}
        <PreviewBox style={{ minHeight: '280px', alignItems: 'flex-start', paddingTop: 'var(--dimension-tier-9)' }}>
          <Dropdown
            trigger={<Button variant="secondary">Actions</Button>}
            items={itemsWithDividers}
          />
        </PreviewBox>
      </section>

      {/* Disabled items */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Disabled items')}
        {sectionDesc('Individual items can be disabled. They render dimmed and do not fire onSelect.')}
        <PreviewBox style={{ minHeight: '180px', alignItems: 'flex-start', paddingTop: 'var(--dimension-tier-9)' }}>
          <Dropdown
            trigger={<Button variant="secondary">Actions</Button>}
            items={itemsWithDisabled}
          />
        </PreviewBox>
      </section>

      {/* Right-aligned */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Right-aligned')}
        {sectionDesc('Set align="right" to anchor the menu to the right edge of the trigger.')}
        <PreviewBox style={{ minHeight: '180px', alignItems: 'flex-end', paddingTop: 'var(--dimension-tier-9)' }}>
          <Dropdown
            trigger={<Button variant="secondary">Right menu</Button>}
            items={basicItems}
            align="right"
          />
        </PreviewBox>
      </section>

      {/* Props */}
      <section>
        {sectionTitle('Props')}
        <PropsTable rows={[
          { name: 'trigger', type: 'React.ReactNode', required: true, description: 'Element that toggles the dropdown on click.' },
          { name: 'items', type: 'DropdownItem[]', required: true, description: 'Array of menu items.' },
          { name: 'onSelect', type: '(item: DropdownItem) => void', description: 'Called when a non-disabled item is selected.' },
          { name: 'align', type: "'left' | 'right'", default: "'left'", description: 'Horizontal alignment of the menu relative to the trigger.' },
          { name: 'width', type: 'number | string', default: '200', description: 'Width of the dropdown menu.' },
        ]} />

        <h3 style={{ fontSize: 'var(--font-size-m)', fontWeight: 'var(--font-weight-body-strongest)', color: 'var(--color-text-main)', margin: 'var(--dimension-tier-9) 0 var(--dimension-tier-6)' }}>
          DropdownItem object
        </h3>
        <PropsTable rows={[
          { name: 'id', type: 'string', required: true, description: 'Unique identifier.' },
          { name: 'label', type: 'string', required: true, description: 'Display text for the menu item.' },
          { name: 'icon', type: 'React.ReactNode', description: 'Optional icon rendered before the label.' },
          { name: 'disabled', type: 'boolean', description: 'Prevents selection and dims the item.' },
          { name: 'dividerAfter', type: 'boolean', description: 'Renders a horizontal rule after this item.' },
        ]} />
      </section>
    </div>
  );
}
