import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';

import { cn } from '@/utils/cn';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
    as?: 'div' | 'article' | 'section';
    padding?: 'none' | 'sm' | 'md' | 'lg';
    interactive?: boolean;
    elevated?: boolean;
    children?: ReactNode;
}

const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-5',
    lg: 'p-6',
} as const;

export const Card = forwardRef<HTMLDivElement, CardProps>(
    (
        { as: Tag = 'div', className, padding = 'md', interactive = false, elevated = false, children, ...props },
        ref,
    ) => (
        <Tag
            ref={ref}
            className={cn(
                'rounded-lg border border-line bg-surface',
                elevated && 'shadow-md',
                paddingClasses[padding],
                interactive &&
                    'cursor-pointer transition-colors duration-150 hover:border-primary/40 hover:bg-primary-softer',
                className,
            )}
            {...props}
        >
            {children}
        </Tag>
    ),
);

Card.displayName = 'Card';
