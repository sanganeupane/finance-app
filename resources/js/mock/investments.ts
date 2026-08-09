import type { Investment } from '@/types/investment';

export const mockInvestments: Investment[] = [
    {
        id: 'inv-6001',
        customerId: 'c-1001',
        type: 'mutual-fund',
        status: 'active',
        name: 'Nabil Balanced Fund II',
        units: 8500,
        investedAmount: 450000,
        currentValue: 482000,
        nav: 56.71,
    },
    {
        id: 'inv-6002',
        customerId: 'c-1001',
        type: 'equity',
        status: 'active',
        name: 'Nepal Investment Bank',
        units: 1200,
        investedAmount: 720000,
        currentValue: 792000,
        nav: 660,
    },
    {
        id: 'inv-6003',
        customerId: 'c-1001',
        type: 'treasury-bill',
        status: 'matured',
        name: 'T-Bill 91-day',
        units: 1,
        investedAmount: 2000000,
        currentValue: 2035000,
        maturityDate: '2026-06-30',
    },
];
