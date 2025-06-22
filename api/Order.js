// orderApi.js
import axiosInstance from "../utils/axiosInstance";

export const createOrder = async (orderData, token) => {
  const response = await axiosInstance.post("https://innovoltics-3dprinters.onrender.com/api/orders/create", orderData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const fetchOrderHistory = async (token) => {
  const res = await axiosInstance.get("/orders/get", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};


export const cancelOrder = async ({ orderId, token }) => {
  const res = await axiosInstance.put(`/orders/cancel/${orderId}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};


export const fetchAllOrders = async (token) => {
  const response = await axiosInstance.get("/orders/all", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.orders;
};


export const getOrderById = async (order_id) => {
  // console.log("API"+order_id)
  const res = await axiosInstance.get(`/orders/${order_id}`);
  // console.log(res)
  return res.data;
};

export const updateOrderStatus = async ({ order_id, status }) => {
  // console.log("Status to update:",order_id);
  const res = await axiosInstance.put(`/orders/${order_id}/status`, { 
    status ,
  });
  return res.data;
};



export const deleteOrderById = async (order_id) => {
  const res = await axiosInstance.delete(`/orders/${order_id}`);
  return res.data;
};