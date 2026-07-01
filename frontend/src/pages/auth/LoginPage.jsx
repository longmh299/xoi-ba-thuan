import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import { login } from "../../api/auth.api";
import { useAuthStore } from "../../store/auth.store";

export default function LoginPage() {
  const navigate = useNavigate();

  const setAuth = useAuthStore(
    (state) => state.setAuth
  );

  const [phone, setPhone] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  async function handleLogin(e) {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await login({
        phone,
        password,
      });

      const data = res.data.data;

      setAuth(
        data.user,
        data.accessToken
      );

      if (data.user.role === "ADMIN") {
        navigate("/admin", {
          replace: true,
        });
      } else {
        navigate("/", {
          replace: true,
        });
      }
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Đăng nhập thất bại"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-5">

      <div className="w-full max-w-md bg-white rounded-[32px] shadow-xl p-8">

        <div className="text-center">

          <div className="text-6xl">
            🍚
          </div>

          <h1 className="mt-4 text-3xl font-bold text-gray-800">
            Bà Thuận
          </h1>

          <p className="mt-2 text-gray-500">
            Xôi nóng mỗi sáng
          </p>

        </div>

        <form
          onSubmit={handleLogin}
          className="mt-10 space-y-5"
        >

          <div>

            <label className="block text-sm text-gray-600 mb-2">
              Số điện thoại
            </label>

            <input
              type="text"
              placeholder="Nhập số điện thoại"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
              className="
                w-full
                h-12
                rounded-2xl
                border
                border-gray-200
                px-4
                outline-none
                focus:border-green-500
                focus:ring-2
                focus:ring-green-200
              "
            />

          </div>

          <div>

            <label className="block text-sm text-gray-600 mb-2">
              Mật khẩu
            </label>

            <div className="relative">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                className="
                  w-full
                  h-12
                  rounded-2xl
                  border
                  border-gray-200
                  px-4
                  pr-14
                  outline-none
                  focus:border-green-500
                  focus:ring-2
                  focus:ring-green-200
                "
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  text-xl
                "
              >
                {showPassword
                  ? "🙈"
                  : "👁"}
              </button>

            </div>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              h-12
              rounded-2xl
              bg-green-600
              hover:bg-green-700
              text-white
              font-bold
              transition
              disabled:opacity-60
            "
          >
            {loading
              ? "Đang đăng nhập..."
              : "Đăng nhập"}
          </button>

        </form>

        <div className="mt-8 text-center text-gray-500">

          Chưa có tài khoản?

          <Link
            to="/register"
            className="
              ml-2
              text-green-600
              font-semibold
            "
          >
            Đăng ký
          </Link>

        </div>

      </div>

    </div>
  );
}