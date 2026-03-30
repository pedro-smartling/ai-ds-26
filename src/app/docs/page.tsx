import React from 'react';
import Link from 'next/link';
import { getComponents, getAtoms, countTokens, checkCoverage } from '@/lib/registry';
import { getRecentCommits, getRecentPRs, isGitHubConfigured } from '@/lib/github';
import { Layers, Atom, Palette, LayoutGrid, GitCommit, GitPullRequest, Eye, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';

/* ── Data ─────────────────────────────────────────────────────────────── */

async function getDashboardData() {
  const components = getComponents();
  const atoms = getAtoms();
  const tokens = countTokens();
  const coverage = checkCoverage();
  const totalVariants = [...components, ...atoms].reduce((sum, p) => sum + p.sectionCount, 0);
  const [commits, prs] = await Promise.all([getRecentCommits(), getRecentPRs()]);

  let pageviews: { path: string; count: number }[] = [];
  try {
    const fs = await import('fs');
    const path = await import('path');
    const raw = fs.readFileSync(path.join(process.cwd(), 'data/pageviews.json'), 'utf-8');
    const data = JSON.parse(raw) as Record<string, number>;
    pageviews = Object.entries(data).sort(([, a], [, b]) => b - a).slice(0, 7).map(([p, count]) => ({ path: p, count }));
  } catch { /* empty */ }

  return { components, atoms, tokens, coverage, totalVariants, commits, prs, pageviews, githubConfigured: isGitHubConfigured() };
}

/* ── Shared styles ────────────────────────────────────────────────────── */

const card: React.CSSProperties = {
  backgroundColor: 'var(--color-surface-main)',
  border: '1px solid var(--color-border-soft)',
  borderRadius: 'var(--radius-l)',
  padding: 'var(--dimension-tier-9)',
};

const labelStyle: React.CSSProperties = {
  fontSize: 'var(--font-size-xs)',
  fontWeight: 'var(--font-weight-body-strongest)',
  color: 'var(--color-text-moderate)',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  margin: 0,
};

/* ── Sub-components ───────────────────────────────────────────────────── */

function FeaturedIconBadge({ children, bg, color }: { children: React.ReactNode; bg: string; color: string }) {
  return (
    <div style={{
      width: 'var(--size-actions-2xl)',
      height: 'var(--size-actions-2xl)',
      borderRadius: 'var(--radius-l)',
      backgroundColor: bg,
      color,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }}>
      {children}
    </div>
  );
}

function KpiCard({ label, value, sub, icon, iconBg, iconColor }: {
  label: string; value: string | number; sub?: string;
  icon: React.ReactNode; iconBg: string; iconColor: string;
}) {
  return (
    <div style={{ ...card, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div>
        <p style={{ ...labelStyle, marginBottom: 'var(--dimension-tier-5)' }}>{label}</p>
        <p style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 'var(--font-weight-heading)', color: 'var(--color-text-main)', margin: 0, lineHeight: 1.1 }}>
          {value}
        </p>
        {sub && (
          <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-moderate)', margin: 'var(--dimension-tier-4) 0 0', lineHeight: 'var(--line-height-body-xs)' }}>
            {sub}
          </p>
        )}
      </div>
      <FeaturedIconBadge bg={iconBg} color={iconColor}>{icon}</FeaturedIconBadge>
    </div>
  );
}

function SectionHeading({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <div style={{ marginBottom: 'var(--dimension-tier-7)' }}>
      <h2 style={{ fontSize: 'var(--font-size-l)', fontWeight: 'var(--font-weight-heading)', color: 'var(--color-text-main)', margin: 0 }}>
        {children}
      </h2>
      {sub && <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-moderate)', margin: 'var(--dimension-tier-2) 0 0' }}>{sub}</p>}
    </div>
  );
}

function Bar({ value, max, color }: { value: number; max: number; color?: string }) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div style={{ width: '100%', height: 'var(--dimension-tier-4)', backgroundColor: 'var(--color-surface-moderate)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
      <div style={{ width: `${Math.min(100, pct)}%`, height: '100%', backgroundColor: color || 'var(--color-surface-brand-solid)', borderRadius: 'var(--radius-full)', transition: 'width 0.3s' }} />
    </div>
  );
}

function TimeAgo({ date }: { date: string }) {
  const d = new Date(date);
  const now = new Date();
  const diff = Math.floor((now.getTime() - d.getTime()) / 1000);
  if (diff < 60) return <span>just now</span>;
  if (diff < 3600) return <span>{Math.floor(diff / 60)}m ago</span>;
  if (diff < 86400) return <span>{Math.floor(diff / 3600)}h ago</span>;
  return <span>{Math.floor(diff / 86400)}d ago</span>;
}

/* ── Page ─────────────────────────────────────────────────────────────── */

export default async function DocsOverview() {
  const { components, atoms, tokens, coverage, totalVariants, commits, prs, pageviews, githubConfigured } = await getDashboardData();
  const allPages = [...components, ...atoms];
  const maxSections = Math.max(...allPages.map((p) => p.sectionCount), 1);

  return (
    <div>
      {/* ── Header ───────────────────────────────────────────────────── */}
      <div style={{ marginBottom: 'var(--space-page-inset-xl)' }}>
        <h1 style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 'var(--font-weight-heading)', color: 'var(--color-text-main)', margin: '0 0 var(--dimension-tier-5)' }}>
          UI Kit
        </h1>
        <p style={{ fontSize: 'var(--font-size-s)', color: 'var(--color-text-moderate)', margin: 0, lineHeight: 'var(--line-height-body-s)', maxWidth: 600 }}>
          Design token foundation and component library. Tokens from Figma feed into semantic aliases powering light and dark themes.
        </p>
      </div>

      {/* ── KPI Cards ────────────────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--dimension-tier-6)', marginBottom: 'var(--dimension-tier-9)' }}>
        <KpiCard label="Components" value={components.length} sub={`${totalVariants} demo sections`} icon={<Layers size={20} />} iconBg="var(--color-surface-brand-moderate)" iconColor="var(--color-foreground-brand-main)" />
        <KpiCard label="Atoms" value={atoms.length} sub="foundational elements" icon={<Atom size={20} />} iconBg="var(--color-surface-success-moderate)" iconColor="var(--color-foreground-success-main)" />
        <KpiCard label="Design Tokens" value={tokens.total} sub={`${tokens.color} color · ${tokens.spacing} spacing`} icon={<Palette size={20} />} iconBg="var(--color-surface-warning-moderate)" iconColor="var(--color-foreground-warning-soft)" />
        <KpiCard label="Coverage" value={`${coverage.percentage}%`} sub={`${coverage.items.filter(i => i.hasDescription && i.hasPropsTable && i.hasDemo).length}/${coverage.items.length} complete`} icon={<CheckCircle size={20} />} iconBg="var(--color-surface-success-moderate)" iconColor="var(--color-foreground-success-main)" />
      </div>

      {/* ── Token Breakdown (like MT Engine Comparison) ───────────────── */}
      <div style={{ ...card, marginBottom: 'var(--dimension-tier-9)' }}>
        <SectionHeading sub="Distribution across categories">Token Breakdown</SectionHeading>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 'var(--dimension-tier-6)' }}>
          {[
            { label: 'Color', count: tokens.color, color: 'var(--color-surface-brand-solid)' },
            { label: 'Spacing', count: tokens.spacing, color: 'var(--color-surface-success-solid)' },
            { label: 'Typography', count: tokens.typography, color: 'var(--color-surface-warning-solid)' },
            { label: 'Elevation', count: tokens.elevation, color: 'var(--color-foreground-moderate)' },
            { label: 'Other', count: tokens.other, color: 'var(--color-foreground-strong)' },
          ].map((t) => (
            <div key={t.label} style={{ backgroundColor: 'var(--color-surface-soft)', borderRadius: 'var(--radius-m)', padding: 'var(--dimension-tier-7)' }}>
              <p style={{ fontSize: 'var(--font-size-s)', fontWeight: 'var(--font-weight-heading)', color: 'var(--color-text-main)', margin: 0 }}>{t.label}</p>
              <p style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 'var(--font-weight-heading)', color: 'var(--color-text-main)', margin: 'var(--dimension-tier-3) 0 var(--dimension-tier-5)', lineHeight: 1.1 }}>{t.count}</p>
              <Bar value={t.count} max={tokens.color} color={t.color} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Component Library Table (like Performance by Language) ─────── */}
      <div style={{ ...card, marginBottom: 'var(--dimension-tier-9)', overflow: 'hidden', padding: 0 }}>
        <div style={{ padding: 'var(--dimension-tier-9) var(--dimension-tier-9) var(--dimension-tier-7)' }}>
          <SectionHeading sub={`${allPages.length} documented pages`}>Component Library</SectionHeading>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-family-base)', fontSize: 'var(--font-size-s)' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border-soft)' }}>
                {['Name', 'Type', 'Sections', 'Coverage', 'Status'].map((h) => (
                  <th key={h} style={{
                    ...labelStyle,
                    padding: 'var(--dimension-tier-5) var(--dimension-tier-7)',
                    textAlign: h === 'Sections' || h === 'Status' ? 'center' : 'left',
                    backgroundColor: 'var(--color-surface-moderate)',
                    fontWeight: 'var(--font-weight-body-strongest)',
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allPages.map((page) => {
                const cov = coverage.items.find((i) => i.href === page.href);
                const complete = cov ? cov.hasDescription && cov.hasPropsTable && cov.hasDemo : false;
                const isComponent = page.href.includes('/components/');
                return (
                  <tr key={page.href} style={{ borderBottom: '1px solid var(--color-border-soft)' }}>
                    <td style={{ padding: 'var(--dimension-tier-6) var(--dimension-tier-7)', verticalAlign: 'middle' }}>
                      <Link href={page.href} style={{ textDecoration: 'none', color: 'var(--color-text-main)', fontWeight: 'var(--font-weight-body-strong)', display: 'flex', alignItems: 'center', gap: 'var(--dimension-tier-5)' }}>
                        <span style={{
                          width: 'var(--dimension-tier-11)',
                          height: 'var(--dimension-tier-11)',
                          borderRadius: 'var(--radius-m)',
                          backgroundColor: isComponent ? 'var(--color-surface-brand-main)' : 'var(--color-surface-success-main)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          flexShrink: 0,
                          color: isComponent ? 'var(--color-foreground-brand-main)' : 'var(--color-foreground-success-main)',
                        }}>
                          {isComponent ? <LayoutGrid size={14} /> : <Atom size={14} />}
                        </span>
                        {page.name}
                      </Link>
                    </td>
                    <td style={{ padding: 'var(--dimension-tier-6) var(--dimension-tier-7)', verticalAlign: 'middle' }}>
                      <span style={{
                        fontSize: 'var(--font-size-xs)',
                        fontWeight: 'var(--font-weight-body-strong)',
                        color: isComponent ? 'var(--color-foreground-brand-main)' : 'var(--color-foreground-success-main)',
                        backgroundColor: isComponent ? 'var(--color-surface-brand-main)' : 'var(--color-surface-success-main)',
                        padding: 'var(--dimension-tier-1) var(--dimension-tier-4)',
                        borderRadius: 'var(--radius-xs)',
                      }}>
                        {isComponent ? 'Component' : 'Atom'}
                      </span>
                    </td>
                    <td style={{ padding: 'var(--dimension-tier-6) var(--dimension-tier-7)', textAlign: 'center', verticalAlign: 'middle' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--dimension-tier-5)', justifyContent: 'center' }}>
                        <div style={{ width: 80 }}>
                          <Bar value={page.sectionCount} max={maxSections} color="var(--color-surface-brand-solid)" />
                        </div>
                        <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-moderate)', minWidth: 16, textAlign: 'right' }}>{page.sectionCount}</span>
                      </div>
                    </td>
                    <td style={{ padding: 'var(--dimension-tier-6) var(--dimension-tier-7)', verticalAlign: 'middle' }}>
                      <div style={{ display: 'flex', gap: 'var(--dimension-tier-3)', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-moderate)' }}>
                        {cov && (
                          <>
                            <span style={{ color: cov.hasDescription ? 'var(--color-green-500)' : 'var(--color-neutral-300)' }} title="Description">Desc</span>
                            <span style={{ color: cov.hasPropsTable ? 'var(--color-green-500)' : 'var(--color-neutral-300)' }} title="Props table">Props</span>
                            <span style={{ color: cov.hasDemo ? 'var(--color-green-500)' : 'var(--color-neutral-300)' }} title="Demo">Demo</span>
                          </>
                        )}
                      </div>
                    </td>
                    <td style={{ padding: 'var(--dimension-tier-6) var(--dimension-tier-7)', textAlign: 'center', verticalAlign: 'middle' }}>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: 'var(--dimension-tier-3)',
                        fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-heading)',
                        color: complete ? 'var(--color-foreground-success-main)' : 'var(--color-foreground-warning-soft)',
                        backgroundColor: complete ? 'var(--color-surface-success-main)' : 'var(--color-surface-warning-main)',
                        padding: 'var(--dimension-tier-2) var(--dimension-tier-5)',
                        borderRadius: 'var(--radius-full)',
                      }}>
                        {complete ? <CheckCircle size={12} /> : <AlertTriangle size={12} />}
                        {complete ? 'Complete' : 'Incomplete'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Activity + Most Visited (side by side) ────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--dimension-tier-6)', marginBottom: 'var(--dimension-tier-9)' }}>

        {/* GitHub Activity */}
        <div style={card}>
          <SectionHeading sub="From GitHub">Recent Activity</SectionHeading>
          {!githubConfigured ? (
            <div style={{ padding: 'var(--dimension-tier-7) 0', textAlign: 'center', backgroundColor: 'var(--color-surface-soft)', borderRadius: 'var(--radius-m)', marginTop: 'var(--dimension-tier-5)' }}>
              <GitCommit size={24} style={{ color: 'var(--color-foreground-strong)', marginBottom: 'var(--dimension-tier-5)' }} />
              <p style={{ fontSize: 'var(--font-size-s)', color: 'var(--color-text-moderate)', margin: '0 0 var(--dimension-tier-2)' }}>Connect GitHub to see activity</p>
              <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-strong)', margin: 0 }}>Set GITHUB_TOKEN in .env.local</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-tier-7)' }}>
              {commits && commits.length > 0 && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--dimension-tier-3)', marginBottom: 'var(--dimension-tier-5)' }}>
                    <GitCommit size={14} style={{ color: 'var(--color-foreground-moderate)' }} />
                    <p style={labelStyle}>Commits</p>
                  </div>
                  {commits.map((c) => (
                    <a key={c.sha} href={c.url} target="_blank" rel="noopener noreferrer" style={{
                      display: 'flex', alignItems: 'baseline', gap: 'var(--dimension-tier-5)',
                      fontSize: 'var(--font-size-xs)', textDecoration: 'none', color: 'var(--color-text-soft)',
                      padding: 'var(--dimension-tier-4) 0', borderBottom: '1px solid var(--color-border-soft)',
                    }}>
                      <code style={{ fontFamily: 'monospace', color: 'var(--color-foreground-brand-main)', flexShrink: 0 }}>{c.sha}</code>
                      <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.message}</span>
                      <span style={{ color: 'var(--color-text-moderate)', flexShrink: 0 }}><TimeAgo date={c.date} /></span>
                    </a>
                  ))}
                </div>
              )}
              {prs && prs.length > 0 && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--dimension-tier-3)', marginBottom: 'var(--dimension-tier-5)' }}>
                    <GitPullRequest size={14} style={{ color: 'var(--color-foreground-moderate)' }} />
                    <p style={labelStyle}>Merged PRs</p>
                  </div>
                  {prs.map((pr) => (
                    <a key={pr.number} href={pr.url} target="_blank" rel="noopener noreferrer" style={{
                      display: 'flex', alignItems: 'baseline', gap: 'var(--dimension-tier-5)',
                      fontSize: 'var(--font-size-xs)', textDecoration: 'none', color: 'var(--color-text-soft)',
                      padding: 'var(--dimension-tier-4) 0', borderBottom: '1px solid var(--color-border-soft)',
                    }}>
                      <code style={{ fontFamily: 'monospace', color: 'var(--color-foreground-brand-main)', flexShrink: 0 }}>#{pr.number}</code>
                      <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{pr.title}</span>
                      <span style={{ color: 'var(--color-text-moderate)', flexShrink: 0 }}><TimeAgo date={pr.mergedAt} /></span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Most Visited */}
        <div style={card}>
          <SectionHeading sub="Page view tracking">Most Visited</SectionHeading>
          {pageviews.length === 0 ? (
            <div style={{ padding: 'var(--dimension-tier-7) 0', textAlign: 'center', backgroundColor: 'var(--color-surface-soft)', borderRadius: 'var(--radius-m)', marginTop: 'var(--dimension-tier-5)' }}>
              <Eye size={24} style={{ color: 'var(--color-foreground-strong)', marginBottom: 'var(--dimension-tier-5)' }} />
              <p style={{ fontSize: 'var(--font-size-s)', color: 'var(--color-text-moderate)', margin: '0 0 var(--dimension-tier-2)' }}>No views recorded yet</p>
              <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-strong)', margin: 0 }}>Views are tracked as you browse pages</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {pageviews.map((pv, i) => {
                const maxCount = pageviews[0]?.count || 1;
                const name = pv.path.split('/').pop()?.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') || pv.path;
                return (
                  <Link key={pv.path} href={pv.path} style={{ textDecoration: 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--dimension-tier-5)', padding: 'var(--dimension-tier-5) 0', borderBottom: '1px solid var(--color-border-soft)' }}>
                      <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-body-strongest)', color: 'var(--color-text-moderate)', width: 20, textAlign: 'right', flexShrink: 0 }}>
                        {i + 1}
                      </span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: 'var(--font-size-s)', fontWeight: 'var(--font-weight-body-strong)', color: 'var(--color-text-soft)', margin: '0 0 var(--dimension-tier-2)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {name}
                        </p>
                        <Bar value={pv.count} max={maxCount} />
                      </div>
                      <span style={{ fontSize: 'var(--font-size-s)', fontWeight: 'var(--font-weight-heading)', color: 'var(--color-text-main)', flexShrink: 0 }}>
                        {pv.count}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ── Quick Links ───────────────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--dimension-tier-6)' }}>
        {[
          { title: 'Components', items: components, color: 'var(--color-foreground-brand-main)', bg: 'var(--color-surface-brand-main)', href: '/docs/components' },
          { title: 'Atoms', items: atoms, color: 'var(--color-foreground-success-main)', bg: 'var(--color-surface-success-main)', href: '/docs/atoms' },
        ].map((group) => (
          <div key={group.title} style={card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--dimension-tier-7)' }}>
              <h2 style={{ fontSize: 'var(--font-size-l)', fontWeight: 'var(--font-weight-heading)', color: 'var(--color-text-main)', margin: 0 }}>{group.title}</h2>
              <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-body-strongest)', color: 'var(--color-text-moderate)', backgroundColor: 'var(--color-surface-moderate)', padding: 'var(--dimension-tier-2) var(--dimension-tier-5)', borderRadius: 'var(--radius-full)' }}>
                {group.items.length}
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-tier-2)' }}>
              {group.items.map((item) => (
                <Link key={item.href} href={item.href} style={{
                  textDecoration: 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: 'var(--dimension-tier-5) var(--dimension-tier-6)',
                  borderRadius: 'var(--radius-m)',
                }}>
                  <span style={{ fontSize: 'var(--font-size-s)', fontWeight: 'var(--font-weight-body-strong)', color: 'var(--color-text-soft)' }}>{item.name}</span>
                  <ArrowRight size={14} style={{ color: 'var(--color-foreground-strong)' }} />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
