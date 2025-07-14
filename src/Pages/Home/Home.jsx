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
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="w-full bg-white">
        <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 items-center gap-12">
          <div className="text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900 mb-6">
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
                className="text-primary"
              />
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              Comprehensive resources and expert guidance for a healthier, informed life.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <button
                disabled
                className="bg-primary text-white font-bold py-4 px-8 rounded-lg shadow-lg flex items-center justify-center transition duration-300 ease-in-out transform hover:scale-105 opacity-50 cursor-not-allowed"
              >
                <FaApple className="mr-3" size={28} />
                <div>
                  <p className="text-xs">Download on the</p>
                  <p className="text-lg font-semibold">App Store</p>
                </div>
              </button>
              <button
                disabled
                className="bg-gray-800 text-white font-bold py-4 px-8 rounded-lg shadow-lg flex items-center justify-center transition duration-300 ease-in-out transform hover:scale-105 opacity-50 cursor-not-allowed"
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
            <img className="w-full max-w-md h-auto rounded-lg" src={appview} alt="Mobile App View" />
          </div>
        </div>
      </div>

      {/* Feature Cards Section */}
      <div className="w-full py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900">Discover Our Platform</h2>
            <p className="mt-4 text-lg text-gray-600">
              Everything you need to know about our mission, our app, and our content.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card 1: What is this Website */}
            <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center transition duration-300 ease-in-out transform hover:-translate-y-2">
              <img className="w-24 h-24 object-contain mb-6" src={card_whatisebsite} alt="Website Description" />
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                What is this Website?
              </h3>
              <p className="text-gray-600 mb-6 flex-grow">
                Your comprehensive online platform for reliable sex education and maternal & child health guidance.
              </p>
              <button
                onClick={() => navigate("/what-is-this-website")}
                className="bg-accent text-gray-900 font-bold py-2 px-6 rounded-lg hover:bg-blue-500 transition duration-300"
              >
                Learn More
              </button>
            </div>

            {/* Card 2: Our Mission */}
            <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center transition duration-300 ease-in-out transform hover:-translate-y-2">
              <img className="w-24 h-24 object-contain mb-6" src={card_whywedothis} alt="Our Mission" />
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Our Mission
              </h3>
              <p className="text-gray-600 mb-6 flex-grow">
                We are dedicated to providing accessible, accurate, and empathetic information to empower individuals and families.
              </p>
              <button
                onClick={() => navigate("/our-mission")}
                className="bg-accent text-gray-900 font-bold py-2 px-6 rounded-lg hover:bg-blue-500 transition duration-300"
              >
                Learn More
              </button>
            </div>

            {/* Card 3: About Our Mobile Application */}
            <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center transition duration-300 ease-in-out transform hover:-translate-y-2">
              <img className="w-24 h-24 object-contain mb-6" src={card_appintro} alt="Mobile App Introduction" />
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                About Our Mobile App
              </h3>
              <p className="text-gray-600 mb-6 flex-grow">
                The Serenox app offers personalized content, interactive tools, and direct support for your health journey.
              </p>
              <button
                onClick={() => navigate("/mobile-app")}
                className="bg-accent text-gray-900 font-bold py-2 px-6 rounded-lg hover:bg-blue-500 transition duration-300"
              >
                Learn More
              </button>
            </div>

            {/* Card 4: App Content Overview */}
            <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center transition duration-300 ease-in-out transform hover:-translate-y-2">
              <img className="w-24 h-24 object-contain mb-6" src={card_appdescription} alt="App Content" />
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                App Content Overview
              </h3>
              <p className="text-gray-600 mb-6 flex-grow">
                Explore a rich library of articles, videos, and guides on sexual health, pregnancy, and child care.
              </p>
              <button
                onClick={() => navigate("/app-content")}
                className="bg-accent text-gray-900 font-bold py-2 px-6 rounded-lg hover:bg-blue-500 transition duration-300"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
