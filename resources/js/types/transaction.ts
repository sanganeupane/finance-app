export type TransactionType = 'credit' | 'debit';

export type TransactionStatus = 'completed' | 'pending' | 'failed';

export type TransactionCategory =
    | 'groceries'
    | 'dining'
    | 'transport'
    | 'utilities'
    | 'shopping'
    | 'entertainment'
    | 'health'
    | 'salary'
    | 'transfer'
    | 'loan'
    | 'other';

export interface Transaction {
    id: string;
    accountId: string;
    type: TransactionType;
    status: TransactionStatus;
    category: TransactionCategory;
    description: string;
    merchant?: string | null;
    amount: number;
    currency: 'NPR' | 'USD';
    reference: string;
    balanceAfter: number;
    performedAt: string;
}
