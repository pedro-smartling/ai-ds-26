'use client';

import React, { useState } from 'react';

export type TabVariant = 'underline' | 'pill';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  badge?: string | number;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  variant?: TabVariant;
  onChange?: (tabId: string) => void;
}

export default function Tabs({ tabs, defaultTab, variant = 'underline', onChange }: TabsProps) {
  const [active, setActive] = useState(defaultTab || tabs[0]?.id);

  const handleSelect = (tab: Tab) => {
    if (tab.disabled) return;
    setActive(tab.id);
    onChange?.(tab.id);
  };

  return (
    <div>
      {variant === 'underline' && (
        <div style={{
          display: 'flex',
          borderBottom: `1px solid var(--color-border-soft)`,
          gap: 'var(--dimension-tier-1)',
        }}>
          {tabs.map((tab) => {
            const isActive = tab.id === active;
            return (
              <button
                key={tab.id}
                disabled={tab.disabled}
                onClick={() => handleSelect(tab)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--dimension-tier-3)',
                  padding: 'var(--dimension-tier-5) var(--dimension-tier-6)',
                  fontSize: 'var(--font-size-s)',
                  fontWeight: isActive ? 'var(--font-weight-body-strongest)' : 'var(--font-weight-body-strong)',
                  color: isActive
                    ? 'var(--color-foreground-brand-main)'
                    : tab.disabled
                      ? 'var(--color-text-disabled)'
                      : 'var(--color-text-moderate)',
                  background: 'none',
                  border: 'none',
                  borderBottom: isActive ? '2px solid var(--color-border-brand-main)' : '2px solid transparent',
                  cursor: tab.disabled ? 'not-allowed' : 'pointer',
                  marginBottom: '-1px',
                  transition: 'color 0.15s, border-color 0.15s',
                  fontFamily: 'var(--font-family-base)',
                  whiteSpace: 'nowrap',
                }}
              >
                {tab.icon && <span style={{ display: 'flex', alignItems: 'center' }}>{tab.icon}</span>}
                {tab.label}
                {tab.badge !== undefined && (
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: 'var(--size-icon-m)',
                    height: 'var(--size-icon-m)',
                    padding: '0 var(--dimension-tier-3)',
                    borderRadius: 'var(--radius-full)',
                    fontSize: 'var(--font-size-xs)',
                    fontWeight: 'var(--font-weight-body-strongest)',
                    backgroundColor: isActive ? 'var(--color-surface-brand-moderate)' : 'var(--color-surface-moderate)',
                    color: isActive ? 'var(--color-foreground-brand-main)' : 'var(--color-foreground-moderate)',
                  }}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {variant === 'pill' && (
        <div style={{
          display: 'flex',
          gap: 'var(--dimension-tier-3)',
          padding: 'var(--dimension-tier-3)',
          backgroundColor: 'var(--color-surface-moderate)',
          borderRadius: 'var(--radius-m)',
        }}>
          {tabs.map((tab) => {
            const isActive = tab.id === active;
            return (
              <button
                key={tab.id}
                disabled={tab.disabled}
                onClick={() => handleSelect(tab)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--dimension-tier-3)',
                  padding: 'var(--dimension-tier-3) var(--dimension-tier-6)',
                  fontSize: 'var(--font-size-s)',
                  fontWeight: isActive ? 'var(--font-weight-body-strongest)' : 'var(--font-weight-body-strong)',
                  color: isActive ? 'var(--color-text-main)' : tab.disabled ? 'var(--color-text-disabled)' : 'var(--color-text-moderate)',
                  backgroundColor: isActive ? 'var(--color-surface-main)' : 'transparent',
                  borderRadius: 'var(--radius-s)',
                  border: 'none',
                  cursor: tab.disabled ? 'not-allowed' : 'pointer',
                  transition: 'background-color 0.15s, color 0.15s',
                  fontFamily: 'var(--font-family-base)',
                  boxShadow: isActive ? 'var(--shadow-xs)' : 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                {tab.icon && <span style={{ display: 'flex', alignItems: 'center' }}>{tab.icon}</span>}
                {tab.label}
                {tab.badge !== undefined && (
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: 'var(--size-icon-m)',
                    height: 'var(--size-icon-m)',
                    padding: '0 var(--dimension-tier-3)',
                    borderRadius: 'var(--radius-full)',
                    fontSize: 'var(--font-size-xs)',
                    fontWeight: 'var(--font-weight-body-strongest)',
                    backgroundColor: isActive ? 'var(--color-surface-brand-moderate)' : 'var(--color-surface-strong)',
                    color: isActive ? 'var(--color-foreground-brand-main)' : 'var(--color-foreground-moderate)',
                  }}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
