// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

// const BASE_URL = 'https://innovoltics-3dprinters.onrender.com/api';

// async function loginUser({email, password}) {

//   try {
//       const response = await fetch(`${BASE_URL}/login`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     });
//   const data = await response.json();
//   if (!response.ok) 
//   {
//     return data.detail || "Login failed.";
//   }
//   return data;
//   } catch (error) {
//     return error.message || "Login failed.";
//   }
// } 

// async function mergeGuest(guestId, token) {

//   try {
//     const response = await fetch(`${BASE_URL}/auth/mergeguest`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       "Authorization": `Bearer ${token}`,
//     },
//     body: new URLSearchParams({ guest_id: guestId }),
//   });
//   const data = await response.json();
//   if (!response.ok) throw new Error(data.detail || "Merge failed");
//   return data;
//   } catch (error) {
//     return "Failed to merge guest data: " + error.message;
//   }
// } 

// export default function AuthPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState(null);

//   const router = useRouter();


//   useEffect(() => {
//     if (!localStorage.getItem("guest_id") && !localStorage.getItem("user_id")) {
//       console.log("No guest or user id found");
//       }
//     if (typeof window !== "undefined") {
//       const token = localStorage.getItem("access_token");
//       const role = localStorage.getItem("role");
//       if (token && role === "admin") {
//         return router.push("/admin");
//       }
//     }
//   }, []);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     if (!email || !password) {
//       setError("Please provide email and password.");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       const data = await loginUser({ email, password });
//       // setError(data.detail || "Login failed.");
//       setError(data);      
//       localStorage.setItem("access_token", data.access_token);
//       localStorage.setItem("user_id", data.user_id);
//       localStorage.setItem("role", data.role);
//       console.log(data);
//       // Merge guest data if guest_id exists
//       // const guestId = localStorage.getItem("guest_id");
//       // if (guestId) {
//       //   try {
//       //     const mergeData = await mergeGuest(guestId, data.access_token);
//       //     console.log("Merge successful:", mergeData);
//       //     localStorage.removeItem("guest_id");
//       //   } catch (mergeError) {
//       //     setError("Failed to merge guest data: " + mergeError.message);
//       //   }
//       // }
      
//       // Redirect based on role
//       // if (data.role === "admin") {
//       //   router.push("/admin");
//       // } else {
//       //   router.push("/checkout");
//       // }
//       if (data.role === "admin") {
//         router.push("/admin");
//       }
//       else {
//        setError("Only for admin");
//       }
//     } catch (error) {
//       setError(error.message || "Login failed.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 font-poppins flex items-center justify-center p-10">
//       <div className="bg-white p-8 rounded-xl border-2 border-purple-100 w-full max-w-md">
//         <h1 className="text-2xl font-bold text-gray-900 mb-6">Login</h1>
//         {error && (
//           <div
//             className={`mb-4 p-2 rounded-md text-center ${
//               typeof error === "string" && JSON.stringify(error).includes("successfully") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
//             }`}
//           >
//             {error || "Only for admin"}
//           </div>
//         )}
//         <form className="space-y-4" onSubmit={handleLogin}>
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
//             {loading ? "Processing..." : "Login"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }




"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const BASE_URL = "https://innovoltics-3dprinters.onrender.com/api";

async function loginUser({ email, password }) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.detail || "Login failed");
  }
  return data;
}

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const role = localStorage.getItem("role");
    if (token && role === "admin") {
      router.push("/admin");
    }
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please provide email and password.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await loginUser({ email, password });
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("user_id", data.user_id);
      localStorage.setItem("role", data.role);
      console.log("Login successful:", data);

      if (data.role === "admin") {
        router.push("/admin");
      } else {
        setError("Only admins can log in here.");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-poppins flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-xl border-2 border-purple-100 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Login</h1>
        {error && (
          <div className="mb-4 p-2 rounded-md text-center bg-red-100 text-red-700">
            {error}
          </div>
        )}
        <form className="space-y-4" onSubmit={handleLogin}>
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
            {loading ? "Processing..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}