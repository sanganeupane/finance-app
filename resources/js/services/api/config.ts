/**
 * Central API configuration.
 * - `useMock`: toggles between local mock JSON and the real Laravel API.
 * - `baseUrl`: origin used for real requests (empty = same origin / Vite proxy).
 * - `timeout`: applied to real requests only (mock mode has its own simulated latency).
 *
 * Environment overrides:
 *   VITE_USE_MOCK_API   - "false" to hit the real backend, any other value enables mocks.
 *   VITE_API_BASE_URL   - full origin for the backend, e.g. https://api.example.com
 *   VITE_API_LOG        - "true" to log API calls to the console.
 */
export const API_CONFIG = {
    useMock: import.meta.env.VITE_USE_MOCK_API !== 'false',
    baseUrl: import.meta.env.VITE_API_BASE_URL ?? '',
    prefix: '/api',
    version: 'v1',
    timeoutMs: 15_000,
    logRequests: import.meta.env.VITE_API_LOG === 'true',
    /** Simulated latency for mock mode (ms). Kept small so UIs feel real without blocking. */
    mockLatencyMs: 220,
} as const;

export function apiPath(path: string): string {
    return `${API_CONFIG.prefix}/${API_CONFIG.version}${path.startsWith('/') ? path : `/${path}`}`;
}
