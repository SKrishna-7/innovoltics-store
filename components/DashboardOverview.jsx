"use client"
import { useState, useEffect } from 'react';
import { FaShoppingCart, FaCheckCircle, FaDollarSign, FaBox } from 'react-icons/fa';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
import { OrderContext } from '@/store/OrderContext';
import { ProductContext } from '@/store/ProductContext';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';
const API_BASE_URL = 'http://localhost:8000/api';

export default function DashboardOverview() {
  // const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getOrders ,orders} = useContext(OrderContext);
  const { products, productLoading, error: productError  } = useContext(ProductContext);
  const [token, setToken] = useState(null);
  const router = useRouter();

  
  console.log(orders)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");
      setToken(token);
      const role = localStorage.getItem("role");
      if (!token || role !== "admin") {
      setError("No token found");
      router.push("/");
      return;
        }
    }
    fetchOrders(token);
  }, []);
  async function fetchOrders(token) {
    await getOrders(token)
 }
  const totalOrders = orders.length;
  const completedOrders = orders.filter((o) => o.status === 'Delivered').length;
  // const revenue = orders.reduce((sum, o) => sum + o.total_price, 0);
  const totalProducts = products?.length || 0;

  if (!orders) return <div className='mt-20 text-center text-2xl font-bold text-gray-500'>No orders found;</div>;
  if (error) return <div className='mt-20 text-center text-2xl font-bold text-red-500'>{error}</div>;

  
  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-semibold text-purple-600 dark:text-purple-400 mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6">
        <div className="bg-purple-50 dark:bg-gray-700 p-4 rounded-lg shadow">
          <FaShoppingCart className="text-purple-600 text-xl sm:text-2xl mb-2" />
          <p className="text-sm text-gray-600 dark:text-gray-300">Total Orders</p>
          <p className="text-xl sm:text-2xl font-bold">{totalOrders}</p>
        </div>
        <div className="bg-purple-50 dark:bg-gray-700 p-4 rounded-lg shadow">
          <FaCheckCircle className="text-purple-600 text-xl sm:text-2xl mb-2" />
          <p className="text-sm text-gray-600 dark:text-gray-300">Completed Orders</p>
          <p className="text-xl sm:text-2xl font-bold">{completedOrders}</p>
        </div>
       
        <div className="bg-purple-50 dark:bg-gray-700 p-4 rounded-lg shadow"> 
          <FaBox className="text-purple-600 text-xl sm:text-2xl mb-2" />
          <p className="text-sm text-gray-600 dark:text-gray-300">Total Products</p>
          <p className="text-xl sm:text-2xl font-bold">{totalProducts}</p>
          </div>
      </div>
      {/* <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-purple-600 dark:text-purple-400 mb-4">Revenue Trends</h3>
        <Bar data={data} />
      </div> */}
    </div>
  );
}