import { useId, type ReactNode } from 'react';
import { X } from 'lucide-react';

import { Dialog, type DialogProps } from './Dialog';
import { IconButton } from './IconButton';

export interface BottomSheetProps extends Omit<DialogProps, 'position' | 'labelledBy' | 'describedBy'> {
    title?: string;
    onClose: () => void;
    children: ReactNode;
}

/** Mobile bottom sheet (used on the customer app). */
export function BottomSheet({ title, onClose, children, className, ...props }: BottomSheetProps) {
    const titleId = useId();

    return (
        <Dialog {...props} onClose={onClose} position="bottom" labelledBy={titleId} className={className}>
            <div aria-hidden className="mx-auto mt-3 h-1.5 w-10 rounded-full bg-line" />
            <div className="flex items-center justify-between gap-4 p-5 pb-0">
                {title ? (
                    <h2 id={titleId} className="text-lg font-semibold text-ink">
                        {title}
                    </h2>
                ) : (
                    <span />
                )}
                <IconButton label="Close" variant="ghost" size="md" icon={<X className="h-5 w-5" />} onClick={onClose} />
            </div>
            <div className="overflow-y-auto p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">{children}</div>
        </Dialog>
    );
}
