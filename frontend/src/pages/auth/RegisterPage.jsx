import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { login, register } from "../../api/auth.api";
import { useAuthStore } from "../../store/auth.store";

export default function RegisterPage() {
  const navigate = useNavigate();

  const setAuth = useAuthStore(
    (state) => state.setAuth
  );

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleRegister(e) {
    e.preventDefault();

    try {
      setLoading(true);

      await register({
        name,
        phone,
        password,
      });

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
          "Đăng ký thất bại"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-5">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-6">

        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold">
            🍚 Bà Thuận
          </h1>

          <p className="text-gray-500 mt-2">
            Tạo tài khoản
          </p>

        </div>

        <form
          onSubmit={handleRegister}
          className="space-y-4"
        >

          <input
            className="w-full h-12 rounded-xl border px-4"
            placeholder="Họ và tên"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <input
            className="w-full h-12 rounded-xl border px-4"
            placeholder="Số điện thoại"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
          />

          <input
            type="password"
            className="w-full h-12 rounded-xl border px-4"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
          />

          <button
            disabled={loading}
            className="w-full h-12 rounded-xl bg-green-500 text-white font-bold"
          >
            {loading
              ? "Đang tạo..."
              : "Đăng ký"}
          </button>

        </form>

        <p className="text-center mt-6 text-sm">

          Đã có tài khoản?{" "}

          <Link
            to="/login"
            className="text-green-600 font-semibold"
          >
            Đăng nhập
          </Link>

        </p>

      </div>
    </div>
  );
}