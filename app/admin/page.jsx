'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PencilIcon, EnvelopeIcon } from '@heroicons/react/20/solid';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortBy, setSortBy] = useState('created_at');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch all orders from the backend
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/orders/all', {
        headers: { 'Authorization': 'Bearer your-admin-token' }, // Add authentication later
      });
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      } else {
        setError('Failed to fetch orders');
      }
    } catch (err) {
      setError('An error occurred while fetching orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Filter and sort orders
  const filteredOrders = filterStatus === 'All'
    ? orders
    : orders.filter(order => order.status === filterStatus);

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortBy === 'created_at') return new Date(b.created_at) - new Date(a.created_at);
    return a[sortBy].localeCompare(b[sortBy]);
  });

  return (
    <div className="bg-gray-100 min-h-screen font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="bg-white rounded-t-xl shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-sm text-gray-600">Manage all Innovoltics orders here</p>
        </header>

        {/* Filters and Sorting */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Filter by Status:</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              >
                <option value="All">All</option>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              >
                <option value="created_at">Date (Newest First)</option>
                <option value="file_name">File Name</option>
                <option value="email">Customer Email</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Orders</h2>
          {loading ? (
            <p className="text-center text-gray-600">Loading orders...</p>
          ) : error ? (
            <p className="text-center text-red-600">{error}</p>
          ) : sortedOrders.length === 0 ? (
            <p className="text-center text-gray-600">No orders found.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sortedOrders.map((order) => (
                <div key={order.id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow bg-gray-50">
                  <h3 className="text-lg font-semibold text-gray-900">{order.file_name}</h3>
                  <p className="text-sm text-gray-600"><span className="font-medium">Status:</span> {order.status}</p>
                  <p className="text-sm text-gray-600"><span className="font-medium">Email:</span> {order.email}</p>
                  <p className="text-sm text-gray-600"><span className="font-medium">Date:</span> {order.created_at.split('T')[0]}</p>
                  <div className="mt-4 flex justify-between">
                    <Link href={`/admin/${order.id}`}>
                      <button className="flex items-center text-indigo-600 hover:text-indigo-800">
                        <PencilIcon className="w-5 h-5 mr-1" /> Edit
                      </button>
                    </Link>
                    <button className="flex items-center text-green-600 hover:text-green-800">
                      <EnvelopeIcon className="w-5 h-5 mr-1" /> Email
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;