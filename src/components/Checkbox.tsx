'use client';

import React, { useState } from 'react';
import BaseCheckbox, { BaseCheckboxChecked } from '@/components/BaseCheckbox';

export type CheckboxSize = 'sm' | 'md';
export type CheckboxState = 'default' | 'disabled' | 'readonly';

interface CheckboxProps {
  label?: string;
  /** Supporting text rendered below the label */
  supportingText?: string;
  size?: CheckboxSize;
  state?: CheckboxState;
  checked?: BaseCheckboxChecked;
  disabled?: boolean;
  readOnly?: boolean;
  name?: string;
  value?: string;
  id?: string;
  onChange?: (checked: boolean) => void;
  'aria-label'?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(({
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
  const isChecked = checked === true;
  const isIndeterminate = checked === 'indeterminate';

  const checkboxId = id || label?.toLowerCase().replace(/\s+/g, '-');

  // Derive the visual state for BaseCheckbox
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
      htmlFor={checkboxId}
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
        ref={(el) => {
          if (el) el.indeterminate = isIndeterminate;
          if (typeof ref === 'function') ref(el);
          else if (ref) ref.current = el;
        }}
        id={checkboxId}
        type="checkbox"
        name={name}
        value={value}
        checked={isChecked}
        disabled={isDisabled}
        readOnly={isReadonly}
        onChange={() => isInteractive && onChange?.(!isChecked)}
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

      {/* Visual checkbox */}
      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <BaseCheckbox
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
              textBoxTrim: 'trim-both',
              textBoxEdge: 'cap alphabetic',
            } as React.CSSProperties}>
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
              textBoxTrim: 'trim-both',
              textBoxEdge: 'cap alphabetic',
            } as React.CSSProperties}>
              {supportingText}
            </p>
          )}
        </div>
      )}
    </label>
  );
});

Checkbox.displayName = 'Checkbox';
export default Checkbox;
