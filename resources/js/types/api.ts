/** Shared API types used by the centralized API layer. */

export interface ApiErrorPayload {
    message: string;
    errors?: Record<string, string[]>;
}

/** Normalized error thrown by the API client. */
export class ApiError extends Error {
    readonly status: number;
    readonly data: ApiErrorPayload | null;

    constructor(status: number, message: string, data: ApiErrorPayload | null = null) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.data = data;
    }
}

/** Laravel-style pagination envelope. */
export interface Paginated<T> {
    data: T[];
    meta: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}
