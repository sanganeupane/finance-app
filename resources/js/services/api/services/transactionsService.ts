import { apiClient, unwrap } from '../client';
import { API_ENDPOINTS } from '../endpoints';
import type { Transaction } from '@/types/transaction';

export const transactionsService = {
    list: async (accountId?: string, query?: { page?: number; category?: string }) =>
        unwrap(
            apiClient.get<{ data: Transaction[] }>(API_ENDPOINTS.transactions.list(accountId), query),
        ),

    detail: async (transactionId: string) =>
        unwrap(apiClient.get<{ data: Transaction }>(API_ENDPOINTS.transactions.detail(transactionId))),
};
