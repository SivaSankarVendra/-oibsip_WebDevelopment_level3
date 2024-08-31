import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import logo from "../Images/Pizza-logo.png";

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/messages'); 
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setMessages(data);
      } catch (err) {
        setError(`Error fetching messages: ${err.message}`);
        console.error('Something went wrong', err);
        setTimeout(() => {
          setError(null);
        }, 3000);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="admin-dashboard">
      <nav className="bg-white p-4 flex justify-between shadow-lg">
        <div className="flex items-center space-x-3 mb-4 md:mb-0">
          <img src={logo} alt="Pizza logo" className="h-10 w-auto" />
          <div className="text-2xl font-bold text-red-600 cursor-pointer">ADMIN</div>
        </div>
        <ul className="flex space-x-4 justify-center items-center text-xl">
          <li>
            <Link to="/admin/orders" className="hover:underline">
              Orders
            </Link>
          </li>
          <li>
            <Link to="/admin/messages" className="hover:underline">
              Customer Messages
            </Link>
          </li>
          <li>
            <button
              onClick={() => {
                localStorage.removeItem("authToken");
                localStorage.removeItem("email");
                localStorage.removeItem("userRole");
                window.location.reload();
              }}
              className="w-full px-4 py-2 text-lg bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
      <div className='p-4'>
        {error && <p className="text-red-600">{error}</p>}
        <h2 className="text-2xl font-bold mb-4">All Messages</h2>
        <div className="bg-white p-4 rounded-lg shadow-lg">
          {messages.length > 0 ? (
            <ul className="space-y-4">
              {messages.map((message) => (
                <li key={message._id} className="border border-gray-200 p-4 rounded-lg">
                  <h3 className="text-xl font-semibold">From: {message.name}</h3>
                  <p className="text-gray-600">{message.email}</p>
                  <p className="text-gray-400 text-sm">{new Date(message.date).toLocaleDateString()}</p>
                  <p className="mt-2">{message.message}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No messages available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminMessages;
