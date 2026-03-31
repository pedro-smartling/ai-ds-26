'use client';

import React from 'react';
import { Ban, AlertCircle, LayoutGrid, Lightbulb } from 'lucide-react';

export type SectionMessageType = 'error' | 'warning' | 'info' | 'default';

interface SectionMessageAction {
  label: string;
  onClick?: () => void;
}

interface SectionMessageProps {
  title: string;
  supportingText?: string;
  type?: SectionMessageType;
  actions?: SectionMessageAction[];
  /** Custom icon override */
  icon?: React.ReactNode;
}

const textTrim = {
  textBoxTrim: 'trim-both',
  textBoxEdge: 'cap alphabetic',
} as React.CSSProperties;

const TYPE_CONFIG: Record<SectionMessageType, {
  border: string;
  accent: string | null;
  iconBg: string;
  iconBorder: string;
  iconColor: string;
  defaultIcon: React.ReactNode;
}> = {
  error: {
    border: 'var(--color-border-error-soft)',
    accent: 'var(--color-border-error-main)',
    iconBg: 'var(--color-red-100)',
    iconBorder: 'var(--color-red-50)',
    iconColor: 'var(--color-red-500)',
    defaultIcon: <Ban width={16} height={16} />,
  },
  warning: {
    border: 'var(--color-border-warning-soft)',
    accent: 'var(--color-border-warning-soft)',
    iconBg: 'var(--color-amber-100)',
    iconBorder: 'var(--color-amber-50)',
    iconColor: 'var(--color-amber-500)',
    defaultIcon: <AlertCircle width={16} height={16} />,
  },
  info: {
    border: 'var(--color-border-brand-soft)',
    accent: 'var(--color-border-brand-main)',
    iconBg: 'var(--color-violet-100)',
    iconBorder: 'var(--color-violet-50)',
    iconColor: 'var(--color-violet-500)',
    defaultIcon: <LayoutGrid width={16} height={16} />,
  },
  default: {
    border: 'var(--color-border-soft)',
    accent: null,
    iconBg: 'var(--color-neutral-100)',
    iconBorder: 'var(--color-neutral-50)',
    iconColor: 'var(--color-neutral-500)',
    defaultIcon: <Lightbulb width={16} height={16} />,
  },
};

export default function SectionMessage({
  title,
  supportingText,
  type = 'error',
  actions,
  icon,
}: SectionMessageProps) {
  const config = TYPE_CONFIG[type];

  return (
    <div style={{
      position: 'relative',
      display: 'flex',
      gap: 'var(--space-page-inside-m)',
      alignItems: 'flex-start',
      backgroundColor: 'var(--color-surface-main)',
      border: `1px solid ${config.border}`,
      borderRadius: 'var(--radius-l)',
      boxShadow: '0px 1px 2px 0px rgba(16, 24, 41, 0.06), 0px 2px 3px 0px rgba(16, 24, 41, 0.1)',
      paddingLeft: 'var(--space-page-inside-l)',
      paddingRight: 'var(--space-page-inside-m)',
      paddingTop: 'var(--space-page-inside-l)',
      paddingBottom: 'var(--space-page-inside-l)',
      overflow: 'clip',
      width: '100%',
      boxSizing: 'border-box',
    }}>
      {/* Left accent bar */}
      {config.accent && (
        <div style={{
          position: 'absolute',
          left: 0,
          top: -3,
          width: 6,
          bottom: -3,
          backgroundColor: config.accent,
          borderRadius: '3px 0 0 3px',
        }} />
      )}

      {/* Featured icon */}
      <div style={{
        flexShrink: 0,
        width: 32,
        height: 32,
        borderRadius: 28,
        backgroundColor: config.iconBg,
        border: `4px solid ${config.iconBorder}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: config.iconColor,
        boxSizing: 'border-box',
      }}>
        {icon || config.defaultIcon}
      </div>

      {/* Content */}
      <div style={{
        flex: 1,
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-page-inside-m)',
        paddingTop: 'var(--space-page-inside-xxs)',
        paddingBottom: 'var(--space-page-inside-xxs)',
      }}>
        {/* Text and supporting text */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-page-inside-s)',
        }}>
          <p style={{
            margin: 0,
            fontFamily: 'var(--font-family-base)',
            fontWeight: 'var(--font-weight-heading)',
            fontSize: 'var(--font-size-s)',
            lineHeight: 'var(--line-height-body-s)',
            color: 'var(--color-text-soft)',
            paddingRight: 32,
            ...textTrim,
          }}>
            {title}
          </p>
          {supportingText && (
            <p style={{
              margin: 0,
              fontFamily: 'var(--font-family-base)',
              fontWeight: 'var(--font-weight-body)',
              fontSize: 'var(--font-size-s)',
              lineHeight: 'var(--line-height-body-s)',
              color: 'var(--color-text-moderate)',
              ...textTrim,
            }}>
              {supportingText}
            </p>
          )}
        </div>

        {/* Actions */}
        {actions && actions.length > 0 && (
          <div style={{ display: 'flex', gap: 12 }}>
            {actions.map((action) => (
              <button
                key={action.label}
                onClick={action.onClick}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 'var(--space-page-inside-xxs)',
                  height: 24,
                  padding: 0,
                  background: 'none',
                  border: 'none',
                  borderBottom: 'var(--border-width-tier-2) solid var(--color-border-solid)',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-family-base)',
                  fontWeight: 'var(--font-weight-heading)',
                  fontSize: 'var(--font-size-s)',
                  lineHeight: 'var(--line-height-body-s)',
                  color: 'var(--color-text-moderate)',
                  overflow: 'clip',
                  ...textTrim,
                }}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
