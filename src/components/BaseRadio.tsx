'use client';

import React, { useState } from 'react';

export type BaseRadioSize = 'sm' | 'md';
export type BaseRadioState = 'default' | 'hover' | 'focused' | 'disabled' | 'readonly';

interface BaseRadioProps {
  checked?: boolean;
  size?: BaseRadioSize;
  /** Override visual state (for demos). In normal usage state is derived from interaction. */
  forceState?: BaseRadioState;
  onChange?: (checked: boolean) => void;
  name?: string;
  value?: string;
  'aria-label'?: string;
}

export default function BaseRadio({
  checked = false,
  size = 'md',
  forceState,
  onChange,
  name,
  value,
  'aria-label': ariaLabel,
}: BaseRadioProps) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  const state: BaseRadioState = forceState ?? (
    focused ? 'focused' : hovered ? 'hover' : 'default'
  );

  const isDisabled = state === 'disabled';
  const isReadonly = state === 'readonly';
  const isInteractive = !isDisabled && !isReadonly;

  const dimVar = size === 'sm' ? 'var(--size-actions-3xs)' : 'var(--size-actions-xxs)';
  const dim = size === 'sm' ? 16 : 20;
  const dotSize = size === 'sm' ? 'var(--dimension-tier-4)' : 'var(--dimension-tier-5)';

  // Border
  const borderWidth = state === 'focused' ? 2 : 1;
  const borderColor = isDisabled || isReadonly
    ? 'var(--color-border-disabled)'
    : checked
    ? 'transparent'
    : 'var(--color-border-solid)';

  // Background
  const bgColor = isDisabled || isReadonly
    ? checked ? 'var(--color-surface-moderate)' : 'var(--color-surface-disabled)'
    : checked
    ? 'var(--color-surface-form-selected, #171717)'
    : 'var(--color-surface-main)';

  // Inner dot color
  const dotColor = isDisabled || isReadonly
    ? 'var(--color-foreground-moderate)'
    : 'var(--color-foreground-form-selected, white)';

  // Focus ring
  const focusRing = state === 'focused'
    ? '0px 0px 0px 2px var(--color-surface-main), 0px 0px 0px 4px var(--color-amber-300)'
    : 'none';

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width: dimVar,
    height: dimVar,
    borderRadius: 'var(--radius-full)',
    border: `${borderWidth}px solid ${borderColor}`,
    backgroundColor: bgColor,
    boxShadow: focusRing,
    boxSizing: 'border-box',
    flexShrink: 0,
    transition: 'background-color 0.1s, border-color 0.1s, box-shadow 0.1s',
    cursor: isDisabled ? 'not-allowed' : isReadonly ? 'default' : 'pointer',
    outline: 'none',
  };

  const dotStyle: React.CSSProperties = {
    position: 'absolute',
    width: dotSize,
    height: dotSize,
    borderRadius: 'var(--radius-full)',
    backgroundColor: dotColor,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };

  return (
    <div style={{ position: 'relative', display: 'inline-flex' }}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={isDisabled}
        readOnly={isReadonly}
        aria-label={ariaLabel}
        onChange={() => isInteractive && onChange?.(!checked)}
        style={{
          position: 'absolute',
          opacity: 0,
          width: dim,
          height: dim,
          margin: 0,
          cursor: isDisabled ? 'not-allowed' : 'pointer',
          zIndex: 1,
        }}
        onFocus={() => !forceState && setFocused(true)}
        onBlur={() => !forceState && setFocused(false)}
      />
      <div
        style={containerStyle}
        onMouseEnter={() => isInteractive && !forceState && setHovered(true)}
        onMouseLeave={() => !forceState && setHovered(false)}
      >
        {checked && <div style={dotStyle} />}
      </div>
    </div>
  );
}
