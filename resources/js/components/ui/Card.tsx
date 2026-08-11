import type { ComponentProps, ReactNode, Ref } from 'react';

import { cn } from '@/utils/cn';

export interface CardProps extends ComponentProps<'div'> {
    padding?: 'none' | 'sm' | 'md' | 'lg';
    interactive?: boolean;
    elevated?: boolean;
    children?: ReactNode;
    ref?: Ref<HTMLDivElement>;
}

const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-5',
    lg: 'p-6',
} as const;

export function Card({
    className,
    padding = 'md',
    interactive = false,
    elevated = false,
    children,
    ref,
    ...props
}: CardProps) {
    return (
        <div
            ref={ref}
            className={cn(
                'rounded-lg border border-line bg-surface',
                elevated && 'shadow-md',
                paddingClasses[padding],
                interactive && 'cursor-pointer transition-colors duration-150 hover:border-primary/40 hover:bg-primary-softer',
                className,
            )}
            {...props}
        >
            {children}
        </div>
    );
}
