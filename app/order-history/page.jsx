'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const OrderHistoryPage = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
      const storedOrders = JSON.parse(localStorage.getItem('orderHistory') || '[]');
      setOrders(storedOrders);
    }, []);
  const [loading, setLoading] = useState(false);

  // Fetch orders from API (uncomment and adjust for your backend)
  /*
  useEffect(() => {
    const fetchOrders = async () => {
      if (!email) return;
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8000/orders/${email}`);
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [email]);
  */

  return (
    <div className="bg-gray-50 min-h-screen font-poppins pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-900">Your Order History</h1>
          <p className="mt-2 text-sm text-gray-600">
            View all your past and pending orders below
          </p>
        </header>

       
        {/* Orders Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          {loading ? (
            <p className="text-center text-gray-600">Loading your orders...</p>
          ) : orders.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">
                No orders found.{' '}
                <Link href="/upload-model" className="text-indigo-600 hover:underline font-medium">
                  Upload a model to get started!
                </Link>
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              { orders?.length > 0 && orders?.map((order) => (
                <div
                  key={order.id}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  {/* Order Header */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        Order #{order.id}
                      </h2>
                      <p className="text-sm text-gray-500">
                        Placed on {order.date}
                      </p>
                    </div>
                    <span
                      className={`mt-2 sm:mt-0 px-3 py-1 text-sm font-medium rounded-full ${
                        order.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  {/* Order Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Product Info */}
                    {
                        order?.products?.length > 0 && order?.products?.map((product)=>(
                            <div>
                      <h3 className="text-lg font-medium text-gray-900">Product Details</h3>
                      <dl className="mt-2 space-y-2 text-sm text-gray-600">
                        <div className="flex">
                          <dt className="font-medium w-24">Product:</dt>
                          <dd>{product.name}</dd>
                        </div>
                        <div className="flex">
                          <dt className="font-medium w-24">Color:</dt>
                          <dd>{product.color}</dd>
                        </div>
                        <div className="flex">
                          <dt className="font-medium w-24">Size:</dt>
                          <dd>{product.size}</dd>
                        </div>
                        <div className="flex">
                          <dt className="font-medium w-24">Material:</dt>
                          <dd>{product.material}</dd>
                        </div>
                        <div className="flex">
                          <dt className="font-medium w-24">Price:</dt>
                          <dd>₹{product.price}</dd>
                        </div>
                      </dl>
                    </div>
                        ))
                    }

                    {/* Shipping Info */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Shipping Address</h3>
                      <dl className="mt-2 space-y-2 text-sm text-gray-600">
                        <div className="flex">
                          <dt className="font-medium w-24">Name:</dt>
                          <dd>{order?.customer?.name}</dd>
                        </div>
                        <div className="flex">
                          <dt className="font-medium w-24">Street:</dt>
                          <dd>{order?.customer?.address}</dd>
                        </div>
                        <div className="flex">
                          <dt className="font-medium w-24">City:</dt>
                          <dd>{order?.customer?.city}</dd>
                        </div>
                        <div className="flex">
                          <dt className="font-medium w-24">State/ZIP:</dt>
                          <dd>
                            {order?.customer?.state} / {order?.customer?.zip}
                          </dd>
                        </div>
                        <div className="flex">
                          <dt className="font-medium w-24">Country:</dt>
                          <dd>{order?.customer?.country}</dd>
                        </div>
                      </dl>
                    </div>
                  </div>

                  {/* Action Buttons */}
                 
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryPage;