import { ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../store/cart.store";

export default function CartBar() {
    const navigate = useNavigate();

    const items = useCartStore((state) => state.items);

    const totalItems = useCartStore((state) =>
        state.totalItems()
    );

    const totalPrice = useCartStore((state) =>
        state.totalPrice()
    );

    if (items.length === 0) return null;

    return (
        <div
            className="
                fixed
                bottom-20
                left-4
                right-4
                z-40
                max-w-md
                mx-auto
            "
        >
            <button
                onClick={() => navigate("/cart")}
                className="
                    w-full
                    h-14
                    rounded-2xl
                    bg-green-600
                    text-white
                    shadow-lg
                    px-5
                    flex
                    items-center
                    justify-between
                    active:scale-[0.98]
                    transition
                "
            >
                <div className="flex items-center gap-3">

                    <div
                        className="
                            w-9
                            h-9
                            rounded-full
                            bg-white/20
                            flex
                            items-center
                            justify-center
                        "
                    >
                        <ShoppingBag size={18} />
                    </div>

                    <div className="text-left">

                        <p className="font-semibold leading-none">
                            {totalItems} món
                        </p>

                        <p className="text-xs opacity-90 mt-1">
                            Xem giỏ hàng
                        </p>

                    </div>

                </div>

                <p className="text-lg font-bold">
                    {totalPrice.toLocaleString("vi-VN")}đ
                </p>

            </button>
        </div>
    );
}