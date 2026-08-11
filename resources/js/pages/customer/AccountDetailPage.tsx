import { useParams } from 'react-router-dom';
import { BadgeInfo, Copy } from 'lucide-react';

import { PageHeader, PageState, SectionHeader, StatusBadge } from '@/components/common';
import { TransactionList } from '@/components/transactions';
import { useAsync } from '@/hooks/useAsync';
import { accountsService, transactionsService } from '@/services/api';
import { formatCurrency, formatDate } from '@/utils/format';

export default function AccountDetailPage() {
    const { id } = useParams<{ id: string }>();

    const accountState = useAsync(() => accountsService.detail(id ?? ''), [id]);
    const transactionsState = useAsync(
        () => transactionsService.list(id ?? ''),
        [id],
    );

    const account = accountState.data;

    return (
        <section className="flex flex-col gap-4">
            <PageHeader title="Account details" subtitle={account?.name} />

            <PageState status={accountState.status} error={accountState.error} onRetry={accountState.refetch}>
                {account ? (
                    <>
                        <article className="rounded-xl bg-primary p-5 text-white shadow-md">
                            <p className="text-sm text-white/80">Available balance</p>
                            <p className="mt-1 text-3xl font-semibold tracking-tight">
                                {formatCurrency(account.availableBalance, account.currency)}
                            </p>
                            <p className="mt-3 text-xs text-white/70">
                                {account.maskedNumber} · {account.branch}
                            </p>
                        </article>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="rounded-lg border border-line bg-surface p-4">
                                <p className="text-xs text-muted">Balance</p>
                                <p className="mt-1 font-semibold text-ink">
                                    {formatCurrency(account.balance, account.currency)}
                                </p>
                            </div>
                            <div className="rounded-lg border border-line bg-surface p-4">
                                <p className="text-xs text-muted">Interest rate</p>
                                <p className="mt-1 font-semibold text-ink">{account.interestRate}% p.a.</p>
                            </div>
                        </div>

                        <article className="rounded-lg border border-line bg-surface p-4">
                            <h2 className="flex items-center gap-2 text-sm font-semibold text-ink">
                                <BadgeInfo className="h-4 w-4 text-primary" aria-hidden />
                                Account information
                            </h2>
                            <dl className="mt-3 flex flex-col gap-2 text-sm">
                                <div className="flex items-center justify-between gap-3">
                                    <dt className="text-muted">Type</dt>
                                    <dd className="flex items-center gap-2 font-medium text-ink capitalize">
                                        {account.type} <StatusBadge status={account.status} />
                                    </dd>
                                </div>
                                <div className="flex items-center justify-between gap-3">
                                    <dt className="text-muted">Account number</dt>
                                    <dd className="flex items-center gap-1 font-medium text-ink">
                                        {account.maskedNumber}
                                        <Copy className="h-3.5 w-3.5 text-muted" aria-hidden />
                                    </dd>
                                </div>
                                <div className="flex items-center justify-between gap-3">
                                    <dt className="text-muted">Opened</dt>
                                    <dd className="font-medium text-ink">{formatDate(account.openedAt)}</dd>
                                </div>
                                <div className="flex items-center justify-between gap-3">
                                    <dt className="text-muted">Branch</dt>
                                    <dd className="font-medium text-ink">{account.branch}</dd>
                                </div>
                            </dl>
                        </article>
                    </>
                ) : null}
            </PageState>

            <section aria-labelledby="account-transactions">
                <SectionHeader title="Recent transactions" className="mb-3" />
                <PageState
                    status={transactionsState.status}
                    error={transactionsState.error}
                    onRetry={transactionsState.refetch}
                >
                    <TransactionList transactions={transactionsState.data ?? []} />
                </PageState>
            </section>
        </section>
    );
}
