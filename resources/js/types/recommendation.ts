export type RecommendationPriority = 'high' | 'medium' | 'low';

export type RecommendationCategory =
    | 'savings'
    | 'investment'
    | 'loan'
    | 'card'
    | 'insurance'
    | 'engagement';

export interface Recommendation {
    id: string;
    customerId: string;
    priority: RecommendationPriority;
    category: RecommendationCategory;
    title: string;
    description: string;
    expectedImpact: string;
    effort: 'low' | 'medium' | 'high';
    createdAt: string;
}
