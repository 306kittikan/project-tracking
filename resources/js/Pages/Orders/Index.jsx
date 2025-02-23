import { usePage, Link, useForm } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";

export default function OrdersIndex({ orders }) {
    const { auth } = usePage().props; // ดึงข้อมูลผู้ใช้ที่ล็อกอินอยู่
    const { delete: destroy } = useForm();

    if (!auth.user) {
        window.location.href = "/login"; // ถ้ายังไม่ได้ล็อกอินให้ redirect ไปหน้า Login
        return null;
    }

    const handleDelete = (orderId) => {
        if (confirm("คุณแน่ใจหรือไม่ว่าต้องการลบคำสั่งซื้อนี้?")) {
            destroy(`/orders/${orderId}`);
        }
    };

    return (
        <Layout>
            <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">📜 รายการคำสั่งซื้อ</h1>
                
                <p className="text-gray-600 text-center mb-4">สวัสดี, {auth.user.name} 👋</p> {/* แสดงชื่อผู้ใช้ที่ล็อกอิน */}

                <div className="flex justify-end mb-4">
                    <Link href="/orders/create" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow">
                        + เพิ่มคำสั่งซื้อ
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse shadow-lg rounded-lg overflow-hidden">
                        <thead>
                            <tr className="bg-gray-700 text-white">
                                <th className="p-3 text-left">#</th>
                                <th className="p-3 text-left">รหัสคำสั่งซื้อ</th>
                                <th className="p-3 text-left">ลูกค้า</th>
                                <th className="p-3 text-left">สถานะ</th>
                                <th className="p-3 text-right">ยอดรวม</th>
                                <th className="p-3 text-center">จัดการ</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-300">
                            {orders.map((order, index) => (
                                <tr key={order.id} className="hover:bg-gray-100">
                                    <td className="p-3">{index + 1}</td>
                                    <td className="p-3">{order.order_code}</td>
                                    <td className="p-3">{order.user?.name || "ไม่มีข้อมูล"}</td>
                                    <td className="p-3 text-center">
                                        <span className={`px-3 py-1 rounded-full text-white text-sm ${
                                            order.status === "pending" ? "bg-yellow-500" :
                                            order.status === "completed" ? "bg-green-500" :
                                            "bg-red-500"
                                        }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    {/* ตั้งค่าทศนิยม 2 ตำแหน่ง */}
                                    <td className="p-3 text-right">
                                        {order.products.reduce((sum, product) => sum + (product.price * product.pivot.quantity), 0).toFixed(2)} บาท
                                    </td>

                                    <td className="p-3 text-center flex gap-2 justify-center">
                                        <Link href={`/orders/${order.id}`} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded shadow text-sm">
                                            ดูรายละเอียด
                                        </Link>
                                        <Link href={`/orders/${order.id}/edit`} className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded shadow text-sm">
                                            ✏️แก้ไข
                                        </Link>
                                        <button 
                                            onClick={() => handleDelete(order.id)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow text-sm"
                                        >
                                            🗑️ลบ
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
}
