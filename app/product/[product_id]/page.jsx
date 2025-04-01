"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import { FaArrowLeft, FaEdit, FaTrash } from "react-icons/fa";
import STLViewer from "@/components/HomeModel";

const API_BASE_URL = "http://localhost:8000/api";

export default function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { product_id } = useParams();

  useEffect(() => {
    if (product_id !== "new") {
      fetchProductDetails();
    } else {
      router.push("/products");
    }
  }, [product_id, router]);

  const fetchProductDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/products/${product_id}`);
      const data = response.data.product || response.data;
      setProduct(data);
    } catch (err) {
      setError("Failed to fetch product details.");
      console.error("Fetch product details error:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async () => {
    if (!confirm("Are you sure you want to delete this product? This action cannot be undone.")) return;

    setLoading(true);
    setError(null);
    try {
      await axios.delete(`${API_BASE_URL}/products/${product_id}`);
    //   router.push("/products");
    } catch (err) {
      setError("Failed to delete product.");
      console.error("Delete product error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    router.push(`/products/${product_id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-gray-700 text-xl font-semibold animate-pulse">Loading product details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-xl font-semibold mb-6">{error}</p>
          <button
            onClick={() => router.push("/products")}
            className="flex items-center gap-2 text-zinc-600 hover:text-zinc-800 transition duration-200 mx-auto text-lg font-medium"
          >
            <FaArrowLeft /> Back to Products
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8 font-sans mt-20">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.push("/products")}
          className="mb-8 flex items-center gap-2 text-zinc-700 hover:text-zinc-900 transition duration-200 text-lg font-semibold"
        >
          <FaArrowLeft /> Back to Products
        </button>

        {/* Main Container */}
        <div className="bg-white rounded-2xl shadow-xl p-8 transition-all duration-300">
          {/* Header */}
          <div className="flex justify-between items-center mb-10 border-b border-gray-200 pb-6">
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">{product.name}</h1>
            <div className="flex gap-4">
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 px-6 py-2 bg-zinc-600 text-white rounded-lg hover:bg-zinc-700 transition duration-200 shadow-md hover:shadow-lg text-sm font-medium"
              >
                <FaEdit /> Edit Product
              </button>
              <button
                onClick={deleteProduct}
                className="flex items-center gap-2 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200 shadow-md hover:shadow-lg disabled:opacity-50 text-sm font-medium"
                disabled={loading}
              >
                <FaTrash /> Delete Product
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg flex items-center gap-2 animate-slide-in">
              <FaTimes /> {error}
            </div>
          )}

          {/* Content */}
          <div className="space-y-12">
            {/* Product Information */}
            <div>
              <h2 className="text-2xl font-semibold text-zinc-700 mb-4">Product Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
                <div>
                  <p><strong className="font-medium text-gray-900">Name:</strong> {product.name}</p>
                  <p><strong className="font-medium text-gray-900">Price:</strong> ₹{product.price.toFixed(2)}</p>
                  <p><strong className="font-medium text-gray-900">Stock:</strong> {product.quantity}</p>
                  <p><strong className="font-medium text-gray-900">In Stock:</strong> <span className={product.inStock ? "text-green-600 font-medium" : "text-red-600 font-medium"}>{product.inStock ? "Yes" : "No"}</span></p>
                </div>
                <div>
                  <p><strong className="font-medium text-gray-900">Category:</strong> {Array.isArray(product.category) ? product.category.join(", ") : product.category}</p>
                  <p><strong className="font-medium text-gray-900">Diameter:</strong> {Array.isArray(product.diameter) ? product.diameter.join(", ") + " mm" : product.diameter}</p>
                  <p><strong className="font-medium text-gray-900">Created At:</strong> {new Date(product?.created_at).toLocaleString()}</p>
                </div>
                <div className="col-span-full">
                  <p><strong className="font-medium text-gray-900">Description:</strong> {product.description || "No description provided."}</p>
                </div>
              </div>
            </div>

            {/* Images */}
            <div>
              <h2 className="text-2xl font-semibold text-zinc-700 mb-4">Images</h2>
              {product.image.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {product.image.map((url, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={url}
                        alt={`Product ${index}`}
                        className="w-full h-56 object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105"
                      />
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-opacity duration-300 text-white opacity-0 group-hover:opacity-100 text-sm font-medium rounded-lg"
                      >
                        View Full Size
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">No images available.</p>
              )}
            </div>

            {/* Materials */}
            <div>
              <h2 className="text-2xl font-semibold text-zinc-700 mb-4">Materials</h2>
              {product.materials.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.materials.map((material, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg shadow-sm">
                      <p className="text-gray-700"><strong className="font-medium text-gray-900">Name:</strong> {material.name}</p>
                      <p className="text-gray-700"><strong className="font-medium text-gray-900">Price:</strong> ₹{material.price.toFixed(2)}</p>
                      <p className="text-gray-700"><strong className="font-medium text-gray-900">In Stock:</strong> <span className={material.inStock ? "text-green-600 font-medium" : "text-red-600 font-medium"}>{material.inStock ? "Yes" : "No"}</span></p>
                      <p className="text-gray-700"><strong className="font-medium text-gray-900">Colors:</strong> {material.color.length > 0 ? material.color.join(", ") : "N/A"}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">No materials specified.</p>
              )}
            </div>

            {/* Model Types */}
            <div>
              <h2 className="text-2xl font-semibold text-zinc-700 mb-4">Model Types</h2>
              {product.model_type.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.model_type.map((model, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg shadow-sm">
                      <p className="text-gray-700"><strong className="font-medium text-gray-900">Name:</strong> {model.name}</p>
                      <p className="text-gray-700"><strong className="font-medium text-gray-900">Price:</strong> ₹{model.price.toFixed(2)}</p>
                      <p className="text-gray-700"><strong className="font-medium text-gray-900">In Stock:</strong> <span className={model.inStock ? "text-green-600 font-medium" : "text-red-600 font-medium"}>{model.inStock ? "Yes" : "No"}</span></p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">No model types specified.</p>
              )}
            </div>

            {/* 3D Models */}
            <div>
              <h2 className="text-2xl font-semibold text-zinc-700 max-h-max mb-4">3D Models</h2>
              {product.model_3d.length > 0 ? (
                <ul className="space-y-3">
                  {product.model_3d.map((url, index) => (
                    
                    <li key={index} className="text-gray-700">
                    
                      {/* <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-600 hover:text-zinc-800 font-medium transition duration-200 flex items-center gap-2"
                      >
                        <FaArrowLeft className="text-sm transform rotate-45" /> Model {index + 1}
                      </a> */}

                      <STLViewer url={url} />
                      <p>{url}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 italic">No 3D models available.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for Animations */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}