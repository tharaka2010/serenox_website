import React from 'react'

export const Contact = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-16 px-4">
      <div className="max-w-[1340px] mx-auto">
        <h1 className="text-5xl md:text-6xl font-extrabold text-center mb-12 text-primary">Contact Us</h1>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Get in Touch</h2>
          <p className="text-lg leading-relaxed mb-6 text-gray-600">
            We'd love to hear from you! Please fill out the form below or reach out to us directly.
          </p>

          <form className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="name" className="block text-lg font-medium mb-2 text-gray-700">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full p-3 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-gray-800 placeholder-gray-400"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-lg font-medium mb-2 text-gray-700">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-3 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-gray-800 placeholder-gray-400"
                placeholder="john.doe@example.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-lg font-medium mb-2 text-gray-700">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                className="w-full p-3 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-gray-800 placeholder-gray-400"
                placeholder="Your message here..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-primary text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Send Message
            </button>
          </form>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Direct Contact</h2>
          <p className="text-lg leading-relaxed mb-2 text-gray-600">
            <strong>Email:</strong> <a href="mailto:info@serenox.com" className="text-primary hover:underline">info@serenox.com</a>
          </p>
          <p className="text-lg leading-relaxed mb-2 text-gray-600">
            <strong>Phone:</strong> +1 (123) 456-7890
          </p>
          <p className="text-lg leading-relaxed mb-2 text-gray-600">
            <strong>Address:</strong> 123 Health Lane, Wellness City, Country
          </p>
          <div className="flex space-x-4 mt-4">
            {/* Placeholder for social media icons */}
            <span className="text-gray-800 hover:text-primary transition duration-300"><i className="fab fa-facebook-square text-3xl"></i></span>
            <span className="text-gray-800 hover:text-primary transition duration-300"><i className="fab fa-twitter-square text-3xl"></i></span>
            <span className="text-gray-800 hover:text-primary transition duration-300"><i className="fab fa-instagram-square text-3xl"></i></span>
          </div>
        </div>
      </div>
    </div>
  )
}
