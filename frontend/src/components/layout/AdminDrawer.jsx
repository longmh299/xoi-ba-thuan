import { LogOut, Menu, ClipboardList, BarChart3, User } from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminDrawer({
  open,
  onClose,
}) {
  return (
    <>
      <div
        onClick={onClose}
        className={`
          fixed
          inset-0
          bg-black/40
          z-40
          transition-opacity
          duration-300
          ${
            open
              ? "opacity-100 visible"
              : "opacity-0 invisible"
          }
        `}
      />

      <aside
        className={`
          fixed
          top-0
          left-0
          h-full
          w-72
          bg-white
          z-50
          shadow-xl
          transition-transform
          duration-300
          ${
            open
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold">
            🍚 Bà Thuận
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Quản lý bán xôi
          </p>
        </div>

        <nav className="p-3 space-y-2">

          <Link
            to="/admin"
            onClick={onClose}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100"
          >
            <ClipboardList size={20} />
            <span>Đơn đang chờ</span>
          </Link>

          <Link
            to="/admin/statistics"
            onClick={onClose}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100"
          >
            <BarChart3 size={20} />
            <span>Thống kê hôm nay</span>
          </Link>

          <Link
            to="/admin/profile"
            onClick={onClose}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100"
          >
            <User size={20} />
            <span>Tài khoản</span>
          </Link>

        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t">

          <button
            className="
              w-full
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-red-500
              text-white
              h-12
              font-semibold
            "
          >
            <LogOut size={20} />
            Đăng xuất
          </button>

        </div>
      </aside>
    </>
  );
}