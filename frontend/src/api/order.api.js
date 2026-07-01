import api from "./axios";

export function createOrder(data) {
    return api.post("/orders", data);
}

export function getMyOrders() {
    return api.get("/orders/my");
}

export function getOrderDetail(id) {
    return api.get(`/orders/${id}`);
}