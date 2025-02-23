import { useForm } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";

export default function DeleteAccount() {
    const { data, setData, delete: destroy, errors } = useForm({
        password: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        destroy("/account/delete");
    };

    return (
        <Layout>
            <h1 className="text-2xl font-bold mb-4 text-red-600">ลบบัญชี</h1>
            <p className="text-gray-700 mb-4">หากคุณลบบัญชี ข้อมูลทั้งหมดของคุณจะถูกลบอย่างถาวร และไม่สามารถกู้คืนได้</p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block">ยืนยันรหัสผ่าน:</label>
                    <input
                        type="password"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        className="border p-2 w-full"
                    />
                    {errors.password && <p className="text-red-500">{errors.password}</p>}
                </div>

                <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded">
                    ลบบัญชี
                </button>
            </form>
        </Layout>
    );
}
