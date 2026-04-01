'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Logo from '@/components/Logo';
import { useTheme } from '@/app/theme-provider';
import { Sun, Moon, Menu, X, Search } from 'lucide-react';

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
      { label: 'Avatar', href: '/docs/atoms/avatar' },
      { label: 'Base Checkbox', href: '/docs/atoms/base-checkbox' },
      { label: 'Base Radio', href: '/docs/atoms/base-radio' },
      { label: 'Base Tag', href: '/docs/atoms/base-tag' },
      { label: 'Base Submenu', href: '/docs/atoms/base-submenu' },
      { label: 'Base Submenu Item', href: '/docs/atoms/base-submenu-item' },
      { label: 'Base Toggle', href: '/docs/atoms/base-toggle' },
      { label: 'Base Tooltip', href: '/docs/atoms/base-tooltip' },
      { label: 'Featured Icon', href: '/docs/atoms/featured-icon' },
      { label: 'Icons', href: '/docs/atoms/icons' },
      { label: 'Logos', href: '/docs/atoms/logos' },
    ],
  },
  {
    label: 'Components',
    children: [
      { label: 'Accordion', href: '/docs/components/accordion' },
      { label: 'Badge', href: '/docs/components/badge' },
      { label: 'Button Group', href: '/docs/components/button-group' },
      { label: 'Buttons', href: '/docs/components/buttons' },
      { label: 'Card', href: '/docs/components/card' },
      { label: 'Checkbox', href: '/docs/components/checkbox' },
      { label: 'Dropdown', href: '/docs/components/dropdown' },
      { label: 'Float Notification', href: '/docs/components/float-notification' },
      { label: 'Input', href: '/docs/components/input' },
      { label: 'Link', href: '/docs/components/link' },
      { label: 'Modal', href: '/docs/components/modal' },
      { label: 'Multi-Select', href: '/docs/components/multi-select' },
      { label: 'Progress Bar', href: '/docs/components/progress-bar' },
      { label: 'Radio', href: '/docs/components/radio' },
      { label: 'Section Message', href: '/docs/components/section-message' },
      { label: 'Single Select', href: '/docs/components/single-select' },
      { label: 'Steps', href: '/docs/components/steps' },
      { label: 'Table', href: '/docs/components/table' },
      { label: 'Tag', href: '/docs/components/tag' },
      { label: 'Tabs', href: '/docs/components/tabs' },
      { label: 'Toast', href: '/docs/components/toast' },
      { label: 'Tooltip', href: '/docs/components/tooltip' },
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

/* ── Flatten all nav items for search ─────────────────────────────── */
function getAllPages(): { label: string; href: string; category: string }[] {
  const pages: { label: string; href: string; category: string }[] = [];
  navigation.forEach((item) => {
    if (item.href) {
      pages.push({ label: item.label, href: item.href, category: 'Pages' });
    }
    if (item.children) {
      item.children.forEach((child) => {
        if (child.href) {
          pages.push({ label: child.label, href: child.href, category: item.label });
        }
      });
    }
  });
  return pages;
}

const allPages = getAllPages();

/* ── Search Dialog ───────────────────────────────────────────────── */
function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const filtered = query.trim()
    ? allPages.filter((p) => p.label.toLowerCase().includes(query.toLowerCase()))
    : allPages;

  // Group by category
  const groups: Record<string, typeof filtered> = {};
  filtered.forEach((p) => {
    if (!groups[p.category]) groups[p.category] = [];
    groups[p.category].push(p);
  });
  const flatFiltered = filtered;

  useEffect(() => {
    if (open) {
      setQuery('');
      setActiveIdx(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  useEffect(() => { setActiveIdx(0); }, [query]);

  const navigate = useCallback((href: string) => {
    onClose();
    router.push(href);
  }, [onClose, router]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, flatFiltered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && flatFiltered[activeIdx]) {
      e.preventDefault();
      navigate(flatFiltered[activeIdx].href);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 80 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(2px)' }} />

      {/* Dialog */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: 560,
          maxWidth: 'calc(100vw - 32px)',
          maxHeight: 'min(480px, calc(100vh - 160px))',
          backgroundColor: 'var(--color-surface-main)',
          border: '1px solid var(--color-border-soft)',
          borderRadius: 'var(--radius-l)',
          boxShadow: '0px 8px 8px -4px rgba(16, 24, 41, 0.03), 0px 20px 24px -4px rgba(16, 24, 41, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'clip',
        }}
      >
        {/* Search input */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-page-inside-xs)',
          padding: 'var(--space-page-inside-m)',
          borderBottom: '1px solid var(--color-border-soft)',
        }}>
          <Search width={20} height={20} style={{ flexShrink: 0, color: 'var(--color-foreground-moderate)' }} />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search components, atoms, tokens..."
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontFamily: 'var(--font-family-base)',
              fontWeight: 'var(--font-weight-body)',
              fontSize: 'var(--font-size-m)',
              lineHeight: 'var(--line-height-body-m)',
              color: 'var(--color-text-main)',
              backgroundColor: 'transparent',
              padding: 0,
            }}
          />
          <kbd style={{
            fontFamily: 'var(--font-family-base)',
            fontSize: 'var(--font-size-xs)',
            fontWeight: 'var(--font-weight-body-strong)',
            color: 'var(--color-text-moderate)',
            backgroundColor: 'var(--color-surface-soft)',
            border: '1px solid var(--color-border-soft)',
            borderRadius: 'var(--radius-xs)',
            padding: '2px 6px',
          }}>
            Esc
          </kbd>
        </div>

        {/* Results */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--space-page-inside-xxs) 0' }}>
          {flatFiltered.length === 0 ? (
            <div style={{
              padding: 'var(--space-page-inside-xl)',
              textAlign: 'center',
              fontFamily: 'var(--font-family-base)',
              fontSize: 'var(--font-size-s)',
              color: 'var(--color-text-moderate)',
            }}>
              No results for &ldquo;{query}&rdquo;
            </div>
          ) : (
            Object.entries(groups).map(([category, items]) => (
              <div key={category}>
                <div style={{
                  padding: 'var(--space-page-inside-xs) var(--space-page-inside-m)',
                  fontSize: 'var(--font-size-xs)',
                  fontWeight: 'var(--font-weight-body-strongest)',
                  color: 'var(--color-text-moderate)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  fontFamily: 'var(--font-family-base)',
                }}>
                  {category}
                </div>
                {items.map((item) => {
                  const idx = flatFiltered.indexOf(item);
                  const isActive = idx === activeIdx;
                  return (
                    <div
                      key={item.href}
                      onClick={() => navigate(item.href)}
                      onMouseEnter={() => setActiveIdx(idx)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-page-inside-xs)',
                        padding: 'var(--space-page-inside-xs) var(--space-page-inside-m)',
                        margin: '0 var(--space-page-inside-xxs)',
                        borderRadius: 'var(--radius-s)',
                        cursor: 'pointer',
                        backgroundColor: isActive ? 'var(--color-surface-main-hover)' : undefined,
                        fontFamily: 'var(--font-family-base)',
                        fontSize: 'var(--font-size-s)',
                        fontWeight: 'var(--font-weight-body)',
                        color: isActive ? 'var(--color-text-main)' : 'var(--color-text-soft)',
                        transition: 'background-color 0.1s',
                      }}
                    >
                      <Search width={14} height={14} style={{ flexShrink: 0, color: 'var(--color-foreground-moderate)' }} />
                      {item.label}
                      {isActive && (
                        <span style={{ marginLeft: 'auto', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-moderate)' }}>
                          ↵
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-page-inside-m)',
          padding: 'var(--space-page-inside-xs) var(--space-page-inside-m)',
          borderTop: '1px solid var(--color-border-soft)',
          fontSize: 'var(--font-size-xs)',
          color: 'var(--color-text-moderate)',
          fontFamily: 'var(--font-family-base)',
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <kbd style={{ fontSize: 10, backgroundColor: 'var(--color-surface-soft)', border: '1px solid var(--color-border-soft)', borderRadius: 'var(--radius-xs)', padding: '1px 4px' }}>↑</kbd>
            <kbd style={{ fontSize: 10, backgroundColor: 'var(--color-surface-soft)', border: '1px solid var(--color-border-soft)', borderRadius: 'var(--radius-xs)', padding: '1px 4px' }}>↓</kbd>
            Navigate
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <kbd style={{ fontSize: 10, backgroundColor: 'var(--color-surface-soft)', border: '1px solid var(--color-border-soft)', borderRadius: 'var(--radius-xs)', padding: '1px 4px' }}>↵</kbd>
            Open
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <kbd style={{ fontSize: 10, backgroundColor: 'var(--color-surface-soft)', border: '1px solid var(--color-border-soft)', borderRadius: 'var(--radius-xs)', padding: '1px 4px' }}>Esc</kbd>
            Close
          </span>
        </div>
      </div>
    </div>
  );
}

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Global Cmd+K / Ctrl+K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

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

          {/* Search trigger */}
          <button
            onClick={() => setSearchOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--dimension-tier-5)',
              padding: 'var(--dimension-tier-4) var(--dimension-tier-6)',
              fontSize: 'var(--font-size-s)',
              fontWeight: 'var(--font-weight-body)',
              color: 'var(--color-text-moderate)',
              backgroundColor: 'var(--color-surface-soft)',
              border: '1px solid var(--color-border-soft)',
              borderRadius: 'var(--radius-m)',
              cursor: 'pointer',
              fontFamily: 'var(--font-family-base)',
              transition: 'background-color 0.15s, border-color 0.15s',
              minWidth: 220,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-border-main)';
              e.currentTarget.style.backgroundColor = 'var(--color-surface-main)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-border-soft)';
              e.currentTarget.style.backgroundColor = 'var(--color-surface-soft)';
            }}
          >
            <Search width={14} height={14} style={{ flexShrink: 0 }} />
            <span style={{ flex: 1, textAlign: 'left' }}>Search...</span>
            <kbd style={{
              fontSize: 'var(--font-size-xs)',
              fontWeight: 'var(--font-weight-body-strong)',
              color: 'var(--color-text-moderate)',
              backgroundColor: 'var(--color-surface-main)',
              border: '1px solid var(--color-border-soft)',
              borderRadius: 'var(--radius-xs)',
              padding: '1px 6px',
              fontFamily: 'var(--font-family-base)',
            }}>
              ⌘K
            </kbd>
          </button>

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
          maxWidth: '1024px',
          width: '100%',
          margin: '0 auto',
          boxSizing: 'border-box',
        }}>
          {children}
        </main>
      </div>

      {/* Search dialog */}
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />

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
