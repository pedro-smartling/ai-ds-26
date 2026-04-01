'use client';

import React, { useState } from 'react';
import BaseCheckbox, { BaseCheckboxChecked } from '@/components/BaseCheckbox';

export type SubmenuItemVariant =
  | 'default'
  | 'checkbox'
  | 'checkbox-tip'
  | 'checkbox-child-1'
  | 'checkbox-child-2'
  | 'category'
  | 'category-checkable-1'
  | 'category-checkable-2';

export type SubmenuItemState = 'default' | 'hover' | 'focus' | 'disabled' | 'skeleton';
export type SubmenuItemSelected = boolean | 'indeterminate';

interface BaseSubmenuItemProps {
  label?: string;
  supportingText?: string;
  variant?: SubmenuItemVariant;
  /** Override visual state for demos */
  forceState?: SubmenuItemState;
  selected?: SubmenuItemSelected;
  leadingIcon?: React.ReactNode;
  onClick?: () => void;
  'aria-label'?: string;
}

const isCategory = (v: SubmenuItemVariant) =>
  v === 'category' || v === 'category-checkable-1' || v === 'category-checkable-2';

const hasCheckbox = (v: SubmenuItemVariant) =>
  v !== 'default' && v !== 'category';

const getIndentLeft = (v: SubmenuItemVariant): string | undefined => {
  if (v === 'checkbox-child-1' || v === 'category-checkable-2') return 'var(--space-page-inside-l)';
  if (v === 'checkbox-child-2') return 'var(--space-page-inside-2xl)';
  return undefined;
};

export default function BaseSubmenuItem({
  label = 'Menu item',
  supportingText,
  variant = 'default',
  forceState,
  selected = false,
  leadingIcon,
  onClick,
  'aria-label': ariaLabel,
}: BaseSubmenuItemProps) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  const state: SubmenuItemState = forceState ?? (
    focused ? 'focus' : hovered ? 'hover' : 'default'
  );

  const isDisabled = state === 'disabled';
  const isSkeleton = state === 'skeleton';
  const isInteractive = !isDisabled && !isSkeleton;
  const isCat = isCategory(variant);
  const showCheckbox = hasCheckbox(variant);
  const showTip = variant === 'checkbox-tip' && supportingText;
  const indentLeft = getIndentLeft(variant);

  // Checked state for BaseCheckbox
  const checkboxChecked: BaseCheckboxChecked =
    selected === 'indeterminate' ? 'indeterminate' : !!selected;

  // Content background
  const contentBg = isSkeleton
    ? undefined
    : state === 'focus'
    ? 'var(--color-surface-moderate)'
    : state === 'hover' || (selected === true && !isCat)
    ? 'var(--color-surface-main-hover)'
    : undefined;

  // Focus ring
  const contentShadow = state === 'focus'
    ? '0px 0px 0px 2px var(--color-surface-main), 0px 0px 0px 6px var(--color-amber-300)'
    : undefined;

  // Text color
  const textColor = isDisabled
    ? 'var(--color-text-disabled)'
    : 'var(--color-text-main)';

  // Font weight: categories use heading weight
  const fontWeight = isCat
    ? 'var(--font-weight-heading)'
    : 'var(--font-weight-body)';

  // Category border + shadow
  const categoryBorder = isCat
    ? '1px solid var(--color-border-soft)'
    : undefined;
  const categoryShadow = isCat
    ? '0px 1px 2px 0px rgba(16, 24, 41, 0.06), 0px 2px 3px 0px rgba(16, 24, 41, 0.1)'
    : undefined;

  // Outer container
  const outerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    height: showTip ? undefined : 'var(--size-actions-3xl)',
    padding: '0 var(--space-page-inside-xxs)',
    position: 'relative',
    width: '100%',
    boxSizing: 'border-box',
    ...(isCat ? {
      borderBottom: categoryBorder,
      borderLeft: categoryBorder,
      borderRight: categoryBorder,
      boxShadow: categoryShadow,
    } : {}),
    ...(state === 'focus' && isCat ? {
      overflow: 'clip',
      borderRadius: 'var(--radius-s)',
      boxShadow: [categoryShadow, contentShadow].filter(Boolean).join(', '),
    } : {}),
  };

  // Content area
  const contentStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: 1,
    minWidth: 0,
    minHeight: 1,
    borderRadius: 6,
    paddingTop: showTip ? 'var(--space-page-inside-s)' : 'var(--space-page-inside-s)',
    paddingBottom: showTip ? 'var(--space-page-inside-xs)' : 'var(--space-page-inside-s)',
    paddingLeft: indentLeft || (showCheckbox ? 'var(--space-page-inside-xs)' : 'var(--space-page-inside-xs)'),
    paddingRight: showCheckbox ? 'var(--space-page-inside-m)' : 'var(--space-page-inside-xs)',
    backgroundColor: contentBg,
    overflow: state === 'focus' ? 'clip' : undefined,
    boxShadow: !isCat ? contentShadow : undefined,
    cursor: isDisabled ? 'not-allowed' : isSkeleton ? 'default' : 'pointer',
  };

  // Skeleton
  if (isSkeleton) {
    return (
      <div style={outerStyle}>
        <div style={{ ...contentStyle, justifyContent: 'center' }}>
          <div style={{
            width: '100%',
            height: 16,
            borderRadius: 96,
            backgroundColor: 'var(--color-neutral-200)',
          }} />
        </div>
      </div>
    );
  }

  const rowStyle: React.CSSProperties = {
    display: 'flex',
    gap: 8,
    alignItems: showTip ? 'flex-start' : 'center',
    width: '100%',
  };

  return (
    <div
      style={outerStyle}
      role={variant === 'category' ? 'presentation' : 'menuitem'}
      aria-label={ariaLabel}
      aria-disabled={isDisabled || undefined}
      onClick={() => isInteractive && onClick?.()}
      onMouseEnter={() => isInteractive && !forceState && setHovered(true)}
      onMouseLeave={() => !forceState && setHovered(false)}
      onFocus={() => isInteractive && !forceState && setFocused(true)}
      onBlur={() => !forceState && setFocused(false)}
      tabIndex={isDisabled || variant === 'category' ? undefined : 0}
    >
      <div style={contentStyle}>
        <div style={rowStyle}>
          {/* Leading icon (default variant only) */}
          {variant === 'default' && leadingIcon && (
            <div style={{
              flexShrink: 0,
              width: 20,
              height: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: isDisabled ? 'var(--color-foreground-disabled)' : 'var(--color-foreground-moderate)',
            }}>
              {leadingIcon}
            </div>
          )}

          {/* Checkbox */}
          {showCheckbox && (
            <BaseCheckbox
              size="md"
              checked={checkboxChecked}
              forceState={isDisabled ? 'disabled' : 'default'}
            />
          )}

          {/* Text content */}
          {showTip ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-page-inside-xs)',
              flex: 1,
              minWidth: 0,
              paddingBottom: 'var(--space-page-inside-xs)',
            }}>
              <div style={{
                fontFamily: 'var(--font-family-base)',
                fontWeight: 'var(--font-weight-body-strong)',
                fontSize: 'var(--font-size-m)',
                lineHeight: 'var(--line-height-body-m)',
                color: textColor,
                minHeight: 20,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                textBoxTrim: 'trim-both',
                textBoxEdge: 'cap alphabetic',
              } as React.CSSProperties}>
                {label}
              </div>
              <p style={{
                margin: 0,
                fontFamily: 'var(--font-family-base)',
                fontWeight: 'var(--font-weight-body)',
                fontSize: 'var(--font-size-s)',
                lineHeight: 'var(--line-height-body-s)',
                color: isDisabled ? 'var(--color-text-disabled)' : 'var(--color-text-moderate)',
                whiteSpace: 'normal',
                textBoxTrim: 'trim-both',
                textBoxEdge: 'cap alphabetic',
              } as React.CSSProperties}>
                {supportingText}
              </p>
            </div>
          ) : (
            <span style={{
              fontFamily: 'var(--font-family-base)',
              fontWeight,
              fontSize: 'var(--font-size-m)',
              lineHeight: 'var(--line-height-body-m)',
              color: textColor,
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              minHeight: showCheckbox ? 20 : undefined,
              display: showCheckbox ? 'flex' : undefined,
              alignItems: showCheckbox ? 'center' : undefined,
              textBoxTrim: 'trim-both',
              textBoxEdge: 'cap alphabetic',
            } as React.CSSProperties}>
              {label}
            </span>
          )}

          {/* Checkmark for selected default variant (no checkbox) */}
          {variant === 'default' && selected === true && (
            <svg width={20} height={20} viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, marginLeft: 'auto' }}>
              <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="var(--color-foreground-brand-main)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}
