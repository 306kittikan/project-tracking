import { useForm } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";

export default function CreateProduct() {
    const { data, setData, post, processing } = useForm({
        code: "",
        name: "",
        price: "",
        stock: "",
        description: "", // ✅ เพิ่ม description
    });

    function handleSubmit(e) {
        e.preventDefault();
        post("/products");
    }

    return (
        <Layout>
            <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">➕ เพิ่มสินค้า</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="รหัสสินค้า"
                        value={data.code}
                        onChange={(e) => setData("code", e.target.value)}
                        className="border p-2 w-full rounded shadow-sm focus:ring focus:ring-blue-300"
                        required
                    />
                    <input
                        type="text"
                        placeholder="ชื่อสินค้า"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="border p-2 w-full rounded shadow-sm focus:ring focus:ring-blue-300"
                        required
                    />
                    <textarea
                        placeholder="รายละเอียดสินค้า"
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        className="border p-2 w-full rounded shadow-sm focus:ring focus:ring-blue-300"
                        rows="3"
                    />
                    <input
                        type="number"
                        placeholder="ราคา"
                        value={data.price}
                        onChange={(e) => setData("price", e.target.value)}
                        className="border p-2 w-full rounded shadow-sm focus:ring focus:ring-blue-300"
                        required
                    />
                    <input
                        type="number"
                        placeholder="จำนวน"
                        value={data.stock}
                        onChange={(e) => setData("stock", e.target.value)}
                        className="border p-2 w-full rounded shadow-sm focus:ring focus:ring-blue-300"
                        required
                    />
                    <div className="flex justify-center">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded shadow-md" disabled={processing}>
                            {processing ? "กำลังบันทึก..." : "บันทึก"}
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
}
