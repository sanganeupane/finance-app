import { apiClient, unwrap } from '../client';
import { API_ENDPOINTS } from '../endpoints';
import type { Customer, CustomerSummary } from '@/types/customer';

export const customerService = {
    list: async (query?: { page?: number; search?: string }) =>
        unwrap(apiClient.get<{ data: Customer[] }>(API_ENDPOINTS.customer.list, query)),

    detail: async (id: string) => unwrap(apiClient.get<{ data: Customer }>(API_ENDPOINTS.customer.detail(id))),

    summary: async (id: string) =>
        unwrap(apiClient.get<{ data: CustomerSummary }>(API_ENDPOINTS.customer.summary(id))),
};
