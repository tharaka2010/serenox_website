import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export const Navbar = () => {
  const [nav, setNav] = useState(false);
  const { currentUser, isAdminUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleNav = () => {
    setNav(!nav);
  };

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to log out?')) {
      try {
        await logout();
        // No forced navigation to /login. UI will update based on AuthContext.
      } catch (error) {
        console.error("Error logging out:", error);
      }
    }
  };

  return (
    <div className="flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white">
      <h1 className="w-full text-3xl font-bold text-[#ffffff] px-16">Serenox</h1>
      
      {/* Language Dropdown */}
      <div className="flex items-center space-x-4">
        <ul className="hidden md:flex">
          <li className="p-4 font-bold"><Link to="/home" className="hover:text-gray-200">Home</Link></li>
          <li className="p-4 font-bold"><Link to="/about" className="hover:text-gray-200">About</Link></li>
          <li className="p-4 font-bold"><Link to="/news" className="hover:text-gray-200">News</Link></li>
          <li className="p-4 font-bold"><Link to="/contact" className="hover:text-gray-200">Contact</Link></li>
          {currentUser && isAdminUser && (
            <li className="p-4 font-bold"><Link to="/dashboard/articles" className="hover:text-gray-200">Dashboard</Link></li>
          )}
        </ul> 
        
        {/* Login/Logout Button */}
        {currentUser ? (
          <button
            onClick={handleLogout}
            className="hidden md:flex items-center p-2 bg-[#bca6ee] text-black rounded-md hover:bg-[#a08ee0]"
          >
            <FaUserCircle className="mr-2" size={20} />
            Logout
          </button>
        ) : (
          <Link to="/login" className="hidden md:flex items-center p-2 bg-[#bca6ee] text-black rounded-md hover:bg-[#a08ee0]">
            <FaUserCircle className="mr-2" size={20} />
            Login
          </Link>
        )}

        {/* Language Dropdown */}
        <select
          className="hidden md:block p-2 bg-[#bca6ee] text-black rounded-md"
          onChange={(e) => console.log("Selected language:", e.target.value)}
        >
          <option value="en">English</option>
          <option value="fr">සිංහල</option>
          <option value="es">Tamil</option>
          {/* Add more languages as needed */}
        </select>

        {/* Mobile Menu Icon */}
        <div onClick={handleNav} className="block md:hidden">
          {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={
          nav
            ? "fixed left-0 top-0 w-[60%] border-r-gray-900 bg-[#8b5aff] ease-in-out duration-500"
            : "ease-in-out duration-500 fixed left-[-100%]"
        }
      >
        <h1 className="w-full text-3xl font-bold text-[#ffffff] m-4 px-16">Serenox</h1>
        <ul className="pt-12 p-4">
          <li className="p-4 border-b border-gray-600 font-bold">Home</li>
          <li className="p-4 border-b border-gray-600 font-bold">About</li>
          <li className="p-4 border-b border-gray-600 font-bold">News</li>
          <li className="p-4 font-bold">Contact</li>
          {currentUser ? (
            <li className="p-4 border-t border-gray-600 font-bold">
              <button onClick={handleLogout} className="w-full text-left">Logout</button>
            </li>
          ) : (
            <li className="p-4 border-t border-gray-600 font-bold"><Link to="/login">Login</Link></li>
          )}
        </ul>
 
        {/* Mobile Language Dropdown */}
        <div className="p-4 ">
          <select
            className="p-2 w-full bg-[#8b5aff] text-white rounded-md "
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
