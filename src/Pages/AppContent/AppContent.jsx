import React from 'react';
import { FaBook, FaVideo, FaComments } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import mobileView from '../../assets/mobileview.jpg';

export const AppContent = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center text-white py-20 md:py-32"
        style={{ backgroundImage: `url(${mobileView})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold">Our Content</h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">
            Explore our rich library of expert-curated content on a wide range of health topics.
          </p>
        </div>
      </div>

      {/* Content Types Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900">Types of Content We Offer</h2>
            <p className="mt-4 text-lg text-gray-600">
              We provide a variety of formats to make learning about health engaging and accessible.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <FaBook className="text-5xl text-accent mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-3">In-Depth Articles</h3>
              <p className="text-gray-600">
                Comprehensive articles covering everything from sexual health to parenting.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <FaVideo className="text-5xl text-accent mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-3">Educational Videos</h3>
              <p className="text-gray-600">
                Engaging videos that break down complex topics into easy-to-understand segments.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <FaComments className="text-5xl text-accent mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-3">Expert Q&As</h3>
              <p className="text-gray-600">
                Answers to your most pressing health questions from our team of experts.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-primary">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white">
            Ready to Dive In?
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            Explore our library of articles and start your journey to better health today.
          </p>
          <div className="mt-8">
            <button
              onClick={() => navigate("/news")}
              className="bg-accent text-gray-900 font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-yellow-500 transition duration-300"
            >
              Explore Articles
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
