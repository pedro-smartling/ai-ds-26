'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export type ModalSize = 'sm' | 'md' | 'lg';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: ModalSize;
  hideCloseButton?: boolean;
}

const sizeWidths: Record<ModalSize, string> = {
  sm: '400px',
  md: '560px',
  lg: '720px',
};

export default function Modal({ isOpen, onClose, title, children, footer, size = 'md', hideCloseButton }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 'var(--z-index-tier-7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--dimension-tier-7)',
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'var(--blur-background-default-fill)',
          backdropFilter: 'blur(4px)',
        }}
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: sizeWidths[size],
          backgroundColor: 'var(--color-surface-main)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-xxl)',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: 'calc(100vh - var(--dimension-tier-17))',
        }}
      >
        {/* Header */}
        {(title || !hideCloseButton) && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 'var(--dimension-tier-9) var(--dimension-tier-9) var(--dimension-tier-7)',
          }}>
            {title && (
              <h2 id="modal-title" style={{
                fontSize: 'var(--font-size-l)',
                fontWeight: 'var(--font-weight-heading)',
                color: 'var(--color-text-main)',
                margin: 0,
                lineHeight: 'var(--line-height-body-l)',
              }}>
                {title}
              </h2>
            )}
            {!hideCloseButton && (
              <button
                onClick={onClose}
                aria-label="Close modal"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 'var(--size-actions-xl)',
                  height: 'var(--size-actions-xl)',
                  borderRadius: 'var(--radius-s)',
                  border: 'none',
                  backgroundColor: 'transparent',
                  color: 'var(--color-foreground-moderate)',
                  cursor: 'pointer',
                  transition: 'background-color 0.15s, color 0.15s',
                  marginLeft: 'auto',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-surface-main-hover)';
                  e.currentTarget.style.color = 'var(--color-foreground-main)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--color-foreground-moderate)';
                }}
              >
                <X width={20} height={20} />
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div style={{
          padding: title ? '0 var(--dimension-tier-9) var(--dimension-tier-7)' : 'var(--dimension-tier-9)',
          overflowY: 'auto',
          flex: 1,
          fontSize: 'var(--font-size-s)',
          color: 'var(--color-text-soft)',
          lineHeight: 'var(--line-height-body-s)',
        }}>
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 'var(--dimension-tier-6)',
            padding: 'var(--dimension-tier-7) var(--dimension-tier-9) var(--dimension-tier-9)',
            borderTop: '1px solid var(--color-border-soft)',
          }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
