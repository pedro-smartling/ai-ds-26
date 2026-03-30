'use client';

import React, { useState } from 'react';
import Tag, { TagSize } from '@/components/Tag';
import PageHeader from '@/components/docs/PageHeader';
import PreviewBox from '@/components/docs/PreviewBox';
import PropsTable from '@/components/docs/PropsTable';
import { Mail, Star, Globe } from 'lucide-react';

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

const SIZES: { label: string; value: TagSize }[] = [
  { label: 'sm', value: 'sm' },
  { label: 'md', value: 'md' },
  { label: 'lg', value: 'lg' },
];

function DismissableDemo() {
  const [tags, setTags] = useState(['React', 'TypeScript', 'Next.js', 'Figma', 'Design Tokens']);
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--dimension-tier-5)' }}>
      {tags.map((t) => (
        <Tag key={t} label={t} dismissible onDismiss={() => setTags((prev) => prev.filter((x) => x !== t))} />
      ))}
      {tags.length === 0 && (
        <span style={{ fontSize: 'var(--font-size-s)', color: 'var(--color-text-moderate)' }}>All tags removed</span>
      )}
    </div>
  );
}

export default function TagPage() {
  return (
    <div>
      <PageHeader
        title="Tag"
        description="Tags are compact elements for labelling, categorising, or filtering. They support three sizes, leading icons or dots, count badges, and a dismiss action."
      />

      {/* Sizes — text only */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Sizes')}
        {sectionDesc('Three sizes: sm (24px, 12px text), md (24px, 14px text), and lg (28px, 14px text).')}
        <PreviewBox>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-tier-7)' }}>
            {SIZES.map((s) => (
              <div key={s.value} style={{ display: 'flex', alignItems: 'center', gap: 'var(--dimension-tier-6)' }}>
                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-moderate)', minWidth: 24 }}>{s.label}</span>
                <Tag label="Label" size={s.value} />
                <Tag label="Label" size={s.value} dismissible />
                <Tag label="Label" size={s.value} count={5} />
              </div>
            ))}
          </div>
        </PreviewBox>
      </section>

      {/* With icon */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('With icon')}
        {sectionDesc('Pass any icon as a leading element. Icon size scales with the tag size.')}
        <PreviewBox>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-tier-7)' }}>
            {SIZES.map((s) => (
              <div key={s.value} style={{ display: 'flex', alignItems: 'center', gap: 'var(--dimension-tier-6)' }}>
                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-moderate)', minWidth: 24 }}>{s.label}</span>
                <Tag label="Label" size={s.value} icon={<Mail />} />
                <Tag label="Label" size={s.value} icon={<Mail />} dismissible />
                <Tag label="Label" size={s.value} icon={<Mail />} count={5} />
              </div>
            ))}
          </div>
        </PreviewBox>
      </section>

      {/* With dot */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('With dot')}
        {sectionDesc('A status dot replaces the icon. Dot color defaults to green and can be customised.')}
        <PreviewBox>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-tier-7)' }}>
            {SIZES.map((s) => (
              <div key={s.value} style={{ display: 'flex', alignItems: 'center', gap: 'var(--dimension-tier-6)' }}>
                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-moderate)', minWidth: 24 }}>{s.label}</span>
                <Tag label="Label" size={s.value} dot />
                <Tag label="Label" size={s.value} dot dismissible />
                <Tag label="Label" size={s.value} dot count={5} />
              </div>
            ))}
          </div>
        </PreviewBox>
      </section>

      {/* Dismissible */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Dismissible')}
        {sectionDesc('Click the X to remove tags. Useful for filter chips and multi-select inputs.')}
        <PreviewBox>
          <DismissableDemo />
        </PreviewBox>
      </section>

      {/* In context */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('In context')}
        {sectionDesc('Tags with different icons and dot colors.')}
        <PreviewBox>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--dimension-tier-5)' }}>
            <Tag label="Featured" icon={<Star />} />
            <Tag label="Active" dot dotColor="var(--color-green-500)" />
            <Tag label="Pending" dot dotColor="var(--color-amber-500)" />
            <Tag label="Failed" dot dotColor="var(--color-red-500)" />
            <Tag label="Global" icon={<Globe />} count={12} />
            <Tag label="Draft" />
          </div>
        </PreviewBox>
      </section>

      {/* Props */}
      <section>
        {sectionTitle('Props')}
        <PropsTable rows={[
          { name: 'label', type: 'string', required: true, description: 'Tag text.' },
          { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Tag size: sm (24px/12px), md (24px/14px), lg (28px/14px).' },
          { name: 'icon', type: 'React.ReactNode', description: 'Leading icon element.' },
          { name: 'dot', type: 'boolean', default: 'false', description: 'Show a status dot instead of an icon.' },
          { name: 'dotColor', type: 'string', default: 'var(--color-green-500)', description: 'Dot fill color.' },
          { name: 'count', type: 'number', description: 'Count badge shown after the label.' },
          { name: 'dismissible', type: 'boolean', default: 'false', description: 'Show an X close button.' },
          { name: 'onDismiss', type: '() => void', description: 'Called when the X button is clicked.' },
        ]} />
      </section>
    </div>
  );
}
