import { HeartPulse } from 'lucide-react';

import { PlaceholderPage } from '@/components/placeholder/PlaceholderPage';
import { NAV_LABELS } from '@/constants';

export default function FinancialHealthPage() {
    return (
        <PlaceholderPage
            eyebrow="Customer App"
            title={NAV_LABELS.customer.financialHealth}
            description="A single score summarising savings, spending and debt health."
            icon={<HeartPulse className="h-10 w-10" aria-hidden />}
        />
    );
}
