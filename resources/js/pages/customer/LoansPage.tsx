import { HandCoins } from 'lucide-react';

import { PlaceholderPage } from '@/components/placeholder/PlaceholderPage';
import { NAV_LABELS } from '@/constants';

export default function LoansPage() {
    return (
        <PlaceholderPage
            eyebrow="Customer App"
            title={NAV_LABELS.customer.loans}
            description="Outstanding loans, EMIs, and repayment schedules."
            icon={<HandCoins className="h-10 w-10" aria-hidden />}
        />
    );
}
