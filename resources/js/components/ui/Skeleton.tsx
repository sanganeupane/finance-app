import { cn } from '@/utils/cn';

export type SkeletonVariant = 'text' | 'circle' | 'rect';

export interface SkeletonProps {
    variant?: SkeletonVariant;
    className?: string;
}

/** Loading placeholder. Composed via className, e.g. `h-4 w-24` for text. */
export function Skeleton({ variant = 'text', className }: SkeletonProps) {
    return (
        <span
            aria-hidden
            className={cn(
                'block animate-pulse rounded bg-line/70',
                variant === 'circle' && 'rounded-full',
                className,
            )}
        />
    );
}
