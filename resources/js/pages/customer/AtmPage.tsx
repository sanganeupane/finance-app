import { BarTrend, ChartShell } from '@/components/charts';
import { PageHeader, PageState } from '@/components/common';
import { useAsync } from '@/hooks/useAsync';
import { spendingService } from '@/services/api';
import { formatCurrency } from '@/utils/format';

export default function AtmPage() {
    const { status, data, error, refetch } = useAsync(() => spendingService.atm(), []);

    return (
        <section className="flex flex-col gap-4">
            <PageHeader title="ATM usage" subtitle={data?.month} />

            <PageState status={status} error={error} onRetry={refetch}>
                {data ? (
                    <>
                        <div className="grid grid-cols-3 gap-3">
                            <div className="rounded-lg border border-line bg-surface p-4">
                                <p className="text-xs text-muted">Withdrawals</p>
                                <p className="mt-1 font-semibold text-ink">{data.totalWithdrawals}</p>
                            </div>
                            <div className="rounded-lg border border-line bg-surface p-4">
                                <p className="text-xs text-muted">Fees</p>
                                <p className="mt-1 font-semibold text-ink">{formatCurrency(data.totalFees)}</p>
                            </div>
                            <div className="rounded-lg border border-line bg-surface p-4">
                                <p className="text-xs text-muted">Average</p>
                                <p className="mt-1 font-semibold text-ink">
                                    {formatCurrency(data.averageWithdrawal)}
                                </p>
                            </div>
                        </div>

                        <ChartShell title="Monthly withdrawals" subtitle="Last 6 months">
                            <BarTrend
                                data={data.monthly.map((point) => ({ label: point.month, value: point.amount }))}
                                yFormatter={(value) => `${Math.round(value / 1000)}k`}
                            />
                        </ChartShell>

                        <section aria-labelledby="branches-heading">
                            <h2 id="branches-heading" className="mb-3 text-base font-semibold text-ink">
                                By branch
                            </h2>
                            <ul className="flex flex-col gap-2">
                                {data.byBranch.map((branch) => (
                                    <li
                                        key={branch.branch}
                                        className="flex items-center justify-between gap-3 rounded-lg border border-line bg-surface p-4 text-sm"
                                    >
                                        <div>
                                            <p className="font-medium text-ink">{branch.branch}</p>
                                            <p className="text-xs text-muted">{branch.count} withdrawal{branch.count === 1 ? '' : 's'}</p>
                                        </div>
                                        <p className="font-semibold text-ink">{formatCurrency(branch.amount)}</p>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </>
                ) : null}
            </PageState>
        </section>
    );
}
