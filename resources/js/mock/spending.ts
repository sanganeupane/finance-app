import type { SpendingSummary } from '@/types/spending';

export const mockSpending: SpendingSummary = {
    customerId: 'c-1001',
    month: '2026-07',
    totalSpent: 214350,
    averageDaily: 7145,
    categories: [
        { category: 'Groceries', amount: 61200, percentage: 28.6 },
        { category: 'Dining', amount: 39800, percentage: 18.6 },
        { category: 'Transport', amount: 21400, percentage: 10.0 },
        { category: 'Utilities', amount: 18600, percentage: 8.7 },
        { category: 'Shopping', amount: 34850, percentage: 16.3 },
        { category: 'Health', amount: 9200, percentage: 4.3 },
        { category: 'Entertainment', amount: 29300, percentage: 13.7 },
    ],
    trend: [
        { month: 'Feb', amount: 181200 },
        { month: 'Mar', amount: 198400 },
        { month: 'Apr', amount: 176900 },
        { month: 'May', amount: 221800 },
        { month: 'Jun', amount: 205600 },
        { month: 'Jul', amount: 214350 },
    ],
    comparisonToLastMonth: 4.3,
};
