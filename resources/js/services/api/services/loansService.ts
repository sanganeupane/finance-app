import { apiClient } from '../client';
import { API_ENDPOINTS } from '../endpoints';
import type { Loan } from '@/types/loan';

export const loansService = {
    list: (customerId: string) => apiClient.get<{ data: Loan[] }>(API_ENDPOINTS.loans.list(customerId)),
};
