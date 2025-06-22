import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";

export const usePlaceOrder = (token) =>
  useMutation({
    mutationFn: async (orderData) => {
      const res = await axiosInstance.post("https://innovoltics-3dprinters.onrender.com/api/orders/place", orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
  });


import { fetchOrderHistory } from "../api/order";

export const useOrderHistory = (token) =>
  useQuery({
    queryKey: ["orderHistory"],
    queryFn: () => fetchOrderHistory(token),
    enabled: !!token,
  });


  import { cancelOrder } from "../api/order";

export const useCancelOrder = (token) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId }) => cancelOrder({ orderId, token }),
    onSuccess: () => {
      queryClient.invalidateQueries(["orderHistory"]);
    },
  });
};

import { fetchAllOrders } from "../api/order";

export const useAllOrders = (token, enabled = true) => {
  return useQuery({
    queryKey: ["admin-orders"],
    queryFn: () => fetchAllOrders(token),
    enabled: !!token && enabled,
  });
};


import {
  getOrderById,
  updateOrderStatus,
  deleteOrderById,
} from "../api/order";

export const useOrderById = (order_id) => {
  return useQuery({
    queryKey: ["order", order_id],
    queryFn: () => getOrderById(order_id),
    enabled: !!order_id, // prevent running when undefined
  });
};
export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateOrderStatus, // expects { order_id, status }
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
      queryClient.invalidateQueries(["order"]);
    },
  });
};


export const useDeleteOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteOrderById,
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
    },
  });
};
