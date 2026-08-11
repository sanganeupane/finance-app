import { apiClient, unwrap } from '../client';
import { API_ENDPOINTS } from '../endpoints';
import type { Card } from '@/types/card';
import type { Transaction } from '@/types/transaction';

export const cardsService = {
    list: async () => unwrap(apiClient.get<{ data: Card[] }>(API_ENDPOINTS.cards.list)),

    detail: async (cardId: string) =>
        unwrap(apiClient.get<{ data: Card }>(API_ENDPOINTS.cards.detail(cardId))),

    transactions: async (cardId: string) =>
        unwrap(
            apiClient.get<{ data: Transaction[] }>(API_ENDPOINTS.cards.transactions(cardId)),
        ),
};
