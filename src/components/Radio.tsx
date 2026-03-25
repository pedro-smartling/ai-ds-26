'use client';

import React from 'react';

interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
}

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(({
  label,
  description,
  disabled,
  id,
  ...props
}, ref) => {
  const radioId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <label
      htmlFor={radioId}
      style={{
        display: 'flex',
        alignItems: description ? 'flex-start' : 'center',
        gap: 'var(--dimension-tier-5)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 'var(--opacity-medium)' : '1',
      }}
    >
      <div style={{ position: 'relative', flexShrink: 0, marginTop: description ? '2px' : '0' }}>
        <input
          ref={ref}
          id={radioId}
          type="radio"
          disabled={disabled}
          style={{ position: 'absolute', opacity: 0, width: '100%', height: '100%', margin: 0, cursor: disabled ? 'not-allowed' : 'pointer' }}
          {...props}
        />
        <div style={{
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          border: `2px solid ${props.checked ? 'var(--color-border-brand-main)' : 'var(--color-border-main)'}`,
          backgroundColor: 'var(--color-surface-main)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'border-color 0.15s',
        }}>
          {props.checked && (
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-surface-brand-solid)',
            }} />
          )}
        </div>
      </div>
      {(label || description) && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dimension-tier-1)' }}>
          {label && (
            <span style={{
              fontSize: 'var(--font-size-s)',
              fontWeight: 'var(--font-weight-body-strong)',
              color: disabled ? 'var(--color-text-disabled)' : 'var(--color-text-main)',
              lineHeight: 'var(--line-height-body-s)',
            }}>
              {label}
            </span>
          )}
          {description && (
            <span style={{
              fontSize: 'var(--font-size-xs)',
              color: disabled ? 'var(--color-text-disabled)' : 'var(--color-text-moderate)',
              lineHeight: 'var(--line-height-body-xs)',
            }}>
              {description}
            </span>
          )}
        </div>
      )}
    </label>
  );
});

Radio.displayName = 'Radio';
export default Radio;
