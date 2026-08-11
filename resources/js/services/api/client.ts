import { ApiError, type ApiErrorPayload } from '@/types/api';

import { API_CONFIG } from './config';
import { findMockRoute } from './mockRoutes';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface RequestOptions {
    method?: HttpMethod;
    query?: Record<string, string | number | boolean | undefined | null>;
    body?: unknown;
    headers?: Record<string, string>;
}

/** Reads a cookie by name (used for Laravel's `XSRF-TOKEN`). */
function getCookie(name: string): string | undefined {
    const prefix = `${name}=`;
    const cookie = document.cookie.split(';').find((item) => item.trim().startsWith(prefix));
    if (!cookie) return undefined;
    return decodeURIComponent(cookie.trim().slice(prefix.length));
}

function buildUrl(path: string, query?: RequestOptions['query']): string {
    const base = `${API_CONFIG.baseUrl}${path}`;
    if (!query) return base;
    const params = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined && value !== null) params.set(key, String(value));
    });
    const search = params.toString();
    return search ? `${base}?${search}` : base;
}

function logRequest(method: string, path: string, mode: 'mock' | 'real', ok: boolean) {
    if (!API_CONFIG.logRequests) return;
    // console.debug is intentional dev logging behind a config flag.
    console.debug(`[api:${mode}] ${method} ${path} → ${ok ? 'ok' : 'error'}`);
}

function wait(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Centralized HTTP client for Laravel's API.
 * - Mock mode (default): resolves registered `mockRoutes` with simulated latency,
 *   returning the same `{success, message, data, meta}` envelope as the backend.
 * - Real mode: sends `Accept: application/json` + `X-Requested-With`, attaches the
 *   `XSRF-TOKEN` cookie, and supports bearer tokens via `Authorization` headers.
 * - Never stores tokens in localStorage; relies on secure cookies / bearer headers.
 */
class ApiClient {
    private async resolveMock<T>(path: string, options: RequestOptions): Promise<T> {
        const route = findMockRoute(path);
        if (!route) {
            throw new ApiError(404, `Mock route not registered for ${path}`);
        }
        const match = route.pattern.exec(path);
        const payload = route.resolve(match ?? ([] as unknown as RegExpExecArray), {
            path,
            method: options.method ?? 'GET',
            query: options.query as Record<string, unknown> | undefined,
            body: options.body,
            headers: options.headers,
        });
        await wait(API_CONFIG.mockLatencyMs);
        const envelope = payload as { success: boolean; message: string; data: unknown; meta?: Record<string, unknown> };
        if (!envelope.success) {
            throw new ApiError(404, envelope.message ?? 'Request failed (mock).');
        }
        logRequest(options.method ?? 'GET', path, 'mock', true);
        return envelope as T;
    }

    async request<T>(path: string, options: RequestOptions = {}): Promise<T> {
        const { method = 'GET', query, body, headers } = options;

        if (API_CONFIG.useMock) {
            return this.resolveMock<T>(path, options);
        }

        const csrfToken = getCookie('XSRF-TOKEN');
        const bearerToken = sessionStorage.getItem('sagarmatha.bearer');
        const requestHeaders: Record<string, string> = {
            Accept: 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            ...(csrfToken ? { 'X-XSRF-TOKEN': csrfToken } : {}),
            ...(bearerToken ? { Authorization: `Bearer ${bearerToken}` } : {}),
            ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
            ...headers,
        };

        let response: Response;
        try {
            response = await fetch(buildUrl(path, query), {
                method,
                headers: requestHeaders,
                credentials: 'same-origin',
                body: body !== undefined ? JSON.stringify(body) : undefined,
            });
        } catch {
            logRequest(method, path, 'real', false);
            throw new ApiError(0, 'Unable to reach the server. Please check your connection.');
        }

        if (response.status === 204) {
            return undefined as T;
        }

        let payload: unknown = null;
        try {
            payload = await response.json();
        } catch {
            // empty / non-JSON body
        }

        if (!response.ok) {
            const error = (payload ?? {}) as Partial<ApiErrorPayload>;
            logRequest(method, path, 'real', false);
            throw new ApiError(
                response.status,
                error.message ?? `Request failed with status ${response.status}`,
                error.message ? (error as ApiErrorPayload) : null,
            );
        }

        logRequest(method, path, 'real', true);
        return payload as T;
    }

    get<T>(path: string, query?: RequestOptions['query'], headers?: Record<string, string>) {
        return this.request<T>(path, { method: 'GET', query, headers });
    }

    post<T>(path: string, body?: unknown, headers?: Record<string, string>) {
        return this.request<T>(path, { method: 'POST', body, headers });
    }

    put<T>(path: string, body?: unknown, headers?: Record<string, string>) {
        return this.request<T>(path, { method: 'PUT', body, headers });
    }

    patch<T>(path: string, body?: unknown, headers?: Record<string, string>) {
        return this.request<T>(path, { method: 'PATCH', body, headers });
    }

    delete<T>(path: string, headers?: Record<string, string>) {
        return this.request<T>(path, { method: 'DELETE', headers });
    }

    /** Reads a bearer token from session storage for real-mode auth flows. */
    setAuthToken(token: string | null) {
        if (token) {
            sessionStorage.setItem('sagarmatha.bearer', token);
        } else {
            sessionStorage.removeItem('sagarmatha.bearer');
        }
    }
}

export const apiClient = new ApiClient();

/** Unwrap the `data` field from a Laravel envelope. */
export async function unwrap<T>(promise: Promise<{ data: T }>): Promise<T> {
    const result = await promise;
    return result.data;
}
