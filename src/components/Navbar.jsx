import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FaUserCircle, FaHome, FaInfoCircle, FaNewspaper, FaEnvelope, FaTachometerAlt, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import logo from '../assets/serenoxlogo.png';

export const Navbar = () => {
  const [nav, setNav] = useState(false);
  const { currentUser, isAdminUser, logout } = useAuth();
  const location = useLocation();

  const handleNav = () => {
    setNav(!nav);
  };

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to log out?')) {
      try {
        await logout();
        window.location.href = '/home'; // Redirect to homepage
      } catch (error) {
        console.error("Error logging out:", error);
      }
    }
  };

  const handleMobileLogout = async () => {
    handleNav();
    await handleLogout();
  };

  const navLinks = [
    { path: "/home", label: "Home", icon: <FaHome className="mr-3" /> },
    { path: "/about", label: "About", icon: <FaInfoCircle className="mr-3" /> },
    { path: "/news", label: "News", icon: <FaNewspaper className="mr-3" /> },
    { path: "/contact", label: "Contact", icon: <FaEnvelope className="mr-3" /> },
  ];

  if (currentUser && isAdminUser) {
    navLinks.push({ path: "/dashboard/articles", label: "Dashboard", icon: <FaTachometerAlt className="mr-3" /> });
  }

  return (
    <div className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/home">
              <img src={logo} alt="Serenox Logo" className="h-32" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-bold text-lg ${location.pathname === link.path ? 'text-primary' : 'text-gray-600'} hover:text-primary transition duration-300`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right-side actions */}
          <div className="hidden md:flex items-center space-x-4">
            {currentUser ? (
              <button
                onClick={handleLogout}
                className="flex items-center py-2 px-4 bg-primary text-white rounded-lg hover:bg-blue-700 transition duration-300"
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </button>
            ) : (
              <Link to="/login" className="flex items-center py-2 px-4 bg-primary text-white rounded-lg hover:bg-blue-700 transition duration-300">
                <FaSignInAlt className="mr-2" />
                Login
              </Link>
            )}
            <select
              className="py-2 px-3 bg-gray-100 text-gray-800 rounded-lg"
              onChange={(e) => console.log("Selected language:", e.target.value)}
            >
              <option value="en">English</option>
              <option value="si">සිංහල</option>
              <option value="ta">தமிழ்</option>
            </select>
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden flex items-center">
            <button onClick={handleNav} className="text-gray-800">
              {nav ? <AiOutlineClose size={28} /> : <AiOutlineMenu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden ${nav ? 'block' : 'hidden'} absolute top-20 left-0 w-full bg-white shadow-lg z-40`}
      >
        <ul className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                onClick={handleNav}
                className={`flex items-center py-3 px-3 font-bold rounded-lg ${location.pathname === link.path ? 'bg-primary text-white' : 'text-gray-800 hover:bg-gray-100'}`}
              >
                {link.icon}
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="pt-4 pb-3 border-t border-gray-200">
          {currentUser ? (
            <div className="px-4 space-y-3">
              <p className="text-gray-600">{currentUser.email}</p>
              <button
                onClick={handleMobileLogout}
                className="w-full flex items-center py-2 px-3 text-left font-bold bg-red-500 text-white rounded-lg"
              >
                <FaSignOutAlt className="mr-3" />
                Logout
              </button>
            </div>
          ) : (
            <div className="px-4">
              <Link
                to="/login"
                onClick={handleNav}
                className="w-full flex items-center py-3 px-3 font-bold bg-primary text-white rounded-lg"
              >
                <FaSignInAlt className="mr-3" />
                Login
              </Link>
            </div>
          )}
          <div className="mt-4 px-4">
            <select
              className="w-full py-2 px-3 bg-gray-100 text-gray-800 rounded-lg"
              onChange={(e) => console.log("Selected language:", e.target.value)}
            >
              <option value="en">English</option>
              <option value="si">සිංහල</option>
              <option value="ta">தமிழ்</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
