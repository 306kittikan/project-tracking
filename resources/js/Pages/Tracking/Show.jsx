import { Link } from "@inertiajs/react";

export default function TrackingShow({ tracking }) {
    return (
        <div className="min-h-screen bg-gray-100">
            {/*  Navbar */}
            <nav className="bg-gray-900 text-white p-4 shadow-lg">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-xl font-bold"> ระบบติดตามสินค้า</h1>
                    <ul className="flex space-x-6">
                        <li><Link href="/products" className="hover:text-gray-400">สินค้า</Link></li>
                        <li><Link href="/orders" className="hover:text-gray-400">คำสั่งซื้อ</Link></li>
                        <li><Link href="/users" className="hover:text-gray-400">ลูกค้า</Link></li>
                        <li><Link href="/tracking" className="hover:text-gray-400">ติดตามสินค้า</Link></li>
                    </ul>
                </div>
            </nav>

            {/*  รายละเอียดการติดตาม */}
            <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold mb-4"> สถานะการจัดส่ง</h1>
                
                {tracking?.order ? (
                    <>
                        <p className="text-gray-700 mb-2">
                            <strong>รหัสคำสั่งซื้อ:</strong> {tracking.order.order_code}
                        </p>
                        <p className="text-gray-700 mb-4">
                            <strong>ลูกค้า:</strong> {tracking.order.user?.name || "ไม่พบข้อมูลลูกค้า"}
                        </p>

                        {/*  รายการสินค้า */}
                        <h2 className="text-xl font-semibold mt-4">🛒 รายการสินค้า</h2>
                        <ul className="mt-2 border rounded-lg bg-gray-50">
                            {tracking.order.items && tracking.order.items.length > 0 ? (
                                tracking.order.items.map((item) => (
                                    <li key={item.id} className="border-b p-3 flex justify-between">
                                        <div>
                                            <span className="font-medium">{item.product?.name || "สินค้าหมด"}</span>
                                            <p className="text-sm text-gray-500">จำนวน: {item.quantity}</p>
                                        </div>
                                        <span className="text-sm font-bold">{(item.price * item.quantity).toFixed(2)} บาท</span>
                                    </li>
                                ))
                            ) : (
                                <li className="p-3 text-gray-500 text-center">ไม่มีสินค้าในคำสั่งซื้อ</li>
                            )}
                        </ul>

                        {/*  ประวัติการอัปเดตสถานะ */}
                        <h2 className="text-xl font-semibold mt-4"> ประวัติการอัปเดตสถานะ</h2>
                        <ul className="mt-2 border rounded-lg bg-gray-50">
                            {tracking.statuses && tracking.statuses.length > 0 ? (
                                tracking.statuses.map((item, index) => (
                                    <li key={item.id} className={`border-b p-3 flex justify-between ${index === 0 ? 'bg-green-100' : ''}`}>
                                        <span className="font-medium">{item.status}</span>
                                        <span className="text-sm text-gray-500">
                                            {new Date(item.updated_at).toLocaleString()}
                                        </span>
                                    </li>
                                ))
                            ) : (
                                <li className="p-3 text-gray-500 text-center">ไม่มีข้อมูลสถานะ</li>
                            )}
                        </ul>

                        {/*  ปุ่มแก้ไขสถานะ */}
                        <div className="mt-4 text-center">
                            <Link
                                href={`/tracking-statuses/${tracking.id}/edit`}
                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition"
                            >
                                 แก้ไขสถานะ
                            </Link>
                        </div>
                    </>
                ) : (
                    <p className="text-red-500 text-center">ไม่พบข้อมูลคำสั่งซื้อ</p>
                )}

                {/*  ปุ่มย้อนกลับ */}
                <div className="mt-6 flex justify-center">
                    <Link href="/tracking" className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg">
                         กลับไปหน้าติดตามสินค้า
                    </Link>
                </div>
            </div>
        </div>
    );
}
