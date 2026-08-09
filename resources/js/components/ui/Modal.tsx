import { useId, type ReactNode } from 'react';
import { X } from 'lucide-react';

import { Dialog, type DialogProps } from './Dialog';
import { IconButton } from './IconButton';

export interface ModalProps extends Omit<DialogProps, 'position' | 'labelledBy' | 'describedBy'> {
    title: string;
    description?: string;
    onClose: () => void;
    footer?: ReactNode;
}

export function Modal({ title, description, onClose, children, footer, className, ...props }: ModalProps) {
    const titleId = useId();
    const bodyId = useId();

    return (
        <Dialog
            {...props}
            onClose={onClose}
            position="center"
            labelledBy={titleId}
            describedBy={description ? bodyId : undefined}
            className={className}
        >
            <div className="flex items-start justify-between gap-4 p-5 pb-0">
                <div className="min-w-0">
                    <h2 id={titleId} className="text-lg font-semibold text-ink">
                        {title}
                    </h2>
                    {description ? (
                        <p id={bodyId} className="mt-1 text-sm text-muted">
                            {description}
                        </p>
                    ) : null}
                </div>
                <IconButton label="Close" variant="ghost" size="md" icon={<X className="h-5 w-5" />} onClick={onClose} />
            </div>
            <div className="overflow-y-auto p-5">{children}</div>
            {footer ? <div className="flex items-center justify-end gap-3 border-t border-line p-5 pt-4">{footer}</div> : null}
        </Dialog>
    );
}
