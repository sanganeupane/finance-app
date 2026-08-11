import {
    Landmark,
    PiggyBank,
    QrCode,
    Send,
    type LucideIcon,
} from 'lucide-react';

/** Maps data-contract icon keys to lucide components. */
export const ICON_MAP: Record<string, LucideIcon> = {
    Send,
    QrCode,
    PiggyBank,
    Landmark,
    Wallet: Landmark,
};

export function resolveIcon(key?: string): LucideIcon {
    if (!key) return Landmark;
    return ICON_MAP[key] ?? Landmark;
}
