"use client";

import { useState } from 'react';
import { XMarkIcon, FunnelIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
const sortOptions = [
  { name: 'Most Popular' },
  { name: 'Best Rating' },
  { name: 'Newest' },
  { name: 'Price: Low to High' },
  { name: 'Price: High to Low' },
];

const filters = [
  {
    id: 'category',
    name: 'Category',
    options: ['3D Products', 'Electronic Prototypes', 'Custom Models'],
  },
  {
    id: 'color',
    name: 'Color',
    options: ['White', 'Black', 'Gray', 'Green', 'Red', 'Violet'],
  },
  {
    id: 'material',
    name: 'Material',
    options: ['PLA', 'PETG', 'ABS', 'TPU'],
  },
];

const products = [
  { id: 1, name: 'PLA Print', category: '3D Products', color: 'White', material: 'PLA' ,img:'/images/DF.png'},
  { id: 2, name: 'ABS Print', category: '3D Products', color: 'Black', material: 'ABS' ,img:'/images/DF.png'},
  { id: 3, name: 'Custom Model', category: 'Custom Models', color: 'Red', material: 'PETG' ,img:'/images/DF.png'},
  { id: 4, name: 'Electronic Case', category: 'Electronic Prototypes', color: 'Green', material: 'TPU',img:'/images/DF.png' },
];

export default function ProductsPage() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});

  const toggleFilter = (category, option) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev };
      newFilters[category] = newFilters[category]?.includes(option)
        ? newFilters[category].filter((item) => item !== option)
        : [...(newFilters[category] || []), option];
      return newFilters;
    });
  };

  const filteredProducts = products.filter((product) => {
    return (
      (!selectedFilters.category?.length || selectedFilters.category.includes(product.category)) &&
      (!selectedFilters.color?.length || selectedFilters.color.includes(product.color)) &&
      (!selectedFilters.material?.length || selectedFilters.material.includes(product.material))
    );
  });

  return (
    <div className="bg-white font-poppins relative mt-20 min-h-screen flex flex-col">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between border-b py-6">
          <h1 className="text-3xl font-bold text-purple-900">Our Products</h1>
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden p-2 text-gray-500 hover:text-gray-700 "
          >
            <FunnelIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="flex flex-col lg:flex-row mt-6">
          {/* Sidebar Filters */}
          <div
          className={`absolute inset-0 bg-white w-64 p-4 border-r lg:relative lg:block lg:w-1/4 transition-transform ${
            mobileFiltersOpen ? "translate-x-0 z-50" : "-translate-x-full z-0"
          } lg:translate-x-0 lg:z-0`}
          >
            <button
              className="lg:hidden mb-4 text-gray-500 hover:text-gray-700"
              onClick={() => setMobileFiltersOpen(false)}
            >
              <XMarkIcon className="h-6 w-6 " />
            </button>
            {filters.map((section) => (
              <div key={section.id} className="mb-4 ">
                <h3 className="font-medium text-gray-900 mb-2">{section.name}</h3>
                <div className="space-y-2">
                  {section.options.map((option) => (
                    <label key={option} className="flex items-center space-x-2 text-gray-700">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                        checked={selectedFilters[section.id]?.includes(option) || false}
                        onChange={() => toggleFilter(section.id, option)}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Product Grid */}
          <div className="lg:w-3/4 px-4 ">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <Link
                  href={`/productdetails/${product.id}`}
                  key={product.id}
                  className="group bg-white border border-gray-200 p-5 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="relative bg-gray-100 h-40 mb-5 rounded-lg overflow-hidden">
                    <Image
                      src={product.img}
                      width={300}
                      height={300}
                      alt={product.name}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900 group-hover:text-purple-700 transition-colors duration-200">
                    {product.name}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">{product.category}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-medium text-gray-700">Color:</span> {product.color}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-medium text-gray-700">Material:</span> {product.material}
                  </p>
                  <button className="mt-3 text-purple-600 font-medium hover:text-purple-800 hover:underline transition-all duration-200">
                    View Details
                  </button>
                </Link>
                ))
              ) : (
                <p className="text-gray-500">No products found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


