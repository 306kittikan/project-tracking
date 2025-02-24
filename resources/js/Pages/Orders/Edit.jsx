import { useForm } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";

export default function EditOrder({ order, statuses }) {
    const { data, setData, put, processing, errors } = useForm({
        status: order.status,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/orders/${order.id}`);
    };

    return (
        <Layout>
            <div className="max-w-lg sm:max-w-xl md:max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                    แก้ไขคำสั่งซื้อ <span className="text-blue-500">#{order.order_code}</span>
                </h1>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block font-medium text-gray-700 mb-1">สถานะคำสั่งซื้อ:</label>
                        <div className="relative">
                            <select
                                value={data.status}
                                onChange={(e) => setData("status", e.target.value)}
                                className="border border-gray-300 p-3 w-full rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 appearance-none text-gray-700"
                            >
                                {statuses.map((status) => (
                                    <option key={status} value={status}>{status}</option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                        {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>}
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-lg shadow-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={processing}
                        >
                            {processing ? "กำลังบันทึก..." : "บันทึกการเปลี่ยนแปลง"}
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
}
