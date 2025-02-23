import Navbar from "@/Components/Navbar";

export default function Layout({ children }) {
    return (
        <div>
            <Navbar /> {/* Navbar ด้านบน */}
            <div className="container mx-auto p-6">{children}</div>
            
        </div>
    );
}
