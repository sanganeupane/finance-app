import { ScrollText } from 'lucide-react';

import { PlaceholderPage } from '@/components/placeholder/PlaceholderPage';
import { NAV_LABELS } from '@/constants';

export default function AuditLogsPage() {
    return (
        <PlaceholderPage
            eyebrow="Employee Portal"
            title={NAV_LABELS.employee.auditLogs}
            description="Immutable trail of employee and system actions for compliance."
            icon={<ScrollText className="h-10 w-10" aria-hidden />}
        />
    );
}
