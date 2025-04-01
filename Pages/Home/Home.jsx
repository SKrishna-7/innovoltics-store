// pages/Home/Home.js (or wherever Home.js is located)
"use client";
import FHome from "../FHome";
import Services from "../Services";
import Featured from "../FeaturedProducts";

export default function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-100">
      <FHome />
      <Services />
      <Featured />
    </div>
  );
}