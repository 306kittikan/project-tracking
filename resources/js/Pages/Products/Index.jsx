import { useEffect } from "react";
import { usePage, Link, useForm, router } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";

export default function ProductsIndex({ products }) {
    const { auth } = usePage().props;
    const { delete: destroy } = useForm();

    useEffect(() => {
        if (!auth.user) {
            router.get("/login");
        }
    }, []);

    return (
        <Layout>
            <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">📦 รายการสินค้า</h1>
                
                <p className="text-gray-600 text-center mb-4">สวัสดี, {auth.user.name} 👋</p>

                <div className="flex justify-end mb-4">
                    <Link href="/products/create" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow-md">
                        + เพิ่มสินค้า
                    </Link>
                </div>

                <table className="w-full border-collapse border border-gray-300 shadow-sm rounded-lg">
                    <thead>
                        <tr className="bg-gray-200 text-gray-700">
                            <th className="border p-3">#</th>
                            <th className="border p-3">รหัสสินค้า</th>
                            <th className="border p-3">ชื่อสินค้า</th>
                            <th className="border p-3">รายละเอียด</th>
                            <th className="border p-3">ราคา</th>
                            <th className="border p-3">จำนวน</th>
                            <th className="border p-3">จัดการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={product.id} className="border hover:bg-gray-100 transition">
                                <td className="border p-3 text-center">{index + 1}</td>
                                <td className="border p-3 font-mono text-center">{product.code}</td>
                                <td className="border p-3">{product.name}</td>
                                <td className="border p-3">{product.description || "-"}</td>
                                <td className="border p-3 text-center">{product.price} บาท</td>
                                <td className="border p-3 text-center">{product.stock}</td>
                                <td className="border p-3 flex justify-center space-x-4">
                                    <Link href={`/products/${product.id}/edit`} className="text-blue-600 hover:text-blue-800">
                                        ✏️ แก้ไข
                                    </Link>
                                    <button
                                        onClick={() => {
                                            if (confirm("คุณแน่ใจหรือไม่ว่าต้องการลบสินค้านี้?")) {
                                                destroy(`/products/${product.id}`);
                                            }
                                        }}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        🗑️ ลบ
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
}
