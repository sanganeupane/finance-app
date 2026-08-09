import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { CheckCircle2, Info, TriangleAlert, X, XCircle } from 'lucide-react';

import { cn } from '@/utils/cn';
import { IconButton } from '../IconButton';
import { ToastContext, type Toast, type ToastOptions, type ToastVariant } from './ToastContext';

const variantConfig: Record<ToastVariant, { icon: ReactNode; className: string }> = {
    success: { icon: <CheckCircle2 className="h-5 w-5 text-success" />, className: '' },
    error: { icon: <XCircle className="h-5 w-5 text-danger" />, className: '' },
    info: { icon: <Info className="h-5 w-5 text-info" />, className: '' },
    warning: { icon: <TriangleAlert className="h-5 w-5 text-warning" />, className: '' },
};

const DEFAULT_DURATION = 4000;

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);
    const timers = useRef(new Map<string, ReturnType<typeof setTimeout>>());

    const dismiss = useCallback((id: string) => {
        const timer = timers.current.get(id);
        if (timer) clearTimeout(timer);
        timers.current.delete(id);
        setToasts((current) => current.filter((toast) => toast.id !== id));
    }, []);

    const show = useCallback(
        (options: ToastOptions) => {
            const id = `toast-${crypto.randomUUID()}`;
            const toast: Toast = {
                id,
                title: options.title,
                description: options.description,
                variant: options.variant ?? 'info',
            };
            setToasts((current) => [...current, toast]);
            timers.current.set(
                id,
                setTimeout(() => dismiss(id), options.duration ?? DEFAULT_DURATION),
            );
            return id;
        },
        [dismiss],
    );

    useEffect(() => {
        const timerMap = timers.current;
        return () => {
            timerMap.forEach((timer) => clearTimeout(timer));
            timerMap.clear();
        };
    }, []);

    const value = useMemo(() => ({ toasts, show, dismiss }), [toasts, show, dismiss]);

    return (
        <ToastContext.Provider value={value}>
            {children}
            <div
                aria-live="polite"
                aria-label="Notifications"
                className="pointer-events-none fixed inset-x-0 top-0 z-[60] flex flex-col items-center gap-2 px-4 pt-4 sm:items-end sm:px-6 sm:pt-6"
            >
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        role="status"
                        className={cn(
                            'pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-lg border border-line bg-surface p-4 shadow-md',
                            variantConfig[toast.variant].className,
                        )}
                    >
                        <span className="mt-0.5 shrink-0">{variantConfig[toast.variant].icon}</span>
                        <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold text-ink">{toast.title}</p>
                            {toast.description ? <p className="mt-0.5 text-sm text-muted">{toast.description}</p> : null}
                        </div>
                        <IconButton
                            label="Dismiss notification"
                            variant="ghost"
                            size="md"
                            icon={<X className="h-4 w-4" />}
                            onClick={() => dismiss(toast.id)}
                            className="h-8 w-8"
                        />
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}
