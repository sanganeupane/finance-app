import { CreditCard } from 'lucide-react';

import { PlaceholderPage } from '@/components/placeholder/PlaceholderPage';
import { NAV_LABELS } from '@/constants';

export default function CardsPage() {
    return (
        <PlaceholderPage
            eyebrow="Customer App"
            title={NAV_LABELS.customer.cards}
            description="Manage debit and credit cards: limits, blocks and spending controls."
            icon={<CreditCard className="h-10 w-10" aria-hidden />}
        />
    );
}
