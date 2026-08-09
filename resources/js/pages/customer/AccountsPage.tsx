import { Landmark } from 'lucide-react';

import { PlaceholderPage } from '@/components/placeholder/PlaceholderPage';
import { NAV_LABELS } from '@/constants';

export default function AccountsPage() {
    return (
        <PlaceholderPage
            eyebrow="Customer App"
            title={NAV_LABELS.customer.accounts}
            description="Savings, current and fixed deposit accounts with live balances."
            icon={<Landmark className="h-10 w-10" aria-hidden />}
        />
    );
}
