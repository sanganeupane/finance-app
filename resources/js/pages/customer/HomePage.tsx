import { Home } from 'lucide-react';

import { PlaceholderPage } from '@/components/placeholder/PlaceholderPage';
import { NAV_LABELS } from '@/constants';

export default function HomePage() {
    return (
        <PlaceholderPage
            eyebrow="Customer App"
            title={NAV_LABELS.customer.home}
            description="Overview of balances, quick actions and recent activity."
            icon={<Home className="h-10 w-10" aria-hidden />}
        />
    );
}
