import React from 'react';
import { FaBookOpen, FaUserMd, FaChild, FaShieldAlt } from 'react-icons/fa';
import whatis from '../../assets/whatis.png'; // A relevant hero image
import { useNavigate } from 'react-router-dom';

export const WhatIsThisWebsite = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <div className="relative bg-primary text-white py-20 md:py-32">
        <div className="absolute inset-0">
          <img src={whatis} alt="Health Education" className="w-full h-full object-cover opacity-20" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold">Your Trusted Health Companion</h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">
            A comprehensive platform for reliable sex education, maternal health, and child counseling.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="text-left mb-12">
            <h2 className="text-2xl font-extrabold text-gray-900">Why We Do Our Web Application-Serenox</h2><br></br>
            <p>     In Sri Lanka, open conversations about sexuality, reproductive health, and maternal care are often neglected due to cultural stigma,
               ethical concerns, and a lack of reliable educational resources. This silence has led to widespread consequences,
                such as unplanned pregnancies, unsafe abortions, non-communicable diseases, and emotional distress among young people. 
                Many youth grow up without the proper knowledge or guidance to make informed choices about their bodies, relationships, 
                or future family life. Recognizing these gaps, we created<b> “Serenox”</b> as a digital platform designed to educate, empower,
                 and support.</p>
            <p>Serenox serves as a bridge between knowledge and care, offering a safe, private, and accessible space for young individuals and mothers to receive accurate information and support. 
              Through our website and mobile app, we aim to deliver interactive modules on topics like safe sexual practices, contraception, reproductive health, and child development. 
              We also provide personalized guidance for expecting and new mothers, alongside reminders and medical consultations with certified professionals. Our platform has been developed to reduce the risks 
              of unsafe pregnancies, promote formal sexuality education, and improve overall maternal and child health outcomes in Sri Lanka.</p>
              <p>Ultimately, Serenox is more than just a digital tool. it’s a movement towards breaking silence, reducing stigma, and building a healthier, informed generation. We believe that when young people are
                 equipped with the right knowledge and support, they are empowered to make confident, responsible, and life-affirming decisions for themselves and their families.</p>
            </div>
            <h2 className="text-4xl font-extrabold text-gray-900">What We Offer</h2>
            <p className="mt-4 text-lg text-gray-600">
              We provide expert-backed resources to support you at every stage of your health journey.
            </p>
             

          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1: Comprehensive Education */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center transform hover:-translate-y-2 transition-transform duration-300">
              <FaBookOpen className="text-5xl text-accent mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-3">Comprehensive Education</h3>
              <p className="text-gray-600">
                Access a rich library of articles and guides on sexual health and wellness.
              </p>
            </div>

            {/* Feature 2: Expert Guidance */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center transform hover:-translate-y-2 transition-transform duration-300">
              <FaUserMd className="text-5xl text-accent mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-3">Expert Guidance</h3>
              <p className="text-gray-600">
                Our content is created and verified by medical professionals and educators.
              </p>
            </div>

            {/* Feature 3: Maternal & Child Health */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center transform hover:-translate-y-2 transition-transform duration-300">
              <FaChild className="text-5xl text-accent mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-3">Maternal & Child Health</h3>
              <p className="text-gray-600">
                Find support for your journey through pregnancy, childbirth, and parenting.
              </p>
            </div>

            {/* Feature 4: Safe & Supportive */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center transform hover:-translate-y-2 transition-transform duration-300">
              <FaShieldAlt className="text-5xl text-accent mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-3">Safe & Supportive</h3>
              <p className="text-gray-600">
                A secure and non-judgmental space for you to learn and ask questions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-primary">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white">
            Get the Full Experience on Our Mobile App
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            Download the Serenox app for personalized content, trackers, and more.
          </p>
          <div className="mt-8">
            <button
              onClick={() => navigate("/mobile-app")}
              className="bg-accent text-gray-900 font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-yellow-500 transition duration-300"
            >
              Learn About the App
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
