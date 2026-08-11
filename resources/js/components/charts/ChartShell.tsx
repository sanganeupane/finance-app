import type { ReactNode } from 'react';

import { cn } from '@/utils/cn';

export interface ChartShellProps {
    title?: string;
    subtitle?: string;
    action?: ReactNode;
    className?: string;
    children: ReactNode;
}

/**
 * Common container for all chart cards — matches the design-system Card
 * while keeping chart surfaces consistent across pages.
 */
export function ChartShell({ title, subtitle, action, className, children }: ChartShellProps) {
    return (
        <section className={cn('rounded-lg border border-line bg-surface p-5', className)}>
            {(title || action) && (
                <header className="mb-4 flex items-start justify-between gap-3">
                    <div>
                        {title && <h3 className="text-base font-semibold text-ink">{title}</h3>}
                        {subtitle && <p className="mt-0.5 text-xs text-muted">{subtitle}</p>}
                    </div>
                    {action}
                </header>
            )}
            {children}
        </section>
    );
}
