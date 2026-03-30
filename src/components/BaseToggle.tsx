'use client';

import React, { useState } from 'react';

export type BaseToggleSize = 'sm' | 'md';
export type BaseToggleState = 'default' | 'hover' | 'focused' | 'disabled' | 'readonly';

interface BaseToggleProps {
  checked?: boolean;
  size?: BaseToggleSize;
  /** Override visual state for demos */
  forceState?: BaseToggleState;
  onChange?: (checked: boolean) => void;
  'aria-label'?: string;
}

/* ── Size tokens from Figma ──────────────────────────────────────────── */
const TRACK = {
  sm: { width: 'var(--size-actions-l)', height: 'var(--size-actions-2xs)' },     // 36×20
  md: { width: 'var(--size-actions-2xl)', height: 'var(--size-actions-xs)' },     // 44×24
} as const;

const KNOB = {
  sm: 'var(--size-actions-3xs)',  // 16px
  md: 'var(--size-actions-2xs)',  // 20px
} as const;

export default function BaseToggle({
  checked = false,
  size = 'md',
  forceState,
  onChange,
  'aria-label': ariaLabel,
}: BaseToggleProps) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  const state: BaseToggleState = forceState ?? (
    focused ? 'focused' : hovered ? 'hover' : 'default'
  );

  const isDisabled = state === 'disabled';
  const isReadonly = state === 'readonly';
  const isInteractive = !isDisabled && !isReadonly;
  const isFocused = state === 'focused';

  const track = TRACK[size];
  const knobSize = KNOB[size];

  // ── Track background ──────────────────────────────────────────────
  const trackBg = isDisabled || isReadonly
    ? 'var(--color-surface-disabled)'
    : checked
    ? 'var(--color-surface-form-selected)'
    : 'var(--color-surface-strong)';

  // ── Track border — always 2px to prevent layout shift ─────────────
  // Default/hover: transparent border reserves space
  // Focused: solid neutral-800 border
  // Disabled/readonly: 1px visible + 1px transparent to keep same total
  // Always 2px border to prevent layout shift; transparent when not focused
  const trackBorder = `var(--border-width-tier-4) solid ${isFocused ? 'var(--color-neutral-800)' : 'transparent'}`;

  const disabledBorderShadow = isDisabled || isReadonly
    ? 'inset 0 0 0 1px var(--color-border-disabled)'
    : 'none';

  // ── Focus ring ────────────────────────────────────────────────────
  const focusRing = isFocused
    ? '0px 0px 0px 2px var(--color-surface-main), 0px 0px 0px 6px var(--color-amber-300)'
    : disabledBorderShadow;

  // ── Knob styles ───────────────────────────────────────────────────
  const knobBg = isDisabled || isReadonly
    ? 'var(--color-foreground-disabled)'
    : 'var(--color-foreground-form-selected)';

  const knobShadow = isDisabled || isReadonly
    ? 'none'
    : '0px 1px 2px rgba(16, 24, 40, 0.06), 0px 1px 3px rgba(16, 24, 40, 0.1)';

  return (
    <div style={{ position: 'relative', display: 'inline-flex' }}>
      <input
        type="checkbox"
        role="switch"
        checked={checked}
        disabled={isDisabled}
        readOnly={isReadonly}
        aria-label={ariaLabel}
        onChange={() => isInteractive && onChange?.(!checked)}
        style={{
          position: 'absolute',
          opacity: 0,
          width: '100%',
          height: '100%',
          margin: 0,
          cursor: isDisabled ? 'not-allowed' : 'pointer',
          zIndex: 1,
        }}
        onFocus={() => !forceState && setFocused(true)}
        onBlur={() => !forceState && setFocused(false)}
      />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: checked ? 'flex-end' : 'flex-start',
          width: track.width,
          height: track.height,
          padding: 'var(--dimension-tier-2)',
          borderRadius: 'var(--radius-full)',
          backgroundColor: trackBg,
          border: trackBorder,
          boxShadow: focusRing,
          boxSizing: 'border-box',
          overflow: 'clip',
          transition: 'background-color 0.15s, border-color 0.15s, box-shadow 0.15s',
          cursor: isDisabled ? 'not-allowed' : isReadonly ? 'default' : 'pointer',
        }}
        onMouseEnter={() => isInteractive && !forceState && setHovered(true)}
        onMouseLeave={() => !forceState && setHovered(false)}
      >
        {/* Knob */}
        <div
          style={{
            width: knobSize,
            height: knobSize,
            borderRadius: 'var(--radius-full)',
            backgroundColor: knobBg,
            boxShadow: knobShadow,
            flexShrink: 0,
          }}
        />
      </div>
    </div>
  );
}
