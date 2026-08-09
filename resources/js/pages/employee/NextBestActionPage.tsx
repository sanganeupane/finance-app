import { Target } from 'lucide-react';

import { PlaceholderPage } from '@/components/placeholder/PlaceholderPage';
import { NAV_LABELS } from '@/constants';

export default function NextBestActionPage() {
    return (
        <PlaceholderPage
            eyebrow="Employee Portal"
            title={NAV_LABELS.employee.nextBestAction}
            description="Recommended actions per customer with expected impact and effort."
            icon={<Target className="h-10 w-10" aria-hidden />}
        />
    );
}
