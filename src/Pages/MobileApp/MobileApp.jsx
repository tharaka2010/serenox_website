import React from 'react';
import { FaApple, FaGooglePlay, FaCogs, FaUserFriends, FaChartLine } from 'react-icons/fa';
import appview from '../../assets/app view.png'; // A screenshot of your app

export const MobileApp = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <div className="bg-primary text-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 items-center gap-12">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-extrabold">Our Mobile App</h1>
            <p className="mt-4 text-lg md:text-xl">
              Get personalized health guidance on the go with the Serenox mobile app.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <button
                disabled
                className="bg-white text-primary font-bold py-4 px-8 rounded-lg shadow-lg flex items-center justify-center opacity-50 cursor-not-allowed"
              >
                <FaApple className="mr-3" size={28} />
                <div>
                  <p className="text-xs">Download on the</p>
                  <p className="text-lg font-semibold">App Store</p>
                </div>
              </button>
              <button
                disabled
                className="bg-gray-800 text-white font-bold py-4 px-8 rounded-lg shadow-lg flex items-center justify-center opacity-50 cursor-not-allowed"
              >
                <FaGooglePlay className="mr-3" size={28} />
                <div>
                  <p className="text-xs">GET IT ON</p>
                  <p className="text-lg font-semibold">Google Play</p>
                </div>
              </button>
            </div>
          </div>
          <div className="hidden md:flex justify-center">
            <img src={appview} alt="Mobile App" className="w-full max-w-xs h-auto rounded-lg" />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900">App Features</h2>
            <p className="mt-4 text-lg text-gray-600">
              The Serenox app is packed with features to support your health journey.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <FaCogs className="text-5xl text-accent mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-3">Personalized Content</h3>
              <p className="text-gray-600">
                Receive articles and resources tailored to your specific needs and interests.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <FaUserFriends className="text-5xl text-accent mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-3">Community Support</h3>
              <p className="text-gray-600">
                Connect with a supportive community of peers and experts in a safe environment.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <FaChartLine className="text-5xl text-accent mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-3">Progress Tracking</h3>
              <p className="text-gray-600">
                Monitor your health and wellness journey with our easy-to-use tracking tools.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
