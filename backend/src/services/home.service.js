import prisma from "../config/prisma.js";

export async function getHomeData() {
  const [shop, banners, categories, foods] = await Promise.all([
    prisma.shop.findFirst({
      select: {
        name: true,
        phone: true,
        address: true,
        logo: true,
        facebook: true,
        zalo: true,
        shippingFeeDefault: true,
        isOpen: true,
        closeMessage: true,
      },
    }),

    prisma.banner.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        sortOrder: "asc",
      },
      select: {
        id: true,
        title: true,
        image: true,
        link: true,
      },
    }),

    prisma.category.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        sortOrder: "asc",
      },
      select: {
        id: true,
        name: true,
      },
    }),

    prisma.food.findMany({
      where: {
        status: "AVAILABLE",
      },

      orderBy: {
        soldCount: "desc",
      },

      select: {
        id: true,
        name: true,
        description: true,
        thumbnail: true,
        soldCount: true,

        category: {
          select: {
            id: true,
            name: true,
          },
        },

        variants: {
          where: {
            isActive: true,
          },
          orderBy: {
            sortOrder: "asc",
          },
          select: {
            id: true,
            name: true,
            price: true,
          },
        },
      },
    }),
  ]);

  return {
    shop,
    banners,
    categories,
    foods,
  };
}