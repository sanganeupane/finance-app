export type ClassValue = string | number | bigint | null | undefined | false | 0;

/**
 * Joins class values, dropping falsy entries.
 * Lightweight alternative to `clsx` / `classnames`.
 */
export function cn(...values: ClassValue[]): string {
    return values.filter(Boolean).join(' ');
}
