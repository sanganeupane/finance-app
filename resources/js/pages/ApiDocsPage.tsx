import { BookOpen, FlaskConical, PlugZap } from 'lucide-react';

import { API_CONFIG, API_ENDPOINTS } from '@/services/api';

const ENDPOINT_GROUPS: Array<{ label: string; entries: Array<[string, string]> }> = [
    {
        label: 'Dashboard & accounts',
        entries: [
            ['GET', API_ENDPOINTS.dashboard.get],
            ['GET', API_ENDPOINTS.accounts.list],
            ['GET', API_ENDPOINTS.accounts.detail(':accountId')],
            ['GET', API_ENDPOINTS.transactions.list()],
            ['GET', API_ENDPOINTS.transactions.list(':accountId')],
        ],
    },
    {
        label: 'Cards & loans',
        entries: [
            ['GET', API_ENDPOINTS.cards.list],
            ['GET', API_ENDPOINTS.cards.detail(':cardId')],
            ['GET', API_ENDPOINTS.cards.transactions(':cardId')],
            ['GET', API_ENDPOINTS.loans.list],
            ['GET', API_ENDPOINTS.loans.detail(':loanId')],
        ],
    },
    {
        label: 'Investments & market',
        entries: [
            ['GET', API_ENDPOINTS.investments.list],
            ['GET', API_ENDPOINTS.market.overview],
            ['GET', API_ENDPOINTS.market.trending],
            ['GET', API_ENDPOINTS.market.gainers],
            ['GET', API_ENDPOINTS.market.losers],
            ['GET', API_ENDPOINTS.market.opportunities],
        ],
    },
    {
        label: 'Spending & insights',
        entries: [
            ['GET', API_ENDPOINTS.spending.get],
            ['GET', API_ENDPOINTS.spending.eCommerce],
            ['GET', API_ENDPOINTS.spending.atm],
            ['GET', API_ENDPOINTS.financialHealth.get],
            ['GET', API_ENDPOINTS.insights.list],
        ],
    },
    {
        label: 'Payments & notifications',
        entries: [
            ['GET', API_ENDPOINTS.payments.list],
            ['GET', API_ENDPOINTS.payments.bills],
            ['POST', API_ENDPOINTS.payments.send],
            ['POST', API_ENDPOINTS.payments.payBill],
            ['GET', API_ENDPOINTS.notifications.list],
            ['PATCH', API_ENDPOINTS.notifications.markAllRead],
        ],
    },
];

const SAMPLE_RESPONSE = `{
  "success": true,
  "message": "OK",
  "data": {
    "id": "acc-1001",
    "name": "Primary Savings",
    "balance": 2450500,
    "currency": "NPR"
  },
  "meta": {}
}`;

const SAMPLE_ERROR = `{
  "success": false,
  "message": "The account number is required.",
  "errors": {
    "account": ["The account number field is required."]
  }
}`;

export default function ApiDocsPage() {
    return (
        <section className="flex flex-col gap-5">
            <header>
                <p className="text-sm text-muted">Developer</p>
                <h1 className="text-2xl font-semibold tracking-tight text-ink">API reference</h1>
                <p className="mt-1 text-sm text-muted">
                    Contract shared with the Laravel backend · simulated locally in mock mode.
                </p>
            </header>

            <article className="rounded-lg border border-line bg-surface p-4">
                <h2 className="flex items-center gap-2 text-sm font-semibold text-ink">
                    <FlaskConical className="h-4 w-4 text-primary" aria-hidden />
                    Current mode: {API_CONFIG.useMock ? 'Mock (local JSON)' : 'Real (Laravel API)'}
                </h2>
                <p className="mt-2 text-sm text-muted">
                    Set <code className="rounded bg-canvas px-1.5 py-0.5 text-xs">VITE_USE_MOCK_API=false</code> and{' '}
                    <code className="rounded bg-canvas px-1.5 py-0.5 text-xs">VITE_API_BASE_URL</code> to switch to the
                    live backend. Base URL: <code className="rounded bg-canvas px-1.5 py-0.5 text-xs">{API_CONFIG.baseUrl || '(same origin)'}</code>
                </p>
            </article>

            <article className="rounded-lg border border-line bg-surface p-4">
                <h2 className="flex items-center gap-2 text-sm font-semibold text-ink">
                    <PlugZap className="h-4 w-4 text-primary" aria-hidden />
                    Response envelope
                </h2>
                <p className="mt-2 text-sm text-muted">
                    Every endpoint returns <code className="rounded bg-canvas px-1.5 py-0.5 text-xs">{"{success, message, data, meta}"}</code>.
                    Errors use the same shape with an <code className="rounded bg-canvas px-1.5 py-0.5 text-xs">errors</code> map.
                </p>
                <pre className="mt-3 overflow-x-auto rounded-lg bg-ink p-4 text-xs leading-relaxed text-white">
                    {SAMPLE_RESPONSE}
                </pre>
                <pre className="mt-2 overflow-x-auto rounded-lg bg-ink p-4 text-xs leading-relaxed text-white/80">
                    {SAMPLE_ERROR}
                </pre>
            </article>

            <article className="rounded-lg border border-line bg-surface p-4">
                <h2 className="flex items-center gap-2 text-sm font-semibold text-ink">
                    <BookOpen className="h-4 w-4 text-primary" aria-hidden />
                    Endpoints
                </h2>
                <dl className="mt-3 flex flex-col gap-4">
                    {ENDPOINT_GROUPS.map((group) => (
                        <div key={group.label}>
                            <dt className="text-xs font-semibold uppercase tracking-wide text-muted">{group.label}</dt>
                            <dd className="mt-2 flex flex-col gap-1.5">
                                {group.entries.map(([method, path]) => (
                                    <div
                                        key={`${method}-${path}`}
                                        className="flex items-center gap-2 font-mono text-xs"
                                    >
                                        <span
                                            className={`w-14 shrink-0 rounded px-1.5 py-0.5 text-center font-sans text-[10px] font-semibold ${
                                                method === 'GET'
                                                    ? 'bg-primary-soft text-primary'
                                                    : method === 'POST'
                                                      ? 'bg-info/10 text-info'
                                                      : 'bg-warning/15 text-warning'
                                            }`}
                                        >
                                            {method}
                                        </span>
                                        <code className="truncate text-ink">{path}</code>
                                    </div>
                                ))}
                            </dd>
                        </div>
                    ))}
                </dl>
            </article>
        </section>
    );
}
