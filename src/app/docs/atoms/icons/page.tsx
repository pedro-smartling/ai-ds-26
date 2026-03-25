'use client';

import React, { useState, useMemo } from 'react';
import * as LucideIcons from 'lucide-react';
import PageHeader from '@/components/docs/PageHeader';

type IconComponent = React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;

const ALL_ICONS: [string, IconComponent][] = (
  Object.entries(LucideIcons) as [string, unknown][]
).filter(
  ([name]) =>
    name[0] === name[0].toUpperCase() &&
    !name.endsWith('Icon') &&
    name !== 'createLucideIcon'
) as [string, IconComponent][];

export default function IconsPage() {
  const [search, setSearch] = useState('');
  const [copied, setCopied] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return ALL_ICONS;
    return ALL_ICONS.filter(([name]) => name.toLowerCase().includes(q));
  }, [search]);

  const handleCopy = (name: string) => {
    navigator.clipboard.writeText(name).catch(() => {});
    setCopied(name);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div>
      <PageHeader
        title="Icons"
        description={`${ALL_ICONS.length} icons from lucide-react. Click any icon to copy its name.`}
      />

      {/* Search */}
      <div style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        <input
          type="search"
          placeholder="Search icons…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%',
            maxWidth: '360px',
            height: '40px',
            padding: '0 var(--dimension-tier-7)',
            fontSize: 'var(--font-size-s)',
            fontFamily: 'var(--font-family-base)',
            color: 'var(--color-text-main)',
            backgroundColor: 'var(--color-surface-main)',
            border: '2px solid transparent',
            borderRadius: 'var(--radius-m)',
            outline: 'none',
            boxSizing: 'border-box',
            boxShadow: 'inset 0 0 0 1px var(--color-border-main), var(--shadow-xs)',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-border-solid)';
            e.currentTarget.style.boxShadow = '0px 0px 0px 2px var(--color-surface-main), 0px 0px 0px 6px var(--color-amber-300)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'transparent';
            e.currentTarget.style.boxShadow = 'inset 0 0 0 1px var(--color-border-main), var(--shadow-xs)';
          }}
        />
        {search && (
          <p style={{
            marginTop: 'var(--dimension-tier-4)',
            fontSize: 'var(--font-size-s)',
            color: 'var(--color-text-moderate)',
          }}>
            {filtered.length} result{filtered.length !== 1 ? 's' : ''} for &ldquo;{search}&rdquo;
          </p>
        )}
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(96px, 1fr))',
        gap: 'var(--dimension-tier-4)',
      }}>
        {filtered.map(([name, Icon]) => (
          <button
            key={name}
            onClick={() => handleCopy(name)}
            title={`Copy "${name}"`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--dimension-tier-3)',
              padding: 'var(--dimension-tier-6) var(--dimension-tier-4)',
              backgroundColor: copied === name
                ? 'var(--color-surface-brand-moderate)'
                : 'var(--color-surface-main)',
              border: '1px solid var(--color-border-soft)',
              borderRadius: 'var(--radius-m)',
              cursor: 'pointer',
              transition: 'background-color 0.15s, border-color 0.15s',
              fontFamily: 'var(--font-family-base)',
              textAlign: 'center',
              outline: 'none',
            }}
            onMouseEnter={(e) => {
              if (copied !== name) {
                e.currentTarget.style.backgroundColor = 'var(--color-surface-moderate)';
                e.currentTarget.style.borderColor = 'var(--color-border-main)';
              }
            }}
            onMouseLeave={(e) => {
              if (copied !== name) {
                e.currentTarget.style.backgroundColor = 'var(--color-surface-main)';
                e.currentTarget.style.borderColor = 'var(--color-border-soft)';
              }
            }}
            onFocus={(e) => {
              e.currentTarget.style.boxShadow = '0px 0px 0px 2px var(--color-surface-main), 0px 0px 0px 4px var(--color-amber-300)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <Icon
              size={20}
              strokeWidth={1.5}
              color={copied === name ? 'var(--color-foreground-brand-main)' : 'var(--color-text-main)'}
            />
            <span style={{
              fontSize: '10px',
              lineHeight: '1.3',
              color: copied === name ? 'var(--color-foreground-brand-main)' : 'var(--color-text-moderate)',
              wordBreak: 'break-word',
              maxWidth: '100%',
            }}>
              {copied === name ? 'Copied!' : name}
            </span>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: 'var(--space-page-inset-xl)',
          color: 'var(--color-text-moderate)',
          fontSize: 'var(--font-size-s)',
        }}>
          No icons found for &ldquo;{search}&rdquo;
        </div>
      )}
    </div>
  );
}
