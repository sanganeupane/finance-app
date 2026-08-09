import { useId, useRef, type KeyboardEvent } from 'react';

import { cn } from '@/utils/cn';

export interface TabItem {
    value: string;
    label: string;
    disabled?: boolean;
}

export interface TabsProps {
    items: TabItem[];
    value: string;
    onValueChange: (value: string) => void;
    id?: string;
    className?: string;
}

/**
 * Accessible tablist: arrow-key navigation, `aria-selected`, labelled panels.
 * Render matching panels outside with `<TabPanel id={...} />`.
 */
export function Tabs({ items, value, onValueChange, id: idProp, className }: TabsProps) {
    const autoId = useId();
    const id = idProp ?? autoId;
    const refs = useRef<Array<HTMLButtonElement | null>>([]);

    const focusTab = (index: number) => {
        refs.current[index]?.focus();
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
        const last = items.length - 1;
        const next = {
            ArrowDown: () => focusTab(Math.min(index + 1, last)),
            ArrowRight: () => focusTab(Math.min(index + 1, last)),
            ArrowUp: () => focusTab(Math.max(index - 1, 0)),
            ArrowLeft: () => focusTab(Math.max(index - 1, 0)),
            Home: () => focusTab(0),
            End: () => focusTab(last),
        } as const;

        const action = next[event.key as keyof typeof next];
        if (action) {
            event.preventDefault();
            action();
        }
    };

    return (
        <div role="tablist" aria-label="Tabs" className={cn('flex w-fit gap-1 rounded-md bg-canvas p-1', className)}>
            {items.map((item, index) => {
                const selected = item.value === value;
                return (
                    <button
                        key={item.value}
                        ref={(el) => {
                            refs.current[index] = el;
                        }}
                        role="tab"
                        id={`${id}-tab-${item.value}`}
                        aria-selected={selected}
                        aria-controls={`${id}-panel-${item.value}`}
                        tabIndex={selected ? 0 : -1}
                        disabled={item.disabled}
                        onClick={() => onValueChange(item.value)}
                        onKeyDown={(event) => handleKeyDown(event, index)}
                        className={cn(
                            'h-9 rounded px-4 text-sm font-medium transition-colors duration-150',
                            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
                            selected ? 'bg-surface text-primary shadow-sm' : 'text-muted hover:text-ink',
                            item.disabled && 'cursor-not-allowed opacity-50',
                        )}
                    >
                        {item.label}
                    </button>
                );
            })}
        </div>
    );
}

interface TabPanelProps {
    id: string;
    value: string;
    children: React.ReactNode;
}

export function TabPanel({ id, value, children }: TabPanelProps) {
    return (
        <div
            role="tabpanel"
            id={`${id}-panel-${value}`}
            aria-labelledby={`${id}-tab-${value}`}
            tabIndex={0}
            className="outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-md"
        >
            {children}
        </div>
    );
}
