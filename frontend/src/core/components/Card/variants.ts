import { clsx } from 'clsx';

interface CardVariantsProps {
  className?: string;
}

export const cardVariants = ({ className }: CardVariantsProps) => {
  return clsx('bg-white rounded-lg shadow-md p-6 border border-gray-200', className);
};
