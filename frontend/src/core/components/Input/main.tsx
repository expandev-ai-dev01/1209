import { forwardRef } from 'react';
import { cn } from '@/core/utils';
import { inputVariants } from './variants';
import type { InputProps } from './types';

/**
 * @component Input
 * @summary Reusable input component with label and error support
 * @domain core
 * @type ui-component
 * @category form
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, fullWidth = false, className, ...props }, ref) => {
    return (
      <div className={cn('flex flex-col gap-1', fullWidth && 'w-full')}>
        {label && (
          <label className="text-sm font-medium text-gray-700">
            {label}
            {props.required && <span className="ml-1 text-red-500">*</span>}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            inputVariants.base,
            error ? inputVariants.error : inputVariants.default,
            className
          )}
          {...props}
        />
        {(error || helperText) && (
          <p className={cn('text-sm', error ? 'text-red-600' : 'text-gray-500')}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
