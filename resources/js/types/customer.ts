export interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatarUrl?: string | null;
    segment: 'Retail' | 'Premium' | 'Private Banking';
    kycStatus: 'verified' | 'pending' | 'expired';
    onboardedAt: string;
    riskTier: 'low' | 'medium' | 'high';
    address?: string;
}

export interface CustomerSummary {
    id: string;
    name: string;
    segment: Customer['segment'];
    totalBalance: number;
    products: number;
    healthScore: number;
}
