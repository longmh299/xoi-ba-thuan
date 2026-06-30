import prisma from "../config/prisma.js";

export function findUserByPhone(phone) {
  return prisma.user.findUnique({
    where: {
      phone,
    },
  });
}

export function findUserById(id) {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
}

export function createUser(data) {
  return prisma.user.create({
    data,
  });
}

export function updateRefreshToken(userId, refreshToken) {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      refreshToken,
      lastLoginAt: new Date(),
    },
  });
}
export function updateLoginInfo(userId, ip) {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      lastLoginAt: new Date(),
      lastLoginIp: ip,
    },
  });
}
export function getProfile(id) {
  return prisma.user.findUnique({
    where: {
      id,
    },

    select: {
      id: true,
      name: true,
      phone: true,
      role: true,
      createdAt: true,
    },
  });
}