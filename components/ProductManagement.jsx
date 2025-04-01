// "use client";
// import { useState, useEffect } from "react";
// import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
// import axios from "axios";

// const API_BASE_URL = "http://localhost:8000/api"; // Base URL for your FastAPI backend

// export default function ProductManagement() {
//   const [products, setProducts] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [currentProductId, setCurrentProductId] = useState(null);
//   const [newProduct, setNewProduct] = useState({
//     name: "",
//     description: "",
//     price: "",
//     quantity: "",
//     category: [""],
//     image: [],
//     diameter: [""],
//     materials: [{ name: "", inStock: true, price: "", color: [""] }],
//     inStock: true,
//     model_type: [{ name: "", inStock: true, price: "" }],
//     model_3d: [],
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // Fetch all products
//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/products`);
//       setProducts(response.data.products || response.data); // Adjust based on backend response
//     } catch (err) {
//       setError("Failed to fetch products.");
//       console.error(err);
//     }
//   };

//   // Add or Update a product
//   const saveProduct = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     const formData = new FormData();
//     formData.append("name", newProduct.name);
//     formData.append("description", newProduct.description);
//     formData.append("price", parseFloat(newProduct.price) || 0);
//     formData.append("quantity", parseInt(newProduct.quantity, 10) || 0);
//     formData.append("category", JSON.stringify(newProduct.category.filter(Boolean)));
//     newProduct.image.forEach((file) => formData.append("image", file));
//     formData.append("diameter", JSON.stringify(newProduct.diameter.filter(Boolean).map(Number)));
//     formData.append(
//       "materials",
//       JSON.stringify(
//         newProduct.materials.map((m) => ({
//           name: m.name,
//           inStock: m.inStock,
//           price: parseFloat(m.price) || 0,
//           color: m.color.filter(Boolean),
//         }))
//       )
//     );
//     formData.append("inStock", String(newProduct.inStock));
//     formData.append(
//       "model_type",
//       JSON.stringify(
//         newProduct.model_type.map((mt) => ({
//           name: mt.name,
//           inStock: mt.inStock,
//           price: parseFloat(mt.price) || 0,
//         }))
//       )
//     );
//     newProduct.model_3d.forEach((file) => formData.append("model_3d", file));

//     try {
//       if (isEditMode) {
//         console.log(currentProductId);
//         // Update existing product
//         await axios.put(`${API_BASE_URL}/products/${currentProductId}`, formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//       } else {
//         // Add new product
//         await axios.post(`${API_BASE_URL}/products`, formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//       }
//       setIsModalOpen(false);
//       resetForm();
//       fetchProducts();
//     } catch (err) {
//       setError(err.response?.data?.detail || "Failed to save product.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Delete a product
//   const deleteProduct = async (id) => {
//     if (confirm("Are you sure you want to delete this product?")) {
//       try {
//         await axios.delete(`${API_BASE_URL}/products/${id}`);
//         fetchProducts();
//       } catch (err) {
//         setError("Failed to delete product.");
//         console.error(err);
//       }
//     }
//   };

//   // Edit a product
//   const editProduct = (product) => {
//     setNewProduct({
//       name: product.name,
//       description: product.description || "",
//       price: product.price.toString(),
//       quantity: product.quantity.toString(),
//       category: product.category || [""],
//       image: [], // Files need to be re-uploaded
//       diameter: product.diameter || [""],
//       materials: product.materials || [{ name: "", inStock: true, price: "", color: [""] }],
//       inStock: product.inStock,
//       model_type: product.model_type || [{ name: "", inStock: true, price: "" }],
//       model_3d: [], // Files need to be re-uploaded
//     });
//     setCurrentProductId(product._id);
//     setIsEditMode(true);
//     setIsModalOpen(true);
//   };

//   // Reset form
//   const resetForm = () => {
//     setNewProduct({
//       name: "",
//       description: "",
//       price: "",
//       quantity: "",
//       category: [""],
//       image: [],
//       diameter: [""],
//       materials: [{ name: "", inStock: true, price: "", color: [""] }],
//       inStock: true,
//       model_type: [{ name: "", inStock: true, price: "" }],
//       model_3d: [],
//     });
//     setIsEditMode(false);
//     setCurrentProductId(null);
//     setError(null);
//   };

//   // Handle file input
//   const handleFileChange = (field, e) => {
//     const files = Array.from(e.target.files);
//     setNewProduct((prev) => ({ ...prev, [field]: files }));
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <div className="max-w-6xl mx-auto">
//         <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
//           <span>Product Management</span>
//           <span className="text-purple-600">({products.length})</span>
//         </h2>
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="mb-6 bg-purple-600 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-purple-700 transition duration-200 shadow-md"
//         >
//           <FaPlus /> Add Product
//         </button>

//         {/* Products Table */}
//         <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-purple-700 text-white">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Category</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Price</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Stock</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {products.length === 0 ? (
//                   <tr>
//                     <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
//                       No products available.
//                     </td>
//                   </tr>
//                 ) : (
//                   products.map((product) => (
//                     <tr key={product._id} className="hover:bg-gray-50 transition duration-150">
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{product?.category}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">₹{product.price}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{product.quantity}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm">
//                         <button
//                           onClick={() => editProduct(product)}
//                           className="text-blue-600 hover:text-blue-800 mr-4 transition duration-150"
//                         >
//                           <FaEdit />
//                         </button>
//                         <button
//                           onClick={() => deleteProduct(product._id)}
//                           className="text-red-600 hover:text-red-800 transition duration-150"
//                         >
//                           <FaTrash />
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Modal for Add/Edit */}
//         {isModalOpen && (
//           <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
//             <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg max-h-[80vh] overflow-y-auto">
//               <h3 className="text-2xl font-semibold text-purple-700 mb-6">
//                 {isEditMode ? "Edit Product" : "Add Product"}
//               </h3>
//               {error && <p className="text-red-600 mb-4">{error}</p>}
//               <form onSubmit={saveProduct} className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Name</label>
//                   <input
//                     type="text"
//                     value={newProduct.name}
//                     onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
//                     className="mt-1 w-full p-3 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Description</label>
//                   <textarea
//                     value={newProduct.description}
//                     onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
//                     className="mt-1 w-full p-3 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
//                     rows="3"
//                   />
//                 </div>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
//                     <input
//                       type="number"
//                       value={newProduct.price}
//                       onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
//                       className="mt-1 w-full p-3 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
//                       step="0.01"
//                       min="0"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">Stock</label>
//                     <input
//                       type="number"
//                       value={newProduct.quantity}
//                       onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
//                       className="mt-1 w-full p-3 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
//                       min="0"
//                       required
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Category</label>
//                   <input
//                     type="text"
//                     value={newProduct.category[0]}
//                     onChange={(e) =>
//                       setNewProduct({ ...newProduct, category: [e.target.value] })
//                     }
//                     className="mt-1 w-full p-3 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Images</label>
//                   <input
//                     type="file"
//                     multiple
//                     accept="image/*"
//                     onChange={(e) => handleFileChange("image", e)}
//                     className="mt-1 w-full p-3 border rounded-lg"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">3D Models</label>
//                   <input
//                     type="file"
//                     multiple
//                     accept=".stl,.obj"
//                     onChange={(e) => handleFileChange("model_3d", e)}
//                     className="mt-1 w-full p-3 border rounded-lg"
//                   />
//                 </div>
//                 <div className="flex justify-end gap-4">
//                   <button
//                     type="button"
//                     onClick={() => setIsModalOpen(false)}
//                     className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-200"
//                     disabled={loading}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-200"
//                     disabled={loading}
//                   >
//                     {loading ? "Saving..." : isEditMode ? "Update" : "Add"}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



"use client";
import { useState, useEffect } from "react";
import { FaSync, FaCog, FaPlus, FaTimes } from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

const API_BASE_URL = "http://localhost:8000/api";

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
      const response = await axios.get(`${API_BASE_URL}/products`);
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