import React from 'react';
import { FaBullseye, FaUniversalAccess, FaCheckCircle, FaHeart, FaUsers } from 'react-icons/fa';
import missionImage from '../../assets/bg_icon_home.png'; // A relevant hero image
import { useNavigate } from 'react-router-dom';

export const OurMission = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <div className="relative bg-primary text-white py-20 md:py-32">
        <div className="absolute inset-0">
          <img src={missionImage} alt="Our Mission" className="w-full h-full object-cover opacity-20" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FaBullseye className="text-5xl md:text-6xl mx-auto mb-6 text-accent" />
          <h1 className="text-4xl md:text-6xl font-extrabold">Our Mission</h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">
            At Serenox, our mission is to break the silence surrounding sexuality, reproductive health, and maternal care in Sri Lanka.
             We are committed to creating a safe, stigma-free, and accessible digital space where young individuals and mothers can gain accurate knowledge, 
             receive personalized support, and make empowered decisions about their health, relationships, and family life.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900">Our Core Values</h2>
            <p className="mt-4 text-lg text-gray-600">
              Our mission is guided by a commitment to the following principles.
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Value 1: Accessibility */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center transform hover:-translate-y-2 transition-transform duration-300">
              <FaUniversalAccess className="text-5xl text-accent mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-3">Accessibility</h3>
              <p className="text-gray-600">
                We believe everyone has the right to comprehensive health education, free from barriers.
              </p>
            </div>

            {/* Value 2: Accuracy */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center transform hover:-translate-y-2 transition-transform duration-300">
              <FaCheckCircle className="text-5xl text-accent mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-3">Accuracy</h3>
              <p className="text-gray-600">
                Our content is evidence-based and reviewed by experts to ensure it is reliable and trustworthy.
              </p>
            </div>

            {/* Value 3: Empathy */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center transform hover:-translate-y-2 transition-transform duration-300">
              <FaHeart className="text-5xl text-accent mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-3">Empathy</h3>
              <p className="text-gray-600">
                We approach sensitive topics with compassion and respect for all individuals.
              </p>
            </div>

            {/* Value 4: Inclusivity */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center transform hover:-translate-y-2 transition-transform duration-300">
              <FaUsers className="text-5xl text-accent mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-3">Inclusivity</h3>
              <p className="text-gray-600">
                We strive to create a safe, welcoming, and non-judgmental space for everyone.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-primary">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white">
            Join Our Community
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            Explore our articles and resources to start your journey toward better health.
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
