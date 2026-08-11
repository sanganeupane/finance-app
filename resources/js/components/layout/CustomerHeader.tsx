import { Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

import { APP_NAME } from '@/constants';
import { Avatar } from '@/components/ui';
import { useAsync } from '@/hooks/useAsync';
import { notificationService, userService } from '@/services/api';

export function CustomerHeader() {
    const notifications = useAsync(() => notificationService.list(), []);
    const user = useAsync(() => userService.current(), []);

    const unreadCount = (notifications.data ?? []).filter((item) => !item.isRead).length;

    return (
        <header className="sticky top-0 z-40 border-b border-line bg-surface/90 backdrop-blur">
            <div className="mx-auto flex h-14 max-w-[480px] items-center justify-between px-4">
                <Link to="/customer/home" className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-sm font-bold text-white">
                        S
                    </span>
                    <span className="text-sm font-semibold text-ink">{APP_NAME}</span>
                </Link>
                <div className="flex items-center gap-1">
                    <Link
                        to="/customer/notifications"
                        aria-label="Notifications"
                        className="relative inline-flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-canvas"
                    >
                        <Bell className="h-5 w-5" aria-hidden />
                        {unreadCount > 0 ? (
                            <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[10px] font-semibold text-white">
                                {unreadCount > 9 ? '9+' : unreadCount}
                            </span>
                        ) : null}
                    </Link>
                    <Link to="/customer/profile" aria-label="Profile" className="rounded-full p-1 hover:bg-canvas">
                        <Avatar name={user.data?.name ?? 'Customer'} size="sm" />
                    </Link>
                </div>
            </div>
        </header>
    );
}
