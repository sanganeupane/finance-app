import { apiClient, unwrap } from '../client';
import { API_ENDPOINTS } from '../endpoints';

export interface UserProfile {
    id: string;
    customerId: string;
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dob: string;
    citizenshipNumber: string;
    address: string;
    branch: string;
    memberSince: string;
    kycStatus: string;
    preferences: {
        currency: 'NPR' | 'USD';
        language: string;
        marketingEmails: boolean;
        smsAlerts: boolean;
    };
}

export const userService = {
    current: async () => unwrap(apiClient.get<{ data: UserProfile }>(API_ENDPOINTS.auth.user)),
};
