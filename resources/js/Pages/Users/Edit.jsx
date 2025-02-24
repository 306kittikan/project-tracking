import { useForm } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import { useState } from "react";

export default function EditUser({ user }) {
    const { data, setData, put, processing } = useForm({
        name: user.name,
        email: user.email,
    });

    const [updated, setUpdated] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        put(`/users/${user.id}`, {
            onSuccess: () => setUpdated(true),
        });
    }

    return (
        <Layout>
            <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-lg">
                <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center"> แก้ไขผู้ใช้</h1>

                {/*  ปุ่มย้อนกลับ */}
                <div className="mb-4">
                    <a 
                        href="/users" 
                        className="text-gray-600 hover:text-gray-800 transition flex items-center"
                    >
                         กลับไปหน้าผู้ใช้
                    </a>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium">ชื่อ</label>
                        <input
                            type="text"
                            placeholder="ชื่อ"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">อีเมล</label>
                        <input
                            type="email"
                            placeholder="อีเมล"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            required
                        />
                    </div>

                    {/*  ปุ่มอัปเดต */}
                    <button
                        type="submit"
                        className={`w-full font-medium px-4 py-2 rounded-lg transition ${
                            processing 
                                ? "bg-gray-400 cursor-not-allowed" 
                                : "bg-green-500 hover:bg-green-600 text-white"
                        }`}
                        disabled={processing}
                    >
                        {processing ? "กำลังอัปเดต..." : " อัปเดต"}
                    </button>

                    {/*  แสดงข้อความเมื่ออัปเดตสำเร็จ */}
                    {updated && (
                        <p className="text-green-600 text-center mt-3 font-medium">
                             อัปเดตข้อมูลเรียบร้อยแล้ว!
                        </p>
                    )}
                </form>
            </div>
        </Layout>
    );
}
