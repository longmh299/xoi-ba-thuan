import prisma from "../config/prisma.js";

/**
 * ==========================
 * READ
 * ==========================
 */

export function findVariantsByIds(ids) {
  return prisma.foodVariant.findMany({
    where: {
      id: {
        in: ids,
      },

      isActive: true,
    },

    include: {
      food: true,
    },
  });
}

export function findToppingsByIds(ids) {
  return prisma.topping.findMany({
    where: {
      id: {
        in: ids,
      },

      isActive: true,
    },
  });
}

/**
 * ==========================
 * WRITE
 * ==========================
 */

export function createOrder(tx, data) {
  return tx.order.create({
    data,
  });
}

export function createOrderItem(tx, data) {
  return tx.orderItem.create({
    data,
  });
}

export function createOrderItemTopping(tx, data) {
  return tx.orderItemTopping.create({
    data,
  });
}

export function increaseFoodSoldCount(tx, foodId, quantity) {
  return tx.food.update({
    where: {
      id: foodId,
    },

    data: {
      soldCount: {
        increment: quantity,
      },
    },
  });
}
export function findOrdersByUserId(userId) {
  return prisma.order.findMany({
    where: {
      userId,
    },

    orderBy: {
      createdAt: "desc",
    },

    select: {
      id: true,

      orderCode: true,

      status: true,

      itemsTotal: true,

      shippingFee: true,

      discount: true,

      grandTotal: true,

      receiveType: true,

      createdAt: true,

      items: {
        select: {
          id: true,

          quantity: true,

          unitPrice: true,

          totalPrice: true,

          foodVariant: {
            select: {
              name: true,

              food: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  });
}
export function findOrderDetail(orderId, userId) {
  return prisma.order.findFirst({
    where: {
      id: orderId,
      userId,
    },

    include: {
      items: {
        include: {
          foodVariant: {
            include: {
              food: true,
            },
          },

          toppings: {
            include: {
              topping: true,
            },
          },
        },
      },
    },
  });
}
export function findAllOrders({
  status,
  page,
  limit,
}) {
  return prisma.order.findMany({
    where: {
      ...(status && { status }),
    },

    orderBy: {
      createdAt: "desc",
    },

    skip: (page - 1) * limit,

    take: limit,

    include: {
      items: {
        include: {
          foodVariant: {
            include: {
              food: true,
            },
          },
        },
      },
    },
  });
}
export function findOrderDetailForAdmin(orderId) {
  return prisma.order.findUnique({
    where: {
      id: orderId,
    },

    include: {
      items: {
        include: {
          foodVariant: {
            include: {
              food: true,
            },
          },

          toppings: {
            include: {
              topping: true,
            },
          },
        },
      },

      user: {
        select: {
          id: true,
          name: true,
          phone: true,
        },
      },
    },
  });
}
export function updateOrderStatus(
  tx,
  orderId,
  status
) {
  return tx.order.update({
    where: {
      id: orderId,
    },

    data: {
      status,

      completedAt:
        status === "COMPLETED"
          ? new Date()
          : null,
    },
  });
}