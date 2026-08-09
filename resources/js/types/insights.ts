export type InsightSeverity = 'info' | 'positive' | 'warning' | 'critical';

export type InsightCategory =
    | 'spending'
    | 'savings'
    | 'investment'
    | 'risk'
    | 'loan'
    | 'opportunity'
    | 'fraud';

export interface AIInsight {
    id: string;
    customerId: string;
    severity: InsightSeverity;
    category: InsightCategory;
    title: string;
    description: string;
    recommendation?: string;
    createdAt: string;
}
