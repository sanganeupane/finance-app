import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUp, Crown, Layers } from 'lucide-react';

import { MarketList, MarketOverviewCard } from '@/components/market';
import { PageState, SectionHeader } from '@/components/common';
import { useAsync } from '@/hooks/useAsync';
import { marketService } from '@/services/api';
import type { TrendingMarketItem } from '@/types/market';

export default function MarketOverviewPage() {
    const overviewState = useAsync(() => marketService.overview(), []);
    const trendingState = useAsync(() => marketService.trending(), []);

    const sparklines: Record<string, number[]> = {};
    (trendingState.data ?? []).forEach((item) => {
        if ('sparkline' in item && Array.isArray((item as TrendingMarketItem).sparkline)) {
            sparklines[item.symbol] = (item as TrendingMarketItem).sparkline;
        }
    });

    return (
        <section className="flex flex-col gap-5">
            <header>
                <p className="text-sm text-muted">Market</p>
                <h1 className="text-2xl font-semibold tracking-tight text-ink">Market overview</h1>
            </header>

            <PageState
                status={overviewState.status}
                error={overviewState.error}
                onRetry={overviewState.refetch}
            >
                {overviewState.data ? (
                    <MarketOverviewCard overview={overviewState.data} />
                ) : null}
            </PageState>

            <nav aria-label="Market sections" className="grid grid-cols-2 gap-3">
                <Link
                    to="/customer/market/trending"
                    className="flex items-center justify-between rounded-lg border border-line bg-surface p-4 text-sm font-medium text-ink transition-colors hover:border-primary/40"
                >
                    <span className="flex items-center gap-2">
                        <Crown className="h-4.5 w-4.5 text-primary" aria-hidden />
                        Trending
                    </span>
                </Link>
                <Link
                    to="/customer/market/gainers"
                    className="flex items-center justify-between rounded-lg border border-line bg-surface p-4 text-sm font-medium text-ink transition-colors hover:border-primary/40"
                >
                    <span className="flex items-center gap-2">
                        <ArrowUp className="h-4.5 w-4.5 text-success" aria-hidden />
                        Gainers
                    </span>
                </Link>
                <Link
                    to="/customer/market/losers"
                    className="flex items-center justify-between rounded-lg border border-line bg-surface p-4 text-sm font-medium text-ink transition-colors hover:border-primary/40"
                >
                    <span className="flex items-center gap-2">
                        <ArrowDown className="h-4.5 w-4.5 text-danger" aria-hidden />
                        Losers
                    </span>
                </Link>
                <Link
                    to="/customer/market/opportunities"
                    className="flex items-center justify-between rounded-lg border border-line bg-surface p-4 text-sm font-medium text-ink transition-colors hover:border-primary/40"
                >
                    <span className="flex items-center gap-2">
                        <Layers className="h-4.5 w-4.5 text-info" aria-hidden />
                        Opportunities
                    </span>
                </Link>
            </nav>

            <section aria-labelledby="trending-preview">
                <SectionHeader title="Trending today" linkTo="/customer/market/trending" className="mb-3" />
                <PageState
                    status={trendingState.status}
                    error={trendingState.error}
                    onRetry={trendingState.refetch}
                >
                    <MarketList items={trendingState.data ?? []} sparklines={sparklines} />
                </PageState>
            </section>
        </section>
    );
}
