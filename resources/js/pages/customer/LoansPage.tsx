import { ChevronRight, HandCoins } from 'lucide-react';

import { LoanCard } from '@/components/cards';
import { PageState } from '@/components/common';
import { EmptyState } from '@/components/ui';
import { useAsync } from '@/hooks/useAsync';
import { loansService } from '@/services/api';
import { formatCurrency } from '@/utils/format';

export default function LoansPage() {
    const { status, data, error, refetch } = useAsync(() => loansService.list(), []);

    const totalOutstanding = data?.reduce((sum, loan) => sum + loan.outstanding, 0) ?? 0;

    return (
        <section className="flex flex-col gap-4">
            <header>
                <p className="text-sm text-muted">Loans</p>
                <h1 className="text-2xl font-semibold tracking-tight text-ink">Your loans</h1>
                <p className="mt-1 text-sm text-muted">
                    {data ? `${data.length} loans · ${formatCurrency(totalOutstanding)} outstanding` : 'Loading…'}
                </p>
            </header>

            <PageState status={status} error={error} onRetry={refetch}>
                {data?.length ? (
                    <div className="flex flex-col gap-2">
                        {data.map((loan) => (
                            <LoanCard
                                key={loan.id}
                                loan={loan}
                                to={`/customer/loans/${loan.id}`}
                                trailing={<ChevronRight className="h-4 w-4 text-muted" aria-hidden />}
                            />
                        ))}
                    </div>
                ) : (
                    <EmptyState
                        icon={<HandCoins className="h-10 w-10" aria-hidden />}
                        title="No active loans"
                        description="Any loans linked to your profile will appear here."
                    />
                )}
            </PageState>
        </section>
    );
}
