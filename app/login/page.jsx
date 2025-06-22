'use client'
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import { useLogin, useRegister } from '../../hooks/Authhooks';
import { useRouter } from 'next/navigation';
import axiosInstance from "../../utils/axiosInstance";
import { useState, useRef, useEffect } from 'react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [loadingOtp, setLoadingOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const inputRefs = Array.from({ length: 6 }, () => useRef());
  

  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();
  const [apiError, setApiError] = useState("");
  const router = useRouter();

  const loginMutation = useLogin();
  const registerMutation = useRegister();

  const email = watch("email");
  
  useEffect(() => {
    if (otpDigits.every((d) => d !== "")) {
      verifyOtp();
    }
  }, [otpDigits]);
  
  const sendOtp = async () => {
    setApiError(""); // clear previous error
    if (!email) return alert("Please enter your email");
    
    setLoadingOtp(true);
    try {
      const res = await axiosInstance.post("/users/send-otp", { email });
      // console.log(res);
  
      setShowOtpInput(true);
      setOtpSent(true);
      // alert("OTP sent to your email");
  
    } catch (err) {
      // console.error(err);
  
      // Show specific error from FastAPI if available
      if (err.response && err.response.data && err.response.data.detail) {
        setApiError(err.response.data.detail); // e.g., "Email already registered"
      } else {
        setApiError("Failed to send OTP. Please try again.");
      }
    }
    setLoadingOtp(false);
  };
  

  const verifyOtp = async (otpValue) => {
    setApiError("")
    const otp = otpValue || otpDigits.join("");
    if (otp.length !== 6) return alert("Please enter a 6-digit OTP");
  
    try {
      const res = await axiosInstance.post("/users/verify-otp", { email, otp });
      setOtpVerified(true);
      // alert("Email verified successfully");
    } catch (err) {
      // console.error(err);
      setApiError("Invalid or expired OTP");
    }
  };
  
  const onSubmit = (data) => {
    setApiError("");
    if (isLogin) {
      loginMutation.mutate(data, {
        onSuccess: (res) => {
          localStorage.setItem("token", res.access_token);
          router.push("/profile");
        },
        onError: (err) => {
          const msg = err.response?.data?.detail || "Login failed";
          setApiError(msg);
        }
      });
    } else {
      if (!otpVerified) return alert("Please verify your email with OTP first.");
      registerMutation.mutate(data, {
        onSuccess: () => {
          alert("Registration successful. Please login.");
          setIsLogin(true);
          reset();
        },
        onError: (err) => {
          const msg = err.response?.data?.detail || "Registration failed";
          setApiError(msg);
        }
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 mt-10 pt-5 sm:px-6 lg:px-8 font-poppins">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg w-full max-w-md border border-purple-900">
        <div className="flex justify-center mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-purple-700">
            {isLogin ? 'Login' : 'Register'}
          </h1>
        </div>

        {apiError && (
          <div className="mb-4 p-3 bg-red-100 border border-red-700 rounded-lg text-sm text-red-900">
            <p className="flex items-center">
              <span className="mr-2">⚠</span> {apiError}
            </p>
          </div>
        )}

        {Object.keys(errors).length > 0 && (
          <div className="mb-4 p-3 bg-purple-100 border border-purple-700 rounded-lg text-sm text-purple-900">
            {Object.values(errors).map((error, index) => (
              <p key={index} className="flex items-center">
                <span className="mr-2">⚠</span> {error.message}
              </p>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
          {!isLogin && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-black">Full Name</label>
              <input
                id="name"
                type="text"
                {...register('name', {
                  required: !isLogin ? 'Name is required' : false,
                  minLength: { value: 2, message: 'Name must be at least 2 characters' }
                })}
                className="mt-1 block w-full px-4 py-2 border border-purple-900 rounded-lg focus:ring-2 focus:ring-purple-700 focus:border-purple-700 text-black placeholder-gray-500 text-sm"
                placeholder="John Doe"
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-black">Email</label>
            <input
              id="email"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Invalid email address'
                }
              })}
              className="mt-1 block w-full px-4 py-2 border border-purple-900 rounded-lg focus:ring-2 focus:ring-purple-700 focus:border-purple-700 text-black placeholder-gray-500 text-sm"
              placeholder="you@example.com"
            />
            {!isLogin && (
              <button
                type="button"
                disabled={loadingOtp || otpVerified}
                onClick={sendOtp}
                className="mt-2 text-xs text-purple-700 underline hover:text-purple-900"
              >
                {otpVerified ? "Email Verified ✔" : loadingOtp ? "Sending OTP..." : "Send OTP"}
              </button>
            )}
          </div>

          {!isLogin && showOtpInput && !otpVerified && (
  <div className="mt-2">
    <label className="block text-sm font-medium text-black mb-1">Enter OTP</label>
    <div className="flex space-x-2 mb-3">
      {otpDigits.map((digit, idx) => (
        <input
          key={idx}
          ref={inputRefs[idx]}
          type="text"
          maxLength="1"
          value={digit}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/, ""); // Only digits
            if (!val) return;

            const newOtp = [...otpDigits];
            newOtp[idx] = val;
            setOtpDigits(newOtp);

            // Auto focus to next
            if (idx < 5) inputRefs[idx + 1].current?.focus();

            // Auto-submit if all filled
            const joined = newOtp.join("");
            if (joined.length === 6 && newOtp.every((d) => d !== "")) {
              setTimeout(() => {
                verifyOtp(joined);
              }, 100); // short delay for UI update
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Backspace") {
              const newOtp = [...otpDigits];
              newOtp[idx] = "";
              setOtpDigits(newOtp);
              if (idx > 0 && !otpDigits[idx]) {
                inputRefs[idx - 1].current?.focus();
              }
            }
          }}
          className="w-10 sm:w-12 h-12 text-center text-xl border border-purple-900 rounded-lg focus:ring-2 focus:ring-purple-700 text-black"
        />
      ))}
    </div>
    <button
      type="button"
      onClick={() => verifyOtp(otpDigits.join(""))}
      className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm"
    >
      Verify OTP
    </button>
  </div>
)}



          <div>
            <label htmlFor="password" className="block text-sm font-medium text-black">Password</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Password must be at least 6 characters' }
                })}
                className="mt-1 block w-full px-4 py-2 border border-purple-900 rounded-lg focus:ring-2 focus:ring-purple-700 focus:border-purple-700 text-black placeholder-gray-500 text-sm"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-900"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200 text-sm"
          >
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-black">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                reset();
                setApiError("")
                setOtpVerified(false);
                setShowOtpInput(false);
              }}
              className="ml-1 text-purple-700 hover:underline"
            >
              {isLogin ? 'Register' : 'Login'}
            </button>
          </p>
        </div>

        <div className="mt-3 text-center">
          <Link href="/" className="text-sm text-purple-700 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
