import { useForm } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import "../../../css/EditProduct.css"; //  นำเข้าไฟล์ CSS

export default function EditProduct({ product }) {
    const { data, setData, put, processing } = useForm({
        code: product.code,
        name: product.name,
        price: product.price,
        stock: product.stock,
        description: product.description || "",
    });

    function handleSubmit(e) {
        e.preventDefault();
        put(`/products/${product.id}`);
    }

    return (
        <Layout>
            <div className="edit-product-container">
                <h1 className="edit-product-title"> แก้ไขสินค้า</h1>
                <form onSubmit={handleSubmit} className="edit-product-form">
                    <div className="edit-product-grid">
                        <input
                            type="text"
                            placeholder="รหัสสินค้า"
                            value={data.code}
                            onChange={(e) => setData("code", e.target.value)}
                            className="edit-product-input"
                            required
                        />
                        <input
                            type="text"
                            placeholder="ชื่อสินค้า"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="edit-product-input"
                            required
                        />
                    </div>
                    
                    <textarea
                        placeholder="รายละเอียดสินค้า"
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        className="edit-product-input"
                        rows="3"
                    />

                    <div className="edit-product-grid">
                        <input
                            type="number"
                            placeholder="ราคา"
                            value={data.price}
                            onChange={(e) => setData("price", e.target.value)}
                            className="edit-product-input"
                            required
                        />
                        <input
                            type="number"
                            placeholder="จำนวน"
                            value={data.stock}
                            onChange={(e) => setData("stock", e.target.value)}
                            className="edit-product-input"
                            required
                        />
                    </div>

                    <div className="flex justify-center">
                        <button type="submit" className="edit-product-button" disabled={processing}>
                            {processing ? "กำลังอัปเดต..." : "อัปเดต"}
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
}
