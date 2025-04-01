"use client";



import { useState, useContext } from "react";
import { ProductContext } from "@/store/ProductContext";
import Link from "next/link";
import Image from "next/image";
import { FunnelIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { isValidUrl } from "@/utils/ValidURL";
import { Spinner } from "@/components/Spinner";
export default function ProductsPage() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [sortOption, setSortOption] = useState("default");

  const { products, loading } = useContext(ProductContext);

  if (loading) {
    return <Spinner />;
  }

  if (products.length === 0) {
    return (
      <div className="mt-20 p-10 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-purple-900">Our Products are Coming Soon</h1>
          <p className="text-gray-500 mt-2">Please check back later</p>
        </div>
      </div>
    );
  }

  // Adjust filters based on your data structure
  const filters = [
    {
      id: "category",
      name: "Category",
      options: [...new Set(products.flatMap((product) => product.category))], // Flatten array
    },
    {
      id: "color",
      name: "Color",
      options: [
        ...new Set(products.flatMap((product) => product.materials.flatMap((m) => m.color))),
      ],
    },
    {
      id: "material",
      name: "Material",
      options: [...new Set(products.flatMap((product) => product.materials.map((m) => m.name)))],
    },
  ];

  const toggleFilter = (category, option) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev };
      newFilters[category] = newFilters[category]?.includes(option)
        ? newFilters[category].filter((item) => item !== option)
        : [...(newFilters[category] || []), option];
      return newFilters;
    });
  };

  // Filter products
  const filteredProducts = products.filter((product) => {
    // Ensure product.category is always treated as an array
    const productCategories = Array.isArray(product.category) ? product.category : [product.category];
  
    // Ensure product.materials is always treated as an array
    const productMaterials = Array.isArray(product.materials) ? product.materials : [];
  
    const matchesCategory =
      !selectedFilters.category?.length ||
      productCategories.some((cat) => selectedFilters.category.includes(cat));
  
    const matchesColor =
      !selectedFilters.color?.length ||
      productMaterials.some((m) => 
        Array.isArray(m.color) && m.color.some((c) => selectedFilters.color.includes(c))
      );
  
    const matchesMaterial =
      !selectedFilters.material?.length ||
      productMaterials.some((m) => selectedFilters.material.includes(m.name));
  
    return matchesCategory && matchesColor && matchesMaterial;
  });
  

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "price-asc") return a.price - b.price;
    if (sortOption === "price-desc") return b.price - a.price;
    if (sortOption === "name-asc") return a.name.localeCompare(b.name);
    if (sortOption === "name-desc") return b.name.localeCompare(a.name);
    return 0; // Default: no sorting
  });

  return (
    <div className="bg-white font-poppins min-h-screen flex flex-col mt-20">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 flex-1">
        {/* Header */}
        <div className="flex items-center justify-between border-b py-6">
          <h1 className="text-3xl font-bold text-purple-900">Our Products</h1>
          <div className="flex items-center gap-4">
            {/* <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="p-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="default">Sort By: Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select> */}
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden p-2 text-gray-500 hover:text-gray-700 rounded-md"
            >
              <FunnelIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 mt-6">
          {/* Sidebar Filters */}
          <div
            className={`fixed inset-y-0 left-0 w-64 bg-white p-4 border-r z-50 transform transition-transform duration-300 ease-in-out lg:static lg:w-1/4 lg:block lg:translate-x-0 ${
              mobileFiltersOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex justify-between items-center mb-4 lg:mb-0">
              <h2 className="text-lg font-semibold text-gray-900 lg:hidden">Filters</h2>
              <button
                className="lg:hidden text-gray-500 hover:text-gray-700"
                onClick={() => setMobileFiltersOpen(false)}
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            {filters.map((section) => (
              <div key={section.id} className="mb-6">
                <h3 className="font-medium text-gray-900 mb-2">{section.name}</h3>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {section.options.map((option) => (
                    <label key={option} className="flex items-center space-x-2 text-gray-700">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        checked={selectedFilters[section.id]?.includes(option) || false}
                        onChange={() => toggleFilter(section.id, option)}
                      />
                      <span className="text-sm">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Filter Backdrop */}
          {mobileFiltersOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={() => setMobileFiltersOpen(false)}
            />
          )}

          {/* Product Grid */}
          <div className="w-full lg:w-3/4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.length > 0 ? filteredProducts.map((product) => (
                <Link
                  href={`/productdetails/${product._id}`}
                  key={product._id}
                  className="group bg-white border border-gray-200 p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="relative bg-gray-100 h-48 mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={isValidUrl(product?.image[0]) ? product?.image[0] : "/images/img.png"}
                      fill
                      alt={product.name}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900 group-hover:text-purple-700 transition-colors duration-200 line-clamp-1">
                    {product.name}
                  </h2>
                  <p className="text-md font-medium text-gray-900 mt-1">₹{product.price}</p>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                    {product.category?.[0] || "N/A"}
                  </p>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-1">
                    <span className="font-medium text-gray-700">Material:</span>{" "}
                    {product.materials?.[0]?.name || "N/A"}
                  </p>
                  <button className="mt-3 text-purple-600 font-medium text-sm hover:text-purple-800 hover:underline transition-all duration-200">
                    View Details
                  </button>
                </Link>
              )) : (
                <div className="text-center text-gray-500 py-10">
                  No products match your filters.
                </div>
              )}
            </div>
              
          </div>
        </div>
      </div>
    </div>
  );
}