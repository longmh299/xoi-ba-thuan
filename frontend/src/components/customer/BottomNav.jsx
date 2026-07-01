import { House, Package, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export default function BottomNav() {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const menus = [
        {
            label: "Trang chủ",
            icon: House,
            path: "/",
        },
        {
            label: "Đơn hàng",
            icon: Package,
            path: "/my-orders",
        },
        {
            label: "Tôi",
            icon: User,
            path: "/profile",
        },
    ];

    return (
        <div
            className="
                fixed
                bottom-0
                left-0
                right-0
                bg-white
                border-t
                shadow-[0_-2px_10px_rgba(0,0,0,0.08)]
                z-50
            "
        >
            <div className="max-w-md mx-auto h-16 flex">

                {menus.map((item) => {
                    const Icon = item.icon;

                    const active =
                        pathname === item.path;

                    return (
                        <button
                            key={item.path}
                            onClick={() =>
                                navigate(item.path)
                            }
                            className="
                                flex-1
                                flex
                                flex-col
                                items-center
                                justify-center
                            "
                        >
                            <Icon
                                size={22}
                                className={
                                    active
                                        ? "text-green-600"
                                        : "text-gray-400"
                                }
                            />

                            <span
                                className={`text-xs mt-1 ${
                                    active
                                        ? "text-green-600 font-semibold"
                                        : "text-gray-500"
                                }`}
                            >
                                {item.label}
                            </span>

                        </button>
                    );
                })}

            </div>
        </div>
    );
}