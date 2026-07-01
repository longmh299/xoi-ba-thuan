import { fail } from "../responses/apiResponse.js";

export function adminMiddleware(req, res, next) {
  if (!req.user) {
    return fail(res, "Chưa đăng nhập", 401);
  }

  if (req.user.role !== "ADMIN") {
    return fail(res, "Bạn không có quyền truy cập", 403);
  }

  next();
}