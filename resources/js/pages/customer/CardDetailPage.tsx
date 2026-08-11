import { useParams } from 'react-router-dom';
import { Lock } from 'lucide-react';

import { BankCard } from '@/components/cards';
import { PageHeader, PageState, SectionHeader, StatusBadge } from '@/components/common';
import { TransactionList } from '@/components/transactions';
import { useAsync } from '@/hooks/useAsync';
import { cardsService } from '@/services/api';
import { formatCurrency } from '@/utils/format';

export default function CardDetailPage() {
    const { id } = useParams<{ id: string }>();

    const cardState = useAsync(() => cardsService.detail(id ?? ''), [id]);
    const transactionsState = useAsync(() => cardsService.transactions(id ?? ''), [id]);

    const card = cardState.data;

    return (
        <section className="flex flex-col gap-4">
            <PageHeader title="Card details" subtitle={card?.type === 'credit' ? 'Credit card' : 'Debit card'} />

            <PageState status={cardState.status} error={cardState.error} onRetry={cardState.refetch}>
                {card ? (
                    <>
                        <BankCard
                            holderName={card.holderName}
                            maskedNumber={card.maskedNumber}
                            expiryMonth={card.expiryMonth}
                            expiryYear={card.expiryYear}
                            brand={card.brand}
                            type={card.type}
                            currency="NPR"
                        />

                        <div className="grid grid-cols-2 gap-3">
                            {card.type === 'credit' ? (
                                <>
                                    <div className="rounded-lg border border-line bg-surface p-4">
                                        <p className="text-xs text-muted">Credit limit</p>
                                        <p className="mt-1 font-semibold text-ink">
                                            {formatCurrency(card.creditLimit ?? 0)}
                                        </p>
                                    </div>
                                    <div className="rounded-lg border border-line bg-surface p-4">
                                        <p className="text-xs text-muted">Available credit</p>
                                        <p className="mt-1 font-semibold text-ink">
                                            {formatCurrency(card.availableCredit ?? 0)}
                                        </p>
                                    </div>
                                    <div className="rounded-lg border border-line bg-surface p-4">
                                        <p className="text-xs text-muted">Outstanding</p>
                                        <p className="mt-1 font-semibold text-ink">
                                            {formatCurrency(card.outstandingBalance ?? 0)}
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <div className="rounded-lg border border-line bg-surface p-4">
                                    <p className="text-xs text-muted">Status</p>
                                    <p className="mt-1">
                                        <StatusBadge status={card.status} />
                                    </p>
                                </div>
                            )}
                            <div className="rounded-lg border border-line bg-surface p-4">
                                <p className="text-xs text-muted">Expiry</p>
                                <p className="mt-1 font-semibold text-ink">
                                    {String(card.expiryMonth).padStart(2, '0')}/{card.expiryYear}
                                </p>
                            </div>
                        </div>

                        <p className="flex items-center gap-1.5 rounded-lg bg-primary-soft px-3 py-2 text-xs text-primary">
                            <Lock className="h-3.5 w-3.5" aria-hidden />
                            CVV and full card number are hidden for security.
                        </p>
                    </>
                ) : null}
            </PageState>

            <section aria-labelledby="card-transactions">
                <SectionHeader title="Card transactions" className="mb-3" />
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
