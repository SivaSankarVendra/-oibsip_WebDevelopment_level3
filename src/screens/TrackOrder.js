import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const TrackOrder = () => {
  const { id } = useParams();
  const [orderStatus, setOrderStatus] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchOrderStatus = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/order/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setOrderStatus(data.status);
        } else {
          const message = await response.json();
          setError(message.message || "Failed to fetch order status");
        }
      } catch (err) {
        setError("Failed to fetch order status. Please try again.");
        setTimeout(() => {
          setError(null);
        }, 3000);
      }
    };

    fetchOrderStatus();

  }, [id]);

  const statusList = { Placed: 0, Prepared: 1, "On the way": 2, Delivered: 3 };
  const currentIndex = statusList[orderStatus];

  const getStatusClass = (status) => {
    const index = statusList[status];
    if (index === undefined) return "text-black bg-black";
    if (index === currentIndex) return "text-orange-500 bg-orange-500";
    return index < currentIndex
      ? "text-gray-500 bg-gray-500"
      : "text-black bg-black";
  };

  return (
    <div>
      <Navbar />
      <div className="mt-[70px] mx-auto h-[calc(100vh-70px)] flex items-start justify-center py-10 bg-gray-100 px-3">
        <div className="flex flex-col w-3/4 bg-white p-8 rounded-lg shadow-lg">
          <div className="flex justify-between mb-10 border-b-2 pb-4">
            <div className="text-2xl font-bold">Track Your Order</div>
            <div className="text-lg text-green-600 font-semibold">
              Order ID: {id}
            </div>
          </div>

          {error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <div className="flex flex-col space-y-6">
              {["Placed", "Prepared", "On the way", "Delivered"].map(
                (status, index) => (
                  <div
                    className="flex items-center pb-10 relative"
                    key={status}
                  >
                    <i
                      className={`fas ${
                        status === "Placed"
                          ? "fa-receipt"
                          : status === "Prepared"
                          ? "fa-utensils"
                          : status === "On the way"
                          ? "fa-shipping-fast"
                          : "fa-check-circle"
                      } text-3xl ${
                        getStatusClass(status).split(" ")[0]
                      } mr-8 w-6`}
                    ></i>
                    <div
                      className={`w-4 h-4 ${
                        getStatusClass(status).split(" ")[1]
                      } rounded-full mr-4`}
                    ></div>
                    {index !== 3 && (
                      <div
                        className={`absolute h-full w-[2px] ${
                          getStatusClass(status).split(" ")[1]
                        } translate-x-[63px] translate-y-11 rounded-full mt-1`}
                      ></div>
                    )}
                    <div
                      className={`text-lg ${
                        getStatusClass(status).split(" ")[0]
                      }`}
                    >
                      {status}
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
