import { getIO } from "./socket.js";

export function emitNewOrder(order) {
    getIO().emit("new-order", order);
}

export function emitOrderUpdated(order) {
    getIO().emit("order-updated", order);
}