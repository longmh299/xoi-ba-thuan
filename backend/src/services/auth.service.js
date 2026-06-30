import {
    createUser,
    findUserByPhone,
    updateRefreshToken,
    updateLoginInfo,
} from "../repositories/user.repository.js";
import { AppError } from "../errors/AppError.js";
import { getProfile } from "../repositories/user.repository.js";
import {
    hashPassword,
    comparePassword,
} from "../utils/bcrypt.js";

import { generateAccessToken } from "../utils/jwt.js";

export async function registerService(data) {
    const { name, phone, password } = data;

    const existedUser = await findUserByPhone(phone);

    if (existedUser) {
        if (existedUser) {
            throw new AppError(
                "Số điện thoại đã được đăng ký",
                409
            );
        }
    }

    const hashedPassword = await hashPassword(password);

    const user = await createUser({
        name,
        phone,
        password: hashedPassword,
    });

    const accessToken = generateAccessToken(user);

    // await updateRefreshToken(user.id, accessToken);

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
export async function loginService(data, ip) {
    const { phone, password } = data;

    const user = await findUserByPhone(phone);

    if (!user) {
        if (!user) {
            throw new AppError(
                "Số điện thoại hoặc mật khẩu không đúng",
                401
            );
        }
    }

    if (!user.isActive) {
        if (!user.isActive) {
            throw new AppError(
                "Tài khoản đã bị khóa",
                403
            );
        }
    }

    const matched = await comparePassword(
        password,
        user.password
    );

    if (!matched) {
        if (!matched) {
            throw new AppError(
                "Số điện thoại hoặc mật khẩu không đúng",
                401
            );
        }
    }

    await updateLoginInfo(user.id, ip);

    const accessToken = generateAccessToken(user);

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
export async function meService(id) {

    const user = await getProfile(id);

    if (!user) {
        throw new AppError(
            "Không tìm thấy tài khoản",
            404
        );
    }

    return user;

}