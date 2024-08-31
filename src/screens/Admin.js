import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../Images/Pizza-logo.png";

const Admin = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      data.sort((a, b) => new Date(b.order_data[0]?.order_date) - new Date(a.order_data[0]?.order_date));

      setOrders(data);
    } catch (err) {
      setError(`Error fetching orders: ${err.message}`);
      console.error("Something went wrong", err);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ order_status: newStatus })
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      loadData();
    } catch (err) {
      setError(`Error updating order status: ${err.message}`);
      console.error("Something went wrong", err);
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  };
  

  useEffect(() => {
    loadData();
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

      <div className="p-4">
        {error && <p className="text-red-600">{error}</p>}
        <h2 className="text-2xl font-bold mb-4">All Orders</h2>
        <table className="table-auto w-full border-collapse border border-gray-200 mx-2">
          <thead>
            <tr>
              <th className="border border-gray-200 p-2">Order Item</th>
              <th className="border border-gray-200 p-2">User Details</th>
              <th className="border border-gray-200 p-2">Order Status</th>
              <th className="border border-gray-200 p-2">Placed At</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const { order_data } = order;
              return order_data.flatMap((item, index) => [
                <tr key={`${order._id}-${index}`}>
                  <td className="border border-gray-200 p-2">
                    {item.items.map((orderItem, i) => (
                      <div key={i}>{orderItem.name}</div>
                    ))}
                  </td>
                  <td className="border border-gray-200 p-2">
                    <p>Phone: {item.phoneNumber}</p>
                    <p>Address: {item.address}</p>
                  </td>
                  <td className="border border-gray-200 p-2">
                    <select
                      value={item.status || "Placed"}
                      onChange={(e) => handleStatusChange(item._id, e.target.value)}
                      className="border border-gray-300 rounded p-1"
                    >
                      <option value="Placed">Placed</option>
                      <option value="Prepared">Prepared</option>
                      <option value="On the way">On the way</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                  <td className="border border-gray-200 p-2">
                    {item.order_date ? new Date(item.order_date).toLocaleString() : "N/A"}
                  </td>
                </tr>
              ]);
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
