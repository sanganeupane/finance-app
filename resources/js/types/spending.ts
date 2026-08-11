export interface SpendingCategory {
    id: string;
    category: string;
    amount: number;
    percentage: number;
    color: string; // hex token reference (not raw UI color logic)
    trend: number; // % change vs last month
}

export interface SpendingMonthlyTrend {
    month: string;
    amount: number;
}

export interface SpendingAnalysis {
    customerId: string;
    month: string;
    totalSpent: number;
    averageDaily: number;
    comparisonToLastMonth: number;
    budget: number;
    budgetUsed: number;
    categories: SpendingCategory[];
    trend: SpendingMonthlyTrend[];
    topMerchants: Array<{ name: string; amount: number; count: number }>;
}

export interface ECommerceSpending {
    customerId: string;
    month: string;
    totalSpent: number;
    comparisonToLastMonth: number;
    byPlatform: Array<{ platform: string; amount: number; percentage: number }>;
    transactions: number;
    averageOrderValue: number;
}

export interface AtmUsage {
    customerId: string;
    month: string;
    totalWithdrawals: number;
    totalFees: number;
    averageWithdrawal: number;
    byBranch: Array<{ branch: string; count: number; amount: number }>;
    monthly: Array<{ month: string; amount: number }>;
}
