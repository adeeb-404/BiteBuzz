import { useState } from "react";
import { FaClock } from "react-icons/fa6";
import { useLoaderData, useNavigate } from "react-router-dom";

const pastOrders = [
  {
    id: 1,
    name: "Fruit Smoothie",
    price: 80,
    quantity: 3,
    img: "https://via.placeholder.com/150",
    date: "2023-05-10",
  },
  {
    id: 2,
    name: "Veggie Burger",
    price: 100,
    quantity: 1,
    img: "https://via.placeholder.com/150",
    date: "2023-04-22",
  },
];

function UserHistory() {
  const data = useLoaderData();
  console.log(data);
  const [current] = useState(data.currentOrders);
  const [history] = useState(pastOrders);

  const navigator = useNavigate();

  function handleClick() {
    navigator("..");
  }

  return (
    <div className="min-h-screen bg-green-50 py-10 px-4">
      <button
        className="mb-5 py-2 px-4 bg-green-700 text-white rounded-lg hover:bg-green-800 transition duration-300"
        onClick={handleClick}
      >
        Menu
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        <div>
          <h2 className="text-3xl font-semibold text-green-900 mb-4">
            Current Orders
          </h2>
          <div className="bg-white p-5 rounded-lg shadow-lg">
            {current.length > 0 ? (
              current.map((order) => (
                <div
                  key={order._id}
                  className="flex items-center border-b border-green-200 py-4"
                >
                  <img
                    src={order.photo}
                    alt={order.itemName}
                    className="w-20 h-20 rounded-lg"
                  />
                  <div className="ml-4 flex-grow">
                    <h3 className="text-2xl text-green-900">
                      {order.itemName}
                    </h3>
                    <p className="text-lg text-green-700">
                      ₹{order.price} x {order.quantity}
                    </p>
                    <p className="text-sm text-green-600">
                      Status: TO BE FIXED
                    </p>
                  </div>
                  <div className="flex items-center">
                    <FaClock className="text-green-500 mr-2" />
                    <span className="text-green-600">15 mins</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-green-700">No current orders</p>
            )}
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-semibold text-green-900 mb-4">
            Order History
          </h2>
          <div className="bg-white p-5 rounded-lg shadow-lg">
            {history.length > 0 ? (
              history.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center border-b border-green-200 py-4"
                >
                  <img
                    src={order.img}
                    alt={order.itemName}
                    className="w-20 h-20 rounded-lg"
                  />
                  <div className="ml-4 flex-grow">
                    <h3 className="text-2xl text-green-900">
                      {order.itemName}
                    </h3>
                    <p className="text-lg text-green-700">
                      ₹{order.price} x {order.quantity}
                    </p>
                    <p className="text-sm text-green-600">
                      Ordered on: {order.date}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-green-700">No past orders</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserHistory;
