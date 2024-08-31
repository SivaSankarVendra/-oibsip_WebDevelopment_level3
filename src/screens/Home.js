import React,{useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import About from "./About";
import Contact from "./Contact";
import Orders from "./Orders";
import PizzaImg from "../Images/Pizza.png";
import { Link as Go } from "react-scroll";
import Footer from "../components/Footer";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");

    if (userRole === "admin") {
      navigate("/admin/dashboard");
    }
  }, [navigate]);

  return (
    <div className="h-screen w-100vw">
      <Navbar />
      <div
        name="home"
        className="mt-[70px] mx-auto h-[calc(100vh-70px)] flex items-center justify-between py-10 bg-gray-100 px-3" 
      >
        <div className="w-1/2 p-8">
          <h6 className="text-left text-2xl my-2 px-2 italic text-gray-600">Love at First Bite</h6>
          <h1 className="text-left text-6xl font-bold my-3 text-gray-900">
            Join Us for a Slice of Happiness
          </h1>
          <Go to="orders" className="inline-block bg-orange-500 text-white m-2 p-4 rounded-lg hover:cursor-pointer hover:bg-orange-600 transition duration-300 ease-in-out">
      Order Now
    </Go>
        </div>
        <div className="w-1/2">
          <img src={PizzaImg} alt="pizza" />
        </div>
      </div>

      <Orders />
      <About />
      <Contact />
      <Footer/>
    </div>
  );
};

export default Home;
