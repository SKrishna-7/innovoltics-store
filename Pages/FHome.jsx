// // FHome.js
// "use client";
// import Link from "next/link";
// import { ArrowRightIcon } from "@heroicons/react/20/solid";
// import { FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
// import STLViewer from "@/components/HomeModel";

// const HomePage = () => {
//   return (
//     <>
//       <div className="w-full h-full min-h-screen flex flex-col  lg:items-center lg:justify-center font-poppins relative bg-white pb-20 lg:pt-0 pt-10">
//         {/* Cosmic Galaxy Background Gradient */}
//         <div className="absolute lg:block hidden inset-0 bg-gradient-to-br from-blue-900 via-purple-800 to-black z-0 opacity-100"></div>
//         <div className="absolute lg:hidden block inset-0 bg-gradient-to-br from-blue-900 via-purple-800 to-black z-0 opacity-100  "></div>

//         <div className="w-fit lg:max-w-[90%] flex flex-col lg:flex-row justify-between  relative z-10 px-4 sm:px-2 lg:px-10 pt-20 lg:gap-8">


//                     {/* Left Section: Text and Social Icons */}
//           <div className="w-full lg:w-3/5 p-5 space-y-6">
//             <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold tracking-wider font-kanit text-gray-100">
//               Bringing Your 3D Printing and Electronics Ideas to Life!
//             </h1>
//             <p className="text-xs sm:text-sm text-gray-300 text-justify">
//               At Innovoltics, we specialize in high-quality FDM 3D printing and custom electronic solutions to help you turn your concepts into reality. Whether you're looking for custom 3D-printed parts, electronics prototypes, or ready-to-use kits, we’ve got you covered.
//             </p>
//             <p className="text-xs sm:text-sm text-gray-300 text-justify">
//               We use high-quality materials for our 3D prints, including PLA, PETG, ABS, and TPU, ensuring durability, flexibility, and precision for various applications.
//             </p>
//             <div>
//               <Link
//                 href="/products"
//                 className="text-xs sm:text-sm px-4 py-2 w-fit bg-purple-800 text-white font-semibold rounded-md hover:bg-purple-700 transition-colors duration-200 flex items-center"
//               >
//                 View Services
//                 <ArrowRightIcon width={20} height={15} className="ml-2" />
//               </Link>
//             </div>

//             {/* Social Icons */}
//             <div className="flex space-x-4">
//               <a
//                 href="https://instagram.com"
//                 target="_blank"
//                 className="p-2 bg-red-600 rounded-xl hover:bg-red-700 transition-colors"
//               >
//                 <FaInstagram className="text-white" fontSize={20} />
//               </a>
//               <a
//                 href="https://linkedin.com"
//                 target="_blank"
//                 className="p-2 bg-blue-700 rounded-xl hover:bg-blue-800 transition-colors"
//               >
//                 <FaLinkedinIn className="text-white" fontSize={20} />
//               </a>
//               <a
//                 href="https://youtube.com"
//                 target="_blank"
//                 className="p-2 bluff2 bg-red-500 rounded-xl hover:bg-red-600 transition-colors"
//               >
//                 <FaYoutube className="text-white" fontSize={20} />
//               </a>
//             </div>
//           </div>

//           {/* Right Section: STL Viewer */}
//           <div className="w-full lg:w-2/5 h-[400px] sm:h-[50vh] lg:h-[60vh] max-h-[500px] bg-gray-800 rounded-3xl overflow-hidden flex flex-col">
//             <STLViewer url="Models/df.stl" />
//             <div className="py-2 px-5 w-full flex justify-end">
//               <Link
//                 href="/customize"
//                 className="text-xs sm:text-sm p-2 text-white flex items-center w-max hover:text-purple-400 transition-colors duration-200"
//               >
//                 Get your custom model
//                 <ArrowRightIcon width={20} height={15} className="ml-2" />
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       <section className="w-full py-24  font-poppins text-center lg:mb-20 lg:mt-20 mt-20 mb-20 relative">

//         <div className="max-w-3xl mx-auto px-6 relative z-10">
//           <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-wide mb-4">
//             Ready to Create?
//           </h2>
//           <p className="text-sm sm:text-base text-gray-700 max-w-md mx-auto mb-8">
//             Upload your 3D model or contact us for custom electronics today.
//           </p>
//           <Link href="/customize">
//             <button className="px-8 py-3 bg-purple-700 text-white font-normal text-sm lg:text-base  rounded-md hover:bg-purple-800 transition-all duration-300 hover:shadow-lg">
//               Upload Your Model
//             </button>
//           </Link>
//         </div>
//       </section>
//     </>
//   );
// };

// export default HomePage;












"use client";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import STLViewer from "@/components/HomeModel";

const HomePage = () => {
  return (
    <>
      <div className="w-full min-h-screen flex flex-col font-poppins relative bg-white pb-10 ">
        {/* Cosmic Galaxy Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-800 to-black z-0 opacity-100"></div>

        <div className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-10 pt-28 sm:pt-20 md:pt-24 max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-8">
            {/* Left Section: Text and Social Icons */}
            <div className="w-full lg:w-3/5 space-y-6 text-left lg:text-left">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-bold tracking-wider font-kanit text-gray-100 mt-10">
                Bringing Your 3D Printing and Electronics Ideas to Life!
              </h1>
              <p className="text-xs sm:text-sm md:text-md text-gray-300">
                At Innovoltics, we specialize in high-quality FDM 3D printing and custom electronic solutions to help you turn your concepts into reality. Whether you’re looking for custom 3D-printed parts, electronics prototypes, or ready-to-use kits, we’ve got you covered.
              </p>
              <p className="text-xs sm:text-sm md:text-md text-gray-300">
                We use high-quality materials for our 3D prints, including PLA, PETG, ABS, and TPU, ensuring durability, flexibility, and precision for various applications.
              </p>
              <div>
                <Link
                  href="/products"
                  className="inline-flex items-center px-4 py-2 text-xs sm:text-sm md:text-md bg-purple-800 text-white font-semibold rounded-md hover:bg-purple-700 transition-colors duration-200"
                >
                  View Services
                  <ArrowRightIcon className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
              </div>

              {/* Social Icons */}
              <div className="flex justify-center lg:justify-start space-x-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  className="p-2 bg-red-600 rounded-xl hover:bg-red-700 transition-colors"
                >
                  <FaInstagram className="text-white w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  className="p-2 bg-blue-700 rounded-xl hover:bg-blue-800 transition-colors"
                >
                  <FaLinkedinIn className="text-white w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  className="p-2 bg-red-500 rounded-xl hover:bg-red-600 transition-colors"
                >
                  <FaYoutube className="text-white w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              </div>
            </div>

            {/* Right Section: STL Viewer */}
            <div className="w-full lg:w-2/5 h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] bg-transparent rounded-3xl overflow-hidden flex flex-col">
              <STLViewer url="Models/df.stl" />
              <div className="py-2 px-4 sm:px-5 w-full flex justify-end">
                <Link
                  href="/customize"
                  className="text-xs sm:text-sm md:text-md text-white flex items-center hover:text-purple-400 transition-colors duration-200"
                >
                  Get your custom model
                  <ArrowRightIcon className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="w-full py-12 sm:py-16 md:py-20 lg:py-24 font-poppins text-center relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 tracking-wide mb-4">
            Ready to Create?
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-700 max-w-md mx-auto mb-6 sm:mb-8">
            Upload your 3D model or contact us for custom electronics today.
          </p>
          <Link href="/customize">
            <button className="px-6 sm:px-8 py-2 sm:py-3 bg-purple-700 text-white font-normal text-sm sm:text-base rounded-md hover:bg-purple-800 transition-all duration-300 hover:shadow-lg">
              Upload Your Model
            </button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default HomePage;