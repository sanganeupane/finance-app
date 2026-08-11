import type { ComponentProps, ReactNode, Ref } from 'react';

import { cn } from '@/utils/cn';

export type IconButtonVariant = 'primary' | 'outline' | 'ghost' | 'soft';

export interface IconButtonProps extends ComponentProps<'button'> {
    variant?: IconButtonVariant;
    /** Accessible name. Required — the button renders an icon only. */
    label: string;
    size?: 'md' | 'lg';
    icon: ReactNode;
    badge?: ReactNode;
    ref?: Ref<HTMLButtonElement>;
}

const variantClasses: Record<IconButtonVariant, string> = {
    primary: 'bg-primary text-white hover:bg-primary-dark',
    outline: 'border border-line bg-surface text-ink hover:bg-canvas',
    ghost: 'text-ink hover:bg-canvas',
    soft: 'bg-primary-soft text-primary hover:bg-primary-soft/70',
};

export function IconButton({
    className,
    variant = 'ghost',
    label,
    size = 'md',
    icon,
    badge,
    type = 'button',
    ref,
    ...props
}: IconButtonProps) {
    return (
        <button
            ref={ref}
            type={type}
            aria-label={label}
            className={cn(
                'relative inline-flex shrink-0 items-center justify-center rounded-full',
                'transition-colors duration-150',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
                size === 'md' ? 'h-11 w-11' : 'h-12 w-12',
                variantClasses[variant],
                className,
            )}
            {...props}
        >
            {icon}
            {badge ? (
                <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[10px] font-semibold leading-none text-white">
                    {badge}
                </span>
            ) : null}
        </button>
    );
}
