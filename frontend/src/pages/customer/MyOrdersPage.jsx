import { useEffect, useState } from "react";
import { ArrowLeft, PackageOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../../components/customer/BottomNav";
import { getMyOrders } from "../../api/order.api";
import CustomerOrderCard from "../../components/customer/CustomerOrderCard";
import socket from "../../socket/socket";
import { useRef } from "react";
import ReadyModal from "../../components/customer/ReadyModal";
import { playReadySound } from "../../utils/playReadySound";
export default function MyOrdersPage() {
    const navigate = useNavigate();
    const [readyOrder, setReadyOrder] = useState(null);

    const previousOrders = useRef([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchOrders() {
        try {
            setLoading(true);

            const res = await getMyOrders();

            const data = res.data.data || [];

            // So sánh trạng thái cũ -> mới
            previousOrders.current.forEach((oldOrder) => {
                const newOrder = data.find(
                    (o) => o.id === oldOrder.id
                );

                if (
                    newOrder &&
                    oldOrder.status === "PENDING" &&
                    newOrder.status === "COMPLETED"
                ) {
                    playReadySound();

                    setReadyOrder(newOrder);
                }
            });

            previousOrders.current = data;

            setOrders(data);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchOrders();

        socket.on("order-updated", () => {
            fetchOrders();
        });

        return () => {
            socket.off("order-updated");
        };
    }, []);

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
                            Đơn hàng của tôi
                        </h1>

                    </div>

                </div>

                <div className="flex-1 max-w-lg mx-auto w-full p-4 space-y-4">

                    {[1, 2, 3].map((item) => (
                        <div
                            key={item}
                            className="bg-white rounded-3xl h-36 animate-pulse"
                        />
                    ))}

                </div>

            </div>
        );
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
                        Đơn hàng của tôi
                    </h1>

                </div>

            </div>

            {/* Content */}

            <div className="flex-1 max-w-lg mx-auto w-full p-4 pb-24">

                {orders.length === 0 ? (
                    <div className="bg-white rounded-3xl py-14 px-6 text-center shadow">

                        <PackageOpen
                            size={56}
                            className="mx-auto text-gray-300"
                        />

                        <h2 className="mt-5 text-lg font-semibold">
                            Chưa có đơn hàng
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Hãy đặt món đầu tiên của bạn nhé.
                        </p>

                    </div>
                ) : (
                    <div className="space-y-4">

                        {orders.map((order) => (
                            <CustomerOrderCard
                                key={order.id}
                                order={order}
                            />
                        ))}

                    </div>
                )}

            </div>
            <ReadyModal
                open={!!readyOrder}
                order={readyOrder}
                onClose={() => setReadyOrder(null)}
            />

            <BottomNav />
        </div>
    );
}