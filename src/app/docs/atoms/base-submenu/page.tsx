'use client';

import React, { useState, useCallback } from 'react';
import BaseSubmenu, { SubmenuItem } from '@/components/BaseSubmenu';
import PageHeader from '@/components/docs/PageHeader';
import PreviewBox from '@/components/docs/PreviewBox';
import PropsTable from '@/components/docs/PropsTable';
import { User } from 'lucide-react';

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
];

const CHECKBOX_ITEMS: SubmenuItem[] = [
  { id: 'phoenix', label: 'Phoenix Baker' },
  { id: 'olivia', label: 'Olivia Rhye' },
  { id: 'lana', label: 'Lana Steiner' },
  { id: 'demi', label: 'Demi Wilkinson' },
  { id: 'candice', label: 'Candice Wu' },
  { id: 'natali', label: 'Natali Craig' },
];

const TIP_ITEMS: SubmenuItem[] = [
  { id: 'analytics', label: 'Usage analytics', supportingText: 'Help us improve by sharing anonymous usage data.' },
  { id: 'cookies', label: 'Cookies', supportingText: 'Allow third-party cookies for personalized content.' },
  { id: 'telemetry', label: 'Crash reports', supportingText: 'Automatically send diagnostic data when errors occur.' },
];

const TREE_ITEMS: SubmenuItem[] = [
  { id: 'design', label: 'Design', group: 'Teams' },
  { id: 'engineering', label: 'Engineering', group: 'Teams' },
  { id: 'marketing', label: 'Marketing', group: 'Teams' },
  { id: 'sales', label: 'Sales', group: 'Departments' },
  { id: 'support', label: 'Support', group: 'Departments' },
  { id: 'hr', label: 'Human Resources', group: 'Departments' },
];

function useCheckboxMenu(items: SubmenuItem[]) {
  const [selected, setSelected] = useState<Set<string>>(new Set(['olivia']));
  const onSelect = useCallback((id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, []);
  const onSelectAll = useCallback(() => {
    setSelected((prev) => prev.size === items.length ? new Set() : new Set(items.map((i) => i.id)));
  }, [items]);
  const onClearAll = useCallback(() => setSelected(new Set()), []);
  return { selected, onSelect, onSelectAll, onClearAll };
}

function DefaultDemo() {
  const [selected, setSelected] = useState('olivia');
  return (
    <BaseSubmenu
      variant="default"
      items={PEOPLE}
      selected={selected}
      onSelect={setSelected}
    />
  );
}

function CheckboxDemo() {
  const { selected, onSelect, onSelectAll, onClearAll } = useCheckboxMenu(CHECKBOX_ITEMS);
  return (
    <BaseSubmenu
      variant="checkbox"
      items={CHECKBOX_ITEMS}
      selected={selected}
      onSelect={onSelect}
      onSelectAll={onSelectAll}
      onClearAll={onClearAll}
    />
  );
}

function CheckboxTipDemo() {
  const { selected, onSelect, onSelectAll, onClearAll } = useCheckboxMenu(TIP_ITEMS);
  return (
    <BaseSubmenu
      variant="checkbox-tip"
      items={TIP_ITEMS}
      selected={selected}
      onSelect={onSelect}
      onSelectAll={onSelectAll}
      onClearAll={onClearAll}
    />
  );
}

function TreeDemo() {
  const [selected, setSelected] = useState<Set<string>>(new Set(['design', 'engineering']));
  const groups = ['Teams', 'Departments'];

  const getGroupSelected = (group: string): boolean | 'indeterminate' => {
    const groupItems = TREE_ITEMS.filter((i) => i.group === group);
    const allChecked = groupItems.every((i) => selected.has(i.id));
    const noneChecked = groupItems.every((i) => !selected.has(i.id));
    return allChecked ? true : noneChecked ? false : 'indeterminate';
  };

  const groupSelected = Object.fromEntries(groups.map((g) => [g, getGroupSelected(g)]));

  const onSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const onGroupSelect = (group: string) => {
    const groupItems = TREE_ITEMS.filter((i) => i.group === group);
    const allChecked = groupItems.every((i) => selected.has(i.id));
    setSelected((prev) => {
      const next = new Set(prev);
      groupItems.forEach((i) => allChecked ? next.delete(i.id) : next.add(i.id));
      return next;
    });
  };

  const onSelectAll = () => {
    setSelected((prev) =>
      prev.size === TREE_ITEMS.length ? new Set() : new Set(TREE_ITEMS.map((i) => i.id))
    );
  };

  return (
    <BaseSubmenu
      variant="checkbox-tree"
      items={TREE_ITEMS}
      selected={selected}
      onSelect={onSelect}
      onSelectAll={onSelectAll}
      onClearAll={() => setSelected(new Set())}
      groupSelected={groupSelected}
      onGroupSelect={onGroupSelect}
    />
  );
}

export default function BaseSubmenuPage() {
  return (
    <div>
      <PageHeader
        title="Base Submenu"
        description="The submenu is a floating panel used inside dropdowns and selects. It supports single-select, multi-select with checkboxes, checkbox with tips, hierarchical tree selection, skeleton loading, and an empty error state."
      />

      {/* Default */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Default')}
        {sectionDesc('Single-select list with leading icons. The selected item shows a checkmark on the right.')}
        <PreviewBox>
          <DefaultDemo />
        </PreviewBox>
      </section>

      {/* Checkbox */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Checkbox')}
        {sectionDesc('Multi-select with checkboxes. A header row provides "Select all" and "Clear all" actions.')}
        <PreviewBox>
          <CheckboxDemo />
        </PreviewBox>
      </section>

      {/* Checkbox + Tip */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Checkbox + Tip')}
        {sectionDesc('Checkbox items with a secondary description below each label.')}
        <PreviewBox>
          <CheckboxTipDemo />
        </PreviewBox>
      </section>

      {/* Tree */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Checkbox Tree')}
        {sectionDesc('Hierarchical multi-select with checkable category headers. Categories show indeterminate state when partially selected.')}
        <PreviewBox>
          <TreeDemo />
        </PreviewBox>
      </section>

      {/* Skeleton */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Skeleton')}
        {sectionDesc('Loading placeholder shown while data is being fetched.')}
        <PreviewBox>
          <BaseSubmenu variant="skeleton" />
        </PreviewBox>
      </section>

      {/* Empty state */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Empty state')}
        {sectionDesc('Shown when data fails to load. Includes an icon, message, and optional retry button.')}
        <PreviewBox>
          <BaseSubmenu
            variant="empty"
            onRetry={() => alert('Retrying...')}
          />
        </PreviewBox>
      </section>

      {/* Props */}
      <section>
        {sectionTitle('Props')}
        <PropsTable rows={[
          { name: 'variant', type: "'default' | 'checkbox' | 'checkbox-tip' | 'checkbox-tree' | 'skeleton' | 'empty'", default: "'default'", description: 'Menu type controlling layout, item rendering, and header visibility.' },
          { name: 'items', type: 'SubmenuItem[]', default: '[]', description: 'Array of menu items. Each has id, label, and optional icon, supportingText, disabled, group.' },
          { name: 'selected', type: "Set<string> | string", description: 'Selected item(s). Use a string for single-select (default variant) or Set for multi-select.' },
          { name: 'onSelect', type: '(id: string) => void', description: 'Called when an item is clicked.' },
          { name: 'onSelectAll', type: '() => void', description: 'Called when "Select all" is clicked (checkbox variants).' },
          { name: 'onClearAll', type: '() => void', description: 'Called when "Clear all" is clicked (checkbox variants).' },
          { name: 'groupSelected', type: "Record<string, boolean | 'indeterminate'>", description: 'Group-level selection state for tree variant.' },
          { name: 'onGroupSelect', type: '(group: string) => void', description: 'Called when a category header is clicked (tree variant).' },
          { name: 'emptyTitle', type: 'string', default: '"Something\'s wrong"', description: 'Title text for empty state.' },
          { name: 'emptyDescription', type: 'string', description: 'Description text for empty state.' },
          { name: 'onRetry', type: '() => void', description: 'Called when the retry button is clicked. If omitted, no button is shown.' },
          { name: 'width', type: 'number | string', default: '320', description: 'Override the menu width.' },
        ]} />
      </section>
    </div>
  );
}
