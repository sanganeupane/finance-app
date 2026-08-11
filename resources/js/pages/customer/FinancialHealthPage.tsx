import { HeartPulse } from 'lucide-react';

import { PageState } from '@/components/common';
import { useAsync } from '@/hooks/useAsync';
import { financialHealthService } from '@/services/api';
import { formatPercent } from '@/utils/format';
import { cn } from '@/utils/cn';

const STATUS_COLOR: Record<string, string> = {
    good: 'bg-success',
    average: 'bg-warning',
    poor: 'bg-danger',
};

export default function FinancialHealthPage() {
    const { status, data, error, refetch } = useAsync(() => financialHealthService.get(), []);

    return (
        <section className="flex flex-col gap-4">
            <header>
                <p className="text-sm text-muted">Financial health</p>
                <h1 className="text-2xl font-semibold tracking-tight text-ink">Your score</h1>
            </header>

            <PageState status={status} error={error} onRetry={refetch}>
                {data ? (
                    <>
                        <article className="rounded-xl bg-primary p-5 text-center text-white shadow-md">
                            <p className="text-sm text-white/80">Financial health score</p>
                            <p className="mt-1 text-5xl font-semibold tracking-tight">{data.score}</p>
                            <p className="mt-2 text-sm font-medium capitalize">{data.rating}</p>
                            <p className="mt-3 text-xs leading-relaxed text-white/80">{data.summary}</p>
                        </article>

                        <ul className="flex flex-col gap-3">
                            {data.factors.map((factor) => (
                                <li
                                    key={factor.id}
                                    className="rounded-lg border border-line bg-surface p-4"
                                >
                                    <div className="flex items-center justify-between gap-3">
                                        <p className="text-sm font-medium text-ink">{factor.label}</p>
                                        <p className="text-sm font-semibold text-ink">
                                            {factor.value} <span className="text-xs font-normal text-muted">/100</span>
                                        </p>
                                    </div>
                                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-canvas">
                                        <div
                                            aria-hidden
                                            className={cn(
                                                'h-full rounded-full',
                                                STATUS_COLOR[factor.status] ?? 'bg-primary',
                                            )}
                                            style={{ width: `${factor.value}%` }}
                                        />
                                    </div>
                                    <p className="mt-1.5 text-xs text-muted">Weight {formatPercent(factor.weight, 0)}</p>
                                </li>
                            ))}
                        </ul>

                        <p className="flex items-center gap-1.5 rounded-lg bg-primary-soft px-3 py-2 text-xs text-primary">
                            <HeartPulse className="h-4 w-4" aria-hidden />
                            Updated {new Date(data.updatedAt).toLocaleDateString('en-GB')}
                        </p>
                    </>
                ) : null}
            </PageState>
        </section>
    );
}
