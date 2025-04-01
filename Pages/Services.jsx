// Services.js
"use client";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import df from "../assets/DF.png";

export default function Services() {
  return (
    <div className="w-full min-h-screen bg-gray-900 text-gray-100 font-poppins">
      <div className="w-full max-w-max lg:max-w-7xl px-1 sm:px-4 lg:px-8 py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row justify-between text-left gap-8">
          {/* Left Section: Intro and Image */}
          <div className="w-full lg:w-2/5 p-6 lg:p-10 space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-100">
              What We Offer?
            </h1>
            <p className="text-xs sm:text-sm text-gray-300">
              We provide cutting-edge 3D printing, custom electronics prototyping, and integrated solutions for hobbyists, startups, and professionals. Whether you need a one-time print or a full-fledged electronic product, we've got you covered!
            </p>
            <Link
              href="/products"
              className="text-sm px-4 py-1 w-fit  bg-purple-800 text-white rounded-md hover:bg-purple-700 transition-colors duration-200 flex items-center "
            >
              View All Collections
              <ArrowRightIcon width={20} height={15} className="ml-2" />
            </Link>
            <div className="w-full hidden lg:block">
              <Image
                src={df}
                width={500}
                height={500}
                alt="services"
                className="w-full h-auto rounded-lg shadow-md hidden "
                priority
              />
            </div>
          </div>

          {/* Right Section: Services List */}
          <div className="w-full lg:w-3/5 px-5 space-y-8">
            {/* Service 1: Custom 3D Printing */}
            <div className="border-b-2 border-purple-500 pb-6">
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-100 mb-3">
                Custom 3D Printing
              </h2>
              <p className="text-xs pt-2 sm:text-sm text-gray-300 mb-4">
                We provide high-quality FDM 3D printing for prototypes, custom models, and functional parts. Choose from a variety of materials and colors to match your needs. Whether it's a one-off piece or batch production, we ensure precision and durability.
              </p>
              <Link
                href="/customize"
                className="text-sm text-purple-300 hover:text-purple-400 flex items-center w-max transition-colors duration-200"
              >
                Get Started
                <ArrowRightIcon width={20} height={15} className="ml-2" />
              </Link>
            </div>

            {/* Service 2: Electronics Prototyping */}
            <div className="border-b-2 border-purple-500 pb-6">
              <h2 className="text-2xl pt-2 sm:text-3xl font-semibold text-gray-100 mb-3">
                Electronics Prototyping
              </h2>
              <p className="text-xs pt-2 sm:text-sm text-gray-300 mb-4">
                From PCB design to embedded system development, we help bring your electronic ideas to life. Our services include circuit design, firmware programming, and component sourcing.
              </p>
              <Link
                href="/products"
                className="text-sm text-purple-300 hover:text-purple-400 flex items-center w-max transition-colors duration-200"
              >
                View Collections
                <ArrowRightIcon width={20} height={15} className="ml-2" />
              </Link>
            </div>

            {/* Service 3: 3D Printing + Electronics */}
            <div className="border-b-2 border-purple-500 pb-6">
              <h2 className="text-2xl pt-2 sm:text-3xl font-semibold text-gray-100 mb-3">
                3D Printing + Electronics
              </h2>
              <p className="text-xs pt-2  sm:text-sm text-gray-300 mb-4">
                Combine 3D printing with electronics for smart devices, custom enclosures, and functional prototypes. We integrate sensors, microcontrollers, and power systems into 3D-printed cases. Ideal for IoT projects, robotics, and innovative hardware solutions.
              </p>
              <Link
                href="/products"
                className="text-sm text-purple-300 hover:text-purple-400 flex items-center w-max transition-colors duration-200"
              >
                View Collections
                <ArrowRightIcon width={20} height={15} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}