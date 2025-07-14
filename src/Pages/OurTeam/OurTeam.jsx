import React from 'react';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import sithumiImage from '../../assets/sithumi.jpg';
import chaminduuuImage from '../../assets/chaminduuu.jpg';
import madhaviImage from '../../assets/madhavi.jpg';
import tharakaImage from '../../assets/tharaka.jpg';

// Placeholder data for team members
const teamMembers = [
  {
    name: 'Mr.Tharaka Gimhan',
    role: 'Leader/Developer',
    bio: 'Undergraduate,BHSc(Hons)in HICT(GWU)',
    imageUrl: tharakaImage, // Replace with actual image URL
    social: {
      linkedin: '#',
      github: '#',
      twitter: '#',
    },
  },
  {
    name: 'Mis.Sithumi Nisansala',
    role: 'UI/UX Developer',
    bio: 'Undergraduate,BHSc(Hons)in HICT(GWU)',
    imageUrl: sithumiImage, // Replace with actual image URL
    social: {
      linkedin: '#',
      github: '#',
      twitter: '#',
    },
  },
  {
    name: 'Mis.Dasuni Uthpala',
    role: 'Developer',
    bio: 'Undergraduate,BHSc(Hons)in HICT(GWU)',
    imageUrl: sithumiImage, // Replace with actual image URL
    social: {
      linkedin: '#',
      github: '#',
      twitter: '#',
    },
  },
 

   {
    name: 'Mr.Chamindu Sandeepa',
    role: 'UI/UX Designer,Web Developer',
    bio: 'Undergraduate,BHSc(Hons)in HICT(GWU)',
    imageUrl: chaminduuuImage, // Replace with actual image URL
    social: {
      linkedin: '#',
      github: '#',
      twitter: '#',
    },
    
  },
  {
    name: 'Mis.Gayani Madhavi',
    role: 'Developer',
    bio: 'Undergraduate,BHSc(Hons)in HICT(GWU)',
    imageUrl: madhaviImage, // Replace with actual image URL
    social: {
      linkedin: '#',
      github: '#',
      Facebook: '#',
    },
  },
];

export const OurTeam = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <div className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-extrabold">Meet Our Team</h1>
          <p className="mt-4 text-xl">
            The passionate individuals dedicated to empowering your health journey.
          </p>
        </div>
      </div>

      {/* Team Grid */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 text-center">
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-6"
                />
                <h3 className="text-2xl font-bold text-gray-800">{member.name}</h3>
                <p className="text-accent font-semibold mb-4">{member.role}</p>
                <p className="text-gray-600 mb-6">{member.bio}</p>
                <div className="flex justify-center space-x-4">
                  <a href={member.social.linkedin} className="text-gray-500 hover:text-primary"><FaLinkedin size={24} /></a>
                  <a href={member.social.github} className="text-gray-500 hover:text-primary"><FaGithub size={24} /></a>
                  <a href={member.social.twitter} className="text-gray-500 hover:text-primary"><FaTwitter size={24} /></a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
