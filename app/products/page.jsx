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
    <div className="bg-white font-poppins relative">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between border-b py-6">
          <h1 className="text-3xl font-bold text-purple-900">Our Products</h1>
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden p-2 text-gray-500 hover:text-gray-700"
          >
            <FunnelIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="flex flex-col lg:flex-row mt-6">
          {/* Sidebar Filters */}
          <div
            className={`absolute inset-0 bg-white w-64 p-4 border-r lg:relative  lg:block  lg:w-1/4 transition-transform  ${mobileFiltersOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
          >
            <button
              className="lg:hidden mb-4 text-gray-500 hover:text-gray-700"
              onClick={() => setMobileFiltersOpen(false)}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
            {filters.map((section) => (
              <div key={section.id} className="mb-4">
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
          <div className="lg:w-3/4 px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                    <Link href={`/productdetails/${product.id}`} key={product.id} className="border p-4 rounded-lg shadow-sm">
                    <div className="bg-gray-200 h-40 mb-4">
                        <Image src={product.img} width={300} height={300} alt={product.name}/>
                    </div>
                    <h2 className="text-lg font-medium text-gray-900">{product.name}</h2>
                    <p className="text-sm text-gray-600">{product.category}</p>
                    <p className="text-sm text-gray-600">Color: {product.color}</p>
                    <p className="text-sm text-gray-600">Material: {product.material}</p>
                    <button className="mt-2 text-indigo-600 hover:underline">View Details</button>
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
