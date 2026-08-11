import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import { cn } from '@/utils/cn';

export interface PageHeaderProps {
    title: string;
    subtitle?: string;
    back?: boolean;
    action?: ReactNode;
    className?: string;
}

/** Detail-page header with optional back navigation and actions. */
export function PageHeader({ title, subtitle, back = true, action, className }: PageHeaderProps) {
    const navigate = useNavigate();
    return (
        <header className={cn('flex items-center gap-3', className)}>
            {back ? (
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    aria-label="Go back"
                    className="shrink-0 rounded-full bg-surface p-2 text-muted shadow-sm transition-colors hover:text-primary"
                >
                    <ArrowLeft className="h-5 w-5" aria-hidden />
                </button>
            ) : null}
            <div className="min-w-0 flex-1">
                <h1 className="truncate text-xl font-semibold tracking-tight text-ink">{title}</h1>
                {subtitle ? <p className="truncate text-xs text-muted">{subtitle}</p> : null}
            </div>
            {action}
        </header>
    );
}
