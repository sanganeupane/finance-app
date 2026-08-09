import { forwardRef, useId, type SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';

import { cn } from '@/utils/cn';

export interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    hint?: string;
    options: SelectOption[];
    placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ className, label, error, hint, options, placeholder, id: idProp, disabled, ...props }, ref) => {
        const autoId = useId();
        const id = idProp ?? autoId;
        const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

        return (
            <div className="flex flex-col gap-1.5">
                {label ? (
                    <label htmlFor={id} className="text-sm font-medium text-ink">
                        {label}
                    </label>
                ) : null}
                <div className="relative">
                    <select
                        ref={ref}
                        id={id}
                        disabled={disabled}
                        aria-invalid={error ? true : undefined}
                        aria-describedby={describedBy}
                        className={cn(
                            'h-11 w-full appearance-none rounded-md border border-line bg-surface px-3 pr-10 text-ink',
                            'transition-colors duration-150 outline-none',
                            'focus:border-primary focus:ring-2 focus:ring-primary/20',
                            'disabled:cursor-not-allowed disabled:bg-canvas disabled:text-muted',
                            error && 'border-danger focus:border-danger focus:ring-danger/20',
                            className,
                        )}
                        {...props}
                    >
                        {placeholder ? <option value="">{placeholder}</option> : null}
                        {options.map((option) => (
                            <option key={option.value} value={option.value} disabled={option.disabled}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <ChevronDown
                        aria-hidden
                        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
                    />
                </div>
                {error ? (
                    <p id={`${id}-error`} role="alert" className="text-sm text-danger">
                        {error}
                    </p>
                ) : hint ? (
                    <p id={`${id}-hint`} className="text-sm text-muted">
                        {hint}
                    </p>
                ) : null}
            </div>
        );
    },
);

Select.displayName = 'Select';
