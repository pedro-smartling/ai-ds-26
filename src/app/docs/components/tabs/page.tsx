'use client';

import React from 'react';
import Tabs from '@/components/Tabs';
import PageHeader from '@/components/docs/PageHeader';
import PreviewBox from '@/components/docs/PreviewBox';
import PropsTable from '@/components/docs/PropsTable';
import { BarChart2, Users, Settings, Home } from 'lucide-react';

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

const basicTabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'activity', label: 'Activity' },
  { id: 'settings', label: 'Settings' },
];

const tabsWithBadge = [
  { id: 'all', label: 'All', badge: 48 },
  { id: 'active', label: 'Active', badge: 12 },
  { id: 'archived', label: 'Archived', badge: 36 },
];

const tabsWithIcons = [
  { id: 'home', label: 'Home', icon: <Home width={16} height={16} /> },
  { id: 'analytics', label: 'Analytics', icon: <BarChart2 width={16} height={16} /> },
  { id: 'users', label: 'Users', icon: <Users width={16} height={16} /> },
  { id: 'settings', label: 'Settings', icon: <Settings width={16} height={16} /> },
];

const tabsWithDisabled = [
  { id: 'active', label: 'Active' },
  { id: 'draft', label: 'Draft', disabled: true },
  { id: 'archived', label: 'Archived' },
];

export default function TabsPage() {
  return (
    <div>
      <PageHeader
        title="Tabs"
        description="Tabs organize content into parallel sections. Two variants: underline for page-level navigation, pill for contained switching."
      />

      {/* Underline */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Underline')}
        {sectionDesc('Default variant. Uses an active border indicator — suited for page-level and section navigation.')}
        <PreviewBox>
          <Tabs tabs={basicTabs} variant="underline" />
        </PreviewBox>
      </section>

      {/* Pill */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Pill')}
        {sectionDesc('Contained pill style with a filled background for the active tab. Good for filter controls and compact selectors.')}
        <PreviewBox>
          <Tabs tabs={basicTabs} variant="pill" />
        </PreviewBox>
      </section>

      {/* With badges */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('With badges')}
        {sectionDesc('Add a count badge to any tab by passing a badge value.')}
        <PreviewBox>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-tier-9)' }}>
            <Tabs tabs={tabsWithBadge} variant="underline" />
            <Tabs tabs={tabsWithBadge} variant="pill" />
          </div>
        </PreviewBox>
      </section>

      {/* With icons */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('With icons')}
        {sectionDesc('Icons render before the label. Pass any React node as the icon property.')}
        <PreviewBox>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-tier-9)' }}>
            <Tabs tabs={tabsWithIcons} variant="underline" />
            <Tabs tabs={tabsWithIcons} variant="pill" />
          </div>
        </PreviewBox>
      </section>

      {/* Disabled */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Disabled tabs')}
        {sectionDesc('Individual tabs can be disabled while others remain interactive.')}
        <PreviewBox>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-tier-9)' }}>
            <Tabs tabs={tabsWithDisabled} variant="underline" />
            <Tabs tabs={tabsWithDisabled} variant="pill" />
          </div>
        </PreviewBox>
      </section>

      {/* Props */}
      <section>
        {sectionTitle('Props')}
        <PropsTable rows={[
          { name: 'tabs', type: 'Tab[]', required: true, description: 'Array of tab definitions. Each tab requires id and label, with optional icon, badge, and disabled.' },
          { name: 'variant', type: "'underline' | 'pill'", default: "'underline'", description: 'Visual style of the tab strip.' },
          { name: 'defaultTab', type: 'string', description: 'ID of the initially active tab. Defaults to first tab.' },
          { name: 'onChange', type: '(tabId: string) => void', description: 'Callback when the active tab changes.' },
        ]} />

        <h3 style={{ fontSize: 'var(--font-size-m)', fontWeight: 'var(--font-weight-body-strongest)', color: 'var(--color-text-main)', margin: 'var(--dimension-tier-9) 0 var(--dimension-tier-6)' }}>
          Tab object
        </h3>
        <PropsTable rows={[
          { name: 'id', type: 'string', required: true, description: 'Unique identifier for the tab.' },
          { name: 'label', type: 'string', required: true, description: 'Display text.' },
          { name: 'icon', type: 'React.ReactNode', description: 'Optional icon rendered before the label.' },
          { name: 'badge', type: 'string | number', description: 'Count badge rendered after the label.' },
          { name: 'disabled', type: 'boolean', description: 'Prevents selecting this tab.' },
        ]} />
      </section>
    </div>
  );
}
