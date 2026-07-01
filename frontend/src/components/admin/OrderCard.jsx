export default function OrderCard({
    order,
    onComplete,
}) {
    if (!order) return null;

    const customerName =
        order.customerName ||
        order.user?.name ||
        "Khách";

    const phone =
        order.phone ||
        order.user?.phone ||
        "---";

    const items = order.items ?? [];

    return (
        <div
            className={`
        rounded-3xl
        shadow-md
        p-5
        mb-5
        ${order.status === "COMPLETED"
                    ? "bg-green-50 border border-green-200"
                    : "bg-white"
                }
      `}
        >
            <div className="space-y-3">

                <p className="text-xl font-bold">
                    👤 {customerName}
                </p>

                <p className="text-lg">
                    📞 {phone}
                </p>

                <div className="space-y-1">
                    {items.map((item) => (
                        <p
                            key={item.id}
                            className="text-lg"
                        >
                            🍚 {item.foodName} {item.variantName}
                            {" ×"}
                            {item.quantity}
                        </p>
                    ))}

                    {items.length === 0 && (
                        <p className="text-lg">
                            🍚 Xôi
                        </p>
                    )}
                </div>

                <p className="text-xl font-bold text-green-600">
                    💰{" "}
                    {order.grandTotal.toLocaleString(
                        "vi-VN"
                    )}{" "}
                    đ
                </p>

            </div>

            {order.status === "PENDING" ? (
                <button
                    onClick={() =>
                        onComplete?.(order.id)
                    }
                    className="
            mt-6
            w-full
            h-14
            rounded-2xl
            bg-green-500
            text-white
            font-bold
            text-lg
            active:scale-95
            transition
          "
                >
                    ✅ ĐÃ XONG
                </button>
            ) : (
                <div
                    className="
            mt-6
            h-14
            rounded-2xl
            bg-green-500
            text-white
            flex
            items-center
            justify-center
            font-bold
            text-lg
          "
                >
                    ✅ Chờ khách lấy
                </div>
            )}
        </div>
    );
}