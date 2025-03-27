// "use client";
// import { useState, useEffect,useCallback } from "react";
// import { useRouter, useParams } from "next/navigation";
// import Image from "next/image";
// import Link from "next/link";
// import STLViewer from "@/components/HomeModel";
// import { useCart } from "@/components/CartContext";

// const dummyProducts = [
//   {
//     id: 1,
//     name: "3D Printed Dragon Figurine",
//     price: "₹29.99",
//     description:
//       "A fierce, detailed dragon crafted with precision 3D printing technology. Perfect for collectors or as a unique gift.",
//     images: [
//       { src: "/images/DF.png", alt: "3D Printed Dragon Main View" },
//       { src: "/images/DF.png", alt: "3D Printed Dragon Side View" },
//       { src: "/images/DF.png", alt: "3D Printed Dragon Angle View" },
//       { src: "/images/DF.png", alt: "3D Printed Dragon Featured View" },
//     ],
//     colors: [
//       { name: "White", class: "bg-white", selectedClass: "ring-gray-200" },
//       { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
//       { name: "Black", class: "bg-black", selectedClass: "ring-black" },
//       { name: "Red", class: "bg-red-500", selectedClass: "ring-red-700" },
//       { name: "Violet", class: "bg-purple-900", selectedClass: "ring-purple-900" },
//       { name: "Green", class: "bg-green-900", selectedClass: "ring-green-900" },
//     ],
//     materials: [
//       { name: "PLA", inStock: true },
//       { name: "PETG", inStock: true },
//       { name: "ABS", inStock: false },
//       { name: "TPU", inStock: true },
//     ],
//     model: [
//       { name: "Frame", mod: "/models/drone_frame.stl", inStock: true },
//       { name: "Body", mod: "/models/3.stl", inStock: true },
//       { name: "Frame1", mod: "/models/drone_frame.stl", inStock: false },
//     ],
//     highlights: ["Custom-made", "Durable PLA material", "Fast shipping"],
//     details:
//       "This dragon figurine is crafted using high-quality 3D printing technology, ensuring every detail is captured perfectly. Ideal for display or gifting.",
//   },
//   {
//     id: 2,
//     name: "3D Printed Keychain",
//     price: "₹9.99",
//     description:
//       "A sturdy, personalized keychain printed to order. Add a touch of style to your keys!",
//     images: [
//       { src: "/images/DF.png", alt: "3D Printed Keychain Main View" },
//       { src: "/images/DF.png", alt: "3D Printed Keychain Side View" },
//       { src: "/images/DF.png", alt: "3D Printed Keychain Angle View" },
//       { src: "/images/DF.png", alt: "3D Printed Keychain Featured View" },
//     ],
//     colors: [
//       { name: "Red", class: "bg-red-500", selectedClass: "ring-red-500" },
//       { name: "Blue", class: "bg-blue-500", selectedClass: "ring-blue-500" },
//       { name: "Green", class: "bg-green-500", selectedClass: "ring-green-500" },
//     ],
//     materials: [
//       { name: "PLA", inStock: true },
//       { name: "PETG", inStock: true },
//       { name: "ABS", inStock: false },
//       { name: "TPU", inStock: true },
//     ],
//     model: [
//       { name: "Frame", mod: "/models/drone_frame.stl", inStock: true },
//       { name: "Body", mod: "/models/3.stl", inStock: true },
//       { name: "Frame1", mod: "/models/drone_frame.stl", inStock: false },
//     ],
//     highlights: ["Lightweight", "Customizable design", "Quick production"],
//     details:
//       "This keychain is lightweight and durable, perfect for everyday use. Customize it to your liking!",
//   },
// ];

// const relatedProducts = [
//   {
//     id: "3",
//     name: "3D Printed Pulley",
//     price: "₹30",
//     image: "/images/DF.png",
//   },
//   {
//     id: "4",
//     name: "Robotic Arm Gear Set",
//     price: "₹55",
//     image: "/images/DF.png",
//   },
//   {
//     id: "5",
//     name: "Custom 3D Printed Sprocket",
//     price: "₹40",
//     image: "/images/DF.png",
//   },
// ];

// const ProductPage = () => {
//   const router = useRouter();
//   const { id } = useParams();
//   const { addToCart } = useCart();

//   const [product, setProduct] = useState(null);
//   const [selectedColor, setSelectedColor] = useState(null);
//   const [selectedMaterial, setSelectedMaterial] = useState(null);
//   const [selectedModel, setSelectedModel] = useState(null);
//   const [modelPath, setModelPath] = useState("");
//   const [cartMessage, setCartMessage] = useState("");
  
//   useEffect(() => {
//     if (!id) return; // Ensure ID is available
  
//     const foundProduct = dummyProducts.find((p) => p.id === parseInt(id));
//     if (!foundProduct) {
//       router.push("/products");
//       return;
//     }
  
//     setProduct(foundProduct);
//     setSelectedColor(foundProduct.colors?.[0] || null);
//     setSelectedMaterial(foundProduct.materials?.[0] || null);
//     setSelectedModel(foundProduct.model?.[0] || null);
//   }, [id, router]);
  
//   useEffect(() => {
//     setModelPath(selectedModel?.mod || "");
//   }, [selectedModel]);
  
//   const handleAddToCart = (e) => {
//     e.preventDefault();
//     if (!selectedModel) {
//       setCartMessage("Please select a model.");
//       return;
//     }
//     if (!selectedMaterial) {
//       setCartMessage("Please select a material.");
//       return;
//     }
//     const cartItem = {
//       id: product.id,
//       name: product.name,
//       material: selectedMaterial.name,
//       color: selectedColor.name,
//       category: selectedModel.name,
//       price: product.price,
//     };
//     addToCart(cartItem);
//     setCartMessage(
//       `Added ${product.name} (${selectedMaterial.name}, ${selectedColor.name}, ${selectedModel.name}) to cart!`
//     );
//     setTimeout(() => setCartMessage(""), 3000);
//   };

//   if (!product) return <p className="text-center text-gray-500">Loading product details...</p>;
// console.log(selectedModel)
//   return (
//     <div className="w-full min-h-screen bg-white font-poppins">
//       <div className="pt-6">
//         {/* Breadcrumb */}
//         <nav aria-label="Breadcrumb">
//           <ol className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
//             <li className="flex items-center">
//               <Link href="/" className="mr-2 text-sm font-medium text-gray-900 hover:text-blue-600">
//                 Home
//               </Link>
//               <svg
//                 fill="currentColor"
//                 width={16}
//                 height={20}
//                 viewBox="0 0 16 20"
//                 className="h-5 w-4 text-gray-300"
//               >
//                 <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
//               </svg>
//             </li>
//             <li className="flex items-center">
//               <Link href="/products" className="mr-2 text-sm font-medium text-gray-900 hover:text-blue-600">
//                 Products
//               </Link>
//               <svg
//                 fill="currentColor"
//                 width={16}
//                 height={20}
//                 viewBox="0 0 16 20"
//                 className="h-5 w-4 text-gray-300"
//               >
//                 <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
//               </svg>
//             </li>
//             <li className="text-sm">
//               <span className="font-medium text-gray-500">{product.name}</span>
//             </li>
//           </ol>
//         </nav>

//         {/* Product Main Section */}
//         <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
//           {/* STL Viewer */}
//           <div className="w-full h-[400px] sm:h-[500px] lg:h-[600px] bg-gray-100 rounded-xl overflow-hidden">
//             <STLViewer colors={selectedColor.name} model={modelPath} />
//           </div>

//           {/* Product Info */}
//           <div className="mt-10 lg:mt-10">
//             <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
//               {product.name}
//             </h1>
//             <p className="mt-4 text-2xl sm:text-3xl font-semibold text-gray-900">{product.price}</p>

//             <form className="mt-8" onSubmit={handleAddToCart}>
//               {/* Colors */}
//               <div>
//                 <h3 className="text-sm font-medium text-gray-900">Color</h3>
//                 <div className="mt-4 flex items-center gap-x-3">
//                   {product.colors.map((color) => (
//                   <button
//                   key={color.name}
//                   type="button"
//                   onClick={() => setSelectedColor(color)}
//                   className={`relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ${
//                     selectedColor?.name === color.name ? `ring-2 ${color.selectedClass} ring-offset-1` : ""
//                   }`}
//                 >
//                   <span className={`${color.class} h-8 w-8 rounded-full border border-black border-opacity-10`} />
//                 </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Materials */}
//               <div className="mt-6">
//                 <h3 className="text-sm font-medium text-gray-900">Materials</h3>
//                 <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
//                 {product.materials.map((material) => (
//             <button
//               key={material.name}
//               type="button"
//               onClick={() => material.inStock && setSelectedMaterial(material.name)}
//               className={`relative px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 border ${
//                 material.inStock
//                   ? selectedMaterial === material.name
//                     ? "border-purple-600 bg-purple-100 text-gray-900"
//                     : "border-gray-300 bg-white text-gray-900 hover:bg-gray-100"
//                   : "border-gray-300 bg-gray-50 text-gray-400 cursor-not-allowed"
//               }`}
//             >
//               {material.name}
//             </button>
//           ))}
//                 </div>
//               </div>


//               <div className="mt-6">
//                 <h3 className="text-sm font-medium text-gray-900">Category</h3>
//                 <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
//                   {product.model.map((m) => (
//                     <button
//                       key={m.name}
//                       type="button"
//                       disabled={!m.inStock}
//                       onClick={() => {
//                         if (m.inStock) {
//                           setSelectedModel(m.name);
//                           setModelPath(m.mod);
//                         }
//                       }}
//                       className={`relative px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 border ${
//                         m.inStock
//                           ? selectedModel === m.name
//                             ? "border-purple-600 bg-purple-100 text-gray-900"
//                             : "border-gray-300 bg-white text-gray-900 hover:bg-gray-100"
//                           : "border-gray-300 bg-gray-50 text-gray-400 cursor-not-allowed"
//                       }`}
//                     >
//                       {m.name}
//                       {!m.inStock && (
//                         <span className="absolute inset-0 rounded-md border-2 border-gray-200">
//                           <svg
//                             stroke="currentColor"
//                             viewBox="0 0 100 100"
//                             className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
//                           >
//                             <line x1={0} x2={100} y1={100} y2={0} />
//                           </svg>
//                         </span>
//                       )}
//                     </button>
//                   ))}
//                 </div>
//               </div>

           

//               <button
//                 type="submit"
//                 className="mt-8 flex w-full items-center justify-center rounded-md bg-purple-600 px-8 py-3 text-base font-medium text-white hover:bg-purple-700 transition-colors duration-300 "
//               >
//                 Add to Cart
//               </button>
//             </form>

//             {/* Cart Message */}
//             {cartMessage && (
//               <p className="mt-4 text-center text-sm text-gray-600">{cartMessage}</p>
//             )}
//           </div>
//         </div>

//         {/* Description and Details */}
//         <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:max-w-7xl lg:px-8">
//           <div className="space-y-6">
//             <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Description</h2>
//             <p className="text-base text-gray-700">{product.description}</p>
//           </div>

//           <div className="mt-10">
//             <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">Highlights</h3>
//             <ul className="mt-4 list-disc space-y-2 pl-4 text-sm">
//               {product.highlights.map((highlight) => (
//                 <li key={highlight} className="text-gray-600">
//                   {highlight}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="mt-10">
//             <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">Details</h3>
//             <p className="mt-4 text-base text-gray-700">{product.details}</p>
//           </div>
//         </div>

//         {/* Related Products */}
//         <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:max-w-7xl lg:px-8">
//           <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Related Products</h2>
//           <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//             {relatedProducts.map((relatedProduct) => (
//               <Link
//                 key={relatedProduct.id}
//                 href={`/productdetails/${relatedProduct.id}`}
//                 className="group bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-200"
//               >
//                 <div className="relative w-full aspect-square">
//                   <Image
//                     alt={relatedProduct.name}
//                     src={relatedProduct.image}
//                     fill
//                     className="object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-300"
//                   />
//                   <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                 </div>
//                 <div className="p-4">
//                   <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
//                     {relatedProduct.name}
//                   </h3>
//                   <p className="mt-1 text-lg font-semibold text-gray-900">
//                     {relatedProduct.price}
//                   </p>
                  
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductPage;


"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import STLViewer from "@/components/HomeModel";
import { useCart } from "@/components/CartContext";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa"; 

const dummyProducts = [
    {
      id: 1,
      name: "3D Printed Dragon Figurine",
      price: "₹29.99",
      description:
        "A fierce, detailed dragon crafted with precision 3D printing technology. Perfect for collectors or as a unique gift.",
      images: [
        { src: "/images/DF.png", alt: "3D Printed Dragon Main View" },
        { src: "/images/DF.png", alt: "3D Printed Dragon Side View" },
        { src: "/images/DF.png", alt: "3D Printed Dragon Angle View" },
        { src: "/images/DF.png", alt: "3D Printed Dragon Featured View" },
      ],
      colors: [
        { name: "White", class: "bg-white", selectedClass: "ring-gray-200" },
        { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
        { name: "Black", class: "bg-black", selectedClass: "ring-black" },
        { name: "Red", class: "bg-red-500", selectedClass: "ring-red-700" },
        { name: "Violet", class: "bg-purple-900", selectedClass: "ring-purple-900" },
        { name: "Green", class: "bg-green-900", selectedClass: "ring-green-900" },
      ],
      materials: [
        { name: "PLA", inStock: true },
        { name: "PETG", inStock: true },
        { name: "ABS", inStock: false },
        { name: "TPU", inStock: true },
      ],
      model: [
        { name: "Frame", mod: "/models/drone_frame.stl", inStock: true },
        { name: "Body", mod: "/models/3.stl", inStock: true },
        { name: "Frame1", mod: "/models/drone_frame.stl", inStock: false },
      ],
      highlights: ["Custom-made", "Durable PLA material", "Fast shipping"],
      details:
        "This dragon figurine is crafted using high-quality 3D printing technology, ensuring every detail is captured perfectly. Ideal for display or gifting.",
    },
    {
      id: 2,
      name: "3D Printed Keychain",
      price: "₹9.99",
      description:
        "A sturdy, personalized keychain printed to order. Add a touch of style to your keys!",
      images: [
        { src: "/images/DF.png", alt: "3D Printed Keychain Main View" },
        { src: "/images/DF.png", alt: "3D Printed Keychain Side View" },
        { src: "/images/DF.png", alt: "3D Printed Keychain Angle View" },
        { src: "/images/DF.png", alt: "3D Printed Keychain Featured View" },
      ],
      colors: [
        { name: "Red", class: "bg-red-500", selectedClass: "ring-red-500" },
        { name: "Blue", class: "bg-blue-500", selectedClass: "ring-blue-500" },
        { name: "Green", class: "bg-green-500", selectedClass: "ring-green-500" },
      ],
      materials: [
        { name: "PLA", inStock: true },
        { name: "PETG", inStock: true },
        { name: "ABS", inStock: false },
        { name: "TPU", inStock: true },
      ],
      model: [
        { name: "Frame", mod: "/models/drone_frame.stl", inStock: true },
        { name: "Body", mod: "/models/3.stl", inStock: true },
        { name: "Frame1", mod: "/models/drone_frame.stl", inStock: false },
      ],
      highlights: ["Lightweight", "Customizable design", "Quick production"],
      details:
        "This keychain is lightweight and durable, perfect for everyday use. Customize it to your liking!",
    },
  ];

  const relatedProducts = [
      {
        id: "3",
        name: "3D Printed Pulley",
        price: "₹30",
        image: "/images/DF.png",
      },
      {
        id: "4",
        name: "Robotic Arm Gear Set",
        price: "₹55",
        image: "/images/DF.png",
      },
      {
        id: "5",
        name: "Custom 3D Printed Sprocket",
        price: "₹40",
        image: "/images/DF.png",
      },
    ];

const ProductPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [modelPath, setModelPath] = useState("");
  const [cartMessage, setCartMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // New state for modal

  useEffect(() => {
    if (!id) return;

    const foundProduct = dummyProducts.find((p) => p.id === parseInt(id));
    if (!foundProduct) {
      router.push("/products");
      return;
    }

    setProduct(foundProduct);
    setSelectedColor(foundProduct.colors?.[0] || null);
    setSelectedMaterial(foundProduct.materials?.[0] || null);
    setSelectedModel(foundProduct.model?.[0] || null);
  }, [id, router]);

  useEffect(() => {
    setModelPath(selectedModel?.mod || "");
  }, [selectedModel]);

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!selectedModel) {
      setCartMessage("Please select a model.");
      setIsModalOpen(true); // Show modal for error
      setTimeout(() => setIsModalOpen(false), 3000);
      return;
    }
    if (!selectedMaterial) {
      setCartMessage("Please select a material.");
      setIsModalOpen(true); // Show modal for error
      setTimeout(() => setIsModalOpen(false), 3000);
      return;
    }
    const cartItem = {
      id: product.id,
      name: product.name,
      material: selectedMaterial.name,
      color: selectedColor.name,
      category: selectedModel.name,
      price: product.price,
    };
    addToCart(cartItem);
    setCartMessage(
      `Added ${product.name} (${selectedMaterial.name}, ${selectedColor.name}, ${selectedModel.name}) to cart!`
    );
    setIsModalOpen(true); // Show modal for success
    setTimeout(() => {
      setIsModalOpen(false);
      setCartMessage(""); // Clear message after modal closes
    }, 3000);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCartMessage(""); // Clear message when manually closed
  };

  if (!product)
    return <p className="text-center text-gray-500">Loading product details...</p>;

  return (
    <div className="w-full min-h-screen bg-white font-poppins">
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
              <span className="font-medium text-gray-500">{product.name}</span>
            </li>
          </ol>
        </nav>

        {/* Product Main Section */}
        <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
          {/* STL Viewer */}
          <div className="w-full h-[400px] sm:h-[500px] lg:h-[600px] bg-gray-100 rounded-xl overflow-hidden">
            <STLViewer colors={selectedColor.name} model={modelPath} />
          </div>

          {/* Product Info */}
          <div className="mt-10 lg:mt-10">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
              {product.name}
            </h1>
            <p className="mt-4 text-2xl sm:text-3xl font-semibold text-gray-900">{product.price}</p>

            <form className="mt-8" onSubmit={handleAddToCart}>
              {/* Colors */}
              <div>
                <h3 className="text-sm font-medium text-gray-900">Color</h3>
                <div className="mt-4 flex items-center gap-x-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ${
                        selectedColor?.name === color.name ? `ring-2 ${color.selectedClass} ring-offset-1` : ""
                      }`}
                    >
                      <span className={`${color.class} h-8 w-8 rounded-full border border-black border-opacity-10`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Materials */}
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-900">Materials</h3>
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {product.materials.map((material) => (
                    <button
                      key={material.name}
                      type="button"
                      onClick={() => material.inStock && setSelectedMaterial(material)}
                      className={`relative px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 border ${
                        material.inStock
                          ? selectedMaterial?.name === material.name
                            ? "border-purple-600 bg-purple-100 text-gray-900"
                            : "border-gray-300 bg-white text-gray-900 hover:bg-gray-100"
                          : "border-gray-300 bg-gray-50 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {material.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-900">Category</h3>
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {product.model.map((m) => (
                    <button
                      key={m.name}
                      type="button"
                      disabled={!m.inStock}
                      onClick={() => {
                        if (m.inStock) {
                          setSelectedModel(m);
                          setModelPath(m.mod);
                        }
                      }}
                      className={`relative px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 border ${
                        m.inStock
                          ? selectedModel?.name === m.name
                            ? "border-purple-600 bg-purple-100 text-gray-900"
                            : "border-gray-300 bg-white text-gray-900 hover:bg-gray-100"
                          : "border-gray-300 bg-gray-50 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {m.name}
                      {!m.inStock && (
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

              <button
                type="submit"
                className="mt-8 flex w-full items-center justify-center rounded-md bg-purple-600 px-8 py-3 text-base font-medium text-white hover:bg-purple-700 transition-colors duration-300"
              >
                Add to Cart
              </button>
            </form>
          </div>
        </div>

        {/* Description and Details */}
        <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Description</h2>
            <p className="text-base text-gray-700">{product.description}</p>
          </div>

          <div className="mt-10">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">Highlights</h3>
            <ul className="mt-4 list-disc space-y-2 pl-4 text-sm">
              {product.highlights.map((highlight) => (
                <li key={highlight} className="text-gray-600">
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">Details</h3>
            <p className="mt-4 text-base text-gray-700">{product.details}</p>
          </div>
        </div>

        {/* Related Products */}
        <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Related Products</h2>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {relatedProducts.map((relatedProduct) => (
              <Link
                key={relatedProduct.id}
                href={`/productdetails/${relatedProduct.id}`}
                className="group bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-200"
              >
                <div className="relative w-full aspect-square">
                  <Image
                    alt={relatedProduct.name}
                    src={relatedProduct.image}
                    fill
                    className="object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
                    {relatedProduct.name}
                  </h3>
                  <p className="mt-1 text-lg font-semibold text-gray-900">
                    {relatedProduct.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Popup Modal */}
      {isModalOpen && (
         <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-60 z-50 transition-opacity duration-300 lg:px-0 px-10">
         <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl transform transition-all duration-300 scale-100 hover:scale-105">
           <div className="flex items-center gap-3">
             {cartMessage.includes("Added") ? (
               <FaCheckCircle className="text-green-500 text-2xl" />
             ) : (
               <FaExclamationCircle className="text-red-500 text-2xl" />
             )}
             <h3 className="text-lg font-semibold text-gray-900">
               {cartMessage.includes("Added") ? "Item Added to Cart" : "Oops, Something Went Wrong"}
             </h3>
           </div>
           <p className="mt-3 text-sm text-gray-600 leading-relaxed">{cartMessage}</p>
           <div className="mt-6 flex justify-end gap-3">
             <button
               onClick={closeModal}
               className="px-5 py-2 rounded-md bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
             >
               Close
             </button>
             {cartMessage.includes("Added") && (
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
};

export default ProductPage;