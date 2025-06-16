import React, { ButtonHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    loading = false, 
    fullWidth = false,
    disabled, 
    children, 
    ...props 
  }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
          {
            'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-600': variant === 'primary',
            'bg-gray-200 text-gray-900 hover:bg-gray-300 focus-visible:ring-gray-500': variant === 'secondary',
            'border border-gray-300 bg-transparent hover:bg-gray-50 focus-visible:ring-gray-500': variant === 'outline',
            'bg-transparent text-gray-800 hover:bg-gray-100 focus-visible:ring-gray-500': variant === 'ghost',
            'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600': variant === 'danger',
            'h-8 px-3 text-xs': size === 'sm',
            'h-10 px-4 py-2': size === 'md',
            'h-12 px-6 py-3 text-lg': size === 'lg',
            'w-full': fullWidth,
          },
          className
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-b-transparent border-white" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';