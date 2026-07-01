import express from "express";
import cors from "cors";

import shopRoute from "./routes/shop.route.js";
import homeRoute from "./routes/home.route.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import authRoute from "./routes/auth.route.js";
import adminRoute from "./routes/admin.route.js";
import orderRoutes from "./routes/order.route.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(">>>", req.method, req.originalUrl);
  next();
});
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Xôi Bà Thuận API"
    });
});
app.use("/auth", authRoute);
app.use("/shop", shopRoute);
app.use("/home", homeRoute);
app.use("/orders", orderRoutes);
app.use("/admin", adminRoute);
app.use(errorHandler);
export default app;