import { Outlet } from 'react-router-dom';

import { CustomerBottomNav } from '@/components/layout/CustomerBottomNav';
import { CustomerHeader } from '@/components/layout/CustomerHeader';

/**
 * Mobile-first customer layout.
 * Header + centered content + bottom navigation.
 */
export function CustomerLayout() {
    return (
        <div className="min-h-dvh bg-canvas">
            <CustomerHeader />
            <main id="main-content" className="mx-auto w-full max-w-[480px] px-4 pb-28 pt-4">
                <Outlet />
            </main>
            <CustomerBottomNav />
        </div>
    );
}
