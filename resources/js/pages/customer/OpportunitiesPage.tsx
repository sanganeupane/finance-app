import { PageHeader, PageState } from '@/components/common';
import { MarketList } from '@/components/market';
import { EmptyState } from '@/components/ui';
import { useAsync } from '@/hooks/useAsync';
import { marketService } from '@/services/api';

export default function OpportunitiesPage() {
    const { status, data, error, refetch } = useAsync(() => marketService.opportunities(), []);

    return (
        <section className="flex flex-col gap-4">
            <PageHeader
                title="Opportunities"
                subtitle="Diversified options curated for you · informational only"
            />
            <PageState status={status} error={error} onRetry={refetch}>
                <MarketList
                    items={data ?? []}
                    showRecommendation
                    showVolume={false}
                    empty={
                        <EmptyState
                            title="No opportunities right now"
                            description="Curated opportunities will appear here."
                        />
                    }
                />
            </PageState>
        </section>
    );
}
