import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { CalendarClock, Home, Percent } from 'lucide-react';

import { StatusBadge } from '@/components/common';
import { formatCurrency, formatDate } from '@/utils/format';

export interface LoanCardProps {
    loan: {
        id: string;
        type: string;
        status: string;
        loanNumber: string;
        outstanding: number;
        interestRate: number;
        emiAmount: number;
        nextDueDate?: string | null;
    };
    to?: string;
    trailing?: ReactNode;
}

const TYPE_ICONS: Record<string, typeof Home> = {
    home: Home,
    personal: CalendarClock,
    auto: CalendarClock,
    education: CalendarClock,
    business: CalendarClock,
};

/** Loan summary card for the loans list. */
export function LoanCard({ loan, to, trailing }: LoanCardProps) {
    const Icon = TYPE_ICONS[loan.type] ?? CalendarClock;

    const content = (
        <div className="flex items-center gap-3 p-4">
            <span
                aria-hidden
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary"
            >
                <Icon className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-semibold text-ink capitalize">{loan.type} loan</p>
                    <StatusBadge status={loan.status} />
                </div>
                <p className="mt-0.5 text-xs text-muted">{loan.loanNumber}</p>
                <p className="mt-1.5 text-base font-semibold text-ink">{formatCurrency(loan.outstanding)}</p>
                <p className="mt-1 flex items-center gap-3 text-xs text-muted">
                    <span className="inline-flex items-center gap-1">
                        <Percent className="h-3.5 w-3.5" aria-hidden />
                        {loan.interestRate}%
                    </span>
                    <span>EMI {formatCurrency(loan.emiAmount)}</span>
                    {loan.nextDueDate ? (
                        <span className="inline-flex items-center gap-1">
                            <CalendarClock className="h-3.5 w-3.5" aria-hidden />
                            Due {formatDate(loan.nextDueDate)}
                        </span>
                    ) : null}
                </p>
            </div>
            {trailing}
        </div>
    );

    if (to) {
        return (
            <Link to={to} className="block rounded-lg border border-line bg-surface transition-colors hover:border-primary/40">
                {content}
            </Link>
        );
    }
    return <div className="rounded-lg border border-line bg-surface">{content}</div>;
}
