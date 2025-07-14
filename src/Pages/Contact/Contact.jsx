import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

export const Contact = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPopup(true);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FaEnvelope className="text-5xl mx-auto mb-4" />
          <h1 className="text-5xl font-extrabold">Contact Us</h1>
          <p className="mt-4 text-xl">
            We'd love to hear from you! Reach out with any questions or feedback.
          </p>
        </div>
      </div>

      {/* Contact Form and Info */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Send us a Message</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-lg font-medium text-gray-700">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full mt-2 p-3 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-lg font-medium text-gray-700">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full mt-2 p-3 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="john.doe@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-lg font-medium text-gray-700">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  className="w-full mt-2 p-3 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your message here..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-accent text-gray-900 font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-yellow-500 transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Direct Contact Info */}
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">Direct Contact</h2>
              <div className="flex items-center mb-4">
                <FaEnvelope className="text-2xl text-primary mr-4" />
                <a href="mailto:app@serenox.com" className="text-lg text-gray-600 hover:text-primary">app@serenox.com</a>
              </div>
              <div className="flex items-center mb-4">
                <FaPhone className="text-2xl text-primary mr-4" />
                <span className="text-lg text-gray-600">+94 754599990</span>
              </div>
              <div className="flex items-start">
                <FaMapMarkerAlt className="text-2xl text-primary mr-4 mt-1" />
                <p className="text-lg text-gray-600">Gampaha Wickramarachchi University, Kandy Rd, Yakkala</p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">Follow Us</h2>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-600 hover:text-primary transition duration-300"><FaFacebook size={32} /></a>
                <a href="#" className="text-gray-600 hover:text-primary transition duration-300"><FaTwitter size={32} /></a>
                <a href="#" className="text-gray-600 hover:text-primary transition duration-300"><FaInstagram size={32} /></a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-2xl p-8 m-4 max-w-md w-full text-center">
            <h3 className="text-3xl font-bold mb-4 text-gray-800">Thank You!</h3>
            <p className="text-lg text-gray-600 mb-6">Your message has been recorded. We will get back to you shortly.</p>
            <button
              onClick={() => setShowPopup(false)}
              className="bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
