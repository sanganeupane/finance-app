import type { Account } from './account';
import type { Card } from './card';
import type { Investment } from './investment';
import type { Transaction } from './transaction';

export interface QuickAction {
    id: string;
    label: string;
    icon: string;
    route: string;
}

export interface DashboardSummary {
    accounts: { count: number; totalBalance: number };
    cards: { count: number; totalLimit: number };
    loans: { count: number; totalOutstanding: number };
    investments: { count: number; totalValue: number };
}

export interface DashboardSnapshot {
    label: string;
    value: string;
    change: number;
}

export interface DashboardData {
    id: string;
    greeting: string;
    userName: string;
    totalBalance: number;
    currency: 'NPR' | 'USD';
    primaryAccount: Account;
    primaryCard: Card;
    quickActions: QuickAction[];
    summary: DashboardSummary;
    recentTransactions: Transaction[];
    marketSnapshot: {
        status: string;
        index: string;
        currentValue: number;
        change: number;
        percentage: number;
        sentiment: 'bullish' | 'bearish' | 'neutral';
    };
    trendingInvestments: Array<Pick<Investment, 'id' | 'name' | 'symbol' | 'currentValue' | 'change' | 'percentage' | 'trend'>>;
}
