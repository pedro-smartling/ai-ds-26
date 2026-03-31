'use client';

import React, { useState, useRef, useEffect } from 'react';
import BaseSubmenu, { SubmenuItem } from '@/components/BaseSubmenu';
import { ChevronDown } from 'lucide-react';

interface SingleSelectProps {
  label?: string;
  hintText?: string;
  placeholder?: string;
  items: SubmenuItem[];
  selected?: string;
  onSelect?: (id: string) => void;
  /** Leading icon shown inside the input */
  leadingIcon?: React.ReactNode;
  disabled?: boolean;
  width?: number | string;
}

const textTrim = {
  textBoxTrim: 'trim-both',
  textBoxEdge: 'cap alphabetic',
} as React.CSSProperties;

export default function SingleSelect({
  label,
  hintText,
  placeholder = 'Select...',
  items,
  selected,
  onSelect,
  leadingIcon,
  disabled = false,
  width,
}: SingleSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const selectedItem = items.find((i) => i.id === selected);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleToggle = () => {
    if (disabled) return;
    setIsOpen((prev) => !prev);
    setIsFocused(true);
  };

  const handleSelect = (id: string) => {
    onSelect?.(id);
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  const getBorder = () => {
    if (disabled) return '1px solid var(--color-border-disabled)';
    if (isFocused) return '2px solid var(--color-border-solid)';
    return '1px solid var(--color-border-main)';
  };

  const getFocusRing = () => {
    if (isFocused && !disabled)
      return '0px 0px 0px 2px var(--color-surface-main), 0px 0px 0px 6px var(--color-amber-300)';
    return '0px 1px 2px 0px rgba(16, 24, 41, 0.05)';
  };

  const pad = isFocused && !disabled ? '0 11px' : '0 var(--space-page-inside-s)';

  return (
    <div
      ref={containerRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-page-inside-s)',
        width: width || '100%',
        position: 'relative',
      }}
    >
      {/* Label */}
      {label && (
        <p style={{
          margin: 0,
          fontFamily: 'var(--font-family-base)',
          fontWeight: 'var(--font-weight-body-strong)',
          fontSize: 'var(--font-size-s)',
          lineHeight: 'var(--line-height-body-s)',
          color: disabled ? 'var(--color-text-disabled)' : 'var(--color-text-soft)',
          ...textTrim,
        }}>
          {label}
        </p>
      )}

      {/* Hint text */}
      {hintText && (
        <p style={{
          margin: 0,
          fontFamily: 'var(--font-family-base)',
          fontWeight: 'var(--font-weight-body)',
          fontSize: 'var(--font-size-s)',
          lineHeight: 'var(--line-height-body-s)',
          color: 'var(--color-text-moderate)',
          ...textTrim,
        }}>
          {hintText}
        </p>
      )}

      {/* Input trigger */}
      <button
        ref={buttonRef}
        type="button"
        onClick={handleToggle}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          if (!containerRef.current?.contains(e.relatedTarget as Node)) {
            setIsFocused(false);
            setIsOpen(false);
          }
        }}
        disabled={disabled}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-page-inside-xs)',
          height: 44,
          padding: pad,
          backgroundColor: disabled ? 'var(--color-surface-disabled)' : 'var(--color-surface-main)',
          border: getBorder(),
          borderRadius: 8,
          boxShadow: getFocusRing(),
          boxSizing: 'border-box',
          cursor: disabled ? 'not-allowed' : 'pointer',
          overflow: 'clip',
          width: '100%',
          transition: 'border-color 0.1s, box-shadow 0.1s',
          outline: 'none',
          fontFamily: 'var(--font-family-base)',
          textAlign: 'left',
        }}
      >
        {/* Leading icon */}
        {leadingIcon && (
          <div style={{
            flexShrink: 0,
            width: 20,
            height: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: disabled ? 'var(--color-foreground-disabled)' : 'var(--color-foreground-moderate)',
          }}>
            {leadingIcon}
          </div>
        )}

        {/* Text */}
        <span style={{
          flex: 1,
          fontWeight: 'var(--font-weight-body)',
          fontSize: 'var(--font-size-m)',
          lineHeight: 'var(--line-height-body-m)',
          color: selectedItem
            ? (disabled ? 'var(--color-text-disabled)' : 'var(--color-text-main)')
            : 'var(--color-text-placeholder)',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          ...textTrim,
        }}>
          {selectedItem?.label || placeholder}
        </span>

        {/* Chevron */}
        <ChevronDown
          width={20}
          height={20}
          style={{
            flexShrink: 0,
            color: 'var(--color-foreground-moderate)',
            transform: isOpen ? 'rotate(180deg)' : undefined,
            transition: 'transform 0.2s',
          }}
        />
      </button>

      {/* Dropdown */}
      {isOpen && !disabled && (
        <div style={{
          position: 'absolute',
          top: '100%',
          marginTop: 8,
          left: 0,
          right: 0,
          zIndex: 1000,
        }}>
          <BaseSubmenu
            variant="default"
            items={items}
            selected={selected}
            onSelect={handleSelect}
            width="100%"
          />
        </div>
      )}
    </div>
  );
}
