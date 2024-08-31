import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../components/Alert";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const email = localStorage.getItem("email");
        const response = await fetch(
          `http://localhost:5000/api/myorders?email=${email}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const ordersArray = await response.json();
          setOrders(ordersArray.reverse());
        } else {
          const message = await response.json();
          setAlert({
            message: message.message || "Failed to fetch orders",
            type: "error",
          });
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        setAlert({
          message: "Failed to fetch orders. Please try again.",
          type: "error",
        });
      }
    };

    fetchOrders();
  }, []);

  const calculateFinalPrice = (items) => {
    return items.reduce((total, item) => total + item.price, 0);
  };

  const handleTrackOrder = (orderId) => {
    navigate(`/track/${orderId}`);
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      {alert && <Alert message={alert.message} type={alert.type} />}

      <div className="flex flex-col items-center justify-center text-center mt-[85px] p-4">
        <h1 className="text-3xl font-bold mt-3 text-gray-800">My Orders</h1>
        <hr className="w-3/4 max-w-lg border-t-2 border-gray-300 my-4" />

        {orders.length === 0 ? (
          <div className="text-lg mb-4 text-gray-600">
            You have no orders yet.
          </div>
        ) : (
          orders.map((order, orderIndex) => (
            <div key={orderIndex} className="w-full max-w-2xl mb-6">
              {order.order_data
                .slice()
                .reverse()
                .map((item, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-lg shadow-md mb-4"
                  >
                    <div className="mb-4">
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500">
                          <strong>Order Time:</strong>{" "}
                          {new Date(item.order_date).toLocaleString()}
                        </p>
                        <div className="flex flex-col text-right w-1/2">
                          <p className="text-sm text-gray-500">
                            <strong>Phone:</strong> {item.phoneNumber}
                          </p>
                          <p className="text-sm text-gray-500">
                            <strong>Address:</strong> {item.address}
                          </p>
                        </div>
                      </div>
                      <hr className="border-t-2 border-gray-300 my-4" />
                    </div>

                    {item.items.map((ord, ordIndex) => (
                      <div key={ordIndex} className="mb-4 flex justify-between">
                        <div>
                          <p className="text-lg font-semibold text-gray-700">
                            {ord.name}
                          </p>
                          <img
                            src={ord.img}
                            alt={ord.name}
                            className="w-20 h-20 object-cover rounded-lg mr-4"
                          />
                        </div>
                        <div className="flex flex-col pt-6 justify-center items-start">
                          <p className="text-sm text-gray-600 text-left">
                            <strong>Sauce:</strong>{" "}
                            {ord.customizations?.sauce || "No Sauce Needed"}
                          </p>
                          <p className="text-sm text-gray-600 text-left">
                            <strong>Cheese:</strong>{" "}
                            {ord.customizations?.cheese || "No Cheese Needed"}
                          </p>
                          <p className="text-sm text-gray-600 text-left">
                            <strong>Veggies:</strong>{" "}
                            {ord.customizations?.veggies?.join(", ") ||
                              "No Veggies Needed"}
                          </p>
                        </div>
                        <div className="flex flex-col pt-6 justify-center items-start">
                          <p className="text-sm text-gray-600">
                            <strong>Quantity:</strong> {ord.quantity}
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Size:</strong> {ord.size}
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Price:</strong> ₹{ord.price}
                          </p>
                        </div>
                      </div>
                    ))}

                    <div className="justify-end mt-4">
                      <div>
                        <strong>Total Price:</strong> ₹
                        {calculateFinalPrice(item.items)}
                      </div>
                      {item.status === "Delivered" ? (
                        <button
                          className="bg-gray-300 text-green-700 p-3 font-bold rounded-xl mt-4"
                          disabled
                        >
                          Delivered
                        </button>
                      ) : (
                        <button
                          className="bg-orange-500 hover:bg-orange-600 p-3 text-white font-bold rounded-xl mt-4"
                          onClick={() => handleTrackOrder(item._id)}
                        >
                          Track your Order
                        </button>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          ))
        )}

        <Link
          to="/"
          className="mt-6 px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition duration-300"
        >
          Back to Main Page
        </Link>
      </div>
    </div>
  );
};

export default MyOrders;
