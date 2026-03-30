'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { CircleCheck, Ban } from 'lucide-react';

export type ToastType = 'success' | 'error';

interface ToastAction {
  label: string;
  onClick: () => void;
}

interface ToastProps {
  /** Toast message */
  message: string;
  /** Visual type */
  type?: ToastType;
  /** Action buttons */
  actions?: ToastAction[];
  /** Auto-dismiss duration in ms (0 to disable) */
  duration?: number;
  /** Called when toast should be dismissed */
  onDismiss?: () => void;
  /** Whether the toast is visible */
  visible?: boolean;
}

const ICON_CONFIG: Record<ToastType, { Icon: typeof CircleCheck; bg: string; border: string; progressBg: string }> = {
  success: {
    Icon: CircleCheck,
    bg: 'var(--color-green-100)',
    border: 'var(--color-green-50)',
    progressBg: 'var(--color-surface-success-solid)',
  },
  error: {
    Icon: Ban,
    bg: 'var(--color-red-100)',
    border: 'var(--color-red-50)',
    progressBg: 'var(--color-surface-error-solid)',
  },
};

const ICON_COLORS: Record<ToastType, string> = {
  success: 'var(--color-foreground-success-main)',
  error: 'var(--color-foreground-error-soft)',
};

export default function Toast({
  message,
  type = 'success',
  actions,
  duration = 4000,
  onDismiss,
  visible = true,
}: ToastProps) {
  const [progress, setProgress] = useState(100);

  const dismiss = useCallback(() => {
    onDismiss?.();
  }, [onDismiss]);

  useEffect(() => {
    if (!visible || duration <= 0) return;

    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
        dismiss();
      }
    }, 30);

    return () => clearInterval(interval);
  }, [visible, duration, dismiss]);

  if (!visible) return null;

  const config = ICON_CONFIG[type];
  const iconColor = ICON_COLORS[type];

  return (
    <div
      role="alert"
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-page-inside-m)',
        backgroundColor: 'var(--color-surface-main)',
        border: 'var(--border-width-tier-2) solid var(--color-border-moderate)',
        borderRadius: 'var(--radius-m)',
        paddingTop: 'var(--space-page-inside-s)',
        paddingBottom: 'var(--space-page-inside-m)',
        paddingLeft: 'var(--space-page-inside-m)',
        paddingRight: 'var(--space-page-inside-xl)',
        boxShadow: 'var(--shadow-l)',
        overflow: 'clip',
      }}
    >
      {/* Featured icon — double circle */}
      <div style={{
        width: 'var(--size-actions-m)',
        height: 'var(--size-actions-m)',
        borderRadius: 'var(--dimension-tier-10)',
        backgroundColor: config.bg,
        border: 'var(--border-width-tier-6) solid ' + config.border,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        boxSizing: 'border-box',
      }}>
        <config.Icon size={16} style={{ color: iconColor }} />
      </div>

      {/* Text */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-page-inside-xs)',
        paddingTop: 'var(--space-page-inside-xxs)',
        paddingBottom: 'var(--space-page-inside-xxs)',
        flexShrink: 0,
      }}>
        <span style={{
          fontFamily: 'var(--font-family-base)',
          fontWeight: 'var(--font-weight-heading)',
          fontSize: 'var(--font-size-s)',
          lineHeight: 'var(--line-height-body-s)',
          color: 'var(--color-text-soft)',
          whiteSpace: 'nowrap',
        }}>
          {message}
        </span>
      </div>

      {/* Action buttons */}
      {actions && actions.length > 0 && (
        <div style={{ display: 'flex', gap: 'var(--space-page-inside-m)', flexShrink: 0 }}>
          {actions.map((action) => (
            <button
              key={action.label}
              onClick={action.onClick}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: 'var(--size-actions-xs)',
                padding: 0,
                margin: 0,
                background: 'none',
                border: 'none',
                borderBottom: 'var(--border-width-tier-2) solid var(--color-border-solid)',
                cursor: 'pointer',
                fontFamily: 'var(--font-family-base)',
                fontWeight: 'var(--font-weight-heading)',
                fontSize: 'var(--font-size-s)',
                lineHeight: 'var(--line-height-body-s)',
                color: 'var(--color-text-moderate)',
                whiteSpace: 'nowrap',
              }}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}

      {/* Progress bar */}
      {duration > 0 && (
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: `${progress}%`,
          height: 'var(--dimension-tier-4)',
          backgroundColor: config.progressBg,
          transition: 'width 30ms linear',
        }} />
      )}
    </div>
  );
}
