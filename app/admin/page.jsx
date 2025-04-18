

"use client"
import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import DashboardOverview from '../../components/DashboardOverview.jsx';
import ProductManagement from '../../components/ProductManagement';
import OrderManagement from '../../components/OrderManagement';
import Messages from '../../components/Messages';
import AdminSignupPage from '../../components/Signup';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const router = useRouter();

 
  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <DashboardOverview />;
      case 'products': return <ProductManagement />;
      case 'orders': return <OrderManagement />;
      case 'messages': return <Messages />;
      case 'signup': return <AdminSignupPage />;
    }
  };

  return (
    <div className="flex h-screen mt-20">
      <Sidebar setActiveTab={setActiveTab} />
      <main className="flex-1 p-6 overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  );
}
