import { apiClient, unwrap } from '../client';
import { API_ENDPOINTS } from '../endpoints';
import type { Recommendation } from '@/types/recommendation';

export const recommendationsService = {
    list: async () =>
        unwrap(apiClient.get<{ data: Recommendation[] }>(API_ENDPOINTS.recommendations.list)),
};
