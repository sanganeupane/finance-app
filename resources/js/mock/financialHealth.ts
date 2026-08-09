import type { FinancialHealth } from '@/types/financialHealth';

export const mockFinancialHealth: FinancialHealth = {
    customerId: 'c-1001',
    score: 78,
    grade: 'good',
    trend: 4,
    factors: [
        { key: 'savings-rate', label: 'Savings rate', score: 84, weight: 0.3 },
        { key: 'debt-service', label: 'Debt service ratio', score: 71, weight: 0.25 },
        { key: 'liquidity', label: 'Emergency liquidity', score: 88, weight: 0.2 },
        { key: 'spending-discipline', label: 'Spending discipline', score: 66, weight: 0.15 },
        { key: 'investment-diversification', label: 'Diversification', score: 75, weight: 0.1 },
    ],
    lastUpdatedAt: '2026-07-11T06:00:00',
};
