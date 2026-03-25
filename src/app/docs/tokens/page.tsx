'use client';

import React from 'react';
import PageHeader from '@/components/docs/PageHeader';

interface SwatchProps { token: string; value: string; hex?: string; }
function Swatch({ token, value, hex }: SwatchProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--dimension-tier-6)', padding: 'var(--dimension-tier-5) var(--dimension-tier-7)', borderBottom: '1px solid var(--color-border-soft)' }}>
      <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-s)', backgroundColor: hex || `var(${token})`, border: '1px solid var(--color-border-soft)', flexShrink: 0 }} />
      <div style={{ flex: 1 }}>
        <code style={{ fontSize: 'var(--font-size-xs)', fontFamily: 'monospace', color: 'var(--color-text-main)', display: 'block' }}>{token}</code>
        <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-moderate)' }}>{value}</span>
      </div>
    </div>
  );
}

interface TokenRowProps { token: string; value: string; }
function TokenRow({ token, value }: TokenRowProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--dimension-tier-5) var(--dimension-tier-7)', borderBottom: '1px solid var(--color-border-soft)' }}>
      <code style={{ fontSize: 'var(--font-size-xs)', fontFamily: 'monospace', color: 'var(--color-text-main)' }}>{token}</code>
      <code style={{ fontSize: 'var(--font-size-xs)', fontFamily: 'monospace', color: 'var(--color-text-moderate)' }}>{value}</code>
    </div>
  );
}

function TokenSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
      <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-heading)', color: 'var(--color-text-main)', margin: '0 0 var(--dimension-tier-7)' }}>{title}</h2>
      {children}
    </section>
  );
}

function TokenGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 'var(--dimension-tier-9)' }}>
      <h3 style={{ fontSize: 'var(--font-size-s)', fontWeight: 'var(--font-weight-body-strongest)', color: 'var(--color-text-moderate)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 var(--dimension-tier-3)' }}>{label}</h3>
      <div style={{ border: '1px solid var(--color-border-soft)', borderRadius: 'var(--radius-l)', overflow: 'hidden', backgroundColor: 'var(--color-surface-main)' }}>
        {children}
      </div>
    </div>
  );
}

export default function TokensPage() {
  return (
    <div>
      <PageHeader
        title="Design Tokens"
        description="All tokens are defined as CSS custom properties in globals.css and mirror the Figma variable collections: global (primitives) and themes (semantic, light/dark-aware)."
      />

      {/* Color Primitives */}
      <TokenSection title="Color — Primitives">
        <p style={{ fontSize: 'var(--font-size-s)', color: 'var(--color-text-moderate)', marginBottom: 'var(--dimension-tier-9)', lineHeight: 'var(--line-height-body-s)' }}>
          Raw palette values in the <code style={{ fontFamily: 'monospace', backgroundColor: 'var(--color-surface-moderate)', padding: '2px 6px', borderRadius: '4px' }}>global</code> collection. Never reference these in components — use semantic tokens instead.
        </p>
        <TokenGroup label="Violet (Brand)">
          {[['--color-violet-50','#f5f3ff'],['--color-violet-100','#ede9fe'],['--color-violet-200','#ddd6fe'],['--color-violet-300','#c4b5fd'],['--color-violet-400','#a78bfa'],['--color-violet-500','#8b5cf6'],['--color-violet-600','#7c3aed'],['--color-violet-700','#6d28d9'],['--color-violet-800','#5b21b6'],['--color-violet-900','#4c1d95']].map(([t, v]) => (
            <Swatch key={t} token={t} value={v} hex={v} />
          ))}
        </TokenGroup>
        <TokenGroup label="Neutral">
          {[['--color-neutral-100','#f5f5f5'],['--color-neutral-200','#e5e5e5'],['--color-neutral-300','#d4d4d4'],['--color-neutral-400','#a3a3a3'],['--color-neutral-500','#737373'],['--color-neutral-600','#525252'],['--color-neutral-700','#404040'],['--color-neutral-800','#262626'],['--color-neutral-900','#171717']].map(([t, v]) => (
            <Swatch key={t} token={t} value={v} hex={v} />
          ))}
        </TokenGroup>
        <TokenGroup label="Red (Danger)">
          {[['--color-red-25','#fff9f9'],['--color-red-50','#fef2f2'],['--color-red-100','#fee2e2'],['--color-red-200','#fecaca'],['--color-red-300','#fca5a5'],['--color-red-400','#f87171'],['--color-red-500','#ef4444'],['--color-red-600','#dc2626'],['--color-red-700','#b91c1c'],['--color-red-800','#991b1b'],['--color-red-900','#7f1d1d']].map(([t, v]) => (
            <Swatch key={t} token={t} value={v} hex={v} />
          ))}
        </TokenGroup>
        <TokenGroup label="Blue">
          {[['--color-blue-25','#f7fbff'],['--color-blue-50','#eff6ff'],['--color-blue-100','#dbeafe'],['--color-blue-200','#bfdbfe'],['--color-blue-300','#93c5fd'],['--color-blue-500','#3b82f6'],['--color-blue-700','#1d4ed8'],['--color-blue-900','#1e3a8a']].map(([t, v]) => (
            <Swatch key={t} token={t} value={v} hex={v} />
          ))}
        </TokenGroup>
        <TokenGroup label="Green (Success)">
          {[['--color-green-50','#f0fdf4'],['--color-green-100','#dcfce7'],['--color-green-300','#86efac'],['--color-green-500','#22c55e'],['--color-green-600','#16a34a'],['--color-green-700','#15803d'],['--color-green-800','#166534']].map(([t, v]) => (
            <Swatch key={t} token={t} value={v} hex={v} />
          ))}
        </TokenGroup>
        <TokenGroup label="Amber (Warning)">
          {[['--color-amber-50','#fffbeb'],['--color-amber-100','#fef3c7'],['--color-amber-300','#fcd34d'],['--color-amber-500','#f59e0b'],['--color-amber-600','#d97706'],['--color-amber-700','#b45309'],['--color-amber-800','#92400e']].map(([t, v]) => (
            <Swatch key={t} token={t} value={v} hex={v} />
          ))}
        </TokenGroup>
      </TokenSection>

      {/* Semantic tokens */}
      <TokenSection title="Color — Semantic (themes collection)">
        <p style={{ fontSize: 'var(--font-size-s)', color: 'var(--color-text-moderate)', marginBottom: 'var(--dimension-tier-9)', lineHeight: 'var(--line-height-body-s)' }}>
          These tokens resolve differently in light and dark mode. Always use these in components.
        </p>
        <TokenGroup label="Surface">
          {[
            ['--color-surface-main','Main background (white / #171717)'],
            ['--color-surface-soft','Subtle background layer'],
            ['--color-surface-moderate','Moderate emphasis background'],
            ['--color-surface-main-hover','Hover state for white backgrounds'],
            ['--color-surface-disabled','Disabled element background'],
            ['--color-surface-brand-main','Brand tinted surface (violet-50)'],
            ['--color-surface-brand-moderate','Brand moderate (violet-100)'],
            ['--color-surface-brand-solid','Primary brand fill (violet-600)'],
            ['--color-surface-brand-solid-hover','Hover brand fill (violet-700)'],
            ['--color-surface-error-solid','Error fill (red-600)'],
            ['--color-surface-success-solid','Success fill (green-600)'],
            ['--color-surface-warning-solid','Warning fill (amber-600)'],
          ].map(([t, v]) => <Swatch key={t} token={t} value={v} />)}
        </TokenGroup>
        <TokenGroup label="Text">
          {[
            ['--color-text-main','Primary text'],
            ['--color-text-soft','Secondary text'],
            ['--color-text-moderate','Tertiary / caption text'],
            ['--color-text-disabled','Disabled text'],
            ['--color-text-placeholder','Input placeholders'],
            ['--color-text-main-onbrand','Text on brand backgrounds'],
            ['--color-text-brand-main','Brand-coloured text links'],
            ['--color-text-error-main','Error messages'],
            ['--color-text-success-main','Success messages'],
            ['--color-text-warning-main','Warning messages'],
          ].map(([t, v]) => <Swatch key={t} token={t} value={v} />)}
        </TokenGroup>
        <TokenGroup label="Border">
          {[
            ['--color-border-main','Default border (neutral-300)'],
            ['--color-border-soft','Subtle border (neutral-200)'],
            ['--color-border-transparent','No border'],
            ['--color-border-brand-main','Brand border (violet-500)'],
            ['--color-border-error-main','Error border (red-500)'],
          ].map(([t, v]) => <Swatch key={t} token={t} value={v} />)}
        </TokenGroup>
      </TokenSection>

      {/* Elevation */}
      <TokenSection title="Elevation (Shadows)">
        <TokenGroup label="Box shadows">
          {[
            ['--shadow-xs','0px 1px 2px rgba(16,24,41,0.05)'],
            ['--shadow-s','0px 1px 2px rgba(…,0.06), 0px 2px 3px rgba(…,0.10)'],
            ['--shadow-m','0px 2px 4px rgba(…,0.06), 0px 4px 8px rgba(…,0.10)'],
            ['--shadow-l','0px 4px 6px rgba(…,0.03), 0px 12px 16px rgba(…,0.08)'],
            ['--shadow-xl','0px 8px 8px rgba(…,0.03), 0px 20px 24px rgba(…,0.08)'],
            ['--shadow-xxl','0px 24px 48px rgba(…,0.18)'],
            ['--shadow-3xl','0px 32px 64px rgba(…,0.14)'],
            ['--shadow-focus-ring-brand','0px 0px 0px 4px violet-200'],
            ['--shadow-focus-ring-default','0px 0px 0px 4px rgba(152,162,179,0.14)'],
          ].map(([t, v]) => <TokenRow key={t} token={t} value={v} />)}
        </TokenGroup>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--dimension-tier-7)', padding: 'var(--dimension-tier-7)' }}>
          {[['shadow-xs','var(--shadow-xs)'],['shadow-s','var(--shadow-s)'],['shadow-m','var(--shadow-m)'],['shadow-l','var(--shadow-l)']].map(([label, val]) => (
            <div key={label} style={{
              height: '64px', backgroundColor: 'var(--color-surface-main)', borderRadius: 'var(--radius-l)', boxShadow: val as string,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <code style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-moderate)' }}>{label}</code>
            </div>
          ))}
        </div>
      </TokenSection>

      {/* Spacing */}
      <TokenSection title="Spacing">
        <TokenGroup label="Dimension tiers (base scale)">
          {[[0,'0px'],[1,'1px'],[2,'2px'],[3,'4px'],[4,'6px'],[5,'8px'],[6,'12px'],[7,'16px'],[8,'20px'],[9,'24px'],[10,'28px'],[11,'32px'],[12,'36px'],[13,'40px'],[14,'44px'],[15,'48px'],[16,'56px'],[17,'64px']].map(([tier, val]) => (
            <div key={tier} style={{ display: 'flex', alignItems: 'center', gap: 'var(--dimension-tier-7)', padding: 'var(--dimension-tier-3) var(--dimension-tier-7)', borderBottom: '1px solid var(--color-border-soft)' }}>
              <code style={{ width: '180px', fontSize: 'var(--font-size-xs)', fontFamily: 'monospace', color: 'var(--color-text-main)', flexShrink: 0 }}>--dimension-tier-{tier}</code>
              <div style={{ width: `${Math.min(parseInt(val as string), 200)}px`, height: '8px', backgroundColor: 'var(--color-surface-brand-solid)', borderRadius: '2px', flexShrink: 0 }} />
              <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-moderate)' }}>{val as string}</span>
            </div>
          ))}
        </TokenGroup>
        <TokenGroup label="Gap tokens (jf/gap)">
          {[['--jf-gap-0 (jf/gap/0)','0'],['--jf-gap-xs (jf/gap/xs)','8px'],['--jf-gap-md (jf/gap/md)','16px'],['--jf-gap-xl (jf/gap/xl)','24px'],['--jf-gap-auto (jf/gap/auto)','auto']].map(([t, v]) => <TokenRow key={t} token={t} value={v} />)}
        </TokenGroup>
      </TokenSection>

      {/* Typography */}
      <TokenSection title="Typography">
        <TokenGroup label="Font family">
          <TokenRow token="--font-family-base" value="Inter, sans-serif" />
        </TokenGroup>
        <TokenGroup label="Font sizes">
          {[['--font-size-xs','12px'],['--font-size-s','14px'],['--font-size-m','16px'],['--font-size-l','18px'],['--font-size-xl','20px'],['--font-size-xxl','24px'],['--font-size-3xl','32px'],['--font-size-4xl','40px']].map(([t, v]) => (
            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 'var(--dimension-tier-7)', padding: 'var(--dimension-tier-5) var(--dimension-tier-7)', borderBottom: '1px solid var(--color-border-soft)' }}>
              <code style={{ width: '160px', fontSize: 'var(--font-size-xs)', fontFamily: 'monospace', color: 'var(--color-text-main)', flexShrink: 0 }}>{t}</code>
              <span style={{ fontSize: v as string, color: 'var(--color-text-soft)', lineHeight: 1, fontFamily: 'var(--font-family-base)' }}>Aa</span>
              <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-moderate)', marginLeft: 'auto' }}>{v as string}</span>
            </div>
          ))}
        </TokenGroup>
        <TokenGroup label="Font weights">
          {[['--font-weight-body','400 — body'],['--font-weight-body-strong','500 — medium'],['--font-weight-body-strongest','600 — semibold'],['--font-weight-heading','600 — heading']].map(([t, v]) => <TokenRow key={t} token={t} value={v} />)}
        </TokenGroup>
        <TokenGroup label="Line heights">
          {[['--line-height-body-xs','18px'],['--line-height-body-s','21px'],['--line-height-body-m','24px'],['--line-height-body-l','27px'],['--line-height-heading-s','38px'],['--line-height-heading-m','48px']].map(([t, v]) => <TokenRow key={t} token={t} value={v} />)}
        </TokenGroup>
      </TokenSection>

      {/* Border radius */}
      <TokenSection title="Border Radius">
        <TokenGroup label="Radius scale">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--dimension-tier-7)', padding: 'var(--dimension-tier-9)' }}>
            {[['none','0px'],['xxs','2px'],['xs','4px'],['s','6px'],['m','8px'],['l','12px'],['xl','16px'],['xxl','24px'],['full','9999px']].map(([name, val]) => (
              <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--dimension-tier-3)' }}>
                <div style={{ width: '48px', height: '48px', backgroundColor: 'var(--color-surface-brand-moderate)', borderRadius: `var(--radius-${name})`, border: '1px solid var(--color-border-brand-soft)' }} />
                <code style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-moderate)', fontFamily: 'monospace' }}>{name}</code>
                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-strong)' }}>{val}</span>
              </div>
            ))}
          </div>
        </TokenGroup>
        <TokenGroup label="Border width">
          {[['--border-width-tier-1','0.5px'],['--border-width-tier-2 (jf/border-width/thin)','1px'],['--border-width-tier-3','1.5px'],['--border-width-tier-4','2px'],['--border-width-tier-5','3px'],['--border-width-tier-6','4px']].map(([t, v]) => <TokenRow key={t} token={t} value={v} />)}
        </TokenGroup>
      </TokenSection>

      {/* Opacity */}
      <TokenSection title="Opacity">
        <TokenGroup label="Levels">
          {[['--opacity-total','1.0'],['--opacity-high','0.8'],['--opacity-medium','0.5'],['--opacity-soft','0.3'],['--opacity-light','0.15'],['--opacity-zero','0']].map(([t, v]) => (
            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 'var(--dimension-tier-7)', padding: 'var(--dimension-tier-5) var(--dimension-tier-7)', borderBottom: '1px solid var(--color-border-soft)' }}>
              <code style={{ width: '160px', fontSize: 'var(--font-size-xs)', fontFamily: 'monospace', color: 'var(--color-text-main)', flexShrink: 0 }}>{t}</code>
              <div style={{ width: '80px', height: '20px', borderRadius: '4px', backgroundColor: 'var(--color-surface-brand-solid)', opacity: parseFloat(v) }} />
              <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-moderate)' }}>{v}</span>
            </div>
          ))}
        </TokenGroup>
      </TokenSection>

      {/* Z-index */}
      <TokenSection title="Z-Index">
        <TokenGroup label="Tier scale">
          {[[0,'-100 (behind)'],[1,'1'],[2,'100'],[3,'200'],[4,'300'],[5,'500'],[6,'700'],[7,'800'],[8,'900'],[9,'1000 (topmost)']].map(([tier, desc]) => (
            <TokenRow key={tier} token={`--z-index-tier-${tier}`} value={desc as string} />
          ))}
        </TokenGroup>
      </TokenSection>

      {/* Breakpoints */}
      <TokenSection title="Breakpoints">
        <TokenGroup label="Viewport widths">
          {[
            ['--size-breakpoint-mobile','375px'],
            ['--size-breakpoint-mobile-xl','576px'],
            ['--size-breakpoint-tablet-s','768px'],
            ['--size-breakpoint-tablet','1024px'],
            ['--size-breakpoint-desktop-s','1200px'],
            ['--size-breakpoint-desktop','1440px'],
            ['--size-breakpoint-desktop-xl','1920px'],
          ].map(([t, v]) => <TokenRow key={t} token={t} value={v} />)}
        </TokenGroup>
      </TokenSection>
    </div>
  );
}
