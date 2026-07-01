import { useEffect, useState } from "react";
import BottomNav from "../../components/customer/BottomNav";
import {
    ArrowLeft,
} from "lucide-react";
import {
    useNavigate,
    useParams,
} from "react-router-dom";

import { getOrderDetail } from "../../api/order.api";

const STATUS = {
    PENDING: {
        label: "🟠 Đã nhận đơn",
        className: "bg-orange-100 text-orange-700",
    },

    COMPLETED: {
        label: "🟢 Đã chuẩn bị xong",
        className: "bg-green-100 text-green-700",
    },

    CANCELLED: {
        label: "🔴 Đã huỷ",
        className: "bg-red-100 text-red-700",
    },
};

export default function OrderDetailPage() {
    const navigate = useNavigate();

    const { id } = useParams();

    const [order, setOrder] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrder();
    }, []);

    async function fetchOrder() {
        try {
            setLoading(true);

            const res = await getOrderDetail(id);

            setOrder(res.data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-100 flex flex-col">

                <div className="sticky top-0 z-20 bg-white shadow-sm">

                    <div className="h-16 flex items-center px-4">

                        <button
                            onClick={() => navigate(-1)}
                            className="
                                w-10
                                h-10
                                rounded-full
                                hover:bg-slate-100
                                flex
                                items-center
                                justify-center
                                transition
                            "
                        >
                            <ArrowLeft size={22} />
                        </button>

                        <h1 className="ml-3 text-2xl font-bold">
                            Chi tiết đơn hàng
                        </h1>

                    </div>

                </div>

                <div className="flex-1 max-w-lg mx-auto w-full p-4 space-y-4">

                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="bg-white rounded-3xl h-28 animate-pulse"
                        />
                    ))}

                </div>

            </div>
        );
    }

    if (!order) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Không tìm thấy đơn hàng.
            </div>
        );
    }

    const status =
        STATUS[order.status] ?? {
            label: order.status,
            className: "bg-gray-100 text-gray-700",
        };

    return (
        <div className="min-h-screen bg-slate-100 flex flex-col">

            {/* Header */}

            <div className="sticky top-0 z-20 bg-white shadow-sm">

                <div className="h-16 flex items-center px-4">

                    <button
                        onClick={() => navigate(-1)}
                        className="
                            w-10
                            h-10
                            rounded-full
                            hover:bg-slate-100
                            flex
                            items-center
                            justify-center
                            transition
                        "
                    >
                        <ArrowLeft size={22} />
                    </button>

                    <h1 className="ml-3 text-2xl font-bold">
                        Chi tiết đơn hàng
                    </h1>

                </div>

            </div>

            {/* Content */}

            <div className="flex-1 max-w-lg mx-auto w-full p-4 pb-24 space-y-4">

                <div className="bg-white rounded-3xl p-5 shadow">

                    <div className="flex justify-between items-center">

                        <div>

                            <p className="text-sm text-gray-500">
                                Mã đơn
                            </p>

                            <h2 className="text-xl font-bold">
                                {order.orderCode}
                            </h2>

                        </div>

                        <span
                            className={`
                                px-3
                                py-1
                                rounded-full
                                text-sm
                                font-semibold
                                ${status.className}
                            `}
                        >
                            {status.label}
                        </span>

                    </div>

                    <p className="text-sm text-gray-500 mt-3">
                        {new Date(
                            order.createdAt
                        ).toLocaleString("vi-VN")}
                    </p>

                </div>

                <div className="bg-white rounded-3xl p-5 shadow">

                    <h3 className="font-bold mb-4">
                        Món đã đặt
                    </h3>

                    <div className="space-y-5">

                        {order.items.map((item) => (
                            <div key={item.id}>

                                <div className="flex justify-between">

                                    <div>

                                        <p className="font-semibold">
                                            {item.foodName}
                                        </p>

                                        <p className="text-sm text-gray-500">
                                            {item.variantName}
                                        </p>

                                        <p className="text-sm mt-1">
                                            x{item.quantity}
                                        </p>

                                        {item.toppings.length >
                                            0 && (
                                            <div className="mt-2 space-y-1">

                                                {item.toppings.map(
                                                    (
                                                        topping
                                                    ) => (
                                                        <p
                                                            key={
                                                                topping.id
                                                            }
                                                            className="text-sm text-gray-500"
                                                        >
                                                            +{" "}
                                                            {
                                                                topping.name
                                                            }{" "}
                                                            ×
                                                            {
                                                                topping.quantity
                                                            }
                                                        </p>
                                                    )
                                                )}

                                            </div>
                                        )}

                                    </div>

                                    <div className="font-semibold">

                                        {Number(
                                            item.totalPrice
                                        ).toLocaleString(
                                            "vi-VN"
                                        )}{" "}
                                        đ

                                    </div>

                                </div>

                            </div>
                        ))}

                    </div>

                </div>

                <div className="bg-white rounded-3xl p-5 shadow space-y-3">

                    <div className="flex justify-between">

                        <span>Tạm tính</span>

                        <span>

                            {Number(
                                order.itemsTotal
                            ).toLocaleString(
                                "vi-VN"
                            )}{" "}
                            đ

                        </span>

                    </div>

                    <div className="flex justify-between">

                        <span>Phí ship</span>

                        <span>

                            {Number(
                                order.shippingFee
                            ).toLocaleString(
                                "vi-VN"
                            )}{" "}
                            đ

                        </span>

                    </div>

                    <div className="flex justify-between">

                        <span>Giảm giá</span>

                        <span>

                            -
                            {Number(
                                order.discount
                            ).toLocaleString(
                                "vi-VN"
                            )}{" "}
                            đ

                        </span>

                    </div>

                    <hr />

                    <div className="flex justify-between text-lg font-bold text-green-600">

                        <span>Tổng cộng</span>

                        <span>

                            {Number(
                                order.grandTotal
                            ).toLocaleString(
                                "vi-VN"
                            )}{" "}
                            đ

                        </span>

                    </div>

                </div>

                <div className="bg-white rounded-3xl p-5 shadow space-y-3">

                    <h3 className="font-bold">
                        Thông tin giao hàng
                    </h3>

                    <p>
                        <strong>Khách:</strong>{" "}
                        {order.customerName}
                    </p>

                    <p>
                        <strong>SĐT:</strong>{" "}
                        {order.phone}
                    </p>

                    <p>
                        <strong>Hình thức:</strong>{" "}
                        {order.receiveType ===
                        "DELIVERY"
                            ? "Giao tận nơi"
                            : "Đến lấy"}
                    </p>

                    {order.address && (
                        <p>
                            <strong>Địa chỉ:</strong>{" "}
                            {order.address}
                        </p>
                    )}

                    {order.note && (
                        <p>
                            <strong>Ghi chú:</strong>{" "}
                            {order.note}
                        </p>
                    )}

                    {order.shippingNote && (
                        <p>
                            <strong>Ghi chú ship:</strong>{" "}
                            {order.shippingNote}
                        </p>
                    )}

                </div>

            </div>
             <BottomNav />       
        </div>
    );
}