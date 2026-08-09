import { TrendingUp } from 'lucide-react';

import { PlaceholderPage } from '@/components/placeholder/PlaceholderPage';
import { NAV_LABELS } from '@/constants';

export default function InvestmentsPage() {
    return (
        <PlaceholderPage
            eyebrow="Customer App"
            title={NAV_LABELS.customer.investments}
            description="Mutual funds, equities and treasury holdings performance."
            icon={<TrendingUp className="h-10 w-10" aria-hidden />}
        />
    );
}
