export type InvestmentType = 'mutual-fund' | 'equity' | 'treasury-bill' | 'bond';

export type InvestmentStatus = 'active' | 'matured' | 'closed';

export interface Investment {
    id: string;
    customerId: string;
    type: InvestmentType;
    status: InvestmentStatus;
    name: string;
    symbol: string;
    units: number;
    investedAmount: number;
    currentValue: number;
    change: number;
    percentage: number;
    nav?: number;
    risk: 'low' | 'medium' | 'high';
    trend: 'up' | 'down' | 'flat';
    recommendation: 'buy' | 'hold' | 'sell' | 'invest' | 'avoid';
    currency: 'NPR' | 'USD';
    maturityDate?: string | null;
    updatedAt: string;
}
