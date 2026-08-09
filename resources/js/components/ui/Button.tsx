import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';

import { LoaderCircle } from 'lucide-react';

import { cn } from '@/utils/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    isLoading?: boolean;
    fullWidth?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
    primary: 'bg-primary text-white hover:bg-primary-dark disabled:hover:bg-primary',
    secondary: 'bg-primary-soft text-primary hover:bg-primary-soft/70 disabled:hover:bg-primary-soft',
    outline: 'border border-line bg-surface text-ink hover:bg-canvas disabled:hover:bg-surface',
    ghost: 'text-ink hover:bg-canvas disabled:hover:bg-transparent',
    danger: 'bg-danger text-white hover:bg-danger/90 disabled:hover:bg-danger',
};

const sizeClasses: Record<ButtonSize, string> = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-11 px-4 text-sm',
    lg: 'h-12 px-5 text-base',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant = 'primary',
            size = 'md',
            isLoading = false,
            fullWidth = false,
            leftIcon,
            rightIcon,
            disabled,
            children,
            type = 'button',
            ...props
        },
        ref,
    ) => (
        <button
            ref={ref}
            type={type}
            disabled={disabled || isLoading}
            className={cn(
                'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors duration-150',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
                'disabled:cursor-not-allowed disabled:opacity-60',
                variantClasses[variant],
                sizeClasses[size],
                fullWidth && 'w-full',
                className,
            )}
            {...props}
        >
            {isLoading ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden /> : leftIcon}
            {children}
            {!isLoading ? rightIcon : null}
        </button>
    ),
);

Button.displayName = 'Button';
