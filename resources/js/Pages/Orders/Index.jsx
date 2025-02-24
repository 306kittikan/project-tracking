import { usePage, Link, useForm } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";

export default function OrdersIndex({ orders }) {
    const { auth } = usePage().props;
    const { delete: destroy } = useForm();

    if (!auth.user) {
        return (
            <Layout>
                <div className="text-center py-10">
                    <p className="text-lg text-gray-600"> คุณต้องเข้าสู่ระบบเพื่อดูคำสั่งซื้อ</p>
                    <Link href="/login" className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow">
                         เข้าสู่ระบบ
                    </Link>
                </div>
            </Layout>
        );
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

                <div className="flex justify-end mb-4">
                    <Link href="/orders/create" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow">
                         เพิ่มคำสั่งซื้อ
                    </Link>
                </div>

                {/*  เพิ่ม div ครอบตารางเพื่อให้ scroll ได้ในมือถือ */}
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px] border-collapse shadow-lg rounded-lg overflow-hidden">
                        <thead>
                            <tr className="bg-gray-700 text-white">
                                <th className="p-3 text-left">#</th>
                                <th className="p-3 text-left">รหัสคำสั่งซื้อ</th>
                                <th className="p-3 text-left">ลูกค้า</th>
                                <th className="p-3 text-center">สถานะ</th>
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
                                            order.status === "canceled" ? "bg-red-500" :     
                                            order.status === "pending" ? "bg-yellow-500" :    
                                            order.status === "completed" ? "bg-green-500" :   
                                            order.status === "shipped" ? "bg-blue-500" :      
                                            "bg-gray-500"                                     
                                        }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="p-3 text-right">
                                        {order.products.reduce((sum, product) => sum + (product.price * product.pivot.quantity), 0).toFixed(2)} บาท
                                    </td>

                                    {/*  ปรับปุ่มให้ stack บนมือถือ */}
                                    <td className="p-3 text-center">
                                        <div className="flex flex-col sm:flex-row gap-2 justify-center">
                                            <Link href={`/orders/${order.id}`} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded shadow text-sm">
                                                ดูรายละเอียด
                                            </Link>
                                            <Link href={`/orders/${order.id}/edit`} className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded shadow text-sm">
                                                แก้ไข
                                            </Link>
                                            <button 
                                                onClick={() => handleDelete(order.id)}
                                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow text-sm"
                                            >
                                                ลบ
                                            </button>
                                        </div>
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
