import { apiClient, unwrap } from '../client';
import { API_ENDPOINTS } from '../endpoints';
import type { Deposit } from '@/types/deposit';

export const depositsService = {
    list: async () => unwrap(apiClient.get<{ data: Deposit[] }>(API_ENDPOINTS.deposits.list)),

    detail: async (depositId: string) =>
        unwrap(apiClient.get<{ data: Deposit }>(API_ENDPOINTS.deposits.detail(depositId))),
};
