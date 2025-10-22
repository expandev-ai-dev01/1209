import { InputProps } from './types';
import { inputVariants, labelVariants, errorVariants } from './variants';

/**
 * @component Input
 * @summary Reusable input component
 */
export const Input = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  required = false,
  className = '',
}: InputProps) => {
  return (
    <div className="w-full">
      {label && (
        <label className={labelVariants({ required })}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={inputVariants({ error: !!error, disabled, className })}
      />
      {error && <p className={errorVariants()}>{error}</p>}
    </div>
  );
};
