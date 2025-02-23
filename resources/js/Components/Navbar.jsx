import { Link, usePage } from "@inertiajs/react";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
    const { auth } = usePage().props;
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // ปิด dropdown เมื่อคลิกข้างนอก
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <nav className="bg-gray-900 text-white p-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">Product Stock and Order Tracking</h1>
                <ul className="flex space-x-6 items-center">
                    <li><Link href="/products" className="hover:text-gray-400">📦 สินค้า</Link></li>
                    <li><Link href="/orders" className="hover:text-gray-400">🛒 คำสั่งซื้อ</Link></li>
                    <li><Link href="/users" className="hover:text-gray-400">👤 ลูกค้า</Link></li>
                    <li><Link href="/tracking" className="hover:text-gray-400">🚚 ติดตามสินค้า</Link></li>

                    {/* Dropdown Menu */}
                    <li className="relative" ref={dropdownRef}>
                        <button 
                            onClick={() => setDropdownOpen(!dropdownOpen)} 
                            className="focus:outline-none flex items-center space-x-2 px-3 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
                        >
                            <span>⚙️ ตั้งค่า</span>
                            <svg className={`w-4 h-4 transform transition-transform ${dropdownOpen ? "rotate-180" : ""}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg overflow-hidden animate-fade-in z-50">
                                <Link href="/settings" className="block px-4 py-2 hover:bg-gray-200 flex items-center">
                                    ⚙️ การตั้งค่าบัญชี
                                </Link>
                                <hr className="border-gray-300" />
                                <Link href="/logout" method="post" as="button" className="block px-4 py-2 text-red-600 hover:bg-gray-200 w-full text-left flex items-center">
                                    🚪 ออกจากระบบ
                                </Link>
                            </div>
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    );
}
