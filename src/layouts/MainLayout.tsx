'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    // Now useSelector is safe to use here since it's a client component
    const totalQuantity = useSelector((state: RootState) => state.cart.totalQuantity);

    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-blue-600 text-white p-4">
                <div>Total Items in Cart: {totalQuantity}</div>
            </header>
            <main>{children}</main>
        </div>
    );
}
