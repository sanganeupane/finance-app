import { apiClient } from '../client';
import { API_ENDPOINTS } from '../endpoints';
import type { Investment } from '@/types/investment';

export const investmentsService = {
    list: (customerId: string) => apiClient.get<{ data: Investment[] }>(API_ENDPOINTS.investments.list(customerId)),
};
