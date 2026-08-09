import type { ReactNode } from 'react';
import { CircleAlert, Info, TriangleAlert, CheckCircle2, X } from 'lucide-react';

import { cn } from '@/utils/cn';
import { IconButton } from './IconButton';

export type AlertVariant = 'info' | 'success' | 'warning' | 'danger';

export interface AlertProps {
    variant?: AlertVariant;
    title: string;
    description?: ReactNode;
    action?: ReactNode;
    onDismiss?: () => void;
    className?: string;
}

const variantConfig: Record<AlertVariant, { icon: ReactNode; container: string; iconColor: string }> = {
    info: {
        icon: <Info className="h-5 w-5" />,
        container: 'border-info/20 bg-info/5',
        iconColor: 'text-info',
    },
    success: {
        icon: <CheckCircle2 className="h-5 w-5" />,
        container: 'border-success/20 bg-success/5',
        iconColor: 'text-success',
    },
    warning: {
        icon: <TriangleAlert className="h-5 w-5" />,
        container: 'border-warning/25 bg-warning/10',
        iconColor: 'text-warning',
    },
    danger: {
        icon: <CircleAlert className="h-5 w-5" />,
        container: 'border-danger/20 bg-danger/5',
        iconColor: 'text-danger',
    },
};

export function Alert({ variant = 'info', title, description, action, onDismiss, className }: AlertProps) {
    const config = variantConfig[variant];

    return (
        <div
            role={variant === 'danger' ? 'alert' : 'status'}
            className={cn('flex items-start gap-3 rounded-lg border p-4', config.container, className)}
        >
            <span className={cn('mt-0.5 shrink-0', config.iconColor)} aria-hidden>
                {config.icon}
            </span>
            <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-ink">{title}</p>
                {description ? <div className="mt-0.5 text-sm text-muted">{description}</div> : null}
                {action ? <div className="mt-3">{action}</div> : null}
            </div>
            {onDismiss ? (
                <IconButton label="Dismiss" variant="ghost" size="md" icon={<X className="h-4 w-4" />} onClick={onDismiss} className="h-8 w-8" />
            ) : null}
        </div>
    );
}
