import { ButtonProps } from './types';
import { buttonVariants } from './variants';

/**
 * @component Button
 * @summary Reusable button component
 */
export const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  type = 'button',
  onClick,
  className = '',
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonVariants({ variant, size, fullWidth, disabled, className })}
    >
      {children}
    </button>
  );
};
