import { registerSchema } from "../validations/auth.validation.js";

import { registerService } from "../services/auth.service.js";

import { success, fail } from "../responses/apiResponse.js";

export async function registerController(req, res) {
  const result = registerSchema.safeParse(req.body);

  if (!result.success) {
    return fail(
      res,
      result.error.errors[0].message,
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