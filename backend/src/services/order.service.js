import prisma from "../config/prisma.js";

import { createOrderSchema } from "../validations/order.validation.js";
import { findAllOrders } from "../repositories/order.repository.js";
import { generateOrderCode } from "../utils/orderCode.js";
import { findOrdersByUserId } from "../repositories/order.repository.js";
import { findOrderDetail } from "../repositories/order.repository.js";
import { findOrderDetailForAdmin } from "../repositories/order.repository.js";
import {
  emitNewOrder,
  emitOrderUpdated,
} from "../socket/events.js";
import {
  findVariantsByIds,
  findToppingsByIds,
  createOrder,
  createOrderItem,
  createOrderItemTopping,
  increaseFoodSoldCount,
  updateOrderStatus,

} from "../repositories/order.repository.js";

export async function createOrderService(userId, payload) {
  /**
   * Validate
   */

  const { error, value } = createOrderSchema.validate(payload);

  if (error) {
    throw new Error(error.details[0].message);
  }

  /**
   * Lấy Variant
   */

  const variantIds = value.items.map((item) => item.foodVariantId);

  const variants = await findVariantsByIds(variantIds);

  if (variants.length !== variantIds.length) {
    throw new Error("Món ăn không tồn tại.");
  }

  /**
   * Lấy topping
   */

  const toppingIds = value.items.flatMap((item) =>
    item.toppings.map((t) => t.toppingId)
  );

  const toppings = toppingIds.length
    ? await findToppingsByIds(toppingIds)
    : [];

  /**
   * Map
   */

  const variantMap = new Map(
    variants.map((item) => [item.id, item])
  );

  const toppingMap = new Map(
    toppings.map((item) => [item.id, item])
  );

  /**
   * Tính tiền
   */

  let itemsTotal = 0;

  const orderItems = [];

  for (const item of value.items) {
    const variant = variantMap.get(item.foodVariantId);

    if (!variant) {
      throw new Error("Variant không tồn tại.");
    }

    const unitPrice = variant.price;

    let totalPrice = unitPrice * item.quantity;

    const toppingRows = [];

    for (const toppingInput of item.toppings) {
      const topping = toppingMap.get(toppingInput.toppingId);

      if (!topping) {
        throw new Error("Topping không tồn tại.");
      }

      const toppingTotal =
        topping.price * toppingInput.quantity * item.quantity;

      totalPrice += toppingTotal;

      toppingRows.push({
        toppingId: topping.id,
        quantity: toppingInput.quantity,
        unitPrice: topping.price,
        totalPrice: topping.price * toppingInput.quantity,
      });
    }

    itemsTotal += totalPrice;

    orderItems.push({
      foodId: variant.foodId,

      foodVariantId: variant.id,

      quantity: item.quantity,

      unitPrice,

      totalPrice,

      toppings: toppingRows,
    });
  }

  /**
   * Shipping
   */

  const shippingFee =
    value.receiveType === "DELIVERY" ? 15000 : 0;

  const discount = 0;

  const grandTotal =
    itemsTotal +
    shippingFee -
    discount;

  /**
   * Transaction
   */

  return prisma.$transaction(async (tx) => {
    const order = await createOrder(tx, {
      orderCode: generateOrderCode(),

      userId,

      customerName: value.customerName,

      phone: value.phone,

      receiveType: value.receiveType,

      address: value.address,

      note: value.note,

      shippingNote: value.shippingNote,

      itemsTotal,

      shippingFee,

      discount,

      grandTotal,
    });

    for (const item of orderItems) {
      const orderItem = await createOrderItem(tx, {
        orderId: order.id,

        foodVariantId: item.foodVariantId,

        quantity: item.quantity,

        unitPrice: item.unitPrice,

        totalPrice: item.totalPrice,
      });

      for (const topping of item.toppings) {
        await createOrderItemTopping(tx, {
          orderItemId: orderItem.id,

          toppingId: topping.toppingId,

          quantity: topping.quantity,

          unitPrice: topping.unitPrice,

          totalPrice: topping.totalPrice,
        });
      }

      await increaseFoodSoldCount(
        tx,
        item.foodId,
        item.quantity
      );
    }

    const result = {
      id: order.id,
      orderCode: order.orderCode,
      status: order.status,
      grandTotal: order.grandTotal,
    };

    emitNewOrder(result);

    return result;
  });
}
export async function getMyOrdersService(userId) {
  const orders = await findOrdersByUserId(userId);

  return orders.map((order) => ({
    id: order.id,

    orderCode: order.orderCode,

    status: order.status,

    receiveType: order.receiveType,

    grandTotal: order.grandTotal,

    createdAt: order.createdAt,

    items: order.items.map((item) => ({
      id: item.id,

      foodName: item.foodVariant.food.name,

      variantName: item.foodVariant.name,

      quantity: item.quantity,

      unitPrice: item.unitPrice,

      totalPrice: item.totalPrice,
    })),
  }));
}
export async function getOrderDetailService(userId, orderId) {
  const order = await findOrderDetail(orderId, userId);

  if (!order) {
    throw new Error("Không tìm thấy đơn hàng.");
  }

  return {
    id: order.id,
    orderCode: order.orderCode,

    customerName: order.customerName,
    phone: order.phone,

    receiveType: order.receiveType,

    address: order.address,

    note: order.note,

    shippingNote: order.shippingNote,

    status: order.status,

    itemsTotal: order.itemsTotal,
    shippingFee: order.shippingFee,
    discount: order.discount,
    grandTotal: order.grandTotal,

    createdAt: order.createdAt,

    items: order.items.map((item) => ({
      id: item.id,

      foodName: item.foodVariant.food.name,

      variantName: item.foodVariant.name,

      quantity: item.quantity,

      unitPrice: item.unitPrice,

      totalPrice: item.totalPrice,

      toppings: item.toppings.map((t) => ({
        id: t.id,

        name: t.topping.name,

        quantity: t.quantity,

        unitPrice: t.unitPrice,

        totalPrice: t.totalPrice,
      })),
    })),
  };
}
export async function getAllOrdersService(query) {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 20;

  const orders = await findAllOrders({
    status: query.status,
    page,
    limit,
  });

  return orders.map((order) => ({
    id: order.id,

    orderCode: order.orderCode,

    customerName: order.customerName,

    phone: order.phone,

    receiveType: order.receiveType,

    status: order.status,

    itemsTotal: order.itemsTotal,

    shippingFee: order.shippingFee,

    discount: order.discount,

    grandTotal: order.grandTotal,

    createdAt: order.createdAt,

    items: order.items.map((item) => ({
      id: item.id,

      foodName: item.foodVariant.food.name,

      variantName: item.foodVariant.name,

      quantity: item.quantity,
    })),
  }));
}
export async function getOrderDetailForAdminService(orderId) {
  const order = await findOrderDetailForAdmin(orderId);

  if (!order) {
    throw new Error("Không tìm thấy đơn hàng.");
  }

  return {
    id: order.id,

    orderCode: order.orderCode,

    customerName: order.customerName,

    phone: order.phone,

    receiveType: order.receiveType,

    address: order.address,

    note: order.note,

    shippingNote: order.shippingNote,

    status: order.status,

    itemsTotal: order.itemsTotal,

    shippingFee: order.shippingFee,

    discount: order.discount,

    grandTotal: order.grandTotal,

    createdAt: order.createdAt,

    user: order.user,

    items: order.items.map((item) => ({
      id: item.id,

      foodName: item.foodVariant.food.name,

      variantName: item.foodVariant.name,

      quantity: item.quantity,

      unitPrice: item.unitPrice,

      totalPrice: item.totalPrice,

      toppings: item.toppings.map((t) => ({
        id: t.id,

        name: t.topping.name,

        quantity: t.quantity,

        unitPrice: t.unitPrice,

        totalPrice: t.totalPrice,
      })),
    })),
  };
}
export async function updateOrderStatusService(
  orderId,
  status
) {
  const order =
    await findOrderDetailForAdmin(orderId);

  if (!order) {
    throw new Error("Không tìm thấy đơn.");
  }

  if (
    order.status === "COMPLETED" ||
    order.status === "CANCELLED"
  ) {
    throw new Error(
      "Đơn đã kết thúc."
    );
  }

  if (
    ![
      "COMPLETED",
      "CANCELLED",
    ].includes(status)
  ) {
    throw new Error(
      "Trạng thái không hợp lệ."
    );
  }

  return prisma.$transaction(async (tx) => {

    const updated = await updateOrderStatus(
      tx,
      orderId,
      status
    );

    emitOrderUpdated({
      id: updated.id,
      status: updated.status,
      
    });

    return updated;

  });
}