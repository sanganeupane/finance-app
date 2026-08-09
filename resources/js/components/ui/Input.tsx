import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';

import { cn } from '@/utils/cn';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
    label?: string;
    error?: string;
    hint?: string;
    prefix?: ReactNode;
    suffix?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, hint, prefix, suffix, id: idProp, disabled, ...props }, ref) => {
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
                    {prefix ? (
                        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted">
                            {prefix}
                        </span>
                    ) : null}
                    <input
                        ref={ref}
                        id={id}
                        disabled={disabled}
                        aria-invalid={error ? true : undefined}
                        aria-describedby={describedBy}
                        className={cn(
                            'h-11 w-full rounded-md border border-line bg-surface px-3 text-ink placeholder:text-muted/70',
                            'transition-colors duration-150 outline-none',
                            'focus:border-primary focus:ring-2 focus:ring-primary/20',
                            'disabled:cursor-not-allowed disabled:bg-canvas disabled:text-muted',
                            prefix && 'pl-9',
                            suffix && 'pr-9',
                            error && 'border-danger focus:border-danger focus:ring-danger/20',
                            className,
                        )}
                        {...props}
                    />
                    {suffix ? (
                        <span className="absolute inset-y-0 right-3 flex items-center text-muted">{suffix}</span>
                    ) : null}
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

Input.displayName = 'Input';
