import React, { useState, useRef, useEffect } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FaHome, FaInfoCircle, FaNewspaper, FaEnvelope, FaTachometerAlt, FaSignOutAlt } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

// A simple, stylish avatar component
const Avatar = ({ user }) => (
  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
    {user.email.charAt(0).toUpperCase()}
  </div>
);

export const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { currentUser, isAdminUser, logout } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleNav = () => setNav(!nav);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to log out?')) {
      try {
        await logout();
        navigate('/home');
      } catch (error) {
        console.error("Error logging out:", error);
      }
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex justify-between items-center h-20 max-w-7xl mx-auto px-4 text-gray-800 bg-white shadow-sm">
      {/* Logo on the left */}
      <div className="flex-shrink-0">
        <Link to="/home" className="text-3xl font-bold text-primary">Serenox</Link>
      </div>

      {/* Desktop Navigation on the right */}
      <div className="hidden md:flex items-center space-x-6">
        <Link to="/home" className="font-semibold text-gray-600 hover:text-primary transition-colors">Home</Link>
        <Link to="/about" className="font-semibold text-gray-600 hover:text-primary transition-colors">About</Link>
        <Link to="/news" className="font-semibold text-gray-600 hover:text-primary transition-colors">News</Link>
        <Link to="/contact" className="font-semibold text-gray-600 hover:text-primary transition-colors">Contact</Link>

        <div className="w-px h-6 bg-gray-300"></div>

        {currentUser ? (
          <div className="relative" ref={dropdownRef}>
            <button onClick={toggleDropdown} className="flex items-center focus:outline-none">
              <Avatar user={currentUser} />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl z-20 py-1">
                {isAdminUser && (
                  <Link to="/admin/dashboard" onClick={() => setDropdownOpen(false)} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <FaTachometerAlt className="mr-3" /> Dashboard
                  </Link>
                )}
                <button onClick={handleLogout} className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <FaSignOutAlt className="mr-3" /> Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="flex items-center text-gray-600 hover:text-primary transition-colors" title="Login">
            <FiLogIn size={24} />
          </Link>
        )}
      </div>

      {/* Mobile Menu Icon */}
      <div onClick={handleNav} className="block md:hidden cursor-pointer">
        {nav ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
      </div>

      {/* Mobile Menu */}
      <div className={`fixed left-0 top-0 w-full max-w-xs h-screen bg-white ease-in-out duration-300 z-50 shadow-lg ${nav ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-between items-center p-4 border-b">
          <h1 className="text-2xl font-bold text-primary">Serenox</h1>
          <AiOutlineClose size={25} onClick={handleNav} className="cursor-pointer" />
        </div>
        <ul className="pt-4 p-4 text-gray-800">
          <li className="p-4 border-b border-gray-100 font-bold flex items-center"><FaHome className="mr-3" /><Link onClick={handleNav} to="/home">Home</Link></li>
          <li className="p-4 border-b border-gray-100 font-bold flex items-center"><FaInfoCircle className="mr-3" /><Link onClick={handleNav} to="/about">About</Link></li>
          <li className="p-4 border-b border-gray-100 font-bold flex items-center"><FaNewspaper className="mr-3" /><Link onClick={handleNav} to="/news">News</Link></li>
          <li className="p-4 border-b border-gray-100 font-bold flex items-center"><FaEnvelope className="mr-3" /><Link onClick={handleNav} to="/contact">Contact</Link></li>
          
          <div className="my-4 h-px bg-gray-200"></div>

          {currentUser ? (
            <>
              {isAdminUser && (
                <li className="p-4 font-bold flex items-center"><FaTachometerAlt className="mr-3" /><Link onClick={handleNav} to="/admin/dashboard">Dashboard</Link></li>
              )}
              <li className="p-4 font-bold flex items-center">
                <button onClick={() => { handleNav(); handleLogout(); }} className="w-full text-left flex items-center"><FaSignOutAlt className="mr-3" />Logout</button>
              </li>
              <li className="p-4 text-sm text-gray-500 truncate absolute bottom-0">
                {currentUser.email}
              </li>
            </>
          ) : (
            <li className="p-4 font-bold flex items-center"><FiLogIn className="mr-3" /><Link onClick={handleNav} to="/login">Login</Link></li>
          )}
        </ul>
      </div>
    </div>
  );
};