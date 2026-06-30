import express from "express";

import { registerController } from "../controllers/auth.controller.js";

import { asyncHandler } from "../middlewares/asyncHandler.js";

const router = express.Router();

router.post(
  "/register",
  asyncHandler(registerController)
);

export default router;