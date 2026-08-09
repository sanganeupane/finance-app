export type InvestmentType = 'mutual-fund' | 'equity' | 'treasury-bill' | 'bond';

export type InvestmentStatus = 'active' | 'matured' | 'closed';

export interface Investment {
    id: string;
    customerId: string;
    type: InvestmentType;
    status: InvestmentStatus;
    name: string;
    units: number;
    investedAmount: number;
    currentValue: number;
    nav?: number;
    maturityDate?: string | null;
}
