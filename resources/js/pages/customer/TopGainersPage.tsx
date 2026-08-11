import { PageHeader, PageState } from '@/components/common';
import { MarketList } from '@/components/market';
import { useAsync } from '@/hooks/useAsync';
import { marketService } from '@/services/api';

export default function TopGainersPage() {
    const { status, data, error, refetch } = useAsync(() => marketService.gainers(), []);

    return (
        <section className="flex flex-col gap-4">
            <PageHeader title="Top gainers" subtitle="Best performers of the session" />
            <PageState status={status} error={error} onRetry={refetch}>
                <MarketList items={data ?? []} showRecommendation />
            </PageState>
        </section>
    );
}
