// Featured.js
"use client";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { ProductContext } from "@/store/ProductContext";
import { isValidUrl } from "@/utils/ValidURL";
import { Spinner } from "@/components/Spinner";

const FeaturedCardSection = () => {
  const context = useContext(ProductContext);

  if (!context) {
    return (
      <div className="text-center py-10">
        <p className="text-2xl font-bold text-gray-900">No products found</p>
      </div>
    );
  }

  const { products, loading } = context;

  if (loading) {
    return <Spinner />;
  }

  const featuredItems = products.slice(0, 5);

  if (featuredItems.length === 0) {
    return (
      <></>
    );
  }

  return (
    <div className="w-full px-4 py-10 sm:px-6 lg:px-8 bg-white">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">
        Featured Items
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[200px]">
        {featuredItems.map((item) => (
          <Link
            href={`/productdetails/${item._id}`}
            key={item._id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border flex flex-col"
          >
            {/* Image Section */}
            <div className="relative w-full   h-48 sm:h-56 lg:h-64 bg-gray-100 rounded-t-xl">
              <Image
                src={
                  isValidUrl(item?.image?.[0]) ? item?.image[0] : "/images/DF.png"
                }
                alt={
                  item.imageAlt
                    ? item.imageAlt
                    : "Mini drone frame without propeller guard."
                }
                fill
                className="object-cover rounded-t-xl"
              />
            </div>

            {/* Content Section */}
            <div className="p-4 sm:p-6 bg-gray-50 flex-grow">
              <div className="flex items-center gap-2 mb-2">
                {item.icon}
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.name}
                </h3>
              </div>
              <p className="text-sm text-gray-600">{item.name}</p>
              <span className="mt-2 inline-block text-blue-600">Order Now</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCardSection;