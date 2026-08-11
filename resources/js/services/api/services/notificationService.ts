import { apiClient, unwrap } from '../client';
import { API_ENDPOINTS } from '../endpoints';
import type { Notification } from '@/types/notification';

export const notificationService = {
    list: async () => unwrap(apiClient.get<{ data: Notification[] }>(API_ENDPOINTS.notifications.list)),

    markRead: async (id: string) =>
        unwrap(apiClient.patch<{ data: Notification }>(API_ENDPOINTS.notifications.markRead(id))),

    markAllRead: async () =>
        unwrap(apiClient.patch<{ data: Notification[] }>(API_ENDPOINTS.notifications.markAllRead)),
};
