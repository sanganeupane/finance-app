import { UserRound } from 'lucide-react';

import { PlaceholderPage } from '@/components/placeholder/PlaceholderPage';
import { NAV_LABELS } from '@/constants';

export default function ProfilePage() {
    return (
        <PlaceholderPage
            eyebrow="Customer App"
            title={NAV_LABELS.customer.profile}
            description="Personal details, preferences and security settings."
            icon={<UserRound className="h-10 w-10" aria-hidden />}
        />
    );
}
