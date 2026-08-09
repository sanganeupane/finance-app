import { Compass } from 'lucide-react';

import { PlaceholderPage } from '@/components/placeholder/PlaceholderPage';
import { NAV_LABELS } from '@/constants';

export default function Financial360Page() {
    return (
        <PlaceholderPage
            eyebrow="Customer App"
            title={NAV_LABELS.customer.financial360}
            description="Unified view of the customer's entire financial relationship."
            icon={<Compass className="h-10 w-10" aria-hidden />}
        />
    );
}
