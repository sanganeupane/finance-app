export const APP_NAME = 'Sagarmatha Bank';
export const APP_TAGLINE = 'Customer 360 Banking Intelligence';

/** API base URL. Falls back to the same origin (Vite dev proxy / Laravel). */
export const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL ?? '';

/** Session / storage keys. Sensitive values must NEVER be stored in localStorage. */
export const STORAGE_KEYS = {
    session: 'sagarmatha.session', // opaque, non-sensitive session flag only
} as const;

export const BREAKPOINTS = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
} as const;

/** Compact viewport list used for responsive QA. */
export const DEVICE_WIDTHS = [360, 375, 390, 412, 430, 768, 1024, 1280, 1440, 1600] as const;

export const NAV_LABELS = {
    customer: {
        home: 'Home',
        financial360: 'Financial 360',
        accounts: 'Accounts',
        transactions: 'Transactions',
        cards: 'Cards',
        loans: 'Loans',
        deposits: 'Deposits',
        investments: 'Investments',
        spending: 'Spending',
        financialHealth: 'Financial Health',
        aiInsights: 'AI Insights',
        recommendations: 'Recommendations',
        copilot: 'Copilot',
        notifications: 'Notifications',
        profile: 'Profile',
    },
    employee: {
        dashboard: 'Dashboard',
        customers: 'Customers',
        customer360: 'Customer 360',
        segments: 'Segments',
        aiInsights: 'AI Insights',
        nextBestAction: 'Next Best Action',
        campaigns: 'Campaigns',
        analytics: 'Analytics',
        aiModels: 'AI Models',
        auditLogs: 'Audit Logs',
        settings: 'Settings',
    },
} as const;
