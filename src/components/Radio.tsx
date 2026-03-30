'use client';

import React, { useState } from 'react';
import BaseRadio from '@/components/BaseRadio';

export type RadioSize = 'sm' | 'md';
export type RadioState = 'default' | 'disabled' | 'readonly';

interface RadioProps {
  label?: string;
  /** Supporting text rendered below the label */
  supportingText?: string;
  size?: RadioSize;
  state?: RadioState;
  checked?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  name?: string;
  value?: string;
  id?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  'aria-label'?: string;
}

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(({
  label,
  supportingText,
  size = 'sm',
  state = 'default',
  checked = false,
  disabled,
  readOnly,
  name,
  value,
  id,
  onChange,
  'aria-label': ariaLabel,
}, ref) => {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  const isDisabled = disabled || state === 'disabled';
  const isReadonly = readOnly || state === 'readonly';
  const isInteractive = !isDisabled && !isReadonly;

  const radioId = id || label?.toLowerCase().replace(/\s+/g, '-');

  // Derive the visual state for BaseRadio
  const baseState = isDisabled ? 'disabled'
    : isReadonly ? 'readonly'
    : focused ? 'focused'
    : hovered ? 'hover'
    : 'default';

  // Size-dependent tokens
  const gap = size === 'md' ? 'var(--space-page-inside-s)' : 'var(--space-page-inside-xs)';
  const fontSize = size === 'md' ? 'var(--font-size-m)' : 'var(--font-size-s)';
  const lineHeight = size === 'md' ? 'var(--line-height-body-m)' : 'var(--line-height-body-s)';
  const minLabelHeight = size === 'md' ? 'var(--size-actions-xxs)' : 'var(--size-actions-3xs)';

  // Text colors
  const labelColor = isDisabled || isReadonly
    ? 'var(--color-text-disabled)'
    : 'var(--color-text-soft)';
  const supportingColor = isDisabled || isReadonly
    ? 'var(--color-text-disabled)'
    : 'var(--color-text-moderate)';

  const hasText = !!(label || supportingText);

  return (
    <label
      htmlFor={radioId}
      style={{
        display: 'flex',
        alignItems: hasText ? 'flex-start' : 'center',
        gap,
        cursor: isDisabled ? 'not-allowed' : isReadonly ? 'default' : 'pointer',
        position: 'relative',
      }}
      onMouseEnter={() => isInteractive && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Hidden native input */}
      <input
        ref={ref}
        id={radioId}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={isDisabled}
        readOnly={isReadonly}
        onChange={onChange}
        aria-label={!label ? ariaLabel : undefined}
        style={{
          position: 'absolute',
          opacity: 0,
          width: 0,
          height: 0,
          margin: 0,
          pointerEvents: 'none',
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />

      {/* Visual radio circle */}
      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <BaseRadio
          size={size}
          checked={checked}
          forceState={baseState}
        />
      </div>

      {/* Label + supporting text */}
      {hasText && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap,
          flex: 1,
          minWidth: 0,
          fontSize,
        }}>
          {label && (
            <div style={{
              fontFamily: 'var(--font-family-base)',
              fontWeight: 'var(--font-weight-body-strong)',
              color: labelColor,
              lineHeight,
              minHeight: minLabelHeight,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
              {label}
            </div>
          )}
          {supportingText && (
            <p style={{
              margin: 0,
              fontFamily: 'var(--font-family-base)',
              fontWeight: 'var(--font-weight-body)',
              color: supportingColor,
              fontSize,
              lineHeight,
            }}>
              {supportingText}
            </p>
          )}
        </div>
      )}
    </label>
  );
});

Radio.displayName = 'Radio';
export default Radio;
