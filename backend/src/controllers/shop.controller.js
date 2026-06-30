import { getShop } from "../services/shop.service.js";

export async function getShopController(req, res) {
  try {
    const shop = await getShop();

    if (!shop) {
      return res.status(404).json({
        success: false,
        message: "Chưa cấu hình cửa hàng"
      });
    }

    return res.json({
      success: true,
      data: shop
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
}