/**
 * Formatting utilities shared across the application.
 * All money is displayed in NPR (Nepalese Rupee).
 */

const nprFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'NPR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

const numberFormatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2,
});

const compactFormatter = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
});

/** `12345` -> `NPR 12,345.00` */
export function formatCurrency(amount: number): string {
    return nprFormatter.format(amount);
}

/** `12345` -> `12,345` */
export function formatNumber(value: number): string {
    return numberFormatter.format(value);
}

/** `1_250_000` -> `NPR 1.3M` (compact for dashboards) */
export function formatCurrencyCompact(amount: number): string {
    return `NPR ${compactFormatter.format(amount)}`;
}

/** `12.5` -> `12.5%` */
export function formatPercent(value: number, digits = 1): string {
    return `${value.toFixed(digits)}%`;
}

/** Signed currency, e.g. `-500` -> `-NPR 500.00` (for transaction flows) */
export function formatSignedCurrency(amount: number): string {
    const value = nprFormatter.format(Math.abs(amount));
    return amount < 0 ? `-${value}` : `+${value}`;
}

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
});

const dateTimeFormatter = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
});

const timeFormatter = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
});

export function formatDate(date: string | Date): string {
    return dateFormatter.format(new Date(date));
}

export function formatDateTime(date: string | Date): string {
    return dateTimeFormatter.format(new Date(date));
}

export function formatTime(date: string | Date): string {
    return timeFormatter.format(new Date(date));
}

/** Relative time, e.g. `2h ago` */
export function formatRelativeTime(date: string | Date): string {
    const input = new Date(date).getTime();
    const diffMs = Date.now() - input;
    const minutes = Math.round(diffMs / 60_000);
    const hours = Math.round(minutes / 60);
    const days = Math.round(hours / 24);

    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return formatDate(date);
}
