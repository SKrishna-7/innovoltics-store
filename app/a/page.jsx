'use client';

import { useState, useEffect } from 'react';
import { TrashIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { useCart } from '@/components/CartContext';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function OrderOverview() {
  // Dummy cart data
  // const [cart, setCart] = useState([
  //   { id: '1', name: '3D Printed Dragon Figurine', price: 29.99, quantity: 1, image: '/images/DF.png' },
  //   { id: '2', name: '3D Printed Keychain', price: 9.99, quantity: 2, image: '/images/DF.png' },
  // ]);

  const { cart }=useCart()
  console.log(cart)
  // Initial form data for shipping and payment
  const initialFormData = {
    name: 'John Doe',
    address: '123 Main St',
    city: 'Anytown',
    state: 'CA',
    zip: '12345',
    email: 'john@example.com',
    phone: '123-456-7890',
    country: 'USA',
    
  };

  // Load form data from localStorage or use initial data
  const [formData, setFormData] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem('checkoutData');
      return savedData ? JSON.parse(savedData) : initialFormData;
    }
    return initialFormData;
  });

  // Save to localStorage on formData change
  useEffect(() => {
    localStorage.setItem('checkoutData', JSON.stringify(formData));
  }, [formData]);

  // Handle shipping and payment edits
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle cart quantity change
  const handleQuantityChange = (id, delta) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  // Remove item from cart
  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Calculate total
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Order Placed Successfully!');
  };
  const [orderSent, setOrderSent] = useState(false);
  return (
    <div className="bg-white min-h-screen font-poppins">
      {orderSent ? (
        <div className="text-center">
        <p className="text-zinc-600 text-center mt-20 text-lg">Order sent successfully! Our Team will contact you soon to confirm .</p>
        <Link href={'/products'} className='py-2'>Back to shop</Link>
        </div>
      ) :(
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Order Overview</h1>
        <div className="flex flex-col justify-between lg:flex-row lg:space-x-8">
          
        <div className="w-full lg:w-[40%]">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Cart</h2>
            {cart.length === 0 ? (
              <p className="text-gray-500">Your cart is empty.</p>
            ) : (
              <div className="space-y-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center border-b pb-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-md mr-4"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                      <p className='text-gray'>${(item.price || 0).toFixed(2)} x {item.quantity}</p>
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => handleQuantityChange(item.id, -1)}
                          className="text-gray-500 hover:text-gray-700 px-2"
                        >
                          -
                        </button>
                        <span className="mx-2 text-gray-900">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, 1)}
                          className="text-gray-500 hover:text-gray-700 px-2"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="ml-4 text-red-600 hover:text-red-800"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-900 font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
                <div className="flex justify-between text-lg font-semibold text-gray-900 pt-4">
                  <span>Total</span>
                  <span>${total}</span>
                </div>
                <button
                  className="mt-6 w-full flex items-center justify-center rounded-md  px-8 py-3 text-base font-medium  outine-none "
                >
                  Add more items
                </button>
              </div>
            )}
          </div>
          {/* Shipping Details (Left) */}
          <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Shipping Details</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                onClick={()=>{
                  setOrderSent(true);
                  setTimeout(6000)
                  setOrderSent(false)
                }}
              >
                  Confrim your order
              </button>
            </form>
          </div>

         
        </div>
      </div>
       )}
    </div>
  );
}

