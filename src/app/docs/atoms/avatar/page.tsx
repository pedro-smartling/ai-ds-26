'use client';

import React from 'react';
import Avatar, { AvatarSize } from '@/components/Avatar';
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

const SIZES: { label: string; value: AvatarSize; dim: number }[] = [
  { label: 'xs', value: 'xs', dim: 24 },
  { label: 'sm', value: 'sm', dim: 32 },
  { label: 'md', value: 'md', dim: 40 },
  { label: 'lg', value: 'lg', dim: 48 },
  { label: 'xl', value: 'xl', dim: 64 },
  { label: 'xxl', value: 'xxl', dim: 64 },
];

const SAMPLE_SRC = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop&crop=face';

export default function AvatarPage() {
  return (
    <div>
      <PageHeader
        title="Avatar"
        description="Avatars display a user's profile image in a circular frame. They support six sizes and fall back to initials or a user icon when no image is provided."
      />

      {/* Sizes with image */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Sizes')}
        {sectionDesc('Six sizes: xs (24px), sm (32px), md (40px), lg (48px), xl (64px), and xxl (64px).')}
        <PreviewBox>
          <div style={{ display: 'flex', gap: 'var(--dimension-tier-9)', alignItems: 'flex-end' }}>
            {SIZES.map((s) => (
              <div key={s.value} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--dimension-tier-5)' }}>
                <Avatar src={SAMPLE_SRC} size={s.value} alt="User avatar" />
                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-moderate)' }}>
                  {s.label} — {s.dim}px
                </span>
              </div>
            ))}
          </div>
        </PreviewBox>
      </section>

      {/* Initials fallback */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Initials fallback')}
        {sectionDesc('When no image is available, pass initials to display letters in place of the photo.')}
        <PreviewBox>
          <div style={{ display: 'flex', gap: 'var(--dimension-tier-9)', alignItems: 'flex-end' }}>
            {SIZES.map((s) => (
              <div key={s.value} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--dimension-tier-5)' }}>
                <Avatar size={s.value} initials="OR" />
                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-moderate)' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </PreviewBox>
      </section>

      {/* Icon fallback */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Icon fallback')}
        {sectionDesc('When neither image nor initials are provided, a default user icon is shown.')}
        <PreviewBox>
          <div style={{ display: 'flex', gap: 'var(--dimension-tier-9)', alignItems: 'flex-end' }}>
            {SIZES.map((s) => (
              <div key={s.value} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--dimension-tier-5)' }}>
                <Avatar size={s.value} />
                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-moderate)' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </PreviewBox>
      </section>

      {/* Props */}
      <section>
        {sectionTitle('Props')}
        <PropsTable rows={[
          { name: 'src', type: 'string', description: 'Image URL. When provided, displays the photo.' },
          { name: 'alt', type: 'string', default: "''", description: 'Alt text for the image.' },
          { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'", default: "'md'", description: 'Avatar size: xs (24px), sm (32px), md (40px), lg (48px), xl/xxl (64px).' },
          { name: 'initials', type: 'string', description: 'Fallback initials displayed when no src is provided.' },
        ]} />
      </section>
    </div>
  );
}
