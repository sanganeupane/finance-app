import type { AIInsight } from '@/types/insights';

export const mockInsights: AIInsight[] = [
    {
        id: 'ins-2001',
        customerId: 'c-1001',
        severity: 'positive',
        category: 'savings',
        title: 'Savings rate improved 6%',
        description:
            'Aarav saved 34% of income over the last quarter, up from 28%. This exceeds the premium-segment median.',
        recommendation: 'Consider redirecting the surplus to a fixed deposit above NPR 500,000.',
        createdAt: '2026-07-10T09:00:00',
    },
    {
        id: 'ins-2002',
        customerId: 'c-1001',
        severity: 'warning',
        category: 'spending',
        title: 'Shopping spend 22% above budget',
        description:
            'Online shopping spend is trending higher for the third consecutive month.',
        recommendation: 'Review recurring marketplace subscriptions and set a monthly cap.',
        createdAt: '2026-07-08T09:00:00',
    },
    {
        id: 'ins-2003',
        customerId: 'c-1001',
        severity: 'critical',
        category: 'loan',
        title: 'Personal loan EMI at 18% of income',
        description:
            'The combined debt service ratio is approaching the comfort ceiling for this segment.',
        recommendation: 'Prepay the personal loan partial principal of NPR 200,000 to reduce interest.',
        createdAt: '2026-07-05T09:00:00',
    },
    {
        id: 'ins-2004',
        customerId: 'c-1001',
        severity: 'info',
        category: 'opportunity',
        title: 'Investment diversification gap',
        description:
            'Holding is 71% equity-based; a treasury component would reduce portfolio volatility.',
        recommendation: 'Explore treasury bills for up to 15% of the portfolio.',
        createdAt: '2026-07-02T09:00:00',
    },
];
