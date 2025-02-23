import { Link } from '@inertiajs/react';

export default function AppLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navigation Bar */}
            <nav className="bg-blue-500 p-4 shadow">
                <div className="container mx-auto flex justify-between items-center">
                    <Link href="/" className="text-white text-xl font-bold">E-Commerce</Link>
                    <ul className="flex space-x-6">
                        <li><Link href="/users" className="text-white hover:underline">Users</Link></li>
                        <li><Link href="/orders" className="text-white hover:underline">Orders</Link></li>
                        <li><Link href="/products" className="text-white hover:underline">Products</Link></li>
                        <li><Link href="/payments" className="text-white hover:underline">Payments</Link></li>
                        <li><Link href="/shipments" className="text-white hover:underline">Shipments</Link></li>
                    </ul>
                </div>
            </nav>

            {/* Main Content */}
            <main className="p-6">
                {children}
            </main>
        </div>
    );
}
