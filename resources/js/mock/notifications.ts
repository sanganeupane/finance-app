import type { Notification } from '@/types/notification';

export const mockNotifications: Notification[] = [
    {
        id: 'ntf-1001',
        customerId: 'c-1001',
        type: 'transaction',
        title: 'Payment completed',
        body: 'NPR 4,820.00 debited at Bhatbhateni Supermarket.',
        isRead: false,
        createdAt: '2026-07-11T14:22:00',
    },
    {
        id: 'ntf-1002',
        customerId: 'c-1001',
        type: 'alert',
        title: 'New login detected',
        body: 'A new device signed in from Kathmandu. If this was not you, block access.',
        isRead: false,
        createdAt: '2026-07-11T08:10:00',
    },
    {
        id: 'ntf-1003',
        customerId: 'c-1001',
        type: 'system',
        title: 'Fixed deposit maturing',
        body: 'Your FD-2025-00127 of NPR 1,000,000 matures on 15 Sep 2026.',
        isRead: true,
        createdAt: '2026-07-09T10:00:00',
    },
];
