"use client";

import { useEffect, useState } from "react";

import { useRouter } from 'next/navigation';
import { useUser } from '@/store/UserContext';



export default function AdminLayout({ children }) {
  
  const { user, token, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user || user.role !== 'admin') {
        // Not logged in or not an admin
        router.push(user ? '/' : '/login');
      }
    }
  }, [user, isLoading, router]);

  if (isLoading || !user || user.role !== 'admin') {
    return (
      <div className="flex justify-center items-center h-screen text-gray-700">
        Checking permissions...
      </div>
    );
  }


  return <>{children}</>;
}