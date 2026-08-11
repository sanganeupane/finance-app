import type { ReactNode } from 'react';

import { EmptyState } from '@/components/ui';
import { TransactionItem } from './TransactionItem';
import type { Transaction } from '@/types/transaction';

export interface TransactionListProps {
    transactions: Transaction[];
    showStatus?: boolean;
    emptyTitle?: string;
    emptyDescription?: string;
    emptyIcon?: ReactNode;
    className?: string;
}

/** Ordered list of transaction rows with an empty state. */
export function TransactionList({
    transactions,
    showStatus,
    emptyTitle = 'No transactions yet',
    emptyDescription = 'Transactions will appear here once you start moving money.',
    emptyIcon,
    className,
}: TransactionListProps) {
    if (transactions.length === 0) {
        return <EmptyState title={emptyTitle} description={emptyDescription} icon={emptyIcon} />;
    }
    return (
        <ul className={className}>
            {transactions.map((transaction) => (
                <TransactionItem key={transaction.id} transaction={transaction} showStatus={showStatus} />
            ))}
        </ul>
    );
}
