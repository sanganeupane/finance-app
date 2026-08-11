import { apiClient, unwrap } from '../client';
import { API_ENDPOINTS } from '../endpoints';
import type { MarketItem, MarketOverview } from '@/types/market';

export const marketService = {
    overview: async () =>
        unwrap(apiClient.get<{ data: MarketOverview }>(API_ENDPOINTS.market.overview)),

    trending: async () =>
        unwrap(apiClient.get<{ data: MarketItem[] }>(API_ENDPOINTS.market.trending)),

    gainers: async () =>
        unwrap(apiClient.get<{ data: MarketItem[] }>(API_ENDPOINTS.market.gainers)),

    losers: async () =>
        unwrap(apiClient.get<{ data: MarketItem[] }>(API_ENDPOINTS.market.losers)),

    mostTraded: async () =>
        unwrap(apiClient.get<{ data: MarketItem[] }>(API_ENDPOINTS.market.mostTraded)),

    opportunities: async () =>
        unwrap(apiClient.get<{ data: MarketItem[] }>(API_ENDPOINTS.market.opportunities)),
};
