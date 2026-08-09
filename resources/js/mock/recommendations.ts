import type { Recommendation } from '@/types/recommendation';

export const mockRecommendations: Recommendation[] = [
    {
        id: 'rec-8001',
        customerId: 'c-1001',
        priority: 'high',
        category: 'investment',
        title: 'Open a treasury bill holding',
        description:
            'Shift 15% of the equity-heavy portfolio into a 91-day treasury bill to reduce volatility.',
        expectedImpact: 'NPR 18,000/yr in risk-adjusted return',
        effort: 'low',
        createdAt: '2026-07-09T09:00:00',
    },
    {
        id: 'rec-8002',
        customerId: 'c-1001',
        priority: 'high',
        category: 'loan',
        title: 'Partial prepayment on personal loan',
        description:
            'Prepay NPR 200,000 of the personal loan to cut interest outgo by approximately NPR 95,000 over tenure.',
        expectedImpact: 'NPR 95,000 interest saved',
        effort: 'medium',
        createdAt: '2026-07-09T09:00:00',
    },
    {
        id: 'rec-8003',
        customerId: 'c-1001',
        priority: 'medium',
        category: 'card',
        title: 'Upgrade to cashback credit card',
        description:
            'Spending pattern qualifies for a 2% cashback card, worth roughly NPR 4,000/yr.',
        expectedImpact: 'NPR 4,000/yr cashback',
        effort: 'low',
        createdAt: '2026-07-09T09:00:00',
    },
];
