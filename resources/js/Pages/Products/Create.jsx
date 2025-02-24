import { useForm } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";

export default function CreateProduct() {
    const { data, setData, post, processing, errors } = useForm({
        code: "",
        name: "",
        price: "",
        stock: "",
        description: "",
        created_at: new Date().toISOString().split("T")[0], //  เพิ่มค่าเริ่มต้นวันที่วันนี้
    });

    function handleSubmit(e) {
        e.preventDefault();
        post("/products");
    }

    return (
        <Layout>
            <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center"> เพิ่มสินค้า</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    {/* ใช้ Grid Layout */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <input
                                type="text"
                                placeholder="รหัสสินค้า"
                                value={data.code}
                                onChange={(e) => setData("code", e.target.value)}
                                className="border p-2 w-full rounded shadow-sm focus:ring focus:ring-blue-300"
                                required
                            />
                            {errors.code && <p className="text-red-500 text-sm">{errors.code}</p>}
                        </div>

                        <div>
                            <input
                                type="text"
                                placeholder="ชื่อสินค้า"
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                className="border p-2 w-full rounded shadow-sm focus:ring focus:ring-blue-300"
                                required
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                        </div>
                    </div>

                    <textarea
                        placeholder="รายละเอียดสินค้า"
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        className="border p-2 w-full rounded shadow-sm focus:ring focus:ring-blue-300"
                        rows="3"
                    />

                    {/* ใช้ Grid Layout */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <input
                                type="number"
                                placeholder="ราคา"
                                value={data.price}
                                onChange={(e) => setData("price", e.target.value)}
                                className="border p-2 w-full rounded shadow-sm focus:ring focus:ring-blue-300"
                                required
                            />
                            {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
                        </div>

                        <div>
                            <input
                                type="number"
                                placeholder="จำนวน"
                                value={data.stock}
                                onChange={(e) => setData("stock", e.target.value)}
                                className="border p-2 w-full rounded shadow-sm focus:ring focus:ring-blue-300"
                                required
                            />
                            {errors.stock && <p className="text-red-500 text-sm">{errors.stock}</p>}
                        </div>
                    </div>

                    {/*  เพิ่มช่องเลือกวันที่เพิ่มสินค้า */}
                    <div>
                        <label className="block text-gray-700">วันที่เพิ่มสินค้า</label>
                        <input
                            type="date"
                            value={data.created_at}
                            onChange={(e) => setData("created_at", e.target.value)}
                            className="border p-2 w-full rounded shadow-sm focus:ring focus:ring-blue-300"
                        />
                    </div>

                    <div className="flex justify-center">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded shadow-md w-full sm:w-auto" disabled={processing}>
                            {processing ? "กำลังบันทึก..." : "บันทึก"}
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
}
