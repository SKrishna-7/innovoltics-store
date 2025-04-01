"use client";

import { useState, useContext, useEffect } from "react";
import Link from "next/link";
import { CartContext } from "@/store/CartContext";
import { OrderContext } from "@/store/OrderContext";
import { CheckCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

const OrderOverview = () => {
  const { cart, updateQuantity, removeFromCart, loading } = useContext(CartContext);
  console.log(cart)
  const { createOrder } = useContext(OrderContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  const calculateTotal = () =>
    cart?.reduce((acc, item) => acc + (item?.item?.price || 0) * (item?.quantity || 1), 0) || 0;
  const total = calculateTotal().toFixed(2);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Generate and send OTP
  const handleSendOtp = async () => {
    if (!formData.email) {
      setError("Please provide an email address.");
      return;
    }

    setSubmitLoading(true);

    // Generate a 6-digit OTP
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);

    try {
      const response = await fetch("/api/send-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData, cart, total, action: "sendOtp", otp: newOtp }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to send OTP");
      }

      setOtpSent(true);
      setError("");
    } catch (error) {
      setError(error.message || "Failed to send OTP. Please try again.");
      setGeneratedOtp(null);
    } finally {
      setSubmitLoading(false);
    }
  };

  // Verify OTP and place order
  const handleConfirmOrder = async (e) => {
    e.preventDefault();

    if (!cart || cart.length === 0) {
      setError("Your cart is empty. Add items to proceed.");
      return;
    }

    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!otpSent) {
      setError("Please send and verify OTP first.");
      return;
    }

    if (otp !== generatedOtp) {
      setError("Invalid OTP. Please try again.");
      return;
    }
    console.log(cart)

    setSubmitLoading(true);

    try {
      // Place the order
      const userId = localStorage.getItem("user_id");
      const guestId = localStorage.getItem("guest_id") || userId;
      const cartItems = cart.map((entry) => ({
        product_id: entry.product_id,
        name: entry.item.name,
        material: entry.item.material,
        color: entry.item.color,
        category: entry.item.category,
        price: entry.item.price,
        diameter: entry.item.diameter,
        quantity: entry.quantity || 1,
        requirements: entry.item.requirements || null,
        model: entry.item.model || null,

      }));

      const orderData = {
        user_id: userId || null,
        guest_id: userId ? null : guestId,
        cart_items: cartItems,
        shipping_details: formData,
        total_price: parseFloat(total),
      };

      const response = await createOrder(orderData);
      if (response.message !== "Order placed successfully") {
        throw new Error("Failed to place order");
      }

      // Send confirmation email to user
      const emailResponse = await fetch("/api/send-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData, cart, total, action: "confirmOrder" }),
      });

      const emailData = await emailResponse.json();
      if (!emailResponse.ok) {
        throw new Error(emailData.error || "Failed to send confirmation email");
      }

  
      setIsModalOpen(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          city: "",
          state: "",
          zip: "",
          country: "",
        });
        setOtp("");
        setOtpSent(false);
        setGeneratedOtp(null);
        router.push("/order-history");
      }, 3000);
    } catch (error) {
      setError(error.message || "Failed to place order. Please try again.");
    } finally {
      setSubmitLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-poppins pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-5">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Order Overview</h1>
          <p className="text-sm text-gray-600">
            Review your cart and provide shipping details to request your order.
          </p>
        </div>

        {!loading && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 bg-white rounded-xl border p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">Your Cart</h2>
                <span className="text-sm text-gray-500">
                  {cart.length} Item{cart.length !== 1 ? "s" : ""}
                </span>
              </div>

              {cart && cart.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-gray-500">Your cart is empty.</p>
                  <Link
                    href="/customize"
                    className="mt-2 inline-block text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    Upload a model to get started
                  </Link>
                </div>
              ) : (
                <>
                  <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
                    {cart.map((item) => (
                      <div
                        key={item?.product_id}
                        className="flex items-center bg-gray-50 rounded-lg p-4 border border-gray-200 hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-gray-900">{item?.item?.name}</h3>
                          <p className="text-sm text-gray-600">
                            Color: <span className="font-medium">{item?.item?.color}</span> | Diameter:{" "}
                            <span className="font-medium">{item?.item?.diameter || 30}</span> | Material:{" "}
                            <span className="font-medium">{item?.item?.material}</span>
                          </p>
                          <div className="flex items-center mt-3 space-x-2">
                            <button
                              onClick={() => updateQuantity(item?.product_id, (item?.quantity || 1) - 1)}
                              disabled={item?.quantity <= 1}
                              className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors disabled:opacity-50"
                            >
                              -
                            </button>
                            <span className="w-10 text-center text-gray-900">{item?.quantity || 1}</span>
                            <button
                              onClick={() => updateQuantity(item?.product_id, (item?.quantity || 1) + 1)}
                              className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors"
                            >
                              +
                            </button>
                            <button
                              onClick={() => removeFromCart(item?.product_id)}
                              className="ml-4 text-red-600 hover:text-red-800 transition-colors"
                            >
                              <TrashIcon className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                        <p className="text-gray-900 font-semibold">${item?.item?.price.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 border-t pt-4 flex justify-between text-lg font-semibold text-gray-900">
                    <span>Total</span>
                    <span>${total}</span>
                  </div>
                  <Link href="/customize">
                    <button className="mt-4 w-full py-3 bg-purple-100 text-black-700 font-medium rounded-md hover:bg-indigo-200 transition-colors">
                      Add More Items
                    </button>
                  </Link>
                  <Link href="/order-history">
                    <button className="mt-4 w-full py-3 bg-purple-100 text-gray-900 font-medium rounded-md hover:bg-indigo-200 transition-colors">
                      View Order History
                    </button>
                  </Link>
                </>
              )}
            </div>

            {cart.length > 0 && (
              <div className="lg:col-span-2 bg-gray-50 rounded-lg p-6 sticky top-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Shipping Details</h2>

                <form className="space-y-4" onSubmit={handleConfirmOrder}>
                  {["name", "email", "phone", "address", "city", "state", "zip", "country"].map((field) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-700">
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </label>
                      <input
                        type={field === "email" ? "email" : "text"}
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        className="w-full mt-1 px-3 py-2 border rounded-md focus:border-indigo-500 focus:ring-indigo-500"
                        required
                        disabled={otpSent} // Disable fields after OTP is sent
                      />
                    </div>
                  ))}

                  {otpSent && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Enter OTP</label>
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full mt-1 px-3 py-2 border rounded-md focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="Enter 6-digit OTP"
                        maxLength={6}
                        required
                      />
                    </div>
                  )}

                  {!otpSent ? (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="w-full py-2 border text-white rounded-md font-semibold bg-indigo-600 hover:bg-indigo-700 transition-colors disabled:opacity-50"
                      disabled={submitLoading}
                    >
                      {submitLoading ? "Sending OTP..." : "Confrim by OTP"}
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="w-full py-2 border text-white rounded-md font-semibold bg-purple-800 hover:bg-purple-900 transition-colors disabled:opacity-50"
                      disabled={submitLoading}
                    >
                      {submitLoading ? "Processing..." : "Confirm Your Order"}
                    </button>
                  )}
                </form>
              </div>
            )}
          </div>
        )}

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 max-w-lg w-full mx-4 shadow-2xl">
              <div className="text-center">
                <CheckCircleIcon className="mx-auto h-16 w-16 text-green-500" />
                <h2 className="mt-4 text-2xl font-bold text-gray-900">Request Sent Successfully!</h2>
                <p className="mt-2 text-sm text-gray-600">
                  Your order request has been submitted. Check your email at{" "}
                  <span className="font-medium">{formData.email}</span> for confirmation.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderOverview;