'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import BaseSubmenu, { SubmenuItem } from '@/components/BaseSubmenu';
import { Search, ChevronDown, X, AlertCircle } from 'lucide-react';

export type MultiSelectSize = 'sm' | 'md';

interface MultiSelectProps {
  label?: string;
  hintText?: string;
  errorText?: string;
  placeholder?: string;
  size?: MultiSelectSize;
  items: SubmenuItem[];
  selected: Set<string>;
  onSelect: (id: string) => void;
  onSelectAll?: () => void;
  onClearAll?: () => void;
  /** Max visible tags before "see all" link appears (default: 5) */
  collapseThreshold?: number;
  disabled?: boolean;
  width?: number | string;
}

const textTrim = {
  textBoxTrim: 'trim-both',
  textBoxEdge: 'cap alphabetic',
} as React.CSSProperties;

export default function MultiSelect({
  label,
  hintText,
  errorText,
  placeholder = 'Search...',
  size = 'md',
  items,
  selected,
  onSelect,
  onSelectAll,
  onClearAll,
  collapseThreshold = 5,
  disabled = false,
  width,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllTags, setShowAllTags] = useState(false);
  const [lastSelectedId, setLastSelectedId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isError = !!errorText;
  const inputHeight = size === 'sm' ? 'var(--size-actions-xl)' : 'var(--size-actions-2xl)';

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setIsFocused(false);
        setLastSelectedId(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Clear focused tag highlight after a short delay
  useEffect(() => {
    if (!lastSelectedId) return;
    const t = setTimeout(() => setLastSelectedId(null), 1500);
    return () => clearTimeout(t);
  }, [lastSelectedId]);

  // Filter items by search
  const filteredItems = searchQuery
    ? items.filter((i) => i.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : items;

  // Selected items as array
  const selectedItems = items.filter((i) => selected.has(i.id));
  const shouldCollapse = selectedItems.length >= collapseThreshold + 1 && !showAllTags;
  const visibleTags = shouldCollapse ? selectedItems.slice(0, collapseThreshold) : selectedItems;

  // "Select all" state
  const allSelected = filteredItems.length > 0 && filteredItems.every((i) => selected.has(i.id));

  const handleSelectAll = useCallback(() => {
    if (onSelectAll) {
      onSelectAll();
    } else {
      // Toggle all filtered items
      if (allSelected) {
        filteredItems.forEach((i) => { if (selected.has(i.id)) onSelect(i.id); });
      } else {
        filteredItems.forEach((i) => { if (!selected.has(i.id)) onSelect(i.id); });
      }
    }
  }, [onSelectAll, allSelected, filteredItems, selected, onSelect]);

  const handleClearAll = useCallback(() => {
    if (onClearAll) {
      onClearAll();
    } else {
      selectedItems.forEach((i) => onSelect(i.id));
    }
  }, [onClearAll, selectedItems, onSelect]);

  const handleOpen = () => {
    if (disabled) return;
    setIsOpen(true);
    setIsFocused(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  // Index of tag focused via keyboard (-1 = none)
  const [focusedTagIdx, setFocusedTagIdx] = useState(-1);

  const removeTag = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(id);
    setFocusedTagIdx(-1);
    setLastSelectedId(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    if (e.key === 'Backspace' && searchQuery === '' && visibleTags.length > 0) {
      e.preventDefault();
      if (focusedTagIdx >= 0) {
        // Delete the focused tag
        const tagToRemove = visibleTags[focusedTagIdx];
        onSelect(tagToRemove.id);
        setLastSelectedId(null);
        // Move focus to previous tag or back to input
        if (focusedTagIdx > 0) {
          setFocusedTagIdx(focusedTagIdx - 1);
        } else {
          setFocusedTagIdx(-1);
        }
      } else {
        // Focus the last tag
        setFocusedTagIdx(visibleTags.length - 1);
        setLastSelectedId(null);
      }
      return;
    }

    if (e.key === 'ArrowLeft' && searchQuery === '' && focusedTagIdx > 0) {
      e.preventDefault();
      setFocusedTagIdx(focusedTagIdx - 1);
      return;
    }

    if (e.key === 'ArrowRight' && searchQuery === '' && focusedTagIdx >= 0) {
      e.preventDefault();
      if (focusedTagIdx < visibleTags.length - 1) {
        setFocusedTagIdx(focusedTagIdx + 1);
      } else {
        setFocusedTagIdx(-1);
      }
      return;
    }

    if (e.key === 'Escape') {
      setFocusedTagIdx(-1);
      setLastSelectedId(null);
      setIsOpen(false);
      return;
    }

    // Any other key clears tag focus
    if (focusedTagIdx >= 0) {
      setFocusedTagIdx(-1);
    }
  };

  // Border
  const getBorder = () => {
    if (disabled) return '1px solid var(--color-border-disabled)';
    if (isError && !isFocused) return '1px solid var(--color-border-error-main)';
    if (isFocused) return '2px solid var(--color-border-solid)';
    return '1px solid var(--color-border-main)';
  };

  const getFocusRing = () => {
    if (isFocused && !disabled)
      return '0px 0px 0px 2px var(--color-surface-main), 0px 0px 0px 6px var(--color-amber-300)';
    return '0px 1px 2px 0px rgba(16, 24, 41, 0.05)';
  };

  // Adjust padding when focused (2px border vs 1px)
  const inputPadding = isFocused && !disabled
    ? 'calc(var(--space-page-inside-s) - 1px) calc(var(--space-page-inside-s) - 1px) calc(var(--space-page-inside-s) - 1px) calc(var(--space-page-inside-s) - 1px)'
    : 'var(--space-page-inside-s)';

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', width: width || '100%' }}
    >
      {/* Label */}
      {label && (
        <p style={{
          fontFamily: 'var(--font-family-base)',
          fontWeight: 'var(--font-weight-body-strong)',
          fontSize: 'var(--font-size-s)',
          lineHeight: 'var(--line-height-body-s)',
          color: 'var(--color-text-soft)',
          margin: '0 0 var(--space-page-inside-s)',
          ...textTrim,
        }}>
          {label}
        </p>
      )}

      {/* Hint text */}
      {hintText && (
        <p style={{
          fontFamily: 'var(--font-family-base)',
          fontWeight: 'var(--font-weight-body)',
          fontSize: 'var(--font-size-s)',
          lineHeight: 'var(--line-height-body-s)',
          color: 'var(--color-text-moderate)',
          margin: '0 0 var(--space-page-inside-s)',
          ...textTrim,
        }}>
          {hintText}
        </p>
      )}

      {/* Error message */}
      {errorText && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          marginBottom: 'var(--space-page-inside-s)',
        }}>
          <AlertCircle width={16} height={16} style={{ color: 'var(--color-text-error-main)', flexShrink: 0 }} />
          <p style={{
            margin: 0,
            fontFamily: 'var(--font-family-base)',
            fontWeight: 'var(--font-weight-body-strong)',
            fontSize: 'var(--font-size-s)',
            lineHeight: 'var(--line-height-body-s)',
            color: 'var(--color-text-error-main)',
            ...textTrim,
          }}>
            {errorText}
          </p>
        </div>
      )}

      {/* Input wrapper */}
      <div
        onClick={handleOpen}
        style={{
          position: 'relative',
          backgroundColor: disabled ? 'var(--color-surface-disabled)' : 'var(--color-surface-main)',
          border: getBorder(),
          borderRadius: 'var(--radius-m)',
          boxShadow: getFocusRing(),
          padding: inputPadding,
          paddingRight: 44,
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-page-inside-xs)',
          flexWrap: 'wrap',
          minHeight: inputHeight,
          cursor: disabled ? 'not-allowed' : 'text',
          boxSizing: 'border-box',
          transition: 'border-color 0.1s, box-shadow 0.1s',
        }}
      >
        {/* Search icon */}
        <Search
          width={size === 'sm' ? 16 : 20}
          height={size === 'sm' ? 16 : 20}
          style={{ flexShrink: 0, color: 'var(--color-foreground-moderate)' }}
        />

        {/* Tags */}
        {visibleTags.map((item, idx) => {
          const isTagFocused = lastSelectedId === item.id || focusedTagIdx === idx;
          return (
            <div
              key={item.id}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                padding: isTagFocused ? '3px 3px 3px 7px' : '4px 4px 4px 8px',
                backgroundColor: isTagFocused ? 'var(--color-surface-form-selected)' : 'var(--color-surface-main)',
                border: isTagFocused ? '2px solid var(--color-border-solid)' : '1px solid var(--color-border-soft)',
                borderRadius: 'var(--radius-s)',
                maxHeight: 24,
                boxShadow: isTagFocused
                  ? '0px 0px 0px 2px var(--color-surface-main), 0px 0px 0px 6px var(--color-amber-300)'
                  : undefined,
              }}
            >
              <span style={{
                fontFamily: 'var(--font-family-base)',
                fontWeight: 'var(--font-weight-body-strong)',
                fontSize: 'var(--font-size-xs)',
                color: isTagFocused ? 'var(--color-foreground-form-selected)' : 'var(--color-text-soft)',
                whiteSpace: 'nowrap',
                ...textTrim,
              }}>
                {item.label}
              </span>
              <button
                onClick={(e) => removeTag(item.id, e)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 12,
                  height: 12,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  borderRadius: 3,
                  color: isTagFocused ? 'var(--color-foreground-form-selected)' : 'var(--color-foreground-moderate)',
                }}
              >
                <X width={10} height={10} />
              </button>
            </div>
          );
        })}

        {/* See all / see less link */}
        {selectedItems.length >= collapseThreshold + 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); setShowAllTags(!showAllTags); }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '4px 8px',
              fontFamily: 'var(--font-family-base)',
              fontWeight: 'var(--font-weight-body-strong)',
              fontSize: 'var(--font-size-s)',
              color: 'var(--color-blue-600)',
              textDecoration: 'underline',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              borderRadius: 'var(--radius-s)',
              ...textTrim,
            }}
          >
            {showAllTags ? 'see less' : `see all ${selectedItems.length} selected`}
          </button>
        )}

        {/* Search input */}
        <input
          ref={inputRef}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => { setIsFocused(true); setIsOpen(true); setFocusedTagIdx(-1); }}
          onKeyDown={handleKeyDown}
          placeholder={selectedItems.length === 0 ? placeholder : ''}
          disabled={disabled}
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            fontFamily: 'var(--font-family-base)',
            fontWeight: 'var(--font-weight-body)',
            fontSize: size === 'sm' ? 'var(--font-size-s)' : 'var(--font-size-m)',
            color: 'var(--color-text-main)',
            backgroundColor: 'transparent',
            minWidth: 80,
            padding: 0,
            cursor: disabled ? 'not-allowed' : undefined,
          }}
        />

        {/* Chevron */}
        <ChevronDown
          width={20}
          height={20}
          style={{
            position: 'absolute',
            right: 12,
            top: '50%',
            transform: `translateY(-50%) ${isOpen ? 'rotate(180deg)' : ''}`,
            color: 'var(--color-foreground-moderate)',
            flexShrink: 0,
            transition: 'transform 0.2s',
            cursor: disabled ? 'not-allowed' : 'pointer',
          }}
          onClick={(e) => {
            e.stopPropagation();
            if (disabled) return;
            if (isOpen) { setIsOpen(false); setIsFocused(false); }
            else handleOpen();
          }}
        />
      </div>



      {/* Dropdown */}
      {isOpen && !disabled && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 8px)',
          left: 0,
          right: 0,
          zIndex: 1000,
        }}>
          <BaseSubmenu
            variant="checkbox"
            items={filteredItems}
            selected={selected}
            onSelect={(id) => {
              const wasSelected = selected.has(id);
              onSelect(id);
              setLastSelectedId(wasSelected ? null : id);
            }}
            onSelectAll={handleSelectAll}
            onClearAll={handleClearAll}
            width="100%"
          />
        </div>
      )}
    </div>
  );
}
