"use client";
import { useState ,useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCartIcon, UserIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "@/assets/images/logo.png";
import { usePathname } from "next/navigation";
import CartIconWithBadge from "@/components/CartBadge";
export default function Navbar() {                                    
  const [menuOpen, setMenuOpen] = useState(false);               
  const [isScrolled, setIsScrolled] = useState(false);               
  const pathname = usePathname(); // Get the current route

  // Determine if we're on the homepage
  const isHomePage = pathname === "/";

  // Handle scroll effect (only for homepage)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    if (isHomePage) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isHomePage]);


  return (
    <nav  className={`w-full py-4 px-6 md:px-16 font-poppins fixed top-0 left-0 z-50 transition-all duration-300  ${
      isHomePage
        ? isScrolled
          ? "bg-gray-900/90 backdrop-blur-md shadow-lg text-gray-100"
          : "bg-transparent text-gray-100"
        : "bg-white  text-gray-900 backdrop-blur-lg"
    }`}
>
      <div className="flex justify-between items-center">
        <div className="hidden md:flex space-x-4 text-[14px] flex-1  ">
          {/* <Link href="/products" className="font-bold text-blue-100 hover:text-purple-800">Shop All</Link> */}
          <Link href="/products" className={`hover:text-purple-400 ${isHomePage ? 
            '':'text-zinc-950'
          }`} >3D Products</Link>
          <Link href="/products" className={`hover:text-purple-400 ${isHomePage ? 
            '':'text-zinc-950'
          }`}>Electronics</Link>
          <Link href="/customize" className={`hover:text-purple-400 ${isHomePage ? 
            '':'text-puzincple-950'
          }`}>Custom Orders</Link>
          <Link href="/" className={`hover:text-purple-400 ${isHomePage ? 
            '':'text-zinc-950'
          }`} >About Us</Link>
        </div>

        <div className="flex-1 flex md:justify-center items-center">
        <Link href="/">
        {
          isHomePage?<>
                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wide">
              <span className="text-purple-500">INNO</span>
              <span className="text-gray-100">VOLTICS</span>
            </span>
          </>:
          <>
            <Image src={logo} alt="Logo" width={200} />
          </>
        }
          
          </Link>
        </div>

        <div className="flex-1 flex justify-end items-center space-x-4">
         <Link href=''>
          <UserIcon className={`w-6 h-6 cursor-pointer  ${isHomePage ? 'text-gray-100' : 'text-zinc-950'}  hover:text-black `} />
         </Link>
         {/* <Link href='/checkout'>
          <ShoppingCartIcon className={`w-6 h-6 cursor-pointer ${isHomePage ? 'text-gray-100' : 'text-zinc-950'}   hover:text-black `} />
         </Link> */}
         <div className="mt-1">
         <CartIconWithBadge isHomePage={isHomePage} />
         </div>
          <button className="md:hidden bg-purple-800 p-1 text-white rounded-sm" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <XMarkIcon className="w-6 h-6 " /> : <Bars3Icon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col space-y-4 mt-8 text-center ">
          <Link href="/products" className="font-bold text-blue-900 hover:text-purple-800">Shop All</Link>
          <Link href="/products" className="hover:text-purple-800 ">3D Products</Link>
          <Link href="/products" className="hover:text-purple-800">Electronics</Link>
          <Link href="/customize" className="hover:text-purple-800">Custom Orders</Link>
          <Link href="/" className="hover:text-purple-800">About Us</Link>
        </div>
      )}
    </nav>
  );
}
