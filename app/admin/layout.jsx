

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

console.log("admin layout")
async function verifyAdmin(token) {
  console.log(token)
  const response = await fetch("http://localhost:8000/api/admin/verify", {
    method: "GET",
    headers: { "Authorization": `Bearer ${token}` },
  });
  if (!response.ok) {
    router.push("/login");
  }
  return await response.json();
}

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [token, setToken] = useState(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");
      setToken(token);
        if (!token) {
        router.push("/login");
        return;
      }
    }

    const checkAdmin = async () => {
      try {
        await verifyAdmin(token);
      } catch (err) {
        router.push("/login");
      }
    };
    checkAdmin();
  }, [token, router]);
  console.log(token)

  return <>{children}</>;
}