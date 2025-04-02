


"use client";
import { useState, useEffect } from "react";
import { FaSync, FaCog, FaPlus, FaTimes } from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

const BASE_URL = 'https://innovoltics-3dprinters.onrender.com/api';

export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  


  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
        const response = await axios.get(`${BASE_URL}/products`);
      setProducts(response.data.products || response.data);
    } catch (err) {
      setError(err?.response?.data?.detail || "Failed to fetch products");
      console.error("Fetch products error:", err);
    } finally {
      setLoading(false);
    }
  };

  const viewProductDetails = (productId) => {
    router.push(`/admin/products/${productId}`);
  };
  // if (error) return <div className='mt-20 text-center text-2xl font-bold text-red-500'>{error}</div>;
  if (loading) return <div className='mt-20 text-center text-2xl font-bold text-gray-500'>Loading...</div>;
  
  if (products.length === 0) 
  {
    return <>
       <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <span>Product Management</span>
            <span className="text-purple-600">({products.length})</span>
          </h2>
          <button
            onClick={fetchProducts}
            className="p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition duration-200 disabled:opacity-50"
            disabled={loading}
            title="Refresh Products"
          >
            <FaSync className={loading ? "animate-spin" : ""} />
          </button>
        </div>

        
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg flex items-center gap-2">
            <FaTimes /> No products available.
          </div>
        
      
      <div className="">
        <Link href="/admin/products/new" className="w-fit mb-4 bg-purple-600 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-purple-700 transition duration-200 shadow-md">
          <FaPlus /> Add Product
        </Link>
      </div>
       
    </>

  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      

      <div className="max-w-6xl mx-auto">
       
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <span>Product Management</span>
            <span className="text-purple-600">({products.length})</span>
          </h2>
          <button
            onClick={fetchProducts}
            className="p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition duration-200 disabled:opacity-50"
            disabled={loading}
            title="Refresh Products"
          >
            <FaSync className={loading ? "animate-spin" : ""} />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg flex items-center gap-2">
            <FaTimes /> {error}
          </div>
        )}
      
      <div className="">
        <Link href="/admin/products/new" className="w-fit mb-4 bg-purple-600 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-purple-700 transition duration-200 shadow-md">
          <FaPlus /> Add Product
        </Link>
      </div>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-purple-700 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                      Loading products...
                    </td>
                  </tr>
                ) : products.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                      No products available.
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-50 transition duration-150">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{product.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">₹{product.price.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{product.quantity}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => viewProductDetails(product._id)}
                          className="text-purple-600 hover:text-purple-800 flex items-center gap-1 transition duration-150"
                        >
                          <FaCog /> Actions
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}