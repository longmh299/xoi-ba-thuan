import express from "express";
import { getHomeController } from "../controllers/home.controller.js";

const router = express.Router();

router.get("/", getHomeController);

export default router;