import React from "react";
import {
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { Link } from 'react-router-dom';
import logo from '../assets/serenoxlogo.png'; // Assuming you have the logo here

export const Fotbar = () => {
  return (
    <div className="w-full bg-gray-900 text-gray-300 py-12 px-4">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-4 gap-8">
        {/* Company Info */}
        <div className="lg:col-span-1">
          <Link to="/home">
            <img src={logo} alt="Serenox Logo" className="h-24 mb-4" />
          </Link>
          <p className="text-sm mb-4">
            Empowering health education through comprehensive resources and compassionate guidance.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300"><FaFacebook size={24} /></a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300"><FaInstagram size={24} /></a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300"><FaTwitter size={24} /></a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300"><FaGithub size={24} /></a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300"><FaLinkedin size={24} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="lg:col-span-1">
          <h6 className="font-bold text-white mb-4 text-lg">Quick Links</h6>
          <ul>
            <li className="py-2 text-sm"><Link to="/home" className="hover:text-white transition-colors duration-300">Home</Link></li>
            <li className="py-2 text-sm"><Link to="/about" className="hover:text-white transition-colors duration-300">About</Link></li>
            <li className="py-2 text-sm"><Link to="/news" className="hover:text-white transition-colors duration-300">News</Link></li>
            <li className="py-2 text-sm"><Link to="/contact" className="hover:text-white transition-colors duration-300">Contact</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div className="lg:col-span-1">
          <h6 className="font-bold text-white mb-4 text-lg">Resources</h6>
          <ul>
            <li className="py-2 text-sm"><Link to="/what-is-this-website" className="hover:text-white transition-colors duration-300">What is this Website?</Link></li>
            <li className="py-2 text-sm"><Link to="/our-mission" className="hover:text-white transition-colors duration-300">Our Mission</Link></li>
            <li className="py-2 text-sm"><Link to="/mobile-app" className="hover:text-white transition-colors duration-300">Mobile App</Link></li>
            <li className="py-2 text-sm"><Link to="/app-content" className="hover:text-white transition-colors duration-300">App Content</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="lg:col-span-1">
          <h6 className="font-bold text-white mb-4 text-lg">Contact Us</h6>
          <p className="text-sm mb-2">Email: app@serenox.com</p>
          <p className="text-sm mb-2">Phone: +94 754599990</p>
          <p className="text-sm text-gray-400">Gampaha Wickramarachchi University, Kandy Rd, Yakkala</p>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-10 pt-8 text-center text-sm text-gray-500">
        <p>© 2024-2025 Serenox. All rights reserved. <Link to="/terms" className="hover:text-white">Terms of Use</Link> | <Link to="/privacy" className="hover:text-white">Privacy Policy</Link></p>
      </div>
    </div>
  );
};
