'use client';

import React from 'react';
import BaseCheckbox from '@/components/BaseCheckbox';

export type SubmenuVariant =
  | 'default'
  | 'checkbox'
  | 'checkbox-tip'
  | 'checkbox-tree'
  | 'skeleton'
  | 'empty';

export interface SubmenuItem {
  id: string;
  label: string;
  supportingText?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  /** For tree variant: groups items under a checkable category */
  group?: string;
}

interface BaseSubmenuProps {
  variant?: SubmenuVariant;
  items?: SubmenuItem[];
  /** Selected item IDs (checkbox/tree) or single selected ID (default) */
  selected?: Set<string> | string;
  onSelect?: (id: string) => void;
  onSelectAll?: () => void;
  onClearAll?: () => void;
  /** For tree variant: group-level selection state */
  groupSelected?: Record<string, boolean | 'indeterminate'>;
  onGroupSelect?: (group: string) => void;
  /** Empty state content */
  emptyTitle?: string;
  emptyDescription?: string;
  onRetry?: () => void;
  /** Override width */
  width?: number | string;
}

/* ── Shared styles ─────────────────────────────────────────────────── */

const textTrim = {
  textBoxTrim: 'trim-both',
  textBoxEdge: 'cap alphabetic',
} as React.CSSProperties;

/* ── Subcomponents ─────────────────────────────────────────────────── */

function HeaderRow({
  allSelected,
  onSelectAll,
  onClearAll,
}: {
  allSelected: boolean | 'indeterminate';
  onSelectAll?: () => void;
  onClearAll?: () => void;
}) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      height: 48,
      padding: '0 var(--space-page-inside-xxs)',
      borderBottom: '1px solid var(--color-border-soft)',
      width: '100%',
      boxSizing: 'border-box',
      flexShrink: 0,
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
        padding: 'var(--space-page-inside-s) var(--space-page-inside-xs)',
        borderRadius: 6,
      }}>
        <div
          style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
          onClick={onSelectAll}
        >
          <BaseCheckbox
            size="md"
            checked={allSelected === 'indeterminate' ? 'indeterminate' : allSelected}
            forceState="default"
          />
          <span style={{
            fontFamily: 'var(--font-family-base)',
            fontWeight: 'var(--font-weight-heading)',
            fontSize: 'var(--font-size-m)',
            lineHeight: 'var(--line-height-body-m)',
            color: 'var(--color-text-main)',
            ...textTrim,
          }}>
            Select all
          </span>
        </div>
        {onClearAll && (
          <button
            onClick={onClearAll}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-family-base)',
              fontWeight: 'var(--font-weight-body-strong)',
              fontSize: 'var(--font-size-m)',
              lineHeight: 'var(--line-height-body-m)',
              color: 'var(--color-blue-600)',
              textDecoration: 'underline',
              padding: 'var(--space-page-inside-xxs) var(--space-page-inside-xs)',
              ...textTrim,
            }}
          >
            Clear all
          </button>
        )}
      </div>
    </div>
  );
}

function ItemRow({
  item,
  isSelected,
  showCheckbox,
  showTip,
  isCategory,
  indent,
  categoryWeight,
  onClick,
}: {
  item: SubmenuItem;
  isSelected: boolean | 'indeterminate';
  showCheckbox: boolean;
  showTip: boolean;
  isCategory?: boolean;
  indent?: number;
  categoryWeight?: boolean;
  onClick?: () => void;
}) {
  const [hovered, setHovered] = React.useState(false);

  const isDisabled = item.disabled;
  const textColor = isDisabled ? 'var(--color-text-disabled)' : 'var(--color-text-main)';
  const fontWeight = categoryWeight ? 'var(--font-weight-heading)' : 'var(--font-weight-body)';

  const contentBg = isDisabled
    ? undefined
    : (isSelected === true && !isCategory) || hovered
    ? 'var(--color-surface-main-hover)'
    : undefined;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        height: showTip ? undefined : 48,
        padding: '0 var(--space-page-inside-xxs)',
        width: '100%',
        boxSizing: 'border-box',
        ...(isCategory ? {
          borderBottom: '1px solid var(--color-border-soft)',
          borderLeft: '1px solid var(--color-border-soft)',
          borderRight: '1px solid var(--color-border-soft)',
          boxShadow: '0px 1px 2px 0px rgba(16, 24, 41, 0.06), 0px 2px 3px 0px rgba(16, 24, 41, 0.1)',
        } : {}),
      }}
      onMouseEnter={() => !isDisabled && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => !isDisabled && onClick?.()}
      role="menuitem"
      aria-disabled={isDisabled || undefined}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        minWidth: 0,
        borderRadius: 6,
        paddingTop: 'var(--space-page-inside-s)',
        paddingBottom: showTip ? 'var(--space-page-inside-xs)' : 'var(--space-page-inside-s)',
        paddingLeft: indent ? `${indent}px` : 'var(--space-page-inside-xs)',
        paddingRight: showCheckbox ? 'var(--space-page-inside-m)' : 'var(--space-page-inside-xs)',
        backgroundColor: contentBg,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
      }}>
        <div style={{
          display: 'flex',
          gap: 8,
          alignItems: showTip ? 'flex-start' : 'center',
          width: '100%',
        }}>
          {/* Leading icon (default variant) */}
          {!showCheckbox && item.icon && (
            <div style={{
              flexShrink: 0,
              width: 20,
              height: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: isDisabled ? 'var(--color-foreground-disabled)' : 'var(--color-foreground-moderate)',
            }}>
              {item.icon}
            </div>
          )}

          {/* Checkbox */}
          {showCheckbox && (
            <BaseCheckbox
              size="md"
              checked={isSelected === 'indeterminate' ? 'indeterminate' : !!isSelected}
              forceState={isDisabled ? 'disabled' : 'default'}
            />
          )}

          {/* Text */}
          {showTip ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-page-inside-xs)',
              flex: 1,
              minWidth: 0,
              paddingBottom: 'var(--space-page-inside-xs)',
            }}>
              <span style={{
                fontFamily: 'var(--font-family-base)',
                fontWeight: 'var(--font-weight-body-strong)',
                fontSize: 'var(--font-size-m)',
                lineHeight: 'var(--line-height-body-m)',
                color: textColor,
                ...textTrim,
              }}>
                {item.label}
              </span>
              {item.supportingText && (
                <p style={{
                  margin: 0,
                  fontFamily: 'var(--font-family-base)',
                  fontWeight: 'var(--font-weight-body)',
                  fontSize: 'var(--font-size-s)',
                  lineHeight: 'var(--line-height-body-s)',
                  color: isDisabled ? 'var(--color-text-disabled)' : 'var(--color-text-moderate)',
                  whiteSpace: 'normal',
                  ...textTrim,
                }}>
                  {item.supportingText}
                </p>
              )}
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
              flex: 1,
              ...textTrim,
            }}>
              {item.label}
            </span>
          )}

          {/* Checkmark for selected default items */}
          {!showCheckbox && isSelected === true && (
            <svg width={20} height={20} viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
              <path d="M16.6667 5L7.50004 14.1667L3.33337 10" stroke="var(--color-foreground-brand-main)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}

function SkeletonRow() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      height: 48,
      padding: '0 var(--space-page-inside-xxs)',
      width: '100%',
      boxSizing: 'border-box',
    }}>
      <div style={{
        display: 'flex',
        gap: 8,
        alignItems: 'center',
        flex: 1,
        padding: 'var(--space-page-inside-s) var(--space-page-inside-xs)',
        borderRadius: 6,
      }}>
        <div style={{
          width: 20,
          height: 20,
          borderRadius: 'var(--radius-s)',
          backgroundColor: 'var(--color-surface-moderate)',
          flexShrink: 0,
        }} />
        <div style={{
          flex: 1,
          height: 20,
          borderRadius: 96,
          backgroundColor: 'var(--color-surface-moderate)',
        }} />
      </div>
    </div>
  );
}

function EmptyState({
  title = "Something's wrong",
  description = 'We were unable to load the data you have requested this time',
  onRetry,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
}) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 'var(--space-page-inside-m)',
      padding: 'var(--space-page-inside-xl)',
      textAlign: 'center',
      overflow: 'clip',
      borderRadius: 8,
    }}>
      {/* Icon */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          backgroundColor: 'var(--color-surface-brand-main)',
          borderRadius: 200,
          padding: 'var(--space-page-inside-m)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <svg width={32} height={32} viewBox="0 0 24 24" fill="none" style={{ boxShadow: '0px 1px 3px 0px rgba(16,24,40,0.1), 0px 1px 2px 0px rgba(16,24,40,0.06)' }}>
            <path d="M8.53 2.61A10.9 10.9 0 0 1 12 2c5.52 0 10 4.48 10 10 0 1.22-.22 2.39-.61 3.47M1.39 8.53C1.14 9.3 1 10.13 1 11c0 5.52 4.48 10 10 10 .87 0 1.7-.14 2.47-.39" stroke="var(--color-foreground-brand-main)" strokeWidth="2" strokeLinecap="round" />
            <path d="M1 1l22 22" stroke="var(--color-foreground-brand-main)" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Text */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-page-inside-s)',
        width: '100%',
      }}>
        <p style={{
          margin: 0,
          fontFamily: 'var(--font-family-base)',
          fontWeight: 'var(--font-weight-heading)',
          fontSize: 'var(--font-size-m)',
          lineHeight: 'var(--line-height-body-m)',
          color: 'var(--color-foreground-main)',
          ...textTrim,
        }}>
          {title}
        </p>
        <p style={{
          margin: 0,
          fontFamily: 'var(--font-family-base)',
          fontWeight: 'var(--font-weight-body)',
          fontSize: 'var(--font-size-s)',
          lineHeight: 'var(--line-height-body-s)',
          color: 'var(--color-text-soft)',
          ...textTrim,
        }}>
          {description}
        </p>
      </div>

      {/* Retry button */}
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            fontFamily: 'var(--font-family-base)',
            fontWeight: 'var(--font-weight-body-strong)',
            fontSize: 'var(--font-size-s)',
            lineHeight: 'var(--line-height-body-s)',
            color: 'var(--color-foreground-brand-main)',
            backgroundColor: 'transparent',
            border: '1px solid var(--color-border-brand-main)',
            borderRadius: 'var(--radius-m)',
            padding: 'var(--space-page-inside-xs) var(--space-page-inside-m)',
            cursor: 'pointer',
            ...textTrim,
          }}
        >
          Try again
        </button>
      )}
    </div>
  );
}

/* ── Main component ────────────────────────────────────────────────── */

export default function BaseSubmenu({
  variant = 'default',
  items = [],
  selected,
  onSelect,
  onSelectAll,
  onClearAll,
  groupSelected,
  onGroupSelect,
  emptyTitle,
  emptyDescription,
  onRetry,
  width = 320,
}: BaseSubmenuProps) {
  const isCheckVariant = variant === 'checkbox' || variant === 'checkbox-tip' || variant === 'checkbox-tree';
  const selectedSet = typeof selected === 'string'
    ? new Set([selected])
    : selected ?? new Set<string>();

  // Compute "select all" state
  const allSelected = items.length === 0
    ? false
    : items.every((i) => selectedSet.has(i.id))
    ? true
    : items.some((i) => selectedSet.has(i.id))
    ? 'indeterminate'
    : false;

  // Group items for tree variant
  const groups = variant === 'checkbox-tree'
    ? Array.from(new Set(items.map((i) => i.group).filter(Boolean))) as string[]
    : [];

  return (
    <div
      style={{
        backgroundColor: 'var(--color-surface-main)',
        border: '1px solid var(--color-border-soft)',
        borderRadius: 'var(--radius-m)',
        boxShadow: '0px 4px 6px 0px rgba(16, 24, 41, 0.03), 0px 12px 16px 0px rgba(16, 24, 41, 0.08)',
        width,
        display: 'flex',
        alignItems: 'flex-start',
        overflow: variant === 'empty' ? 'clip' : undefined,
      }}
      role="menu"
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        minWidth: 0,
        paddingBottom: variant === 'empty' ? 0 : 'var(--space-page-inside-xxs)',
        gap: variant === 'empty' ? 0 : 2,
      }}>
        {/* Empty state */}
        {variant === 'empty' && (
          <EmptyState title={emptyTitle} description={emptyDescription} onRetry={onRetry} />
        )}

        {/* Skeleton */}
        {variant === 'skeleton' && (
          <>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              height: 48,
              borderBottom: '1px solid var(--color-border-soft)',
            }}>
              <SkeletonRow />
            </div>
            {Array.from({ length: items.length || 6 }).map((_, i) => (
              <SkeletonRow key={i} />
            ))}
          </>
        )}

        {/* Header row for checkbox variants */}
        {isCheckVariant && variant !== 'checkbox-tree' && (
          <HeaderRow
            allSelected={allSelected}
            onSelectAll={onSelectAll}
            onClearAll={onClearAll}
          />
        )}

        {/* Tree variant header */}
        {variant === 'checkbox-tree' && (
          <HeaderRow
            allSelected={allSelected}
            onSelectAll={onSelectAll}
            onClearAll={onClearAll}
          />
        )}

        {/* Default / Checkbox / Checkbox+Tip items */}
        {(variant === 'default' || variant === 'checkbox' || variant === 'checkbox-tip') &&
          items.map((item) => (
            <ItemRow
              key={item.id}
              item={item}
              isSelected={
                variant === 'default'
                  ? (typeof selected === 'string' ? selected === item.id : selectedSet.has(item.id))
                  : selectedSet.has(item.id)
              }
              showCheckbox={variant !== 'default'}
              showTip={variant === 'checkbox-tip'}
              onClick={() => onSelect?.(item.id)}
            />
          ))
        }

        {/* Tree variant: grouped items */}
        {variant === 'checkbox-tree' && groups.map((group) => {
          const groupItems = items.filter((i) => i.group === group);
          const gs = groupSelected?.[group];
          return (
            <React.Fragment key={group}>
              {/* Category header */}
              <ItemRow
                item={{ id: group, label: group }}
                isSelected={gs ?? false}
                showCheckbox
                showTip={false}
                isCategory
                categoryWeight
                onClick={() => onGroupSelect?.(group)}
              />
              {/* Children */}
              {groupItems.map((item) => (
                <ItemRow
                  key={item.id}
                  item={item}
                  isSelected={selectedSet.has(item.id)}
                  showCheckbox
                  showTip={false}
                  indent={20}
                  onClick={() => onSelect?.(item.id)}
                />
              ))}
            </React.Fragment>
          );
        })}

        {/* Tree: ungrouped items */}
        {variant === 'checkbox-tree' &&
          items.filter((i) => !i.group).map((item) => (
            <ItemRow
              key={item.id}
              item={item}
              isSelected={selectedSet.has(item.id)}
              showCheckbox
              showTip={false}
              onClick={() => onSelect?.(item.id)}
            />
          ))
        }
      </div>
    </div>
  );
}
