import { Navigate, createBrowserRouter } from 'react-router-dom';

import { CustomerLayout } from '@/layouts/CustomerLayout/CustomerLayout';
import { EmployeeLayout } from '@/layouts/EmployeeLayout/EmployeeLayout';

import HomePage from '@/pages/customer/HomePage';
import Financial360Page from '@/pages/customer/Financial360Page';
import AccountsPage from '@/pages/customer/AccountsPage';
import TransactionsPage from '@/pages/customer/TransactionsPage';
import CardsPage from '@/pages/customer/CardsPage';
import LoansPage from '@/pages/customer/LoansPage';
import DepositsPage from '@/pages/customer/DepositsPage';
import InvestmentsPage from '@/pages/customer/InvestmentsPage';
import SpendingPage from '@/pages/customer/SpendingPage';
import FinancialHealthPage from '@/pages/customer/FinancialHealthPage';
import AiInsightsPage from '@/pages/customer/AiInsightsPage';
import RecommendationsPage from '@/pages/customer/RecommendationsPage';
import CopilotPage from '@/pages/customer/CopilotPage';
import NotificationsPage from '@/pages/customer/NotificationsPage';
import ProfilePage from '@/pages/customer/ProfilePage';

import EmployeeDashboardPage from '@/pages/employee/DashboardPage';
import EmployeeCustomersPage from '@/pages/employee/CustomersPage';
import EmployeeCustomer360Page from '@/pages/employee/Customer360Page';
import EmployeeSegmentsPage from '@/pages/employee/SegmentsPage';
import EmployeeAiInsightsPage from '@/pages/employee/AiInsightsPage';
import EmployeeNextBestActionPage from '@/pages/employee/NextBestActionPage';
import EmployeeCampaignsPage from '@/pages/employee/CampaignsPage';
import EmployeeAnalyticsPage from '@/pages/employee/AnalyticsPage';
import EmployeeAiModelsPage from '@/pages/employee/AiModelsPage';
import EmployeeAuditLogsPage from '@/pages/employee/AuditLogsPage';
import EmployeeSettingsPage from '@/pages/employee/SettingsPage';

import DesignSystemPage from '@/pages/DesignSystemPage';
import NotFoundPage from '@/pages/NotFoundPage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/customer/home" replace />,
    },
    {
        path: '/customer',
        element: <CustomerLayout />,
        children: [
            { path: 'home', element: <HomePage /> },
            { path: 'financial-360', element: <Financial360Page /> },
            { path: 'accounts', element: <AccountsPage /> },
            { path: 'transactions', element: <TransactionsPage /> },
            { path: 'cards', element: <CardsPage /> },
            { path: 'loans', element: <LoansPage /> },
            { path: 'deposits', element: <DepositsPage /> },
            { path: 'investments', element: <InvestmentsPage /> },
            { path: 'spending', element: <SpendingPage /> },
            { path: 'financial-health', element: <FinancialHealthPage /> },
            { path: 'ai-insights', element: <AiInsightsPage /> },
            { path: 'recommendations', element: <RecommendationsPage /> },
            { path: 'copilot', element: <CopilotPage /> },
            { path: 'notifications', element: <NotificationsPage /> },
            { path: 'profile', element: <ProfilePage /> },
        ],
    },
    {
        path: '/employee',
        element: <EmployeeLayout />,
        children: [
            { path: 'dashboard', element: <EmployeeDashboardPage /> },
            { path: 'customers', element: <EmployeeCustomersPage /> },
            { path: 'customer-360/:id', element: <EmployeeCustomer360Page /> },
            { path: 'segments', element: <EmployeeSegmentsPage /> },
            { path: 'ai-insights', element: <EmployeeAiInsightsPage /> },
            { path: 'next-best-action', element: <EmployeeNextBestActionPage /> },
            { path: 'campaigns', element: <EmployeeCampaignsPage /> },
            { path: 'analytics', element: <EmployeeAnalyticsPage /> },
            { path: 'ai-models', element: <EmployeeAiModelsPage /> },
            { path: 'audit-logs', element: <EmployeeAuditLogsPage /> },
            { path: 'settings', element: <EmployeeSettingsPage /> },
        ],
    },
    {
        path: '/design-system',
        element: <DesignSystemPage />,
    },
    {
        path: '*',
        element: <NotFoundPage />,
    },
]);
