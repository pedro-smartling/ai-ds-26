'use client';

import React from 'react';

export interface PropRow {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  description: string;
}

interface PropsTableProps {
  rows: PropRow[];
}

export default function PropsTable({ rows }: PropsTableProps) {
  return (
    <div style={{
      border: '1px solid var(--color-border-soft)',
      borderRadius: 'var(--radius-l)',
      overflow: 'hidden',
      marginBottom: 'var(--space-page-inside-xxl)',
    }}>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: 'var(--font-size-s)',
        fontFamily: 'var(--font-family-base)',
      }}>
        <thead>
          <tr style={{ backgroundColor: 'var(--color-surface-soft)' }}>
            {['Prop', 'Type', 'Default', 'Description'].map((col) => (
              <th key={col} style={{
                padding: 'var(--dimension-tier-5) var(--dimension-tier-7)',
                textAlign: 'left',
                fontWeight: 'var(--font-weight-body-strongest)',
                color: 'var(--color-text-moderate)',
                fontSize: 'var(--font-size-xs)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                borderBottom: '1px solid var(--color-border-soft)',
              }}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.name} style={{
              backgroundColor: i % 2 === 0 ? 'var(--color-surface-main)' : 'var(--color-surface-soft)',
            }}>
              <td style={{
                padding: 'var(--dimension-tier-5) var(--dimension-tier-7)',
                borderBottom: i < rows.length - 1 ? '1px solid var(--color-border-soft)' : 'none',
                whiteSpace: 'nowrap',
              }}>
                <code style={{
                  fontFamily: 'monospace',
                  fontSize: 'var(--font-size-xs)',
                  backgroundColor: 'var(--color-surface-moderate)',
                  padding: '2px 6px',
                  borderRadius: 'var(--radius-xxs)',
                  color: 'var(--color-foreground-brand-main)',
                }}>
                  {row.name}
                </code>
                {row.required && (
                  <span style={{ color: 'var(--color-foreground-error-main)', marginLeft: '4px', fontSize: 'var(--font-size-xs)' }}>*</span>
                )}
              </td>
              <td style={{
                padding: 'var(--dimension-tier-5) var(--dimension-tier-7)',
                borderBottom: i < rows.length - 1 ? '1px solid var(--color-border-soft)' : 'none',
              }}>
                <code style={{
                  fontFamily: 'monospace',
                  fontSize: 'var(--font-size-xs)',
                  color: 'var(--color-foreground-warning-main)',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}>
                  {row.type}
                </code>
              </td>
              <td style={{
                padding: 'var(--dimension-tier-5) var(--dimension-tier-7)',
                borderBottom: i < rows.length - 1 ? '1px solid var(--color-border-soft)' : 'none',
                color: 'var(--color-text-moderate)',
                whiteSpace: 'nowrap',
              }}>
                {row.default ? (
                  <code style={{
                    fontFamily: 'monospace',
                    fontSize: 'var(--font-size-xs)',
                    backgroundColor: 'var(--color-surface-moderate)',
                    padding: '2px 6px',
                    borderRadius: 'var(--radius-xxs)',
                    color: 'var(--color-text-soft)',
                  }}>
                    {row.default}
                  </code>
                ) : '—'}
              </td>
              <td style={{
                padding: 'var(--dimension-tier-5) var(--dimension-tier-7)',
                borderBottom: i < rows.length - 1 ? '1px solid var(--color-border-soft)' : 'none',
                color: 'var(--color-text-soft)',
                lineHeight: 'var(--line-height-body-s)',
              }}>
                {row.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
