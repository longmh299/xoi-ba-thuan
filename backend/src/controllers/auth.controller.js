import { registerSchema } from "../validations/auth.validation.js";

import { registerService } from "../services/auth.service.js";

import { success, fail } from "../responses/apiResponse.js";
import { loginSchema } from "../validations/auth.validation.js";

import { loginService } from "../services/auth.service.js";
import { meService } from "../services/auth.service.js";
export async function registerController(req, res) {
  const result = registerSchema.safeParse(req.body);

  if (!result.success) {
   return fail(
  res,
  result.error.issues[0].message,
  400
);
  }

  const data = await registerService(result.data);

  return success(
    res,
    data,
    "Đăng ký thành công",
    201
  );
}
export async function loginController(req, res) {

  const result = loginSchema.safeParse(req.body);

  if (!result.success) {
    return fail(
  res,
  result.error.issues[0].message,
  400
);
  }

  const ip =
    req.headers["x-forwarded-for"] ||
    req.socket.remoteAddress ||
    "";

  const data = await loginService(
    result.data,
    ip
  );

  return success(
    res,
    data,
    "Đăng nhập thành công"
  );
}
export async function meController(req, res) {

  const data = await meService(
    req.user.id
  );

  return success(
    res,
    data
  );

}