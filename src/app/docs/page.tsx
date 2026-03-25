'use client';

import React from 'react';
import Link from 'next/link';
import PageHeader from '@/components/docs/PageHeader';

const components = [
  { name: 'Buttons', href: '/docs/components/buttons', desc: '7 variants · 3 sizes · disabled state' },
  { name: 'Button Group', href: '/docs/components/button-group', desc: 'Grouped buttons, horizontal or vertical' },
  { name: 'Input', href: '/docs/components/input', desc: 'Text inputs with labels, icons, helper text' },
  { name: 'Radio', href: '/docs/components/radio', desc: 'Single-select radio controls with labels' },
  { name: 'Tabs', href: '/docs/components/tabs', desc: 'Underline and pill variants with badges' },
  { name: 'Dropdown', href: '/docs/components/dropdown', desc: 'Trigger + menu list with icons and dividers' },
  { name: 'Modal', href: '/docs/components/modal', desc: '3 sizes · header, body, footer slots' },
  { name: 'Progress Bar', href: '/docs/components/progress-bar', desc: '4 colors · 3 sizes · with labels' },
  { name: 'Featured Icon', href: '/docs/components/featured-icon', desc: '5 color roles · 4 sizes' },
  { name: 'Card', href: '/docs/components/card', desc: 'Surface container with shadow and border options' },
];

const tokenGroups = [
  { label: 'Primitives', tokens: ['neutral', 'violet', 'red', 'blue', 'green', 'amber'] },
  { label: 'Semantic — Surface', tokens: ['surface-main', 'surface-soft', 'surface-brand-solid', 'surface-error-solid'] },
  { label: 'Semantic — Text', tokens: ['text-main', 'text-soft', 'text-moderate', 'text-disabled'] },
  { label: 'Semantic — Border', tokens: ['border-main', 'border-soft', 'border-brand-main'] },
  { label: 'Spacing', tokens: ['dimension-tier-*', 'space-page-inside-*', 'space-page-inset-*'] },
  { label: 'Typography', tokens: ['font-size-*', 'line-height-*', 'font-weight-*'] },
  { label: 'Elevation', tokens: ['shadow-xs', 'shadow-s', 'shadow-m', 'shadow-l'] },
];

export default function DocsOverview() {
  return (
    <div>
      <PageHeader
        title="UI Kit"
        description="Design token foundation and component library for Smartling. All tokens come directly from the Figma library — primitives feed into semantic aliases which power both light and dark themes."
      />

      {/* Token summary */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--dimension-tier-7)' }}>
          <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-heading)', color: 'var(--color-text-main)', margin: 0 }}>
            Token foundation
          </h2>
          <Link href="/docs/tokens" style={{ fontSize: 'var(--font-size-s)', color: 'var(--color-foreground-brand-main)', textDecoration: 'none', fontWeight: 'var(--font-weight-body-strong)' }}>
            View all tokens →
          </Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 'var(--dimension-tier-6)' }}>
          {tokenGroups.map((group) => (
            <div key={group.label} style={{
              backgroundColor: 'var(--color-surface-main)',
              border: '1px solid var(--color-border-soft)',
              borderRadius: 'var(--radius-l)',
              padding: 'var(--dimension-tier-7)',
            }}>
              <p style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-body-strongest)', color: 'var(--color-text-moderate)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 var(--dimension-tier-5)' }}>
                {group.label}
              </p>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--dimension-tier-3)' }}>
                {group.tokens.map((t) => (
                  <li key={t}>
                    <code style={{ fontSize: 'var(--font-size-xs)', fontFamily: 'monospace', color: 'var(--color-text-soft)' }}>
                      --color-{t}
                    </code>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Theme system */}
      <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-heading)', color: 'var(--color-text-main)', margin: '0 0 var(--dimension-tier-6)' }}>
          Theme system
        </h2>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--dimension-tier-6)',
        }}>
          {[
            { mode: 'Light', bg: '#ffffff', surface: '#fafafa', text: '#262626', brand: '#7c3aed' },
            { mode: 'Dark', bg: '#171717', surface: '#262626', text: '#fafafa', brand: '#8b5cf6' },
          ].map(({ mode, bg, surface, text, brand }) => (
            <div key={mode} style={{
              border: '1px solid var(--color-border-soft)',
              borderRadius: 'var(--radius-l)',
              overflow: 'hidden',
            }}>
              <div style={{ backgroundColor: bg, padding: 'var(--dimension-tier-9)', display: 'flex', flexDirection: 'column', gap: 'var(--dimension-tier-5)' }}>
                <div style={{ display: 'flex', gap: 'var(--dimension-tier-3)' }}>
                  {[bg, surface, text, brand].map((c) => (
                    <div key={c} style={{ width: '28px', height: '28px', borderRadius: 'var(--radius-s)', backgroundColor: c, border: '1px solid rgba(0,0,0,0.1)' }} />
                  ))}
                </div>
                <p style={{ color: text, fontSize: 'var(--font-size-s)', margin: 0, fontWeight: 600 }}>{mode} theme</p>
                <p style={{ color: text, opacity: 0.6, fontSize: 'var(--font-size-xs)', margin: 0 }}>All semantic tokens resolve to these values</p>
              </div>
              <div style={{ backgroundColor: 'var(--color-surface-soft)', padding: 'var(--dimension-tier-5) var(--dimension-tier-7)', borderTop: '1px solid var(--color-border-soft)' }}>
                <code style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-moderate)', fontFamily: 'monospace' }}>
                  .{`${mode.toLowerCase()} | [data-theme="${mode.toLowerCase()}"]`}
                </code>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Components grid */}
      <section>
        <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-heading)', color: 'var(--color-text-main)', margin: '0 0 var(--dimension-tier-7)' }}>
          Components
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 'var(--dimension-tier-6)' }}>
          {components.map((c) => (
            <Link key={c.href} href={c.href} style={{ textDecoration: 'none' }}>
              <div style={{
                backgroundColor: 'var(--color-surface-main)',
                border: '1px solid var(--color-border-soft)',
                borderRadius: 'var(--radius-l)',
                padding: 'var(--dimension-tier-7)',
                transition: 'box-shadow 0.15s, border-color 0.15s',
                cursor: 'pointer',
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = 'var(--shadow-m)';
                  e.currentTarget.style.borderColor = 'var(--color-border-brand-soft)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'var(--color-border-soft)';
                }}
              >
                <p style={{ fontSize: 'var(--font-size-m)', fontWeight: 'var(--font-weight-body-strongest)', color: 'var(--color-text-main)', margin: '0 0 var(--dimension-tier-3)' }}>
                  {c.name}
                </p>
                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-moderate)', margin: 0 }}>
                  {c.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
