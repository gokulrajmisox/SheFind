import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', asChild = false, children, ...props }, ref) => {
    const styles = cn(
      'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2',
      {
        'bg-accent text-white hover:bg-accent-hover': variant === 'primary',
        'bg-border text-primary hover:bg-gray-300': variant === 'secondary',
        'border border-border bg-transparent hover:bg-gray-50 text-primary': variant === 'outline',
        'bg-transparent hover:bg-gray-100 text-secondary': variant === 'ghost',
        'px-3 py-1.5 text-sm': size === 'sm',
        'px-4 py-2 text-base': size === 'md',
        'px-6 py-3 text-lg': size === 'lg',
      },
      className
    );

    if (asChild && React.isValidElement(children)) {
      const childProps = children.props as { className?: string };
      return React.cloneElement(children, { className: cn(styles, childProps.className) } as React.HTMLAttributes<HTMLElement>);
    }

    return <button ref={ref} className={styles} {...props}>{children}</button>;
  }
);
Button.displayName = 'Button';
