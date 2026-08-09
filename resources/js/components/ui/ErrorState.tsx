import type { ReactNode } from 'react';
import { CircleAlert, RotateCcw } from 'lucide-react';

import { cn } from '@/utils/cn';
import { Button } from './Button';

export interface ErrorStateProps {
    title?: string;
    message?: string;
    onRetry?: () => void;
    action?: ReactNode;
    className?: string;
}

export function ErrorState({
    title = 'Something went wrong',
    message = 'We could not load this information. Please try again.',
    onRetry,
    action,
    className,
}: ErrorStateProps) {
    return (
        <div
            role="alert"
            className={cn(
                'flex flex-col items-center gap-3 rounded-lg border border-danger/20 bg-danger/5 px-6 py-12 text-center',
                className,
            )}
        >
            <CircleAlert className="h-10 w-10 text-danger" aria-hidden />
            <div>
                <h3 className="font-semibold text-ink">{title}</h3>
                <p className="mx-auto mt-1 max-w-sm text-sm text-muted">{message}</p>
            </div>
            {action ??
                (onRetry ? (
                    <Button variant="outline" size="sm" onClick={onRetry} leftIcon={<RotateCcw className="h-4 w-4" />}>
                        Try again
                    </Button>
                ) : null)}
        </div>
    );
}
