'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { EnvelopeIcon } from '@heroicons/react/20/solid';

const OrderDetails = () => {
  const router = useRouter();
  const { orderId } = router;
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  // Fetch order details
  const fetchOrder = async () => {
    if (!orderId) return;
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/orders/id/${orderId}`, {
        headers: { 'Authorization': 'Bearer your-admin-token' },
      });
      if (response.ok) {
        const data = await response.json();
        setOrder(data);
        setStatus(data.status);
      } else {
        setError('Failed to fetch order');
      }
    } catch (err) {
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  // Update order status
  const handleStatusUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:8000/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer your-admin-token',
        },
        body: JSON.stringify({ status }),
      });
      if (response.ok) {
        setOrder((prev) => ({ ...prev, status }));
        alert('Status updated successfully');
      } else {
        setError('Failed to update status');
      }
    } catch (err) {
      setError('An error occurred');
    }
  };

  // Send email to customer
  const handleSendEmail = async () => {
    try {
      const response = await fetch(`http://localhost:8000/orders/${orderId}/email`, {
        method: 'POST',
        headers: { 'Authorization': 'Bearer your-admin-token' },
      });
      if (response.ok) {
        setEmailSent(true);
        setTimeout(() => setEmailSent(false), 3000);
      } else {
        setError('Failed to send email');
      }
    } catch (err) {
      setError('An error occurred');
    }
  };

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (error) return <p className="text-center mt-20 text-red-600">{error}</p>;
  if (!order) return <p className="text-center mt-20">Order not found</p>;

  return (
    <div className="bg-gray-100 min-h-screen font-poppins">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Order #{order.id}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Item Details</h2>
              <p className="mt-2 text-sm text-gray-600"><span className="font-medium">File:</span> {order.file_name}</p>
              <p className="text-sm text-gray-600"><span className="font-medium">Color:</span> {order.color}</p>
              <p className="text-sm text-gray-600"><span className="font-medium">Size:</span> {order.size}</p>
              <p className="text-sm text-gray-600"><span className="font-medium">Material:</span> {order.material}</p>
              <p className="text-sm text-gray-600"><span className="font-medium">Quantity:</span> {order.quantity}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Customer Details</h2>
              <p className="mt-2 text-sm text-gray-600"><span className="font-medium">Name:</span> {order.name}</p>
              <p className="text-sm text-gray-600"><span className="font-medium">Email:</span> {order.email}</p>
              <p className="text-sm text-gray-600"><span className="font-medium">Phone:</span> {order.phone}</p>
              <p className="text-sm text-gray-600"><span className="font-medium">Address:</span> {order.address}, {order.city}, {order.state} {order.zip_code}, {order.country}</p>
            </div>
          </div>

          {/* Status Update */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900">Update Status</h2>
            <div className="mt-2 flex items-center gap-4">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="px-3 py-2 border rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Completed">Completed</option>
              </select>
              <button
                onClick={handleStatusUpdate}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                Update Status
              </button>
            </div>
          </div>

          {/* Send Email */}
          <div className="mt-6 flex items-center gap-4">
            <button
              onClick={handleSendEmail}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              <EnvelopeIcon className="w-5 h-5 mr-2" /> Send Confirmation Email
            </button>
            {emailSent && <p className="text-green-600 text-sm">Email sent successfully!</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;