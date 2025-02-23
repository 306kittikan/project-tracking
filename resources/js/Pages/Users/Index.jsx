import { usePage, Link, useForm } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";

export default function UsersIndex({ users }) {
    const { auth } = usePage().props; // ดึงข้อมูลผู้ใช้ที่ล็อกอินอยู่

    if (!auth.user) {
        window.location.href = "/login"; // ถ้ายังไม่ได้ล็อกอินให้ redirect ไปหน้า Login
        return null;
    }

    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm("คุณต้องการลบผู้ใช้นี้ใช่หรือไม่?")) {
            destroy(`/users/${id}`);
        }
    };

    return (
        <Layout>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">👥 รายชื่อผู้ใช้</h1>
                <p>สวัสดี, {auth.user.name}!</p> {/* แสดงชื่อผู้ใช้ที่ล็อกอิน */}
                
                <div className="flex justify-end mb-4">
                    <Link 
                        href="/users/create" 
                        className="bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded shadow"
                    >
                        เพิ่มผู้ใช้
                    </Link>
                </div>

                <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700">
                                <th className="border p-3 text-left">#</th>
                                <th className="border p-3 text-left">ชื่อ</th>
                                <th className="border p-3 text-left">อีเมล</th>
                                <th className="border p-3 text-center">จัดการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user.id} className="border hover:bg-gray-50 transition">
                                    <td className="border p-3">{index + 1}</td>
                                    <td className="border p-3 font-medium text-gray-800">{user.name}</td>
                                    <td className="border p-3 text-gray-600">{user.email}</td>
                                    <td className="border p-3 text-center space-x-2">
                                        <Link 
                                            href={`/users/${user.id}/edit`} 
                                            className="text-blue-500 hover:text-blue-700 font-medium"
                                        >
                                            ✏️ แก้ไข
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(user.id)}
                                            className="text-red-500 hover:text-red-700 font-medium"
                                        >
                                            🗑️ ลบ
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
}
