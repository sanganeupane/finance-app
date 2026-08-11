import { BarTrend, ChartShell } from '@/components/charts';
import { PageHeader, PageState } from '@/components/common';
import { useAsync } from '@/hooks/useAsync';
import { spendingService } from '@/services/api';
import { formatCurrency } from '@/utils/format';

export default function ECommercePage() {
    const { status, data, error, refetch } = useAsync(() => spendingService.eCommerce(), []);

    return (
        <section className="flex flex-col gap-4">
            <PageHeader title="E-commerce spending" subtitle={data?.month} />

            <PageState status={status} error={error} onRetry={refetch}>
                {data ? (
                    <>
                        <article className="rounded-xl bg-primary p-5 text-white shadow-md">
                            <p className="text-sm text-white/80">Total online spend</p>
                            <p className="mt-1 text-3xl font-semibold tracking-tight">
                                {formatCurrency(data.totalSpent)}
                            </p>
                            <p className="mt-2 text-xs text-white/70">
                                {data.comparisonToLastMonth > 0 ? '+' : ''}
                                {data.comparisonToLastMonth}% vs last month
                            </p>
                        </article>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="rounded-lg border border-line bg-surface p-4">
                                <p className="text-xs text-muted">Transactions</p>
                                <p className="mt-1 font-semibold text-ink">{data.transactions}</p>
                            </div>
                            <div className="rounded-lg border border-line bg-surface p-4">
                                <p className="text-xs text-muted">Average order</p>
                                <p className="mt-1 font-semibold text-ink">
                                    {formatCurrency(data.averageOrderValue)}
                                </p>
                            </div>
                        </div>

                        <ChartShell title="Spend by platform" subtitle={data.month}>
                            <BarTrend
                                data={data.byPlatform.map((platform) => ({
                                    label: platform.platform,
                                    value: platform.amount,
                                }))}
                                yFormatter={(value) => `${Math.round(value / 1000)}k`}
                            />
                            <ul className="mt-4 flex flex-col gap-2">
                                {data.byPlatform.map((platform) => (
                                    <li
                                        key={platform.platform}
                                        className="flex items-center justify-between gap-3 text-sm"
                                    >
                                        <span className="text-ink">{platform.platform}</span>
                                        <span className="font-medium text-ink">{formatCurrency(platform.amount)}</span>
                                        <span className="w-12 text-right text-xs text-muted">{platform.percentage}%</span>
                                    </li>
                                ))}
                            </ul>
                        </ChartShell>
                    </>
                ) : null}
            </PageState>
        </section>
    );
}
