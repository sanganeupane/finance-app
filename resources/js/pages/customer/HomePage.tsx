import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CircleDollarSign, Sparkles, TrendingUp } from 'lucide-react';

import { BalanceCard, InvestmentCard } from '@/components/cards';
import { MarketOverviewCard } from '@/components/market';
import { SectionHeader } from '@/components/common';
import { PageState } from '@/components/common';
import { TransactionList } from '@/components/transactions';
import { useAsync } from '@/hooks/useAsync';
import { dashboardService } from '@/services/api';
import { formatCurrency, formatPercent } from '@/utils/format';
import { resolveIcon } from '@/utils/icons';

export default function HomePage() {
    const { status, data, error, refetch } = useAsync(() => dashboardService.get(), []);
    const [visible, setVisible] = useState(true);

    return (
        <section className="flex flex-col gap-5">
            <PageState status={status} error={error} onRetry={refetch}>
                {data ? (
                    <>
                        <header className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted">{data.greeting}</p>
                                <h1 className="text-2xl font-semibold tracking-tight text-ink">{data.userName}</h1>
                            </div>
                            <Link
                                to="/customer/notifications"
                                aria-label="Notifications"
                                className="rounded-full bg-surface p-2 text-muted shadow-sm transition-colors hover:text-primary"
                            >
                                <Sparkles className="h-5 w-5" aria-hidden />
                            </Link>
                        </header>

                        <BalanceCard
                            balance={data.totalBalance}
                            currency={data.currency}
                            accountName={data.primaryAccount.name}
                            maskedNumber={data.primaryAccount.maskedNumber}
                            change={data.marketSnapshot.percentage}
                            trendDirection={data.marketSnapshot.change >= 0 ? 'up' : 'down'}
                            visible={visible}
                            onToggleVisibility={() => setVisible((value) => !value)}
                            actions={
                                <div className="flex gap-2">
                                    <Link
                                        to="/customer/accounts"
                                        className="inline-flex h-9 items-center gap-1.5 rounded-md bg-white px-3 text-sm font-medium text-primary shadow-sm transition-colors hover:bg-white/90"
                                    >
                                        <CircleDollarSign className="h-4 w-4" aria-hidden />
                                        Accounts
                                    </Link>
                                    <Link
                                        to="/customer/transactions"
                                        className="inline-flex h-9 items-center gap-1.5 rounded-md bg-white/15 px-3 text-sm font-medium text-white transition-colors hover:bg-white/25"
                                    >
                                        <TrendingUp className="h-4 w-4" aria-hidden />
                                        Activity
                                    </Link>
                                </div>
                            }
                        />

                        <nav aria-label="Quick actions" className="grid grid-cols-4 gap-3">
                            {data.quickActions.map((action) => {
                                const Icon = resolveIcon(action.icon);
                                return (
                                    <Link
                                        key={action.id}
                                        to={action.route}
                                        className="flex h-14 flex-col items-center justify-center gap-1 rounded-lg border border-line bg-surface text-xs font-medium text-ink transition-colors hover:border-primary/40"
                                    >
                                        <Icon className="h-5 w-5 text-primary" aria-hidden />
                                        {action.label}
                                    </Link>
                                );
                            })}
                        </nav>

                        <section aria-labelledby="market-heading">
                            <SectionHeader
                                title="Market snapshot"
                                subtitle={`NEPSE ${data.marketSnapshot.status}`}
                                linkTo="/customer/market"
                            />
                            <div className="mt-3">
                                <MarketOverviewCard overview={data.marketSnapshot} />
                            </div>
                        </section>

                        <section aria-labelledby="trending-heading">
                            <SectionHeader title="Trending" linkTo="/customer/market/trending" />
                            <div className="mt-3 flex flex-col gap-2">
                                {data.trendingInvestments.map((item) => (
                                    <InvestmentCard
                                        key={item.id}
                                        investment={{
                                            ...item,
                                            type: 'equity',
                                            status: 'active',
                                            units: 0,
                                            investedAmount: item.currentValue - item.change,
                                            nav: item.currentValue,
                                            currency: data.currency,
                                            risk: 'medium',
                                        }}
                                        to="/customer/investments"
                                    />
                                ))}
                            </div>
                        </section>

                        <section aria-labelledby="activity-heading">
                            <SectionHeader
                                title="Recent activity"
                                subtitle={`${data.summary.accounts.count} accounts · ${formatCurrency(data.summary.accounts.totalBalance)}`}
                                linkTo="/customer/transactions"
                            />
                            <div className="mt-3">
                                <TransactionList transactions={data.recentTransactions} />
                            </div>
                        </section>

                        <p className="text-center text-xs text-muted">
                            Total invested {formatCurrency(data.summary.investments.totalValue)} ·{' '}
                            {formatPercent(data.marketSnapshot.percentage)} index change
                        </p>
                    </>
                ) : null}
            </PageState>
        </section>
    );
}
