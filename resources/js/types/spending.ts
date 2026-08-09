export interface SpendingCategory {
    category: string;
    amount: number;
    percentage: number;
}

export interface SpendingTrend {
    month: string;
    amount: number;
}

export interface SpendingSummary {
    customerId: string;
    month: string;
    totalSpent: number;
    averageDaily: number;
    categories: SpendingCategory[];
    trend: SpendingTrend[];
    comparisonToLastMonth: number; // percentage change
}
