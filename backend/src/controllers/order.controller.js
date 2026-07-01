import { createOrderService } from "../services/order.service.js";
import { success, fail } from "../responses/apiResponse.js";
import { getMyOrdersService } from "../services/order.service.js";
import { getOrderDetailService } from "../services/order.service.js";
import { getAllOrdersService } from "../services/order.service.js";
import { getOrderDetailForAdminService,
    updateOrderStatusService,
 } from "../services/order.service.js";
export async function createOrderController(req, res) {
  try {
    const order = await createOrderService(req.user.id, req.body);

    return success(
      res,
      order,
      "Đặt hàng thành công",
      201
    );
  } catch (error) {
    console.error(error);

    return fail(
      res,
      error.message || "Internal Server Error",
      error.status || 500
    );
  }
}
export async function getMyOrdersController(req, res) {
  try {
    const orders = await getMyOrdersService(req.user.id);

    return success(res, orders);
  } catch (error) {
    console.error(error);

    return fail(
      res,
      error.message || "Internal Server Error",
      error.status || 500
    );
  }
}
export async function getOrderDetailController(req, res) {
  try {
    const data = await getOrderDetailService(
      req.user.id,
      req.params.id
    );

    return success(res, data);
  } catch (error) {
    console.error(error);

    return fail(
      res,
      error.message || "Internal Server Error",
      error.status || 500
    );
  }
}
export async function getAllOrdersController(req, res) {
  try {
    const orders = await getAllOrdersService(req.query);

    return success(res, orders);
  } catch (error) {
    console.error(error);

    return fail(
      res,
      error.message || "Internal Server Error",
      error.status || 500
    );
  }
}
export async function getOrderDetailForAdminController(req, res) {
  try {
    const order = await getOrderDetailForAdminService(
      req.params.id
    );

    return success(res, order);
  } catch (error) {
    console.error(error);

    return fail(
      res,
      error.message || "Internal Server Error",
      error.status || 500
    );
  }
}
export async function updateOrderStatusController(
  req,
  res
) {
  try {
    const order =
      await updateOrderStatusService(
        req.params.id,
        req.body.status
      );

    return success(
      res,
      order,
      "Cập nhật thành công"
    );
  } catch (error) {
    console.error(error);

    return fail(
      res,
      error.message,
      400
    );
  }
}