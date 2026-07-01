export default function FoodCard({
  food,
  onAdd,
}) {
  if (!food) return null;

  const minPrice =
    food.variants.length > 0
      ? Math.min(
          ...food.variants.map(
            (v) => v.price
          )
        )
      : 0;

  return (
    <div
      className="
        bg-white
        rounded-3xl
        shadow-sm
        overflow-hidden
      "
    >
      {/* Ảnh */}

      <div className="h-40 bg-slate-100">

        <img
          src={
            food.thumbnail ||
            "https://placehold.co/600x400?text=Xoi"
          }
          alt={food.name}
          className="w-full h-full object-cover"
        />

      </div>

      {/* Nội dung */}

      <div className="p-4">

        <h2 className="text-xl font-bold">
          {food.name}
        </h2>

        <p
          className="
            text-gray-500
            text-sm
            mt-1
            line-clamp-2
          "
        >
          {food.description}
        </p>

        <div
          className="
            mt-4
            flex
            justify-between
            items-end
          "
        >
          <div>

            <p className="text-sm text-gray-400">
              Từ
            </p>

            <p
              className="
                text-xl
                font-bold
                text-green-600
              "
            >
              {minPrice.toLocaleString(
                "vi-VN"
              )}
              đ
            </p>

            <p
              className="
                text-xs
                text-gray-400
                mt-2
              "
            >
              ⭐ Đã bán {food.soldCount}
            </p>

          </div>

          <button
            onClick={() => onAdd(food)}
            className="
              w-14
              h-14
              rounded-2xl
              bg-green-500
              text-white
              text-3xl
              font-bold
              active:scale-95
              transition
            "
          >
            +
          </button>

        </div>

      </div>
    </div>
  );
}