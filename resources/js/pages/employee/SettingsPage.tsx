import { Settings } from 'lucide-react';

import { PlaceholderPage } from '@/components/placeholder/PlaceholderPage';
import { NAV_LABELS } from '@/constants';

export default function SettingsPage() {
    return (
        <PlaceholderPage
            eyebrow="Employee Portal"
            title={NAV_LABELS.employee.settings}
            description="Portal configuration: users, roles, permissions and preferences."
            icon={<Settings className="h-10 w-10" aria-hidden />}
        />
    );
}
