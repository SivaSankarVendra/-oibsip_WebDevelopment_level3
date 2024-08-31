import React, { useState, useEffect } from "react";
import { FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { scroller } from "react-scroll";
import logo from "../Images/Pizza-logo.png";

const Navbar = () => {
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const [ham, setHam] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setIsVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const links = [
    { id: 1, link: "home" },
    { id: 2, link: "orders" },
    { id: 3, link: "about" },
    { id: 4, link: "contact" },
  ];

  const handleLinkClick = (link) => {
    if (location.pathname === "/") {
      scroller.scrollTo(link, {
        smooth: true,
        duration: 500,
      });
    } else {
      navigate("/");
      setTimeout(() => {
        scroller.scrollTo(link, {
          smooth: true,
          duration: 500,
        });
      }, 100);
    }
    setHam(false);
  };

  return (
    <div
      className={`flex justify-between items-center p-2 md:p-4 bg-white shadow-lg fixed top-0 left-0 right-0 transition-transform duration-300 ${
        isVisible ? "transform translate-y-0" : "transform -translate-y-full"
      }`}
    >
  
      <div className="flex items-center space-x-3 mb-4 md:mb-0">
        <img src={logo} alt="Pizza logo" className="h-10 w-auto" />
        <Link to="/" className="text-2xl font-bold text-red-600">
          PIZZA HUT
        </Link>
      </div>


      <ul className="hidden md:flex md:space-x-8 text-lg font-medium text-gray-700 mb-4 md:mb-0">
        {links.map(({ id, link }) => (
          <li key={id} className="hover:text-red-600 cursor-pointer">
            <span onClick={() => handleLinkClick(link)}>
              {capitalize(link)}
            </span>
          </li>
        ))}
      </ul>

      <div className="hidden space-x-4 md:flex">
        <Link
          to="/cart"
          className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition duration-300 flex items-center"
        >
          <FaShoppingCart className="mr-2" /> Cart
        </Link>
        {!localStorage.getItem("authToken") ? (
          <>
            <Link
              to="/login"
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition duration-300 flex items-center"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 flex items-center"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/myorders"
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-300 flex items-center"
            >
              My Orders
            </Link>
            <button
              onClick={() => {
                localStorage.removeItem("authToken");
                localStorage.removeItem("email");
                window.location.reload();
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
            >
              Logout
            </button>
          </>
        )}
      </div>

      <div
        onClick={() => setHam(!ham)}
        className="cursor-pointer pr-4 md:hidden z-10 text-gray-500"
      >
        {ham ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      {ham && (
        <ul className="flex flex-col justify-center items-center absolute top-0 left-1/2 w-1/2 h-screen bg-red-600/80 text-white rounded-lg md:hidden transition-transform duration-300 ease-in-out">
          {links.map(({ id, link }) => (
            <li
              key={id}
              className="w-full px-6 py-4 text-center capitalize text-3xl hover:bg-black/25 transition duration-300"
            >
              <span
                onClick={() => handleLinkClick(link)}
                className="block w-full text-xl"
              >
                {capitalize(link)}
              </span>
            </li>
          ))}
          <div className="w-full px-6 py-4 text-center">
            <Link
              to="/cart"
              className="w-full px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition duration-300 flex items-center justify-center"
            >
              <FaShoppingCart className="mr-2" /> Cart
            </Link>
          </div>
          {!localStorage.getItem("authToken") ? (
            <>
              <div className="w-full px-6 py-4 text-center">
                <Link
                  to="/login"
                  className="w-full px-4 py-2 border bg-white border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition duration-300 flex items-center justify-center"
                >
                  Login
                </Link>
              </div>
              <div className="w-full px-6 py-4 text-center">
                <Link
                  to="/signup"
                  className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 flex items-center justify-center"
                >
                  Sign Up
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="w-full px-6 py-4 text-center">
                <Link
                  to="/myorders"
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center"
                >
                  My Orders
                </Link>
              </div>
              <div className="w-full px-6 py-4 text-center">
                <button
                  onClick={() => {
                    localStorage.removeItem("authToken");
                    localStorage.removeItem("email");
                    localStorage.removeItem("userRole")
                    window.location.reload();
                  }}
                  className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
                >
                  Logout
                </button>
              </div>
            </>
          )}
        </ul>
      )}
    </div>
  );
};

export default Navbar;
