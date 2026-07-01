const prisma = require("../config/prisma");

class HomeRepository {
  async getProducts() {
    return prisma.product.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        sortOrder: "asc",
      },
    });
  }
}

module.exports = new HomeRepository();