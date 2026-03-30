'use client';

import React from 'react';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'delete-primary'
  | 'delete-secondary'
  | 'link-color'
  | 'link-gray';

export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconOnly?: boolean;
  children?: React.ReactNode;
}

/* ── Size tokens ─────────────────────────────────────────────────────── */
const SOLID_HEIGHTS: Record<ButtonSize, string> = {
  sm: 'var(--size-actions-l)',    // 36
  md: 'var(--size-actions-xl)',   // 40
  lg: 'var(--size-actions-2xl)',  // 44
  xl: 'var(--size-actions-3xl)',  // 48
};

const LINK_HEIGHTS: Record<ButtonSize, string> = {
  sm: 'var(--size-actions-xs)',   // 24
  md: 'var(--size-actions-s)',    // 28
  lg: 'var(--size-actions-m)',    // 32
  xl: 'var(--size-actions-xl)',   // 40
};

const FONT_SIZE: Record<ButtonSize, string> = {
  sm: 'var(--font-size-s)',
  md: 'var(--font-size-s)',
  lg: 'var(--font-size-s)',
  xl: 'var(--font-size-m)',
};

const ICON_SIZE: Record<ButtonSize, number> = {
  sm: 16, md: 16, lg: 20, xl: 20,
};

const PX: Record<ButtonSize, string> = {
  sm: 'var(--space-page-inside-s)',   // 12
  md: 'var(--space-page-inside-m)',   // 16
  lg: 'var(--space-page-inside-m)',   // 16
  xl: 'var(--space-page-inside-m)',   // 16
};

/* ── Variant styles ──────────────────────────────────────────────────── */
interface VariantStyle {
  bg: string;
  bgHover: string;
  border: string;
  borderHover: string;
  text: string;
  textHover: string;
  iconColor: string;
  shadow: string;
  isLink?: boolean;
  // disabled overrides
  bgDisabled: string;
  borderDisabled: string;
  textDisabled: string;
}

const VARIANTS: Record<ButtonVariant, VariantStyle> = {
  primary: {
    bg: 'var(--color-surface-brand-solid)',
    bgHover: 'var(--color-surface-brand-solid-hover)',
    border: '1px solid var(--color-border-transparent)',
    borderHover: '1px solid var(--color-border-transparent)',
    text: 'var(--color-text-main-onbrand)',
    textHover: 'var(--color-text-main-onbrand)',
    iconColor: 'var(--color-foreground-main-onbrand)',
    shadow: 'var(--shadow-xs)',
    bgDisabled: 'var(--color-surface-disabled)',
    borderDisabled: '1px solid var(--color-border-disabled)',
    textDisabled: 'var(--color-text-disabled)',
  },
  secondary: {
    bg: 'var(--color-surface-main)',
    bgHover: 'var(--color-surface-main-hover)',
    border: '1px solid var(--color-border-main)',
    borderHover: '1px solid var(--color-border-solid)',
    text: 'var(--color-text-main)',
    textHover: 'var(--color-text-main)',
    iconColor: 'var(--color-foreground-soft)',
    shadow: 'var(--shadow-xs)',
    bgDisabled: 'var(--color-surface-disabled)',
    borderDisabled: '1px solid var(--color-border-disabled)',
    textDisabled: 'var(--color-text-disabled)',
  },
  tertiary: {
    bg: 'var(--color-surface-inverse)',
    bgHover: 'var(--color-surface-solid)',
    border: 'none',
    borderHover: 'none',
    text: 'var(--color-text-main-onbrand)',
    textHover: 'var(--color-text-main-onbrand)',
    iconColor: 'var(--color-foreground-main-onbrand)',
    shadow: 'var(--shadow-xs)',
    bgDisabled: 'var(--color-surface-disabled)',
    borderDisabled: '1px solid var(--color-border-disabled)',
    textDisabled: 'var(--color-text-disabled)',
  },
  'delete-primary': {
    bg: 'var(--color-surface-error-solid)',
    bgHover: 'var(--color-surface-error-solid-hover)',
    border: '1px solid var(--color-border-transparent)',
    borderHover: '1px solid var(--color-border-transparent)',
    text: 'var(--color-text-white)',
    textHover: 'var(--color-text-white)',
    iconColor: 'var(--color-foreground-white)',
    shadow: 'var(--shadow-xs)',
    bgDisabled: 'var(--color-surface-disabled)',
    borderDisabled: '1px solid var(--color-border-disabled)',
    textDisabled: 'var(--color-text-disabled)',
  },
  'delete-secondary': {
    bg: 'var(--color-surface-main)',
    bgHover: 'var(--color-surface-error-main)',
    border: '1px solid var(--color-surface-error-solid)',
    borderHover: '1px solid var(--color-surface-error-solid)',
    text: 'var(--color-text-error-main)',
    textHover: 'var(--color-text-error-main)',
    iconColor: 'var(--color-foreground-error-soft)',
    shadow: 'var(--shadow-xs)',
    bgDisabled: 'var(--color-surface-disabled)',
    borderDisabled: '1px solid var(--color-border-disabled)',
    textDisabled: 'var(--color-text-disabled)',
  },
  'link-color': {
    bg: 'transparent',
    bgHover: 'transparent',
    border: 'none',
    borderHover: 'none',
    text: 'var(--color-text-link)',
    textHover: 'var(--color-text-link-hover)',
    iconColor: 'var(--color-foreground-link)',
    shadow: 'none',
    isLink: true,
    bgDisabled: 'transparent',
    borderDisabled: 'none',
    textDisabled: 'var(--color-text-disabled)',
  },
  'link-gray': {
    bg: 'transparent',
    bgHover: 'transparent',
    border: 'none',
    borderHover: 'none',
    text: 'var(--color-text-moderate)',
    textHover: 'var(--color-text-moderate-hover)',
    iconColor: 'var(--color-foreground-moderate)',
    shadow: 'none',
    isLink: true,
    bgDisabled: 'transparent',
    borderDisabled: 'none',
    textDisabled: 'var(--color-text-disabled)',
  },
};

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  iconOnly = false,
  children,
  className,
  disabled,
  style: styleProp,
  ...props
}) => {
  const v = VARIANTS[variant];
  const isLink = v.isLink;
  const height = isLink ? LINK_HEIGHTS[size] : SOLID_HEIGHTS[size];
  const iconSz = ICON_SIZE[size];

  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--space-page-inside-xxs)',
    height,
    paddingLeft: isLink ? 0 : (iconOnly ? undefined : PX[size]),
    paddingRight: isLink ? 0 : (iconOnly ? undefined : PX[size]),
    paddingTop: 0,
    paddingBottom: 0,
    width: iconOnly ? height : undefined,
    backgroundColor: disabled ? v.bgDisabled : v.bg,
    border: disabled ? v.borderDisabled : v.border,
    borderBottom: isLink && !disabled ? `1px solid ${disabled ? 'var(--color-border-disabled)' : v.text}` : (isLink ? `1px solid var(--color-border-disabled)` : undefined),
    borderRadius: isLink ? 0 : 'var(--radius-m)',
    boxShadow: disabled ? 'none' : (isLink ? 'none' : v.shadow),
    color: disabled ? v.textDisabled : v.text,
    fontFamily: 'var(--font-family-base)',
    fontWeight: 'var(--font-weight-heading)' as React.CSSProperties['fontWeight'],
    fontSize: FONT_SIZE[size],
    lineHeight: size === 'xl' ? 'var(--line-height-body-m)' : 'var(--line-height-body-s)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    overflow: isLink ? undefined : 'hidden',
    boxSizing: 'border-box',
    transition: 'background-color 0.15s, border-color 0.15s, color 0.15s, box-shadow 0.15s',
    whiteSpace: 'nowrap',
    textDecoration: 'none',
    outline: 'none',
    ...styleProp,
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    e.currentTarget.style.backgroundColor = v.bgHover;
    if (!isLink) e.currentTarget.style.border = v.borderHover;
    e.currentTarget.style.color = v.textHover;
    props.onMouseEnter?.(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    e.currentTarget.style.backgroundColor = v.bg;
    if (!isLink) e.currentTarget.style.border = v.border;
    e.currentTarget.style.color = v.text;
    props.onMouseLeave?.(e);
  };

  const handleFocus = (e: React.FocusEvent<HTMLButtonElement>) => {
    if (disabled) return;
    e.currentTarget.style.boxShadow = '0px 0px 0px 2px var(--color-surface-main), 0px 0px 0px 6px var(--color-amber-300)';
    if (!isLink) e.currentTarget.style.border = 'var(--border-width-tier-4) solid var(--color-border-solid)';
    props.onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLButtonElement>) => {
    e.currentTarget.style.boxShadow = disabled ? 'none' : (isLink ? 'none' : v.shadow);
    if (!isLink) e.currentTarget.style.border = disabled ? v.borderDisabled : v.border;
    props.onBlur?.(e);
  };

  return (
    <button
      className={className}
      disabled={disabled}
      aria-disabled={disabled}
      style={baseStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...props}
    >
      {icon && (
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: iconSz,
          height: iconSz,
          flexShrink: 0,
          color: disabled ? 'var(--color-foreground-disabled)' : v.iconColor,
        }}>
          {icon}
        </span>
      )}
      {!iconOnly && children && (
        <span style={{ paddingLeft: 2, paddingRight: 2 }}>{children}</span>
      )}
    </button>
  );
};

export default Button;
