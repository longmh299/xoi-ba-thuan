import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { createOrder } from "../../api/order.api";
import { useAuthStore } from "../../store/auth.store";
import { useCartStore } from "../../store/cart.store";

import CartItem from "../../components/customer/CartItem";
import OrderSummary from "../../components/customer/OrderSummary";

export default function CartPage() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const user = useAuthStore((state) => state.user);

    const clear = useCartStore((state) => state.clear);

    const getPayload = useCartStore(
        (state) => state.getPayload
    );

    const items = useCartStore(
        (state) => state.items
    );

    const totalItems = useMemo(
        () =>
            items.reduce(
                (sum, item) =>
                    sum + item.quantity,
                0
            ),
        [items]
    );

    const totalPrice = useMemo(
        () =>
            items.reduce(
                (sum, item) =>
                    sum +
                    item.price *
                        item.quantity,
                0
            ),
        [items]
    );

    async function handleCheckout() {
        if (loading) return;

        try {
            setLoading(true);

            const payload = getPayload(
                user.name,
                user.phone
            );

            await createOrder(payload);

            clear();

            alert("Đặt hàng thành công!");

            navigate("/my-orders");
        } catch (err) {
            console.error(err);

            alert(
                err.response?.data?.message ||
                    "Đặt hàng thất bại"
            );
        } finally {
            setLoading(false);
        }
    }

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
                        Giỏ hàng
                    </h1>

                </div>

            </div>

            {/* Content */}

            <div
                className="
                    flex-1
                    p-4
                    space-y-3
                    pb-36
                "
            >
                {items.length === 0 && (
                    <div
                        className="
                            bg-white
                            rounded-2xl
                            p-10
                            text-center
                            shadow
                        "
                    >
                        <div className="text-6xl">
                            🛒
                        </div>

                        <p className="mt-4 text-gray-500">
                            Giỏ hàng đang trống
                        </p>

                        <button
                            onClick={() =>
                                navigate(-1)
                            }
                            className="
                                mt-6
                                h-12
                                px-6
                                rounded-xl
                                bg-green-600
                                text-white
                                font-semibold
                            "
                        >
                            Chọn món ngay
                        </button>
                    </div>
                )}

                {items.map((item) => (
                    <CartItem
                        key={
                            item.foodVariantId
                        }
                        item={item}
                    />
                ))}
            </div>

            {/* Footer */}

            {items.length > 0 && (
                <div
                    className="
                        fixed
                        bottom-0
                        left-0
                        right-0
                        bg-white
                        border-t
                        shadow-2xl
                        px-4
                        pt-4
                        pb-6
                    "
                >
                    <OrderSummary
                        totalItems={
                            totalItems
                        }
                        totalPrice={
                            totalPrice
                        }
                        onCheckout={
                            handleCheckout
                        }
                        loading={loading}
                    />
                </div>
            )}

        </div>
    );
}