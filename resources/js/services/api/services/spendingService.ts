import { apiClient, unwrap } from '../client';
import { API_ENDPOINTS } from '../endpoints';
import type { SpendingAnalysis, ECommerceSpending, AtmUsage } from '@/types/spending';

export const spendingService = {
    get: async () =>
        unwrap(apiClient.get<{ data: SpendingAnalysis }>(API_ENDPOINTS.spending.get)),

    eCommerce: async () =>
        unwrap(apiClient.get<{ data: ECommerceSpending }>(API_ENDPOINTS.spending.eCommerce)),

    atm: async () => unwrap(apiClient.get<{ data: AtmUsage }>(API_ENDPOINTS.spending.atm)),
};
