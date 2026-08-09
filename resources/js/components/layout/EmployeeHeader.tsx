import { Bell, Menu, Search } from 'lucide-react';

import { Avatar, IconButton, Input } from '@/components/ui';

export interface EmployeeHeaderProps {
    onMenuClick: () => void;
}

export function EmployeeHeader({ onMenuClick }: EmployeeHeaderProps) {
    return (
        <header className="sticky top-0 z-40 border-b border-line bg-surface/90 backdrop-blur">
            <div className="flex h-16 items-center gap-3 px-4 lg:px-6">
                <IconButton
                    label="Open navigation"
                    variant="ghost"
                    icon={<Menu className="h-5 w-5" />}
                    onClick={onMenuClick}
                    className="lg:hidden"
                />
                <div className="hidden w-full max-w-sm sm:block">
                    <Input
                        aria-label="Search customers"
                        placeholder="Search customers, accounts…"
                        prefix={<Search className="h-4 w-4" />}
                        className="h-9 rounded-md"
                    />
                </div>
                <div className="ml-auto flex items-center gap-1">
                    <IconButton
                        label="Notifications"
                        variant="ghost"
                        icon={<Bell className="h-5 w-5" />}
                        badge={<span>3</span>}
                    />
                    <div className="ml-1 hidden items-center gap-2 md:flex">
                        <Avatar name="Bibek Karki" size="sm" />
                        <span className="text-sm font-medium text-ink">Bibek Karki</span>
                    </div>
                    <Avatar name="Bibek Karki" size="sm" className="md:hidden" />
                </div>
            </div>
        </header>
    );
}
