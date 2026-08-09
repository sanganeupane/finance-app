import { ArrowLeftRight } from 'lucide-react';

import { PlaceholderPage } from '@/components/placeholder/PlaceholderPage';
import { NAV_LABELS } from '@/constants';

export default function TransactionsPage() {
    return (
        <PlaceholderPage
            eyebrow="Customer App"
            title={NAV_LABELS.customer.transactions}
            description="Searchable history of all debits and credits across accounts."
            icon={<ArrowLeftRight className="h-10 w-10" aria-hidden />}
        />
    );
}
