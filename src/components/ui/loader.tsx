import * as React from 'react';
import { cn } from '@/lib/utils';

export interface LoaderProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /**
   * Whether the loader should be spinning. Defaults to true.
   */
  spinning?: boolean;
}
const Loader = React.forwardRef<HTMLImageElement, LoaderProps>(
  ({ className, spinning = true, ...props }, ref) => {
    return (
      <img
        ref={ref}
        src="/assets/SoTimeLoader.svg"
        alt="Loading"
        className={cn(spinning && 'animate-spin-fast', className)}
        {...props}
      />
    );
  },
);
Loader.displayName = 'Loader';

export { Loader };

