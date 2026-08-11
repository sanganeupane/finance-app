import { apiClient, unwrap } from '../client';
import { API_ENDPOINTS } from '../endpoints';
import type { Investment } from '@/types/investment';

export const investmentsService = {
    list: async () => unwrap(apiClient.get<{ data: Investment[] }>(API_ENDPOINTS.investments.list)),

    detail: async (investmentId: string) =>
        unwrap(apiClient.get<{ data: Investment }>(API_ENDPOINTS.investments.detail(investmentId))),
};
