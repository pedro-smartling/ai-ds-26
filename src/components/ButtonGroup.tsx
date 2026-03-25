'use client';

import React from 'react';

interface ButtonGroupProps {
  children: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
}

export default function ButtonGroup({ children, orientation = 'horizontal' }: ButtonGroupProps) {
  const items = React.Children.toArray(children);

  return (
    <div
      style={{
        display: 'inline-flex',
        flexDirection: orientation === 'vertical' ? 'column' : 'row',
        borderRadius: 'var(--radius-m)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-xs)',
      }}
    >
      {items.map((child, index) => {
        const isFirst = index === 0;
        const isLast = index === items.length - 1;
        const isOnly = items.length === 1;

        let borderRadius = '0';
        if (isOnly) {
          borderRadius = 'var(--radius-m)';
        } else if (orientation === 'horizontal') {
          if (isFirst) borderRadius = 'var(--radius-m) 0 0 var(--radius-m)';
          else if (isLast) borderRadius = '0 var(--radius-m) var(--radius-m) 0';
        } else {
          if (isFirst) borderRadius = 'var(--radius-m) var(--radius-m) 0 0';
          else if (isLast) borderRadius = '0 0 var(--radius-m) var(--radius-m)';
        }

        const separator = orientation === 'horizontal'
          ? { borderLeft: !isFirst ? '1px solid var(--color-border-main)' : 'none' }
          : { borderTop: !isFirst ? '1px solid var(--color-border-main)' : 'none' };

        return (
          <div
            key={index}
            style={{
              display: 'contents',
            }}
          >
            {React.isValidElement(child)
              ? React.cloneElement(child as React.ReactElement<{ style?: React.CSSProperties }>, {
                  style: {
                    ...(child as React.ReactElement<{ style?: React.CSSProperties }>).props.style,
                    borderRadius,
                    boxShadow: 'none',
                    ...separator,
                  },
                })
              : child}
          </div>
        );
      })}
    </div>
  );
}
