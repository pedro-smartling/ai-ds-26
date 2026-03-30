'use client';

import React from 'react';

/* ── Wrapper ─────────────────────────────────────────────────────────── */
interface TableProps {
  children: React.ReactNode;
  className?: string;
}

export function Table({ children, className }: TableProps) {
  return (
    <div className={className} style={{ width: '100%', overflowX: 'auto' }}>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        fontFamily: 'var(--font-family-base)',
        fontSize: 'var(--font-size-s)',
        lineHeight: 'var(--line-height-body-s)',
        color: 'var(--color-text-main)',
      }}>
        {children}
      </table>
    </div>
  );
}

/* ── Head ─────────────────────────────────────────────────────────────── */
export function TableHead({ children }: { children: React.ReactNode }) {
  return <thead>{children}</thead>;
}

/* ── Body ─────────────────────────────────────────────────────────────── */
export function TableBody({ children }: { children: React.ReactNode }) {
  return <tbody>{children}</tbody>;
}

/* ── Row ──────────────────────────────────────────────────────────────── */
interface TableRowProps {
  children: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
}

export function TableRow({ children, selected, onClick }: TableRowProps) {
  return (
    <tr
      onClick={onClick}
      style={{
        backgroundColor: selected ? 'var(--color-surface-brand-main)' : undefined,
        cursor: onClick ? 'pointer' : undefined,
      }}
    >
      {children}
    </tr>
  );
}

/* ── Header cell ──────────────────────────────────────────────────────── */
interface TableHeaderCellProps {
  children?: React.ReactNode;
  align?: 'left' | 'center' | 'right';
  width?: string | number;
}

export function TableHeaderCell({ children, align = 'left', width }: TableHeaderCellProps) {
  return (
    <th style={{
      height: 'var(--dimension-tier-15)',
      backgroundColor: 'var(--color-surface-moderate)',
      padding: '0 var(--space-page-inside-s)',
      fontWeight: 'var(--font-weight-heading)',
      textAlign: align,
      whiteSpace: 'nowrap',
      width,
      boxSizing: 'border-box',
    }}>
      {children}
    </th>
  );
}

/* ── Body cell ────────────────────────────────────────────────────────── */
interface TableCellProps {
  children?: React.ReactNode;
  align?: 'left' | 'center' | 'right';
  width?: string | number;
}

export function TableCell({ children, align = 'left', width }: TableCellProps) {
  return (
    <td style={{
      height: 'var(--dimension-tier-17)',
      padding: '0 var(--space-page-inside-s)',
      borderBottom: '1px solid var(--color-border-soft)',
      fontWeight: 'var(--font-weight-body)',
      textAlign: align,
      verticalAlign: 'middle',
      width,
      boxSizing: 'border-box',
    }}>
      {children}
    </td>
  );
}

/* ── Checkbox cell helper ─────────────────────────────────────────────── */
interface TableCheckboxCellProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  isHeader?: boolean;
}

export function TableCheckboxCell({ checked = false, onChange, isHeader }: TableCheckboxCellProps) {
  const Tag = isHeader ? 'th' : 'td';
  return (
    <Tag style={{
      height: isHeader ? 'var(--dimension-tier-15)' : 'var(--dimension-tier-17)',
      width: 40,
      backgroundColor: isHeader ? 'var(--color-surface-moderate)' : undefined,
      borderBottom: isHeader ? undefined : '1px solid var(--color-border-soft)',
      padding: '0 var(--space-page-inside-s)',
      textAlign: 'center',
      verticalAlign: 'middle',
      boxSizing: 'border-box',
    }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        style={{
          width: 'var(--size-actions-3xs)',
          height: 'var(--size-actions-3xs)',
          margin: 0,
          cursor: 'pointer',
          accentColor: 'var(--color-surface-form-selected)',
        }}
      />
    </Tag>
  );
}

export default Table;
