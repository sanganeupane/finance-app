import { useState } from 'react';
import { BellOff, CheckCheck, Mail, ShieldAlert, ShoppingBag, Sparkles } from 'lucide-react';

import { PageState, StatusBadge } from '@/components/common';
import { Button, EmptyState } from '@/components/ui';
import { useToast } from '@/components/ui/toast';
import { useAsync } from '@/hooks/useAsync';
import { notificationService } from '@/services/api';
import { formatRelativeTime } from '@/utils/format';
import { cn } from '@/utils/cn';

const TYPE_ICONS = {
    transaction: Mail,
    alert: ShieldAlert,
    promotion: ShoppingBag,
    system: Sparkles,
} as const;

export default function NotificationsPage() {
    const { show: toast } = useToast();
    const { status, data, error, refetch } = useAsync(() => notificationService.list(), []);
    const [readIds, setReadIds] = useState<Set<string>>(new Set());

    const unreadCount = (data ?? []).filter((item) => !item.isRead && !readIds.has(item.id)).length;

    async function markAllRead() {
        try {
            await notificationService.markAllRead();
            setReadIds(new Set((data ?? []).map((item) => item.id)));
            toast({ title: 'All caught up', variant: 'success' });
        } catch {
            toast({ title: 'Could not update notifications', variant: 'error' });
        }
    }

    async function toggleRead(id: string) {
        setReadIds((current) => {
            const next = new Set(current);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
        try {
            await notificationService.markRead(id);
        } catch {
            // non-fatal: optimistic toggle still applies locally
        }
    }

    return (
        <section className="flex flex-col gap-4">
            <header className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-muted">Notifications</p>
                    <h1 className="text-2xl font-semibold tracking-tight text-ink">Updates</h1>
                    <p className="mt-1 text-sm text-muted">
                        {unreadCount > 0 ? `${unreadCount} unread` : 'You are all caught up'}
                    </p>
                </div>
                {unreadCount > 0 ? (
                    <Button variant="outline" size="sm" onClick={markAllRead} leftIcon={<CheckCheck className="h-4 w-4" />}>
                        Mark all read
                    </Button>
                ) : null}
            </header>

            <PageState status={status} error={error} onRetry={refetch}>
                {data?.length ? (
                    <ul className="flex flex-col gap-2">
                        {data.map((item) => {
                            const Icon = TYPE_ICONS[item.type] ?? Sparkles;
                            const read = item.isRead || readIds.has(item.id);
                            return (
                                <li key={item.id}>
                                    <button
                                        type="button"
                                        onClick={() => toggleRead(item.id)}
                                        className={cn(
                                            'flex w-full items-start gap-3 rounded-lg border bg-surface p-4 text-left transition-colors hover:border-primary/40',
                                            read ? 'border-line' : 'border-primary/30',
                                        )}
                                    >
                                        <span
                                            className={cn(
                                                'flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
                                                read ? 'bg-canvas text-muted' : 'bg-primary-soft text-primary',
                                            )}
                                        >
                                            <Icon className="h-5 w-5" aria-hidden />
                                        </span>
                                        <span className="min-w-0 flex-1">
                                            <span className="flex items-center gap-2">
                                                <span className={cn('text-sm', read ? 'font-medium text-ink' : 'font-semibold text-ink')}>
                                                    {item.title}
                                                </span>
                                                {!read ? <StatusBadge status="info" label="New" /> : null}
                                            </span>
                                            <span className="mt-0.5 block text-sm text-muted">{item.body}</span>
                                            <span className="mt-1 block text-xs text-muted">
                                                {formatRelativeTime(item.createdAt)}
                                            </span>
                                        </span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <EmptyState
                        icon={<BellOff className="h-10 w-10" aria-hidden />}
                        title="No notifications"
                        description="Alerts and updates will appear here."
                    />
                )}
            </PageState>
        </section>
    );
}
