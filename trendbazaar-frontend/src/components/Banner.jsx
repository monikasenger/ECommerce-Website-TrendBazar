import React from "react";
import { FaTruck, FaUndo, FaTags } from "react-icons/fa";
import bannerImg from "../assets/banner.jpeg"; // Correctly import the image

const Banner = () => {
  return (
    <section className="bg-gradient-to-r from-yellow-100 via-orange-50 to-yellow-100 py-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
        {/* Left Content */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-orange-600 leading-tight">
            Welcome to <span className="text-yellow-700">Trend</span>
            <span className="text-orange-500">Bazar</span>
          </h1>
          <p className="mt-4 text-gray-700 max-w-lg mx-auto md:mx-0 text-base sm:text-lg">
            Discover handpicked items at best prices. Fast delivery, easy returns, and a shopping experience designed for you.
          </p>

          {/* Icons Features */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <div className="flex items-center gap-2 bg-orange-50 px-4 py-2 rounded shadow hover:shadow-md transition">
              <FaTruck className="text-orange-500 text-lg" />
              <span>Fast Delivery</span>
            </div>
            <div className="flex items-center gap-2 bg-orange-50 px-4 py-2 rounded shadow hover:shadow-md transition">
              <FaUndo className="text-orange-500 text-lg" />
              <span>Easy Returns</span>
            </div>
            <div className="flex items-center gap-2 bg-orange-50 px-4 py-2 rounded shadow hover:shadow-md transition">
              <FaTags className="text-orange-500 text-lg" />
              <span>Best Deals</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <a
              href="/items"
              className="px-5 py-3 bg-orange-500 text-white rounded shadow hover:opacity-95 transition"
            >
              Shop Now
            </a>
            <a
              href="#categories"
              className="px-5 py-3 bg-yellow-200 text-orange-700 rounded hover:bg-yellow-300 transition"
            >
              Browse Categories
            </a>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center md:justify-end">
          <div className="w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-orange-50 rounded-xl shadow-lg p-4 flex items-center justify-center">
            <img
              src={bannerImg} // Use imported image
              alt="banner"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
