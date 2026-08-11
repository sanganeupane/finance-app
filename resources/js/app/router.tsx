import { lazy, Suspense, type ReactNode } from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';

import { CustomerLayout } from '@/layouts/CustomerLayout/CustomerLayout';
import { EmployeeLayout } from '@/layouts/EmployeeLayout/EmployeeLayout';
import { PageLoader } from '@/components/common/PageLoader';

/** Lazy-loaded pages (code-splitting per route). */
const HomePage = lazy(() => import('@/pages/customer/HomePage'));
const Financial360Page = lazy(() => import('@/pages/customer/Financial360Page'));
const AccountsPage = lazy(() => import('@/pages/customer/AccountsPage'));
const AccountDetailPage = lazy(() => import('@/pages/customer/AccountDetailPage'));
const TransactionsPage = lazy(() => import('@/pages/customer/TransactionsPage'));
const CardsPage = lazy(() => import('@/pages/customer/CardsPage'));
const CardDetailPage = lazy(() => import('@/pages/customer/CardDetailPage'));
const LoansPage = lazy(() => import('@/pages/customer/LoansPage'));
const DepositsPage = lazy(() => import('@/pages/customer/DepositsPage'));
const InvestmentsPage = lazy(() => import('@/pages/customer/InvestmentsPage'));
const SpendingPage = lazy(() => import('@/pages/customer/SpendingPage'));
const ECommercePage = lazy(() => import('@/pages/customer/ECommercePage'));
const AtmPage = lazy(() => import('@/pages/customer/AtmPage'));
const FinancialHealthPage = lazy(() => import('@/pages/customer/FinancialHealthPage'));
const AiInsightsPage = lazy(() => import('@/pages/customer/AiInsightsPage'));
const RecommendationsPage = lazy(() => import('@/pages/customer/RecommendationsPage'));
const CopilotPage = lazy(() => import('@/pages/customer/CopilotPage'));
const NotificationsPage = lazy(() => import('@/pages/customer/NotificationsPage'));
const ProfilePage = lazy(() => import('@/pages/customer/ProfilePage'));

const MarketOverviewPage = lazy(() => import('@/pages/customer/MarketOverviewPage'));
const MarketTrendingPage = lazy(() => import('@/pages/customer/MarketTrendingPage'));
const TopGainersPage = lazy(() => import('@/pages/customer/TopGainersPage'));
const TopLosersPage = lazy(() => import('@/pages/customer/TopLosersPage'));
const OpportunitiesPage = lazy(() => import('@/pages/customer/OpportunitiesPage'));

const PaymentsPage = lazy(() => import('@/pages/customer/PaymentsPage'));
const SendMoneyPage = lazy(() => import('@/pages/customer/SendMoneyPage'));
const PayBillsPage = lazy(() => import('@/pages/customer/PayBillsPage'));

const EmployeeDashboardPage = lazy(() => import('@/pages/employee/DashboardPage'));
const EmployeeCustomersPage = lazy(() => import('@/pages/employee/CustomersPage'));
const EmployeeCustomer360Page = lazy(() => import('@/pages/employee/Customer360Page'));
const EmployeeSegmentsPage = lazy(() => import('@/pages/employee/SegmentsPage'));
const EmployeeAiInsightsPage = lazy(() => import('@/pages/employee/AiInsightsPage'));
const EmployeeNextBestActionPage = lazy(() => import('@/pages/employee/NextBestActionPage'));
const EmployeeCampaignsPage = lazy(() => import('@/pages/employee/CampaignsPage'));
const EmployeeAnalyticsPage = lazy(() => import('@/pages/employee/AnalyticsPage'));
const EmployeeAiModelsPage = lazy(() => import('@/pages/employee/AiModelsPage'));
const EmployeeAuditLogsPage = lazy(() => import('@/pages/employee/AuditLogsPage'));
const EmployeeSettingsPage = lazy(() => import('@/pages/employee/SettingsPage'));

const DesignSystemPage = lazy(() => import('@/pages/DesignSystemPage'));
const ApiDocsPage = lazy(() => import('@/pages/ApiDocsPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

function withSuspense(node: ReactNode) {
    return <Suspense fallback={<PageLoader />}>{node}</Suspense>;
}

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/customer/home" replace />,
    },
    {
        path: '/customer',
        element: <CustomerLayout />,
        children: [
            { path: 'home', element: withSuspense(<HomePage />) },
            { path: 'financial-360', element: withSuspense(<Financial360Page />) },
            { path: 'accounts', element: withSuspense(<AccountsPage />) },
            { path: 'accounts/:id', element: withSuspense(<AccountDetailPage />) },
            { path: 'transactions', element: withSuspense(<TransactionsPage />) },
            { path: 'cards', element: withSuspense(<CardsPage />) },
            { path: 'cards/:id', element: withSuspense(<CardDetailPage />) },
            { path: 'loans', element: withSuspense(<LoansPage />) },
            { path: 'deposits', element: withSuspense(<DepositsPage />) },
            { path: 'investments', element: withSuspense(<InvestmentsPage />) },
            { path: 'spending', element: withSuspense(<SpendingPage />) },
            { path: 'spending/e-commerce', element: withSuspense(<ECommercePage />) },
            { path: 'spending/atm', element: withSuspense(<AtmPage />) },
            { path: 'financial-health', element: withSuspense(<FinancialHealthPage />) },
            { path: 'ai-insights', element: withSuspense(<AiInsightsPage />) },
            { path: 'recommendations', element: withSuspense(<RecommendationsPage />) },
            { path: 'copilot', element: withSuspense(<CopilotPage />) },
            { path: 'notifications', element: withSuspense(<NotificationsPage />) },
            { path: 'profile', element: withSuspense(<ProfilePage />) },
            { path: 'market', element: withSuspense(<MarketOverviewPage />) },
            { path: 'market/trending', element: withSuspense(<MarketTrendingPage />) },
            { path: 'market/gainers', element: withSuspense(<TopGainersPage />) },
            { path: 'market/losers', element: withSuspense(<TopLosersPage />) },
            { path: 'market/opportunities', element: withSuspense(<OpportunitiesPage />) },
            { path: 'payments', element: withSuspense(<PaymentsPage />) },
            { path: 'payments/send', element: withSuspense(<SendMoneyPage />) },
            { path: 'payments/bills', element: withSuspense(<PayBillsPage />) },
        ],
    },
    {
        path: '/employee',
        element: <EmployeeLayout />,
        children: [
            { path: 'dashboard', element: withSuspense(<EmployeeDashboardPage />) },
            { path: 'customers', element: withSuspense(<EmployeeCustomersPage />) },
            { path: 'customer-360/:id', element: withSuspense(<EmployeeCustomer360Page />) },
            { path: 'segments', element: withSuspense(<EmployeeSegmentsPage />) },
            { path: 'ai-insights', element: withSuspense(<EmployeeAiInsightsPage />) },
            { path: 'next-best-action', element: withSuspense(<EmployeeNextBestActionPage />) },
            { path: 'campaigns', element: withSuspense(<EmployeeCampaignsPage />) },
            { path: 'analytics', element: withSuspense(<EmployeeAnalyticsPage />) },
            { path: 'ai-models', element: withSuspense(<EmployeeAiModelsPage />) },
            { path: 'audit-logs', element: withSuspense(<EmployeeAuditLogsPage />) },
            { path: 'settings', element: withSuspense(<EmployeeSettingsPage />) },
        ],
    },
    {
        path: '/design-system',
        element: withSuspense(<DesignSystemPage />),
    },
    {
        path: '/api-docs',
        element: withSuspense(<ApiDocsPage />),
    },
    {
        path: '*',
        element: withSuspense(<NotFoundPage />),
    },
]);
