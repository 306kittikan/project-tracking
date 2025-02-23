import { useForm } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";

export default function EditProduct({ product }) {
    const { data, setData, put, processing } = useForm({
        code: product.code,
        name: product.name,
        price: product.price,
        stock: product.stock,
        description: product.description || "", // ✅ เพิ่ม description
    });

    function handleSubmit(e) {
        e.preventDefault();
        put(`/products/${product.id}`);
    }

    return (
        <Layout>
            <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">✏️ แก้ไขสินค้า</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="รหัสสินค้า"
                        value={data.code}
                        onChange={(e) => setData("code", e.target.value)}
                        className="border p-2 w-full rounded shadow-sm focus:ring focus:ring-green-300"
                        required
                    />
                    <input
                        type="text"
                        placeholder="ชื่อสินค้า"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="border p-2 w-full rounded shadow-sm focus:ring focus:ring-green-300"
                        required
                    />
                    <textarea
                        placeholder="รายละเอียดสินค้า"
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        className="border p-2 w-full rounded shadow-sm focus:ring focus:ring-green-300"
                        rows="3"
                    />
                    <input
                        type="number"
                        placeholder="ราคา"
                        value={data.price}
                        onChange={(e) => setData("price", e.target.value)}
                        className="border p-2 w-full rounded shadow-sm focus:ring focus:ring-green-300"
                        required
                    />
                    <input
                        type="number"
                        placeholder="จำนวน"
                        value={data.stock}
                        onChange={(e) => setData("stock", e.target.value)}
                        className="border p-2 w-full rounded shadow-sm focus:ring focus:ring-green-300"
                        required
                    />
                    <div className="flex justify-center">
                        <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded shadow-md" disabled={processing}>
                            {processing ? "กำลังอัปเดต..." : "อัปเดต"}
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
}
