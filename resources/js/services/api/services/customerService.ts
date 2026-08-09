import { apiClient } from '../client';
import { API_ENDPOINTS } from '../endpoints';
import type { Customer, CustomerSummary } from '@/types/customer';

export const customerService = {
    list: (query?: { page?: number; search?: string }) =>
        apiClient.get<{ data: Customer[] }>(API_ENDPOINTS.customer.list, query),

    detail: (id: string) => apiClient.get<Customer>(API_ENDPOINTS.customer.detail(id)),

    summary: (id: string) => apiClient.get<CustomerSummary>(API_ENDPOINTS.customer.summary(id)),
};
