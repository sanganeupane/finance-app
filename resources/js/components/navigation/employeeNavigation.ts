import {
    BarChart3,
    BrainCircuit,
    LayoutDashboard,
    Megaphone,
    ScrollText,
    Settings,
    Shapes,
    Sparkles,
    Target,
    Users,
    UserRound,
    type LucideIcon,
} from 'lucide-react';

export interface EmployeeNavItem {
    label: string;
    path: string;
    icon: LucideIcon;
}

/** Sidebar navigation for the desktop employee intelligence portal. */
export const EMPLOYEE_NAV_ITEMS: EmployeeNavItem[] = [
    { label: 'Dashboard', path: '/employee/dashboard', icon: LayoutDashboard },
    { label: 'Customers', path: '/employee/customers', icon: Users },
    { label: 'Customer 360', path: '/employee/customer-360/c-1001', icon: UserRound },
    { label: 'Segments', path: '/employee/segments', icon: Shapes },
    { label: 'AI Insights', path: '/employee/ai-insights', icon: Sparkles },
    { label: 'Next Best Action', path: '/employee/next-best-action', icon: Target },
    { label: 'Campaigns', path: '/employee/campaigns', icon: Megaphone },
    { label: 'Analytics', path: '/employee/analytics', icon: BarChart3 },
    { label: 'AI Models', path: '/employee/ai-models', icon: BrainCircuit },
    { label: 'Audit Logs', path: '/employee/audit-logs', icon: ScrollText },
    { label: 'Settings', path: '/employee/settings', icon: Settings },
];
