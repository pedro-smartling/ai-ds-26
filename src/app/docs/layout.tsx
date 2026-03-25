'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/components/Logo';
import { useTheme } from '@/app/theme-provider';
import { Sun, Moon, Menu, X } from 'lucide-react';

interface NavItem {
  label: string;
  href?: string;
  children?: NavItem[];
}

const navigation: NavItem[] = [
  { label: 'Overview', href: '/docs' },
  { label: 'Tokens', href: '/docs/tokens' },
  {
    label: 'Atoms',
    children: [
      { label: 'Icons', href: '/docs/atoms/icons' },
    ],
  },
  {
    label: 'Components',
    children: [
      { label: 'Input', href: '/docs/components/input' },
    ],
  },
];

function SidebarLink({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const isActive = item.href === pathname || (item.href !== '/docs' && pathname.startsWith(item.href ?? '~~'));

  return (
    <Link
      href={item.href!}
      style={{
        display: 'block',
        padding: 'var(--dimension-tier-3) var(--dimension-tier-6)',
        fontSize: 'var(--font-size-s)',
        fontWeight: isActive ? 'var(--font-weight-body-strongest)' : 'var(--font-weight-body)',
        color: isActive ? 'var(--color-foreground-brand-main)' : 'var(--color-text-soft)',
        backgroundColor: isActive ? 'var(--color-surface-brand-main)' : 'transparent',
        borderRadius: 'var(--radius-s)',
        textDecoration: 'none',
        transition: 'background-color 0.1s, color 0.1s',
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.backgroundColor = 'var(--color-surface-main-hover)';
          e.currentTarget.style.color = 'var(--color-text-main)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = 'var(--color-text-soft)';
        }
      }}
    >
      {item.label}
    </Link>
  );
}

function Sidebar({ onClose }: { onClose?: () => void }) {
  return (
    <nav style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--dimension-tier-7)',
      padding: 'var(--space-page-inset-m)',
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/docs" style={{ textDecoration: 'none' }}>
          <Logo />
        </Link>
        {onClose && (
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-moderate)', display: 'flex', padding: '4px' }}>
            <X width={20} height={20} />
          </button>
        )}
      </div>

      {/* Label */}
      <div>
        <p style={{
          fontSize: 'var(--font-size-xs)',
          fontWeight: 'var(--font-weight-body-strongest)',
          color: 'var(--color-text-moderate)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: 'var(--dimension-tier-3)',
          padding: '0 var(--dimension-tier-6)',
        }}>
          Design System
        </p>
      </div>

      {/* Nav items */}
      {navigation.map((item) => (
        <div key={item.label}>
          {item.href ? (
            <SidebarLink item={item} />
          ) : (
            <div>
              <p style={{
                fontSize: 'var(--font-size-xs)',
                fontWeight: 'var(--font-weight-body-strongest)',
                color: 'var(--color-text-moderate)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                margin: '0 0 var(--dimension-tier-3)',
                padding: '0 var(--dimension-tier-6)',
              }}>
                {item.label}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-tier-1)' }}>
                {item.children?.map((child) => (
                  <SidebarLink key={child.href} item={child} />
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isDark = theme === 'dark';

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: 'var(--color-surface-soft)',
    }}>
      {/* Desktop sidebar */}
      <aside style={{
        width: '240px',
        flexShrink: 0,
        borderRight: '1px solid var(--color-border-soft)',
        backgroundColor: 'var(--color-surface-main)',
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflowY: 'auto',
        display: 'none',
      }}
        className="docs-sidebar"
      >
        <Sidebar />
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 'var(--z-index-tier-7)', display: 'flex' }}>
          <div style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' }} onClick={() => setMobileOpen(false)} />
          <div style={{
            width: '280px',
            backgroundColor: 'var(--color-surface-main)',
            height: '100%',
            overflowY: 'auto',
            position: 'fixed',
            left: 0,
            top: 0,
          }}>
            <Sidebar onClose={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top bar */}
        <header style={{
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 var(--space-page-inset-m)',
          borderBottom: '1px solid var(--color-border-soft)',
          backgroundColor: 'var(--color-surface-main)',
          position: 'sticky',
          top: 0,
          zIndex: 'var(--z-index-tier-2)',
        }}>
          {/* Mobile menu + logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--dimension-tier-6)' }}>
            <button
              onClick={() => setMobileOpen(true)}
              className="docs-mobile-menu"
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'var(--color-text-moderate)', display: 'flex', padding: '4px',
              }}
            >
              <Menu width={20} height={20} />
            </button>
            <span style={{ fontSize: 'var(--font-size-s)', fontWeight: 'var(--font-weight-body-strongest)', color: 'var(--color-text-moderate)' }}>
              UI Kit Docs
            </span>
          </div>

          {/* Theme toggle */}
          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            aria-label="Toggle theme"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--dimension-tier-3)',
              padding: 'var(--dimension-tier-3) var(--dimension-tier-6)',
              fontSize: 'var(--font-size-xs)',
              fontWeight: 'var(--font-weight-body-strong)',
              color: 'var(--color-text-soft)',
              backgroundColor: 'var(--color-surface-soft)',
              border: '1px solid var(--color-border-soft)',
              borderRadius: 'var(--radius-m)',
              cursor: 'pointer',
              transition: 'background-color 0.15s',
              fontFamily: 'var(--font-family-base)',
            }}
          >
            {isDark ? <Sun width={14} height={14} /> : <Moon width={14} height={14} />}
            {isDark ? 'Light' : 'Dark'}
          </button>
        </header>

        {/* Content */}
        <main style={{
          flex: 1,
          padding: 'var(--space-page-inset-xl) var(--space-page-inset-l)',
          maxWidth: '880px',
          width: '100%',
          margin: '0 auto',
          boxSizing: 'border-box',
        }}>
          {children}
        </main>
      </div>

      {/* Sidebar CSS */}
      <style>{`
        @media (min-width: 768px) {
          .docs-sidebar { display: block !important; }
          .docs-mobile-menu { display: none !important; }
        }
      `}</style>
    </div>
  );
}
