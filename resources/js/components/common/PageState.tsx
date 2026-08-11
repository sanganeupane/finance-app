import type { ReactNode } from 'react';

import { ErrorState } from '@/components/ui';
import { Skeleton } from '@/components/ui/Skeleton';

export interface PageStateProps {
    status: 'idle' | 'loading' | 'success' | 'error';
    error?: Error | null;
    onRetry?: () => void;
    /** Rendered while loading. Defaults to a generic list skeleton. */
    loading?: ReactNode;
    children: ReactNode;
    className?: string;
}

/** Loading / error wrapper for data-driven page sections. */
export function PageState({ status, error, onRetry, loading, children, className }: PageStateProps) {
    if (status === 'loading' || status === 'idle') {
        return <>{loading ?? <DefaultLoadingSkeleton />}</>;
    }
    if (status === 'error') {
        return (
            <ErrorState
                message={error?.message}
                onRetry={onRetry}
                className={className}
            />
        );
    }
    return <>{children}</>;
}

export function DefaultLoadingSkeleton() {
    return (
        <div aria-busy className="flex flex-col gap-3">
            {[1, 2, 3].map((index) => (
                <div key={index} className="flex items-center gap-3 rounded-lg border border-line bg-surface p-4">
                    <Skeleton variant="circle" className="h-10 w-10" />
                    <div className="flex flex-1 flex-col gap-2">
                        <Skeleton className="h-3.5 w-2/5" />
                        <Skeleton className="h-3 w-3/5" />
                    </div>
                    <Skeleton className="h-3.5 w-16" />
                </div>
            ))}
        </div>
    );
}
