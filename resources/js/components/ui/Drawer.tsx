import { useId, type ReactNode } from 'react';
import { X } from 'lucide-react';

import { Dialog, type DialogProps } from './Dialog';
import { IconButton } from './IconButton';

export interface DrawerProps extends Omit<DialogProps, 'position' | 'labelledBy' | 'describedBy'> {
    title?: string;
    onClose: () => void;
    children: ReactNode;
}

/** Right-hand panel. For mobile it becomes a full-width sheet. */
export function Drawer({ title, onClose, children, className, ...props }: DrawerProps) {
    const titleId = useId();

    return (
        <Dialog {...props} onClose={onClose} position="right" labelledBy={titleId} className={className}>
            {title ? (
                <div className="flex items-center justify-between gap-4 border-b border-line p-5">
                    <h2 id={titleId} className="text-lg font-semibold text-ink">
                        {title}
                    </h2>
                    <IconButton label="Close" variant="ghost" size="md" icon={<X className="h-5 w-5" />} onClick={onClose} />
                </div>
            ) : null}
            <div className="flex-1 overflow-y-auto p-5">{children}</div>
        </Dialog>
    );
}
