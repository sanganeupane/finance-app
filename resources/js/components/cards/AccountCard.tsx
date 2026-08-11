import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Landmark, Wallet } from 'lucide-react';

import { StatusBadge } from '@/components/common';
import { formatCurrency } from '@/utils/format';

export interface AccountCardProps {
    account: {
        id: string;
        name: string;
        type: string;
        status: string;
        maskedNumber: string;
        balance: number;
        availableBalance: number;
        currency: 'NPR' | 'USD';
        interestRate?: number;
    };
    to?: string;
    trailing?: ReactNode;
}

/** Account summary row/card used in accounts list and detail pages. */
export function AccountCard({ account, to, trailing }: AccountCardProps) {
    const content = (
        <div className="flex items-center gap-3 p-4">
            <span
                aria-hidden
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary"
            >
                <Wallet className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-semibold text-ink">{account.name}</p>
                    <StatusBadge status={account.status} />
                </div>
                <p className="mt-0.5 flex items-center gap-1 text-xs text-muted">
                    <Landmark className="h-3.5 w-3.5" aria-hidden />
                    {account.maskedNumber}
                    {account.interestRate !== undefined ? ` · ${account.interestRate}% p.a.` : ''}
                </p>
                <p className="mt-1.5 text-base font-semibold text-ink">
                    {formatCurrency(account.balance, account.currency)}
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
