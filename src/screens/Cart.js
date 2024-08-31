import React, { useState } from "react";
import Navbar from "../components/Navbar";
import EmptyCart from "../Images/empty-cart.png";
import { Link } from "react-router-dom";
import { useCart, useDispatch } from "../components/ContentReducer";
import Alert from "../components/Alert";

const Cart = () => {
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [alert, setAlert] = useState(null);
  const data = useCart();
  const dispatch = useDispatch();

  let totalPrice = data.reduce((total, pizza) => total + pizza.price, 0);

  const handleDelete = (index) => {
    dispatch({ type: "REMOVE", index });
    setAlert({ message: "Item removed from cart.", type: "success" });
    setTimeout(() => {
      setAlert(null);
    }, 1000);
  };

  const capitalizeWords = (text) => {
    if (!text) return "None";
    return text
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const formatVeggies = (veggies) => {
    if (!veggies || veggies.length === 0) return "None";
    const veggieList = ["tomatoes", "onions", "peppers", "olives", "mushrooms"];
    return veggies
      .filter((veggie) => veggieList.includes(veggie))
      .map((veggie) => capitalizeWords(veggie))
      .join("\n");
  };

  const validatePhone = (phone) => {
    const phonePattern = /^[789][0-9]{9}$/;
    return phonePattern.test(phone);
  };

  const validateAddress = (address) => {
    return address.trim().length > 0;
  };

  const [isProcessing, setIsProcessing] = useState(false);

  const handleOrder = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    if (validatePhone(phone) && validateAddress(address)) {
      setIsValid(true);
      console.log(isValid);
      try {
        const email = localStorage.getItem("email");
        const orderData = data.map((item) => ({
          name: item.name,
          img:item.img,
          size: item.size,
          quantity: item.quantity,
          customizations: item.customizations,
          price: item.price,
        }));

        const response = await fetch("http://localhost:5000/api/orderdata", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            order_data: orderData,
            email: email,
            order_date: new Date().toLocaleString(),
            phoneNumber: phone,
            address: address,
          }),
        });

        if (response.ok) {
          setAlert({ message: "Order placed successfully!", type: "success" });
          dispatch({ type: "DROP" });
        } else {
          setAlert({ message: "Failed to place order.", type: "error" });
        }
      } catch (error) {
        console.error("Error submitting order data:", error);
        setAlert({
          message: "Failed to place order. Please try again.",
          type: "error",
        });
      }

      setTimeout(() => {
        setAlert(null);
        setIsProcessing(false);
      }, 1000);
    } else {
      setIsValid(false);
      setAlert({
        message: "Please enter valid phone number and address.",
        type: "error",
      });
      setTimeout(() => {
        setAlert(null);
        setIsProcessing(false);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {alert && <Alert message={alert.message} type={alert.type} />}

      {data.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-grow text-center mt-[70px]">
          <h1 className="text-2xl font-bold mb-4">Cart Empty 😕</h1>
          <p className="text-lg mb-2">
            You probably haven't ordered a pizza yet.
          </p>
          <p className="text-lg mb-6">To order a pizza, go to the main page.</p>
          <img
            src={EmptyCart}
            alt="empty-cart"
            className="w-1/2 max-w-xs mb-6"
          />
          <Link
            to="/"
            className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition duration-300"
          >
            Back to Main Page
          </Link>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center mt-[85px]">
          <h1 className="text-2xl font-bold mt-3">Orders</h1>
          <hr className="w-3/4 max-w-lg border-t-2 border-gray-300 my-4" />

          {data.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-lg w-3/4 max-w-lg mb-4 relative"
            >
              <img
                src={item.img}
                alt="Veg Pizza"
                className="w-20 h-20 object-cover rounded-md mr-4"
              />
              <div className="flex flex-col items-start text-left flex-grow">
                <h2 className="text-md md:text-xl font-semibold">
                  {item.name}
                </h2>
                <p className="text-sm text-gray-600">{item.size}</p>
              </div>
              <div className="flex flex-col items-start text-left flex-grow">
                <p className="text-xs md:text-sm text-gray-600 font-bold">
                  Customizations:
                </p>
                <ul className="text-xs md:text-sm text-gray-600">
                  <li className="flex">
                    <h1 className="font-semibold mr-1">Sauce: </h1>{" "}
                    {capitalizeWords(item.customizations.sauce)}
                  </li>
                  <li className="flex">
                    <h1 className="font-semibold mr-1">Cheese: </h1>{" "}
                    {capitalizeWords(item.customizations.cheese)}
                  </li>
                  <li className="flex text-wrap">
                    <h1 className="font-semibold mr-1">Veggies: </h1>{" "}
                    {formatVeggies(item.customizations.veggies)}
                  </li>
                </ul>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-md md:text-lg font-bold">
                  {item.quantity}pcs
                </span>
                <span className="text-md md:text-lg font-bold text-yellow-500">
                  ₹{item.price}
                </span>
              </div>
              <button
                onClick={() => handleDelete(index)}
                className="ml-4 pb-2 text-3xl font-bold text-red-500 hover:text-red-700 border-2 border-red-500 rounded-full w-5 h-5 flex items-center justify-center"
              >
                -
              </button>
            </div>
          ))}

          <hr className="w-3/4 max-w-lg border-t-2 border-gray-300 my-6" />

          <div className="flex w-3/4 max-w-lg justify-end items-center text-right mt-4">
            <div className="text-lg font-semibold">Total Amount:</div>
            <div className="text-xl mx-2 font-bold text-orange-500">
              ₹ {totalPrice}
            </div>
          </div>

          <div className="w-3/4 max-w-lg mt-6 flex flex-col items-end mb-6">
            <label htmlFor="phone" className="sr-only">
              Phone number
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              className="w-2/3 p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-yellow-500"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              pattern="[789][0-9]{9}"
              required
            />

            <label htmlFor="address" className="sr-only">
              Address
            </label>
            <input
              id="address"
              type="text"
              placeholder="Enter your address"
              className="w-2/3 p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-yellow-500"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            {localStorage.getItem("authToken") ? (
              <button
                onClick={handleOrder}
                className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition duration-300"
              >
                Place Order
              </button>
            ) : (
              <Link
                to="/login"
                className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition duration-300"
              >
                Login to Order
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
