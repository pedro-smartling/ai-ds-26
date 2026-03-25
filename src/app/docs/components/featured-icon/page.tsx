'use client';

import React from 'react';
import FeaturedIcon from '@/components/FeaturedIcon';
import PageHeader from '@/components/docs/PageHeader';
import PreviewBox from '@/components/docs/PreviewBox';
import PropsTable from '@/components/docs/PropsTable';
import { Star, CheckCircle, AlertTriangle, XCircle, Settings, Zap, Mail, Lock, Globe } from 'lucide-react';

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

export default function FeaturedIconPage() {
  return (
    <div>
      <PageHeader
        title="Featured Icon"
        description="A decorative icon container with semantic color roles. Use in empty states, feature highlights, and notification cards."
      />

      {/* Colors */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Colors')}
        {sectionDesc('Five semantic color roles: brand, success, warning, error, and neutral.')}
        <PreviewBox>
          <div style={{ display: 'flex', gap: 'var(--dimension-tier-7)', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--dimension-tier-4)' }}>
              <FeaturedIcon icon={<Star />} color="brand" />
              <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-moderate)' }}>brand</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--dimension-tier-4)' }}>
              <FeaturedIcon icon={<CheckCircle />} color="success" />
              <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-moderate)' }}>success</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--dimension-tier-4)' }}>
              <FeaturedIcon icon={<AlertTriangle />} color="warning" />
              <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-moderate)' }}>warning</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--dimension-tier-4)' }}>
              <FeaturedIcon icon={<XCircle />} color="error" />
              <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-moderate)' }}>error</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--dimension-tier-4)' }}>
              <FeaturedIcon icon={<Settings />} color="neutral" />
              <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-moderate)' }}>neutral</span>
            </div>
          </div>
        </PreviewBox>
      </section>

      {/* Sizes */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('Sizes')}
        {sectionDesc('Four sizes: sm (32px), md (40px), lg (48px), xl (56px). Icon scales proportionally.')}
        <PreviewBox>
          <div style={{ display: 'flex', gap: 'var(--dimension-tier-7)', flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--dimension-tier-4)' }}>
              <FeaturedIcon icon={<Zap />} size="sm" />
              <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-moderate)' }}>sm</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--dimension-tier-4)' }}>
              <FeaturedIcon icon={<Zap />} size="md" />
              <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-moderate)' }}>md</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--dimension-tier-4)' }}>
              <FeaturedIcon icon={<Zap />} size="lg" />
              <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-moderate)' }}>lg</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--dimension-tier-4)' }}>
              <FeaturedIcon icon={<Zap />} size="xl" />
              <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-moderate)' }}>xl</span>
            </div>
          </div>
        </PreviewBox>
      </section>

      {/* In context */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        {sectionTitle('In context')}
        {sectionDesc('Featured icons are commonly used in empty states, confirmation dialogs, and feature cards.')}
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
              maxWidth: '320px',
            }}>
              <FeaturedIcon icon={<Mail />} color="brand" size="lg" />
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
                { icon: <Lock />, color: 'brand' as const, title: 'Enterprise SSO', desc: 'Single sign-on with your identity provider.' },
                { icon: <Globe />, color: 'success' as const, title: 'Global CDN', desc: 'Assets delivered from the nearest edge node.' },
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
                  <FeaturedIcon icon={item.icon} color={item.color} />
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

      {/* Props */}
      <section>
        {sectionTitle('Props')}
        <PropsTable rows={[
          { name: 'icon', type: 'React.ReactNode', required: true, description: 'Icon element rendered inside the container.' },
          { name: 'color', type: "'brand' | 'success' | 'warning' | 'error' | 'neutral'", default: "'brand'", description: 'Semantic color role applied to background and icon tint.' },
          { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Container size: 32 / 40 / 48 / 56px.' },
        ]} />
      </section>
    </div>
  );
}
