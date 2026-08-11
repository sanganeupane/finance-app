import { PageHeader, PageState } from '@/components/common';
import { MarketList } from '@/components/market';
import { useAsync } from '@/hooks/useAsync';
import { marketService } from '@/services/api';

export default function TopLosersPage() {
    const { status, data, error, refetch } = useAsync(() => marketService.losers(), []);

    return (
        <section className="flex flex-col gap-4">
            <PageHeader title="Top losers" subtitle="Weakest performers of the session" />
            <PageState status={status} error={error} onRetry={refetch}>
                <MarketList items={data ?? []} showRecommendation />
            </PageState>
        </section>
    );
}
