import React from 'react';
import clsx from 'clsx';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'delete-primary'
  | 'delete-secondary'
  | 'link-color'
  | 'link-gray';

export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconOnly?: boolean;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  iconOnly = false,
  children,
  className,
  disabled,
  ...props
}) => {
  return (
    <button
      className={clsx(
        'button',
        `button--${variant}`,
        `button--${size}`,
        iconOnly && 'button--icon',
        className
      )}
      disabled={disabled}
      aria-disabled={disabled}
      {...props}
    >
      {icon && <span style={{ display: 'inline-flex', alignItems: 'center', marginRight: children ? 8 : 0 }}>{icon}</span>}
      {!iconOnly && children}
    </button>
  );
};

export default Button; 