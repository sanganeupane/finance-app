import { Link } from 'react-router-dom';
import { ChevronRight, CreditCard, Send, Wallet } from 'lucide-react';

import { PageState, SectionHeader, StatusBadge } from '@/components/common';
import { EmptyState } from '@/components/ui';
import { useAsync } from '@/hooks/useAsync';
import { paymentService } from '@/services/api';
import { formatCurrency } from '@/utils/format';

export default function PaymentsPage() {
    const { status, data, error, refetch } = useAsync(() => paymentService.overview(), []);

    return (
        <section className="flex flex-col gap-5">
            <header>
                <p className="text-sm text-muted">Payments</p>
                <h1 className="text-2xl font-semibold tracking-tight text-ink">Send & pay</h1>
            </header>

            <nav aria-label="Payment actions" className="grid grid-cols-2 gap-3">
                <Link
                    to="/customer/payments/send"
                    className="flex flex-col items-center gap-2 rounded-lg border border-line bg-surface p-4 text-sm font-medium text-ink transition-colors hover:border-primary/40"
                >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft text-primary">
                        <Send className="h-5 w-5" aria-hidden />
                    </span>
                    Send money
                </Link>
                <Link
                    to="/customer/payments/bills"
                    className="flex flex-col items-center gap-2 rounded-lg border border-line bg-surface p-4 text-sm font-medium text-ink transition-colors hover:border-primary/40"
                >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft text-primary">
                        <CreditCard className="h-5 w-5" aria-hidden />
                    </span>
                    Pay bills
                </Link>
            </nav>

            <PageState status={status} error={error} onRetry={refetch}>
                {data ? (
                    <>
                        <div className="rounded-lg border border-line bg-surface p-4">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-muted">Available balance</p>
                                <Wallet className="h-4.5 w-4.5 text-primary" aria-hidden />
                            </div>
                            <p className="mt-1 text-2xl font-semibold text-ink">{formatCurrency(data.balance)}</p>
                        </div>

                        <section aria-labelledby="recent-payments">
                            <SectionHeader title="Recent payments" className="mb-3" />
                            {data.recent.length ? (
                                <ul className="flex flex-col gap-2">
                                    {data.recent.map((payment) => (
                                        <li
                                            key={payment.id}
                                            className="flex items-center gap-3 rounded-lg border border-line bg-surface p-4"
                                        >
                                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-canvas text-muted">
                                                <Send className="h-4 w-4" aria-hidden />
                                            </span>
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-sm font-medium text-ink">{payment.title}</p>
                                                <p className="truncate text-xs text-muted">{payment.subtitle}</p>
                                            </div>
                                            <div className="shrink-0 text-right">
                                                <p className="text-sm font-semibold text-ink">
                                                    {formatCurrency(payment.amount)}
                                                </p>
                                                <StatusBadge status={payment.status} />
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <EmptyState title="No payments yet" />
                            )}
                        </section>

                        <section aria-labelledby="billers-heading">
                            <SectionHeader title="Pay billers" className="mb-3" />
                            <ul className="flex flex-col gap-2">
                                {data.billers.map((biller) => (
                                    <li key={biller.id}>
                                        <Link
                                            to="/customer/payments/bills"
                                            className="flex items-center justify-between gap-3 rounded-lg border border-line bg-surface p-4 text-sm transition-colors hover:border-primary/40"
                                        >
                                            <span className="flex items-center gap-3">
                                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
                                                    <CreditCard className="h-4 w-4" aria-hidden />
                                                </span>
                                                <span>
                                                    <span className="block font-medium text-ink">{biller.name}</span>
                                                    <span className="block text-xs text-muted capitalize">{biller.category}</span>
                                                </span>
                                            </span>
                                            <ChevronRight className="h-4 w-4 text-muted" aria-hidden />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </>
                ) : null}
            </PageState>
        </section>
    );
}
