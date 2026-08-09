import { ArrowLeftRight, LayoutGrid, Sparkles, TrendingUp, Home, type LucideIcon } from 'lucide-react';

export interface CustomerNavItem {
    label: string;
    path: string;
    icon: LucideIcon;
}

/**
 * Bottom navigation for the mobile customer app.
 * Order: Home | Payments | Wealth | AI | More
 */
export const CUSTOMER_NAV_ITEMS: CustomerNavItem[] = [
    { label: 'Home', path: '/customer/home', icon: Home },
    { label: 'Payments', path: '/customer/transactions', icon: ArrowLeftRight },
    { label: 'Wealth', path: '/customer/investments', icon: TrendingUp },
    { label: 'AI', path: '/customer/ai-insights', icon: Sparkles },
    { label: 'More', path: '/customer/profile', icon: LayoutGrid },
];
