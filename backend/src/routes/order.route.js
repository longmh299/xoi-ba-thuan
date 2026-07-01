import express from "express";

console.log("🔥 ORDER ROUTE LOADED");

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import {
  createOrderController,
  getMyOrdersController,
  getOrderDetailController,
  getAllOrdersController,
  getOrderDetailForAdminController,
  updateOrderStatusController,
} from "../controllers/order.controller.js";

const router = express.Router();

router.get("/ping", (req, res) => {
  res.json({
    ok: true,
  });
});

router.post("/", authMiddleware, createOrderController);

router.get("/my", authMiddleware, getMyOrdersController);

router.get("/:id", authMiddleware, getOrderDetailController);
router.patch(
  "/orders/:id/status",
  authMiddleware,
  adminMiddleware,
  updateOrderStatusController
);
export default router;