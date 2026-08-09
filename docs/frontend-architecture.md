# Frontend Architecture — AI Customer 360 Banking Intelligence

Phase 1 foundation for the React frontend within the existing Laravel 13 app.
Laravel serves the SPA shell; Vite + React + Tailwind CSS v4 power the UI.

## Stack

| Concern    | Choice                          | Notes                                  |
| ---------- | ------------------------------- | -------------------------------------- |
| Framework  | React 19 + TypeScript (strict)  |                                         |
| Build      | Vite 8 (`@vitejs/plugin-react`) | entry: `resources/js/app.tsx`          |
| Styling    | Tailwind CSS v4 (CSS-first)     | tokens in `styles/tokens.css`          |
| Routing    | react-router-dom v7             | client-side routes behind Laravel catch-all |
| Icons      | lucide-react                    | single icon system; no emoji icons     |
| API        | native `fetch` wrapper          | `services/api/client.ts`               |
| Font       | Instrument Sans                 | via Laravel bunny fonts plugin         |

## Folder structure

```
resources/js/
├── app/            # App.tsx, router.tsx, providers.tsx
├── components/
│   ├── ui/         # design-system primitives (Button, Card, Modal, …)
│   ├── layout/     # CustomerHeader, CustomerBottomNav, EmployeeSidebar, EmployeeHeader
│   ├── navigation/ # nav item config (icons + paths)
│   └── placeholder/# PlaceholderPage used by scaffold routes
├── layouts/        # CustomerLayout, EmployeeLayout
├── pages/          # route components (customer/, employee/, DesignSystem, NotFound)
├── features/       # future feature modules (empty in Phase 1)
├── services/
│   ├── api/        # client, endpoints, services/*Service
│   └── auth/       # AuthProvider + context
├── hooks/          # useMediaQuery, useDisclosure, useClickOutside, useAuth
├── types/          # domain types (Customer, Account, Transaction, …)
├── utils/          # cn, format, mask
├── constants/      # app name, API base, breakpoints, nav labels
├── mock/           # fictional, realistic dataset for UI development
└── styles/         # tokens.css (design tokens) + globals.css
```

## Design tokens

Single source of truth: `resources/js/styles/tokens.css` using Tailwind v4 `@theme`.

- **Colors** (semantic): `primary #0B8F68`, `primary-dark`, `primary-soft` (mint),
  `primary-softer` (light mint), `canvas` (background), `surface` (white),
  `ink` (text), `muted` (secondary text), `line` (border), plus
  `success / warning / danger / info / violet`.
- **Spacing**: 8px grid — `--spacing: 0.5rem` means `p-1 = 8px`, `p-2 = 16px`, etc.
- **Radius**: `sm 8 / md 12 / lg 16 / xl 24`.
- **Shadows**: `xs / sm / md / lg / focus`.
- **Motion**: `--transition-*` variables; respect `prefers-reduced-motion`.

Rules: never use raw hex/px in components; always reference token utilities
(`bg-primary`, `text-ink`, `border-line`, `rounded-md`, `shadow-md`).

## Component rules

- Build on `components/ui/*` primitives; do not add a dependency when one exists.
- All primitives: accessible labels, keyboard support, visible focus ring,
  44px minimum touch targets on mobile.
- One icon system (lucide-react). **No emoji as UI icons.**
- Never pass sensitive values into components un-masked — use `utils/mask.ts`.
- Variants/sizes are expressed as typed unions, not loose strings.

## Routing

- `/` redirects to `/customer/home`. Laravel catch-all returns the SPA view.
- Customer (mobile): `/customer/home`, `financial-360`, `accounts`, `transactions`,
  `cards`, `loans`, `deposits`, `investments`, `spending`, `financial-health`,
  `ai-insights`, `recommendations`, `copilot`, `notifications`, `profile`.
- Employee (desktop): `/employee/dashboard`, `customers`, `customer-360/:id`,
  `segments`, `ai-insights`, `next-best-action`, `campaigns`, `analytics`,
  `ai-models`, `audit-logs`, `settings`.
- `/design-system` is a dev-only component verification page.

## API architecture

All HTTP goes through `services/api/client.ts` (fetch wrapper):
Laravel cookie-session auth, `XSRF-TOKEN` auto-attached, JSON errors normalized
into `ApiError`. Endpoint paths live only in `services/api/endpoints.ts`.
Feature calls go through `services/api/services/*` — never call `fetch` or
`apiClient` directly inside components. No hardcoded URLs.

> Proposed endpoint paths in `endpoints.ts` must be finalized with the backend
> team before production use.

## Mock data

`resources/js/mock/*` holds fictional but realistic NPR-denominated data.
Mocks are typed against `types/*` and never embedded inside components.
Use them for UI development until real services are wired.

## Responsive rules

Supported widths: 360–430 (phones), 768/1024 (tablets), 1280–1600+ (desktop).

- Customer app: **mobile-first** — max-width `480px` column, fixed bottom nav,
  bottom sheets for actions.
- Employee app: **desktop-first** — 260px sidebar at `lg+`, drawer nav below `lg`.
- Never stretch desktop UI onto mobile; build per-viewport layouts.

## Accessibility (WCAG 2.1 AA target)

Semantic HTML, keyboard navigation (Tabs arrows, Dialog focus trap + Esc),
visible focus (global `:focus-visible`), labelled inputs/buttons, heading
hierarchy, contrast-safe tokens, 44px touch targets, `aria-live` regions for
toasts, reduced-motion support. Never rely on color alone (Badge dot, Alert icon).

## Security

- Never log or display passwords, OTP, tokens, full account/card numbers, or PII.
- Mask via `utils/mask.ts` (`**** **** 4582`).
- No auth tokens in `localStorage`; Laravel session cookies only.
- `cvv` on `Card` is a typed placeholder and must never be rendered.

## Naming conventions

- Files: `PascalCase.tsx` for components, `camelCase.ts` for modules/utils.
- Default-export page components; named exports for ui primitives & utilities.
- Feature modules grouped under `features/<name>/` in later phases.
- Type unions for enums (`type AccountStatus = 'active' | …`).

## Rules for future AI agents

1. Reuse `components/ui/*` and token utilities; extend the design system, never fork it.
2. Route through `services/api/services/*`; add endpoints to `endpoints.ts` only.
3. Keep mock data in `mock/*`, typed, outside components.
4. Run `npm run type-check`, `npm run lint`, `npm run build` before finishing.
5. Preserve mobile-first (customer) and desktop-first (employee) layouts.
6. Follow accessibility + security rules above; mask anything sensitive.
