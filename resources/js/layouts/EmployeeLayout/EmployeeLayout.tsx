import { Outlet } from 'react-router-dom';

import { EmployeeHeader } from '@/components/layout/EmployeeHeader';
import { EmployeeSidebar } from '@/components/layout/EmployeeSidebar';
import { Drawer } from '@/components/ui';
import { useDisclosure } from '@/hooks/useDisclosure';
import { useMediaQuery } from '@/hooks/useMediaQuery';

/**
 * Desktop-first employee layout.
 * Desktop: persistent sidebar. Tablet/mobile: drawer navigation.
 */
export function EmployeeLayout() {
    const { isOpen, close, open } = useDisclosure(false);
    const isDesktop = useMediaQuery('(min-width: 1024px)');

    return (
        <div className="min-h-dvh bg-canvas lg:grid lg:grid-cols-[260px_1fr]">
            <aside className="hidden h-dvh border-r border-line bg-surface lg:sticky lg:top-0 lg:block">
                <EmployeeSidebar />
            </aside>

            {!isDesktop ? (
                <Drawer open={isOpen} onClose={close} className="w-full max-w-xs lg:hidden">
                    <EmployeeSidebar onNavigate={close} />
                </Drawer>
            ) : null}

            <div className="flex min-h-dvh flex-col">
                <EmployeeHeader onMenuClick={open} />
                <main id="main-content" className="flex-1 p-4 lg:p-6 xl:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
