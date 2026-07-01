import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  items: [],

  addItem(food, variant) {
    const items = [...get().items];

    const index = items.findIndex(
      (item) =>
        item.foodVariantId === variant.id
    );

    if (index >= 0) {
      items[index].quantity += 1;

      set({ items });
      return;
    }

    items.push({
      foodName: food.name,

      thumbnail: food.thumbnail,

      foodVariantId: variant.id,

      variantName: variant.name,

      price: variant.price,

      quantity: 1,

      toppings: [],
    });

    set({ items });
  },

  increase(foodVariantId) {
    set({
      items: get().items.map((item) =>
        item.foodVariantId === foodVariantId
          ? {
              ...item,
              quantity:
                item.quantity + 1,
            }
          : item
      ),
    });
  },

  decrease(foodVariantId) {
    let items = [...get().items];

    items = items
      .map((item) => {
        if (
          item.foodVariantId !==
          foodVariantId
        )
          return item;

        return {
          ...item,
          quantity:
            item.quantity - 1,
        };
      })
      .filter(
        (item) => item.quantity > 0
      );

    set({ items });
  },

  remove(foodVariantId) {
    set({
      items: get().items.filter(
        (item) =>
          item.foodVariantId !==
          foodVariantId
      ),
    });
  },

  updateToppings(
    foodVariantId,
    toppings
  ) {
    set({
      items: get().items.map((item) =>
        item.foodVariantId ===
        foodVariantId
          ? {
              ...item,
              toppings,
            }
          : item
      ),
    });
  },

  clear() {
    set({
      items: [],
    });
  },

  totalItems() {
    return get().items.reduce(
      (sum, item) =>
        sum + item.quantity,
      0
    );
  },

  totalPrice() {
    return get().items.reduce(
      (sum, item) => {
        const toppingPrice =
          item.toppings.reduce(
            (t, topping) =>
              t +
              topping.price *
                topping.quantity,
            0
          );

        return (
          sum +
          (item.price +
            toppingPrice) *
            item.quantity
        );
      },
      0
    );
  },

  getPayload(
    customerName,
    phone,
    note = ""
  ) {
    return {
      customerName,

      phone,

      receiveType: "PICKUP",

      address: "",

      shippingNote: "",

      note,

      items: get().items.map(
        (item) => ({
          foodVariantId:
            item.foodVariantId,

          quantity: item.quantity,

          toppings:
            item.toppings.map(
              (topping) => ({
                toppingId:
                  topping.id,

                quantity:
                  topping.quantity,
              })
            ),
        })
      ),
    };
  },
}));