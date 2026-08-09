export type NotificationType = 'transaction' | 'alert' | 'promotion' | 'system';

export interface Notification {
    id: string;
    customerId: string;
    type: NotificationType;
    title: string;
    body: string;
    isRead: boolean;
    createdAt: string;
}
