"use client";
import Image from "next/image";
import Link from "next/link";

const products = [
  {
    id: 0,
    name: "Mini drone frame without propeller guard",
    href: "/products/0",
    price: "100 rs",
    imageSrc: "/images/DF.png",
    imageAlt: "Mini drone frame without propeller guard.",
  },
  {
    id: 1,
    name: "Mini drone frame without propeller guard",
    href: "/products/1",
    price: "100 rs",
    imageSrc: "/images/DF.png",
    imageAlt: "Mini drone frame without propeller guard.",
  },
  {
    id: 2,
    name: "Mini drone frame without propeller guard",
    href: "/products/2",
    price: "100 rs",
    imageSrc: "/images/DF.png",
    imageAlt: "Mini drone frame without propeller guard.",
  },
  {
    id: 3,
    name: "Mini drone frame without propeller guard",
    href: "/products/3",
    price: "100 rs",
    imageSrc: "/images/DF.png",
    imageAlt: "Mini drone frame without propeller guard.",
  },
  {
    id: 4,
    name: "Mini drone frame without propeller guard",
    href: "/products/4",
    price: "100 rs",
    imageSrc: "/images/DF.png",
    imageAlt: "Mini drone frame without propeller guard.",
  },
];

const ProductsPage = () => {
  return (
    <div className="py-5 px-2 w-full min-h-screen flex flex-col items-center justify-center font-poppins bg-white">
      <div className="flex w-full justify-between py-5">
        <p className="text-xl sm:text-2xl font-semibold text-gray-900">
          Featured Products
        </p>
        <Link
          href="/productdetails"
          className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200"
        >
          Shop All
        </Link>
      </div>

      <div className="max-w-[80%] grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="group bg-white rounded-xl  overflow-hidden transition-all duration-300  hover:-translate-y-1 border border-gray-200"
          >
            {/* Image Section */}
            <div className="relative w-full aspect-square">
              <Image
                alt={product.imageAlt}
                src={product.imageSrc}
                fill
                className="object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-300"
              />
              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Content Section */}
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
                {product.name}
              </h3>
              <p className="mt-1 text-lg font-semibold text-gray-900">
                {product.price}
              </p>
              <p className="mt-2 text-xs text-gray-600 line-clamp-2">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Quibusdam, asperiores!
              </p>
              <Link
                href={`/productdetails/${product.id}`}
                className="mt-3 inline-block px-4 py-1.5 bg-blue-900 text-white text-sm font-medium rounded-full hover:bg-blue-700 transition-colors duration-300"
              >
                Buy Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;