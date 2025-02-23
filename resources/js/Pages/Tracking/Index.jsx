import { Link, useForm } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";

export default function TrackingIndex({ trackings }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm("คุณต้องการลบสถานะนี้ใช่หรือไม่?")) {
            destroy(`/tracking-statuses/${id}`, {
                onSuccess: () => alert("ลบสถานะสำเร็จ!"), // แจ้งเตือนเมื่อสำเร็จ
            });
        }
    };

    return (
        <Layout>
            <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold mb-4">สถานะการจัดส่ง</h2>

                {trackings.length > 0 ? (
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-700 text-white">
                                <th className="p-3 text-left">รหัสคำสั่งซื้อ</th>
                                <th className="p-3 text-left">ลูกค้า</th>
                                <th className="p-3 text-left">สถานะ</th>
                                <th className="p-3 text-center">จัดการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trackings.map((tracking) => (
                                <tr key={tracking.id} className="border-b hover:bg-gray-100">
                                    <td className="p-3">{tracking.order?.order_code}</td>
                                    <td className="p-3">{tracking.order?.user?.name || "ไม่พบข้อมูล"}</td>
                                    <td className="p-3">{tracking.status}</td>
                                    <td className="p-3 text-center">
                                        <Link
                                            href={`/tracking-statuses/${tracking.id}/edit`}
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mx-1"
                                        >
                                            แก้ไข
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(tracking.id)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                        >
                                            ลบ
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-gray-500 text-center py-6">🚫 ไม่มีข้อมูลสถานะการจัดส่ง</p>
                )}

                <div className="mt-4 text-center">
                    <Link
                        href="/tracking-statuses/create"
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                    >
                        + เพิ่มสถานะการจัดส่ง
                    </Link>
                </div>
            </div>
        </Layout>
    );
}
