import { usePage, Link, useForm } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import "./UsersIndex.css"; //  นำเข้าไฟล์ CSS

export default function UsersIndex({ users }) {
    const { auth } = usePage().props;

    if (!auth.user) {
        window.location.href = "/login";
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
            <div className="users-container">
                <h1 className="users-title">👥 รายชื่อผู้ใช้</h1>

                {/* ปุ่มเพิ่มผู้ใช้ */}
                <div className="flex justify-end mb-6">
                    <Link href="/users/create" className="users-add-button">
                         เพิ่มผู้ใช้
                    </Link>
                </div>

                {/* ตารางรายชื่อผู้ใช้ */}
                <div className="users-table-container">
                    <table className="users-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>ชื่อ</th>
                                <th>อีเมล</th>
                                <th className="text-center">จัดการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user.id}>
                                    <td>{index + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td className="users-action">
                                        <Link href={`/users/${user.id}/edit`} className="users-edit">
                                             แก้ไข
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(user.id)}
                                            className="users-delete"
                                        >
                                             ลบ
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
