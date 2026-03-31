'use client';

import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';

export type LinkSize = 'xs' | 'sm' | 'md' | 'lg';
export type LinkWeight = 'regular' | 'medium' | 'strongest';
export type LinkState = 'default' | 'hover' | 'pressed' | 'disabled';

interface LinkProps {
  children: React.ReactNode;
  size?: LinkSize;
  weight?: LinkWeight;
  /** Override visual state for demos */
  forceState?: LinkState;
  /** Show trailing external-link icon */
  icon?: boolean;
  /** Custom trailing icon override */
  trailingIcon?: React.ReactNode;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
}

const textTrim = {
  textBoxTrim: 'trim-both',
  textBoxEdge: 'cap alphabetic',
} as React.CSSProperties;

const SIZE_MAP: Record<LinkSize, { fontSize: string; lineHeight: string; iconSize: number }> = {
  xs: { fontSize: 'var(--font-size-xs)', lineHeight: 'var(--line-height-body-xs)', iconSize: 12 },
  sm: { fontSize: 'var(--font-size-s)', lineHeight: 'var(--line-height-body-s)', iconSize: 12 },
  md: { fontSize: 'var(--font-size-m)', lineHeight: 'var(--line-height-body-m)', iconSize: 16 },
  lg: { fontSize: 'var(--font-size-l)', lineHeight: 'var(--line-height-body-l)', iconSize: 16 },
};

const WEIGHT_MAP: Record<LinkWeight, string> = {
  regular: 'var(--font-weight-body)',
  medium: 'var(--font-weight-body-strong)',
  strongest: 'var(--font-weight-heading)',
};

export default function Link({
  children,
  size = 'sm',
  weight = 'regular',
  forceState,
  icon = false,
  trailingIcon,
  href,
  onClick,
  disabled = false,
}: LinkProps) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const state: LinkState = forceState ?? (
    disabled ? 'disabled'
    : pressed ? 'pressed'
    : hovered ? 'hover'
    : 'default'
  );

  const s = SIZE_MAP[size];
  const isPressed = state === 'pressed';
  const isDisabled = state === 'disabled';

  const textColor = isPressed ? 'var(--color-text-main)' : 'var(--color-text-link)';
  const bgColor = isPressed ? 'var(--color-surface-link-pressed)' : undefined;
  const iconColor = isPressed ? 'var(--color-text-main)' : 'var(--color-text-link)';

  const showIcon = icon || !!trailingIcon;

  return (
    <a
      href={disabled ? undefined : href}
      onClick={(e) => {
        if (disabled) { e.preventDefault(); return; }
        onClick?.(e);
      }}
      onMouseEnter={() => !forceState && !disabled && setHovered(true)}
      onMouseLeave={() => { if (!forceState) { setHovered(false); setPressed(false); } }}
      onMouseDown={() => !forceState && !disabled && setPressed(true)}
      onMouseUp={() => !forceState && setPressed(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'flex-start',
        gap: 'var(--space-page-inside-xxs)',
        cursor: disabled ? 'default' : 'pointer',
        textDecoration: 'none',
        backgroundColor: bgColor,
        opacity: isDisabled ? 0.4 : 1,
        transition: 'background-color 0.1s, opacity 0.1s',
      }}
      aria-disabled={disabled || undefined}
    >
      <span style={{
        fontFamily: 'var(--font-family-base)',
        fontWeight: WEIGHT_MAP[weight],
        fontSize: s.fontSize,
        lineHeight: s.lineHeight,
        color: textColor,
        textDecoration: state === 'hover' ? 'underline' : 'none',
        ...textTrim,
      }}>
        {children}
      </span>
      {showIcon && (
        <span style={{
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: s.iconSize,
          height: s.iconSize,
          color: iconColor,
        }}>
          {trailingIcon || <ExternalLink width={s.iconSize} height={s.iconSize} />}
        </span>
      )}
    </a>
  );
}
