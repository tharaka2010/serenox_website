import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FaUserCircle, FaHome, FaInfoCircle, FaNewspaper, FaEnvelope, FaTachometerAlt, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

export const Navbar = () => {
  const [nav, setNav] = useState(false);
  const { currentUser, isAdminUser, logout } = useAuth();

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

  return (
    <div className="flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-gray-800 bg-white shadow-md">
      {/* Empty div to balance the flex layout, or you can add a title */}
      <div className="w-1/3">
        {/* This space is intentionally left blank to balance the centered navigation */}
      </div>
      
      <div className="flex items-center justify-center w-1/3">
        <ul className="hidden md:flex items-center">
          <li className="p-4 font-bold"><Link to="/home" className="hover:text-gray-500">Home</Link></li>
          <li className="p-4 font-bold"><Link to="/about" className="hover:text-gray-500">About</Link></li>
          <li className="p-4 font-bold"><Link to="/news" className="hover:text-gray-500">News</Link></li>
          <li className="p-4 font-bold"><Link to="/contact" className="hover:text-gray-500">Contact</Link></li>
          {currentUser && isAdminUser && (
            <li className="p-4 font-bold"><Link to="/dashboard/articles" className="hover:text-gray-500">Dashboard</Link></li>
          )}
        </ul> 
      </div>
      
      <div className="flex items-center justify-end w-1/3 space-x-4">
        {/* Login/Logout Button */}
        {currentUser ? (
          <button
            onClick={handleLogout}
            className="hidden md:flex items-center p-2 bg-primary text-white rounded-md hover:bg-blue-700 transition duration-300"
          >
            <FaUserCircle className="mr-2" size={20} />
            Logout
          </button>
        ) : (
          <Link to="/login" className="hidden md:flex items-center p-2 bg-primary text-white rounded-md hover:bg-blue-700 transition duration-300">
            <FaUserCircle className="mr-2" size={20} />
            Login
          </Link>
        )}

        {/* Language Dropdown */}
        <select
          className="hidden md:block p-2 bg-primary text-white rounded-md"
          onChange={(e) => console.log("Selected language:", e.target.value)}
        >
          <option value="en">English</option>
          <option value="fr">සිංහල</option>
          <option value="es">Tamil</option>
        </select>

        {/* Mobile Menu Icon */}
        <div onClick={handleNav} className="block md:hidden cursor-pointer">
          {nav ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={
          nav
            ? "fixed left-0 top-0 w-full max-w-xs h-screen border-r border-gray-200 bg-white ease-in-out duration-500 z-50 overflow-y-auto shadow-lg"
            : "ease-in-out duration-500 fixed left-[-100%]"
        }
      >
        <div className="flex justify-end p-4">
          <AiOutlineClose size={25} onClick={handleNav} className="cursor-pointer" />
        </div>
        <ul className="pt-4 p-4 text-gray-800">
          <li className="p-4 border-b border-gray-200 font-bold flex items-center"><FaHome className="mr-3" /><Link onClick={handleNav} to="/home">Home</Link></li>
          <li className="p-4 border-b border-gray-200 font-bold flex items-center"><FaInfoCircle className="mr-3" /><Link onClick={handleNav} to="/about">About</Link></li>
          <li className="p-4 border-b border-gray-200 font-bold flex items-center"><FaNewspaper className="mr-3" /><Link onClick={handleNav} to="/news">News</Link></li>
          <li className="p-4 border-b border-gray-200 font-bold flex items-center"><FaEnvelope className="mr-3" /><Link onClick={handleNav} to="/contact">Contact</Link></li>
          
          {currentUser ? (
            <>
              {isAdminUser && (
                <li className="p-4 border-b border-gray-200 font-bold flex items-center"><FaTachometerAlt className="mr-3" /><Link onClick={handleNav} to="/dashboard/articles">Dashboard</Link></li>
              )}
              <li className="p-4 font-bold flex items-center">
                <button onClick={handleMobileLogout} className="w-full text-left flex items-center"><FaSignOutAlt className="mr-3" />Logout</button>
              </li>
              <li className="p-4 text-sm text-gray-500 truncate">
                {currentUser.email}
              </li>
            </>
          ) : (
            <li className="p-4 font-bold flex items-center"><FaSignInAlt className="mr-3" /><Link onClick={handleNav} to="/login">Login</Link></li>
          )}
        </ul>
 
        {/* Mobile Language Dropdown */}
        <div className="p-4 border-t border-gray-200">
          <select
            className="p-2 w-full bg-gray-100 text-gray-800 rounded-md"
            onChange={(e) => console.log("Selected language:", e.target.value)}
          >
            <option value="en">English</option>
            <option value="fr">සිංහල</option>
            <option value="es">Tamil</option>
          </select>
        </div>
      </div>
    </div>
  );
};
