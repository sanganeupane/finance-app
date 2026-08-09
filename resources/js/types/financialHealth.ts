export interface FinancialHealthFactor {
    key: string;
    label: string;
    score: number; // 0 - 100
    weight: number;
}

export interface FinancialHealth {
    customerId: string;
    score: number; // 0 - 100
    grade: 'excellent' | 'good' | 'fair' | 'poor';
    trend: number; // percentage change vs last quarter
    factors: FinancialHealthFactor[];
    lastUpdatedAt: string;
}
