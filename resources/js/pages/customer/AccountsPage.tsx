import { Plus, Wallet } from 'lucide-react';

import { AccountCard } from '@/components/cards';
import { PageState } from '@/components/common';
import { EmptyState } from '@/components/ui';
import { useAsync } from '@/hooks/useAsync';
import { accountsService } from '@/services/api';
import { formatCurrency } from '@/utils/format';

export default function AccountsPage() {
    const { status, data, error, refetch } = useAsync(() => accountsService.list(), []);

    const totalBalance = data?.reduce((sum, account) => sum + account.balance, 0) ?? 0;

    return (
        <section className="flex flex-col gap-4">
            <header>
                <p className="text-sm text-muted">Your accounts</p>
                <h1 className="text-2xl font-semibold tracking-tight text-ink">Accounts</h1>
                <p className="mt-1 text-sm text-muted">
                    {data ? `${data.length} accounts · ${formatCurrency(totalBalance)}` : 'Loading…'}
                </p>
            </header>

            <PageState status={status} error={error} onRetry={refetch}>
                {data?.length ? (
                    <div className="flex flex-col gap-2">
                        {data.map((account) => (
                            <AccountCard
                                key={account.id}
                                account={account}
                                to={`/customer/accounts/${account.id}`}
                                trailing={<Plus className="h-4 w-4 text-muted" aria-hidden />}
                            />
                        ))}
                    </div>
                ) : (
                    <EmptyState
                        icon={<Wallet className="h-10 w-10" aria-hidden />}
                        title="No accounts yet"
                        description="Your accounts will appear here once you open one."
                    />
                )}
            </PageState>
        </section>
    );
}
