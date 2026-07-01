export default function OrderSummary({
    totalItems,
    totalPrice,
    onCheckout,
    loading = false,
}) {
    return (
        <div
            className="
                bg-white
                rounded-3xl
                shadow
                p-5
            "
        >
            <div className="flex justify-between">

                <span>Tổng món</span>

                <strong>{totalItems}</strong>

            </div>

            <div className="flex justify-between mt-3">

                <span>Tổng tiền</span>

                <strong className="text-green-600">

                    {Number(totalPrice).toLocaleString("vi-VN")}đ

                </strong>

            </div>

            <button
                onClick={onCheckout}
                disabled={loading}
                className={`
                    mt-6
                    w-full
                    h-14
                    rounded-2xl
                    text-white
                    font-bold
                    transition
                    ${
                        loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-green-600 active:scale-[0.98]"
                    }
                `}
            >
                {loading
                    ? "ĐANG ĐẶT HÀNG..."
                    : "ĐẶT HÀNG"}
            </button>

        </div>
    );
}