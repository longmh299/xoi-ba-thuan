import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "../../store/cart.store";

export default function CartItem({ item }) {
    const increase = useCartStore(
        (state) => state.increase
    );

    const decrease = useCartStore(
        (state) => state.decrease
    );

    const remove = useCartStore(
        (state) => state.remove
    );

    return (
        <div
            className="
                bg-white
                rounded-3xl
                p-5
                shadow
            "
        >
            {/* Header */}

            <div className="flex justify-between items-start">

                <div>

                    <h2 className="text-xl font-bold">
                        {item.foodName}
                    </h2>

                    <p className="text-gray-500 text-sm mt-1">
                        {item.variantName}
                    </p>

                </div>

                <button
                    onClick={() =>
                        remove(item.foodVariantId)
                    }
                    className="
                        text-gray-400
                        hover:text-red-500
                        transition
                    "
                >
                    <Trash2 size={18} />
                </button>

            </div>

            {/* Bottom */}

            <div className="flex justify-between items-center mt-5">

                <div>

                    <p className="text-green-600 text-xl font-bold">
                        {(
                            item.price *
                            item.quantity
                        ).toLocaleString("vi-VN")}
                        đ
                    </p>

                    {item.quantity > 1 && (
                        <p className="text-xs text-gray-400 mt-1">
                            {item.price.toLocaleString(
                                "vi-VN"
                            )}
                            đ / phần
                        </p>
                    )}

                </div>

                <div className="flex items-center gap-2">

                    <button
                        onClick={() =>
                            decrease(
                                item.foodVariantId
                            )
                        }
                        className="
                            w-9
                            h-9
                            rounded-full
                            bg-gray-100
                            flex
                            items-center
                            justify-center
                        "
                    >
                        <Minus size={16} />
                    </button>

                    <span className="w-8 text-center font-bold">
                        {item.quantity}
                    </span>

                    <button
                        onClick={() =>
                            increase(
                                item.foodVariantId
                            )
                        }
                        className="
                            w-9
                            h-9
                            rounded-full
                            bg-green-500
                            text-white
                            flex
                            items-center
                            justify-center
                        "
                    >
                        <Plus size={16} />
                    </button>

                </div>

            </div>

        </div>
    );
}