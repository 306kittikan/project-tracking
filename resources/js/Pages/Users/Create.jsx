import { useForm } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";

export default function CreateUser() {
    const { data, setData, post, processing } = useForm({
        name: "",
        email: "",
    });

    function handleSubmit(e) {
        e.preventDefault();
        post("/users");
    }

    return (
        <Layout>
            <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center"> เพิ่มผู้ใช้</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium">ชื่อ</label>
                        <input
                            type="text"
                            placeholder="ชื่อ"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                            className="border p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg transition disabled:bg-gray-400"
                        disabled={processing}
                    >
                        {processing ? "กำลังบันทึก..." : "✅ บันทึก"}
                    </button>
                </form>
            </div>
        </Layout>
    );
}
