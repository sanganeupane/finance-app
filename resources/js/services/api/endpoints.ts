/**
 * Centralized endpoint map.
 * Paths below are the proposed API contract for the Customer 360 platform.
 * They follow the existing Laravel `/api` prefix and must be finalized with
 * the backend team before production use — do not hardcode URLs elsewhere.
 */
export const API_ENDPOINTS = {
    auth: {
        user: '/api/user',
        logout: '/logout',
    },
    customer: {
        list: '/api/customer',
        detail: (id: string) => `/api/customer/${id}`,
        summary: (id: string) => `/api/customer/${id}/summary`,
    },
    accounts: {
        list: (customerId: string) => `/api/customer/${customerId}/accounts`,
        detail: (accountId: string) => `/api/accounts/${accountId}`,
    },
    transactions: {
        list: (accountId: string) => `/api/accounts/${accountId}/transactions`,
        detail: (transactionId: string) => `/api/transactions/${transactionId}`,
    },
    cards: {
        list: (accountId: string) => `/api/accounts/${accountId}/cards`,
    },
    loans: {
        list: (customerId: string) => `/api/customer/${customerId}/loans`,
    },
    deposits: {
        list: (customerId: string) => `/api/customer/${customerId}/deposits`,
    },
    investments: {
        list: (customerId: string) => `/api/customer/${customerId}/investments`,
    },
    insights: {
        list: (customerId: string) => `/api/customer/${customerId}/insights`,
    },
    recommendations: {
        list: (customerId: string) => `/api/customer/${customerId}/recommendations`,
    },
    copilot: {
        conversation: (customerId: string) => `/api/customer/${customerId}/copilot/conversations`,
    },
} as const;
