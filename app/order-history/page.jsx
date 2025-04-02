'use client';

import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { OrderContext } from '@/store/OrderContext';

const OrderHistoryPage = () => {
    const { loading, orders, deleteOrderById , } = useContext(OrderContext);
  // console.log(getOrderById)
  
  
  
  if(loading && orders.length === 0){
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
    </div>
  }



  console.log(orders)
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
                <Link href="/customize" className="text-indigo-600 hover:underline font-medium">
                  Upload a model to get started!
                </Link>
              </p>
            </div>
          ) : (
            <div className="space-y-8 flex flex-col-reverse">
            {orders?.length > 0 ? (
              orders.map((order) => (
                <div
                  key={order._id}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  {/* Order Header */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        Order ID #{order.order_id}
                      </h2>
                      <p className="text-sm text-gray-500">
                        Placed on{" "}
                        {order.created_at
                          ? new Date(order.created_at).toLocaleDateString()
                          : "Date not available"}
                      </p>
                    </div>
                    <span
                      className={`mt-2 sm:mt-0 px-3 py-1 text-sm font-medium rounded-full ${
                        order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
          
                  {/* Order Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Product Info */}
                    {order.cart_items?.length > 0 ? (
                      order.cart_items.map((product, index) => (
                        <div key={index}>
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
                              <dt className="font-medium w-24">Material:</dt>
                              <dd>{product.material}</dd>
                            </div>
                            <div className="flex">
                              <dt className="font-medium w-24">Price:</dt>
                              <dd>₹{product.price.toFixed(2)}</dd>
                            </div>
                            <div className="flex">
                              <dt className="font-medium w-24">Quantity:</dt>
                              <dd>{product.quantity}</dd>
                            </div>
                          </dl>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">No products in this order</p>
                    )}
          
                    {/* Shipping Info */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Shipping Address</h3>
                      <dl className="mt-2 space-y-2 text-sm text-gray-600">
                        <div className="flex">
                          <dt className="font-medium w-24">Name:</dt>
                          <dd>{order.shipping_details?.name || "N/A"}</dd>
                        </div>
                        <div className="flex">
                          <dt className="font-medium w-24">Street:</dt>
                          <dd>{order.shipping_details?.address || "N/A"}</dd>
                        </div>
                        <div className="flex">
                          <dt className="font-medium w-24">City:</dt>
                          <dd>{order.shipping_details?.city || "N/A"}</dd>
                        </div>
                        <div className="flex">
                          <dt className="font-medium w-24">State/ZIP:</dt>
                          <dd>
                            {order.shipping_details?.state || "N/A"} /{" "}
                            {order.shipping_details?.zip || "N/A"}
                          </dd>
                        </div>
                        <div className="flex">
                          <dt className="font-medium w-24">Country:</dt>
                          <dd>{order.shipping_details?.country || "N/A"}</dd>
                        </div>
                      </dl>
                    </div>
                  </div>
          
                  {/* Action Buttons (Optional) */}
                  {/* <div className="mt-6 flex justify-end space-x-4">
                    <button className=" px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700
                    "
                    onClick={() => router.push(`/product/${order.cart_items[0].product_id}`)}
                    >
                      View product
                    </button>
                    */}
                      {/* <button 
                      className={`px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 
                      ${order?.status !== "Pending" ? "opacity-50 cursor-not-allowed" : ""}
                  `}
                      onClick={() => deleteOrderById(order?.order_id)}
                      disabled={order?.status !== "Pending"}
                       >
                        Cancel Order
                      </button> */}
                    
                  {/* </div> */}
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No orders found</p>
            )}
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryPage;