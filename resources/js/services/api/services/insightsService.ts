import { apiClient } from '../client';
import { API_ENDPOINTS } from '../endpoints';
import type { AIInsight } from '@/types/insights';

export const insightsService = {
    list: (customerId: string) => apiClient.get<{ data: AIInsight[] }>(API_ENDPOINTS.insights.list(customerId)),
};
