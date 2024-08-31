import React from "react";
import PizzaLogo from "../Images/Pizza-logo.png";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex flex-col w-full md:w-1/3 mb-6 md:mb-0 text-center">
            <h3 className="text-xl font-semibold mb-4">
              Pizza Hut
            </h3>
            <p className="text-gray-400">
              123 Pizza Street,
              <br />
              Flavor Town, 56789
              <br />
              Phone: +91 9876543210
              <br />
              Email: pizzahut@gmail.com
            </p>
          </div>

          <div className="w-full md:w-auto flex justify-center mb-6 md:mb-0">
            <img src={PizzaLogo} alt="Pizza Hut Logo" className="h-16" />
          </div>

          <div className="w-full md:w-1/3 text-center md:text-right">
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex justify-center space-x-4">
            <a
                href="https://www.facebook.com/profile.php?id=61561299920638"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://x.com/vendra_sankar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="https://www.instagram.com/abdshiva_26/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
              >
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="text-center text-gray-500 mt-8">
          <p>&copy; 2024 Pizza Hut. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
