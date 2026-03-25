'use client';

import React, { useState, useRef, useEffect } from 'react';

export interface DropdownItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  dividerAfter?: boolean;
}

interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  onSelect?: (item: DropdownItem) => void;
  align?: 'left' | 'right';
  width?: number | string;
}

export default function Dropdown({ trigger, items, onSelect, align = 'left', width = 200 }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={containerRef} style={{ position: 'relative', display: 'inline-block' }}>
      <div onClick={() => setOpen((o) => !o)} style={{ cursor: 'pointer' }}>
        {trigger}
      </div>
      {open && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + var(--dimension-tier-3))',
            [align === 'right' ? 'right' : 'left']: 0,
            width: typeof width === 'number' ? `${width}px` : width,
            backgroundColor: 'var(--color-surface-main)',
            border: '1px solid var(--color-border-soft)',
            borderRadius: 'var(--radius-m)',
            boxShadow: 'var(--shadow-l)',
            zIndex: 'var(--z-index-tier-5)',
            overflow: 'hidden',
            padding: 'var(--dimension-tier-3)',
          }}
          role="menu"
        >
          {items.map((item, idx) => (
            <React.Fragment key={item.id}>
              <button
                role="menuitem"
                disabled={item.disabled}
                onClick={() => {
                  if (item.disabled) return;
                  onSelect?.(item);
                  setOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--dimension-tier-5)',
                  width: '100%',
                  padding: 'var(--dimension-tier-5) var(--dimension-tier-6)',
                  fontSize: 'var(--font-size-s)',
                  fontFamily: 'var(--font-family-base)',
                  fontWeight: 'var(--font-weight-body)',
                  color: item.disabled ? 'var(--color-text-disabled)' : 'var(--color-text-main)',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderRadius: 'var(--radius-xs)',
                  cursor: item.disabled ? 'not-allowed' : 'pointer',
                  textAlign: 'left',
                  transition: 'background-color 0.1s',
                }}
                onMouseEnter={(e) => {
                  if (!item.disabled) e.currentTarget.style.backgroundColor = 'var(--color-surface-main-hover)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {item.icon && (
                  <span style={{ display: 'flex', alignItems: 'center', color: item.disabled ? 'var(--color-foreground-disabled)' : 'var(--color-foreground-soft)' }}>
                    {item.icon}
                  </span>
                )}
                {item.label}
              </button>
              {item.dividerAfter && idx < items.length - 1 && (
                <div style={{ height: '1px', backgroundColor: 'var(--color-border-soft)', margin: 'var(--dimension-tier-3) 0' }} />
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}
