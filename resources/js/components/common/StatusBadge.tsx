import { Badge, type BadgeVariant } from '@/components/ui';

type StatusValue = string;

const STATUS_VARIANT_MAP: Record<string, BadgeVariant> = {
    active: 'success',
    completed: 'success',
    paid: 'success',
    verified: 'success',
    good: 'success',
    bullish: 'success',
    buy: 'success',
    invest: 'success',
    low: 'success',

    pending: 'warning',
    due: 'warning',
    average: 'warning',
    hold: 'warning',
    medium: 'warning',
    neutral: 'neutral',

    blocked: 'danger',
    failed: 'danger',
    expired: 'danger',
    overdue: 'danger',
    critical: 'danger',
    sell: 'danger',
    avoid: 'danger',
    high: 'danger',
    poor: 'danger',
    bearish: 'danger',

    dormant: 'neutral',
    closed: 'neutral',
    matured: 'neutral',
    info: 'info',
    flat: 'info',
};

/**
 * Thin adapter that maps domain status strings to design-system Badge variants.
 * Unmapped values fall back to neutral.
 */
export function StatusBadge({ status, label, className }: { status: StatusValue; label?: string; className?: string }) {
    return (
        <Badge variant={STATUS_VARIANT_MAP[status] ?? 'neutral'} className={className}>
            {label ?? status}
        </Badge>
    );
}
