import { apiClient, unwrap } from '../client';
import { API_ENDPOINTS } from '../endpoints';
import type { DashboardData } from '@/types/dashboard';

export const dashboardService = {
    get: async () => unwrap(apiClient.get<{ data: DashboardData }>(API_ENDPOINTS.dashboard.get)),
};
