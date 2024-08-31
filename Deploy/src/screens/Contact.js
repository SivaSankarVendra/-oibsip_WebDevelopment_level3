import React, { useState } from 'react';

const Contact = () => {
  const [data, setData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.success) {
        setStatus("Message sent successfully!");
        setData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus(""), 3000);
      } else {
        setStatus("An error occurred. Please try again.");
        setTimeout(() => setStatus(""), 3000);
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus("An error occurred. Please try again.");
      setTimeout(() => setStatus(""), 3000);
    }
  };

  return (
    <div name="contact" className="py-20 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-red-600 mb-8">Contact Us</h2>
        <p className="text-lg text-gray-700 text-center mb-12">
          We'd love to hear from you! Whether you have questions about our menu, feedback on your experience, or just want to say hello, drop us a line.
        </p>
        <div className="flex flex-col items-center">
          <div className="w-full md:w-2/3 lg:w-1/2 mb-12">
            <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8">
              <div className="mb-6">
                <label htmlFor="name" className="block text-gray-800 font-semibold mb-2">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-800 font-semibold mb-2">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-800 font-semibold mb-2">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={data.message}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300"
              >
                Send Message
              </button>
            </form>
            {status && (
              <p className={`text-center mt-4 ${status.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
                {status}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
