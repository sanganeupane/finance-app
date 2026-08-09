import { apiClient } from '../client';
import { API_ENDPOINTS } from '../endpoints';
import type { Paginated } from '@/types/api';
import type { Transaction } from '@/types/transaction';

export const transactionsService = {
    list: (accountId: string, query?: { page?: number; category?: string }) =>
        apiClient.get<Paginated<Transaction>>(API_ENDPOINTS.transactions.list(accountId), query),

    detail: (transactionId: string) =>
        apiClient.get<Transaction>(API_ENDPOINTS.transactions.detail(transactionId)),
};
