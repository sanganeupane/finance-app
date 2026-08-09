import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/utils/cn';

export type BadgeVariant = 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'violet';

export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: BadgeVariant;
    size?: BadgeSize;
    dot?: boolean;
    children?: ReactNode;
}

const variantClasses: Record<BadgeVariant, string> = {
    neutral: 'bg-canvas text-muted ring-line',
    primary: 'bg-primary-soft text-primary ring-primary/20',
    success: 'bg-primary-softer text-success ring-success/25',
    warning: 'bg-warning/15 text-warning ring-warning/30',
    danger: 'bg-danger/10 text-danger ring-danger/25',
    info: 'bg-info/10 text-info ring-info/25',
    violet: 'bg-violet/10 text-violet ring-violet/25',
};

export function Badge({
    className,
    variant = 'neutral',
    size = 'sm',
    dot = false,
    children,
    ...props
}: BadgeProps) {
    return (
        <span
            className={cn(
                'inline-flex w-fit items-center gap-1.5 rounded-full font-medium ring-1 ring-inset',
                size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-sm',
                variantClasses[variant],
                className,
            )}
            {...props}
        >
            {dot ? <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-current" /> : null}
            {children}
        </span>
    );
}
