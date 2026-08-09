import { Wallet } from 'lucide-react';

import { PlaceholderPage } from '@/components/placeholder/PlaceholderPage';
import { NAV_LABELS } from '@/constants';

export default function SpendingPage() {
    return (
        <PlaceholderPage
            eyebrow="Customer App"
            title={NAV_LABELS.customer.spending}
            description="Categorised spending insights and monthly trends."
            icon={<Wallet className="h-10 w-10" aria-hidden />}
        />
    );
}
