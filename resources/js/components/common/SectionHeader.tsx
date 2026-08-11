import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

import { cn } from '@/utils/cn';

export interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    linkTo?: string;
    linkLabel?: string;
    action?: ReactNode;
    className?: string;
}

/** Consistent page-section heading with an optional "View all" link. */
export function SectionHeader({ title, subtitle, linkTo, linkLabel = 'View all', action, className }: SectionHeaderProps) {
    return (
        <header className={cn('flex items-center justify-between gap-3', className)}>
            <div>
                <h2 className="text-base font-semibold text-ink">{title}</h2>
                {subtitle ? <p className="mt-0.5 text-xs text-muted">{subtitle}</p> : null}
            </div>
            {action ??
                (linkTo ? (
                    <Link
                        to={linkTo}
                        className="inline-flex shrink-0 items-center gap-0.5 text-sm font-medium text-primary hover:underline"
                    >
                        {linkLabel}
                        <ChevronRight className="h-4 w-4" aria-hidden />
                    </Link>
                ) : null)}
        </header>
    );
}
