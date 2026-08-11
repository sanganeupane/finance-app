import { useParams } from 'react-router-dom';
import { CalendarClock, Landmark, Percent } from 'lucide-react';

import { PageHeader, PageState, StatusBadge } from '@/components/common';
import { useAsync } from '@/hooks/useAsync';
import { loansService } from '@/services/api';
import { formatCurrency, formatDate } from '@/utils/format';
import { cn } from '@/utils/cn';

export default function LoanDetailPage() {
    const { id } = useParams<{ id: string }>();

    const { status, data, error, refetch } = useAsync(() => loansService.detail(id ?? ''), [id]);

    const loan = data;

    const progressPercent = loan
        ? Math.min(100, Math.round((loan.paidInstallments / loan.totalInstallments) * 100))
        : 0;

    return (
        <section className="flex flex-col gap-4">
            <PageHeader title="Loan details" subtitle={loan ? `${loan.type} loan` : undefined} />

            <PageState status={status} error={error} onRetry={refetch}>
                {loan ? (
                    <>
                        <article className="relative overflow-hidden rounded-xl bg-primary p-5 text-white shadow-md">
                            <div
                                aria-hidden
                                className="pointer-events-none absolute -right-14 -top-20 h-44 w-44 rounded-full bg-white/10"
                            />
                            <div className="relative flex items-center justify-between">
                                <p className="text-sm text-white/80">Outstanding balance</p>
                                <StatusBadge status={loan.status} label={loan.loanNumber} />
                            </div>
                            <p className="relative mt-1 text-3xl font-semibold tracking-tight">
                                {formatCurrency(loan.outstanding)}
                            </p>
                            <p className="relative mt-3 text-xs text-white/75">
                                Next EMI {formatCurrency(loan.emiAmount)} due{' '}
                                {loan.nextDueDate ? formatDate(loan.nextDueDate) : '—'}
                            </p>
                        </article>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="rounded-lg border border-line bg-surface p-4">
                                <p className="flex items-center gap-1 text-xs text-muted">
                                    <Percent className="h-3.5 w-3.5" aria-hidden />
                                    Interest rate
                                </p>
                                <p className="mt-1 font-semibold text-ink">{loan.interestRate}% p.a.</p>
                            </div>
                            <div className="rounded-lg border border-line bg-surface p-4">
                                <p className="flex items-center gap-1 text-xs text-muted">
                                    <CalendarClock className="h-3.5 w-3.5" aria-hidden />
                                    EMI amount
                                </p>
                                <p className="mt-1 font-semibold text-ink">{formatCurrency(loan.emiAmount)}</p>
                            </div>
                            <div className="rounded-lg border border-line bg-surface p-4">
                                <p className="text-xs text-muted">Principal</p>
                                <p className="mt-1 font-semibold text-ink">{formatCurrency(loan.principal)}</p>
                            </div>
                            <div className="rounded-lg border border-line bg-surface p-4">
                                <p className="text-xs text-muted">Tenure</p>
                                <p className="mt-1 font-semibold text-ink">
                                    {loan.tenureMonths} months
                                </p>
                            </div>
                        </div>

                        <article className="rounded-lg border border-line bg-surface p-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-sm font-semibold text-ink">Repayment progress</h2>
                                <p className="text-xs text-muted">
                                    {loan.paidInstallments}/{loan.totalInstallments} installments
                                </p>
                            </div>
                            <div className="mt-3 h-2 overflow-hidden rounded-full bg-canvas">
                                <div
                                    aria-hidden
                                    className="h-full rounded-full bg-primary transition-all"
                                    style={{ width: `${progressPercent}%` }}
                                />
                            </div>
                            <div className="mt-2 flex justify-between text-xs text-muted">
                                <span>Paid {formatCurrency(loan.paidPrincipal)}</span>
                                <span>{loan.remainingInstallments} remaining</span>
                            </div>
                        </article>

                        <article className="rounded-lg border border-line bg-surface p-4">
                            <h2 className="flex items-center gap-2 text-sm font-semibold text-ink">
                                <Landmark className="h-4 w-4 text-primary" aria-hidden />
                                Loan information
                            </h2>
                            <dl className="mt-3 flex flex-col gap-2 text-sm">
                                <div className="flex items-center justify-between gap-3">
                                    <dt className="text-muted">Loan number</dt>
                                    <dd className="font-medium text-ink">{loan.loanNumber}</dd>
                                </div>
                                <div className="flex items-center justify-between gap-3">
                                    <dt className="text-muted">Disbursed</dt>
                                    <dd className="font-medium text-ink">{formatDate(loan.disbursedAt)}</dd>
                                </div>
                                <div className="flex items-center justify-between gap-3">
                                    <dt className="text-muted">Sanctioned</dt>
                                    <dd className="font-medium text-ink">{formatDate(loan.sanctionedAt)}</dd>
                                </div>
                                <div className="flex items-center justify-between gap-3">
                                    <dt className="text-muted">EMI day</dt>
                                    <dd className="font-medium text-ink">{loan.emiDay} of each month</dd>
                                </div>
                                <div className="flex items-center justify-between gap-3">
                                    <dt className="text-muted">Branch</dt>
                                    <dd className="font-medium text-ink">{loan.branch}</dd>
                                </div>
                                <div className="flex items-center justify-between gap-3">
                                    <dt className="text-muted">Collateral</dt>
                                    <dd className="text-right font-medium text-ink">{loan.collateral}</dd>
                                </div>
                                <div className="flex items-center justify-between gap-3">
                                    <dt className="text-muted">Purpose</dt>
                                    <dd className="font-medium text-ink capitalize">{loan.purpose}</dd>
                                </div>
                            </dl>
                        </article>

                        <section aria-labelledby="payment-schedule">
                            <header className="mb-3">
                                <h2 className="text-base font-semibold text-ink">Recent payments</h2>
                                <p className="mt-0.5 text-xs text-muted">EMI breakdown · principal and interest</p>
                            </header>
                            <ul className="flex flex-col gap-2">
                                {loan.payments.map((payment) => (
                                    <li
                                        key={payment.id}
                                        className="flex items-center gap-3 rounded-lg border border-line bg-surface p-4"
                                    >
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm font-medium text-ink">{formatDate(payment.date)}</p>
                                            <p className="mt-0.5 text-xs text-muted">
                                                Principal {formatCurrency(payment.principal)} · Interest{' '}
                                                {formatCurrency(payment.interest)}
                                            </p>
                                        </div>
                                        <div className="shrink-0 text-right">
                                            <p className="text-sm font-semibold text-ink">
                                                {formatCurrency(payment.amount)}
                                            </p>
                                            <StatusBadge
                                                status={payment.status}
                                                className={cn('mt-1', payment.status === 'paid' && 'bg-primary-soft text-primary')}
                                            />
                                        </div>
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
