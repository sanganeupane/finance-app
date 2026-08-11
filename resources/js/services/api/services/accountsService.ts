import { apiClient, unwrap } from '../client';
import { API_ENDPOINTS } from '../endpoints';
import type { Account } from '@/types/account';

export const accountsService = {
    list: async () => unwrap(apiClient.get<{ data: Account[] }>(API_ENDPOINTS.accounts.list)),

    detail: async (accountId: string) =>
        unwrap(apiClient.get<{ data: Account }>(API_ENDPOINTS.accounts.detail(accountId))),
};
