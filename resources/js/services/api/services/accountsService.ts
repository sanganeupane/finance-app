import { apiClient } from '../client';
import { API_ENDPOINTS } from '../endpoints';
import type { Account } from '@/types/account';

export const accountsService = {
    list: (customerId: string) =>
        apiClient.get<{ data: Account[] }>(API_ENDPOINTS.accounts.list(customerId)),

    detail: (accountId: string) => apiClient.get<Account>(API_ENDPOINTS.accounts.detail(accountId)),
};
