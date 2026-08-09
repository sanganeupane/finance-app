import { BarChart3 } from 'lucide-react';

import { PlaceholderPage } from '@/components/placeholder/PlaceholderPage';
import { NAV_LABELS } from '@/constants';

export default function AnalyticsPage() {
    return (
        <PlaceholderPage
            eyebrow="Employee Portal"
            title={NAV_LABELS.employee.analytics}
            description="Business analytics: revenue, cross-sell, churn and product usage."
            icon={<BarChart3 className="h-10 w-10" aria-hidden />}
        />
    );
}
