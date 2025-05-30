// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

// const BASE_URL = 'https://innovoltics-3dprinters.onrender.com/api';

// async function registerAdmin({ email, password, token }) {
//   const response = await fetch(`${BASE_URL}/admin/register`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//       "Authorization": `Bearer ${token}`,
//     },
//     body: new URLSearchParams({ email, password }),
//   });
//   const data = await response.json();
//   if (!response.ok) throw new Error(data.detail || "Admin registration failed");
//   return data;
// }

// async function verifyAdmin(token) {
//   const response = await fetch(`${BASE_URL}/admin/verify`, {
//     method: "GET",
//     headers: {
//       "Authorization": `Bearer ${token}`,
//     },
//   });
//   const data = await response.json();
//   if (!response.ok) throw new Error(data.detail || "Not an admin");
//   return data;
// }

// export default function AdminSignupPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [isAuthorized, setIsAuthorized] = useState(false);
//   const [token, setToken] = useState(null);
//   const router = useRouter();

  
//   // Verify admin status on page load
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const token = localStorage.getItem("access_token");
//       setToken(token);
//       if (!token) {
//         router.push("/login"); // Redirect to login if no token
//             return;
//       }
//     }

//     const checkAdmin = async () => {
//       try {
//         await verifyAdmin(token);
//         setIsAuthorized(true);
//       } catch (err) {
//         setError("You are not authorized to access this page.");
//         router.push("/login"); // Redirect to login if not admin
//       }
//     };

//     checkAdmin();
//   }, [token, router]);

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     if (!email || !password) {
//       setError("Please provide email and password.");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       const data = await registerAdmin({ email, password, token });
//       setError("Admin added successfully!");
//       setEmail("");
//       setPassword("");
//     } catch (error) {
//       setError(error.message || "Failed to add admin.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!isAuthorized) {
//     return (
//       <div className="min-h-screen bg-slate-50 font-poppins flex items-center justify-center">
//         <p className="text-red-700">Checking authorization...</p>
//       </div>
//     );
//   }

//   return (
//     <div className=" h-full bg-slate-50 font-poppins flex items-center justify-center">
//       <div className="bg-white p-8 rounded-xl border-2 border-purple-100 w-full max-w-md">
//         <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Admin</h1>
//         {error && (
//           <div
//             className={`mb-4 p-2 rounded-md text-center ${
//               error.includes("successfully") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
//             }`}
//           >
//             {error}
//           </div>
//         )}
//         <form className="space-y-4" onSubmit={handleSignup}>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full mt-1 px-3 py-2 border rounded-md focus:border-indigo-500 focus:ring-indigo-500"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Password</label>
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full mt-1 px-3 py-2 border rounded-md focus:border-indigo-500 focus:ring-indigo-500"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
//               >
//                 {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
//               </button>
//             </div>
//           </div>
//           <button
//             type="submit"
//             className="w-full py-2 bg-purple-800 text-white rounded-md font-semibold hover:bg-purple-900 transition-colors disabled:opacity-50"
//             disabled={loading}
//           >
//             {loading ? "Processing..." : "Add Admin"}
//           </button>
//         </form>
//         <button
//           onClick={() => router.push("/admin")}
//           className="mt-4 text-sm text-purple-600 hover:underline"
//         >
//           Back to Admin Dashboard
//         </button>
//       </div>
//     </div>
//   );
// }









"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const BASE_URL = "https://innovoltics-3dprinters.onrender.com/api";

async function registerAdmin({ email, password, token }) {
  const response = await fetch(`${BASE_URL}/admin/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": `Bearer ${token}`,
    },
    body: new URLSearchParams({ email, password }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.detail || "Admin registration failed");
  return data;
}

async function verifyAdmin(token) {
  const response = await fetch(`${BASE_URL}/admin/verify`, {
    method: "GET",
    headers: { "Authorization": `Bearer ${token}` },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.detail || "Not an admin");
  return data;
}

export default function AdminSignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // Separate success state
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();

  // Verify admin status on mount
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
        setIsAuthorized(true);
      } catch (err) {
        console.log("Verification failed:", err.message);
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkAdmin();
  }, [router]); // Only depend on router, token check is inside

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please provide email and password.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("access_token");
      const data = await registerAdmin({ email, password, token });
      setSuccess("Admin added successfully!");
      setEmail("");
      setPassword("");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 font-poppins flex items-center justify-center">
        <p className="text-gray-700">Checking authorization...</p>
      </div>
    );
  }

  if (!isAuthorized) {
    return null; // Redirect handled in useEffect
  }

  return (
    <div className="min-h-screen bg-slate-50 font-poppins flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl border-2 border-purple-100 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Admin</h1>
        {error && (
          <div className="mb-4 p-2 rounded-md text-center bg-red-100 text-red-700">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-2 rounded-md text-center bg-green-100 text-green-700">
            {success}
          </div>
        )}
        <form className="space-y-4" onSubmit={handleSignup}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded-md focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 px-3 py-2 border rounded-md focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-purple-800 text-white rounded-md font-semibold hover:bg-purple-900 transition-colors disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Processing..." : "Add Admin"}
          </button>
        </form>
        <button
          onClick={() => router.push("/admin")}
          className="mt-4 text-sm text-purple-600 hover:underline"
        >
          Back to Admin Dashboard
        </button>
      </div>
    </div>
  );
}