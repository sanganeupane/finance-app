import { BrainCircuit } from 'lucide-react';

import { PlaceholderPage } from '@/components/placeholder/PlaceholderPage';
import { NAV_LABELS } from '@/constants';

export default function AiModelsPage() {
    return (
        <PlaceholderPage
            eyebrow="Employee Portal"
            title={NAV_LABELS.employee.aiModels}
            description="Governance and monitoring for deployed AI models."
            icon={<BrainCircuit className="h-10 w-10" aria-hidden />}
        />
    );
}
