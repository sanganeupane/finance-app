import {
    mockAccounts,
    mockAiInsights,
    mockAtm,
    mockCards,
    mockDashboard,
    mockECommerce,
    mockFinancialHealthOverview,
    mockInvestments,
    mockLoans,
    mockMarket,
    mockNotifications,
    mockPayments,
    mockSpending,
    mockTransactions,
    mockUsers,
} from '@/mock';

export interface MockRequest {
    path: string;
    query?: Record<string, unknown>;
    body?: unknown;
    headers?: Record<string, string>;
}

export interface MockRoute {
    pattern: RegExp;
    resolve: (match: RegExpExecArray, request: MockRequest) => unknown;
}

const customerId = 'c-1001';
const accountId = 'acc-1001';

/**
 * Envelope matching Laravel's `{success, message, data, meta}` contract.
 * Mock mode returns the same shape as the real API so the UI cannot tell
 * the two apart (which is the point of the mock/real switch).
 */
function ok<T>(data: T, meta?: Record<string, unknown>): ApiResponse<T> {
    return { success: true, message: 'OK', data, meta };
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
    meta?: Record<string, unknown>;
}

export const mockRoutes: MockRoute[] = [
    {
        pattern: /^\/api\/v1\/dashboard$/,
        resolve: () => ok(mockDashboard),
    },
    {
        pattern: /^\/api\/v1\/accounts$/,
        resolve: () => ok(mockAccounts),
    },
    {
        pattern: /^\/api\/v1\/accounts\/[^/]+$/,
        resolve: (match) => {
            const id = match[1];
            const account = mockAccounts.find((item) => item.id === id) ?? mockAccounts[0];
            return ok(account);
        },
    },
    {
        pattern: /^\/api\/v1\/accounts\/[^/]+\/transactions$/,
        resolve: (match) => {
            const id = match[1];
            return ok(mockTransactions.filter((item) => item.accountId === id));
        },
    },
    {
        pattern: /^\/api\/v1\/transactions$/,
        resolve: () => ok(mockTransactions),
    },
    {
        pattern: /^\/api\/v1\/cards$/,
        resolve: () => ok(mockCards),
    },
    {
        pattern: /^\/api\/v1\/loans$/,
        resolve: () => ok(mockLoans),
    },
    {
        pattern: /^\/api\/v1\/investments$/,
        resolve: () => ok(mockInvestments),
    },
    {
        pattern: /^\/api\/v1\/spending$/,
        resolve: () => ok(mockSpending),
    },
    {
        pattern: /^\/api\/v1\/spending\/e-commerce$/,
        resolve: () => ok(mockECommerce),
    },
    {
        pattern: /^\/api\/v1\/spending\/atm$/,
        resolve: () => ok(mockAtm),
    },
    {
        pattern: /^\/api\/v1\/financial-health$/,
        resolve: () => ok(mockFinancialHealthOverview),
    },
    {
        pattern: /^\/api\/v1\/insights$/,
        resolve: () => ok(mockAiInsights),
    },
    {
        pattern: /^\/api\/v1\/market$/,
        resolve: () => ok(mockMarket),
    },
    {
        pattern: /^\/api\/v1\/market\/overview$/,
        resolve: () => ok(mockMarket.overview),
    },
    {
        pattern: /^\/api\/v1\/market\/trending$/,
        resolve: () => ok(mockMarket.trending),
    },
    {
        pattern: /^\/api\/v1\/market\/gainers$/,
        resolve: () => ok(mockMarket.gainers),
    },
    {
        pattern: /^\/api\/v1\/market\/losers$/,
        resolve: () => ok(mockMarket.losers),
    },
    {
        pattern: /^\/api\/v1\/market\/most-traded$/,
        resolve: () => ok(mockMarket.mostTraded),
    },
    {
        pattern: /^\/api\/v1\/market\/opportunities$/,
        resolve: () => ok(mockMarket.opportunities),
    },
    {
        pattern: /^\/api\/v1\/payments$/,
        resolve: () => ok(mockPayments),
    },
    {
        pattern: /^\/api\/v1\/payments\/bills$/,
        resolve: () => ok(mockPayments.bills),
    },
    {
        pattern: /^\/api\/v1\/payments\/send$/,
        resolve: (_match, request) => {
            const body = (request.body ?? {}) as { amount?: number; note?: string; recipientName?: string };
            return ok({
                id: `pay-${Date.now()}`,
                type: 'transfer',
                title: body.recipientName ? `Transfer to ${body.recipientName}` : 'Transfer sent',
                subtitle: body.note ?? 'Same bank transfer',
                amount: body.amount ?? 0,
                currency: 'NPR',
                status: 'completed',
                reference: `PMT-${Math.floor(100000 + Math.random() * 900000)}`,
                createdAt: new Date().toISOString(),
            });
        },
    },
    {
        pattern: /^\/api\/v1\/payments\/pay-bill$/,
        resolve: (_match, request) => {
            const body = (request.body ?? {}) as { amount?: number };
            return ok({
                id: `pay-${Date.now()}`,
                type: 'bill',
                title: 'Bill payment',
                subtitle: 'Utility bill',
                amount: body.amount ?? 0,
                currency: 'NPR',
                status: 'completed',
                reference: `PMT-${Math.floor(100000 + Math.random() * 900000)}`,
                createdAt: new Date().toISOString(),
            });
        },
    },
    {
        pattern: /^\/api\/v1\/notifications$/,
        resolve: () => ok(mockNotifications),
    },
    {
        pattern: /^\/api\/v1\/user$/,
        resolve: () => ok(mockUsers),
    },
    {
        pattern: /^\/api\/v1\/customer$/,
        resolve: () => ok(mockUsers),
    },
    {
        // fallback for unknown GETs — return a neutral 404-ish envelope
        pattern: /^\/api\/v1\//,
        resolve: () => ({
            success: false,
            message: 'Mock route not implemented.',
            data: null,
        }),
    },
];

export function findMockRoute(path: string): MockRoute | undefined {
    return mockRoutes.find((route) => route.pattern.test(path));
}

/** Convenience helpers for services building filter queries. */
export const mockContext = {
    customerId,
    accountId,
};
