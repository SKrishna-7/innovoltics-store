"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import { FaArrowLeft, FaShippingFast, FaTimes, FaTrash } from "react-icons/fa";
import { OrderContext } from "@/store/OrderContext";
import { useContext } from "react";
// const API_BASE_URL = "http://localhost:8000/api"; // No /api prefix

const BASE_URL = 'https://innovoltics-3dprinters.onrender.com/api';

export default function OrderDetails() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [OrderError, setOrderError] = useState(null);
  const [token, setToken] = useState(null);
  const router = useRouter();
  const { order_id } = useParams();

  const { deleteOrderById ,getOrderByOrderId ,OrderUpdateStatus ,error} = useContext(OrderContext);
  // Check admin authentication on mount

 

  useEffect(() => {
    if (typeof window !== "undefined") {
    //   const token = localStorage.getItem("access_token");
    //   setToken(token);
    //   const role = localStorage.getItem("role");
    //   if (!token || role !== "admin") {
    //     router.push("/"); // Redirect to home if not admin
    // } else {
    //   fetchOrderDetails(token);
    const token = localStorage.getItem("access_token");
    if (token) {
      fetchOrderDetails(token);
    }
  }
  }, [order_id]);

  const fetchOrderDetails = async (token) => {
    setLoading(true);
    setOrderError(null);
    try {
     const response = await getOrderByOrderId(order_id, token);
      setOrder(response || null);
    } catch (err) {
      setOrderError(err || "Failed to fetch order details");
      console.error("Fetch order details error:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus   = async (action) => {
    const confirmMessage =
      action === "next" ? "Advance this order to the next status?" : "Cancel this order?";
    if (!confirm(confirmMessage)) return;

    setLoading(true);
    setOrderError(null);
    try {
      const token = localStorage.getItem("access_token");
      await OrderUpdateStatus(order_id, action, token);
      fetchOrderDetails(token); // Refresh order details
    } catch (err) {
      setOrderError(err || `Failed to ${action} order`);
      console.error(`Update status error (${action}):`, err);
    } finally {
      setLoading(false);
    }
  };

  const deleteOrder = async () => {
    if (!confirm("Are you sure you want to delete this order?")) return;

    setLoading(true);
    setOrderError(null);
    try {
      const token = localStorage.getItem("access_token");
      await deleteOrderById(order_id, token);
      return router.push("/admin");
    } catch (err) {
      setOrderError(err?.response?.data?.detail || "Failed to delete order");
      console.error("Delete order error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-center text-gray-500 mt-20 h-screen">Loading order details...</div>;
  }

  if (OrderError || !order) {
    return (
      <div className="p-6 text-center text-red-600 mt-20">
        {OrderError || "Order not found."}
        <button
          onClick={() => router.push("/admin/orders")}
          className="mt-4 flex items-center gap-2 text-purple-600 hover:text-purple-800 mx-auto"
        >
          <FaArrowLeft /> Back to Orders
        </button>
      </div>
    );
  }
  order.cart_items.map((item,index)=>{
    console.log(item)
  })
  return (
    <div className="p-6 bg-gray-100 min-h-screen mt-20">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => router.push("/admin")}
          className="mb-6 flex items-center gap-2 text-purple-600 hover:text-purple-800 transition duration-200"
        >
          <FaArrowLeft /> Back to Orders
        </button>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Order Details - {order.order_id}</h2>
          <div className="flex gap-4">
            {order.status !== "Delivered" && order.status !== "Canceled" && (
              <button
                onClick={() => updateStatus("next")}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-200 disabled:opacity-50"
                disabled={loading}
              >
                <FaShippingFast /> Next
              </button>
            )}
            {order.status !== "Canceled" && (
              <button
                onClick={() => updateStatus("cancel")}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200 disabled:opacity-50"
                disabled={loading}
              >
                <FaTimes /> Cancel
              </button>
            )}
            <button
              onClick={deleteOrder}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-200 disabled:opacity-50"
              disabled={loading}
            >
              <FaTrash /> Delete
            </button>
          </div>
        </div>

          {OrderError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg flex items-center gap-2">
            <FaTimes /> {OrderError}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
          {/* Order Info */}
          <section>
            <h3 className="text-xl font-semibold text-purple-700 mb-4">Order Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <p><strong>ID:</strong> {order.order_id}</p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-800"
                      : order.status === "Canceled"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {order.status}
                </span>
              </p>
              <p>
                <strong>Total:</strong> ₹
                {order.cart_items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
              </p>
              <p><strong>User ID:</strong> {order.user_id || "N/A"}</p>
              <p><strong>Guest ID:</strong> {order.guest_id || "N/A"}</p>
            </div>
          </section>

          {/* Customer Info */}
          <section>
            <h3 className="text-xl font-semibold text-purple-700 mb-4">Customer Information</h3>
            <div className="space-y-2">
              <p><strong>Name:</strong> {order.shipping_details.name}</p>
              <p><strong>Email:</strong> {order.shipping_details.email}</p>
              <p><strong>Phone:</strong> {order.shipping_details.phone}</p>
              <p>
                <strong>Address:</strong> {order.shipping_details.address}, {order.shipping_details.city},{" "}
                {order.shipping_details.state}, {order.shipping_details.zip}, {order.shipping_details.country}
              </p>
            </div>
          </section>

          {/* Cart Items */}  
          <section>
            <h3 className="text-xl font-semibold text-purple-700 mb-4">Cart Items</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Material</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Color</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Diameter</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {order.cart_items.map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{item.name}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">{item.material || "N/A"}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">{item.color || "N/A"}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">{item.category || "N/A"}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">
                        ₹{item.price.toFixed(2)}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">
                        {item.diameter ? `${item.diameter} mm` : "N/A"}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">{item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
            </div>

          </section>
        </div>
      </div>
    </div>
  );
}





