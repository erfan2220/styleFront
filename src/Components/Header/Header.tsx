// components/Header.tsx or MainLayout.tsx
import Link from 'next/link';

const Header = () => {
    return (
        <header className="bg-gray-800 text-white p-4">
            <nav>
                <Link href="/">Home</Link>
                <Link href="/cart" className="ml-4">
                    Cart
                </Link>
            </nav>
        </header>
    );
};

export default Header;
