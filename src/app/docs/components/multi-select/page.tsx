'use client';

import React, { useState, useCallback } from 'react';
import MultiSelect from '@/components/MultiSelect';
import PageHeader from '@/components/docs/PageHeader';
import PreviewBox from '@/components/docs/PreviewBox';
import PropsTable from '@/components/docs/PropsTable';
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

const LANGUAGES: SubmenuItem[] = [
  { id: 'en-us', label: 'English (United States) [en-US]' },
  { id: 'en-uk', label: 'English (United Kingdom) [en-UK]' },
  { id: 'en-au', label: 'English (Australia) [en-AUS]' },
  { id: 'es-es', label: 'Spanish (Spain) [es-ES]' },
  { id: 'fr-fr', label: 'French (France) [fr-FR]' },
  { id: 'fr-ca', label: 'French (Canada) [fr-CA]' },
  { id: 'de-de', label: 'German (Germany) [de-DE]' },
  { id: 'it-it', label: 'Italian (Italy) [it-IT]' },
  { id: 'pt-br', label: 'Portuguese (Brazil) [pt-BR]' },
  { id: 'ja-jp', label: 'Japanese (Japan) [ja-JP]' },
  { id: 'ko-kr', label: 'Korean (South Korea) [ko-KR]' },
  { id: 'zh-cn', label: 'Chinese (Simplified) [zh-CN]' },
];

const PEOPLE: SubmenuItem[] = [
  { id: 'phoenix', label: 'Phoenix Baker' },
  { id: 'olivia', label: 'Olivia Rhye' },
  { id: 'lana', label: 'Lana Steiner' },
  { id: 'demi', label: 'Demi Wilkinson' },
  { id: 'candice', label: 'Candice Wu' },
  { id: 'natali', label: 'Natali Craig' },
  { id: 'drew', label: 'Drew Cano' },
  { id: 'orlando', label: 'Orlando Diggs' },
  { id: 'andi', label: 'Andi Lane' },
  { id: 'kate', label: 'Kate Morrison' },
];

function useMultiSelect(items: SubmenuItem[], initial: string[] = []) {
  const [selected, setSelected] = useState<Set<string>>(new Set(initial));
  const onSelect = useCallback((id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
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
  const { selected, onSelect, onSelectAll, onClearAll } = useMultiSelect(LANGUAGES, ['en-us']);
  return (
    <MultiSelect
      label="Languages"
      hintText="Select the languages for your project."
      placeholder="Search languages..."
      items={LANGUAGES}
      selected={selected}
      onSelect={onSelect}
      onSelectAll={onSelectAll}
      onClearAll={onClearAll}
    />
  );
}

function FilledDemo() {
  const { selected, onSelect, onSelectAll, onClearAll } = useMultiSelect(
    LANGUAGES,
    ['en-us', 'en-uk', 'fr-fr', 'de-de', 'es-es', 'pt-br', 'ja-jp']
  );
  return (
    <MultiSelect
      label="Languages"
      hintText="Tags collapse after 5 selected. Click 'see all' to expand."
      placeholder="Search languages..."
      items={LANGUAGES}
      selected={selected}
      onSelect={onSelect}
      onSelectAll={onSelectAll}
      onClearAll={onClearAll}
    />
  );
}

function SmallDemo() {
  const { selected, onSelect, onSelectAll, onClearAll } = useMultiSelect(PEOPLE, ['olivia', 'lana']);
  return (
    <MultiSelect
      label="Team members"
      hintText="Assign people to this task."
      placeholder="Search people..."
      size="sm"
      items={PEOPLE}
      selected={selected}
      onSelect={onSelect}
      onSelectAll={onSelectAll}
      onClearAll={onClearAll}
    />
  );
}

function ErrorDemo() {
  const { selected, onSelect, onSelectAll, onClearAll } = useMultiSelect(LANGUAGES);
  return (
    <MultiSelect
      label="Languages"
      errorText="Please select at least one language."
      placeholder="Search languages..."
      items={LANGUAGES}
      selected={selected}
      onSelect={onSelect}
      onSelectAll={onSelectAll}
      onClearAll={onClearAll}
    />
  );
}

function DisabledDemo() {
  const { selected, onSelect } = useMultiSelect(LANGUAGES, ['en-us', 'fr-fr']);
  return (
    <MultiSelect
      label="Languages"
      hintText="This field is disabled."
      placeholder="Search languages..."
      items={LANGUAGES}
      selected={selected}
      onSelect={onSelect}
      disabled
    />
  );
}

export default function MultiSelectPage() {
  return (
    <div>
      <PageHeader
        title="Multi-Select"
        description="A searchable multi-select input with tags, dropdown menu, select all/clear all, and collapsible tag overflow. Uses the Base Submenu atom for the dropdown panel."
      />

      {/* Default */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Default')}
        {sectionDesc('Click the input to open the dropdown. Type to search. Click items to select. Selected items appear as removable tags.')}
        <PreviewBox>
          <div style={{ maxWidth: 560, width: '100%' }}>
            <DefaultDemo />
          </div>
        </PreviewBox>
      </section>

      {/* Filled / Tag overflow */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Tag overflow')}
        {sectionDesc('When many items are selected, tags collapse with a "see all X selected" link. Click to expand and "see less" to collapse.')}
        <PreviewBox>
          <div style={{ maxWidth: 560, width: '100%' }}>
            <FilledDemo />
          </div>
        </PreviewBox>
      </section>

      {/* Small size */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Small size')}
        {sectionDesc('A compact variant with smaller input height (40px), 16px icons, and 14px font.')}
        <PreviewBox>
          <div style={{ maxWidth: 560, width: '100%' }}>
            <SmallDemo />
          </div>
        </PreviewBox>
      </section>

      {/* Error */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Error state')}
        {sectionDesc('Pass errorText to show a validation error with an alert icon. The border turns red until the input is focused.')}
        <PreviewBox>
          <div style={{ maxWidth: 560, width: '100%' }}>
            <ErrorDemo />
          </div>
        </PreviewBox>
      </section>

      {/* Disabled */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Disabled')}
        {sectionDesc('When disabled, the input is non-interactive and the dropdown cannot open. Tags are not removable.')}
        <PreviewBox>
          <div style={{ maxWidth: 560, width: '100%' }}>
            <DisabledDemo />
          </div>
        </PreviewBox>
      </section>

      {/* Props */}
      <section>
        {sectionTitle('Props')}
        <PropsTable rows={[
          { name: 'label', type: 'string', description: 'Label text above the input.' },
          { name: 'hintText', type: 'string', description: 'Hint text below the input. Hidden when errorText is set.' },
          { name: 'errorText', type: 'string', description: 'Error message with alert icon. Shows red border.' },
          { name: 'placeholder', type: 'string', default: '"Search..."', description: 'Placeholder text when no items are selected.' },
          { name: 'size', type: "'sm' | 'md'", default: "'md'", description: 'Input size. sm is 40px height; md is 48px.' },
          { name: 'items', type: 'SubmenuItem[]', required: true, description: 'Array of selectable items with id and label.' },
          { name: 'selected', type: 'Set<string>', required: true, description: 'Set of selected item IDs.' },
          { name: 'onSelect', type: '(id: string) => void', required: true, description: 'Called when an item is toggled.' },
          { name: 'onSelectAll', type: '() => void', description: 'Called when "Select all" is clicked. Falls back to toggling all filtered items.' },
          { name: 'onClearAll', type: '() => void', description: 'Called when "Clear all" is clicked. Falls back to deselecting all.' },
          { name: 'collapseThreshold', type: 'number', default: '5', description: 'Number of tags visible before "see all" link appears.' },
          { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the entire component.' },
          { name: 'width', type: 'number | string', description: 'Override the container width.' },
        ]} />
      </section>
    </div>
  );
}
