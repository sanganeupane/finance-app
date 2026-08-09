import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { cn } from '@/utils/cn';

export type DialogPosition = 'center' | 'right' | 'bottom';

export interface DialogProps {
    open: boolean;
    onClose: () => void;
    labelledBy?: string;
    describedBy?: string;
    position?: DialogPosition;
    className?: string;
    children: ReactNode;
}

const positionClasses: Record<DialogPosition, string> = {
    center: 'relative my-8 w-full max-w-md rounded-xl',
    right: 'ml-auto h-full w-full max-w-sm',
    bottom: 'mt-auto w-full rounded-t-2xl',
};

/**
 * Accessible overlay dialog. Handles focus trap, Escape, scroll lock and
 * focus restoration. Used by Modal, Drawer and BottomSheet.
 */
export function Dialog({ open, onClose, labelledBy, describedBy, position = 'center', className, children }: DialogProps) {
    const panelRef = useRef<HTMLDivElement>(null);
    const previouslyFocused = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (!open) return;

        previouslyFocused.current = document.activeElement as HTMLElement | null;
        panelRef.current?.focus();

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                event.stopPropagation();
                onClose();
                return;
            }
            if (event.key !== 'Tab') return;

            const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
                'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
            );
            if (!focusable || focusable.length === 0) return;

            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (!first || !last) return;

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            previouslyFocused.current?.focus();
        };
    }, [open, onClose]);

    if (!open) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex" role="presentation">
            <button
                type="button"
                aria-label="Close dialog"
                tabIndex={-1}
                onClick={onClose}
                className="absolute inset-0 h-full w-full cursor-default bg-ink/40 backdrop-blur-[2px]"
            />
            <div
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={labelledBy}
                aria-describedby={describedBy}
                tabIndex={-1}
                className={cn(
                    'relative z-10 flex max-h-full flex-col bg-surface shadow-lg outline-none',
                    'focus-visible:ring-0',
                    positionClasses[position],
                    className,
                )}
            >
                {children}
            </div>
        </div>,
        document.body,
    );
}
