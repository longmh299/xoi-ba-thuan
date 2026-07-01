import express from "express";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import {
  getAllOrdersController,
  getOrderDetailForAdminController,
  updateOrderStatusController,
} from "../controllers/order.controller.js";


const router = express.Router();

router.get(
  "/orders",
  authMiddleware,
  adminMiddleware,
  getAllOrdersController
);
router.get(
  "/orders/:id",
  authMiddleware,
  adminMiddleware,
  getOrderDetailForAdminController
);
router.patch(
  "/orders/:id/status",
  authMiddleware,
  adminMiddleware,
  updateOrderStatusController
);
export default router;