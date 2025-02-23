import { useForm } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";

export default function EditOrder({ order, statuses }) {
    const { data, setData, put, errors } = useForm({
        status: order.status,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/orders/${order.id}`);
    };

    return (
        <Layout>
            <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    แก้ไขคำสั่งซื้อ #{order.order_code}
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block font-semibold text-gray-700">สถานะคำสั่งซื้อ:</label>
                        <select
                            value={data.status}
                            onChange={(e) => setData("status", e.target.value)}
                            className="border p-2 w-full rounded shadow-sm focus:ring focus:ring-blue-300"
                        >
                            {statuses.map((status) => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                        {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>}
                    </div>

                    <div className="flex justify-center">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded shadow-md">
                            บันทึกการเปลี่ยนแปลง
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
}