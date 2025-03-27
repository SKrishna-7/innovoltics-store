'use client';

import { useState , useEffect } from 'react';
import { useCart } from '@/components/CartContext'; // Verify this path matches your project structure
import STLViewer from '@/components/HomeModel';
import Link from 'next/link';
import { TrashIcon, CheckCircleIcon } from '@heroicons/react/20/solid';


const UploadModelPage = () => {
  const [file, setFile] = useState(null);
  const [modelUrl, setModelUrl] = useState('');
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
  const { addToCart } = useCart();

  const colors = [
    { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
    { name: 'Black', class: 'bg-black', selectedClass: 'ring-gray-900' },
    { name: 'Red', class: 'bg-red-500', selectedClass: 'ring-red-500' },
    { name: 'Blue', class: 'bg-blue-500', selectedClass: 'ring-blue-500' },
  ];

  const sizes = [
    { name: 'Small', inStock: true },
    { name: 'Medium', inStock: true },
    { name: 'Large', inStock: true },
    { name: 'Custom', inStock: false },
  ];

  const materials = [
    { name: 'PLA', inStock: true },
    { name: 'ABS', inStock: true },
    { name: 'PETG', inStock: true },
  ];

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile && uploadedFile.name.endsWith('.stl')) {
      setFile(uploadedFile);
      const url = URL.createObjectURL(uploadedFile);
      setModelUrl(url);
      setMessage('');
    } else {
      setFile(null);
      setModelUrl('');
      setMessage('Please upload a valid .stl file');
    }
  };

  // const handleAddToCart = (e) => {
  //   e.preventDefault();
  //   if (!file || !selectedColor || !selectedSize || !selectedMaterial) {
  //     setMessage('Please fill in all required fields');
  //     return;
  //   }

  //   const cartItem = {
  //     name: file.name,
  //     color: selectedColor.name,
  //     size: selectedSize.name,
  //     material: selectedMaterial.name,
  //     model:modelUrl,
  //     quantity: 1,
  //     price:29
  //   };

  //   addToCart(cartItem);
  //   setMessage(`Added ${file.name} to cart!`);
  //   setIsModalOpen(true); // Open the modal
  //   setTimeout(() => {
  //     setIsModalOpen(false); // Close modal after 3 seconds
  //     setMessage('');
  //     // Reset form
  //     setFile(null);
  //     setModelUrl('');
  //     setSelectedColor(null);
  //     setSelectedSize(null);
  //     setSelectedMaterial(null);
  //   }, 5000);
  // };
  const handleAddToCart = (e) => {
    e.preventDefault();
    
    if (!file || !selectedColor  || !selectedMaterial) {
      setMessage('Please fill in all required fields');
      return;
    }
  
    const cartItem = {
      name: file.name,
      color: selectedColor.name,
      material: selectedMaterial.name,
      model: modelUrl,
      quantity: 1,
      price: 29
    };
  
    addToCart(cartItem);
    setMessage(`Added ${file.name} to cart!`);
    setIsModalOpen(true);
  };
  
  // **Auto-close modal when `isModalOpen` changes**
  useEffect(() => {
    if (!isModalOpen) return; // ✅ Prevents running when modal is already closed
  
    const timeout = setTimeout(() => {
      setIsModalOpen(false);
      setMessage('');
      
      // ✅ Reset form fields after modal closes
      setFile(null);
      setModelUrl('');
      setSelectedColor(null);
      setSelectedMaterial(null);
  
    }, 3000); // ✅ Adjust time here
  
    return () => clearTimeout(timeout); // ✅ Cleanup function to prevent issues
  
  }, [isModalOpen]); // ✅ Runs whenever `isModalOpen` changes
  
  return (
    <div className="bg-white min-h-screen font-poppins">
      <div className="pt-6 px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb">
          <ol className="mx-auto flex max-w-2xl items-center space-x-2">
            <li className="flex items-center">
              <Link href="/" className="mr-2 text-sm font-medium text-gray-900">
                Home
              </Link>
              <svg fill="currentColor" width={16} height={20} viewBox="0 0 16 20" className="h-5 w-4 text-gray-300">
                <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
              </svg>
            </li>
            <li className="text-sm">
              <span className="font-medium text-gray-500">Upload Your Model</span>
            </li>
          </ol>
        </nav>

        <div className="mx-auto max-w-2xl pt-10 pb-16 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8">
          <div className="lg:col-span-2">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Upload Your 3D Model</h1>
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload Your .stl File</label>
              <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-indigo-500 transition-colors">
                <input
                  type="file"
                  accept=".stl"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path
                      d="M24 8v12m0 0l-6-6m6 6l6-6m-18 12h24a2 2 0 002-2V14a2 2 0 00-2-2H12a2 0 00-2 2v20a2 2 0 002 2z"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="mt-1 text-sm text-gray-600">
                    Drag and drop your .stl file here, or{' '}
                    <span className="text-indigo-600 font-medium hover:text-indigo-500">click to browse</span>
                  </p>
                  <p className="mt-1 text-xs text-gray-500">Only .stl files supported</p>
                </div>
              </div>
              {file && <p className="mt-2 text-sm text-gray-600">Uploaded: <span className="font-medium">{file.name}</span></p>}
            </div>
            {modelUrl && (
              <div className="mt-6 h-[400px] w-full border rounded-lg overflow-hidden">
                <STLViewer colors={selectedColor?.name || 'White'} model={modelUrl} />
              </div>
            )}
          </div>

          <div className="mt-4 lg:mt-0">
            <h2 className="text-lg font-medium text-gray-900">Customize Your Print</h2>
            <form className="mt-6" onSubmit={handleAddToCart}>
              <div>
                <h3 className="text-sm font-medium text-gray-900">Color</h3>
                <div className="mt-4 flex items-center gap-x-3">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ${
                        selectedColor?.name === color.name ? `${color.selectedClass} ring-2 ring-offset-1` : ''
                      }`}
                    >
                      <span className={`${color.class} h-8 w-8 rounded-full border border-black border-opacity-10`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-900">Size</h3>
                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {sizes.map((size) => (
                    <button
                      key={size.name}
                      type="button"
                      disabled={!size.inStock}
                      onClick={() => size.inStock && setSelectedSize(size)}
                      className={`group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        size.inStock ? 'cursor-pointer bg-white text-gray-900 shadow-sm' : 'cursor-not-allowed bg-gray-50 text-gray-200'
                      } ${selectedSize?.name === size.name && size.inStock ? 'border-indigo-500 ring-2' : 'border-gray-200'}`}
                    >
                      <span>{size.name}</span>
                      {!size.inStock && (
                        <span className="absolute inset-0 rounded-md border-2 border-gray-200">
                          <svg stroke="currentColor" viewBox="0 0 100 100" className="absolute inset-0 h-full w-full stroke-2 text-gray-200">
                            <line x1={0} x2={100} y1={100} y2={0} />
                          </svg>
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div> */}

              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-900">Material</h3>
                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {materials.map((material) => (
                    <button
                      key={material.name}
                      type="button"
                      disabled={!material.inStock}
                      onClick={() => material.inStock && setSelectedMaterial(material)}
                      className={`group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        material.inStock ? 'cursor-pointer bg-white text-gray-900 shadow-sm' : 'cursor-not-allowed bg-gray-50 text-gray-200'
                      } ${selectedMaterial?.name === material.name && material.inStock ? 'border-indigo-500 ring-2' : 'border-gray-200'}`}
                    >
                      <span>{material.name}</span>
                      {!material.inStock && (
                        <span className="absolute inset-0 rounded-md border-2 border-gray-200">
                          <svg stroke="currentColor" viewBox="0 0 100 100" className="absolute inset-0 h-full w-full stroke-2 text-gray-200">
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
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add to Cart
              </button>
            </form>
            {message && !isModalOpen && (
              <p className="mt-4 text-center text-sm text-gray-600">{message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Popup Modal */}
      {isModalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-lg w-full mx-4 shadow-2xl">
        <div className="text-center">
          <CheckCircleIcon className="mx-auto h-16 w-16 text-green-500" />
          <h2 className="mt-4 text-2xl font-bold text-gray-900">Item Added to Cart!</h2>
          <p className="mt-2 text-sm text-gray-600">
          <span className="font-medium">{file?.name}</span> has been successfully added to your cart!
          </p>
          <div className="mt-6 flex justify-center space-x-4">
            <Link href="/order-history">
              <button className="px-6 py-2 bg-indigo-100 text-indigo-700 font-medium rounded-md hover:bg-indigo-200 transition-colors">
                View Cart
              </button>
            </Link>
            <Link href="/customize">
              <button className="px-6 py-2 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 transition-colors">
                Add More Items
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
      )}
    </div>
  );
};

export default UploadModelPage;