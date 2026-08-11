import { apiClient, unwrap } from '../client';
import { API_ENDPOINTS } from '../endpoints';
import type { FinancialHealth } from '@/types/financialHealth';

export const financialHealthService = {
    get: async () =>
        unwrap(apiClient.get<{ data: FinancialHealth }>(API_ENDPOINTS.financialHealth.get)),
};
