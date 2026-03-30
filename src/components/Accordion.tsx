'use client';

import React, { useState } from 'react';
import { CirclePlus, CircleMinus } from 'lucide-react';

export interface AccordionItemData {
  title: string;
  content: React.ReactNode;
}

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  /** Show the toggle icon */
  icon?: boolean;
  /** Position of the toggle icon */
  iconPosition?: 'left' | 'right';
  /** Show a top border divider */
  divider?: boolean;
  /** Controlled expanded state */
  expanded?: boolean;
  /** Default expanded state (uncontrolled) */
  defaultExpanded?: boolean;
  /** Called when expanded state changes */
  onToggle?: (expanded: boolean) => void;
}

export function AccordionItem({
  title,
  children,
  icon = true,
  iconPosition = 'left',
  divider = false,
  expanded: controlledExpanded,
  defaultExpanded = false,
  onToggle,
}: AccordionItemProps) {
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  const isControlled = controlledExpanded !== undefined;
  const expanded = isControlled ? controlledExpanded : internalExpanded;

  const handleToggle = () => {
    const next = !expanded;
    if (!isControlled) setInternalExpanded(next);
    onToggle?.(next);
  };

  const iconElement = icon && (
    <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
      {expanded ? (
        <CircleMinus size={24} style={{ color: 'var(--color-foreground-moderate)' }} />
      ) : (
        <CirclePlus size={24} style={{ color: 'var(--color-foreground-moderate)' }} />
      )}
    </div>
  );

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      minWidth: 320,
      borderTop: divider ? '1px solid var(--color-neutral-200)' : 'none',
      paddingTop: divider ? 'var(--space-page-inside-l)' : 0,
    }}>
      {/* Header — clickable */}
      <button
        type="button"
        onClick={handleToggle}
        aria-expanded={expanded}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-page-inside-l)',
          background: 'none',
          border: 'none',
          padding: 0,
          margin: 0,
          cursor: 'pointer',
          textAlign: 'left',
          width: '100%',
          fontFamily: 'var(--font-family-base)',
        }}
      >
        {iconPosition === 'left' && iconElement}
        <span style={{
          flex: 1,
          fontSize: 'var(--font-size-m)',
          fontWeight: 'var(--font-weight-heading)',
          lineHeight: 'var(--line-height-body-m)',
          color: 'var(--color-text-main)',
          minHeight: 'var(--size-actions-xs)',
          display: 'flex',
          alignItems: 'center',
        }}>
          {title}
        </span>
        {iconPosition === 'right' && iconElement}
      </button>

      {/* Content */}
      {expanded && (
        <div style={{
          marginTop: 'var(--space-page-inside-xs)',
          paddingLeft: icon && iconPosition === 'left' ? 'var(--space-page-inside-xxl)' : 0,
          paddingRight: icon && iconPosition === 'right' ? 'var(--space-page-inside-xxl)' : 0,
        }}>
          {children}
        </div>
      )}
    </div>
  );
}

interface AccordionProps {
  children: React.ReactNode;
  /** Gap between accordion items */
  gap?: number;
}

export default function Accordion({ children, gap = 0 }: AccordionProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap }}>
      {children}
    </div>
  );
}
