"use client";

import { useState, useEffect, useContext } from "react";
import { FaSync, FaCog, FaTimes } from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/navigation";
import { OrderContext } from "@/store/OrderContext";

const API_BASE_URL = "http://localhost:8000"; // Base URL without /api prefix

export default function OrderManagement() {
  const router = useRouter();
  const { orders, loading, getOrders ,error} = useContext(OrderContext);
  const [OrderError, setOrderError] = useState(null);
  const [token, setToken] = useState(null);
  // Check admin authentication on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");
      setToken(token);
      const role = localStorage.getItem("role");
      if (!token || role !== "admin") {
        router.push("/"); // Redirect to home if not admin
      }
    }
  }, [router]);

  // Fetch orders on mount
  useEffect(() => {
    refreshOrders();
  }, []);
  console.log(orders)
  const refreshOrders = async () => {
    setOrderError(null);
    try {
      
      await getOrders(token); // Pass token to context function
    } catch (err) {
      setOrderError(err?.response?.data?.detail || "Failed to fetch orders");
      console.error("Fetch orders error:", err);
    }
  };

  const viewOrderDetails = (orderId) => {
    router.push(`/admin/orders/${orderId}`);
  };
  console.log(orders)

  if (orders.length === 0) {
    return <div className="">
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold">No orders were placed yet</h1>
          {/* <p className="text-gray-500">Please create an order to view details</p> */}
        </div>
      </div>
    </div>
  }
  if (error) {
    return <div className="mt-20 text-center text-2xl font-bold text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <span>Order Management</span>
            <span className="text-purple-600">({orders.length})</span>
          </h2>
          <button
            onClick={refreshOrders}
            className="p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition duration-200 disabled:opacity-50"
            disabled={loading}
            title="Refresh Orders"
          >
            <FaSync className={loading ? "animate-spin" : ""} />
          </button>
        </div>

          {OrderError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg flex items-center gap-2">
            <FaTimes /> {OrderError}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-purple-700 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                      Loading orders...
                    </td>
                  </tr>
                ) : orders.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                      No orders available.
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50 transition duration-150">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.order_id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{order.shipping_details.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "Canceled"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        ₹{order.cart_items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => viewOrderDetails(order.order_id)}
                          className="text-purple-600 hover:text-purple-800 flex items-center gap-1 transition duration-150"
                        >
                          <FaCog /> Actions
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}