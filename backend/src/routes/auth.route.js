import express from "express";

import { registerController } from "../controllers/auth.controller.js";

import { asyncHandler } from "../middlewares/asyncHandler.js";
import {
  loginController,
  meController
} from "../controllers/auth.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
  "/register",
  asyncHandler(registerController)
);
router.post(
  "/login",
  asyncHandler(loginController)
);
router.get(
  "/me",
  authMiddleware,
  asyncHandler(meController)
);

export default router;
