import { apiClient, unwrap } from '../client';
import { API_ENDPOINTS } from '../endpoints';
import type { AIInsight } from '@/types/insights';

/**
 * AI insight layer — surfaces personalized, non-advisory recommendations
 * generated from the customer's banking behavior.
 */
export const aiService = {
    insights: async () =>
        unwrap(apiClient.get<{ data: AIInsight[] }>(API_ENDPOINTS.insights.list)),
};
