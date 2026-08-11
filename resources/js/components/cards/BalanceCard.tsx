import type { ReactNode } from 'react';

import { Eye, EyeOff, TrendingDown, TrendingUp } from 'lucide-react';

import { formatCurrency, formatPercent } from '@/utils/format';

export interface BalanceCardProps {
    label?: string;
    balance: number;
    currency?: 'NPR' | 'USD';
    accountName?: string;
    maskedNumber?: string;
    /** e.g. "+1.4% this month" */
    change?: number;
    trendDirection?: 'up' | 'down';
    actions?: ReactNode;
    onToggleVisibility?: () => void;
    visible?: boolean;
}

/**
 * Hero balance card — the financial headline of the dashboard.
 * Uses the primary green surface with a soft radial highlight.
 */
export function BalanceCard({
    label = 'Total balance',
    balance,
    currency = 'NPR',
    accountName,
    maskedNumber,
    change,
    trendDirection,
    actions,
    onToggleVisibility,
    visible = true,
}: BalanceCardProps) {
    return (
        <article className="relative overflow-hidden rounded-xl bg-primary p-5 text-white shadow-md">
            <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-white/10"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute -bottom-24 -left-10 h-40 w-40 rounded-full bg-primary-dark/40"
            />

            <header className="relative flex items-center justify-between">
                <p className="text-sm text-white/80">{label}</p>
                {onToggleVisibility ? (
                    <button
                        type="button"
                        onClick={onToggleVisibility}
                        aria-label={visible ? 'Hide balance' : 'Show balance'}
                        className="rounded-full bg-white/15 p-1.5 text-white transition-colors hover:bg-white/25"
                    >
                        {visible ? <EyeOff className="h-4 w-4" aria-hidden /> : <Eye className="h-4 w-4" aria-hidden />}
                    </button>
                ) : null}
            </header>

            <p className="relative mt-1 text-3xl font-semibold tracking-tight">
                {visible ? formatCurrency(balance, currency) : '••••••••'}
            </p>

            {change !== undefined ? (
                <p className="relative mt-2 flex items-center gap-1 text-xs text-white/80">
                    {trendDirection === 'up' ? (
                        <TrendingUp className="h-3.5 w-3.5" aria-hidden />
                    ) : (
                        <TrendingDown className="h-3.5 w-3.5" aria-hidden />
                    )}
                    {formatPercent(Math.abs(change))} this month
                </p>
            ) : null}

            {accountName || maskedNumber ? (
                <p className="relative mt-3 text-xs text-white/70">
                    {accountName ? `${accountName} · ` : ''}
                    {visible ? maskedNumber : '•••• •••• •••• ••••'}
                </p>
            ) : null}

            {actions ? <div className="relative mt-4">{actions}</div> : null}
        </article>
    );
}
