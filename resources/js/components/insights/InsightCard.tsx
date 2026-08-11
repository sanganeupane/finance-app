import type { ReactNode } from 'react';
import { Lightbulb } from 'lucide-react';

import { StatusBadge } from '@/components/common';
import { cn } from '@/utils/cn';

export interface InsightCardProps {
    insight: {
        id: string;
        severity: string;
        category: string;
        title: string;
        description: string;
        recommendation?: string;
        createdAt: string;
    };
    icon?: ReactNode;
}

const SEVERITY_TONE: Record<string, string> = {
    positive: 'border-success/25 bg-success/5',
    info: 'border-info/25 bg-info/5',
    warning: 'border-warning/30 bg-warning/10',
    critical: 'border-danger/30 bg-danger/5',
};

/** AI insight card with severity accent and optional recommendation. */
export function InsightCard({ insight, icon }: InsightCardProps) {
    return (
        <article
            className={cn(
                'rounded-lg border p-4',
                SEVERITY_TONE[insight.severity] ?? 'border-line bg-surface',
            )}
        >
            <div className="flex items-start gap-3">
                <span
                    aria-hidden
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface text-primary shadow-sm"
                >
                    {icon ?? <Lightbulb className="h-4.5 w-4.5" />}
                </span>
                <div className="min-w-0 flex-1">
                    <header className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm font-semibold text-ink">{insight.title}</h3>
                        <StatusBadge status={insight.severity} />
                    </header>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{insight.description}</p>
                    {insight.recommendation ? (
                        <p className="mt-2 rounded-md bg-surface/80 px-3 py-2 text-xs font-medium text-ink">
                            {insight.recommendation}
                        </p>
                    ) : null}
                </div>
            </div>
        </article>
    );
}
