"use client";

import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useCart } from "@/components/CartContext"; // Assuming you have this context

const CartIconWithBadge = ({ isHomePage }) => {
  const { cart } = useCart(); // Access cart from context (adjust based on your setup)
  const cartItemCount = cart.length; // Assuming cart is an array of items

  return (
    <Link href="/checkout">
      <div className="relative inline-block">
        <ShoppingCartIcon
          className={`w-6 h-6 cursor-pointer ${
            isHomePage ? "text-gray-100" : "text-zinc-950"
          } hover:text-black transition-colors duration-200`}
        />
        {cartItemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
            {cartItemCount}
          </span>
        )}
      </div>
    </Link>
  );
};

export default CartIconWithBadge;