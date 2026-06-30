import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedShop() {
  console.log("🏪 Seeding Shop...");

  await prisma.shop.upsert({
    where: {
      slug: "main",
    },
    update: {
      name: "Xôi Bà Thuận",
      phone: "0384503009",
      address: "Giao Thủy - Nam Định",
      logo: "https://i-giadinh.vnecdn.net/2021/10/08/nh1-1633673448-8968-1633673738.jpg",
      facebook: "",
      zalo: "",
      shippingFeeDefault: 15000,
      isOpen: true,
      closeMessage: null,
    },
    create: {
      slug: "main",
      name: "Xôi Bà Thuận",
      phone: "0384503009",
      address: "Giao Thủy - Nam Định",
      logo: "https://i-giadinh.vnecdn.net/2021/10/08/nh1-1633673448-8968-1633673738.jpg",
      facebook: "",
      zalo: "",
      shippingFeeDefault: 15000,
      isOpen: true,
      closeMessage: null,
    },
  });

  console.log("✅ Shop");
}

async function seedBanner() {
  console.log("🖼️ Seeding Banner...");

  const banners = [
    {
      title: "Banner 1",
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
      sortOrder: 1,
    },
    {
      title: "Banner 2",
      image:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
      sortOrder: 2,
    },
  ];

  for (const banner of banners) {
    await prisma.banner.upsert({
      where: {
        title: banner.title,
      },
      update: banner,
      create: banner,
    });
  }

  console.log("✅ Banner");
}

async function seedCategory() {
  console.log("📂 Seeding Category...");

  const categories = [
    {
      name: "Xôi",
      sortOrder: 1,
    },
    {
      name: "Đồ uống",
      sortOrder: 2,
    },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: {
        name: category.name,
      },
      update: category,
      create: category,
    });
  }

  console.log("✅ Category");
}
async function seedFood() {
  console.log("🍱 Seeding Food...");

  const xoiCategory = await prisma.category.findUnique({
    where: {
      name: "Xôi",
    },
  });

  if (!xoiCategory) {
    throw new Error("Không tìm thấy category Xôi");
  }

  const foods = [
    {
      name: "Xôi Gà",
      description: "Xôi gà xé truyền thống",
      thumbnail:
        "https://images.unsplash.com/photo-1512058564366-18510be2db19",
      variants: [
        { name: "10K", price: 10000 },
        { name: "15K", price: 15000 },
        { name: "20K", price: 20000 },
      ],
    },

    {
      name: "Xôi Xá Xíu",
      description: "Xôi xá xíu đậm vị",
      thumbnail:
        "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f",
      variants: [
        { name: "10K", price: 10000 },
        { name: "15K", price: 15000 },
        { name: "20K", price: 20000 },
      ],
    },

    {
      name: "Xôi Thịt Kho",
      description: "Xôi thịt kho trứng",
      thumbnail:
        "https://images.unsplash.com/photo-1544025162-d76694265947",
      variants: [
        { name: "10K", price: 10000 },
        { name: "15K", price: 15000 },
      ],
    },

    {
      name: "Xôi Ruốc",
      description: "Xôi ruốc thơm ngon",
      thumbnail:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
      variants: [
        { name: "10K", price: 10000 },
        { name: "15K", price: 15000 },
      ],
    },

    {
      name: "Xôi Đậu",
      description: "Xôi đậu xanh",
      thumbnail:
        "https://images.unsplash.com/photo-1509440159596-0249088772ff",
      variants: [
        { name: "5K", price: 5000 },
        { name: "10K", price: 10000 },
      ],
    },

    {
      name: "Xôi Trứng",
      description: "Xôi trứng cút",
      thumbnail:
        "https://images.unsplash.com/photo-1490645935967-10de6ba17061",
      variants: [
        { name: "10K", price: 10000 },
        { name: "15K", price: 15000 },
      ],
    },
  ];

  for (const item of foods) {
    const food = await prisma.food.upsert({
      where: {
        name: item.name,
      },

      update: {
        categoryId: xoiCategory.id,
        description: item.description,
        thumbnail: item.thumbnail,
      },

      create: {
        categoryId: xoiCategory.id,
        name: item.name,
        description: item.description,
        thumbnail: item.thumbnail,
      },
    });

    for (let i = 0; i < item.variants.length; i++) {
      const variant = item.variants[i];

      await prisma.foodVariant.upsert({
        where: {
          foodId_name: {
            foodId: food.id,
            name: variant.name,
          },
        },

        update: {
          price: variant.price,
          sortOrder: i + 1,
          isActive: true,
        },

        create: {
          foodId: food.id,
          name: variant.name,
          price: variant.price,
          sortOrder: i + 1,
        },
      });
    }
  }

  console.log("✅ Food");

  console.log("✅ Variant");
}
async function seedTopping() {
  console.log("🥚 Seeding Topping...");

  const toppings = [
    { name: "Trứng", price: 5000, sortOrder: 1 },
    { name: "Chả", price: 5000, sortOrder: 2 },
    { name: "Ruốc", price: 5000, sortOrder: 3 },
    { name: "Thịt", price: 10000, sortOrder: 4 },
    { name: "Xúc Xích", price: 5000, sortOrder: 5 },
    { name: "Pate", price: 5000, sortOrder: 6 },
    { name: "Hành Phi", price: 3000, sortOrder: 7 },
  ];

  for (const topping of toppings) {
    await prisma.topping.upsert({
      where: {
        name: topping.name,
      },
      update: topping,
      create: topping,
    });
  }

  console.log("✅ Topping");
}

async function seedFoodTopping() {
  console.log("🔗 Seeding Food Topping...");

  const foodToppings = [
    {
      food: "Xôi Gà",
      toppings: ["Trứng", "Chả", "Ruốc", "Hành Phi"],
    },
    {
      food: "Xôi Xá Xíu",
      toppings: ["Trứng", "Ruốc", "Hành Phi"],
    },
    {
      food: "Xôi Thịt Kho",
      toppings: ["Trứng", "Thịt", "Hành Phi"],
    },
    {
      food: "Xôi Ruốc",
      toppings: ["Ruốc", "Hành Phi"],
    },
    {
      food: "Xôi Đậu",
      toppings: ["Hành Phi"],
    },
    {
      food: "Xôi Trứng",
      toppings: ["Trứng", "Hành Phi"],
    },
  ];

  for (const item of foodToppings) {
    const food = await prisma.food.findUnique({
      where: {
        name: item.food,
      },
    });

    if (!food) continue;

    for (const toppingName of item.toppings) {
      const topping = await prisma.topping.findUnique({
        where: {
          name: toppingName,
        },
      });

      if (!topping) continue;

      await prisma.foodTopping.upsert({
        where: {
          foodId_toppingId: {
            foodId: food.id,
            toppingId: topping.id,
          },
        },
        update: {},
        create: {
          foodId: food.id,
          toppingId: topping.id,
        },
      });
    }
  }

  console.log("✅ Food Topping");
}
async function main() {
  await seedShop();

  await seedBanner();

  await seedCategory();

  await seedFood();

  await seedTopping();

  await seedFoodTopping();

  console.log("\n🎉 Database seeded successfully!");
}

main()
  .catch((error) => {
    console.error("\n❌ Seed failed");
    console.error(error);

    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });