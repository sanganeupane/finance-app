import { NavLink } from 'react-router-dom';

import { APP_NAME } from '@/constants';
import { cn } from '@/utils/cn';
import { EMPLOYEE_NAV_ITEMS } from '@/components/navigation/employeeNavigation';

export interface EmployeeSidebarProps {
    onNavigate?: () => void;
}

export function EmployeeSidebar({ onNavigate }: EmployeeSidebarProps) {
    return (
        <div className="flex h-full flex-col">
            <div className="flex h-16 items-center gap-2 border-b border-line px-5">
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-sm font-bold text-white">
                    S
                </span>
                <div className="leading-tight">
                    <p className="text-sm font-semibold text-ink">{APP_NAME}</p>
                    <p className="text-[11px] text-muted">Employee Portal</p>
                </div>
            </div>
            <nav aria-label="Employee" className="scrollbar-thin flex-1 overflow-y-auto px-3 py-4">
                <ul className="flex flex-col gap-1">
                    {EMPLOYEE_NAV_ITEMS.map((item) => (
                        <li key={item.path}>
                            <NavLink
                                to={item.path}
                                onClick={onNavigate}
                                className={({ isActive }) =>
                                    cn(
                                        'flex h-11 items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors duration-150',
                                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
                                        isActive
                                            ? 'bg-primary-soft text-primary-dark'
                                            : 'text-muted hover:bg-canvas hover:text-ink',
                                    )
                                }
                            >
                                <item.icon className="h-5 w-5 shrink-0" aria-hidden />
                                {item.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="border-t border-line p-4">
                <p className="text-xs text-muted">AI Customer 360 · Phase 1</p>
            </div>
        </div>
    );
}
