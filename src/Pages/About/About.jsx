import React from 'react';
import { FaBullseye, FaEye, FaUsers } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export const About = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <div className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-extrabold">About Serenox</h1>
          <p className="mt-4 text-xl">
            Learn about our mission, vision, and the dedicated team behind our platform.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Our Mission */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <FaBullseye className="text-5xl text-accent mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-lg leading-relaxed">
                To empower individuals and families with accurate, accessible, and empathetic information on sex education, maternal health, and child counseling. We believe knowledge is key to making informed decisions and fostering healthier communities.
              </p>
            </div>

            {/* Our Vision */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <FaEye className="text-5xl text-accent mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
              <p className="text-lg leading-relaxed">
                To be the leading digital platform for health education, recognized for our commitment to accuracy, empathy, and innovation. We envision a world where everyone has the support they need to navigate their health journeys confidently.
              </p>
            </div>

            {/* Our Team */}
            <div
              className="bg-white rounded-xl shadow-lg p-8 text-center cursor-pointer transform hover:-translate-y-2 transition-transform duration-300"
              onClick={() => navigate('/our-team')}
            >
              <FaUsers className="text-5xl text-accent mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">Our Team</h2>
              <p className="text-lg leading-relaxed">
                We are a passionate team of health educators, developers, and designers dedicated to creating impactful digital solutions. Our diverse backgrounds and shared commitment to public health drive us to deliver high-quality resources.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
