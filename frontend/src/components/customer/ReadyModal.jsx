export default function ReadyModal({
    open,
    order,
    onClose,
}) {
    if (!open) return null;

    return (
        <div
            className="
                fixed
                inset-0
                bg-black/40
                z-[999]
                flex
                items-center
                justify-center
                p-5
            "
        >
            <div className="bg-white rounded-3xl p-6 w-full max-w-sm text-center">

                <div className="text-6xl">
                    🎉
                </div>

                <h2 className="text-2xl font-bold mt-4">
                    Xôi đã sẵn sàng!
                </h2>

                <p className="text-gray-500 mt-3">
                    Đơn #{order?.id}
                </p>

                <p className="mt-2">
                    Mời bạn tới quầy nhận nhé.
                </p>

                <button
                    onClick={onClose}
                    className="
                        mt-6
                        w-full
                        h-12
                        rounded-xl
                        bg-green-600
                        text-white
                        font-bold
                    "
                >
                    Đã hiểu
                </button>

            </div>
        </div>
    );
}