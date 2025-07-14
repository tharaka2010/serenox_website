import React from 'react';
import { FaRss } from 'react-icons/fa';

// Placeholder data for articles
const articles = [
  {
    title: "Understanding Early Childhood Development",
    description: "A comprehensive guide for new parents on milestones and support.",
    category: "Child Health",
    date: "July 12, 2025",
  },
  {
    title: "The Importance of Comprehensive Sex Education",
    description: "Exploring why open and honest conversations are crucial for youth.",
    category: "Sex Education",
    date: "July 10, 2025",
  },
  {
    title: "Navigating Pregnancy: A Guide for Expectant Mothers",
    description: "Tips and advice for a healthy and happy pregnancy journey.",
    category: "Maternal Health",
    date: "July 8, 2025",
  },
  {
    title: "Mental Health Support for New Parents",
    description: "Resources and strategies to cope with the challenges of parenthood.",
    category: "Counseling",
    date: "July 5, 2025",
  },
  {
    title: "Building Strong Family Bonds",
    description: "Techniques for effective communication and connection within the family.",
    category: "Counseling",
    date: "July 2, 2025",
  },
  {
    title: "A Guide to Contraception Methods",
    description: "An overview of different contraception options to help you make an informed choice.",
    category: "Sex Education",
    date: "June 28, 2025",
  },
];

export const News = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FaRss className="text-5xl mx-auto mb-4" />
          <h1 className="text-5xl font-extrabold">News and Articles</h1>
          <p className="mt-4 text-xl">
            Stay informed with the latest articles and insights from our experts.
          </p>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transition duration-300 ease-in-out transform hover:-translate-y-2">
                <div className="p-6 flex-grow">
                  <p className="text-sm font-semibold text-accent mb-2">{article.category}</p>
                  <h2 className="text-2xl font-bold mb-3 text-gray-800">{article.title}</h2>
                  <p className="text-gray-600 mb-4 flex-grow">{article.description}</p>
                </div>
                <div className="p-6 bg-gray-50 flex justify-between items-center">
                  <p className="text-sm text-gray-500">{article.date}</p>
                  <button className="font-bold text-primary hover:text-blue-700 transition duration-300">
                    Read More &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
