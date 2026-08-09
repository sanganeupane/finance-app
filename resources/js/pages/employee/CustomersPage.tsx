import { Users } from 'lucide-react';

import { PlaceholderPage } from '@/components/placeholder/PlaceholderPage';
import { NAV_LABELS } from '@/constants';

export default function CustomersPage() {
    return (
        <PlaceholderPage
            eyebrow="Employee Portal"
            title={NAV_LABELS.employee.customers}
            description="Searchable, filterable list of bank customers with health scores."
            icon={<Users className="h-10 w-10" aria-hidden />}
        />
    );
}
