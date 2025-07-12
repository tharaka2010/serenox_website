import React from 'react'

export const About = () => {
  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen py-16 px-4">
      <div className="max-w-[1340px] mx-auto">
        <h1 className="text-5xl md:text-6xl font-extrabold text-center mb-12 text-primary">About Us</h1>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg leading-relaxed mb-4">
            At Serenox, our mission is to empower individuals and families with accurate, accessible, and empathetic information on sex education, maternal health, and child counseling. We believe that knowledge is key to making informed decisions about one's health and well-being, fostering healthier communities.
          </p>
          <p className="text-lg leading-relaxed">
            We are committed to breaking down stigmas and providing a safe, supportive environment for learning and growth. Through our mobile application and website, we aim to be a trusted resource for comprehensive health guidance.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
          <p className="text-lg leading-relaxed">
            To be the leading digital platform for health education, recognized for our commitment to accuracy, empathy, and innovation. We envision a world where everyone has the knowledge and support they need to navigate their health journeys confidently.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Our Team</h2>
          <p className="text-lg leading-relaxed mb-4">
            We are a passionate team of health educators, developers, and designers dedicated to creating impactful digital solutions. Our diverse backgrounds and shared commitment to public health drive us to deliver high-quality, user-friendly resources.
          </p>
          <p className="text-lg leading-relaxed text-gray-600">
            (Placeholder for team member profiles or more detailed team information)
          </p>
        </div>
      </div>
    </div>
  )
}
