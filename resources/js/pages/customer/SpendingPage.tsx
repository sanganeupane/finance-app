import { Link } from 'react-router-dom';
import { ChevronRight, ShoppingBag, Store } from 'lucide-react';

import { BarTrend, ChartShell, DonutChart } from '@/components/charts';
import { PageState, SectionHeader } from '@/components/common';
import { useAsync } from '@/hooks/useAsync';
import { spendingService } from '@/services/api';
import { formatCurrency } from '@/utils/format';

export default function SpendingPage() {
    const { status, data, error, refetch } = useAsync(() => spendingService.get(), []);

    return (
        <section className="flex flex-col gap-5">
            <header>
                <p className="text-sm text-muted">Spending</p>
                <h1 className="text-2xl font-semibold tracking-tight text-ink">Where your money goes</h1>
                <p className="mt-1 text-sm text-muted">
                    {data ? `${data.month} · ${formatCurrency(data.totalSpent)} spent` : 'Loading…'}
                </p>
            </header>

            <PageState status={status} error={error} onRetry={refetch}>
                {data ? (
                    <>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="rounded-lg border border-line bg-surface p-4">
                                <p className="text-xs text-muted">Total spent</p>
                                <p className="mt-1 font-semibold text-ink">{formatCurrency(data.totalSpent)}</p>
                            </div>
                            <div className="rounded-lg border border-line bg-surface p-4">
                                <p className="text-xs text-muted">Daily average</p>
                                <p className="mt-1 font-semibold text-ink">{formatCurrency(data.averageDaily)}</p>
                            </div>
                            <div className="rounded-lg border border-line bg-surface p-4">
                                <p className="text-xs text-muted">vs last month</p>
                                <p className="mt-1 font-semibold text-warning">{data.comparisonToLastMonth > 0 ? '+' : ''}{data.comparisonToLastMonth}%</p>
                            </div>
                            <div className="rounded-lg border border-line bg-surface p-4">
                                <p className="text-xs text-muted">Budget used</p>
                                <p className="mt-1 font-semibold text-ink">{data.budgetUsed}% of {formatCurrency(data.budget)}</p>
                            </div>
                        </div>

                        <ChartShell title="Spending by category" subtitle={data.month}>
                            <DonutChart
                                data={data.categories.map((category) => ({
                                    key: category.id,
                                    label: category.category,
                                    value: category.amount,
                                    color: category.color,
                                }))}
                                centerValue={formatCurrency(data.totalSpent)}
                                centerLabel="Total spent"
                            />
                            <ul className="mt-4 flex flex-col gap-2">
                                {data.categories.map((category) => (
                                    <li
                                        key={category.id}
                                        className="flex items-center justify-between gap-3 text-sm"
                                    >
                                        <span className="flex items-center gap-2 text-ink">
                                            <span
                                                aria-hidden
                                                className="h-2.5 w-2.5 rounded-full"
                                                style={{ backgroundColor: category.color }}
                                            />
                                            {category.category}
                                        </span>
                                        <span className="font-medium text-ink">{formatCurrency(category.amount)}</span>
                                        <span className="w-12 text-right text-xs text-muted">{category.percentage}%</span>
                                    </li>
                                ))}
                            </ul>
                        </ChartShell>

                        <ChartShell title="Monthly trend" subtitle="Last 6 months">
                            <BarTrend
                                data={data.trend.map((point) => ({ label: point.month, value: point.amount }))}
                                yFormatter={(value) => `${Math.round(value / 1000)}k`}
                            />
                        </ChartShell>

                        <section aria-labelledby="merchants-heading">
                            <SectionHeader title="Top merchants" className="mb-3" />
                            <ul className="flex flex-col gap-2">
                                {data.topMerchants.map((merchant) => (
                                    <li
                                        key={merchant.name}
                                        className="flex items-center gap-3 rounded-lg border border-line bg-surface p-4"
                                    >
                                        <span
                                            aria-hidden
                                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-canvas text-muted"
                                        >
                                            <Store className="h-4.5 w-4.5" />
                                        </span>
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium text-ink">{merchant.name}</p>
                                            <p className="text-xs text-muted">{merchant.count} transactions</p>
                                        </div>
                                        <p className="shrink-0 text-sm font-semibold text-ink">
                                            {formatCurrency(merchant.amount)}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <nav className="grid grid-cols-2 gap-3">
                            <Link
                                to="/customer/spending/e-commerce"
                                className="flex items-center justify-between rounded-lg border border-line bg-surface p-4 text-sm font-medium text-ink transition-colors hover:border-primary/40"
                            >
                                <span className="flex items-center gap-2">
                                    <ShoppingBag className="h-4.5 w-4.5 text-primary" aria-hidden />
                                    E-commerce
                                </span>
                                <ChevronRight className="h-4 w-4 text-muted" aria-hidden />
                            </Link>
                            <Link
                                to="/customer/spending/atm"
                                className="flex items-center justify-between rounded-lg border border-line bg-surface p-4 text-sm font-medium text-ink transition-colors hover:border-primary/40"
                            >
                                <span className="flex items-center gap-2">
                                    <Store className="h-4.5 w-4.5 text-primary" aria-hidden />
                                    ATM usage
                                </span>
                                <ChevronRight className="h-4 w-4 text-muted" aria-hidden />
                            </Link>
                        </nav>
                    </>
                ) : null}
            </PageState>
        </section>
    );
}
