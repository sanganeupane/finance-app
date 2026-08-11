export type FinancialHealthRating = 'excellent' | 'good' | 'fair' | 'poor';

export type FinancialHealthFactorStatus = 'good' | 'average' | 'poor';

export interface FinancialHealthFactor {
    id: string;
    label: string;
    value: number; // 0 - 100
    weight: number; // contribution weight (%)
    status: FinancialHealthFactorStatus;
}

export interface FinancialHealth {
    customerId: string;
    score: number; // 0 - 100
    rating: FinancialHealthRating;
    summary: string;
    factors: FinancialHealthFactor[];
    updatedAt: string;
}
