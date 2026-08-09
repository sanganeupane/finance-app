import { Bell } from 'lucide-react';

import { PlaceholderPage } from '@/components/placeholder/PlaceholderPage';
import { NAV_LABELS } from '@/constants';

export default function NotificationsPage() {
    return (
        <PlaceholderPage
            eyebrow="Customer App"
            title={NAV_LABELS.customer.notifications}
            description="Transaction alerts, security notifications and offers."
            icon={<Bell className="h-10 w-10" aria-hidden />}
        />
    );
}
