import type { ReactNode } from 'react';

import { cn } from '@/utils/cn';

export interface EmptyStateProps {
    icon?: ReactNode;
    title: string;
    description?: string;
    action?: ReactNode;
    className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
    return (
        <div
            className={cn(
                'flex flex-col items-center gap-3 rounded-lg border border-dashed border-line bg-canvas/60 px-6 py-12 text-center',
                className,
            )}
        >
            {icon ? <span className="text-muted" aria-hidden>{icon}</span> : null}
            <div>
                <h3 className="font-semibold text-ink">{title}</h3>
                {description ? <p className="mx-auto mt-1 max-w-sm text-sm text-muted">{description}</p> : null}
            </div>
            {action ? <div className="mt-1">{action}</div> : null}
        </div>
    );
}
