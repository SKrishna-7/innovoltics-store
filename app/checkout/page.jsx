
'use client';

import { useState, useEffect } from 'react';
import { TrashIcon, CheckCircleIcon } from '@heroicons/react/20/solid';
import { useCart } from '@/components/CartContext';
import Link from 'next/link';

const OrderOverview = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart(); // Access shared cart state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Load saved shipping data from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem('checkoutData');
      if (savedData) setFormData(JSON.parse(savedData));
    }
  }, []);
  
  // Save shipping data to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('checkoutData', JSON.stringify(formData));
    }
  }, [formData]); 
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  // Calculate total dynamically based on actual product prices
  const total = cart.reduce((sum, item) => sum + (item.quantity || 1) * item.price, 0).toFixed(2);
  
 
const handleConfirmOrder = (e) => {
  e.preventDefault(); // ✅ Prevent page refresh

  if (cart.length === 0) {
    setErrorMessage('Your cart is empty. Add items to proceed.');
    return;
  }
  if (!Object.values(formData).every((val) => val.trim() !== '')) {
    setErrorMessage('Please fill in all shipping details.');
    return;
  }

  const orderDetails = {
    id: Date.now(),
    products: cart,
    customer: formData,
    status: 'Pending',
    date: new Date().toISOString().split('T')[0],
  };

  console.log('🔵 Order request sent to owner:', orderDetails);

  const existingOrders = JSON.parse(localStorage.getItem('orderHistory') || '[]');
  localStorage.setItem('orderHistory', JSON.stringify([...existingOrders, orderDetails]));

  setIsModalOpen(true); // ✅ Open the modal

  // ✅ Close modal after 3 seconds
  setTimeout(() => {
    setIsModalOpen(false);
    setErrorMessage('');
  }, 3000);
};
  return (
    <div className="min-h-screen font-poppins pt-20 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-5">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Order Overview</h1>
        <p className="text-sm text-gray-600">
            Review your cart and provide shipping details to request your order.
          </p>
</div>
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 ">
          {/* Cart Section */}
          <div className="lg:col-span-3 bg-white rounded-xl border  p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Your Cart</h2>
              <span className="text-sm text-gray-500">{cart.length} Item{cart.length !== 1 ? 's' : ''}</span>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-10 ">
                <p className="text-gray-500">Your cart is empty.</p>
                <Link href="/customize" className="mt-2 inline-block text-indigo-600 hover:text-indigo-800 font-medium">
                  Upload a model to get started
                </Link>
              </div>
            ) : (
              <>
                <div className="space-y-6 max-h-[60vh]  overflow-y-auto pr-2 ">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center bg-gray-50 rounded-lg p-4 border border-gray-200 hover:bg-gray-100 transition-colors "
                    >
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-600">
                          Color: <span className="font-medium">{item.color}</span> | Size:{' '}
                          <span className="font-medium">{item.size}</span> | Material:{' '}
                          <span className="font-medium">{item.material}</span>
                        </p>
                        <div className="flex items-center mt-3 space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors"
                          >
                            -
                          </button>
                          <span className="w-10 text-center text-gray-900">{item.quantity || 1}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="ml-4 text-red-600 hover:text-red-800 transition-colors"
                          >
                            <TrashIcon className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-900 font-semibold">${item.price}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 border-t pt-4 flex justify-between text-lg font-semibold text-gray-900">
                  <span>Total</span>
                  <span>${total}</span>
                </div>
                <Link href="/upload-model">
                  <button className="mt-4 w-full py-3 bg-purple-100 text-black-700 font-medium rounded-md hover:bg-indigo-200 transition-colors">
                    Add More Items
                  </button>
                </Link>
              </>
            )}
          </div>
        {cart.length > 0 ? <>
          <div className="lg:col-span-2 bg-gray-50 rounded-lg p-6 sticky top-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Shipping Details</h2>
            {errorMessage && (
              <p className="mb-4 text-sm text-red-600 bg-red-50 p-2 rounded-md">{errorMessage}</p>
            )}
           

           <div className="">

           <form  className="space-y-4" method='POST'>
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full mt-1 px-3 py-2 border rounded-md focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full mt-1 px-3 py-2 border rounded-md focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full mt-1 px-3 py-2 border rounded-md focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full mt-1 px-3 py-2 border rounded-md focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full mt-1 px-3 py-2 border rounded-md focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700">State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full mt-1 px-3 py-2 border rounded-md focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700">ZIP Code</label>
                  <input
                    type="text"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    className="w-full mt-1 px-3 py-2 border rounded-md focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full mt-1 px-3 py-2 border rounded-md focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>
              </div>
             
                  
              <button
                type="submit"
                className="w-full py-2 border text-white rounded-md font-semibold bg-purple-800"
                onClick={handleConfirmOrder}
              >
                  Confrim your order
              </button>
            </form>
           </div>
          </div>
        </> :<></>}
          {/* Shipping Details */}
         
        </div>
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-lg w-full mx-4 shadow-2xl">
            <div className="text-center">
              <CheckCircleIcon className="mx-auto h-16 w-16 text-green-500" />
              <h2 className="mt-4 text-2xl font-bold text-gray-900">Request Sent Successfully!</h2>
              <p className="mt-2 text-sm text-gray-600">
                Your order request has been submitted to Innovoltics. Our team will contact you at{' '}
                <span className="font-medium">{formData.phone}</span> soon to confirm your order.
              </p>
              <div className="mt-6 flex justify-center space-x-4">
                <Link href="/order-history">
                  <button className="px-6 py-2 bg-indigo-100 text-indigo-700 font-medium rounded-md hover:bg-indigo-200 transition-colors">
                    View Order History
                  </button>
                </Link>
                <Link href="/customize">
                  <button className="px-6 py-2 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 transition-colors">
                    Add More Items
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderOverview;