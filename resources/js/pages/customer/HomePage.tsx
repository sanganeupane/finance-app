import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CircleDollarSign, Sparkles, TrendingUp, Wallet } from 'lucide-react';

import { AccountCard, BalanceCard, BankCard, InvestmentCard } from '@/components/cards';
import { InsightCard } from '@/components/insights';
import { MarketOverviewCard, MarketPreviewList, RecommendedCard } from '@/components/market';
import { PageState, SectionHeader } from '@/components/common';
import { TransactionList } from '@/components/transactions';
import { useAsync } from '@/hooks/useAsync';
import {
    accountsService,
    aiService,
    dashboardService,
    marketService,
    spendingService,
} from '@/services/api';
import { formatCurrency, formatPercent } from '@/utils/format';
import { resolveIcon } from '@/utils/icons';

export default function HomePage() {
    const { status, data, error, refetch } = useAsync(() => dashboardService.get(), []);
    const [visible, setVisible] = useState(true);

    const overviewState = useAsync(() => marketService.overview(), []);
    const gainersState = useAsync(() => marketService.gainers(), []);
    const losersState = useAsync(() => marketService.losers(), []);
    const mostTradedState = useAsync(() => marketService.mostTraded(), []);
    const watchlistState = useAsync(() => marketService.watchlist(), []);
    const recommendedState = useAsync(() => marketService.recommended(), []);
    const spendingState = useAsync(() => spendingService.get(), []);
    const insightsState = useAsync(() => aiService.insights(), []);
    const accountsState = useAsync(() => accountsService.list(), []);

    const sparklines: Record<string, number[]> = {};
    (watchlistState.data ?? []).forEach((item) => {
        if (item.sparkline) sparklines[item.symbol] = item.sparkline;
    });

    const accounts = accountsState.data ?? [];
    const primaryCard = data?.primaryCard;
    const topInsight = insightsState.data?.[0];

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

                        <section aria-labelledby="accounts-heading">
                            <SectionHeader
                                title="Accounts"
                                subtitle={`${data.summary.accounts.count} accounts · ${formatCurrency(data.summary.accounts.totalBalance)}`}
                                linkTo="/customer/accounts"
                            />
                            <div className="mt-3 flex flex-col gap-2">
                                {accounts.slice(0, 2).map((account) => (
                                    <AccountCard
                                        key={account.id}
                                        account={account}
                                        to={`/customer/accounts/${account.id}`}
                                    />
                                ))}
                            </div>
                        </section>

                        {primaryCard ? (
                            <section aria-labelledby="card-heading">
                                <SectionHeader
                                    title="Cards"
                                    subtitle={`${data.summary.cards.count} cards · total limit ${formatCurrency(data.summary.cards.totalLimit)}`}
                                    linkTo="/customer/cards"
                                />
                                <Link to={`/customer/cards/${primaryCard.id}`} className="mt-3 block">
                                    <BankCard
                                        holderName={primaryCard.holderName}
                                        maskedNumber={primaryCard.maskedNumber}
                                        expiryMonth={primaryCard.expiryMonth}
                                        expiryYear={primaryCard.expiryYear}
                                        brand={primaryCard.brand}
                                        type={primaryCard.type}
                                        currency={data.currency}
                                    />
                                </Link>
                            </section>
                        ) : null}

                        <section aria-labelledby="market-heading">
                            <SectionHeader
                                title="Market snapshot"
                                subtitle={overviewState.data ? `NEPSE ${overviewState.data.status}` : undefined}
                                linkTo="/customer/market"
                            />
                            <div className="mt-3">
                                <PageState
                                    status={overviewState.status}
                                    error={overviewState.error}
                                    onRetry={overviewState.refetch}
                                >
                                    {overviewState.data ? (
                                        <MarketOverviewCard overview={overviewState.data} />
                                    ) : null}
                                </PageState>
                            </div>
                        </section>

                        <section aria-labelledby="gainers-heading">
                            <SectionHeader title="Top gainers" linkTo="/customer/market/gainers" />
                            <div className="mt-3">
                                <PageState
                                    status={gainersState.status}
                                    error={gainersState.error}
                                    onRetry={gainersState.refetch}
                                >
                                    <MarketPreviewList items={gainersState.data ?? []} to="/customer/market/gainers" />
                                </PageState>
                            </div>
                        </section>

                        <section aria-labelledby="losers-heading">
                            <SectionHeader title="Top losers" linkTo="/customer/market/losers" />
                            <div className="mt-3">
                                <PageState
                                    status={losersState.status}
                                    error={losersState.error}
                                    onRetry={losersState.refetch}
                                >
                                    <MarketPreviewList items={losersState.data ?? []} to="/customer/market/losers" />
                                </PageState>
                            </div>
                        </section>

                        <section aria-labelledby="traded-heading">
                            <SectionHeader title="Most traded" linkTo="/customer/market/trending" />
                            <div className="mt-3">
                                <PageState
                                    status={mostTradedState.status}
                                    error={mostTradedState.error}
                                    onRetry={mostTradedState.refetch}
                                >
                                    <MarketPreviewList
                                        items={mostTradedState.data ?? []}
                                        to="/customer/market/trending"
                                    />
                                </PageState>
                            </div>
                        </section>

                        <section aria-labelledby="watchlist-heading">
                            <SectionHeader title="Watchlist" linkTo="/customer/market" />
                            <div className="mt-3">
                                <PageState
                                    status={watchlistState.status}
                                    error={watchlistState.error}
                                    onRetry={watchlistState.refetch}
                                >
                                    <MarketPreviewList
                                        items={watchlistState.data ?? []}
                                        to="/customer/market"
                                        sparklines={sparklines}
                                    />
                                </PageState>
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

                        <section aria-labelledby="opportunities-heading">
                            <SectionHeader title="Opportunities" linkTo="/customer/market/opportunities" />
                            <div className="mt-3">
                                <PageState
                                    status={recommendedState.status}
                                    error={recommendedState.error}
                                    onRetry={recommendedState.refetch}
                                >
                                    <div className="flex flex-col gap-2">
                                        {(recommendedState.data ?? []).slice(0, 3).map((item) => (
                                            <RecommendedCard key={item.id} item={item} />
                                        ))}
                                    </div>
                                </PageState>
                            </div>
                        </section>

                        <section aria-labelledby="spending-heading">
                            <SectionHeader title="Spending summary" subtitle="This month" linkTo="/customer/spending" />
                            <div className="mt-3">
                                <PageState
                                    status={spendingState.status}
                                    error={spendingState.error}
                                    onRetry={spendingState.refetch}
                                >
                                    {spendingState.data ? (
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="rounded-lg border border-line bg-surface p-4">
                                                <p className="text-xs text-muted">Total spent</p>
                                                <p className="mt-1 font-semibold text-ink">
                                                    {formatCurrency(spendingState.data.totalSpent)}
                                                </p>
                                            </div>
                                            <div className="rounded-lg border border-line bg-surface p-4">
                                                <p className="text-xs text-muted">Top category</p>
                                                <p className="mt-1 font-semibold text-ink capitalize">
                                                    {spendingState.data.categories[0]?.category ?? '—'}
                                                </p>
                                            </div>
                                        </div>
                                    ) : null}
                                </PageState>
                            </div>
                        </section>

                        {topInsight ? (
                            <section aria-labelledby="insight-heading">
                                <SectionHeader title="AI insight" subtitle="Personalized for you" linkTo="/customer/ai-insights" />
                                <div className="mt-3">
                                    <InsightCard insight={topInsight} />
                                </div>
                            </section>
                        ) : null}

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

                        <p className="flex items-center justify-center gap-1.5 text-center text-xs text-muted">
                            <Wallet className="h-3.5 w-3.5" aria-hidden />
                            Total invested {formatCurrency(data.summary.investments.totalValue)} ·{' '}
                            {formatPercent(data.marketSnapshot.percentage)} index change
                        </p>
                    </>
                ) : null}
            </PageState>
        </section>
    );
}
