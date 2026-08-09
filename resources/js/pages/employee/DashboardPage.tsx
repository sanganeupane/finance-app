import { LayoutDashboard } from 'lucide-react';

import { PlaceholderPage } from '@/components/placeholder/PlaceholderPage';
import { NAV_LABELS } from '@/constants';

export default function DashboardPage() {
    return (
        <PlaceholderPage
            eyebrow="Employee Portal"
            title={NAV_LABELS.employee.dashboard}
            description="Portfolio KPIs: customers, balances, health and AI signals."
            icon={<LayoutDashboard className="h-10 w-10" aria-hidden />}
        />
    );
}
