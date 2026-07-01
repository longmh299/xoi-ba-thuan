import { Link } from "react-router-dom";

const STATUS = {
    PENDING: {
        label: "🟠 Đã nhận đơn",
        className: "bg-orange-100 text-orange-700",
    },
    COMPLETED: {
        label: "🟢 Đã chuẩn bị xong",
        className: "bg-green-100 text-green-700",
    },
};

export default function CustomerOrderCard({ order }) {
    const status =
        STATUS[order.status] ?? {
            label: order.status,
            className: "bg-gray-100 text-gray-700",
        };

    return (
        <Link
            to={`/my-orders/${order.id}`}
            className="
                block
                bg-white
                rounded-3xl
                p-5
                shadow
                border
                active:scale-[0.98]
                transition
            "
        >
            <div className="flex justify-between items-start">
                <div>
                    <p className="font-bold text-lg">
                        Đơn #{order.id}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                        {new Date(
                            order.createdAt
                        ).toLocaleString("vi-VN")}
                    </p>
                </div>

                <span
                    className={`
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        font-semibold
                        ${status.className}
                    `}
                >
                    {status.label}
                </span>
            </div>

            <div className="mt-4 space-y-1">
                {(order.items ?? [])
                    .slice(0, 2)
                    .map((item) => (
                        <p
                            key={item.id}
                            className="text-gray-700"
                        >
                            {item.quantity} ×{" "}
                            {item.foodName}{" "}
                            {item.variantName}
                        </p>
                    ))}

                {(order.items?.length ?? 0) >
                    2 && (
                    <p className="text-sm text-gray-400">
                        +
                        {order.items.length -
                            2}{" "}
                        món khác
                    </p>
                )}
            </div>

            <div className="mt-5 flex justify-between items-center">
                <p className="font-bold text-xl text-green-600">
                    {order.grandTotal.toLocaleString(
                        "vi-VN"
                    )}{" "}
                    đ
                </p>

                <span className="text-orange-500 font-semibold">
                    Xem chi tiết →
                </span>
            </div>
        </Link>
    );
}