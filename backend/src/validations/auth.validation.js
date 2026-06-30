import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string({
      required_error: "Tên không được để trống",
    })
    .trim()
    .min(2, "Tên phải có ít nhất 2 ký tự")
    .max(50, "Tên không được quá 50 ký tự"),

  phone: z
    .string({
      required_error: "Số điện thoại không được để trống",
    })
    .trim()
    .regex(/^0\d{9}$/, "Số điện thoại không hợp lệ"),

  password: z
    .string({
      required_error: "Mật khẩu không được để trống",
    })
    .min(6, "Mật khẩu tối thiểu 6 ký tự")
    .max(32, "Mật khẩu tối đa 32 ký tự"),
});

export const loginSchema = z.object({
  phone: z
    .string()
    .trim()
    .regex(/^0\d{9}$/),

  password: z
    .string()
    .min(6)
    .max(32),
});