import { verifyToken } from "../utils/jwt.js";

import { AppError } from "../errors/AppError.js";

export function authMiddleware(req, res, next) {

  const authorization = req.headers.authorization;

  if (!authorization) {
    throw new AppError(
      "Unauthorized",
      401
    );
  }

  const token = authorization.replace(
    "Bearer ",
    ""
  );

  try {

    const payload = verifyToken(token);

    req.user = payload;

    next();

  } catch {

    throw new AppError(
      "Token không hợp lệ",
      401
    );

  }

}