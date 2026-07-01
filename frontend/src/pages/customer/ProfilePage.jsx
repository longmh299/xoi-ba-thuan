import { User, Package, House, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../../components/customer/BottomNav";
import { useAuthStore } from "../../store/auth.store";

export default function ProfilePage() {
    const navigate = useNavigate();

    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    function handleLogout() {
        if (!window.confirm("Bạn có muốn đăng xuất?")) {
            return;
        }

        logout();

        navigate("/login", {
            replace: true,
        });
    }

    return (
        <div className="min-h-screen bg-slate-100">

            <div className="max-w-md mx-auto p-4">

                {/* User Card */}

                <div className="bg-white rounded-3xl shadow p-6 text-center">

                    <div
                        className="
                            w-20
                            h-20
                            rounded-full
                            bg-green-100
                            flex
                            items-center
                            justify-center
                            mx-auto
                        "
                    >
                        <User
                            size={38}
                            className="text-green-600"
                        />
                    </div>

                    <h2 className="mt-4 text-xl font-bold">
                        {user?.name || "Khách hàng"}
                    </h2>

                    <p className="text-gray-500 mt-1">
                        {user?.phone}
                    </p>

                </div>

                {/* Menu */}

                <div className="bg-white rounded-3xl shadow mt-5 overflow-hidden">

                    <button
                        onClick={() =>
                            navigate("/my-orders")
                        }
                        className="
                            w-full
                            flex
                            items-center
                            gap-3
                            px-5
                            py-4
                            hover:bg-slate-50
                        "
                    >
                        <Package size={20} />

                        <span className="font-medium">
                            Đơn hàng của tôi
                        </span>

                    </button>

                    <div className="border-t" />

                    <button
                        onClick={() => navigate("/")}
                        className="
                            w-full
                            flex
                            items-center
                            gap-3
                            px-5
                            py-4
                            hover:bg-slate-50
                        "
                    >
                        <House size={20} />

                        <span className="font-medium">
                            Trang chủ
                        </span>

                    </button>

                    <div className="border-t" />

                    <button
                        onClick={handleLogout}
                        className="
                            w-full
                            flex
                            items-center
                            gap-3
                            px-5
                            py-4
                            text-red-600
                            hover:bg-red-50
                        "
                    >
                        <LogOut size={20} />

                        <span className="font-medium">
                            Đăng xuất
                        </span>

                    </button>

                </div>

            </div>
            <BottomNav />
        </div>
    );
}