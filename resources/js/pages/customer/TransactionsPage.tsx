import { ArrowDownUp } from 'lucide-react';

import { PageState } from '@/components/common';
import { TransactionList } from '@/components/transactions';
import { EmptyState } from '@/components/ui';
import { useAsync } from '@/hooks/useAsync';
import { transactionsService } from '@/services/api';

export default function TransactionsPage() {
    const { status, data, error, refetch } = useAsync(() => transactionsService.list(), []);

    return (
        <section className="flex flex-col gap-4">
            <header>
                <p className="text-sm text-muted">Transactions</p>
                <h1 className="text-2xl font-semibold tracking-tight text-ink">All activity</h1>
                <p className="mt-1 text-sm text-muted">
                    {data ? `${data.length} transactions across your accounts` : 'Loading…'}
                </p>
            </header>

            <PageState status={status} error={error} onRetry={refetch}>
                {data?.length ? (
                    <TransactionList transactions={data} showStatus />
                ) : (
                    <EmptyState
                        icon={<ArrowDownUp className="h-10 w-10" aria-hidden />}
                        title="No transactions"
                        description="Recent movement across your accounts will show up here."
                    />
                )}
            </PageState>
        </section>
    );
}
