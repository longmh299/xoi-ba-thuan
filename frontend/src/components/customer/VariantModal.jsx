import { useState, useEffect } from "react";

import { useCartStore } from "../../store/cart.store";

export default function VariantModal({
  open,
  food,
  onClose,
}) {
  const addItem = useCartStore(
    (state) => state.addItem
  );
  
  const [selected, setSelected] =
    useState(null);
  useEffect(() => {
  if (open) {
    setSelected(null);
  }
}, [open]);
  if (!open || !food) return null;

  function handleAdd() {
    if (!selected) return;

    addItem(food, selected);

    onClose();
  }

  return (
    <div
      className="
        fixed inset-0
        bg-black/40
        flex items-end
        z-100
      "
    >
      <div
        className="
          w-full
          bg-white
          rounded-t-3xl
          p-5
          animate-slide-up
        "
      >
        <div className="flex justify-between items-center">

          <h2 className="text-2xl font-bold">
            {food.name}
          </h2>

          <button
            onClick={onClose}
            className="text-2xl"
          >
            ✕
          </button>

        </div>

        <p className="text-gray-500 mt-1">
          Chọn kích cỡ
        </p>

        <div className="mt-5 space-y-3">

          {food.variants.map((variant) => (

            <button
              key={variant.id}
              onClick={() =>
                setSelected(variant)
              }
              className={`
                w-full
                flex
                justify-between
                items-center
                rounded-2xl
                border
                p-4
                transition
                ${
                  selected?.id ===
                  variant.id
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200"
                }
              `}
            >

              <span className="font-semibold">
                {variant.name}
              </span>

              <span className="font-bold text-green-600">
                {variant.price.toLocaleString(
                  "vi-VN"
                )}
                đ
              </span>

            </button>

          ))}

        </div>

        <button
          disabled={!selected}
          onClick={handleAdd}
          className="
            mt-6
            w-full
            h-12
            rounded-2xl
            bg-green-600
            text-white
            font-bold
            disabled:opacity-50
          "
        >
          Thêm vào giỏ
        </button>

      </div>
    </div>
  );
}