import { useState } from 'react';
import { FileJson, FlameKindling, ListTree } from 'lucide-react';

import { API_CONFIG } from '@/services/api';
import { cn } from '@/utils/cn';

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface Field {
    name: string;
    type: string;
    description: string;
}

interface Endpoint {
    method: Method;
    path: string;
    description?: string;
}

interface ModuleDoc {
    id: string;
    title: string;
    description: string;
    endpoints: Endpoint[];
    fields: Field[];
    sample: string;
}

const METHOD_TONE: Record<Method, string> = {
    GET: 'bg-primary-soft text-primary',
    POST: 'bg-info/10 text-info',
    PUT: 'bg-warning/15 text-warning',
    PATCH: 'bg-warning/15 text-warning',
    DELETE: 'bg-danger/10 text-danger',
};

const MODULES: ModuleDoc[] = [
    {
        id: 'dashboard',
        title: 'Dashboard',
        description: 'Aggregated customer home data: balance, primary account, quick actions, recent activity and market snapshot.',
        endpoints: [{ method: 'GET', path: '/api/v1/dashboard' }],
        fields: [
            { name: 'greeting', type: 'string', description: 'Time-of-day greeting, e.g. "Good morning"' },
            { name: 'userName', type: 'string', description: 'Display name for the dashboard header' },
            { name: 'totalBalance', type: 'number', description: 'Sum of all account balances (NPR)' },
            { name: 'currency', type: 'string', description: 'ISO currency code, e.g. "NPR"' },
            { name: 'primaryAccount', type: 'Account', description: 'Default account shown under the balance' },
            { name: 'primaryCard', type: 'Card', description: 'Default card rendered as the card preview' },
            { name: 'quickActions', type: 'QuickAction[]', description: 'Shortcut tiles: id, label, icon, route' },
            { name: 'summary', type: 'object', description: 'Counts/totals for accounts, cards, loans, investments' },
            { name: 'recentTransactions', type: 'Transaction[]', description: 'Latest 4 transactions across accounts' },
            { name: 'marketSnapshot', type: 'object', description: 'NEPSE index: status, currentValue, change, percentage' },
            { name: 'trendingInvestments', type: 'Investment[]', description: 'Top trending instruments for the user' },
        ],
        sample: `{
  "success": true,
  "message": "OK",
  "data": {
    "greeting": "Good morning",
    "userName": "Aarav",
    "totalBalance": 2450500,
    "currency": "NPR",
    "primaryAccount": {
      "id": "acc-1001",
      "name": "Primary Savings",
      "maskedNumber": "**** **** 8901",
      "balance": 2450500,
      "availableBalance": 2420300
    },
    "quickActions": [
      { "id": "qa-send", "label": "Send", "icon": "Send", "route": "/customer/payments/send" }
    ],
    "recentTransactions": [],
    "marketSnapshot": {
      "status": "open",
      "index": "NEPSE",
      "currentValue": 21847.32,
      "change": 312.45,
      "percentage": 1.45
    }
  },
  "meta": {}
}`,
    },
    {
        id: 'accounts',
        title: 'Accounts',
        description: 'Customer bank accounts with balances, interest and branch details.',
        endpoints: [
            { method: 'GET', path: '/api/v1/accounts', description: 'List all accounts' },
            { method: 'GET', path: '/api/v1/accounts/{id}', description: 'Single account detail' },
        ],
        fields: [
            { name: 'id', type: 'string', description: 'Unique account id, e.g. "acc-1001"' },
            { name: 'customerId', type: 'string', description: 'Owning customer id' },
            { name: 'name', type: 'string', description: 'Display name, e.g. "Primary Savings"' },
            { name: 'type', type: 'string', description: 'savings | current | salary | fixed-deposit' },
            { name: 'status', type: 'string', description: 'active | dormant | closed | blocked' },
            { name: 'accountNumber', type: 'string', description: 'Full account number (backend only)' },
            { name: 'maskedNumber', type: 'string', description: 'Masked for display: "**** **** 8901"' },
            { name: 'balance', type: 'number', description: 'Book balance in account currency' },
            { name: 'availableBalance', type: 'number', description: 'Withdrawable balance after holds' },
            { name: 'currency', type: 'string', description: 'ISO currency code' },
            { name: 'openedAt', type: 'date', description: 'Account open date (YYYY-MM-DD)' },
            { name: 'branch', type: 'string', description: 'Home branch name' },
            { name: 'interestRate', type: 'number', description: 'Annual interest rate (percent)' },
        ],
        sample: `{
  "success": true,
  "data": [
    {
      "id": "acc-1001",
      "name": "Primary Savings",
      "type": "savings",
      "status": "active",
      "maskedNumber": "**** **** 8901",
      "balance": 2450500,
      "availableBalance": 2420300,
      "currency": "NPR",
      "branch": "Naxal",
      "interestRate": 4.5
    }
  ]
}`,
    },
    {
        id: 'cards',
        title: 'Credit & debit cards',
        description: 'Physical and virtual cards. Card numbers and CVV are masked server-side.',
        endpoints: [
            { method: 'GET', path: '/api/v1/cards', description: 'List cards' },
            { method: 'GET', path: '/api/v1/cards/{id}', description: 'Card detail' },
            { method: 'GET', path: '/api/v1/cards/{id}/transactions', description: 'Transactions on a card' },
        ],
        fields: [
            { name: 'id', type: 'string', description: 'Unique card id' },
            { name: 'accountId', type: 'string', description: 'Linked account' },
            { name: 'brand', type: 'string', description: 'visa | mastercard' },
            { name: 'type', type: 'string', description: 'debit | credit' },
            { name: 'status', type: 'string', description: 'active | blocked | expired | cancelled' },
            { name: 'maskedNumber', type: 'string', description: 'Masked PAN, e.g. "4400 **** **** 8901"' },
            { name: 'holderName', type: 'string', description: 'Name embossed on the card' },
            { name: 'expiryMonth', type: 'number', description: 'Expiry month (1-12)' },
            { name: 'expiryYear', type: 'number', description: 'Expiry year' },
            { name: 'creditLimit', type: 'number', description: 'Credit cards only' },
            { name: 'availableCredit', type: 'number', description: 'Credit cards only' },
            { name: 'outstandingBalance', type: 'number', description: 'Credit cards only' },
        ],
        sample: `{
  "success": true,
  "data": [
    {
      "id": "card-1002",
      "accountId": "acc-1002",
      "brand": "mastercard",
      "type": "credit",
      "status": "active",
      "maskedNumber": "5423 **** **** 4830",
      "holderName": "Aarav Sharma",
      "expiryMonth": 11,
      "expiryYear": 2027,
      "creditLimit": 300000,
      "availableCredit": 215750,
      "outstandingBalance": 84250
    }
  ]
}`,
    },
    {
        id: 'loans',
        title: 'Loans',
        description: 'Active loan portfolio with EMI schedule and repayment progress.',
        endpoints: [
            { method: 'GET', path: '/api/v1/loans', description: 'List loans' },
            { method: 'GET', path: '/api/v1/loans/{id}', description: 'Loan detail incl. payment schedule' },
        ],
        fields: [
            { name: 'id', type: 'string', description: 'Unique loan id' },
            { name: 'type', type: 'string', description: 'home | personal | auto | education | business' },
            { name: 'status', type: 'string', description: 'active | closed | overdue | pending' },
            { name: 'loanNumber', type: 'string', description: 'Human-readable loan reference' },
            { name: 'principal', type: 'number', description: 'Original loan amount' },
            { name: 'outstanding', type: 'number', description: 'Remaining balance' },
            { name: 'interestRate', type: 'number', description: 'Annual interest rate (percent)' },
            { name: 'tenureMonths', type: 'number', description: 'Total loan tenure in months' },
            { name: 'emiAmount', type: 'number', description: 'Monthly installment amount' },
            { name: 'nextDueDate', type: 'date', description: 'Next EMI due date' },
            { name: 'paidInstallments', type: 'number', description: 'Detail only — installments completed' },
            { name: 'payments', type: 'Payment[]', description: 'Detail only — recent EMI breakdown' },
        ],
        sample: `{
  "success": true,
  "data": {
    "id": "loan-1001",
    "type": "home",
    "status": "active",
    "loanNumber": "LN-2021-0008",
    "principal": 8500000,
    "outstanding": 5220000,
    "interestRate": 10.5,
    "tenureMonths": 240,
    "emiAmount": 84750,
    "nextDueDate": "2026-08-15",
    "paidInstallments": 62,
    "payments": [
      { "id": "loan-pay-1001", "date": "2026-07-15", "amount": 84750, "principal": 39250, "interest": 45500, "status": "paid" }
    ]
  }
}`,
    },
    {
        id: 'transactions',
        title: 'Transactions',
        description: 'Account and card movement history.',
        endpoints: [
            { method: 'GET', path: '/api/v1/transactions', description: 'All transactions (optionally ?accountId=)' },
            { method: 'GET', path: '/api/v1/transactions/{id}', description: 'Single transaction' },
        ],
        fields: [
            { name: 'id', type: 'string', description: 'Unique transaction id' },
            { name: 'accountId', type: 'string', description: 'Account the movement belongs to' },
            { name: 'cardId', type: 'string | null', description: 'Card used, when applicable' },
            { name: 'type', type: 'string', description: 'credit | debit' },
            { name: 'status', type: 'string', description: 'completed | pending | failed' },
            { name: 'category', type: 'string', description: 'groceries, dining, salary, transfer, …' },
            { name: 'description', type: 'string', description: 'Human-readable summary' },
            { name: 'merchant', type: 'string | null', description: 'Counterparty/merchant name' },
            { name: 'amount', type: 'number', description: 'Absolute amount in currency' },
            { name: 'reference', type: 'string', description: 'Bank reference number' },
            { name: 'balanceAfter', type: 'number', description: 'Running balance after the txn' },
            { name: 'performedAt', type: 'datetime', description: 'ISO-8601 timestamp' },
        ],
        sample: `{
  "success": true,
  "data": [
    {
      "id": "tx-1002",
      "accountId": "acc-1001",
      "type": "debit",
      "status": "completed",
      "category": "groceries",
      "description": "Grocery shopping",
      "merchant": "Bhatbhateni Supermarket",
      "amount": 4820,
      "currency": "NPR",
      "reference": "TXN-884210",
      "balanceAfter": 2265500,
      "performedAt": "2026-07-31T18:42:00"
    }
  ]
}`,
    },
    {
        id: 'payments',
        title: 'Payments',
        description: 'Send money, pay bills and payment history. Writes use the same envelope.',
        endpoints: [
            { method: 'GET', path: '/api/v1/payments', description: 'Overview: balance, recent payments, billers, payees, bills' },
            { method: 'GET', path: '/api/v1/payments/bills', description: 'Outstanding bills' },
            { method: 'POST', path: '/api/v1/payments/send', description: 'Body: { payeeId | recipientName, amount, note }' },
            { method: 'POST', path: '/api/v1/payments/pay-bill', description: 'Body: { billerId, amount, accountId }' },
        ],
        fields: [
            { name: 'balance', type: 'number', description: 'Available balance for payments' },
            { name: 'recent', type: 'Payment[]', description: 'Recent payments: title, subtitle, amount, status' },
            { name: 'billers', type: 'Biller[]', description: 'Billers: id, name, category, logo, billerCode' },
            { name: 'payees', type: 'Payee[]', description: 'Saved payees: id, name, accountNumber, bank' },
            { name: 'bills', type: 'Bill[]', description: 'Bills: billerId, title, amountDue, dueDate, status' },
        ],
        sample: `{
  "success": true,
  "data": {
    "balance": 2450500,
    "recent": [
      {
        "id": "pay-1001",
        "type": "mobile",
        "title": "Nepal Telecom top-up",
        "subtitle": "Mobile recharge",
        "amount": 500,
        "status": "completed",
        "createdAt": "2026-07-23T09:48:00"
      }
    ],
    "billers": [
      { "id": "b-1001", "name": "Nepal Electricity Authority", "category": "utilities", "logo": "Zap", "billerCode": "NEA-01" }
    ],
    "payees": [],
    "bills": []
  }
}`,
    },
    {
        id: 'spending',
        title: 'Spending analysis',
        description: 'Categorized spending, monthly trend, top merchants, e-commerce and ATM usage.',
        endpoints: [
            { method: 'GET', path: '/api/v1/spending', description: 'Category breakdown + trend + merchants' },
            { method: 'GET', path: '/api/v1/spending/e-commerce', description: 'Online merchant spending' },
            { method: 'GET', path: '/api/v1/spending/atm', description: 'ATM/cash withdrawal usage' },
        ],
        fields: [
            { name: 'month', type: 'string', description: 'Period label, e.g. "August 2026"' },
            { name: 'totalSpent', type: 'number', description: 'Total for the period' },
            { name: 'averageDaily', type: 'number', description: 'Daily average spend' },
            { name: 'comparisonToLastMonth', type: 'number', description: 'Percent change vs previous period' },
            { name: 'budget', type: 'number', description: 'Configured monthly budget' },
            { name: 'budgetUsed', type: 'number', description: 'Percent of budget used' },
            { name: 'categories', type: 'Category[]', description: 'id, category, amount, percentage, color' },
            { name: 'trend', type: 'TrendPoint[]', description: 'month + amount for the last 6 months' },
            { name: 'topMerchants', type: 'Merchant[]', description: 'name, count, amount' },
        ],
        sample: `{
  "success": true,
  "data": {
    "month": "August 2026",
    "totalSpent": 186420,
    "averageDaily": 6214,
    "comparisonToLastMonth": 4.2,
    "budget": 250000,
    "budgetUsed": 75,
    "categories": [
      { "id": "groceries", "category": "Groceries", "amount": 62400, "percentage": 33, "color": "#008f63" }
    ],
    "trend": [ { "month": "Mar", "amount": 168000 } ],
    "topMerchants": [ { "name": "Bhatbhateni", "count": 12, "amount": 48200 } ]
  }
}`,
    },
    {
        id: 'investments',
        title: 'Investments',
        description: 'The customer portfolio — holdings with NAV, gain/loss and risk.',
        endpoints: [
            { method: 'GET', path: '/api/v1/investments', description: 'Portfolio holdings' },
            { method: 'GET', path: '/api/v1/investments/{id}', description: 'Single holding' },
        ],
        fields: [
            { name: 'id', type: 'string', description: 'Unique investment id' },
            { name: 'type', type: 'string', description: 'mutual-fund | equity | treasury-bill | bond' },
            { name: 'name', type: 'string', description: 'Instrument name' },
            { name: 'symbol', type: 'string', description: 'Ticker, e.g. "NBF"' },
            { name: 'units', type: 'number', description: 'Held units' },
            { name: 'investedAmount', type: 'number', description: 'Cost basis' },
            { name: 'currentValue', type: 'number', description: 'Mark-to-market value' },
            { name: 'nav', type: 'number', description: 'Net asset value per unit' },
            { name: 'change', type: 'number', description: 'Absolute gain/loss' },
            { name: 'percentage', type: 'number', description: 'Percent return' },
            { name: 'risk', type: 'string', description: 'low | medium | high' },
            { name: 'recommendation', type: 'string', description: 'buy | hold | sell | invest | avoid' },
        ],
        sample: `{
  "success": true,
  "data": [
    {
      "id": "inv-1001",
      "type": "mutual-fund",
      "name": "Nabil Balanced Fund",
      "symbol": "NBF",
      "units": 1200,
      "investedAmount": 1250000,
      "currentValue": 1412000,
      "nav": 1176.67,
      "change": 162000,
      "percentage": 12.96,
      "risk": "medium",
      "recommendation": "hold"
    }
  ]
}`,
    },
    {
        id: 'market',
        title: 'Market',
        description: 'NEPSE index snapshot plus sorted instrument lists. Demo data — not financial advice.',
        endpoints: [
            { method: 'GET', path: '/api/v1/market/overview', description: 'Index status, value, change, sentiment' },
            { method: 'GET', path: '/api/v1/market/trending', description: 'Trending instruments with sparklines' },
            { method: 'GET', path: '/api/v1/market/gainers', description: 'Top gainers' },
            { method: 'GET', path: '/api/v1/market/losers', description: 'Top losers' },
            { method: 'GET', path: '/api/v1/market/most-traded', description: 'Highest volume' },
            { method: 'GET', path: '/api/v1/market/watchlist', description: 'User watchlist' },
            { method: 'GET', path: '/api/v1/market/opportunities', description: 'Curated opportunities' },
            { method: 'GET', path: '/api/v1/market/recommended', description: 'Recommended investments' },
        ],
        fields: [
            { name: 'symbol', type: 'string', description: 'Ticker, e.g. "NABIL"' },
            { name: 'name', type: 'string', description: 'Company/instrument name' },
            { name: 'price', type: 'number', description: 'Last traded price' },
            { name: 'previousPrice', type: 'number', description: 'Previous close' },
            { name: 'change', type: 'number', description: 'Absolute change' },
            { name: 'percentage', type: 'number', description: 'Percent change' },
            { name: 'volume', type: 'number', description: 'Traded volume' },
            { name: 'sector', type: 'string', description: 'Industry sector' },
            { name: 'risk', type: 'string', description: 'low | medium | high' },
            { name: 'trend', type: 'string', description: 'up | down | flat' },
            { name: 'recommendation', type: 'string', description: 'buy | hold | sell | invest | avoid' },
            { name: 'sparkline', type: 'number[]', description: 'Optional intraday series (trending/watchlist)' },
        ],
        sample: `{
  "success": true,
  "data": {
    "overview": {
      "status": "open",
      "index": "NEPSE",
      "currentValue": 21847.32,
      "change": 312.45,
      "percentage": 1.45,
      "volume": 18240000,
      "sentiment": "bullish"
    },
    "trending": [
      {
        "symbol": "NABIL",
        "name": "Nabil Bank Limited",
        "price": 685,
        "previousPrice": 674.2,
        "change": 10.8,
        "percentage": 1.6,
        "volume": 1200000,
        "sector": "Banking",
        "risk": "medium",
        "trend": "up",
        "recommendation": "buy",
        "sparkline": [640, 648, 655, 662, 658, 669, 674, 685]
      }
    ]
  }
}`,
    },
    {
        id: 'insights',
        title: 'AI insights',
        description: 'Personalized, non-advisory recommendations derived from banking behavior.',
        endpoints: [{ method: 'GET', path: '/api/v1/insights', description: 'All insights for the customer' }],
        fields: [
            { name: 'id', type: 'string', description: 'Unique insight id' },
            { name: 'category', type: 'string', description: 'spending | saving | investment | safety' },
            { name: 'severity', type: 'string', description: 'positive | info | warning | critical' },
            { name: 'title', type: 'string', description: 'Short headline' },
            { name: 'description', type: 'string', description: 'Body text' },
            { name: 'recommendation', type: 'string', description: 'Suggested action (optional)' },
            { name: 'createdAt', type: 'datetime', description: 'Generated timestamp' },
        ],
        sample: `{
  "success": true,
  "data": [
    {
      "id": "insight-1001",
      "category": "spending",
      "severity": "info",
      "title": "Groceries up 12%",
      "description": "Your grocery spend increased this month.",
      "recommendation": "Review recurring supermarket purchases.",
      "createdAt": "2026-08-01T08:00:00"
    }
  ]
}`,
    },
    {
        id: 'notifications',
        title: 'Notifications',
        description: 'In-app alerts: transactions, safety, promotions and system updates.',
        endpoints: [
            { method: 'GET', path: '/api/v1/notifications', description: 'List notifications' },
            { method: 'PATCH', path: '/api/v1/notifications/{id}/read', description: 'Mark one as read' },
            { method: 'PATCH', path: '/api/v1/notifications/read-all', description: 'Mark all as read' },
        ],
        fields: [
            { name: 'id', type: 'string', description: 'Unique notification id' },
            { name: 'type', type: 'string', description: 'transaction | alert | promotion | system' },
            { name: 'title', type: 'string', description: 'Notification headline' },
            { name: 'body', type: 'string', description: 'Message body' },
            { name: 'isRead', type: 'boolean', description: 'Read state' },
            { name: 'createdAt', type: 'datetime', description: 'Timestamp' },
        ],
        sample: `{
  "success": true,
  "data": [
    {
      "id": "ntf-1001",
      "type": "transaction",
      "title": "Payment received",
      "body": "NPR 18,500.00 credited to Primary Savings.",
      "isRead": false,
      "createdAt": "2026-08-01T09:15:00"
    }
  ]
}`,
    },
    {
        id: 'profile',
        title: 'Profile & settings',
        description: 'Identity, contact, branch, KYC state and app preferences.',
        endpoints: [
            { method: 'GET', path: '/api/v1/profile', description: 'Full profile with preferences' },
            { method: 'GET', path: '/api/v1/user', description: 'Alias — same payload' },
        ],
        fields: [
            { name: 'id', type: 'string', description: 'User id' },
            { name: 'customerId', type: 'string', description: 'Linked customer id' },
            { name: 'name', type: 'string', description: 'Full name' },
            { name: 'email', type: 'string', description: 'Primary email' },
            { name: 'phone', type: 'string', description: 'Phone number' },
            { name: 'address', type: 'string', description: 'Residential address' },
            { name: 'branch', type: 'string', description: 'Home branch' },
            { name: 'memberSince', type: 'date', description: 'Membership start date' },
            { name: 'kycStatus', type: 'string', description: 'verified | pending | rejected' },
            { name: 'preferences', type: 'object', description: 'currency, language, smsAlerts, marketingEmails' },
        ],
        sample: `{
  "success": true,
  "data": {
    "id": "u-1001",
    "customerId": "c-1001",
    "name": "Aarav Sharma",
    "email": "aarav.sharma@example.com",
    "phone": "+977 980-123-4567",
    "address": "Gyaneshwor, Kathmandu",
    "branch": "Naxal",
    "memberSince": "2018-03-12",
    "kycStatus": "verified",
    "preferences": {
      "currency": "NPR",
      "language": "English",
      "smsAlerts": true,
      "marketingEmails": false
    }
  }
}`,
    },
];

export default function ApiDataPage() {
    const [active, setActive] = useState<string>(MODULES[0]!.id);

    const module = MODULES.find((item) => item.id === active) ?? MODULES[0]!;

    return (
        <section className="flex flex-col gap-5">
            <header>
                <p className="text-sm text-muted">Developer</p>
                <h1 className="text-2xl font-semibold tracking-tight text-ink">API data contracts</h1>
                <p className="mt-1 text-sm text-muted">
                    Endpoint, sample response and fields each frontend module expects from the Laravel API.
                </p>
            </header>

            <article className="rounded-lg border border-line bg-surface p-4">
                <p className="text-sm font-semibold text-ink">
                    Current mode:{' '}
                    <span className={API_CONFIG.useMock ? 'text-warning' : 'text-success'}>
                        {API_CONFIG.useMock ? 'Mock (local JSON)' : 'Real (Laravel API)'}
                    </span>
                </p>
                <p className="mt-2 text-sm text-muted">
                    Set <code className="rounded bg-canvas px-1.5 py-0.5 text-xs">VITE_USE_MOCK_API=false</code> to hit
                    the backend. Every response uses the{' '}
                    <code className="rounded bg-canvas px-1.5 py-0.5 text-xs">{'{success, message, data, meta}'}</code>{' '}
                    envelope.
                </p>
            </article>

            <nav aria-label="Modules" className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
                {MODULES.map((item) => (
                    <button
                        key={item.id}
                        type="button"
                        onClick={() => setActive(item.id)}
                        className={cn(
                            'shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors',
                            active === item.id
                                ? 'border-primary bg-primary text-white'
                                : 'border-line bg-surface text-muted hover:border-primary/40 hover:text-ink',
                        )}
                    >
                        {item.title}
                    </button>
                ))}
            </nav>

            <article className="rounded-lg border border-line bg-surface p-4">
                <h2 className="flex items-center gap-2 text-base font-semibold text-ink">
                    <FileJson className="h-4.5 w-4.5 text-primary" aria-hidden />
                    {module.title}
                </h2>
                <p className="mt-1 text-sm text-muted">{module.description}</p>

                <h3 className="mt-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
                    <FlameKindling className="h-3.5 w-3.5" aria-hidden />
                    Endpoints
                </h3>
                <ul className="mt-2 flex flex-col gap-1.5">
                    {module.endpoints.map((endpoint) => (
                        <li
                            key={`${endpoint.method}-${endpoint.path}`}
                            className="flex flex-wrap items-center gap-2 font-mono text-xs"
                        >
                            <span
                                className={cn(
                                    'w-14 shrink-0 rounded px-1.5 py-0.5 text-center font-sans text-[10px] font-semibold',
                                    METHOD_TONE[endpoint.method],
                                )}
                            >
                                {endpoint.method}
                            </span>
                            <code className="text-ink">{endpoint.path}</code>
                            {endpoint.description ? (
                                <span className="w-full pl-16 text-xs text-muted sm:w-auto sm:pl-0">
                                    {endpoint.description}
                                </span>
                            ) : null}
                        </li>
                    ))}
                </ul>

                <h3 className="mt-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
                    <ListTree className="h-3.5 w-3.5" aria-hidden />
                    Fields
                </h3>
                <div className="mt-2 overflow-x-auto">
                    <table className="w-full min-w-[520px] border-collapse text-sm">
                        <thead>
                            <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-muted">
                                <th className="pb-2 pr-4 font-semibold">Field</th>
                                <th className="pb-2 pr-4 font-semibold">Type</th>
                                <th className="pb-2 font-semibold">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {module.fields.map((field) => (
                                <tr key={field.name} className="border-b border-line/60 last:border-0">
                                    <td className="py-2 pr-4 font-mono text-xs font-medium text-ink">{field.name}</td>
                                    <td className="py-2 pr-4 font-mono text-xs text-primary">{field.type}</td>
                                    <td className="py-2 text-xs text-muted">{field.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <h3 className="mt-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
                    <FileJson className="h-3.5 w-3.5" aria-hidden />
                    Sample response
                </h3>
                <pre className="mt-2 overflow-x-auto rounded-lg bg-ink p-4 text-xs leading-relaxed text-white">
                    {module.sample}
                </pre>
            </article>
        </section>
    );
}
