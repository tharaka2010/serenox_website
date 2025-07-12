import React from 'react'

export const News = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-16 px-4">
      <div className="max-w-[1340px] mx-auto">
        <h1 className="text-5xl md:text-6xl font-extrabold text-center mb-12 text-primary">News and Articles</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Placeholder Article Card 1 */}
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col transition duration-300 ease-in-out transform hover:scale-105">
            <h2 className="text-2xl font-bold mb-3 text-gray-800">Understanding Early Childhood Development</h2>
            <p className="text-gray-600 mb-4 flex-grow">A comprehensive guide for new parents on milestones and support.</p>
            <button className="bg-primary text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 mt-auto">
              Read More
            </button>
          </div>

          {/* Placeholder Article Card 2 */}
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col transition duration-300 ease-in-out transform hover:scale-105">
            <h2 className="text-2xl font-bold mb-3 text-gray-800">The Importance of Comprehensive Sex Education</h2>
            <p className="text-gray-600 mb-4 flex-grow">Exploring why open and honest conversations are crucial for youth.</p>
            <button className="bg-primary text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 mt-auto">
              Read More
            </button>
          </div>

          {/* Placeholder Article Card 3 */}
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col transition duration-300 ease-in-out transform hover:scale-105">
            <h2 className="text-2xl font-bold mb-3 text-gray-800">Navigating Pregnancy: A Guide for Expectant Mothers</h2>
            <p className="text-gray-600 mb-4 flex-grow">Tips and advice for a healthy and happy pregnancy journey.</p>
            <button className="bg-primary text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 mt-auto">
              Read More
            </button>
          </div>

          {/* Placeholder Article Card 4 */}
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col transition duration-300 ease-in-out transform hover:scale-105">
            <h2 className="text-2xl font-bold mb-3 text-gray-800">Mental Health Support for New Parents</h2>
            <p className="text-gray-600 mb-4 flex-grow">Resources and strategies to cope with the challenges of parenthood.</p>
            <button className="bg-primary text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 mt-auto">
              Read More
            </button>
          </div>

          {/* Add more placeholder cards as needed */}
        </div>
      </div>
    </div>
  )
}
