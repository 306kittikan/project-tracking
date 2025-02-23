import { useForm } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";

export default function ChangePassword() {
    const { data, setData, post, errors } = useForm({
        current_password: "",
        new_password: "",
        confirm_password: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/account/change-password");
    };

    return (
        <Layout>
            <h1 className="text-2xl font-bold mb-4">เปลี่ยนรหัสผ่าน</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block">รหัสผ่านปัจจุบัน:</label>
                    <input
                        type="password"
                        value={data.current_password}
                        onChange={(e) => setData("current_password", e.target.value)}
                        className="border p-2 w-full"
                    />
                    {errors.current_password && <p className="text-red-500">{errors.current_password}</p>}
                </div>

                <div>
                    <label className="block">รหัสผ่านใหม่:</label>
                    <input
                        type="password"
                        value={data.new_password}
                        onChange={(e) => setData("new_password", e.target.value)}
                        className="border p-2 w-full"
                    />
                    {errors.new_password && <p className="text-red-500">{errors.new_password}</p>}
                </div>

                <div>
                    <label className="block">ยืนยันรหัสผ่านใหม่:</label>
                    <input
                        type="password"
                        value={data.confirm_password}
                        onChange={(e) => setData("confirm_password", e.target.value)}
                        className="border p-2 w-full"
                    />
                    {errors.confirm_password && <p className="text-red-500">{errors.confirm_password}</p>}
                </div>

                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    เปลี่ยนรหัสผ่าน
                </button>
            </form>
        </Layout>
    );
}
