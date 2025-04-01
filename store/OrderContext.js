// // 'use client';
// // import axios from "axios";
// // import { createContext, useState, useEffect } from "react";
// // import { getCookie, setCookie } from "../utils/cookieUtils"; // Utility for cookies

// // export const OrderContext = createContext();

// // export const OrderProvider = ({ children }) => {
// //   const [userId, setUserId] = useState(null);
// //   const [guestId, setGuestId] = useState(null);
// //   const [orders, setOrders] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   useEffect(() => {
// //       const storedUserId = localStorage.getItem("user_id");
// //       let storedGuestId = getCookie("guest_id");
// //       // console.log(storedUserId, storedGuestId)
// //       if (!storedGuestId) {
// //           storedGuestId = Math.floor(100000 + Math.random() * 900000).toString();
// //           setCookie("guest_id", storedGuestId, 30);
// //       }
  
// //       // Set values only if different from current state
// //       if (storedUserId !== userId) setUserId(storedUserId);
// //       if (storedGuestId !== guestId) setGuestId(storedGuestId);
  
// //   }, [userId, guestId]); // Dependencies prevent unnecessary re-renders
// // ; // Runs when either `userId` or `guestId` is updated

// //     const createOrder = async (orderData) => {
// //         try {
// //           const response = await axios.post("http://localhost:8000/api/orders/create", {
// //             user_id: userId || null,
// //             guest_id: guestId,
// //             cart_items: orderData.cart_items,
// //             shipping_details: orderData.shipping_details,
// //             total_price: orderData.total_price,
// //           });
// //           return response.data;
// //         } catch (error) {
// //           throw error; 
// //         }
// //       };

// //     const getOrders = async () => {
// //         try {
// //             const response = await axios.get("http://localhost:8000/api/orders/get");
// //             return response.data;
// //         } catch (error) {
// //             throw error;
// //         }
// //     };
// // // console.log(userId, guestId)
// // const getOrderById = async (userId, guestId) => {

// //   if (!userId && !guestId) {
// //       console.warn("Skipping API call: No userId or guestId available yet.");
// //   }
// //   try {
// //     setLoading(true);
// //     console.log(userId, guestId)
// //       const response = await axios.get(`http://localhost:8000/api/orders/history/get-by-user`, {
// //           params: {
// //               user_id: userId,
// //               guest_id: guestId
// //           }
// //       });
// //       setOrders(response.data);
// //       console.log(response.data);
// //       return response.data;
// //   } catch (error) {
// //       console.error("Error fetching orders:", error);
// //       throw error;
// //   }
// //   finally {
// //     setLoading(false);
// //   }
// // };

// // const deleteOrderById = async (orderId) => {
// //   try {
// //     setLoading(true);
// //     // Send DELETE request to backend (adjust endpoint as needed)
// //     await axios.delete(`http://localhost:8000/api/orders/delete/${orderId}`);
// //     // Update orders state by filtering out the deleted order
// //     setOrders((prevOrders) => prevOrders.filter((order) => order.order_id !== orderId));
// //   } catch (error) {
// //     console.error('Error deleting order:', error);
// //     // Optionally, notify user of failure (e.g., via toast)
// //   } finally {
// //     setLoading(false);
// //   }
// // };

// // // Fetch orders on mount (optional, if not triggered elsewhere)
// // useEffect(() => {
// //   getOrderById(userId, guestId);
// // }, []);

// //     return (
// //         <OrderContext.Provider value={{ createOrder, getOrders, deleteOrderById, orders }}>
// //             {children}
// //         </OrderContext.Provider>
// //     );
// // };



// 'use client';
// import axios from 'axios';
// import { createContext, useState, useEffect } from 'react';
// import { getCookie, setCookie } from '../utils/cookieUtils';

// export const OrderContext = createContext();

// export const OrderProvider = ({ children }) => {
//   const [userId, setUserId] = useState(null);
//   const [guestId, setGuestId] = useState(null);
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true); // Start as false, toggle only during operations
//   const [error, setError] = useState(null);
//   // Initialize userId and guestId from storage on mount
//   useEffect(() => {
//     const storedUserId = localStorage.getItem('user_id');
//     let storedGuestId = getCookie('guest_id');

//     if (!storedGuestId) {
//       storedGuestId = Math.floor(100000 + Math.random() * 900000).toString();
//       setCookie('guest_id', storedGuestId, 30);
//     }

//     // Only update state if values differ
//     if (storedUserId !== userId) setUserId(storedUserId);
//     if (storedGuestId !== guestId) setGuestId(storedGuestId);
//   }, []); // Empty dependency array: runs once on mount

//   // Fetch orders when userId or guestId changes
//   useEffect(() => {
//     if (userId || guestId) {
//       getOrderById(userId, guestId);
//     }
//   }, [userId, guestId]); // Refetch when IDs change

//   const createOrder = async (orderData) => {
//     try {
//       setLoading(true);
//       const response = await axios.post('http://localhost:8000/api/orders/create', {
//         user_id: userId || null,
//         guest_id: guestId,
//         cart_items: orderData.cart_items,
//         shipping_details: orderData.shipping_details,
//         total_price: orderData.total_price,
//       });
//       // Optionally refetch orders or append new order
//       setOrders((prevOrders) => [...prevOrders, response.data]);
//       getOrders();
//       return response.data;
//     } catch (error) {
//       console.error('Error creating order:', error?.response?.data?.detail || "Error creating order");
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getOrders = async (token) => {
//     setLoading(true);
//     try {
//       const response = await axios.get("http://localhost:8000/api/orders/all", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setOrders(response.data || []);
//     } catch (err) {
//       setError(err?.response?.data?.detail || "Error fetching orders");
//       console.error("Fetch orders error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getOrderById = async (userIdParam, guestIdParam) => {
//     const uid = userIdParam || userId;
//     const gid = guestIdParam || guestId;
//     if (!uid && !gid) {
//       console.warn('Skipping API call: No userId or guestId available.');
//       setOrders([]); // Reset orders if no IDs
//       setError("No userId or guestId available.");
//       return [];
//     }
//     try {
//       setLoading(true);
//       const response = await axios.get(`http://localhost:8000/api/orders/history/get-by-user`, {
//         params: {
//           user_id: uid,
//           guest_id: gid,
//         },
//       });
//       setOrders(response.data);
//       console.log('Fetched orders:', response.data);
//       return response.data;
//     } catch (error) {
//       setError(error?.response?.data?.detail || "Error fetching orders");
//       setOrders([]); // Reset on error
//       return [];
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deleteOrderById = async (orderId) => {
//     try {
//       setLoading(true);
//       await axios.delete(`http://localhost:8000/api/orders/delete/${orderId}`); // Match FastAPI endpoint
//       setOrders((prevOrders) => prevOrders.filter((order) => order.order_id !== orderId));
//       console.log(`Order ${orderId} deleted successfully`);
//       getOrders();

//     } catch (error) {
//       console.error('Error deleting order:', error);
//       setError(error?.response?.data?.detail || "Error deleting order");
//       throw error; // Let caller handle error if needed
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <OrderContext.Provider value={{ createOrder, getOrders, deleteOrderById, orders, loading, error }}>
//       {children}
//     </OrderContext.Provider>
//   );
// };

// export default OrderProvider;




"use client";
import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { getCookie, setCookie } from "../utils/cookieUtils";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [guestId, setGuestId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false); // Start false, toggle during ops
  const [error, setError] = useState(null);

  // Initialize userId and guestId on mount
  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    let storedGuestId = getCookie("guest_id");

    if (!storedGuestId) {
      storedGuestId = Math.floor(100000 + Math.random() * 900000).toString();
      setCookie("guest_id", storedGuestId, 30);
    }

    setUserId(storedUserId);
    setGuestId(storedGuestId);
  }, []); // Run once on mount

  // Fetch orders when userId or guestId changes
  useEffect(() => {
    if (userId || guestId) {
      getOrderById(userId, guestId);
    }
    // Cleanup not needed here since axios doesn’t support cancel natively without AbortController
  }, [userId, guestId]);

  const createOrder = async (orderData) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("access_token"); // Add auth if required
      const response = await axios.post(
        "http://localhost:8000/api/orders/create", // Align with backend
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
      const response = await axios.get("http://localhost:8000/api/orders/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

  const getOrderById = async (userIdParam, guestIdParam, token) => {
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
        "http://localhost:8000/api/orders/history/get-by-user", // Align with backend
        {
          params: { user_id: uid , guestId: gid},
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      setOrders(response.data || []);
      console.log("Fetched orders by ID:", response.data);
      return response.data;
    } catch (error) {
      const errMsg = error?.response?.data?.detail || "Error fetching orders";
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
      const response = await axios.get(`http://localhost:8000/api/orders/get/`, {
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
      const response = await axios.put(`http://localhost:8000/api/orders/${orderId}/${action}`, null, {
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
      await axios.delete(`http://localhost:8000/api/orders/delete/${orderId}`, {
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