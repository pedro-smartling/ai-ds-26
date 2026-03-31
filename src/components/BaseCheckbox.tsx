'use client';

import React, { useState } from 'react';

export type BaseCheckboxSize = 'sm' | 'md';
export type BaseCheckboxState = 'default' | 'hover' | 'focused' | 'disabled' | 'readonly';
export type BaseCheckboxChecked = boolean | 'indeterminate';

interface BaseCheckboxProps {
  checked?: BaseCheckboxChecked;
  size?: BaseCheckboxSize;
  /** Override visual state (for demos). In normal usage state is derived from interaction. */
  forceState?: BaseCheckboxState;
  onChange?: (checked: boolean) => void;
  name?: string;
  value?: string;
  'aria-label'?: string;
}

const CheckIcon = ({ color, size }: { color: string; size: number }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none" style={{ display: 'block' }}>
    <path d="M10 3L4.5 8.5L2 6" stroke={color} strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MinusIcon = ({ color, size }: { color: string; size: number }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none" style={{ display: 'block' }}>
    <path d="M2.5 6H9.5" stroke={color} strokeWidth="2.75" strokeLinecap="round" />
  </svg>
);

export default function BaseCheckbox({
  checked = false,
  size = 'md',
  forceState,
  onChange,
  name,
  value,
  'aria-label': ariaLabel,
}: BaseCheckboxProps) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  const state: BaseCheckboxState = forceState ?? (
    focused ? 'focused' : hovered ? 'hover' : 'default'
  );

  const isDisabled = state === 'disabled';
  const isReadonly = state === 'readonly';
  const isInteractive = !isDisabled && !isReadonly;
  const isChecked = checked === true;
  const isIndeterminate = checked === 'indeterminate';
  const isFilled = isChecked || isIndeterminate;

  const dimVar = size === 'sm' ? 'var(--size-actions-3xs)' : 'var(--size-actions-xxs)';
  const dim = size === 'sm' ? 16 : 20;
  const borderRadius = size === 'sm' ? 'var(--radius-xs)' : 'var(--radius-s)';
  const iconSize = size === 'sm' ? 10 : 12;

  // Background
  const bgColor = isDisabled || isReadonly
    ? 'var(--color-surface-disabled)'
    : isFilled
    ? 'var(--color-surface-form-selected)'
    : 'var(--color-surface-main)';

  // Border
  const borderColor = isDisabled || isReadonly
    ? 'var(--color-border-disabled)'
    : isFilled
    ? 'transparent'
    : 'var(--color-border-main)';

  // Icon color
  const iconColor = isDisabled || isReadonly
    ? 'var(--color-foreground-moderate)'
    : 'var(--color-foreground-form-selected)';

  // Focus ring
  const focusRing = state === 'focused'
    ? '0px 0px 0px 2px var(--color-surface-main), 0px 0px 0px 6px var(--color-amber-300)'
    : 'none';

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width: dimVar,
    height: dimVar,
    borderRadius,
    border: `1px solid ${borderColor}`,
    backgroundColor: bgColor,
    boxShadow: focusRing,
    boxSizing: 'border-box',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'clip',
    transition: 'background-color 0.1s, border-color 0.1s, box-shadow 0.1s',
    cursor: isDisabled ? 'not-allowed' : isReadonly ? 'default' : 'pointer',
    outline: 'none',
  };

  return (
    <div style={{ position: 'relative', display: 'inline-flex' }}>
      <input
        type="checkbox"
        name={name}
        value={value}
        checked={isChecked}
        disabled={isDisabled}
        readOnly={isReadonly}
        aria-label={ariaLabel}
        ref={(el) => { if (el) el.indeterminate = isIndeterminate; }}
        onChange={() => isInteractive && onChange?.(!isChecked)}
        style={{
          position: 'absolute',
          opacity: 0,
          width: dim,
          height: dim,
          margin: 0,
          cursor: isDisabled ? 'not-allowed' : 'pointer',
          zIndex: 1,
          pointerEvents: forceState ? 'none' : undefined,
        }}
        onFocus={() => !forceState && setFocused(true)}
        onBlur={() => !forceState && setFocused(false)}
      />
      <div
        style={containerStyle}
        onMouseEnter={() => isInteractive && !forceState && setHovered(true)}
        onMouseLeave={() => !forceState && setHovered(false)}
      >
        {isChecked && <CheckIcon color={iconColor} size={iconSize} />}
        {isIndeterminate && <MinusIcon color={iconColor} size={iconSize} />}
      </div>
    </div>
  );
}
