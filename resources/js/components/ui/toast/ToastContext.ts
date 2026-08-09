import { createContext } from 'react';

export type ToastVariant = 'success' | 'error' | 'info' | 'warning';

export interface ToastOptions {
    title: string;
    description?: string;
    variant?: ToastVariant;
    duration?: number;
}

export interface Toast extends Required<Pick<ToastOptions, 'title'>> {
    id: string;
    description?: string;
    variant: ToastVariant;
}

export interface ToastContextValue {
    toasts: Toast[];
    show: (options: ToastOptions) => string;
    dismiss: (id: string) => void;
}

export const ToastContext = createContext<ToastContextValue | null>(null);
