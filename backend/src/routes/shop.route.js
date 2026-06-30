import express from "express";
import { getShopController } from "../controllers/shop.controller.js";

const router = express.Router();

router.get("/", getShopController);

export default router;