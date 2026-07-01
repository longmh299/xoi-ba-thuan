import { useAuthStore } from "../../store/auth.store";

export default function HomeHeader({ shop }) {
  const user = useAuthStore(
    (state) => state.user
  );

  return (
    <div className="bg-white rounded-b-3xl shadow-sm px-5 pt-8 pb-6">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-gray-500">
            Xin chào 👋
          </p>

          <h2 className="text-2xl font-bold mt-1">
            {user?.name}
          </h2>

        </div>

        <div className="w-14 h-14 rounded-2xl bg-green-500 flex items-center justify-center text-3xl shadow">
          🍚
        </div>

      </div>

      <div className="mt-6">

        <h1 className="text-3xl font-bold">
          {shop?.name}
        </h1>

        <p className="text-gray-500 mt-2">
          {shop?.address}
        </p>

      </div>

      <div className="mt-5 flex items-center gap-2">

        <div
          className={`w-3 h-3 rounded-full ${
            shop?.isOpen
              ? "bg-green-500"
              : "bg-red-500"
          }`}
        />

        <span
          className={`font-semibold ${
            shop?.isOpen
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {shop?.isOpen
            ? "Đang mở cửa"
            : "Đã đóng cửa"}
        </span>

      </div>

    </div>
  );
}