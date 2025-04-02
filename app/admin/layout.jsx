"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const BASE_URL = "https://innovoltics-3dprinters.onrender.com/api";

async function verifyAdmin(token) {
  console.log("Verifying token:", token);
  const response = await fetch(`${BASE_URL}/admin/verify`, {
    method: "GET",
    headers: { "Authorization": `Bearer ${token}` },
  });
  if (!response.ok) {
    throw new Error("Admin verification failed");
  }
  return await response.json();
}

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      if (typeof window === "undefined") return;

      const token = localStorage.getItem("access_token");
      if (!token) {
        console.log("No token found, redirecting to login");
        router.push("/login");
        return;
      }

      try {
        await verifyAdmin(token);
        console.log("Admin verified");
        setIsVerified(true);
      } catch (err) {
        console.log("Verification failed:", err.message);
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkAdmin();
  }, [router]);

  if (isLoading) {
    return <div>Loading...</div>; // Prevent flash of content
  }

  if (!isVerified) {
    return null; // Redirect handled in useEffect
  }

  return <>{children}</>;
}