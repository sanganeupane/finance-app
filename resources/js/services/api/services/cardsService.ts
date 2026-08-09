import { apiClient } from '../client';
import { API_ENDPOINTS } from '../endpoints';
import type { Card } from '@/types/card';

export const cardsService = {
    list: (accountId: string) => apiClient.get<{ data: Card[] }>(API_ENDPOINTS.cards.list(accountId)),
};
