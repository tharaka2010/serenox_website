import React from "react";
import {
  FaFacebookSquare,
  FaGithubSquare,
  FaLinkedin,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { Link } from 'react-router-dom';

export const Fotbar = () => {
  return (
    <div className="w-full bg-gray-800 text-gray-300 py-16 px-4">
      <div className="max-w-[1340px] mx-auto grid lg:grid-cols-3 gap-8">
        {/* Company Info */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-4">Serenox</h1>
          <p className="text-sm mb-4">
            Empowering health education through comprehensive resources and compassionate guidance.
          </p>
          <div className="flex space-x-4">
            <span className="text-gray-300 hover:text-white transition-colors duration-300"><FaFacebookSquare size={30} /></span>
            <span className="text-gray-300 hover:text-white transition-colors duration-300"><FaInstagram size={30} /></span>
            <span className="text-gray-300 hover:text-white transition-colors duration-300"><FaTwitter size={30} /></span>
            <span className="text-gray-300 hover:text-white transition-colors duration-300"><FaGithubSquare size={30} /></span>
            <span className="text-gray-300 hover:text-white transition-colors duration-300"><FaLinkedin size={30} /></span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="lg:col-span-1 flex justify-between">
          <div>
            <h6 className="font-medium text-white mb-4">Quick Links</h6>
            <ul>
              <li className="py-2 text-sm text-gray-300 hover:text-white transition-colors duration-300"><Link to="/home">Home</Link></li>
              <li className="py-2 text-sm text-gray-300 hover:text-white transition-colors duration-300"><Link to="/about">About</Link></li>
              <li className="py-2 text-sm text-gray-300 hover:text-white transition-colors duration-300"><Link to="/news">News</Link></li>
              <li className="py-2 text-sm text-gray-300 hover:text-white transition-colors duration-300"><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h6 className="font-medium text-white mb-4">Contact Us</h6>
          <p className="text-sm mb-2">Email: info@serenox.com</p>
          <p className="text-sm mb-2">Phone: +1 (123) 456-7890</p>
          <p className="text-sm text-gray-400">Address: 123 Health Lane, Wellness City, Country</p>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
        <p>© 2023��2024 Serenox. All rights reserved. Terms of Use | Privacy Policy</p>
      </div>
    </div>
  );
};
