import { Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button, EmptyState } from '@/components/ui';

export default function NotFoundPage() {
    return (
        <div className="flex min-h-dvh items-center justify-center bg-canvas p-4">
            <EmptyState
                icon={<Compass className="h-10 w-10" aria-hidden />}
                title="Page not found"
                description="The page you are looking for does not exist or has moved."
                action={
                    <Link to="/customer/home">
                        <Button>Go to home</Button>
                    </Link>
                }
            />
        </div>
    );
}
