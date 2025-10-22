import { CardProps } from './types';
import { cardVariants } from './variants';

/**
 * @component Card
 * @summary Reusable card container component
 */
export const Card = ({ children, className = '' }: CardProps) => {
  return <div className={cardVariants({ className })}>{children}</div>;
};
