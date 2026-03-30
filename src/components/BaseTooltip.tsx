'use client';

import React from 'react';
import { CircleHelp } from 'lucide-react';
import Tooltip, { TooltipArrow } from '@/components/Tooltip';

export type BaseTooltipPosition = 'top' | 'top-left' | 'top-right' | 'bottom' | 'left' | 'right';

interface BaseTooltipProps {
  /** Primary tooltip label */
  text: string;
  /** Optional secondary description */
  supportingText?: string;
  /** Tooltip position relative to the icon */
  position?: BaseTooltipPosition;
  /** Icon size — defaults to 16px (--size-icon-s) */
  size?: number;
  /** Icon color */
  color?: string;
}

/** Maps position (relative to icon) to arrow direction (on the tooltip box) */
const positionToArrow: Record<BaseTooltipPosition, TooltipArrow> = {
  top: 'bottom-center',
  'top-left': 'bottom-right',
  'top-right': 'bottom-left',
  bottom: 'top-center',
  left: 'right',
  right: 'left',
};

export default function BaseTooltip({
  text,
  supportingText,
  position = 'top',
  size = 16,
  color = 'var(--color-foreground-moderate)',
}: BaseTooltipProps) {
  return (
    <Tooltip
      text={text}
      supportingText={supportingText}
      arrow={positionToArrow[position]}
    >
      <button
        type="button"
        aria-label={text}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 'var(--size-icon-s)',
          height: 'var(--size-icon-s)',
          padding: 0,
          margin: 0,
          border: 'none',
          background: 'none',
          cursor: 'pointer',
          color,
        }}
      >
        <CircleHelp size={size} strokeWidth={1.5} />
      </button>
    </Tooltip>
  );
}
