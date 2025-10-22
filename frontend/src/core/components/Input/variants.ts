import { clsx } from 'clsx';

interface InputVariantsProps {
  error: boolean;
  disabled: boolean;
  className?: string;
}

interface LabelVariantsProps {
  required: boolean;
}

export const inputVariants = ({ error, disabled, className }: InputVariantsProps) => {
  const baseClasses =
    'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors';
  const errorClasses = error
    ? 'border-red-500 focus:ring-red-500'
    : 'border-gray-300 focus:ring-primary-500';
  const disabledClasses = disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white';

  return clsx(baseClasses, errorClasses, disabledClasses, className);
};

export const labelVariants = ({ required }: LabelVariantsProps) => {
  return clsx('block text-sm font-medium text-gray-700 mb-1');
};

export const errorVariants = () => {
  return 'text-sm text-red-500 mt-1';
};
