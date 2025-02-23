import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ stats }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold text-gray-900">📊 Dashboard</h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* การ์ดแสดงสถิติ */}
                        <div className="bg-white p-6 shadow-lg rounded-lg text-center">
                            <h3 className="text-lg font-semibold text-gray-700">🛒 คำสั่งซื้อ</h3>
                            <p className="text-3xl font-bold text-indigo-600">{stats.orders}</p>
                        </div>
                        <div className="bg-white p-6 shadow-lg rounded-lg text-center">
                            <h3 className="text-lg font-semibold text-gray-700">📦 สินค้า</h3>
                            <p className="text-3xl font-bold text-green-600">{stats.products}</p>
                        </div>
                        <div className="bg-white p-6 shadow-lg rounded-lg text-center">
                            <h3 className="text-lg font-semibold text-gray-700">👤 ลูกค้า</h3>
                            <p className="text-3xl font-bold text-blue-600">{stats.users}</p>
                        </div>
                        <div className="bg-white p-6 shadow-lg rounded-lg text-center">
                            <h3 className="text-lg font-semibold text-gray-700">💰 รายได้รวม</h3>
                            <p className="text-3xl font-bold text-red-600">฿{stats.revenue.toFixed(2)}</p>
                        </div>
                    </div>

                    {/* กล่องแสดงข้อความต้อนรับ */}
                    <div className="mt-8 bg-white p-6 shadow-md rounded-lg text-center">
                        <h2 className="text-xl font-semibold text-gray-800">🎉 ยินดีต้อนรับ!</h2>
                        <p className="text-gray-600 mt-2">คุณเข้าสู่ระบบเรียบร้อยแล้ว</p>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
