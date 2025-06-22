"use client"
import { useState, useEffect } from 'react';
import { FaShoppingCart, FaCheckCircle, FaDollarSign, FaBox } from 'react-icons/fa';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/Carthooks';


import { useOrderHistory , useCancelOrder, useAllOrders} from '@/hooks/orderHooks.js';
import { useUser } from '@/store/UserContext';
import { useProducts } from "@/hooks/productHooks";
import { useAllUsers } from '@/hooks/Authhooks';

export default function DashboardOverview() {
  const router = useRouter();

  const { token, user } = useUser();
  const { data: orders, isLoading, error } = useAllOrders(token);
  const { data: products = [] , isLoading:loading} = useProducts();
  const { data: users } = useAllUsers(token);


  // console.log(users)
  
  if (isLoading) return <p>Loading orders...</p>;
  if (error) return <p>Error loading orders: {error.message}</p>;


  


  const totalOrders = orders.length;
  const completedOrders = orders.filter((o) => o.status === 'Delivered').length;
  // const revenue = orders.reduce((sum, o) => sum + o.total_price, 0);
  const totalProducts = products?.length || 0;

  const totalUsers=users?.length

  if (!orders) return <div className='mt-20 text-center text-2xl font-bold text-gray-500'>No orders found;</div>;
  if (error) return <div className='mt-20 text-center text-2xl font-bold text-red-500'>{error}</div>;

  
  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-semibold text-purple-600 dark:text-purple-400 mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6">
        <div className="bg-purple-50 dark:bg-gray-900 p-4 rounded-lg shadow">
          <FaShoppingCart className="text-purple-600 text-xl sm:text-2xl mb-2" />
          <p className="text-sm text-gray-600 dark:text-gray-300">Total Orders</p>
          <p className="text-xl sm:text-2xl font-bold text-white" >{totalOrders}</p>
        </div>
        <div className="bg-purple-50 dark:bg-gray-900 p-4 rounded-lg shadow">
          <FaCheckCircle className="text-purple-600 text-xl sm:text-2xl mb-2" />
          <p className="text-sm text-gray-600 dark:text-gray-300">Completed Orders</p>
          <p className="text-xl sm:text-2xl font-bold text-white">{completedOrders}</p>
        </div>
       
        <div className="bg-purple-50 dark:bg-gray-900 p-4 rounded-lg shadow"> 
          <FaBox className="text-purple-600 text-xl sm:text-2xl mb-2" />
          <p className="text-sm text-gray-600 dark:text-gray-300">Total Products</p>
          <p className="text-xl sm:text-2xl font-bold text-white">{totalProducts}</p>
          </div>
        <div className="bg-purple-50 dark:bg-gray-900 p-4 rounded-lg shadow"> 
          <FaBox className="text-purple-600 text-xl sm:text-2xl mb-2" />
          <p className="text-sm text-gray-600 dark:text-gray-300">Registered Users</p>
          <p className="text-xl sm:text-2xl font-bold text-white">{totalUsers}</p>
          </div>
      </div>
      {/* <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-purple-600 dark:text-purple-400 mb-4">Revenue Trends</h3>
        <Bar data={data} />
      </div> */}
    </div>
  );
}