import { cn } from '@/utils/cn';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps {
    name: string;
    src?: string | null;
    size?: AvatarSize;
    className?: string;
}

const sizeClasses: Record<AvatarSize, string> = {
    xs: 'h-6 w-6 text-[10px]',
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
    xl: 'h-16 w-16 text-lg',
};

/** Derives initials from a full name (max two letters). */
function initials(name: string): string {
    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0] ?? '')
        .join('')
        .toUpperCase();
}

export function Avatar({ name, src, size = 'md', className }: AvatarProps) {
    const fallback = initials(name);
    return (
        <span
            className={cn(
                'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full',
                'bg-primary-soft font-semibold text-primary-dark ring-1 ring-inset ring-primary/15',
                sizeClasses[size],
                className,
            )}
            aria-hidden
        >
            {src ? (
                <img src={src} alt="" className="h-full w-full object-cover" />
            ) : (
                <span className="select-none">{fallback}</span>
            )}
        </span>
    );
}
