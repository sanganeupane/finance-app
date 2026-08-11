import { Link } from 'react-router-dom';
import { ChevronRight, LineChart, TrendingUp } from 'lucide-react';

import { InvestmentCard } from '@/components/cards';
import { PageState } from '@/components/common';
import { EmptyState } from '@/components/ui';
import { useAsync } from '@/hooks/useAsync';
import { investmentsService } from '@/services/api';
import { formatCurrency } from '@/utils/format';

export default function InvestmentsPage() {
    const { status, data, error, refetch } = useAsync(() => investmentsService.list(), []);

    const totalValue = data?.reduce((sum, item) => sum + item.currentValue, 0) ?? 0;
    const totalGain = data?.reduce((sum, item) => sum + item.change, 0) ?? 0;

    return (
        <section className="flex flex-col gap-4">
            <header>
                <p className="text-sm text-muted">Investments</p>
                <h1 className="text-2xl font-semibold tracking-tight text-ink">Portfolio</h1>
                <p className="mt-1 text-sm text-muted">
                    {data ? `${data.length} holdings · ${formatCurrency(totalValue)}` : 'Loading…'}
                </p>
            </header>

            <PageState status={status} error={error} onRetry={refetch}>
                {data?.length ? (
                    <>
                        <article className="rounded-xl bg-primary p-5 text-white shadow-md">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-white/80">Total value</p>
                                    <p className="mt-1 text-3xl font-semibold tracking-tight">
                                        {formatCurrency(totalValue)}
                                    </p>
                                </div>
                                <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-xs font-medium text-white">
                                    <TrendingUp className="h-3.5 w-3.5" aria-hidden />
                                    {totalGain >= 0 ? '+' : ''}
                                    {formatCurrency(totalGain)}
                                </span>
                            </div>
                        </article>

                        <div className="flex flex-col gap-2">
                            {data.map((item) => (
                                <InvestmentCard key={item.id} investment={item} />
                            ))}
                        </div>

                        <Link
                            to="/customer/market"
                            className="flex items-center justify-between rounded-lg border border-line bg-surface p-4 text-sm font-medium text-ink transition-colors hover:border-primary/40"
                        >
                            <span className="flex items-center gap-2">
                                <LineChart className="h-4.5 w-4.5 text-primary" aria-hidden />
                                Explore the market
                            </span>
                            <ChevronRight className="h-4 w-4 text-muted" aria-hidden />
                        </Link>
                    </>
                ) : (
                    <EmptyState
                        icon={<LineChart className="h-10 w-10" aria-hidden />}
                        title="No investments yet"
                        description="Explore market opportunities to grow your portfolio."
                    />
                )}
            </PageState>
        </section>
    );
}
