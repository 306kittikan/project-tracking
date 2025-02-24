import { useForm } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";

export default function Settings({ auth }) {
    const { data, setData, post, delete: destroy, errors, processing } = useForm({
        name: auth.user.name,
        email: auth.user.email,
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
        delete_password: ""
    });

    function handleProfileUpdate(e) {
        e.preventDefault();
        post("/account/update-profile");
    }

    function handlePasswordChange(e) {
        e.preventDefault();
        post("/account/change-password");
    }

    function handleAccountDeletion(e) {
        e.preventDefault();
        if (confirm("คุณแน่ใจหรือไม่ว่าต้องการลบบัญชีของคุณ? การกระทำนี้ไม่สามารถย้อนกลับได้!")) {
            destroy("/account/delete");
        }
    }

    return (
        <Layout>
            <div className="max-w-2xl mx-auto bg-white p-6 shadow-lg rounded-lg border border-gray-200">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">⚙️ ตั้งค่าบัญชี</h1>

                {/* อัปเดตข้อมูลบัญชี */}
                <form onSubmit={handleProfileUpdate} className="mb-8">
                    <h2 className="text-lg font-semibold mb-3">📝 แก้ไขข้อมูลบัญชี</h2>
                    <div className="grid gap-4">
                        <div>
                            <label className="block text-gray-700 font-medium">ชื่อ</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                className="w-full border border-gray-300 p-2 rounded-lg shadow-sm focus:ring focus:ring-blue-200"
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium">อีเมล</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData("email", e.target.value)}
                                className="w-full border border-gray-300 p-2 rounded-lg shadow-sm focus:ring focus:ring-blue-200"
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition"
                        disabled={processing}
                    >
                        {processing ? "⏳ กำลังบันทึก..." : "💾 บันทึกการเปลี่ยนแปลง"}
                    </button>
                </form>

                <hr className="my-6 border-t border-gray-300" />

                {/* เปลี่ยนรหัสผ่าน */}
                <form onSubmit={handlePasswordChange} className="mb-8">
                    <h2 className="text-lg font-semibold mb-3">🔑 เปลี่ยนรหัสผ่าน</h2>
                    <div className="grid gap-4">
                        <div>
                            <label className="block text-gray-700 font-medium">รหัสผ่านปัจจุบัน</label>
                            <input
                                type="password"
                                value={data.current_password}
                                onChange={(e) => setData("current_password", e.target.value)}
                                className="w-full border border-gray-300 p-2 rounded-lg shadow-sm focus:ring focus:ring-green-200"
                            />
                            {errors.current_password && <p className="text-red-500 text-sm mt-1">{errors.current_password}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium">รหัสผ่านใหม่</label>
                            <input
                                type="password"
                                value={data.new_password}
                                onChange={(e) => setData("new_password", e.target.value)}
                                className="w-full border border-gray-300 p-2 rounded-lg shadow-sm focus:ring focus:ring-green-200"
                            />
                            {errors.new_password && <p className="text-red-500 text-sm mt-1">{errors.new_password}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium">ยืนยันรหัสผ่านใหม่</label>
                            <input
                                type="password"
                                value={data.new_password_confirmation}
                                onChange={(e) => setData("new_password_confirmation", e.target.value)}
                                className="w-full border border-gray-300 p-2 rounded-lg shadow-sm focus:ring focus:ring-green-200"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="mt-4 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow-md transition"
                        disabled={processing}
                    >
                        {processing ? "⏳ กำลังเปลี่ยนรหัส..." : "🔄 เปลี่ยนรหัสผ่าน"}
                    </button>
                </form>

                <hr className="my-6 border-t border-gray-300" />

                {/* ลบบัญชี */}
                <form onSubmit={handleAccountDeletion}>
                    <h2 className="text-lg font-semibold mb-3 text-red-600">⚠️ ลบบัญชี</h2>
                    <p className="text-sm text-gray-600 mb-3">
                        🚨 บัญชีของคุณจะถูกลบถาวรและไม่สามารถกู้คืนได้ กรุณาตรวจสอบให้แน่ใจก่อนดำเนินการ
                    </p>

                    <div>
                        <label className="block text-gray-700 font-medium">รหัสผ่านของคุณ</label>
                        <input
                            type="password"
                            value={data.delete_password}
                            onChange={(e) => setData("delete_password", e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded-lg shadow-sm focus:ring focus:ring-red-200"
                        />
                        {errors.delete_password && <p className="text-red-500 text-sm mt-1">{errors.delete_password}</p>}
                    </div>

                    <button
                        type="submit"
                        className="mt-4 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg shadow-md transition"
                        disabled={processing}
                    >
                        {processing ? "⏳ กำลังลบ..." : "❌ ลบบัญชี"}
                    </button>
                </form>
            </div>
        </Layout>
    );
}
