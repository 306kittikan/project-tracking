import { useEffect, useMemo, useState } from "react";
import { usePage, Link, useForm, router } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import "../../../css/ProductsIndex.css"; //  นำเข้าไฟล์ CSS

export default function ProductsIndex({ products }) {
    const { auth } = usePage().props;
    const { delete: destroy } = useForm();

    const [searchTerm, setSearchTerm] = useState(""); //  State สำหรับค้นหา
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    useEffect(() => {
        if (!auth.user) {
            router.get("/login");
        }
    }, []);

    //  กรองสินค้าตามช่วงวันที่ที่เลือก
    const filteredProducts = useMemo(() => {
        let filtered = products;

        // กรองตามช่วงวันที่
        if (startDate && endDate) {
            filtered = filtered.filter((product) => {
                const productDate = new Date(product.created_at);
                return productDate >= new Date(startDate) && productDate <= new Date(endDate);
            });
        }

        //  ค้นหาสินค้าจากชื่อหรือรหัสสินค้า
        if (searchTerm.trim() !== "") {
            filtered = filtered.filter((product) =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.code.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        return filtered;
    }, [products, startDate, endDate, searchTerm]);

    //  คำนวณยอดรวมสินค้าประจำวันจากสินค้าที่ถูกกรอง
    const totalSales = useMemo(() => {
        return filteredProducts.reduce((sum, product) => sum + (parseFloat(product.price) * product.stock), 0);
    }, [filteredProducts]);

    return (
        <Layout>
            <div className="products-container">
                <h1 className="products-title">📦 รายการสินค้า</h1>

                {/*  ค้นหาและกรองสินค้า */}
                <div className="products-search-filter">
                    <input
                        type="text"
                        placeholder="🔍 ค้นหาสินค้า (ชื่อ / รหัสสินค้า)"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="products-search-input"
                    />
                    <div className="products-filter">
                        <label>เลือกช่วงวันที่:</label>
                        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </div>
                </div>

                <div className="flex justify-end mb-4">
                    <Link href="/products/create" className="products-add-button">
                         เพิ่มสินค้า
                    </Link>
                </div>

                <div className="products-table-container">
                    <table className="products-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>รหัสสินค้า</th>
                                <th>ชื่อสินค้า</th>
                                <th>รายละเอียด</th>
                                <th>ราคา</th>
                                <th>จำนวน</th>
                                <th>วันที่เพิ่ม</th>
                                <th>จัดการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map((product, index) => (
                                <tr key={product.id}>
                                    <td>{index + 1}</td>
                                    <td className="font-mono">{product.code}</td>
                                    <td>{product.name}</td>
                                    <td>{product.description || "-"}</td>
                                    <td>{parseFloat(product.price).toFixed(2)} บาท</td>
                                    <td>{product.stock}</td>
                                    <td>
                                        {product.created_at
                                            ? new Date(product.created_at).toLocaleDateString("th-TH")
                                            : "-"}
                                    </td>
                                    <td className="flex justify-center space-x-4">
                                        <Link href={`/products/${product.id}/edit`} className="products-edit">
                                             แก้ไข
                                        </Link>
                                        <button
                                            onClick={() => {
                                                if (confirm("คุณแน่ใจหรือไม่ว่าต้องการลบสินค้านี้?")) {
                                                    destroy(`/products/${product.id}`);
                                                }
                                            }}
                                            className="products-delete"
                                        >
                                             ลบ
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        {/*  แสดงผลรวมยอดสินค้า */}
                        <tfoot>
                            <tr>
                                <td colSpan="5" className="text-right font-bold">ยอดรวมทั้งหมด:</td>
                                <td colSpan="3" className="text-left font-bold">{totalSales.toFixed(2)} บาท</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </Layout>
    );
}
