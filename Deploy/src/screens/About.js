import React from 'react'
import PizzaLogo from '../Images/Pizza-logo.png'
import Ingredients from '../Images/Ingredients.png'
import Cheif from "../Images/chief.png"
const About = () => {
  return (
    <div name="about" className="py-20 bg-white">
  <div className="container mx-auto px-6">
    <h2 className="text-4xl font-bold text-center text-red-600 mb-8">
      About Us
    </h2>
    <p className="text-lg text-gray-700 text-center mb-10">
      Welcome to Pizza Hut, where every slice is a story of passion,
      quality, and tradition. We believe in using the freshest ingredients,
      hand-picked just for you. Our pizzas are crafted with love and baked to
      perfection to bring you the authentic taste of Italy right to your
      doorstep.
    </p>
    <div className="flex flex-col md:flex-row items-center justify-around">
      <div className="w-full md:w-1/3 text-center mb-8 md:mb-0">
        <img
          src={PizzaLogo}
          alt="Our Story"
          className="w-48 h-48 object-cover mx-auto rounded-full"
        />
        <h3 className="text-2xl font-semibold text-gray-800 mt-4">
          Our Story
        </h3>
        <p className="text-gray-600 mt-2">
          From humble beginnings to becoming a favorite in the neighborhood,
          learn about our journey.
        </p>
      </div>
      <div className="w-full md:w-1/3 text-center mb-8 md:mb-0">
        <img
          src={Ingredients}
          alt="Our Ingredients"
          className="w-48 h-48 object-cover mx-auto rounded-full"
        />
        <h3 className="text-2xl font-semibold text-gray-800 mt-4">
          Our Ingredients
        </h3>
        <p className="text-gray-600 mt-2">
          We source only the finest ingredients to ensure every bite is a burst
          of flavor.
        </p>
      </div>
      <div className="w-full md:w-1/3 text-center">
        <img
          src={Cheif}
          alt="Our Passion"
          className="w-48 h-48 object-cover mx-auto rounded-full"
        />
        <h3 className="text-2xl font-semibold text-gray-800 mt-4">
          Our Passion
        </h3>
        <p className="text-gray-600 mt-2">
          We are passionate about delivering not just a meal, but an experience.
        </p>
      </div>
    </div>
  </div>
</div>

  )
}

export default About