"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { FaArrowLeft, FaShippingFast, FaTimes, FaTrash } from "react-icons/fa";
import {
  useOrderById,
  useUpdateOrderStatus,
  useDeleteOrder,
} from "@/hooks/orderhooks"; 

export default function OrderDetails() {
  const [OrderError, setOrderError] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null); // 'cancel' | 'delete' | null

  
  const router = useRouter();
  const { id } = useParams();
  const order_id= id || null

  // console.log(id)
  const { data: order, isLoading: loading, error } = useOrderById(order_id);

  const updateOrderMutation = useUpdateOrderStatus();
  const deleteOrderMutation = useDeleteOrder();


  // console.log(String(order?.status).toLowerCase())

  // Check admin authentication on mount
  const updateStatus = async (action) => {
    if (!order) return console.error("No order data available.");
  
    let order_id=order?._id
    // console.log("Action:",action, "Order ID:", order_id);
    
    let nextStatus = "";
  
    if (action === "next") {
      switch (String(order?.status).toLowerCase()) {
        case "pending":
          nextStatus = "Processing";
          break;
        case "processing":
          nextStatus = "Shipped";
          break;
        case "shipped":
          nextStatus = "Delivered";
          break;
        default:
          // console.warn("Order already in final state:", order.status);
          return;
      }
    } else if (action === "cancel") {
      if (["Delivered", "Canceled"].includes(order.status)) {
        // console.warn("Cannot cancel an order that is already", order.status);
        return;
      }
      nextStatus = "Canceled";
    }
  
    if (!nextStatus) return;
  
    try {
      await updateOrderMutation.mutateAsync({ order_id, status: nextStatus });
      // console.log("Status updated to:", nextStatus);
    } catch (err) {
      // console.error("Status update failed:", err);
    }
  };
  

const deleteOrder = async (order_id) => {
  try {
    await deleteOrderMutation.mutateAsync(order_id);
    // router.push("/admin");
    alert('Order Deleted Successfully...')
  } catch (err) {
    alert('Failed to delete order...')

    // console.error("Order deletion failed", err);
  }
};


  if (loading) {
    return <div className="p-6 text-center text-gray-500 mt-20 h-screen">Loading order details...</div>;
  }

  if (error || !order) {
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
    // console.log(item)
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
          <h2 className="text-3xl font-bold text-gray-800">Order Details</h2>
          <div className="flex gap-4">
            {order.status !== "Delivered" && order.status !== "Canceled" && (
              <button
                onClick={() => setConfirmAction("next")}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-200 disabled:opacity-50"
                disabled={loading}
              >
                <FaShippingFast /> Next
              </button>
            )}
            {order.status !== "Canceled" && (
              <button
                onClick={() => setConfirmAction("cancel")  }
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200 disabled:opacity-50"
                disabled={loading}
              >
                <FaTimes /> Cancel
              </button>
            )}
            <button
              onClick={()=>setConfirmAction("delete")}
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
              <p><strong>ID:</strong> {order._id}</p>
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
              {order.total_price}
              </p>
              <p><strong>User Email:</strong> {order.email || "N/A"}</p>
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
      {confirmAction && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm text-center">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Confirm {confirmAction === "next"
          ? "Status Update"
          : confirmAction === "cancel"
          ? "Cancellation"
          : "Deletion"}
      </h3>
      <p className="text-gray-600 mb-6">
        Are you sure you want to{" "}
        {confirmAction === "next"
          ? "move to the next status?"
          : confirmAction === "cancel"
          ? "cancel this order?"
          : "permanently delete this order?"}
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={() => {
            if (confirmAction === "next") updateStatus("next", order._id);
            else if (confirmAction === "cancel") updateStatus("cancel", order._id);
            else if (confirmAction === "delete") deleteOrder();
            setConfirmAction(null);
          }}
          className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Confirm
        </button>
        <button
          onClick={() => setConfirmAction(null)}
          className="px-5 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}





