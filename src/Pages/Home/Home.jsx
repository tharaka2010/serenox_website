import React from "react";
import { TypeAnimation } from "react-type-animation";
import { useNavigate } from "react-router-dom";
import { FaApple, FaGooglePlay } from "react-icons/fa"; // For app store icons

import appview from "../Home/assets/app view.png";
import card_appintro from "../Home/assets/card/5.png";
import card_whywedothis from "../Home/assets/card/3.png";
import card_whatisebsite from "../Home/assets/card/2.png";
import card_appdescription from "../Home/assets/card/4.png";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen relative">
      {/* Logo */}
      <div className="  ">
        
      </div>

      {/* Hero Section */}
      <div className="w-full py-16 px-4">
        <div className="max-w-[1340px] mx-auto grid md:grid-cols-2 items-center gap-8">
          <div className="text-gray-800 text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4 text-primary">
              <TypeAnimation
                sequence={[
                  "Empowering Health Education",
                  1500,
                  "Maternal & Child Counseling",
                  1500,
                  "Your Guide to Sex Education",
                  1500,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </h1>
            <p className="text-xl md:text-2xl mb-8 font-light">
              Comprehensive resources and expert guidance for a healthier, informed life.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <button
                disabled
                className="bg-primary text-white font-bold py-3 px-6 rounded-lg shadow-lg flex items-center justify-center transition duration-300 ease-in-out transform hover:scale-105 opacity-50 cursor-not-allowed"
              >
                <FaApple className="mr-2" size={24} /> Download on the App Store
              </button>
              <button
                disabled
                className="bg-primary text-white font-bold py-3 px-6 rounded-lg shadow-lg flex items-center justify-center transition duration-300 ease-in-out transform hover:scale-105 opacity-50 cursor-not-allowed"
              >
                <FaGooglePlay className="mr-2" size={24} /> Get it on Google Play
              </button>
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <img className="w-[450px] max-w-full h-auto rounded-lg shadow-xl" src={appview} alt="Mobile App View" />
          </div>
        </div>
      </div>

      {/* Feature Cards Section */}
      <div className="w-full py-16 px-4 bg-white">
        <div className="max-w-[1340px] mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Card 1: What is this Website */}
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center transition duration-300 ease-in-out transform hover:scale-105">
            <img className="w-32 h-32 object-contain mb-4" src={card_whatisebsite} alt="Website Description" />
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              What is this Website?
            </h2>
            <p className="text-gray-600 mb-6 flex-grow">
              Your comprehensive online platform for reliable sex education and maternal & child health guidance.
            </p>
            <button
              onClick={() => navigate("/about")}
              className="bg-primary text-white font-medium py-2 px-5 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Learn More
            </button>
          </div>

          {/* Card 2: Why do we doing this? */}
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center transition duration-300 ease-in-out transform hover:scale-105">
            <img className="w-32 h-32 object-contain mb-4" src={card_whywedothis} alt="Our Mission" />
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Our Mission
            </h2>
            <p className="text-gray-600 mb-6 flex-grow">
              We are dedicated to providing accessible, accurate, and empathetic information to empower individuals and families.
            </p>
            <button
              onClick={() => navigate("/about")}
              className="bg-primary text-white font-medium py-2 px-5 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Learn More
            </button>
          </div>

          {/* Card 3: About Our Mobile Application */}
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center transition duration-300 ease-in-out transform hover:scale-105">
            <img className="w-32 h-32 object-contain mb-4" src={card_appintro} alt="Mobile App Introduction" />
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              About Our Mobile App
            </h2>
            <p className="text-gray-600 mb-6 flex-grow">
              The Serenox app offers personalized content, interactive tools, and direct support for your health journey.
            </p>
            <button
              onClick={() => navigate("/features")} // Assuming a new features page
              className="bg-primary text-white font-medium py-2 px-5 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Learn More
            </button>
          </div>

          {/* Card 4: About Our Application Content */}
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center transition duration-300 ease-in-out transform hover:scale-105">
            <img className="w-32 h-32 object-contain mb-4" src={card_appdescription} alt="App Content" />
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              App Content Overview
            </h2>
            <p className="text-gray-600 mb-6 flex-grow">
              Explore a rich library of articles, videos, and guides on sexual health, pregnancy, and child care.
            </p>
            <button
              onClick={() => navigate("/news")}
              className="bg-primary text-white font-medium py-2 px-5 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
