'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';

export type TooltipArrow =
  | 'none'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'
  | 'top-center'
  | 'left'
  | 'right';

interface TooltipProps {
  /** Primary label */
  text: string;
  /** Optional secondary description */
  supportingText?: string;
  /** Arrow position relative to the tooltip box */
  arrow?: TooltipArrow;
  /** Trigger element */
  children: React.ReactElement;
}

/* ── Arrow CSS triangle (6px tall, 16px wide) ────────────────────────── */
const ARROW_SIZE = 6;
const ARROW_WIDTH = 8; // half-base

function Arrow({ position }: { position: TooltipArrow }) {
  if (position === 'none') return null;

  const base: React.CSSProperties = {
    position: 'absolute',
    width: 0,
    height: 0,
    borderStyle: 'solid',
  };

  let style: React.CSSProperties;

  switch (position) {
    case 'bottom-center':
      style = { ...base, bottom: -ARROW_SIZE, left: '50%', transform: 'translateX(-50%)', borderWidth: `${ARROW_SIZE}px ${ARROW_WIDTH}px 0`, borderColor: 'var(--color-surface-solid) transparent transparent transparent' };
      break;
    case 'bottom-left':
      style = { ...base, bottom: -ARROW_SIZE, left: 'var(--space-page-inside-s)', borderWidth: `${ARROW_SIZE}px ${ARROW_WIDTH}px 0`, borderColor: 'var(--color-surface-solid) transparent transparent transparent' };
      break;
    case 'bottom-right':
      style = { ...base, bottom: -ARROW_SIZE, right: 'var(--space-page-inside-s)', borderWidth: `${ARROW_SIZE}px ${ARROW_WIDTH}px 0`, borderColor: 'var(--color-surface-solid) transparent transparent transparent' };
      break;
    case 'top-center':
      style = { ...base, top: -ARROW_SIZE, left: '50%', transform: 'translateX(-50%)', borderWidth: `0 ${ARROW_WIDTH}px ${ARROW_SIZE}px`, borderColor: 'transparent transparent var(--color-surface-solid) transparent' };
      break;
    case 'left':
      style = { ...base, left: -ARROW_SIZE, top: '50%', transform: 'translateY(-50%)', borderWidth: `${ARROW_WIDTH}px ${ARROW_SIZE}px ${ARROW_WIDTH}px 0`, borderColor: 'transparent var(--color-surface-solid) transparent transparent' };
      break;
    case 'right':
      style = { ...base, right: -ARROW_SIZE, top: '50%', transform: 'translateY(-50%)', borderWidth: `${ARROW_WIDTH}px 0 ${ARROW_WIDTH}px ${ARROW_SIZE}px`, borderColor: 'transparent transparent transparent var(--color-surface-solid)' };
      break;
    default:
      return null;
  }

  return <div style={style} />;
}

/* ── Tooltip positioning helpers ──────────────────────────────────────── */
function getOffset(arrow: TooltipArrow): React.CSSProperties {
  switch (arrow) {
    case 'bottom-center':
    case 'bottom-left':
    case 'bottom-right':
      return { bottom: '100%', marginBottom: 'var(--space-page-inside-xs)' };
    case 'top-center':
      return { top: '100%', marginTop: 'var(--space-page-inside-xs)' };
    case 'left':
      return { right: '100%', marginRight: 'var(--space-page-inside-xs)', top: '50%', transform: 'translateY(-50%)' };
    case 'right':
      return { left: '100%', marginLeft: 'var(--space-page-inside-xs)', top: '50%', transform: 'translateY(-50%)' };
    case 'none':
    default:
      return { bottom: '100%', marginBottom: 'var(--space-page-inside-xs)' };
  }
}

function getAlignment(arrow: TooltipArrow): React.CSSProperties {
  switch (arrow) {
    case 'bottom-left':
      return { left: 0 };
    case 'bottom-right':
      return { right: 0 };
    case 'bottom-center':
    case 'top-center':
    case 'none':
      return { left: '50%', transform: 'translateX(-50%)' };
    default:
      return {};
  }
}

export default function Tooltip({ text, supportingText, arrow = 'bottom-center', children }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const show = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setVisible(true);
  }, []);

  const hide = useCallback(() => {
    timeoutRef.current = setTimeout(() => setVisible(false), 100);
  }, []);

  useEffect(() => () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }, []);

  const hasSupportingText = !!supportingText;

  const offsetStyle = getOffset(arrow);
  const alignStyle = getAlignment(arrow);

  // Merge offset + alignment (handle transform conflicts for left/right)
  const positionStyle: React.CSSProperties = {
    ...offsetStyle,
    ...alignStyle,
  };
  // For left/right arrows, offset already sets transform, so skip alignment transform
  if (arrow === 'left' || arrow === 'right') {
    delete positionStyle.left;
    delete positionStyle.right;
    Object.assign(positionStyle, offsetStyle);
  }

  return (
    <div
      style={{ position: 'relative', display: 'inline-flex' }}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}

      {visible && (
        <div
          role="tooltip"
          style={{
            position: 'absolute',
            zIndex: 'var(--z-index-tier-7)',
            pointerEvents: 'none',
            ...positionStyle,
          }}
        >
          <div style={{
            position: 'relative',
            backgroundColor: 'var(--color-surface-solid)',
            borderRadius: 'var(--radius-m)',
            padding: hasSupportingText
              ? 'var(--space-page-inside-s)'
              : 'var(--space-page-inside-xs) var(--space-page-inside-s)',
            boxShadow: 'var(--shadow-l)',
            maxWidth: hasSupportingText ? 220 : undefined,
            whiteSpace: hasSupportingText ? 'normal' : 'nowrap',
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: hasSupportingText ? 'var(--space-page-inside-s)' : undefined,
              fontSize: 'var(--font-size-xs)',
              lineHeight: 'var(--line-height-body-xs)',
            }}>
              <span style={{
                fontFamily: 'var(--font-family-base)',
                fontWeight: 'var(--font-weight-heading)',
                color: 'var(--color-text-white)',
              }}>
                {text}
              </span>
              {supportingText && (
                <span style={{
                  fontFamily: 'var(--font-family-base)',
                  fontWeight: 'var(--font-weight-body)',
                  color: 'var(--color-text-strong)',
                }}>
                  {supportingText}
                </span>
              )}
            </div>
            <Arrow position={arrow} />
          </div>
        </div>
      )}
    </div>
  );
}
