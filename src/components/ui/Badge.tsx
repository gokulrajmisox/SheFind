import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'destructive' | 'outline';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
        {
          'bg-gray-100 text-gray-800': variant === 'default',
          'bg-success-light text-success': variant === 'success',
          'bg-warning-light text-warning': variant === 'warning',
          'bg-accent-light text-accent': variant === 'destructive',
          'border border-border text-secondary': variant === 'outline',
        },
        className
      )}
      {...props}
    />
  );
}
