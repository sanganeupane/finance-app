import { Sparkles } from 'lucide-react';

import { PageState } from '@/components/common';
import { InsightCard } from '@/components/insights';
import { EmptyState } from '@/components/ui';
import { useAsync } from '@/hooks/useAsync';
import { aiService } from '@/services/api';

export default function AiInsightsPage() {
    const { status, data, error, refetch } = useAsync(() => aiService.insights(), []);

    return (
        <section className="flex flex-col gap-4">
            <header>
                <p className="text-sm text-muted">AI Insights</p>
                <h1 className="text-2xl font-semibold tracking-tight text-ink">Personalized for you</h1>
                <p className="mt-1 text-sm text-muted">
                    Based on your recent banking behavior. Not financial advice.
                </p>
            </header>

            <PageState status={status} error={error} onRetry={refetch}>
                {data?.length ? (
                    <div className="flex flex-col gap-3">
                        {data.map((insight) => (
                            <InsightCard key={insight.id} insight={insight} />
                        ))}
                    </div>
                ) : (
                    <EmptyState
                        icon={<Sparkles className="h-10 w-10" aria-hidden />}
                        title="No insights yet"
                        description="Smart insights will appear as we learn about your habits."
                    />
                )}
            </PageState>
        </section>
    );
}
