import { Link, useForm } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import { useState } from "react";
import "./TrackingIndex.css"; //  นำเข้าไฟล์ CSS

export default function TrackingIndex({ trackings }) {
    const { delete: destroy, processing } = useForm();
    const [selectedId, setSelectedId] = useState(null);

    const handleDelete = (id) => {
        setSelectedId(id);
        destroy(`/tracking-statuses/${id}`, {
            onSuccess: () => {
                alert(" ลบสถานะสำเร็จ!");
                setSelectedId(null);
            },
        });
    };

    const getStatusClass = (status) => {
        return status === "รอดำเนินการ" ? "status-pending" :
               status === "จัดส่งแล้ว" ? "status-shipped" :
               status === "ยกเลิกคำสั่งซื้อ" ? "status-cancelled" :
               status === "ถึงปลายทาง" ? "status-delivered" : "status-default";
    };

    return (
        <Layout>
            <div className="tracking-container">
                <h2 className="tracking-title">📦 สถานะการจัดส่ง</h2>

                {trackings.length > 0 ? (
                    <div className="table-wrapper">
                        <table className="tracking-table">
                            <thead>
                                <tr>
                                    <th>รหัสคำสั่งซื้อ</th>
                                    <th>ลูกค้า</th>
                                    <th>สถานะ</th>
                                    <th className="text-center">จัดการ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trackings.map((tracking) => (
                                    <tr key={tracking.id}>
                                        <td>{tracking.order?.order_code}</td>
                                        <td>{tracking.order?.user?.name || "ไม่พบข้อมูล"}</td>
                                        <td>
                                            <span className={`status-badge ${getStatusClass(tracking.status)}`}>
                                                {tracking.status}
                                            </span>
                                        </td>
                                        <td className="text-center">
                                            <Link href={`/tracking-statuses/${tracking.id}`} className="btn btn-blue">
                                                ดูรายละเอียด
                                            </Link>
                                            <Link href={`/tracking-statuses/${tracking.id}/edit`} className="btn btn-yellow">
                                                 แก้ไข
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(tracking.id)}
                                                className={`btn ${processing && selectedId === tracking.id ? "btn-disabled" : "btn-red"}`}
                                                disabled={processing && selectedId === tracking.id}
                                            >
                                                {processing && selectedId === tracking.id ? " ลบ..." : " ลบ"}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="no-tracking-data"> ไม่มีข้อมูลสถานะการจัดส่ง</p>
                )}

                <div className="add-tracking-btn">
                    <Link href="/tracking-statuses/create" className="btn btn-green">
                        + เพิ่มสถานะการจัดส่ง
                    </Link>
                </div>
            </div>
        </Layout>
    );
}
