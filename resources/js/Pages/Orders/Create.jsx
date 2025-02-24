import { useState } from "react";
import { useForm } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";

export default function CreateOrder({ users, products }) {
    const { data, setData, post, errors } = useForm({
        user_id: "",
        products: [{ product_id: "", quantity: 1 }],
        status: "pending",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/orders");
    };

    const addProduct = () => {
        setData("products", [...data.products, { product_id: "", quantity: 1 }]);
    };

    const removeProduct = (index) => {
        const newProducts = data.products.filter((_, i) => i !== index);
        setData("products", newProducts);
    };

    const updateProduct = (index, key, value) => {
        const newProducts = data.products.map((product, i) =>
            i === index ? { ...product, [key]: value } : product
        );
        setData("products", newProducts);
    };

    return (
        <Layout>
            <div className="max-w-lg sm:max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">เพิ่มคำสั่งซื้อ</h1>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/*  เลือกลูกค้า */}
                    <div>
                        <label className="block font-medium text-gray-700 mb-1">ลูกค้า:</label>
                        <div className="relative max-w-xs sm:max-w-md">
                            <select
                                value={data.user_id}
                                onChange={(e) => setData("user_id", e.target.value)}
                                className="border border-gray-300 h-12 w-full rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 pr-8"
                            >
                                <option value="">เลือกลูกค้า</option>
                                {users.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {errors.user_id && <p className="text-red-500 text-sm mt-1">{errors.user_id}</p>}
                    </div>

                    {/*  รายการสินค้า */}
                    {data.products.map((product, index) => (
                        <div key={index} className="flex space-x-2 items-center">
                            <div className="relative w-full">
                                <select
                                    value={product.product_id}
                                    onChange={(e) => updateProduct(index, "product_id", e.target.value)}
                                    className="border border-gray-300 h-12 w-full rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 pr-8"
                                >
                                    <option value="">เลือกสินค้า</option>
                                    {products.map((p) => (
                                        <option key={p.id} value={p.id}>
                                            {p.name} - {p.price} บาท
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <input
                                type="number"
                                value={product.quantity}
                                onChange={(e) => updateProduct(index, "quantity", e.target.value)}
                                className="border border-gray-300 h-12 w-20 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-center"
                                min="1"
                            />

                            {/*  ปุ่มลบสินค้า */}
                            {data.products.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeProduct(index)}
                                    className="text-red-500 hover:text-red-600 transition"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    ))}

                    {/*  ปุ่มเพิ่มสินค้า */}
                    <button
                        type="button"
                        onClick={addProduct}
                        className="bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded-lg shadow-md transition-all duration-300"
                    >
                         เพิ่มสินค้า
                    </button>

                    <div className="flex justify-center mt-4">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-lg shadow-md transition-all duration-300"
                        >
                            บันทึกคำสั่งซื้อ
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
}
