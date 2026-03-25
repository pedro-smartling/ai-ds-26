'use client';

import React, { useState } from 'react';
import { AlertCircle, Copy, ChevronDown } from 'lucide-react';

export type InputType = 'default' | 'domain' | 'copy' | 'currency' | 'phone';
export type InputState = 'default' | 'disabled' | 'error' | 'readonly';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  /** Hint text shown below label, above the input */
  hintText?: string;
  /** Helper text shown below the input in the default state */
  helperText?: string;
  /** Error message shown above the input with an alert icon */
  errorText?: string;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  inputSize?: 'sm' | 'md';
  state?: InputState;
  inputType?: InputType;
  /** Domain: prefix string shown in the left add-on (default: 'https://') */
  prefix?: string;
  /** Copy: custom handler when Copy button is clicked */
  onCopy?: () => void;
  /** Currency: symbol shown left of amount (default: '$') */
  currencySymbol?: string;
  /** Currency: currency code shown in right dropdown (default: 'USD') */
  currencyCode?: string;
  onCurrencyChange?: (code: string) => void;
  /** Phone: country code shown in left dropdown (default: 'USA') */
  countryCode?: string;
  onCountryChange?: (code: string) => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  label,
  hintText,
  helperText,
  errorText,
  leadingIcon,
  trailingIcon,
  inputSize = 'md',
  state = 'default',
  inputType = 'default',
  prefix = 'https://',
  onCopy,
  currencySymbol = '$',
  currencyCode = 'USD',
  countryCode = 'USA',
  className,
  disabled,
  readOnly,
  id,
  onFocus,
  onBlur,
  value,
  defaultValue,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [copied, setCopied] = useState(false);

  const isDisabled = disabled || state === 'disabled';
  const isReadOnly = readOnly || state === 'readonly';
  const isError = state === 'error' || !!errorText;
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
  const height = inputSize === 'sm' ? 'var(--size-actions-xl)' : 'var(--size-actions-2xl)';
  // ── Border helpers ─────────────────────────────────────────────────────────
  const getDefaultBorder = () => {
    if (isDisabled) return '1px solid var(--color-border-disabled)';
    if (isReadOnly) return 'none';
    if (isError) return '1px solid var(--color-border-error-main)';
    return '1px solid var(--color-border-main)';
  };

  // Container-level focused styles (compound types)
  const containerFocusStyle: React.CSSProperties = isFocused && !isDisabled && !isReadOnly
    ? {
        border: '2px solid var(--color-border-solid)',
        boxShadow: '0px 0px 0px 2px var(--color-surface-main), 0px 0px 0px 6px var(--color-amber-300)',
      }
    : {
        border: getDefaultBorder(),
        boxShadow: isDisabled || isReadOnly ? 'none' : 'var(--shadow-xs)',
      };

  // ── Shared input element styles ────────────────────────────────────────────
  const innerInputStyle: React.CSSProperties = {
    flex: 1,
    minWidth: 0,
    height: '100%',
    fontSize: 'var(--font-size-m)',
    fontFamily: 'var(--font-family-base)',
    fontWeight: isReadOnly ? 'var(--font-weight-body-strong)' : 'var(--font-weight-body)',
    color: isDisabled ? 'var(--color-text-disabled)' : isReadOnly ? 'var(--color-text-moderate)' : 'var(--color-text-main)',
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
    padding: 0,
    cursor: isDisabled ? 'not-allowed' : isReadOnly ? 'default' : 'text',
  };

  // ── Copy handler ───────────────────────────────────────────────────────────
  const handleCopy = async () => {
    const val = typeof value === 'string' ? value : (defaultValue as string) ?? '';
    if (onCopy) {
      onCopy();
    } else {
      try {
        await navigator.clipboard.writeText(val);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // fallback: noop
      }
    }
  };

  // ── Wrapper (label / hint / error / helper) ────────────────────────────────
  const wrapperContent = (innerContent: React.ReactNode) => (
    <div
      className={className}
      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-tier-3)', width: '100%' }}
    >
      {label && (
        <label htmlFor={inputId} style={{
          fontSize: 'var(--font-size-s)',
          fontWeight: 'var(--font-weight-body-strong)',
          color: isDisabled ? 'var(--color-text-disabled)' : 'var(--color-text-soft)',
          lineHeight: 'var(--line-height-body-s)',
        }}>
          {label}
        </label>
      )}

      {hintText && (
        <p style={{
          margin: 0,
          fontSize: 'var(--font-size-s)',
          fontWeight: 'var(--font-weight-body)',
          color: isDisabled ? 'var(--color-text-disabled)' : 'var(--color-text-moderate)',
          lineHeight: 'var(--line-height-body-s)',
        }}>
          {hintText}
        </p>
      )}

      {isError && errorText && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <AlertCircle width={16} height={16} style={{ color: 'var(--color-foreground-error-main)', flexShrink: 0 }} />
          <span style={{
            fontSize: 'var(--font-size-s)',
            fontWeight: 'var(--font-weight-body-strong)',
            color: 'var(--color-text-error-main)',
            lineHeight: 'var(--line-height-body-s)',
          }}>
            {errorText}
          </span>
        </div>
      )}

      {innerContent}

      {helperText && !isError && (
        <span style={{
          fontSize: 'var(--font-size-xs)',
          color: 'var(--color-text-moderate)',
          lineHeight: 'var(--line-height-body-xs)',
        }}>
          {helperText}
        </span>
      )}
    </div>
  );

  // ── DEFAULT type ───────────────────────────────────────────────────────────
  if (inputType === 'default') {
    const hasIcons = !!(leadingIcon || trailingIcon);

    if (hasIcons) {
      // Flex wrapper approach — matches Figma: 12px padding, 20px icon, 8px gap
      const iconBoxShadow = isFocused && !isDisabled && !isReadOnly
        ? '0px 0px 0px 2px var(--color-surface-main), 0px 0px 0px 6px var(--color-amber-300)'
        : isReadOnly ? 'none'
        : isDisabled ? 'inset 0 0 0 1px var(--color-border-disabled)'
        : isError ? 'inset 0 0 0 1px var(--color-border-error-main), var(--shadow-xs)'
        : 'inset 0 0 0 1px var(--color-border-main), var(--shadow-xs)';

      const iconWrapperStyle: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        height,
        paddingLeft: '12px',
        paddingRight: '12px',
        borderRadius: 'var(--radius-m)',
        border: isReadOnly ? 'none' : '2px solid transparent',
        borderColor: isFocused && !isDisabled && !isReadOnly ? 'var(--color-border-solid)' : 'transparent',
        backgroundColor: isDisabled ? 'var(--color-surface-disabled)' : 'var(--color-surface-main)',
        boxShadow: iconBoxShadow,
        boxSizing: 'border-box',
        transition: 'border-color 0.15s, box-shadow 0.15s',
      };

      const iconSpanStyle: React.CSSProperties = {
        width: 20,
        height: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        color: isDisabled ? 'var(--color-foreground-disabled)' : 'var(--color-foreground-moderate)',
        pointerEvents: 'none',
      };

      return wrapperContent(
        <div style={iconWrapperStyle}>
          {leadingIcon && <span style={iconSpanStyle}>{leadingIcon}</span>}
          <input
            ref={ref}
            id={inputId}
            disabled={isDisabled}
            readOnly={isReadOnly}
            value={value}
            defaultValue={defaultValue}
            style={{
              ...innerInputStyle,
              padding: 0,
            }}
            onFocus={(e) => {
              if (!isDisabled && !isReadOnly) setIsFocused(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              onBlur?.(e);
            }}
            {...props}
          />
          {trailingIcon && <span style={iconSpanStyle}>{trailingIcon}</span>}
        </div>
      );
    }

    // No icons — keep direct input approach (no layout shift on focus)
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      if (isDisabled || isReadOnly) return;
      e.currentTarget.style.borderColor = 'var(--color-border-solid)';
      e.currentTarget.style.boxShadow = '0px 0px 0px 2px var(--color-surface-main), 0px 0px 0px 6px var(--color-amber-300)';
      onFocus?.(e);
    };
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      if (isDisabled || isReadOnly) return;
      e.currentTarget.style.borderColor = 'transparent';
      e.currentTarget.style.boxShadow = isError
        ? 'inset 0 0 0 1px var(--color-border-error-main), var(--shadow-xs)'
        : 'inset 0 0 0 1px var(--color-border-main), var(--shadow-xs)';
      onBlur?.(e);
    };

    return wrapperContent(
      <input
        ref={ref}
        id={inputId}
        disabled={isDisabled}
        readOnly={isReadOnly}
        value={value}
        defaultValue={defaultValue}
        style={{
          width: '100%',
          height,
          paddingLeft: 'var(--dimension-tier-7)',
          paddingRight: 'var(--dimension-tier-7)',
          fontSize: 'var(--font-size-m)',
          fontFamily: 'var(--font-family-base)',
          fontWeight: isReadOnly ? 'var(--font-weight-body-strong)' : 'var(--font-weight-body)',
          color: isDisabled ? 'var(--color-text-disabled)' : isReadOnly ? 'var(--color-text-moderate)' : 'var(--color-text-main)',
          backgroundColor: isDisabled ? 'var(--color-surface-disabled)' : 'var(--color-surface-main)',
          border: isReadOnly ? 'none' : '2px solid transparent',
          borderRadius: 'var(--radius-m)',
          outline: 'none',
          transition: 'border-color 0.15s, box-shadow 0.15s',
          cursor: isDisabled ? 'not-allowed' : isReadOnly ? 'default' : 'text',
          boxSizing: 'border-box',
          boxShadow: isReadOnly ? 'none'
            : isDisabled ? 'inset 0 0 0 1px var(--color-border-disabled)'
            : isError ? 'inset 0 0 0 1px var(--color-border-error-main), var(--shadow-xs)'
            : 'inset 0 0 0 1px var(--color-border-main), var(--shadow-xs)',
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
    );
  }

  // ── Shared compound input event handlers ───────────────────────────────────
  const handleCompoundFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };
  const handleCompoundBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };


  // Border color used by add-on edges
  const addonBorderColor = isDisabled ? 'var(--color-border-disabled)' : isError ? 'var(--color-border-error-main)' : 'var(--color-border-main)';

  // Input-portion wrapper style for domain/copy — no left border (domain) or no right border (copy)
  // Focus ring is applied to this wrapper via isFocused, so the amber ring appears only on the input side
  const bw = isFocused && !isDisabled ? '2px' : '1px';
  const bc = isFocused && !isDisabled ? 'var(--color-border-solid)' : addonBorderColor;

  const inputPortionStyle = (openSide: 'left' | 'right'): React.CSSProperties => ({
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    backgroundColor: isDisabled ? 'var(--color-surface-disabled)' : 'var(--color-surface-main)',
    borderTop: `${bw} solid ${bc}`,
    borderBottom: `${bw} solid ${bc}`,
    borderLeft: openSide === 'left' ? (isFocused && !isDisabled ? `${bw} solid ${bc}` : 'none') : `${bw} solid ${bc}`,
    borderRight: openSide === 'right' ? (isFocused && !isDisabled ? `${bw} solid ${bc}` : 'none') : `${bw} solid ${bc}`,
    borderRadius: openSide === 'left' ? '0 var(--radius-m) var(--radius-m) 0' : 'var(--radius-m) 0 0 var(--radius-m)',
    boxShadow: isFocused && !isDisabled
      ? '0px 0px 0px 2px var(--color-surface-main), 0px 0px 0px 6px var(--color-amber-300)'
      : isDisabled ? 'none' : 'var(--shadow-xs)',
    transition: 'border-color 0.15s, box-shadow 0.15s',
    boxSizing: 'border-box' as const,
    overflow: 'visible',
  });

  // ── DOMAIN type ─────────────────────────────────────────────────────────────
  if (inputType === 'domain') {
    return wrapperContent(
      <div style={{ display: 'flex', alignItems: 'stretch', width: '100%', height }}>
        {/* Left add-on — shares border edge with input, no right border */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          padding: '0 var(--dimension-tier-7)',
          backgroundColor: isDisabled ? 'var(--color-surface-disabled)' : 'var(--color-surface-soft)',
          borderTop: `1px solid ${addonBorderColor}`,
          borderLeft: `1px solid ${addonBorderColor}`,
          borderBottom: `1px solid ${addonBorderColor}`,
          borderRight: `1px solid ${addonBorderColor}`,
          borderRadius: 'var(--radius-m) 0 0 var(--radius-m)',
          flexShrink: 0,
          boxSizing: 'border-box',
        }}>
          <span style={{
            fontSize: 'var(--font-size-m)',
            fontWeight: 'var(--font-weight-body)',
            color: isDisabled ? 'var(--color-text-disabled)' : 'var(--color-text-main)',
            lineHeight: 'var(--line-height-body-m)',
            whiteSpace: 'nowrap',
          }}>
            {prefix}
          </span>
        </div>
        {/* Input portion — gets focus ring, open on left */}
        <div style={inputPortionStyle('left')}>
          <input
            ref={ref}
            id={inputId}
            disabled={isDisabled}
            readOnly={isReadOnly}
            value={value}
            defaultValue={defaultValue}
            style={{ ...innerInputStyle, paddingLeft: 'var(--dimension-tier-6)', paddingRight: 'var(--dimension-tier-7)' }}
            onFocus={handleCompoundFocus}
            onBlur={handleCompoundBlur}
            {...props}
          />
        </div>
      </div>
    );
  }

  // ── COPY type ───────────────────────────────────────────────────────────────
  if (inputType === 'copy') {
    return wrapperContent(
      <div style={{ display: 'flex', alignItems: 'stretch', width: '100%', height }}>
        {/* Input portion — gets focus ring, open on right */}
        <div style={inputPortionStyle('right')}>
          <input
            ref={ref}
            id={inputId}
            disabled={isDisabled}
            readOnly={isReadOnly}
            value={value}
            defaultValue={defaultValue}
            style={{ ...innerInputStyle, paddingLeft: 'var(--dimension-tier-7)', paddingRight: 'var(--dimension-tier-6)' }}
            onFocus={handleCompoundFocus}
            onBlur={handleCompoundBlur}
            {...props}
          />
        </div>
        {/* Right add-on — shares border edge with input, no left border */}
        <button
          type="button"
          disabled={isDisabled}
          onClick={handleCopy}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--dimension-tier-4)',
            padding: '0 var(--dimension-tier-7)',
            backgroundColor: isDisabled ? 'var(--color-surface-disabled)' : 'var(--color-surface-soft)',
            borderTop: `1px solid ${addonBorderColor}`,
            borderRight: `1px solid ${addonBorderColor}`,
            borderBottom: `1px solid ${addonBorderColor}`,
            borderLeft: `1px solid ${addonBorderColor}`,
            borderRadius: '0 var(--radius-m) var(--radius-m) 0',
            flexShrink: 0,
            cursor: isDisabled ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.15s, border-color 0.15s, box-shadow 0.15s',
            fontFamily: 'var(--font-family-base)',
            boxSizing: 'border-box',
            outline: 'none',
          }}
          onMouseEnter={(e) => {
            if (!isDisabled) e.currentTarget.style.backgroundColor = 'var(--color-surface-moderate)';
          }}
          onMouseLeave={(e) => {
            if (!isDisabled) e.currentTarget.style.backgroundColor = 'var(--color-surface-soft)';
          }}
          onFocus={(e) => {
            if (isDisabled) return;
            e.currentTarget.style.border = '2px solid var(--color-border-solid)';
            e.currentTarget.style.boxShadow = '0px 0px 0px 2px var(--color-surface-main), 0px 0px 0px 6px var(--color-amber-300)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.border = `1px solid ${addonBorderColor}`;
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <Copy width={16} height={16} style={{ color: isDisabled ? 'var(--color-foreground-disabled)' : 'var(--color-foreground-soft)', flexShrink: 0 }} />
          <span style={{
            fontSize: 'var(--font-size-m)',
            fontWeight: 'var(--font-weight-heading)',
            color: isDisabled ? 'var(--color-text-disabled)' : 'var(--color-text-soft)',
            lineHeight: 'var(--line-height-body-m)',
            whiteSpace: 'nowrap',
          }}>
            {copied ? 'Copied!' : 'Copy'}
          </span>
        </button>
      </div>
    );
  }

  // ── CURRENCY type ───────────────────────────────────────────────────────────
  if (inputType === 'currency') {
    return wrapperContent(
      <div style={{
        display: 'flex',
        alignItems: 'center',
        height,
        borderRadius: 'var(--radius-m)',
        backgroundColor: isDisabled ? 'var(--color-surface-disabled)' : 'var(--color-surface-main)',
        gap: 'var(--dimension-tier-7)',
        paddingLeft: 'var(--dimension-tier-7)',
        transition: 'border 0.15s, box-shadow 0.15s',
        boxSizing: 'border-box',
        ...containerFocusStyle,
      }}>
        {/* Currency symbol */}
        <span style={{
          fontSize: 'var(--font-size-m)',
          fontWeight: 'var(--font-weight-body)',
          color: isDisabled ? 'var(--color-text-disabled)' : 'var(--color-text-moderate)',
          lineHeight: 'var(--line-height-body-m)',
          flexShrink: 0,
        }}>
          {currencySymbol}
        </span>
        {/* Amount input */}
        <input
          ref={ref}
          id={inputId}
          disabled={isDisabled}
          readOnly={isReadOnly}
          value={value}
          defaultValue={defaultValue}
          inputMode="decimal"
          style={{ ...innerInputStyle }}
          onFocus={handleCompoundFocus}
          onBlur={handleCompoundBlur}
          {...props}
        />
        {/* Currency code button — own focus ring, always 2px border to avoid layout shift */}
        <button
          type="button"
          disabled={isDisabled}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--dimension-tier-2)',
            padding: `var(--dimension-tier-5) var(--dimension-tier-7)`,
            height: '100%',
            flexShrink: 0,
            background: 'none',
            border: '2px solid transparent',
            borderRadius: '0 var(--radius-m) var(--radius-m) 0',
            cursor: isDisabled ? 'not-allowed' : 'pointer',
            transition: 'border-color 0.15s, box-shadow 0.15s',
            fontFamily: 'var(--font-family-base)',
            boxSizing: 'border-box',
            outline: 'none',
          }}
          onFocus={(e) => {
            if (isDisabled) return;
            e.currentTarget.style.borderColor = 'var(--color-border-solid)';
            e.currentTarget.style.boxShadow = '0px 0px 0px 2px var(--color-surface-main), 0px 0px 0px 6px var(--color-amber-300)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'transparent';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <span style={{
            fontSize: 'var(--font-size-m)',
            fontWeight: 'var(--font-weight-body-strong)',
            color: isDisabled ? 'var(--color-text-disabled)' : 'var(--color-text-moderate)',
            lineHeight: 'var(--line-height-body-m)',
            whiteSpace: 'nowrap',
          }}>
            {currencyCode}
          </span>
          <ChevronDown width={16} height={16} style={{ color: isDisabled ? 'var(--color-foreground-disabled)' : 'var(--color-foreground-moderate)' }} />
        </button>
      </div>
    );
  }

  // ── PHONE type ──────────────────────────────────────────────────────────────
  if (inputType === 'phone') {
    return wrapperContent(
      <div style={{
        display: 'flex',
        alignItems: 'center',
        height,
        borderRadius: 'var(--radius-m)',
        backgroundColor: isDisabled ? 'var(--color-surface-disabled)' : 'var(--color-surface-main)',
        gap: 'var(--dimension-tier-7)',
        transition: 'border 0.15s, box-shadow 0.15s',
        boxSizing: 'border-box',
        ...containerFocusStyle,
      }}>
        {/* Country dropdown — own focus ring on the left side */}
        <button
          type="button"
          disabled={isDisabled}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--dimension-tier-2)',
            padding: `var(--dimension-tier-5) var(--dimension-tier-7)`,
            height: '100%',
            flexShrink: 0,
            background: 'none',
            border: '2px solid transparent',
            borderRadius: 'var(--radius-m) 0 0 var(--radius-m)',
            cursor: isDisabled ? 'not-allowed' : 'pointer',
            transition: 'border-color 0.15s, box-shadow 0.15s',
            fontFamily: 'var(--font-family-base)',
            boxSizing: 'border-box',
            outline: 'none',
          }}
          onFocus={(e) => {
            if (isDisabled) return;
            e.currentTarget.style.borderColor = 'var(--color-border-solid)';
            e.currentTarget.style.boxShadow = '0px 0px 0px 2px var(--color-surface-main), 0px 0px 0px 6px var(--color-amber-300)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'transparent';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <span style={{
            fontSize: 'var(--font-size-m)',
            fontWeight: 'var(--font-weight-body-strong)',
            color: isDisabled ? 'var(--color-text-disabled)' : 'var(--color-text-moderate)',
            lineHeight: 'var(--line-height-body-m)',
            whiteSpace: 'nowrap',
          }}>
            {countryCode}
          </span>
          <ChevronDown width={16} height={16} style={{ color: isDisabled ? 'var(--color-foreground-disabled)' : 'var(--color-foreground-moderate)' }} />
        </button>
        {/* Phone number input */}
        <input
          ref={ref}
          id={inputId}
          type="tel"
          disabled={isDisabled}
          readOnly={isReadOnly}
          value={value}
          defaultValue={defaultValue}
          style={{ ...innerInputStyle, paddingRight: 'var(--dimension-tier-7)' }}
          onFocus={handleCompoundFocus}
          onBlur={handleCompoundBlur}
          {...props}
        />
      </div>
    );
  }

  return null;
});

Input.displayName = 'Input';
export default Input;
