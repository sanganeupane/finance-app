import {
    ArrowDownLeft,
    Dumbbell,
    Gamepad2,
    Home,
    Plane,
    Shirt,
    ShoppingBag,
    Utensils,
    Wallet,
} from 'lucide-react';

import { StatusBadge } from '@/components/common';
import { formatCurrency, formatRelativeTime } from '@/utils/format';
import { cn } from '@/utils/cn';

export interface TransactionItemProps {
    transaction: {
        id: string;
        type: 'credit' | 'debit';
        status: string;
        category: string;
        description: string;
        merchant?: string | null;
        amount: number;
        currency: 'NPR' | 'USD';
        performedAt: string;
    };
    showStatus?: boolean;
}

const CATEGORY_ICONS: Record<string, typeof Wallet> = {
    groceries: ShoppingBag,
    dining: Utensils,
    transport: Plane,
    utilities: Home,
    shopping: Shirt,
    entertainment: Gamepad2,
    health: Dumbbell,
    salary: ArrowDownLeft,
    transfer: Wallet,
    loan: Home,
    other: Wallet,
};

/** Transaction row: category icon + description + signed amount. */
export function TransactionItem({ transaction, showStatus = false }: TransactionItemProps) {
    const Icon = CATEGORY_ICONS[transaction.category] ?? Wallet;
    const isCredit = transaction.type === 'credit';

    return (
        <li className="flex items-center gap-3 rounded-lg border border-line bg-surface p-4">
            <span
                aria-hidden
                className={cn(
                    'flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
                    isCredit ? 'bg-primary-soft text-primary' : 'bg-canvas text-muted',
                )}
            >
                <Icon className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-medium text-ink">{transaction.description}</p>
                    {showStatus && transaction.status !== 'completed' ? (
                        <StatusBadge status={transaction.status} />
                    ) : null}
                </div>
                <p className="truncate text-xs text-muted">
                    {transaction.merchant ?? 'Bank transfer'}
                    {' · '}
                    {formatRelativeTime(transaction.performedAt)}
                </p>
            </div>
            <p
                className={cn(
                    'shrink-0 text-sm font-semibold',
                    isCredit ? 'text-success' : 'text-ink',
                )}
            >
                {isCredit ? '+' : '-'}
                {formatCurrency(transaction.amount, transaction.currency)}
            </p>
        </li>
    );
}
