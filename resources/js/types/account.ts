export type AccountType = 'savings' | 'current' | 'fixed-deposit' | 'salary';

export type AccountStatus = 'active' | 'dormant' | 'blocked';

export interface Account {
    id: string;
    customerId: string;
    type: AccountType;
    status: AccountStatus;
    name: string;
    accountNumber: string;
    maskedNumber: string;
    balance: number;
    availableBalance: number;
    currency: 'NPR' | 'USD';
    openedAt: string;
    branch: string;
    interestRate: number;
}
