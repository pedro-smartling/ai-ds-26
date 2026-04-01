'use client';

import React from 'react';
import Avatar from '@/components/Avatar';
import FeaturedIcon from '@/components/FeaturedIcon';
import ProgressBar from '@/components/ProgressBar';
import { X, AlertCircle, CheckCircle, Upload, XCircle } from 'lucide-react';

export type FloatNotificationType = 'default' | 'warning' | 'success' | 'progress' | 'error';

interface FloatNotificationAction {
  label: string;
  variant?: 'gray' | 'color';
  onClick?: () => void;
}

interface FloatNotificationProps {
  title: string;
  dateTime?: string;
  supportingText?: string;
  type?: FloatNotificationType;
  actions?: FloatNotificationAction[];
  /** Avatar URL for default type */
  avatarSrc?: string;
  /** Progress value 0–100 for progress type */
  progress?: number;
  onDismiss?: () => void;
}

const textTrim = {
  textBoxTrim: 'trim-both',
  textBoxEdge: 'cap alphabetic',
} as React.CSSProperties;

const TYPE_CONFIG: Record<Exclude<FloatNotificationType, 'default' | 'progress'>, {
  accent: string;
  iconColor: 'warning' | 'success' | 'error';
  icon: React.ReactNode;
}> = {
  warning: {
    accent: 'var(--color-border-warning-soft)',
    iconColor: 'warning',
    icon: <AlertCircle width={20} height={20} />,
  },
  success: {
    accent: 'var(--color-border-success-main)',
    iconColor: 'success',
    icon: <CheckCircle width={20} height={20} />,
  },
  error: {
    accent: 'var(--color-border-error-main)',
    iconColor: 'error',
    icon: <XCircle width={20} height={20} />,
  },
};

export default function FloatNotification({
  title,
  dateTime,
  supportingText,
  type = 'default',
  actions,
  avatarSrc,
  progress = 40,
  onDismiss,
}: FloatNotificationProps) {
  const isDefault = type === 'default';
  const isProgress = type === 'progress';
  const hasAccent = !isDefault;
  const config = type !== 'default' && type !== 'progress' ? TYPE_CONFIG[type] : null;

  return (
    <div style={{
      display: 'flex',
      gap: 'var(--space-page-inside-m)',
      alignItems: 'flex-start',
      backgroundColor: 'var(--color-surface-main)',
      border: '1px solid var(--color-border-soft)',
      borderRadius: 12,
      boxShadow: '0px 8px 8px -4px rgba(16, 24, 41, 0.03), 0px 20px 24px -4px rgba(16, 24, 41, 0.08)',
      width: 400,
      maxWidth: '100%',
      overflow: 'clip',
      position: 'relative',
    }}>
      {/* Left accent bar */}
      {hasAccent && (
        <div style={{
          width: 6,
          alignSelf: 'stretch',
          flexShrink: 0,
          backgroundColor: isProgress
            ? 'var(--color-border-brand-main)'
            : config?.accent,
        }} />
      )}

      {/* Content */}
      <div style={{
        display: 'flex',
        flex: 1,
        gap: 'var(--space-page-inside-m)',
        alignItems: 'flex-start',
        minWidth: 0,
        paddingTop: 'var(--space-page-inside-l)',
        paddingBottom: 'var(--space-page-inside-l)',
        paddingLeft: hasAccent ? undefined : 'var(--space-page-inside-l)',
      }}>
        {/* Leading element: avatar or featured icon */}
        {isDefault && avatarSrc && (
          <Avatar src={avatarSrc} size="md" />
        )}

        {config && (
          <FeaturedIcon
            icon={config.icon}
            color={config.iconColor}
            size="md"
            theme="light-double-circle"
          />
        )}

        {isProgress && (
          <FeaturedIcon
            icon={<Upload width={20} height={20} />}
            color="default"
            size="md"
            theme="light-double-circle"
          />
        )}

        {/* Text content */}
        <div style={{
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          paddingRight: 'var(--space-page-inside-m)',
        }}>
          {/* Title row + supporting text */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-page-inside-s)',
            paddingRight: 32,
          }}>
            <div style={{
              display: 'flex',
              gap: 8,
              alignItems: 'center',
              whiteSpace: 'nowrap',
            }}>
              <span style={{
                fontFamily: 'var(--font-family-base)',
                fontWeight: 'var(--font-weight-heading)',
                fontSize: 'var(--font-size-s)',
                lineHeight: 'var(--line-height-body-s)',
                color: 'var(--color-text-main)',
                ...textTrim,
              }}>
                {title}
              </span>
              {dateTime && (
                <span style={{
                  fontFamily: 'var(--font-family-base)',
                  fontWeight: 'var(--font-weight-body)',
                  fontSize: 'var(--font-size-s)',
                  lineHeight: 'var(--line-height-body-s)',
                  color: 'var(--color-text-moderate)',
                  ...textTrim,
                }}>
                  {dateTime}
                </span>
              )}
            </div>
            {supportingText && (
              <p style={{
                margin: 0,
                fontFamily: 'var(--font-family-base)',
                fontWeight: 'var(--font-weight-body)',
                fontSize: 'var(--font-size-s)',
                lineHeight: 'var(--line-height-body-s)',
                color: 'var(--color-text-moderate)',
                whiteSpace: 'normal',
                ...textTrim,
              }}>
                {supportingText}
              </p>
            )}
          </div>

          {/* Progress bar */}
          {isProgress && (
            <ProgressBar value={progress} color="brand" size="sm" />
          )}

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
                    height: 24,
                    padding: 0,
                    background: 'none',
                    border: 'none',
                    borderBottom: action.variant === 'color'
                      ? 'var(--border-width-tier-2) solid var(--color-border-solid)'
                      : undefined,
                    cursor: 'pointer',
                    fontFamily: 'var(--font-family-base)',
                    fontWeight: 'var(--font-weight-heading)',
                    fontSize: 'var(--font-size-s)',
                    lineHeight: 'var(--line-height-body-s)',
                    color: action.variant === 'color'
                      ? 'var(--color-text-link)'
                      : 'var(--color-text-moderate)',
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

      {/* Dismiss button */}
      {onDismiss && (
        <button
          onClick={onDismiss}
          style={{
            position: 'absolute',
            top: 20,
            right: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 20,
            height: 20,
            padding: 0,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--color-foreground-moderate)',
          }}
          aria-label="Dismiss"
        >
          <X width={20} height={20} />
        </button>
      )}
    </div>
  );
}
