// FHome.js
"use client";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import STLViewer from "@/components/HomeModel";

const HomePage = () => {
  return (
    <>
      <div className="w-full min-h-screen flex flex-col items-center font-poppins relative bg-gray-900 pb-20 pt-20">
        {/* Cosmic Galaxy Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-800 to-black z-0"></div>

        <div className="w-full max-w-9xl lg:max-w-9xl flex flex-col lg:flex-row justify-between items-center relative z-10 px-4 sm:px-6 lg:px-10 pt-20 gap-8">
          {/* Left Section: Text and Social Icons */}
          <div className="w-full lg:w-3/5 p-5 space-y-6">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wider font-kanit text-gray-100">
              Bringing Your 3D Printing and Electronics Ideas to Life!
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 text-justify">
              At Innovoltics, we specialize in high-quality FDM 3D printing and custom electronic solutions to help you turn your concepts into reality. Whether you're looking for custom 3D-printed parts, electronics prototypes, or ready-to-use kits, we’ve got you covered.
            </p>
            <p className="text-xs sm:text-sm text-gray-300 text-justify">
              We use high-quality materials for our 3D prints, including PLA, PETG, ABS, and TPU, ensuring durability, flexibility, and precision for various applications.
            </p>
            <div>
              <Link
                href="/services"
                className="text-xs sm:text-sm px-4 py-2 bg-purple-800 text-white font-semibold rounded-md hover:bg-purple-700 transition-colors duration-200 flex items-center w-max"
              >
                View Services
                <ArrowRightIcon width={20} height={15} className="ml-2" />
              </Link>
            </div>

            {/* Social Icons */}
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                className="p-2 bg-red-600 rounded-xl hover:bg-red-700 transition-colors"
              >
                <FaInstagram className="text-white" fontSize={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                className="p-2 bg-blue-700 rounded-xl hover:bg-blue-800 transition-colors"
              >
                <FaLinkedinIn className="text-white" fontSize={20} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                className="p-2 bluff2 bg-red-500 rounded-xl hover:bg-red-600 transition-colors"
              >
                <FaYoutube className="text-white" fontSize={20} />
              </a>
            </div>
          </div>

          {/* Right Section: STL Viewer */}
          <div className="w-full lg:w-2/5 h-[40vh] sm:h-[50vh] lg:h-[60vh] max-h-[500px] bg-gray-800 rounded-3xl overflow-hidden flex flex-col">
            <STLViewer url="Models/df.stl" />
            <div className="py-2 px-5 w-full flex justify-end">
              <Link
                href="/customize"
                className="text-xs sm:text-sm p-2 text-purple-300 flex items-center w-max hover:text-purple-400 transition-colors duration-200"
              >
                Get your custom model
                <ArrowRightIcon width={20} height={15} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <section className="w-full py-24 bg-white font-poppins text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-wide mb-4">
            Ready to Create?
          </h2>
          <p className="text-sm sm:text-base text-gray-700 max-w-md mx-auto mb-8">
            Upload your 3D model or contact us for custom electronics today.
          </p>
          <Link href="/customize">
            <button className="px-8 py-3 bg-purple-700 text-white font-normal rounded-lg hover:bg-purple-800 transition-all duration-300 hover:shadow-lg">
              Upload Your Model
            </button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default HomePage;