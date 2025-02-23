import { useForm } from "@inertiajs/react";
import { useEffect } from "react";
import { usePage } from "@inertiajs/react";

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
    });

    const { props } = usePage();

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/login", {
            onSuccess: () => {
                window.location.href = "/products"; // ✅ Redirect ไปที่ /products
            },
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">เข้าสู่ระบบ</h2>
                {errors.email && <p className="text-red-500">{errors.email}</p>}
                {errors.password && <p className="text-red-500">{errors.password}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">อีเมล</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">รหัสผ่าน</label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData("password", e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
                        disabled={processing}
                    >
                        {processing ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
                    </button>
                </form>
                <p className="mt-4 text-center">
                    ยังไม่มีบัญชี? <a href="/register" className="text-blue-600">สมัครสมาชิก</a>
                </p>
            </div>
        </div>
    );
}
