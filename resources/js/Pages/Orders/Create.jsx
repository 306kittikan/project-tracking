import { useState } from "react";
import { useForm } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";

export default function CreateOrder({ users, products }) {
    const { data, setData, post, errors } = useForm({
        user_id: "",
        products: [{ product_id: "", quantity: 1 }], // สินค้าหลายรายการ
        status: "pending",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/orders");
    };

    // ✅ เพิ่มสินค้าใหม่
    const addProduct = () => {
        setData("products", [...data.products, { product_id: "", quantity: 1 }]);
    };

    // ✅ ลบสินค้าออก
    const removeProduct = (index) => {
        const newProducts = data.products.filter((_, i) => i !== index);
        setData("products", newProducts);
    };

    // ✅ อัปเดตค่าของสินค้าแต่ละรายการ
    const updateProduct = (index, key, value) => {
        const newProducts = data.products.map((product, i) =>
            i === index ? { ...product, [key]: value } : product
        );
        setData("products", newProducts);
    };

    return (
        <Layout>
            <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">เพิ่มคำสั่งซื้อ</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    {/* ✅ เลือกลูกค้า */}
                    <div>
                        <label className="block font-semibold text-gray-700">ลูกค้า:</label>
                        <select
                            value={data.user_id}
                            onChange={(e) => setData("user_id", e.target.value)}
                            className="border p-2 w-full rounded shadow-sm focus:ring focus:ring-blue-300"
                        >
                            <option value="">เลือกลูกค้า</option>
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                        {errors.user_id && <p className="text-red-500 text-sm mt-1">{errors.user_id}</p>}
                    </div>

                    {/* ✅ รายการสินค้า */}
                    {data.products.map((product, index) => (
                        <div key={index} className="flex space-x-2 items-center">
                            <select
                                value={product.product_id}
                                onChange={(e) => updateProduct(index, "product_id", e.target.value)}
                                className="border p-2 w-full rounded shadow-sm focus:ring focus:ring-blue-300"
                            >
                                <option value="">เลือกสินค้า</option>
                                {products.map((p) => (
                                    <option key={p.id} value={p.id}>
                                        {p.name} - {p.price} บาท
                                    </option>
                                ))}
                            </select>
                            
                            <input
                                type="number"
                                value={product.quantity}
                                onChange={(e) => updateProduct(index, "quantity", e.target.value)}
                                className="border p-2 w-20 rounded shadow-sm focus:ring focus:ring-blue-300"
                                min="1"
                            />

                            {/* 🗑️ ปุ่มลบสินค้า */}
                            {data.products.length > 1 && (
                                <button type="button" onClick={() => removeProduct(index)} className="text-red-500">
                                    🗑️ ลบ
                                </button>
                            )}
                        </div>
                    ))}

                    {/*  ปุ่มเพิ่มสินค้า */}
                    <button type="button" onClick={addProduct} className="bg-green-500 text-white px-4 py-2 rounded shadow-md">
                         เพิ่มสินค้า
                    </button>

                    <div className="flex justify-center mt-4">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded shadow-md">
                            บันทึกคำสั่งซื้อ
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
}
