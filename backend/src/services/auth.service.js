import {
  createUser,
  findUserByPhone,
  updateRefreshToken,
} from "../repositories/user.repository.js";

import { hashPassword } from "../utils/bcrypt.js";
import { generateAccessToken } from "../utils/jwt.js";

export async function registerService(data) {
  const { name, phone, password } = data;

  const existedUser = await findUserByPhone(phone);

  if (existedUser) {
    throw new Error("Số điện thoại đã được đăng ký");
  }

  const hashedPassword = await hashPassword(password);

  const user = await createUser({
    name,
    phone,
    password: hashedPassword,
  });

  const accessToken = generateAccessToken(user);

  await updateRefreshToken(user.id, accessToken);

  return {
    accessToken,

    user: {
      id: user.id,
      name: user.name,
      phone: user.phone,
      role: user.role,
    },
  };
}