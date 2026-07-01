import { useEffect, useMemo, useState } from "react";
import socket from "../../socket/socket";
import AdminLayout from "../../layouts/AdminLayout";
import { getOrders } from "../../api/admin.api";
import OrderCard from "../../components/admin/OrderCard";
import { updateOrderStatus } from "../../api/admin.api";
import { playNotification } from "../../utils/playNotification";

export default function DashboardPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("PENDING");
    const [keyword, setKeyword] = useState("");
    const [newOrderId, setNewOrderId] = useState(null);
    async function loadOrders() {
        try {
            const data = await getOrders();

            // mới nhất lên đầu
            data.sort(
                (a, b) =>
                    new Date(b.createdAt) -
                    new Date(a.createdAt)
            );

            setOrders(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    async function handleComplete(orderId) {
        try {
            await updateOrderStatus(
                orderId,
                "COMPLETED"
            );

            setOrders((prev) =>
                prev.map((order) =>
                    order.id === orderId
                        ? {
                            ...order,
                            status: "COMPLETED",
                            completedAt:
                                new Date().toISOString(),
                        }
                        : order
                )
            );
        } catch (error) {
            console.error(error);
            alert("Cập nhật thất bại.");
        }
    }
    useEffect(() => {

        loadOrders();

        socket.on("new-order", () => {

            playNotification();
            loadOrders();
            setActiveTab("PENDING");

        });

        return () => {

            socket.off("new-order");

        };

    }, []);

    const pendingOrders = useMemo(
        () =>
            orders.filter(
                (o) => o.status === "PENDING"
            ),
        [orders]
    );

    const completedOrders = useMemo(
        () =>
            orders.filter(
                (o) => o.status === "COMPLETED"
            ),
        [orders]
    );

    const displayOrders = (
        activeTab === "PENDING"
            ? pendingOrders
            : completedOrders
    ).filter((order) => {
        const key = keyword.toLowerCase();

        return (
            order.customerName
                ?.toLowerCase()
                .includes(key) ||
            order.phone
                ?.includes(keyword) ||
            order.orderCode
                ?.toLowerCase()
                .includes(key)
        );
    });
    return (
    <AdminLayout>

        <div className="h-full flex flex-col">

            {/* Summary */}

            <div
                className={`
                    rounded-3xl
                    text-white
                    p-6
                    text-center
                    shadow-lg
                    mb-5
                    ${
                        pendingOrders.length
                            ? "bg-red-500"
                            : "bg-green-500"
                    }
                `}
            >
                <p className="text-xl">
                    Đơn đang làm
                </p>

                <h1 className="text-6xl font-bold">
                    {pendingOrders.length}
                </h1>

                <p className="text-lg">
                    đơn
                </p>
            </div>

            {/* Tabs */}

            <div className="flex bg-white rounded-2xl p-1 shadow mb-5">

                <button
                    onClick={() =>
                        setActiveTab("PENDING")
                    }
                    className={`
                        flex-1
                        py-3
                        rounded-xl
                        font-semibold
                        transition
                        ${
                            activeTab === "PENDING"
                                ? "bg-red-500 text-white"
                                : "text-gray-600"
                        }
                    `}
                >
                    🔥 Đang làm ({pendingOrders.length})
                </button>

                <button
                    onClick={() =>
                        setActiveTab("COMPLETED")
                    }
                    className={`
                        flex-1
                        py-3
                        rounded-xl
                        font-semibold
                        transition
                        ${
                            activeTab === "COMPLETED"
                                ? "bg-green-500 text-white"
                                : "text-gray-600"
                        }
                    `}
                >
                    ✅ Chờ khách lấy ({completedOrders.length})
                </button>

            </div>

            {/* Search */}

            <div className="relative mb-5">

                <input
                    type="text"
                    placeholder="🔍 Tìm theo tên, SĐT..."
                    value={keyword}
                    onChange={(e) =>
                        setKeyword(e.target.value)
                    }
                    className="
                        w-full
                        h-12
                        px-4
                        pr-10
                        rounded-2xl
                        border
                        outline-none
                        focus:ring-2
                        focus:ring-green-500
                        bg-white
                    "
                />

                {keyword && (
                    <button
                        onClick={() =>
                            setKeyword("")
                        }
                        className="
                            absolute
                            right-3
                            top-1/2
                            -translate-y-1/2
                            text-gray-500
                            text-lg
                        "
                    >
                        ✕
                    </button>
                )}

            </div>

            {/* Order List */}

            <div
                className="
                    flex-1
                    overflow-y-auto
                    space-y-4
                    pb-4
                "
            >

                {loading && (
                    <p className="text-center">
                        Đang tải...
                    </p>
                )}

                {!loading &&
                    displayOrders.length === 0 && (
                        <div className="bg-white rounded-3xl shadow p-8 text-center text-gray-500">
                            {keyword
                                ? "Không tìm thấy đơn."
                                : activeTab === "PENDING"
                                ? "Không có đơn đang làm"
                                : "Chưa có đơn chờ lấy"}
                        </div>
                    )}

                {!loading &&
                    displayOrders.map((order) => (
                        <OrderCard
                            key={order.id}
                            order={order}
                            onComplete={handleComplete}
                            isNew={
                                order.id === newOrderId
                            }
                        />
                    ))}

            </div>

        </div>

    </AdminLayout>
);
}
