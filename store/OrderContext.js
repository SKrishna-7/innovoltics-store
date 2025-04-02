
"use client";
import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { getCookie, setCookie } from "../utils/cookieUtils";

export const OrderContext = createContext();

const BASE_URL = 'https://innovoltics-3dprinters.onrender.com/api';


export const OrderProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [guestId, setGuestId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false); // Start false, toggle during ops
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);  
  const [token, setToken] = useState(null);
  // Initialize userId and guestId on mount
  // useEffect(() => {
  //   const storedUserId = localStorage.getItem("user_id");
  //   let storedGuestId = getCookie("guest_id");

  //   if (!storedGuestId) {
  //     storedGuestId = Math.floor(100000 + Math.random() * 900000).toString();
  //     setCookie("guest_id", storedGuestId, 30);
  //   }

  //   setUserId(storedUserId);
  //   setGuestId(storedGuestId);
  // }, []); // Run once on mount

  // Fetch orders when userId or guestId changes
  useEffect(() => {
    
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("access_token");
    setToken(token);
    if (!token) {
      console.log("No token found, redirecting to login");
      return 'No token found';
    }
    // Cleanup not needed here since axios doesn’t support cancel natively without AbortController
  }, [userId, guestId]);

  const createOrder = async (orderData) => {
    setLoading(true);
    setError(null);
    try {
      // const token = localStorage.getItem("access_token"); // Add auth if required
      const response = await axios.post(
        `${BASE_URL}/orders/create`, // Align with backend
        {
          user_id: userId || null,
          guest_id: guestId,
          cart_items: orderData.cart_items,
          shipping_details: orderData.shipping_details,
          total_price: orderData.total_price,
        },
        token ? { headers: { Authorization: `Bearer ${token}` } } : {}
      );
      setOrders((prev) => [...prev, response.data]); // Append new order
      return response.data;
    } catch (error) {
      const errMsg = error?.response?.data?.detail || "Error creating order";
      setError(errMsg);
      console.error("Create order error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getOrders = async (token) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${BASE_URL}/orders/all`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}, 
      });
      setOrders(response.data || []);
      console.log("Fetched all orders:", response.data);
      return response.data;
    } catch (error) {
      const errMsg = error?.response?.data?.detail || "Error fetching orders";
      setError(errMsg);
      console.log("Fetch orders error:", error);
      // throw error;
    } finally {
      setLoading(false);
    }
  };

const getOrderById = async (userIdParam, guestIdParam) => {
    const uid = userIdParam || userId;
    const gid = guestIdParam || guestId;
    if (!uid && !gid) {
      console.warn("No userId or guestId available.");
      setOrders([]);
      setError("No user or guest ID provided.");
      return [];
    }
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${BASE_URL}/orders/history/get-by-user`, // Align with backend
        {
          params: { user_id: uid , guest_id: gid},
        }
      );
      setOrders(response.data || []);
      console.log("Fetched orders by ID:", response.data);
      return response.data;
    } catch (error) {
      const errMsg = error && error?.response?.data?.detail || "Error fetching orders";
      setError(errMsg);
      console.error("Fetch orders by ID error:", error);
      setOrders([]);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getOrderByOrderId = async (orderId, token) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${BASE_URL}/orders/get/`, {
        params: { order_id: orderId },
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }); 
      console.log(response.data)
      return response.data;
    } catch (error) {
      const errMsg = error?.response?.data?.detail || "Error fetching order by ID";
      setError(errMsg);
      console.error("Fetch order by ID error:", error);
    } finally {
      setLoading(false);
    }
  };

  const OrderUpdateStatus = async (orderId, action, token) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(`${BASE_URL}/orders/${orderId}/${action}`, null, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }); 
      return response.data;
    } catch (error) {
      const errMsg = error?.response?.data?.detail || "Error updating order status";
      setError(errMsg);
      console.error("Update status error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

      const deleteOrderById = async (orderId) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("access_token"); // Add auth
        await axios.delete(`${BASE_URL}/orders/delete/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders((prev) => prev.filter((order) => order.order_id !== orderId));
      console.log(`Order ${orderId} deleted`);
      getOrders(token);
    } catch (error) {
      const errMsg = error?.response?.data?.detail || "Error deleting order";
      setError(errMsg);
      console.error("Delete order error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <OrderContext.Provider
      value={{ createOrder, getOrders, getOrderById, deleteOrderById, getOrderByOrderId, OrderUpdateStatus, orders, loading, error }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;