"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaEye, FaPlus, FaShippingFast, FaTimes, FaCheckCircle } from "react-icons/fa"; // Added FaCheckCircle

// Order status stages
const STATUS_STAGES = ["Pending", "Processing", "Shipped", "Delivered"];

// Dummy order data with initial status
const dummyOrders = [
  {
    id: "ORD001",
    customerName: "John Doe",
    date: "2025-03-25",
    total: "₹59.98",
    status: "Pending",
    items: [
      { name: "3D Printed Dragon Figurine", quantity: 2, price: "₹29.99" },
    ],
  },
  {
    id: "ORD002",
    customerName: "Jane Smith",
    date: "2025-03-26",
    total: "₹9.99",
    status: "Processing",
    items: [
      { name: "3D Printed Keychain", quantity: 1, price: "₹9.99" },
    ],
  },
  {
    id: "ORD003",
    customerName: "Alex Johnson",
    date: "2025-03-27",
    total: "₹30.00",
    status: "Shipped",
    items: [
      { name: "3D Printed Pulley", quantity: 1, price: "₹30.00" },
    ],
  },
];

export default function AdminPage() {
  const [orders, setOrders] = useState([]);
  const [isAddOrderOpen, setIsAddOrderOpen] = useState(false);
  const [newOrder, setNewOrder] = useState({
    customerName: "",
    total: "",
    items: [{ name: "", quantity: 1, price: "" }],
  });

  // Load orders from localStorage on mount
  useEffect(() => {
    const storedOrders = localStorage.getItem("orderHistory");
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    } else {
      setOrders(dummyOrders);
      localStorage.setItem("orderHistory", JSON.stringify(dummyOrders));
    }
  }, []);

  // Save orders to localStorage when updated
  useEffect(() => {
    if (orders.length > 0) {
      localStorage.setItem("orderHistory", JSON.stringify(orders));
    }
  }, [orders]);

  // Update order status to the next stage
  const advanceOrderStatus = (id) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => {
        if (order.id === id && order.status !== "Canceled" && order.status !== "Delivered") {
          const currentIndex = STATUS_STAGES.indexOf(order.status);
          const nextStatus = STATUS_STAGES[currentIndex + 1];
          return { ...order, status: nextStatus };
        }
        return order;
      })
    );
  };

  // Cancel an order
  const cancelOrder = (id) => {
    if (confirm("Are you sure you want to cancel this order?")) {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === id ? { ...order, status: "Canceled" } : order
        )
      );
    }
  };

  // Handle adding new order
  const handleAddOrder = (e) => {
    e.preventDefault();
    const orderId = `ORD${String(orders.length + 1).padStart(3, "0")}`;
    const newOrderData = {
      id: orderId,
      customerName: newOrder.customerName,
      date: new Date().toISOString().split("T")[0],
      total: `₹${parseFloat(newOrder.total).toFixed(2)}`,
      status: "Pending",
      items: newOrder.items,
    };
    setOrders((prev) => [...prev, newOrderData]);
    setNewOrder({ customerName: "", total: "", items: [{ name: "", quantity: 1, price: "" }] });
    setIsAddOrderOpen(false);
  };

  // Handle input changes for new order
  const handleInputChange = (e, index = null) => {
    if (index === null) {
      setNewOrder({ ...newOrder, [e.target.name]: e.target.value });
    } else {
      const updatedItems = [...newOrder.items];
      updatedItems[index][e.target.name] = e.target.value;
      setNewOrder({ ...newOrder, items: updatedItems });
    }
  };

  // Add new item field to the form
  const addItemField = () => {
    setNewOrder({
      ...newOrder,
      items: [...newOrder.items, { name: "", quantity: 1, price: "" }],
    });
  };

  // Render status progress bar
  const renderStatusProgress = (status) => {
    const currentIndex = STATUS_STAGES.indexOf(status);
    const isCanceled = status === "Canceled";
    return (
      <div className="flex items-center space-x-2">
        {STATUS_STAGES.map((stage, index) => (
          <div key={stage} className="flex items-center">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center ${
                isCanceled
                  ? "bg-red-500 text-white"
                  : index <= currentIndex && status !== "Canceled"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {isCanceled && stage === "Canceled" ? <FaTimes /> : index <= currentIndex ? <FaCheckCircle /> : index + 1}
            </div>
            {index < STATUS_STAGES.length - 1 && (
              <div
                className={`h-1 w-8 ${
                  isCanceled ? "bg-red-200" : index < currentIndex && status !== "Canceled" ? "bg-purple-600" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
        {isCanceled && <span className="text-red-600 text-xs ml-2">Canceled</span>}
      </div>
    );
  };

  return (
    <div className="bg-gray-50 font-poppins min-h-screen mt-20 pb-64">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-purple-900">Admin - Order Tracking</h1>
          <button
            onClick={() => setIsAddOrderOpen(true)}
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors duration-200 flex items-center gap-2"
          >
            <FaPlus /> Add New Order
          </button>
        </div>

        {/* Orders Table */}
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-purple-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-purple-900 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-purple-900 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-purple-900 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-purple-900 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-purple-900 uppercase tracking-wider">Status Progress</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-purple-900 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.customerName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.total}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{renderStatusProgress(order.status)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm flex gap-2">
                        <Link href={`/admin/order/${order.id}`}>
                          <button className="text-purple-600 hover:text-purple-800 flex items-center gap-1 transition-colors duration-200">
                            <FaEye /> View
                          </button>
                        </Link>
                        {order.status !== "Delivered" && order.status !== "Canceled" && (
                          <button
                            onClick={() => advanceOrderStatus(order.id)}
                            className="text-green-600 hover:text-green-800 flex items-center gap-1 transition-colors duration-200"
                          >
                            <FaShippingFast /> Next
                          </button>
                        )}
                        {order.status !== "Canceled" && (
                          <button
                            onClick={() => cancelOrder(order.id)}
                            className="text-red-600 hover:text-red-800 flex items-center gap-1 transition-colors duration-200"
                          >
                            <FaTimes /> Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                      No orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Order Modal */}
        {isAddOrderOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Order</h2>
              <form onSubmit={handleAddOrder}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Customer Name</label>
                  <input
                    type="text"
                    name="customerName"
                    value={newOrder.customerName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Total (₹)</label>
                  <input
                    type="number"
                    name="total"
                    value={newOrder.total}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500"
                    step="0.01"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Items</label>
                  {newOrder.items.map((item, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        name="name"
                        value={item.name}
                        onChange={(e) => handleInputChange(e, index)}
                        placeholder="Item Name"
                        className="block w-1/2 rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500"
                        required
                      />
                      <input
                        type="number"
                        name="quantity"
                        value={item.quantity}
                        onChange={(e) => handleInputChange(e, index)}
                        placeholder="Qty"
                        className="block w-1/4 rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500"
                        min="1"
                        required
                      />
                      <input
                        type="number"
                        name="price"
                        value={item.price}
                        onChange={(e) => handleInputChange(e, index)}
                        placeholder="Price (₹)"
                        className="block w-1/4 rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500"
                        step="0.01"
                        required
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addItemField}
                    className="text-purple-600 hover:text-purple-800 text-sm"
                  >
                    + Add Another Item
                  </button>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddOrderOpen(false)}
                    className="px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-200"
                  >
                    Save Order
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

     
     
    </div>
  );
}