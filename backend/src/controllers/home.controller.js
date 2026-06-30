import { getHomeData } from "../services/home.service.js";

export async function getHomeController(req, res) {
  try {
    const data = await getHomeData();

    return res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}