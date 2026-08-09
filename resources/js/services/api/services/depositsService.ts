import { apiClient } from '../client';
import { API_ENDPOINTS } from '../endpoints';
import type { Deposit } from '@/types/deposit';

export const depositsService = {
    list: (customerId: string) => apiClient.get<{ data: Deposit[] }>(API_ENDPOINTS.deposits.list(customerId)),
};
