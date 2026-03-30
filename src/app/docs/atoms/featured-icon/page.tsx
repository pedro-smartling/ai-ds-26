'use client';

import React from 'react';
import FeaturedIcon, { FeaturedIconColor, FeaturedIconSize, FeaturedIconTheme } from '@/components/FeaturedIcon';
import FileTypeIcon, { FileTypeIconType } from '@/components/FileTypeIcon';
import PageHeader from '@/components/docs/PageHeader';
import PreviewBox from '@/components/docs/PreviewBox';
import PropsTable from '@/components/docs/PropsTable';
import { AlertCircle, Zap, Mail, Lock, Globe } from 'lucide-react';

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

const COLORS: { label: string; value: FeaturedIconColor }[] = [
  { label: 'Brand', value: 'brand' },
  { label: 'Default', value: 'default' },
  { label: 'Error', value: 'error' },
  { label: 'Warning', value: 'warning' },
  { label: 'Success', value: 'success' },
];

const SIZES: { label: string; value: FeaturedIconSize }[] = [
  { label: 'sm', value: 'sm' },
  { label: 'md', value: 'md' },
  { label: 'lg', value: 'lg' },
  { label: 'xl', value: 'xl' },
];

const THEMES: { label: string; value: FeaturedIconTheme }[] = [
  { label: 'Light circle', value: 'light-circle' },
  { label: 'Light double circle', value: 'light-double-circle' },
  { label: 'Light brand square', value: 'light-brand-square' },
  { label: 'Solid brand square', value: 'solid-brand-square' },
  { label: 'Dark brand square', value: 'dark-brand-square' },
  { label: 'Light square', value: 'light-square' },
];


export default function FeaturedIconAtomPage() {
  return (
    <div>
      <PageHeader
        title="Featured Icon"
        description="A decorative icon container with semantic colors, 4 sizes, and 6 themes including circles, double circles, and brand squares."
      />

      {/* Colors × Sizes — Light circle */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Colors — Light circle')}
        {sectionDesc('Five semantic color roles across all four sizes.')}
        <PreviewBox>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-tier-9)' }}>
            {COLORS.map((c) => (
              <div key={c.value} style={{ display: 'flex', alignItems: 'center', gap: 'var(--dimension-tier-7)' }}>
                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-moderate)', minWidth: 60 }}>{c.label}</span>
                {SIZES.map((s) => (
                  <FeaturedIcon key={s.value} icon={<AlertCircle />} color={c.value} size={s.value} theme="light-circle" />
                ))}
              </div>
            ))}
          </div>
        </PreviewBox>
      </section>

      {/* Colors × Sizes — Light double circle */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Colors — Light double circle')}
        {sectionDesc('Same colors with an outer ring in a lighter tint.')}
        <PreviewBox>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-tier-9)' }}>
            {COLORS.map((c) => (
              <div key={c.value} style={{ display: 'flex', alignItems: 'center', gap: 'var(--dimension-tier-7)' }}>
                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-moderate)', minWidth: 60 }}>{c.label}</span>
                {SIZES.map((s) => (
                  <FeaturedIcon key={s.value} icon={<AlertCircle />} color={c.value} size={s.value} theme="light-double-circle" />
                ))}
              </div>
            ))}
          </div>
        </PreviewBox>
      </section>

      {/* Brand themes — all square variants */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Brand square themes')}
        {sectionDesc('Four brand-specific square themes available in all sizes. These only use the brand color role.')}
        <PreviewBox>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-tier-9)' }}>
            {(['light-brand-square', 'solid-brand-square', 'dark-brand-square', 'light-square'] as FeaturedIconTheme[]).map((theme) => (
              <div key={theme} style={{ display: 'flex', alignItems: 'center', gap: 'var(--dimension-tier-7)' }}>
                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-moderate)', minWidth: 120 }}>
                  {THEMES.find(t => t.value === theme)?.label}
                </span>
                {SIZES.map((s) => (
                  <FeaturedIcon key={s.value} icon={<AlertCircle />} color="brand" size={s.value} theme={theme} />
                ))}
              </div>
            ))}
          </div>
        </PreviewBox>
      </section>

      {/* Sizes */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Sizes')}
        {sectionDesc('Four sizes: sm (32px), md (40px), lg (48px), xl (56px). Icon scales proportionally.')}
        <PreviewBox>
          <div style={{ display: 'flex', gap: 'var(--dimension-tier-7)', alignItems: 'flex-end' }}>
            {SIZES.map((s) => (
              <div key={s.value} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--dimension-tier-4)' }}>
                <FeaturedIcon icon={<Zap />} size={s.value} />
                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-moderate)' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </PreviewBox>
      </section>

      {/* In context */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('In context')}
        {sectionDesc('Featured icons in empty states and feature cards.')}
        <PreviewBox bg="subtle">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-tier-9)' }}>
            {/* Empty state */}
            <div style={{
              backgroundColor: 'var(--color-surface-main)',
              border: '1px solid var(--color-border-soft)',
              borderRadius: 'var(--radius-l)',
              padding: 'var(--dimension-tier-11)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--dimension-tier-6)',
              textAlign: 'center',
              maxWidth: 320,
            }}>
              <FeaturedIcon icon={<Mail />} color="brand" size="lg" theme="light-double-circle" />
              <div>
                <p style={{ fontSize: 'var(--font-size-m)', fontWeight: 'var(--font-weight-body-strongest)', color: 'var(--color-text-main)', margin: '0 0 var(--dimension-tier-3)' }}>
                  No messages yet
                </p>
                <p style={{ fontSize: 'var(--font-size-s)', color: 'var(--color-text-moderate)', margin: 0 }}>
                  Messages from your team will appear here.
                </p>
              </div>
            </div>

            {/* Feature cards */}
            <div style={{ display: 'flex', gap: 'var(--dimension-tier-6)' }}>
              {[
                { icon: <Lock />, theme: 'solid-brand-square' as FeaturedIconTheme, title: 'Enterprise SSO', desc: 'Single sign-on with your identity provider.' },
                { icon: <Globe />, theme: 'light-square' as FeaturedIconTheme, title: 'Global CDN', desc: 'Assets delivered from the nearest edge node.' },
              ].map((item) => (
                <div key={item.title} style={{
                  flex: 1,
                  backgroundColor: 'var(--color-surface-main)',
                  border: '1px solid var(--color-border-soft)',
                  borderRadius: 'var(--radius-l)',
                  padding: 'var(--dimension-tier-7)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--dimension-tier-5)',
                }}>
                  <FeaturedIcon icon={item.icon} color="brand" theme={item.theme} />
                  <div>
                    <p style={{ fontSize: 'var(--font-size-s)', fontWeight: 'var(--font-weight-body-strongest)', color: 'var(--color-text-main)', margin: '0 0 var(--dimension-tier-2)' }}>
                      {item.title}
                    </p>
                    <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-moderate)', margin: 0 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </PreviewBox>
      </section>

      {/* ── File Type Icon ──────────────────────────────────────────────── */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('File Type Icon')}
        {sectionDesc('A document-shaped icon with a file extension label. Three visual types: Default (white page with colored badge), Gray (neutral fill with dark text), and Solid (brand fill with white text).')}
      </section>

      {/* Types × extensions */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Types')}
        {sectionDesc('Each type uses a different page shape and label treatment.')}
        <PreviewBox>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-tier-9)' }}>
            {(['default', 'gray', 'solid'] as FileTypeIconType[]).map((type) => (
              <div key={type} style={{ display: 'flex', alignItems: 'center', gap: 'var(--dimension-tier-7)' }}>
                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-moderate)', minWidth: 50, textTransform: 'capitalize' }}>{type}</span>
                {['PDF', 'DOC', 'XLS', 'PPT', 'IMG', 'MP4', 'ZIP'].map((ext) => (
                  <FileTypeIcon key={ext} extension={ext} type={type} />
                ))}
              </div>
            ))}
          </div>
        </PreviewBox>
      </section>

      {/* Image formats */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Image formats')}
        {sectionDesc('Common image file extensions.')}
        <PreviewBox>
          <div style={{ display: 'flex', gap: 'var(--dimension-tier-7)', flexWrap: 'wrap' }}>
            {['IMG', 'JPG', 'JPEG', 'PNG', 'WebP', 'TIFF', 'GIF', 'SVG', 'EPS'].map((ext) => (
              <div key={ext} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--dimension-tier-3)' }}>
                <FileTypeIcon extension={ext} />
                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-moderate)' }}>{ext}</span>
              </div>
            ))}
          </div>
        </PreviewBox>
      </section>

      {/* Document formats */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Document formats')}
        {sectionDesc('Office and document file extensions.')}
        <PreviewBox>
          <div style={{ display: 'flex', gap: 'var(--dimension-tier-7)', flexWrap: 'wrap' }}>
            {['PDF', 'DOC', 'DOCX', 'TXT', 'CSV', 'XLS', 'XLSX', 'PPT', 'PPTX'].map((ext) => (
              <div key={ext} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--dimension-tier-3)' }}>
                <FileTypeIcon extension={ext} />
                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-moderate)' }}>{ext}</span>
              </div>
            ))}
          </div>
        </PreviewBox>
      </section>

      {/* Development & other */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Development & other')}
        {sectionDesc('Code, media, and archive file extensions.')}
        <PreviewBox>
          <div style={{ display: 'flex', gap: 'var(--dimension-tier-7)', flexWrap: 'wrap' }}>
            {['HTML', 'CSS', 'JS', 'JSON', 'XML', 'SQL', 'JAVA', 'MP3', 'WAV', 'MP4', 'AVI', 'ZIP', 'RAR'].map((ext) => (
              <div key={ext} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--dimension-tier-3)' }}>
                <FileTypeIcon extension={ext} />
                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-moderate)' }}>{ext}</span>
              </div>
            ))}
          </div>
        </PreviewBox>
      </section>

      {/* Props — Featured Icon */}
      <section>
        {sectionTitle('FeaturedIcon Props')}
        <PropsTable rows={[
          { name: 'icon', type: 'React.ReactNode', required: true, description: 'Icon element rendered inside the container.' },
          { name: 'color', type: "'brand' | 'default' | 'error' | 'warning' | 'success'", default: "'brand'", description: 'Semantic color role applied to background and icon.' },
          { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Container size: 32 / 40 / 48 / 56px.' },
          { name: 'theme', type: "'light-circle' | 'light-double-circle' | 'light-brand-square' | 'light-square' | 'solid-brand-square' | 'dark-brand-square'", default: "'light-circle'", description: 'Visual theme controlling shape, background, and border style.' },
        ]} />
      </section>

      {/* Props — File Type Icon */}
      <section>
        {sectionTitle('FileTypeIcon Props')}
        <PropsTable rows={[
          { name: 'extension', type: 'string', required: true, description: 'File extension label (e.g. PDF, DOC, IMG).' },
          { name: 'type', type: "'default' | 'gray' | 'solid'", default: "'default'", description: 'Visual type: white page with badge, gray page with text, or solid brand page.' },
          { name: 'size', type: 'number', default: '40', description: 'Container size in pixels. Scales proportionally.' },
        ]} />
      </section>
    </div>
  );
}
