import { API_BASE_URL } from '@/constants';
import { ApiError, type ApiErrorPayload } from '@/types/api';

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
    const base = `${API_BASE_URL}${path}`;
    if (!query) return base;
    const params = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined && value !== null) params.set(key, String(value));
    });
    const search = params.toString();
    return search ? `${base}?${search}` : base;
}

/**
 * Centralized HTTP client for Laravel's API.
 * - Sends `Accept: application/json` and `X-Requested-With`.
 * - Attaches the `XSRF-TOKEN` cookie as `X-XSRF-TOKEN` for cookie-session auth.
 * - Never stores tokens in localStorage; relies on secure session cookies.
 */
class ApiClient {
    async request<T>(path: string, options: RequestOptions = {}): Promise<T> {
        const { method = 'GET', query, body, headers } = options;

        const csrfToken = getCookie('XSRF-TOKEN');
        const requestHeaders: Record<string, string> = {
            Accept: 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            ...(csrfToken ? { 'X-XSRF-TOKEN': csrfToken } : {}),
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
            throw new ApiError(
                response.status,
                error.message ?? `Request failed with status ${response.status}`,
                error.message ? (error as ApiErrorPayload) : null,
            );
        }

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
}

export const apiClient = new ApiClient();
