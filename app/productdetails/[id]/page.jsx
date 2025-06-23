
"use client";
import {useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { Spinner } from '@/components/Spinner';
import {useProductById , useProducts} from '@/hooks/productHooks'
import { useCart, useAddToCart, useRemoveFromCart, useUpdateCart } from "@/hooks/Carthooks";
import { useUser } from '@/store/UserContext';
export default function ProductDetails() {
  const {user,token} = useUser()
  const { id } = useParams();
  const { data: productById, isLoading, error } = useProductById(id, !!id);
  const { data: products = [] } = useProducts();

  const { mutateAsync: addToCart} = useAddToCart(token);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedDiameter, setSelectedDiameter] = useState(null);
  const [customDiameter, setCustomDiameter] = useState(productById?.diameter?.[0] || "");
  const [modelPath, setModelPath] = useState("");
  const [cartMessage, setCartMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [displayPrice, setDisplayPrice] = useState(0);
  const [viewerMode, setViewerMode] = useState(productById?.image?.[0]);

  const [loading,setLoading]= useState(false)
// console.log(productById)
  useEffect(() => {
    if (productById) {
      setSelectedMaterial(productById.materials?.[0] || null);
      setSelectedModel(productById.model_type?.[0] || null);
      setSelectedDiameter(productById.diameter?.[0] || null);
      setCustomDiameter(productById.diameter?.[0] || null);
      setDisplayPrice(productById.price || 0);
    }
  }, [productById]);

  useEffect(() => {
    if (!productById || !products.length) return;

  const related = products.filter((product) =>
    products.category?.[0] &&
    productById.category?.[0] &&
    products.category[0] === productById.category[0] &&
    products._id !== productById._id
  );

  setRelatedProducts(related);
    if (selectedMaterial && selectedModel) {
      setDisplayPrice(selectedMaterial.price + selectedModel.price);
    } else if (selectedMaterial) {
      setDisplayPrice(selectedMaterial.price);
    } else if (selectedModel) {
      setDisplayPrice(selectedModel.price);
    } else {
      setDisplayPrice(productById?.price || 0);
    }
    if (selectedMaterial && !selectedColor) {
      setSelectedColor(selectedMaterial.color[0]);
    }
  }, [selectedMaterial, selectedModel, productById, products]);

  const handleAddToCart =async (e) => {
    e.preventDefault();

    if (!user) {
      setCartMessage("Please Login to Add Items on Cart");
      setIsModalOpen(true);
      setTimeout(() => setIsModalOpen(false), 3000);
      return;
    }
    if (!selectedModel || !selectedMaterial) {
      setCartMessage("Please select all required options.");
      setIsModalOpen(true);
      setTimeout(() => setIsModalOpen(false), 3000);
      return;
    }

    const cartItem = {
      product_id: productById?._id,
      name: productById?.name,
      material: selectedMaterial.name || null,
      color: selectedColor || null,
      category: selectedModel.name || null,
      price: productById?.price,
      diameter: customDiameter || selectedDiameter || 0,
      quantity: 1,
    };
    // console.log(cartItem)
    try{
      setLoading(true)
      await addToCart(cartItem);
      setLoading(false)
      setCartMessage(`Added ${productById?.name} to cart!`);
      setIsModalOpen(true);
      setTimeout(() => setIsModalOpen(false), 3000);
    } 
    catch(err){
      setIsModalOpen(true);
      setCartMessage(err.response);
    }

  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCartMessage("");
  };

  if (isLoading) return <Spinner />;
  if (error) return <p className='mt-10'>Error loading product</p>;

console.log(selectedMaterial?.color)
  return (
    <div className="w-full min-h-screen bg-white font-poppins mt-20">
      <div className="pt-6">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb">
          <ol className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <li className="flex items-center">
              <Link href="/" className="mr-2 text-sm font-medium text-gray-900 hover:text-blue-600">
                Home
              </Link>
              <svg
                fill="currentColor"
                width={16}
                height={20}
                viewBox="0 0 16 20"
                className="h-5 w-4 text-gray-300"
              >
                <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
              </svg>
            </li>
            <li className="flex items-center">
              <Link href="/products" className="mr-2 text-sm font-medium text-gray-900 hover:text-blue-600">
                Products
              </Link>
              <svg
                fill="currentColor"
                width={16}
                height={20}
                viewBox="0 0 16 20"
                className="h-5 w-4 text-gray-300"
              >
                <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
              </svg>
            </li>
            <li className="text-sm">
              <span className="font-medium text-gray-500">{productById?.name}</span>
            
            </li>
          </ol>
        </nav>

        <div className="mx-auto max-w-5xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-full lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
          {/* Viewer and Image Selection */}
          <div className="w-full flex flex-col-reverse lg:flex-row ">
  <div className="w-full lg:w-1/4 mt-4 lg:mt-0 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto">
    {productById?.image?.map((img, index) => (
      <button
        key={index}
        onClick={() => setViewerMode(img)}
        className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 ${
          viewerMode === img ? "border-purple-600" : "border-gray-300"
        }`}
      >
        <Image
          alt={`${productById?.name} - Image ${index + 1}`}
          src={img ? img : "/images/img.png"}
          width={80}
          height={80}
          className="object-cover"
        />
      </button>
    ))}
  </div>
            
  <div className="w-full lg:w-full">
    <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] bg-gray-100 rounded-xl overflow-hidden">
      <Image
        alt={productById?.name || "Product image"}
        src={viewerMode || productById?.image?.[0] || "/images/img.png"}
        fill
        className="object-cover"
      />
    </div>
  </div>
</div>          {/* Product Info */}
          <div className="mt-10 lg:mt-0">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
              {productById?.name}
            </h1>
            
              {/* <div className="flex gap-2">
            {  productById?.category.length > 0 && productById?.category.map((category) => (
                  <p key={category} className="pl-2 mt-3 text-sm sm:text-sm  text-gray-400">{category},</p>
              ))
            }
                </div> */}
              {productById?.materials?.some((m) => m?.name && m?.price > 0) ? (
            <p className="mt-4 text-2xl sm:text-3xl font-semibold text-gray-900">₹{productById?.price}</p>
              ): (
                  <p className="mt-4 text-2xl sm:text-3xl font-semibold text-gray-900">₹{productById?.price}</p>

              )}
            <form className="mt-8" onSubmit={handleAddToCart}>
              {/* Colors */}

              {selectedMaterial && selectedMaterial?.color >= 1 ? 
                <div>
                <h3 className="text-sm font-medium text-gray-900">Colors Available for  { selectedMaterial?.name }</h3>
                <div className="mt-4 flex items-center gap-x-3">
                  {selectedMaterial?.color?.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ${
                        selectedColor === color ? `ring-2 ring-offset-1` : ""
                      }`}
                    >
                      <span
                        className="h-8 w-8 rounded-full border border-black border-opacity-10"
                        style={{ backgroundColor: color }}
                      />
                    </button>
                  ))}
                </div>
              </div>

                    :(
                      <></>
                    )
}
            
             
              {/* Materials */}
              {productById?.materials?.some((m) => m?.name && m?.price > 0) && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-900">Materials</h3>
                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {productById.materials
                      .filter((m) => m?.name && m?.price > 0)
                      .map((material) => (
                        <button
                          key={material.name}
                          type="button"
                          onClick={() => {
                            if (material.inStock && material.color?.length) {
                              setSelectedMaterial(material);
                              setSelectedColor(material.color[0]);
                            }
                          }}
                          className={`relative px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 border ${material.inStock
                              ? selectedMaterial?.name === material.name
                                ? "border-purple-600 bg-purple-100 text-gray-900"
                                : "border-gray-300 bg-white text-gray-900 hover:bg-gray-100"
                              : "border-gray-300 bg-gray-50 text-gray-400 cursor-not-allowed"
                            }`}
                        >
                          {material.name} (₹{material.price})
                        </button>
                      ))}
                  </div>
                </div>
              )}


              {/* Model Type */}
              {productById?.model_type?.some((m) => m?.name && m?.price > 0) && (

              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-900">Model Type</h3>
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {productById?.model_type?.map((model) => (
                    <button
                      key={model.name}
                      type="button"
                      disabled={!model.inStock}
                      onClick={() => {
                        if (model.inStock) {
                          setSelectedModel(model);
                          setModelPath(productById?.model_3d?.[0]);
                        }
                      }}
                      className={`relative px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 border ${
                        model.inStock
                          ? selectedModel?.name === model.name
                            ? "border-purple-600 bg-purple-100 text-gray-900"
                            : "border-gray-300 bg-white text-gray-900 hover:bg-gray-100"
                          : "border-gray-300 bg-gray-50 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {model.name} (₹{model.price})
                      {!model.inStock && (
                        <span className="absolute inset-0 rounded-md border-2 border-gray-200">
                          <svg
                            stroke="currentColor"
                            viewBox="0 0 100 100"
                            className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                          >
                            <line x1={0} x2={100} y1={100} y2={0} />
                          </svg>
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
              )}
              {/* Diameter Selection */}
              <div className="mt-6">

                {productById?.diameter && productById.diameter.length > 0 ? (
                <div className="">

                <h3 className="text-sm font-medium text-gray-900">Diameter (mm)</h3>
                     <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                     {productById?.diameter?.map((dia) => (
                       <button
                       key={dia}
                       type="button"
                       onClick={() => {
                         setSelectedDiameter(dia);
                         setCustomDiameter("");
                        }}
                        className={`relative px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 border ${
                          selectedDiameter === dia
                          ? "border-purple-600 bg-purple-100 text-gray-900"
                          : "border-gray-300 bg-white text-gray-900 hover:bg-gray-100"
                        }`}
                        >
                         {dia} mm
                       </button>
                     ))}
                     </div>
                   </div>
                ) : 
                (
                  <></>
                ) }
               
                <div className="mt-4">
                  <label className="text-sm font-medium text-gray-900">Custom Diameter (mm)</label>
                  <input
  type="number"
  value={customDiameter ?? ""}
  onChange={(e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value > 0) {
      setCustomDiameter(value);
      setSelectedDiameter(null);
    } else {
      setCustomDiameter("");
    }
  }}
  className="mt-2 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
  placeholder="Enter custom diameter"
  min="0"
  step="0.1"
/>

                </div>
              </div>

              <button
                type="submit"
                className="mt-8 flex w-full items-center justify-center rounded-md bg-purple-600 px-8 py-3 text-base font-medium text-white hover:bg-purple-700 transition-colors duration-300"
              >
                {loading ? "Adding..." : "Add to Cart"}
              </button>
            </form>
          </div>
        </div>

        {/* Description and Details */}
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Description</h2>
            <p className="text-base text-gray-700">{productById?.description}</p>
          </div>

          <div className="mt-10">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">Details</h3>
            <p className="mt-4 text-base text-gray-700">
              Available Diameters: {productById?.diameter?.join(", ") || "N/A"} mm
            </p>
          </div>
        </div>

        {/* Related Products */}

        {Array.isArray(relatedProducts) && relatedProducts.length > 0 ? (
          <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Related Products</h2>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {relatedProducts.map((relatedProduct) => (
              <Link
                key={relatedProduct._id}  
                href={`/productdetails/${relatedProduct._id}`}
                className="group bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-200"
              >
                <div className="relative w-full aspect-square">
                  <Image
                    alt={relatedProduct.name}
                    src={relatedProduct?.image && relatedProduct.image !== '' ? relatedProduct.image[0] : "/images/img.png"}
                    fill
                    className="object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
                    {relatedProduct.name}
                  </h3>
                  <p className="mt-1 text-lg font-semibold text-gray-900">₹{relatedProduct.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        )
      :
      <></>}
        
      </div>

      {/* Popup Modal */}
      {isModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-60 z-50 transition-opacity duration-300 lg:px-0 px-4">
    <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl transition-all duration-300">
      <div className="flex items-center gap-3">
        {cartMessage?.toLowerCase().includes("added") || cartMessage?.toLowerCase().includes("success") ? (
          <FaCheckCircle className="text-green-500 text-2xl" />
        ) : (
          <FaExclamationCircle className="text-red-500 text-2xl" />
        )}
        <h3 className="text-lg font-semibold text-gray-900">
          {cartMessage?.toLowerCase().includes("added") || cartMessage?.toLowerCase().includes("success")
            ? "Success!"
            : "Oops, Something Went Wrong"}
        </h3>
      </div>

      <p className="mt-3 text-sm text-gray-600 leading-relaxed">
        {cartMessage || "An unexpected error occurred."}
      </p>

      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={closeModal}
          className="px-5 py-2 rounded-md bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          Close
        </button>

        {(cartMessage?.toLowerCase().includes("added") || cartMessage?.toLowerCase().includes("success")) && (
          <Link href="/checkout">
            <button className="px-5 py-2 rounded-md bg-gray-100 text-gray-900 font-medium hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2">
              View Cart
            </button>
          </Link>
        )}
      </div>
    </div>
  </div>
)}

    </div>
  );
}
