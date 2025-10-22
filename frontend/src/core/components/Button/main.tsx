import { cn } from '@/core/utils';
import { buttonVariants } from './variants';
import type { ButtonProps } from './types';

/**
 * @component Button
 * @summary Reusable button component with variants
 * @domain core
 * @type ui-component
 * @category form
 */
export const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  type = 'button',
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(
        buttonVariants.base,
        buttonVariants.variant[variant],
        buttonVariants.size[size],
        fullWidth && 'w-full',
        disabled && 'cursor-not-allowed opacity-50',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
