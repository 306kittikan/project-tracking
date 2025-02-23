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
            <div className="max-w-2xl mx-auto bg-white p-6 shadow rounded-lg">
                <h1 className="text-2xl font-bold mb-4">⚙️ ตั้งค่าบัญชี</h1>

                {/* อัปเดตข้อมูลบัญชี */}
                <form onSubmit={handleProfileUpdate} className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">📝 แก้ไขข้อมูลบัญชี</h2>
                    <div className="mb-3">
                        <label className="block text-gray-700">ชื่อ</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="w-full border p-2 rounded"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>

                    <div className="mb-3">
                        <label className="block text-gray-700">อีเมล</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            className="w-full border p-2 rounded"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        disabled={processing}
                    >
                        {processing ? "กำลังบันทึก..." : "บันทึกการเปลี่ยนแปลง"}
                    </button>
                </form>

                {/* เปลี่ยนรหัสผ่าน */}
                <form onSubmit={handlePasswordChange} className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">🔑 เปลี่ยนรหัสผ่าน</h2>
                    <div className="mb-3">
                        <label className="block text-gray-700">รหัสผ่านปัจจุบัน</label>
                        <input
                            type="password"
                            value={data.current_password}
                            onChange={(e) => setData("current_password", e.target.value)}
                            className="w-full border p-2 rounded"
                        />
                        {errors.current_password && <p className="text-red-500 text-sm">{errors.current_password}</p>}
                    </div>

                    <div className="mb-3">
                        <label className="block text-gray-700">รหัสผ่านใหม่</label>
                        <input
                            type="password"
                            value={data.new_password}
                            onChange={(e) => setData("new_password", e.target.value)}
                            className="w-full border p-2 rounded"
                        />
                        {errors.new_password && <p className="text-red-500 text-sm">{errors.new_password}</p>}
                    </div>

                    <div className="mb-3">
                        <label className="block text-gray-700">ยืนยันรหัสผ่านใหม่</label>
                        <input
                            type="password"
                            value={data.new_password_confirmation}
                            onChange={(e) => setData("new_password_confirmation", e.target.value)}
                            className="w-full border p-2 rounded"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded"
                        disabled={processing}
                    >
                        {processing ? "กำลังเปลี่ยนรหัส..." : "เปลี่ยนรหัสผ่าน"}
                    </button>
                </form>

                {/* ลบบัญชี */}
                <form onSubmit={handleAccountDeletion}>
                    <h2 className="text-lg font-semibold mb-2 text-red-600">⚠️ ลบบัญชี</h2>
                    <p className="text-sm text-gray-600 mb-3">บัญชีของคุณจะถูกลบถาวรและไม่สามารถกู้คืนได้</p>
                    <div className="mb-3">
                        <label className="block text-gray-700">รหัสผ่านของคุณ</label>
                        <input
                            type="password"
                            value={data.delete_password}
                            onChange={(e) => setData("delete_password", e.target.value)}
                            className="w-full border p-2 rounded"
                        />
                        {errors.delete_password && <p className="text-red-500 text-sm">{errors.delete_password}</p>}
                    </div>
                    <button
                        type="submit"
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        disabled={processing}
                    >
                        {processing ? "กำลังลบ..." : "ลบบัญชี"}
                    </button>
                </form>
            </div>
        </Layout>
    );
}