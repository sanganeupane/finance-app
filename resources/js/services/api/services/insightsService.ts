import { apiClient, unwrap } from '../client';
import { API_ENDPOINTS } from '../endpoints';
import type { AIInsight } from '@/types/insights';

export const insightsService = {
    list: async () => unwrap(apiClient.get<{ data: AIInsight[] }>(API_ENDPOINTS.insights.list)),
};
