import prisma from "../config/prisma.js";

export async function getShop() {
  const shop = await prisma.shop.findFirst();

  return shop;
}