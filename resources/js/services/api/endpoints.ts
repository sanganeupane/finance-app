/**
 * Centralized endpoint map — the agreed frontend/backend contract.
 * All paths are relative to the API base URL and use the `/api/v1` prefix
 * (see `services/api/config.ts`). Paths must be finalized with the backend
 * team before production — do not hardcode URLs elsewhere.
 */
export const API_ENDPOINTS = {
    auth: {
        user: '/api/v1/user',
        login: '/api/v1/auth/login',
        logout: '/api/v1/auth/logout',
    },
    customer: {
        list: '/api/v1/customer',
        detail: (id: string) => `/api/v1/customer/${id}`,
        summary: (id: string) => `/api/v1/customer/${id}/summary`,
    },
    dashboard: {
        get: '/api/v1/dashboard',
    },
    accounts: {
        list: '/api/v1/accounts',
        detail: (accountId: string) => `/api/v1/accounts/${accountId}`,
    },
    transactions: {
        list: (accountId?: string) =>
            accountId ? `/api/v1/accounts/${accountId}/transactions` : '/api/v1/transactions',
        detail: (transactionId: string) => `/api/v1/transactions/${transactionId}`,
    },
    cards: {
        list: '/api/v1/cards',
        detail: (cardId: string) => `/api/v1/cards/${cardId}`,
        transactions: (cardId: string) => `/api/v1/cards/${cardId}/transactions`,
    },
    loans: {
        list: '/api/v1/loans',
        detail: (loanId: string) => `/api/v1/loans/${loanId}`,
    },
    deposits: {
        list: '/api/v1/deposits',
        detail: (depositId: string) => `/api/v1/deposits/${depositId}`,
    },
    investments: {
        list: '/api/v1/investments',
        detail: (investmentId: string) => `/api/v1/investments/${investmentId}`,
    },
    spending: {
        get: '/api/v1/spending',
        eCommerce: '/api/v1/spending/e-commerce',
        atm: '/api/v1/spending/atm',
    },
    financialHealth: {
        get: '/api/v1/financial-health',
    },
    insights: {
        list: '/api/v1/insights',
    },
    recommendations: {
        list: '/api/v1/recommendations',
    },
    market: {
        overview: '/api/v1/market/overview',
        trending: '/api/v1/market/trending',
        gainers: '/api/v1/market/gainers',
        losers: '/api/v1/market/losers',
        mostTraded: '/api/v1/market/most-traded',
        opportunities: '/api/v1/market/opportunities',
    },
    payments: {
        list: '/api/v1/payments',
        bills: '/api/v1/payments/bills',
        send: '/api/v1/payments/send',
        payBill: '/api/v1/payments/pay-bill',
    },
    notifications: {
        list: '/api/v1/notifications',
        markRead: (id: string) => `/api/v1/notifications/${id}/read`,
        markAllRead: '/api/v1/notifications/read-all',
    },
    copilot: {
        conversation: '/api/v1/copilot/conversations',
    },
} as const;
