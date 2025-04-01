'use client';

import { useState , useEffect,useContext } from 'react';
import STLViewer from '@/components/HomeModel';
import Link from 'next/link';
import { TrashIcon, CheckCircleIcon } from '@heroicons/react/20/solid';
import { CartContext } from '@/store/CartContext';
import axios from 'axios';

const UploadModelPage = () => {
  const [file, setFile] = useState(null);
  const [modelUrl, setModelUrl] = useState('');
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
  const [selectedDiameter, setSelectedDiameter] = useState(null);
  const [customDiameter, setCustomDiameter] = useState('');
  const { addToCart } = useContext(CartContext);
  const [requirements, setRequirements] = useState('');
  const [basePrice, setBasePrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const colors = [
    { name: 'White', selectedClass: 'ring-2 ring-offset-1 ring-purple-600', class: 'bg-white' },
    { name: 'Black', selectedClass: 'ring-2 ring-offset-1 ring-purple-600', class: 'bg-black' },
    { name: 'Red', selectedClass: 'ring-2 ring-offset-1 ring-purple-600', class: 'bg-red-500' },
    { name: 'Blue', selectedClass: 'ring-2 ring-offset-1 ring-purple-600', class: 'bg-blue-500' },
    
  ]

  const materials = [
    { name: 'PLA', inStock: true },
    { name: 'ABS', inStock: true },
    { name: 'PETG', inStock: true },
    { name: 'TPU', inStock: true },
    
  ]

  const diameter= [
    { name: '10', inStock: true },
    { name: '15', inStock: true },
    { name: '20', inStock: true },
    { name: '25', inStock: true },
    
  ]
  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      const url = URL.createObjectURL(uploadedFile);
      setModelUrl(url);
      setMessage('');
    } else {
      setFile(null);
      // setModelUrl('');
      setMessage('Please upload a valid .stl file');
      setError('Please upload a valid .stl file');
    }
  };

  
  const handleAddToCart = async (e) => {
    e.preventDefault();
    
    if (!file || !selectedColor  || !selectedMaterial) {
      setMessage('Please fill in all required fields');
      return;
    }
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('color', selectedColor.name);
    formData.append('price', basePrice || 29);
    formData.append('material', selectedMaterial.name);
    formData.append('diameter', selectedDiameter || customDiameter);
    formData.append('requirements', requirements);
    console.log(formData)

    console.log(file)
  
    try{
      setLoading(true)
      const response = await axios.post('http://localhost:8000/api/upload-model/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          // Add Authorization header if your API requires it
          // 'Authorization': `Bearer ${yourToken}`
        },    
      });
      console.log(response)
      const { message, cart_item } = response.data;

      // Add the item to the cart context
      addToCart(cart_item);

      // Show success message and open modal
      setMessage(message);
      setIsModalOpen(true);
      console.log(response)
      setMessage(`Added ${file.name} to cart!`);

    } catch (error) {
      console.log('Error uploading model:', error);
      setError('Error uploading model');
    } finally {
      setLoading(false);
    }


  };
  if(error){
    alert(error)
  }
  // **Auto-close modal when `isModalOpen` changes**
  useEffect(() => {
    if (!isModalOpen) return; // ✅ Prevents running when modal is already closed
  
    const timeout = setTimeout(() => {
      setIsModalOpen(false);
      setMessage('');
      
      // ✅ Reset form fields after modal closes
      setFile(null);
      // setModelUrl('');
      setSelectedColor(null);
      setSelectedMaterial(null);
  
    }, 3000); // ✅ Adjust time here
  
    return () => clearTimeout(timeout); // ✅ Cleanup function to prevent issues
  
  }, [isModalOpen]); // ✅ Runs whenever `isModalOpen` changes
  
  return (
    <div className="bg-white min-h-screen font-poppins mt-20">
      <div className="pt-6 px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb">
          <ol className="  flex items-center   space-x-2">
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload Your 3d model</label>
              <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-indigo-500 transition-colors">
                <input
                  type="file"
                  accept=".stl , .obj , .glb , .gltf"
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
                  <p className="mt-1 text-xs text-gray-500">Only .stl , .obj , .glb , .gltf , .fbx files supported</p>
                </div>
              </div>
              {file && <p className="mt-2 text-sm text-gray-600">Uploaded: <span className="font-medium">{file.name}</span></p>}
            </div>
            {modelUrl && (
              <div className="mt-6 h-[400px] w-full border rounded-lg overflow-hidden">
                <STLViewer colors={selectedColor?.name || 'White'} model={modelUrl} />
              </div>
            )}
           <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-900">What’s Your Base Price? (₹)</h3>
                <div className="mt-2 relative">
                  <input
                    type="number"
            
                    value={basePrice}
                    onChange={(e) => setBasePrice(e.target.value)}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
                    placeholder="Enter base price (e.g., 29)"
                    min="30"
                    step="5"
                  />
                  <span className="absolute inset-y-0 right-3 flex items-center text-gray-500">₹</span>
                </div>
                {basePrice && parseFloat(basePrice) < 30 && (
                  <p className="mt-1 text-xs text-red-600">Price must be greater than 30 (₹)</p>
                )}
              </div>
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900">Write your requirements</h3>
              <textarea
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                className="mt-2 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your requirements"
              />
            </div>

            
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
                      className={`group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium hover:bg-gray-50  ${
                        material.inStock ? 'cursor-pointer  text-gray-900 shadow-sm' : 'cursor-not-allowed bg-gray-50 text-gray-200'
                      } ${selectedMaterial?.name === material.name && material.inStock ?  "border-purple-600 bg-purple-100 text-gray-900"
                          : "border-gray-300 bg-white text-gray-900 hover:bg-gray-100"}`}
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
                
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-900">Diameter (mm)</h3>
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {diameter?.map((dia) => (
                    <button
                      key={dia.name}
                      type="button"
                      onClick={() => {
                        setSelectedDiameter(dia.name);
                        setCustomDiameter("");
                      }}
                      className={`relative px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 border ${
                        selectedDiameter === dia.name
                          ? "border-purple-600 bg-purple-100 text-gray-900"
                          : "border-gray-300 bg-white text-gray-900 hover:bg-gray-100"
                      }`}
                    >
                      {dia.name} mm
                    </button>
                  ))}
                </div>
                <div className="mt-4">
                  <label className="text-sm font-medium text-gray-900">Custom Diameter (mm)</label>
                  <input
                    type="number"
                    value={customDiameter}
                    onChange={(e) => {
                      setCustomDiameter(e.target.value);
                      setSelectedDiameter(null);
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
                disabled={loading}
                onClick={handleAddToCart}
                value={loading ? 'Adding...' : 'Add to Cart'}
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                    {loading ? 'Adding...' : 'Add to Cart'}
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
            <Link href="/checkout">
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