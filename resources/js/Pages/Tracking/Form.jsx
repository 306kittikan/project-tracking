import { useForm } from "@inertiajs/react";
import { Link } from "@inertiajs/react";

export default function TrackingForm({ tracking = null, orders }) {
    const { data, setData, post, put, processing, errors } = useForm({
        order_id: tracking?.order_id || "",
        status: tracking?.status || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        tracking ? put(`/tracking-statuses/${tracking.id}`) : post("/tracking-statuses");
    };

    const statusOptions = [
        "รอดำเนินการ",
        "จัดส่งแล้ว",
        "ถึงปลายทาง",
        "ยกเลิกคำสั่งซื้อ",
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            {/*  Navbar */}
            <nav className="bg-gray-900 text-white p-4 shadow-lg">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-xl font-bold">📦 ระบบติดตามสินค้า</h1>
                    <ul className="flex space-x-6">
                        <li><Link href="/products" className="hover:text-gray-400">สินค้า</Link></li>
                        <li><Link href="/orders" className="hover:text-gray-400">คำสั่งซื้อ</Link></li>
                        <li><Link href="/users" className="hover:text-gray-400">ลูกค้า</Link></li>
                        <li><Link href="/tracking" className="hover:text-gray-400">ติดตามสินค้า</Link></li>
                    </ul>
                </div>
            </nav>

            {/*  ฟอร์มเพิ่ม/แก้ไขสถานะ */}
            <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
                <h2 className="text-2xl font-bold mb-4 text-center">{tracking ? "แก้ไขสถานะ" : "เพิ่มสถานะ"}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/*  เลือกคำสั่งซื้อ */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">เลือกคำสั่งซื้อ</label>
                        <select
                            value={data.order_id}
                            onChange={(e) => setData("order_id", e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                            required
                        >
                            <option value="">-- เลือกคำสั่งซื้อ --</option>
                            {orders.map((order) => (
                                <option key={order.id} value={order.id}>
                                    {order.order_code} - {order.user?.name}
                                </option>
                            ))}
                        </select>
                        {errors.order_id && <p className="text-red-500 text-sm">{errors.order_id}</p>}
                    </div>

                    {/*  สถานะการจัดส่ง (Dropdown) */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">สถานะการจัดส่ง</label>
                        <select
                            value={data.status}
                            onChange={(e) => setData("status", e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                            required
                        >
                            <option value="">-- เลือกสถานะ --</option>
                            {statusOptions.map((status) => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                        {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
                    </div>

                    {/*  ปุ่ม Submit & Cancel */}
                    <div className="flex justify-between">
                        <button
                            type="submit"
                            className="w-1/2 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
                            disabled={processing}
                        >
                            {processing ? "กำลังบันทึก..." : tracking ? "อัปเดต" : "บันทึก"}
                        </button>
                        <Link
                            href="/tracking"
                            className="w-1/2 text-center bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg transition ml-2"
                        >
                            ยกเลิก
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
