"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { FaArrowLeft, FaTimes } from "react-icons/fa";
import { useCreateProduct, useProductById, useUpdateProduct } from "@/hooks/productHooks";
import { useUser } from "@/store/UserContext";


const EditProductPage = () => {
 
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    category: [""],
    image: [], // File objects
    diameter: [""],
    materials: [{ name: "", inStock: true, price: "", color: [""] }],
    inStock: true,
    model_type: [{ name: "", inStock: true, price: "" }],
    model_3d: [], // File objects
  });
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    materials: true,
    model_type: true,
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [uploadedData, setUploadedData] = useState(null);
  const router = useRouter();

  const  {product_id}  = useParams();

  const isEditMode = product_id !== "new";
  const {data:productById , error} = useProductById( isEditMode ? product_id : null)

  // const [productById,setProductById]=useState([])

  const [editError, setEditError] = useState(null);
  // const [error, setError] = useState('');
  const {user,token} = useUser();
  const { mutateAsync: updateProduct, isLoading:loading } = useUpdateProduct(token);
  const {mutateAsync: createProduct } = useCreateProduct(token)
  var response;

  useEffect(() => {
    
    // if (product_id && product_id !== "new") {
    //     const {data:productById , error} = useProductById(product_id)
    //     setProductById(productById)
    //     setError(error)
    // }
    
    if (productById && isEditMode) {
      setProduct({
        name: productById.name || "",
        description: productById.description || "",
        price: productById.price?.toString() || "",
        quantity: productById.quantity?.toString() || "",
        category: productById.category?.length ? productById.category : [""],
        image: productById.image?.length ? productById.image : [],
        diameter: productById.diameter?.length ? productById.diameter.map(String) : [""],
        materials: productById.materials?.length
          ? productById.materials
          : [{ name: "", inStock: true, price: "", color: [""] }],
        inStock: productById.inStock ?? true,
        model_type: productById.model_type?.length
          ? productById.model_type
          : [{ name: "", inStock: true, price: "" }],
        model_3d: [], // Files need re-upload
      });
      setUploadedData(productById); // Store original data for reference
    }
  }, [productById, isEditMode]);

  // Handle simple field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
    // console.log(name)
  };

  // Handle array field changes
  const handleArrayChange = (field, index, value) => {
    setProduct((prev) => {
      const updatedArray = [...prev[field]];
      updatedArray[index] = value;
      return { ...prev, [field]: updatedArray };
    });
  };

  // Handle file uploads
  const handleFileChange = (field, e) => {
    const files = Array.from(e.target.files);
    // console.log(files)
    setProduct((prev) => ({ ...prev, [field]: [...prev[field], ...files] }));
  };

  const removeFile = (field, index) => {
    setProduct((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const addArrayItem = (field, defaultValue = "") => {
    setProduct((prev) => ({ ...prev, [field]: [...prev[field], defaultValue] }));
  };

  const removeArrayItem = (field, index) => {
    setProduct((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleNestedChange = (field, index, key, value) => {
    setProduct((prev) => {
      const updatedArray = [...prev[field]];
      if (key === "price") {
        updatedArray[index] = { ...updatedArray[index], [key]: value === "" ? "" : parseFloat(value) || 0 };
      } else {
        updatedArray[index] = { ...updatedArray[index], [key]: value };
      }
      return { ...prev, [field]: updatedArray };
    });
  };

  const handleMaterialColorChange = (materialIndex, colorIndex, value) => {
    setProduct((prev) => {
      const updatedMaterials = [...prev.materials];
      updatedMaterials[materialIndex].color[colorIndex] = value;
      return { ...prev, materials: updatedMaterials };
    });
  };

  const addMaterialColor = (materialIndex) => {
    setProduct((prev) => {
      const updatedMaterials = [...prev.materials];
      updatedMaterials[materialIndex].color.push("");
      return { ...prev, materials: updatedMaterials };
    });
  };

  const removeMaterialColor = (materialIndex, colorIndex) => {
    setProduct((prev) => {
      const updatedMaterials = [...prev.materials];
      updatedMaterials[materialIndex].color = updatedMaterials[materialIndex].color.filter(
        (_, i) => i !== colorIndex
      );
      return { ...prev, materials: updatedMaterials };
    });
  };

  const addNestedItem = (field, defaultObj) => {
    setProduct((prev) => ({
      ...prev,
      [field]: [...prev[field], defaultObj],
    }));
  };

  const removeNestedItem = (field, index) => {
    setProduct((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };


 
  
  const handleReset = () => {
    if (isEditMode && productById) {
      setProduct({
        name: productById.name || "",
        description: productById.description || "",
        price: productById.price?.toString() || "",
        quantity: productById.quantity?.toString() || "",
        category: productById.category?.length ? productById.category : [""],
        image: productById.image?.length ? productById.image : [],
        diameter: productById.diameter?.length ? productById.diameter.map(String) : [""],
        materials: productById.materials?.length
          ? productById.materials
          : [{ name: "", inStock: true, price: "", color: [""] }],
        inStock: productById.inStock ?? true,
        model_type: productById.model_type?.length
          ? productById.model_type
          : [{ name: "", inStock: true, price: "" }],
        model_3d: [],
      });
    } else {
      setProduct({
        name: "",
        description: "",
        price: "",
        quantity: "",
        category: [""],
        image: [],
        diameter: [""],
        materials: [{ name: "", inStock: true, price: "", color: [""] }],
        inStock: true,
        model_type: [{ name: "", inStock: true, price: "" }],
        model_3d: [],
      });
    }
    setShowConfirmation(false);
    setUploadedData(null);
  };

  // console.log(product.image)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("price", parseFloat(product.price) || 0);
      formData.append("quantity", parseInt(product.quantity, 10) || 0);
      formData.append("category", JSON.stringify(product.category.filter(Boolean)));
      const existingImageUrls = product.image.filter((img) => typeof img === "string");
    formData.append("existing_images", JSON.stringify(existingImageUrls));

    // 🆕 New image uploads
    product.image.forEach((img) => {
      if (img instanceof File) {
        formData.append("image", img);
      }
    });
      formData.append("diameter", JSON.stringify(product.diameter.filter(Boolean).map(Number)));
      formData.append(
        "materials",
        JSON.stringify(
          product.materials.map((m) => ({
            name: m.name,
            inStock: m.inStock,
            price: Math.max(parseFloat(m.price) || 0, 0.01),
            color: m.color.filter(Boolean),
          })) || ''
        )
      );
      formData.append("inStock", String(product.inStock));
      formData.append(
        "model_type",
        JSON.stringify(
          product.model_type.map((mt) => ({
            name: mt.name,
            inStock: mt.inStock,
            price: Math.max(parseFloat(mt.price) || 0, 0.01),
          }) || "")
        )
      );
      product.model_3d.forEach((file) => formData.append("model_3d", file) || "");
      formData.append("requirements",product.requirements || "");
      // console.log(formData)
      // console.log(product.model_3d)
      
      setUploadedData(formData)
      setShowConfirmation(true);

    } catch (err) {
      // console.error("Error submitting form:", err);
      setEditError("An unexpected error occurred. Please try again.");
    }
  };

  
  useEffect(() => {
    return () => {
      product.image.forEach((img) => {
        if (img instanceof File) {
          URL.revokeObjectURL(img);
        }
      });
    };
  }, [product.image]);

  const confirmSubmission = async () => {

    if (!uploadedData) return;

    // console.log(uploadedData)
    setLoadingEdit(true);
    setEditError(null);
  
    try {
      let response;
  
      if (isEditMode) {
        response = await updateProduct({ product_id, formData: uploadedData, token });
      } else {
        response = await createProduct({ formData: uploadedData, token });
      }
      // console.log(response)
      if (response?.product) {
        setUploadedData(response.product);
        setUploadedData(null);
        setShowConfirmation(false);
        if (isEditMode){
          alert(`Product Edited Successfully..`)
          router.push("/admin");
        }
        alert("Product Added Successfully...")
      } else {
        throw new Error("No product returned from server.");
      }
  
    } catch (err) {
      // console.error("Error submitting product:", err);
      const msg = err?.response?.data?.detail || err.message || "Submission failed.";
      setEditError(msg);
    } finally {
      setLoadingEdit(false);
    }
  };
  

  if (loading && isEditMode) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-gray-700 text-xl font-semibold animate-pulse">Loading product details...</div>
      </div>
    );
  }

  if (error && isEditMode) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-xl font-semibold mb-6">{error || editError}</p>
          <button
            onClick={() => router.push(`/products/${product_id}`)}
            className="flex items-center gap-2 text-zinc-600 hover:text-zinc-800 transition duration-200 mx-auto text-lg font-medium"
          >
            <FaArrowLeft /> Back to Product
          </button>
        </div>
      </div>
    );
  }
  console.log(product)
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8 font-sans mt-10">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.push(isEditMode ? `/products/${product_id}` : "/admin")}
          className="mb-8 flex items-center gap-2 text-zinc-700 hover:text-zinc-900 transition duration-200 text-lg font-semibold"
        >
          <FaArrowLeft /> {isEditMode ? "Back to Product" : "Back to Products"}
        </button>

        {/* Header */}
        <header className="mb-10 text-center">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            {isEditMode ? `Edit Product: ${product.name || "Loading..."}` : "Add New Product"}
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            {isEditMode ? "Update the product details below" : "Create a new product listing"}
          </p>
        </header>
        {error && <p className="text-red-600">{error.message || "Something went wrong"}</p>}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-10">
          {/* Basic Info */}
          <section>
            <h2 className="text-2xl font-semibold text-zinc-700 mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  placeholder="e.g., Smoke Detector"
                  className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:ring-zinc-500 focus:border-zinc-500 shadow-sm transition duration-150"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Base Price (₹)</label>
                <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  placeholder="e.g., 22.99"
                  className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:ring-zinc-500 focus:border-zinc-500 shadow-sm transition duration-150"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Quantity Available</label>
                <input
                  type="number"
                  name="quantity"
                  value={product.quantity}
                  onChange={handleChange}
                  min="0"
                  placeholder="e.g., 100"
                  className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:ring-zinc-500 focus:border-zinc-500 shadow-sm transition duration-150"
                  required
                />
              </div>
              <div className="flex items-center">
                <label className="block text-sm font-medium text-gray-700 mr-4">In Stock</label>
                <input
                  type="checkbox"
                  name="inStock"
                  checked={product.inStock}
                  onChange={(e) => setProduct((prev) => ({ ...prev, inStock: e.target.checked }))}
                  className="h-5 w-5 text-zinc-600 border-gray-300 rounded focus:ring-zinc-500"
                />
              </div>
              <div className="col-span-full">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="e.g., A reliable smoke detector for home safety..."
                  className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:ring-zinc-500 focus:border-zinc-500 shadow-sm transition duration-150"
                  required
                />
              </div>
            </div>
          </section>

          {/* Categories */}
          <section>
            <h2 className="text-2xl font-semibold text-zinc-700 mb-4">Categories</h2>
            {Array.isArray(product.category) && product.category.map((cat, index) => (
              <div key={index} className="flex items-center gap-4 mt-2">
                <input
                  type="text"
                  value={cat}
                  onChange={(e) => handleArrayChange("category", index, e.target.value)}
                  placeholder="e.g., Mechanical"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-zinc-500 focus:border-zinc-500 shadow-sm transition duration-150"
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem("category", index)}
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem("category")}
              className="mt-3 text-zinc-600 hover:text-zinc-800 font-medium"
            >
              + Add Another Category
            </button>
          </section>

          {/* Images */}
          <section>
            <h2 className="text-2xl font-semibold text-zinc-700 mb-4">Images</h2>
            {isEditMode && uploadedData?.image?.length > 0 && !product.image.length && (
              <div className="mb-4">
                <p className="text-sm text-gray-600">Existing Images:</p>
                <ul className="list-disc pl-5 space-y-1">
                  {uploadedData.image.map((url, i) => (
                    <li key={i}>
                      <a href={url} target="_blank" className="text-zinc-600 hover:underline truncate block">
                        {url}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
           {product.image?.length > 0 && (
  <ul className="space-y-2 mb-4">
    {product.image.map((file, index) => {
      if (!(file instanceof File) && typeof file !== 'string') return null; // guard bad cases

      return (
        <li key={index} className="flex items-center gap-3">
          <img
            src={file instanceof File ? URL.createObjectURL(file) : file}
            alt={`Preview ${index}`}
            className="w-16 h-16 object-cover rounded border"
          />
          <span className="text-sm text-gray-600 truncate w-64">
            {file instanceof File ? file.name : file.split('/').pop()}
          </span>
          <button
            type="button"
            onClick={() => removeFile("image", index)}
            className="text-red-600 hover:text-red-800"
          >
            <FaTimes />
          </button>
        </li>
      );
    })}
  </ul>
)}

            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleFileChange("image", e)}
              className="w-full p-3 border border-gray-300 rounded-lg text-gray-600 file:bg-zinc-50 file:text-zinc-700 file:border-0 file:px-4 file:py-2 file:rounded-lg file:font-medium hover:file:bg-zinc-100 transition duration-150"
            />
          </section>

          {/* Diameters */}
          <section>
            <h2 className="text-2xl font-semibold text-zinc-700 mb-4">Diameters (mm)</h2>
            {product.diameter.map((dia, index) => (
              <div key={index} className="flex items-center gap-4 mt-2">
                <input
                  type="number"
                  value={dia}
                  onChange={(e) => handleArrayChange("diameter", index, e.target.value)}
                  
                  placeholder="e.g., 19"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-zinc-500 focus:border-zinc-500 shadow-sm transition duration-150"
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem("diameter", index)}
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem("diameter")}
              className="mt-3 text-zinc-600 hover:text-zinc-800 font-medium"
            >
              + Add Another Diameter
            </button>
          </section>

          {/* Materials */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-zinc-700">Materials</h2>
              <button
                type="button"
                onClick={() => toggleSection("materials")}
                className="text-zinc-600 hover:text-zinc-800 font-medium"
              >
                {expandedSections.materials ? "Collapse" : "Expand"}
              </button>
            </div>
            {expandedSections.materials && (
              <div className="space-y-4">
                {product.materials.map((material, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Material Name</label>
                        <input
                          type="text"
                          value={material.name}
                          onChange={(e) => handleNestedChange("materials", index, "name", e.target.value)}
                          placeholder="e.g., SD"
                          className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:ring-zinc-500 focus:border-zinc-500 shadow-sm transition duration-150"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
                        <input
                          type="number"
                          value={material.price}
                          onChange={(e) => handleNestedChange("materials", index, "price", e.target.value)}
                          step="0.01"
                          placeholder="e.g., 2.00"
                          className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:ring-zinc-500 focus:border-zinc-500 shadow-sm transition duration-150"
                        />
                      </div>
                      <div className="flex items-center">
                        <label className="block text-sm font-medium text-gray-700 mr-4">In Stock</label>
                        <input
                          type="checkbox"
                          checked={material.inStock}
                          onChange={(e) => handleNestedChange("materials", index, "inStock", e.target.checked)}
                          className="h-5 w-5 text-zinc-600 border-gray-300 rounded focus:ring-zinc-500"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700">Colors</label>
                      {material.color.map((color, colorIndex) => (
                        <div key={colorIndex} className="flex items-center gap-4 mt-2">
                          <input
                            type="text"
                            value={color}
                            onChange={(e) => handleMaterialColorChange(index, colorIndex, e.target.value)}
                            placeholder="e.g., Black"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-zinc-500 focus:border-zinc-500 shadow-sm transition duration-150"
                          />
                          {colorIndex > 0 && (
                            <button
                              type="button"
                              onClick={() => removeMaterialColor(index, colorIndex)}
                              className="text-red-600 hover:text-red-800 font-medium"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addMaterialColor(index)}
                        className="mt-3 text-zinc-600 hover:text-zinc-800 font-medium"
                      >
                        + Add Color
                      </button>
                    </div>
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => removeNestedItem("materials", index)}
                        className="mt-4 text-red-600 hover:text-red-800 font-medium"
                      >
                        Remove Material
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addNestedItem("materials", { name: "", inStock: true, price: "", color: [""] })}
                  className="mt-4 text-zinc-600 hover:text-zinc-800 font-medium"
                >
                  + Add Another Material
                </button>
              </div>
            )}
          </section>

          {/* Model Types */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-zinc-700">Model Types</h2>
              <button
                type="button"
                onClick={() => toggleSection("model_type")}
                className="text-zinc-600 hover:text-zinc-800 font-medium"
              >
                {expandedSections.model_type ? "Collapse" : "Expand"}
              </button>
            </div>
            {expandedSections.model_type && (
              <div className="space-y-4">
                {product.model_type.map((model, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Model Name</label>
                        <input
                          type="text"
                          value={model.name}
                          onChange={(e) => handleNestedChange("model_type", index, "name", e.target.value)}
                          placeholder="e.g., FSF"
                          className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:ring-zinc-500 focus:border-zinc-500 shadow-sm transition duration-150"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
                        <input
                          type="number"
                          value={model.price}
                          onChange={(e) => handleNestedChange("model_type", index, "price", e.target.value)}
                          step="0.5"
                          placeholder="e.g., 23.00"
                          className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:ring-zinc-500 focus:border-zinc-500 shadow-sm transition duration-150"
                        />
                      </div>
                      <div className="flex items-center">
                        <label className="block text-sm font-medium text-gray-700 mr-4">In Stock</label>
                        <input
                          type="checkbox"
                          checked={model.inStock}
                          onChange={(e) => handleNestedChange("model_type", index, "inStock", e.target.checked)}
                          className="h-5 w-5 text-zinc-600 border-gray-300 rounded focus:ring-zinc-500"
                        />
                      </div>
                    </div>
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => removeNestedItem("model_type", index)}
                        className="mt-4 text-red-600 hover:text-red-800 font-medium"
                      >
                        Remove Model Type
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addNestedItem("model_type", { name: "", inStock: true, price: "" })}
                  className="mt-4 text-zinc-600 hover:text-zinc-800 font-medium"
                >
                  + Add Another Model Type
                </button>
              </div>
            )}
          </section>

          {/* 3D Models */}
          <section>
            <h2 className="text-2xl font-semibold text-zinc-700 mb-4">3D Model Files</h2>
            {isEditMode && uploadedData?.model_3d?.length > 0 && !product.model_3d.length && (
              <div className="mb-4">
                <p className="text-sm text-gray-600">Existing 3D Models:</p>
                <ul className="list-disc pl-5 space-y-1">
                  {uploadedData.model_3d.map((url, i) => (
                    <li key={i}>
                      <a href={url} target="_blank" className="text-zinc-600 hover:underline truncate block">
                        {url}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
           {product.model_3d.length > 0 && (
  <ul className="space-y-2 mb-4">
    {product.model_3d.map((file, index) => (
      <li key={index} className="flex items-center gap-2">
        <span className="text-sm text-gray-600 truncate w-64">
          {file instanceof File ? file.name : (typeof file === 'string' ? file.split('/').pop() : 'Unknown File')}
        </span>
        <button
          type="button"
          onClick={() => removeFile("model_3d", index)}
          className="text-red-600 hover:text-red-800"
        >
          <FaTimes />
        </button>
      </li>
    ))}
  </ul>
)}

            <input
              type="file"
              multiple
              accept=".stl,.obj"
              onChange={(e) => handleFileChange("model_3d", e)}
              className="w-full p-3 border border-gray-300 rounded-lg text-gray-600 file:bg-zinc-50 file:text-zinc-700 file:border-0 file:px-4 file:py-2 file:rounded-lg file:font-medium hover:file:bg-zinc-100 transition duration-150"
            />
          </section>

          {/* Actions */}
          {error && (
            <p className="text-red-600 text-base font-medium bg-red-50 p-3 rounded-lg flex items-center gap-2">
              <FaTimes /> {error}
            </p>
          )}
          {editError && (
            <p className="text-red-600 text-base font-medium bg-red-50 p-3 rounded-lg flex items-center gap-2">
              <FaTimes /> {editError}
            </p>
          )}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-200 shadow-md"
            >
              {isEditMode ? "Reset" : "Cancel"}
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-zinc-600 text-white rounded-lg hover:bg-zinc-700 transition duration-200 shadow-md disabled:opacity-50"
              disabled={loadingEdit}
            >
              {loadingEdit
                ? isEditMode
                  ? "Updating..."
                  : "Adding..."
                : isEditMode
                ? "Update Product"
                : "Add Product"}
            </button>
          </div>
        </form>

        {/* Confirmation Modal */}
        {showConfirmation && product && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {isEditMode ? "Updated Product Details" : "Confirm Product Details"}
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong className="font-medium text-gray-900">Name:</strong> {product.name}
                </p>
                <p>
                  <strong className="font-medium text-gray-900">Description:</strong>{" "}
                  {product.description || "N/A"}
                </p>
                <p>
                  <strong className="font-medium text-gray-900">Price:</strong> ₹
                  {Number(product.price).toFixed(2)}
                </p>
                <p>
                  <strong className="font-medium text-gray-900">Quantity:</strong> {product.quantity}
                </p>
                <p>
                  <strong className="font-medium text-gray-900">In Stock:</strong>{" "}
                  {product.inStock ? "Yes" : "No"}
                </p>
                <p>
                  <strong className="font-medium text-gray-900">Categories:</strong>{" "}
                  {product.category?.join(", ")}
                </p>
                <div>
                  <strong className="font-medium text-gray-900">Images:</strong>
                  <ul className="list-disc pl-5 space-y-1">
  {Array.isArray(product.image) &&
    product.image.map((item, i) => (
      <li key={i}>
        {typeof item === "string" ? (
          <a
            href={item}
            target="_blank"
            className="text-zinc-600 hover:underline truncate block"
          >
            {item}
          </a>
        ) : item instanceof File ? (
          <span className="text-zinc-600 truncate block">
            {item.name}
          </span>
        ) : null}
      </li>
    ))}
</ul>

                </div>
                <p>
                  <strong className="font-medium text-gray-900">Diameters:</strong>{" "}
                  {uploadedData.diameter?.join(", ")} mm
                </p>
                <div>
                  <strong className="font-medium text-gray-900">Materials:</strong>
                  <ul className="list-disc pl-5 space-y-1">
                    {Array.isArray(uploadedData.materials) && uploadedData.materials.map((m, i) => (
                      <li key={i}>
                        {m.name} - ₹{m.price?.toFixed(2)}, In Stock: {m.inStock ? "Yes" : "No"}, Colors:{" "}
                        {m.color?.join(", ")}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <strong className="font-medium text-gray-900">Model Types:</strong>
                  <ul className="list-disc pl-5 space-y-1">
                    {Array.isArray(uploadedData.model_type) && uploadedData.model_type.map((m, i) => (
                      <li key={i}>
                        {m.name} - ₹{m.price?.toFixed(2)}, In Stock: {m.inStock ? "Yes" : "No"}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <strong className="font-medium text-gray-900">3D Models:</strong>
                  <ul className="list-disc pl-5 space-y-1">
                    {Array.isArray(uploadedData.model_3d) && uploadedData.model_3d.map((url, i) => (
                      <li key={i}>
                        <a
                          href={url}
                          target="_blank"
                          className="text-zinc-600 hover:underline truncate block"
                        >
                          {url}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-4">
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-200 shadow-md"
                >
                  Edit
                </button>
                <button
                  onClick={confirmSubmission}
                  className="px-4 py-2 bg-zinc-600 text-white rounded-lg hover:bg-zinc-700 transition duration-200 shadow-md disabled:opacity-50"
                  disabled={loading}
                >
                 {loadingEdit
                ? isEditMode
                  ? "Updating..."
                  : "Adding..."
                : isEditMode
                ? "Update Product"
                : "Add Product"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProductPage;