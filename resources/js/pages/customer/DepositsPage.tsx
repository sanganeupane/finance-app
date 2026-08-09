import { PiggyBank } from 'lucide-react';

import { PlaceholderPage } from '@/components/placeholder/PlaceholderPage';
import { NAV_LABELS } from '@/constants';

export default function DepositsPage() {
    return (
        <PlaceholderPage
            eyebrow="Customer App"
            title={NAV_LABELS.customer.deposits}
            description="Fixed and recurring deposits with maturity tracking."
            icon={<PiggyBank className="h-10 w-10" aria-hidden />}
        />
    );
}
