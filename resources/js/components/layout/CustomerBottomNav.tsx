import { NavLink } from 'react-router-dom';

import { cn } from '@/utils/cn';
import { CUSTOMER_NAV_ITEMS } from '@/components/navigation/customerNavigation';

export function CustomerBottomNav() {
    return (
        <nav
            aria-label="Primary"
            className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/95 backdrop-blur"
        >
            <div className="mx-auto grid max-w-[480px] grid-cols-5 pb-[env(safe-area-inset-bottom)]">
                {CUSTOMER_NAV_ITEMS.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        aria-label={item.label}
                        className={({ isActive }) =>
                            cn(
                                'flex flex-col items-center justify-center gap-1 pt-2 pb-1.5 text-[11px] font-medium',
                                'transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-md',
                                isActive ? 'text-primary' : 'text-muted hover:text-ink',
                            )
                        }
                    >
                        <item.icon className="h-5 w-5" aria-hidden />
                        {item.label}
                    </NavLink>
                ))}
            </div>
        </nav>
    );
}
