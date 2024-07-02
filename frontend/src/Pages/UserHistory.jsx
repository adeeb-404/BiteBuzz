import { useState } from "react";
import { FaClock } from "react-icons/fa6";
import { useLoaderData, useNavigate } from "react-router-dom";

function UserHistory() {
  const data = useLoaderData();
  console.log(data);
  const [totalOrders] = useState(data);
  const navigator = useNavigate();

  function handleClick() {
    navigator("..");
  }

  return (
    <div className="min-h-screen bg-green-50 dark:bg-[#121212] py-10 px-4">
      <button
        className="mb-5 py-2 px-4 bg-green-700 dark:bg-green-600 text-white rounded-lg hover:bg-green-800 dark:hover:bg-green-700 transition duration-300"
        onClick={handleClick}
      >
        Menu
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        <div>
          <h2 className="text-3xl font-semibold text-green-900 dark:text-green-200 mb-4">
            Current Orders
          </h2>
          <div className="bg-white dark:bg-[#181818] p-5 rounded-lg shadow-lg ">
            {totalOrders.currentOrders.length > 0 ? (
              totalOrders.currentOrders[0].orders.map((order) => (
                <div key={order._id}>
                  <div
                    key={order._id}
                    className="flex items-center border-b border-green-200 dark:border-green-700 py-4"
                  >
                    <img
                      src={order.photo}
                      alt={order.itemName}
                      className="w-20 h-20 rounded-lg"
                    />
                    <div className="ml-4 flex-grow">
                      <h3 className="text-2xl text-green-900 dark:text-green-200">
                        {order.itemName}
                      </h3>
                      <p className="text-lg text-green-700 dark:text-green-400">
                        ₹{order.price} x {order.quantity}
                      </p>
                      <p className="text-sm text-green-600 dark:text-green-500">
                        Expected Time: {order.expectedTime}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <FaClock className="text-green-500 dark:text-green-400 mr-2" />
                      <span className="text-green-600 dark:text-green-500">
                        15 mins
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-green-700 dark:text-slate-300">
                No current orders
              </p>
            )}
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-semibold text-green-900 dark:text-green-200 mb-4">
            Order History
          </h2>
          <div className="bg-white dark:bg-[#181818] p-5 rounded-lg shadow-lg">
            {totalOrders.orderHistory.length > 0 ? (
              totalOrders.orderHistory.map((orderGroup) => (
                <div key={orderGroup._id}>
                  {orderGroup.orders.map((order) => (
                    <div
                      key={order._id}
                      className="flex items-center border-b border-green-200 dark:border-green-700 py-4"
                    >
                      <img
                        src={order.photo}
                        alt={order.itemName}
                        className="w-20 h-20 rounded-lg"
                      />
                      <div className="ml-4 flex-grow">
                        <h3 className="text-2xl text-green-900 dark:text-green-200">
                          {order.itemName}
                        </h3>
                        <p className="text-lg text-green-700 dark:text-green-400">
                          ₹{order.price} x {order.quantity}
                        </p>
                        <p className="text-sm text-green-600 dark:text-green-500">
                          Ordered on: {order.expectedTime}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <p className="text-green-700 dark:text-green-400">
                No past orders
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserHistory;
