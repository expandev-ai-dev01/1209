import { LoadingSpinnerProps } from './types';
import { spinnerVariants } from './variants';

/**
 * @component LoadingSpinner
 * @summary Loading spinner component
 */
export const LoadingSpinner = ({ size = 'medium', className = '' }: LoadingSpinnerProps) => {
  return (
    <div className="flex items-center justify-center p-4">
      <div className={spinnerVariants({ size, className })} />
    </div>
  );
};
