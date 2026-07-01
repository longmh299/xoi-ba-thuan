import api from "./axios";

export async function getOrders() {
  const { data } = await api.get("/admin/orders");

  return data.data;
}

export async function updateOrderStatus(
  orderId,
  status
) {
  const { data } = await api.patch(
    `/admin/orders/${orderId}/status`,
    {
      status,
    }
  );

  return data.data;
}