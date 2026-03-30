import fs from 'fs';
import path from 'path';

const DOCS_ROOT = path.join(process.cwd(), 'src/app/docs');
const GLOBALS_CSS = path.join(process.cwd(), 'src/app/globals.css');

/* ── Directory scanner ───────────────────────────────────────────────── */

function listSubdirs(dir: string): string[] {
  try {
    return fs.readdirSync(dir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);
  } catch {
    return [];
  }
}

export interface PageEntry {
  name: string;
  slug: string;
  href: string;
  /** Proxy variant count: number of <section> blocks in the page file */
  sectionCount: number;
}

function scanCategory(category: 'components' | 'atoms'): PageEntry[] {
  const dir = path.join(DOCS_ROOT, category);
  return listSubdirs(dir).map((slug) => {
    const pagePath = path.join(dir, slug, 'page.tsx');
    let sectionCount = 0;
    try {
      const content = fs.readFileSync(pagePath, 'utf-8');
      // Check for explicit @variants comment first
      const variantsMatch = content.match(/@variants:\s*(\d+)/);
      if (variantsMatch) {
        sectionCount = parseInt(variantsMatch[1], 10);
      } else {
        // Proxy: count <section blocks (each demo section = ~1 variant showcase)
        // This is an approximation — add `// @variants: N` to page files for accuracy
        sectionCount = (content.match(/<section/g) || []).length;
      }
    } catch { /* page may not exist */ }

    const name = slug
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

    return { name, slug, href: `/docs/${category}/${slug}`, sectionCount };
  }).sort((a, b) => a.name.localeCompare(b.name));
}

export function getComponents(): PageEntry[] {
  return scanCategory('components');
}

export function getAtoms(): PageEntry[] {
  return scanCategory('atoms');
}

/* ── Token counter ───────────────────────────────────────────────────── */

export interface TokenCounts {
  color: number;
  spacing: number;
  typography: number;
  elevation: number;
  other: number;
  total: number;
}

export function countTokens(): TokenCounts {
  let css: string;
  try {
    css = fs.readFileSync(GLOBALS_CSS, 'utf-8');
  } catch {
    return { color: 0, spacing: 0, typography: 0, elevation: 0, other: 0, total: 0 };
  }

  // Only count lines that define custom properties (--name: value)
  const props = css.match(/^\s+--([\w-]+)\s*:/gm) || [];

  let color = 0, spacing = 0, typography = 0, elevation = 0, other = 0;

  for (const line of props) {
    const name = line.trim().replace(/^--/, '').replace(/:$/, '');
    if (/^color-|^blur-/.test(name)) color++;
    else if (/^dimension-|^space-|^size-|^jf-gap/.test(name)) spacing++;
    else if (/^font-|^line-height/.test(name)) typography++;
    else if (/^shadow-/.test(name)) elevation++;
    else other++; // radius, border-width, z-index, opacity, etc.
  }

  return { color, spacing, typography, elevation, other, total: props.length };
}

/* ── Coverage check ──────────────────────────────────────────────────── */

export interface CoverageItem {
  name: string;
  href: string;
  hasDescription: boolean;
  hasPropsTable: boolean;
  hasDemo: boolean;
}

export function checkCoverage(): { items: CoverageItem[]; percentage: number } {
  const all = [...getComponents(), ...getAtoms()];
  const items: CoverageItem[] = all.map((entry) => {
    const pagePath = path.join(DOCS_ROOT, entry.href.replace('/docs/', ''), 'page.tsx');
    let content = '';
    try { content = fs.readFileSync(pagePath, 'utf-8'); } catch { /* skip */ }

    return {
      name: entry.name,
      href: entry.href,
      hasDescription: /PageHeader/.test(content) && /description/.test(content),
      hasPropsTable: /PropsTable/.test(content),
      hasDemo: /PreviewBox/.test(content),
    };
  });

  const complete = items.filter((i) => i.hasDescription && i.hasPropsTable && i.hasDemo).length;
  const percentage = items.length > 0 ? Math.round((complete / items.length) * 100) : 0;

  return { items, percentage };
}
