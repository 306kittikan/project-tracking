import { Link, useForm } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";

export default function OrderDetails({ order }) {
    const { delete: destroy, put, processing } = useForm();

    const handleDelete = () => {
        if (confirm("คุณต้องการลบคำสั่งซื้อนี้ใช่หรือไม่?")) {
            destroy(`/orders/${order.id}`);
        }
    };

    const togglePaymentStatus = () => {
        put(`/orders/${order.id}/toggle-payment`, {
            onSuccess: () => alert("อัปเดตสถานะการชำระเงินเรียบร้อย!"),
        });
    };

    return (
        <Layout>
            <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    รายละเอียดคำสั่งซื้อ #{order.order_code}
                </h1>

                <div className="bg-gray-100 p-6 rounded-lg shadow">
                    <p className="text-lg"><strong>ลูกค้า:</strong> {order.user.name}</p>
                    <p className="text-lg"><strong>สถานะ:</strong> {order.status}</p>
                    <p className="text-lg">
                        <strong>สถานะการชำระเงิน:</strong>
                        <span className={`font-semibold ml-2 ${order.status === "completed" || order.payment_status === "paid" ? "text-green-600" : "text-red-600"}`}>
                            {order.status === "completed" || order.payment_status === "paid" ? "ชำระเงินแล้ว" : "ยังไม่ชำระ"}
                        </span>

                        <button
                            onClick={togglePaymentStatus}
                            className="ml-4 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded shadow text-sm"
                            disabled={processing}
                        >
                            {processing ? "กำลังเปลี่ยน..." : "เปลี่ยนสถานะ"}
                        </button>
                    </p>
                    <p className="text-lg">
                        <strong>ยอดรวม:</strong> {order.products.reduce((sum, product) => sum + (product.price * product.pivot.quantity), 0).toFixed(2)} บาท
                    </p>
                </div>

                <h2 className="text-2xl font-bold mt-6">🛒 รายการสินค้า</h2>
                <ul className="bg-white shadow-md rounded-lg p-4 mt-2">
                    {order.products.map((product) => (
                        <li key={product.id} className="border-b last:border-none p-4 flex justify-between">
                            <span>{product.name} - {parseFloat(product.price).toFixed(2)} บาท (x{product.pivot.quantity})</span>
                        </li>
                    ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-2 justify-center">
                    <Link href="/orders" className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded shadow">
                        กลับไปยังรายการคำสั่งซื้อ
                    </Link>
                    <Link href={`/orders/${order.id}/edit`} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow">
                        แก้ไขคำสั่งซื้อ
                    </Link>
                    <button
                        onClick={handleDelete}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow"
                        disabled={processing}
                    >
                        {processing ? "กำลังลบ..." : "ลบคำสั่งซื้อ"}
                    </button>
                </div>
            </div>
        </Layout>
    );
}
