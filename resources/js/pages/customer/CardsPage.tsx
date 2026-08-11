import { CreditCard } from 'lucide-react';

import { BankCard } from '@/components/cards';
import { PageState } from '@/components/common';
import { EmptyState } from '@/components/ui';
import { Link } from 'react-router-dom';
import { useAsync } from '@/hooks/useAsync';
import { cardsService } from '@/services/api';
import { formatCurrency } from '@/utils/format';

export default function CardsPage() {
    const { status, data, error, refetch } = useAsync(() => cardsService.list(), []);

    return (
        <section className="flex flex-col gap-4">
            <header>
                <p className="text-sm text-muted">Cards</p>
                <h1 className="text-2xl font-semibold tracking-tight text-ink">Your cards</h1>
            </header>

            <PageState status={status} error={error} onRetry={refetch}>
                {data?.length ? (
                    <div className="flex flex-col gap-4">
                        {data.map((card) => (
                            <Link
                                key={card.id}
                                to={`/customer/cards/${card.id}`}
                                className="block transition-transform active:scale-[0.99]"
                            >
                                <BankCard
                                    holderName={card.holderName}
                                    maskedNumber={card.maskedNumber}
                                    expiryMonth={card.expiryMonth}
                                    expiryYear={card.expiryYear}
                                    brand={card.brand}
                                    type={card.type}
                                    currency="NPR"
                                    footer={
                                        card.type === 'credit'
                                            ? `Limit ${formatCurrency(card.creditLimit ?? 0)} · Available ${formatCurrency(card.availableCredit ?? 0)}`
                                            : 'Debit card · linked to savings'
                                    }
                                />
                            </Link>
                        ))}
                    </div>
                ) : (
                    <EmptyState
                        icon={<CreditCard className="h-10 w-10" aria-hidden />}
                        title="No cards yet"
                        description="Cards issued to your accounts will appear here."
                    />
                )}
            </PageState>
        </section>
    );
}
