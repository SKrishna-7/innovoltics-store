
"use client";

import { useState, useContext, useEffect } from "react";
import Link from "next/link";
import { CheckCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useCart, useAddToCart, useRemoveFromCart, useUpdateCart } from "@/hooks/Carthooks";
import { useUser } from '@/store/UserContext';

import { usePlaceOrder } from "@/hooks/orderhooks"; 
import { FaCheckCircle } from "react-icons/fa";

const OrderOverview = () => {

  
  const { user ,token, isLoading: userLoading } = useUser();
  const { mutate: placeOrder, isLoading: isPlacing } = usePlaceOrder(token);

  const { data, isLoading } = useCart(token);
  const cart = data?.cart_items || [];


  const { mutate: removeFromCart,isSuccess ,isPending} = useRemoveFromCart(token);
  console.log(isPending)
  const { mutate: updateCart } = useUpdateCart(token);
  console.log(cart)    
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const updateQuantity = (product_id, quantity) => {
    if (quantity < 1) return;
    updateCart({ product_id, quantity });
  };
  
  const total = Array.isArray(cart)
  ? cart.reduce((sum, item) => {
      const price = item?.price || 0;
      const quantity = item?.quantity || 1;
      return sum + price * quantity;
    }, 0)
  : 0;


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
  
  const [orderError, setOrderError] = useState('');
  const [orderSuccess, setOrderSuccess] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(value)
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  
  const handleConfirmOrder = (e) => {
    e.preventDefault();
    // console.log(formData)
    if (!user || !user.email) {
      setOrderError("You must be logged in to place an order.");
      return;
    }
  
    if (cart.length === 0) {
      setOrderError("Your cart is empty.");
      return;
    }
  
    const orderPayload = {
      email: user.email,
      cart_items: cart.map((item) => ({
        product_id: item.product_id,
        name: item.name,
        material: item.material,
        color: item.color,
        category: item.category,
        price: item.price,
        diameter: item.diameter,
        quantity: item.quantity,
        requirements: item.requirements || "",
        model: item.model || "",
      })),
      shipping_details: formData,
      total_price: total,
    };
    
    console.log(orderPayload)
    setOrderError(null); // Clear previous errors
  
    placeOrder(orderPayload, {
      onSuccess: (res) => {
        setOrderSuccess("Order placed successfully!");
        setIsModalOpen(true);
       
        // console.log(res)
        // Optional: redirect or clear form/cart
      },
      onError: (err) => {
        setOrderError("Failed to place order");
      },
    });
  };
  
  const closeModal=()=>{
     setIsModalOpen(false);
    router.push('/order-history')
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  // console.log("Cart items with issues:", cart.filter(item => !item?.item));
  // console.log(cart)

  return (
    <div className="min-h-screen font-poppins pt-20">
     
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-5">
          <p className="text-sm text-red-600">{orderError}</p>
          <p className="text-sm text-green-600">{orderSuccess}</p>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Order Overview</h1>
          <p className="text-sm text-gray-600">
            Review your cart and provide shipping details to request your order.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">{error}</div>
        )}

        {!isLoading && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 bg-white rounded-xl border p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">Your Cart</h2>
                <span className="text-sm text-gray-500">
                  {cart?.length} Item{cart?.length !== 1 ? "s" : ""}
                </span>
              </div>

              {Array.isArray(cart) && cart.length === 0 ? (
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
                    {Array.isArray(cart) && cart.map((item) => (
                      
                      <div
                        key={item?.product_id}
                        className={`flex items-center bg-gray-50  rounded-lg p-4 border border-gray-200 hover:bg-gray-100 transition-colors`}
                      >
                      
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-gray-900">{item?.name}</h3>
                          <p className="text-sm text-gray-600">
                            Color: <span className="font-medium">{item?.color}</span> | Diameter:{" "}
                            <span className="font-medium">{item?.diameter || 30}</span> | Material:{" "}
                            <span className="font-medium">{item?.material}</span>
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
                              disabled={isPending}
                            >
                              <TrashIcon className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                        <p className="text-gray-900 font-semibold">₹{item?.price.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 border-t pt-4 flex justify-between text-lg font-semibold text-gray-900">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>

                    <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-lg shadow-sm text-sm">
                      <strong>📢 Payment Notice:</strong><br />
                      This is a custom 3D printing and electronics service. Online payment is not available at this stage.
                      <ul className="list-disc pl-5 mt-2">
                        <li>Once you place your order, our team will contact you to confirm your requirements in detail.</li>
                        <li>We will then provide payment instructions and finalize the delivery process.</li>
                      </ul>
                      <p className="mt-2">
                        Thank you for choosing <span className="font-medium">Innovoltics</span> – we ensure every product meets your exact needs.
                      </p>
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

            {Array.isArray(cart) && cart.length > 0 && (
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
                          />
                        </div>
                      ))}
    <button
      type="submit"
      className="w-full py-2 border text-white rounded-md font-semibold bg-purple-800 hover:bg-purple-900 transition-colors disabled:opacity-50"
      disabled={submitLoading}
    >
      {submitLoading ? "Processing..." : "Confirm Your Order"}
    </button>
</form>
            
               
              </div>
            )}
          </div>
        )}


{isModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
    <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl">
      <div className="flex items-center gap-3">
        <FaCheckCircle className="text-green-500 text-2xl" />
        <h3 className="text-lg font-semibold text-gray-900">
          Order Placed Successfully!
        </h3>
      </div>
      <p className="mt-4 text-sm text-gray-700 leading-relaxed">
        Thank you for placing your order with us. Since this is a customized 3D printing or project service, our team will contact you shortly to:
        <ul className="list-disc pl-5 mt-2">
          <li>Discuss your specific requirements in detail</li>
          <li>Confirm model/design accuracy</li>
          <li>Provide payment instructions</li>
        </ul>
        <br />
        For any immediate assistance, feel free to contact us:
        <br />
        📞 <strong>Call/WhatsApp:</strong> <a href="https://wa.me/919876543210" target="_blank" className="text-purple-600 underline">+91 98765 43210</a><br />
        📧 <strong>Email:</strong> <a href="mailto:support@innovoltics.com" className="text-purple-600 underline">support@innovoltics.com</a>
      </p>
      <div className="mt-6 flex justify-end">
        <button
          onClick={closeModal}
          className="px-5 py-2 rounded-md bg-purple-600 text-white font-medium hover:bg-purple-700 transition duration-200"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default OrderOverview;