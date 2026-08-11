import { PageHeader, PageState } from '@/components/common';
import { MarketList } from '@/components/market';
import { useAsync } from '@/hooks/useAsync';
import { marketService } from '@/services/api';
import type { TrendingMarketItem } from '@/types/market';

export default function MarketTrendingPage() {
    const { status, data, error, refetch } = useAsync(() => marketService.trending(), []);

    const sparklines: Record<string, number[]> = {};
    (data ?? []).forEach((item) => {
        if ('sparkline' in item && Array.isArray((item as TrendingMarketItem).sparkline)) {
            sparklines[item.symbol] = (item as TrendingMarketItem).sparkline;
        }
    });

    return (
        <section className="flex flex-col gap-4">
            <PageHeader title="Trending" subtitle="Most active instruments today" />
            <PageState status={status} error={error} onRetry={refetch}>
                <MarketList items={data ?? []} sparklines={sparklines} />
            </PageState>
        </section>
    );
}
