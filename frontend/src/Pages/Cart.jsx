import { FaTrashAlt } from "react-icons/fa";
import { useState } from "react";

const cartItems = [
  {
    id: 1,
    name: "Grilled Chicken Sandwich",
    price: 150,
    quantity: 2,
    img: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Caesar Salad",
    price: 120,
    quantity: 1,
    img: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Fruit Smoothie",
    price: 80,
    quantity: 3,
    img: "https://via.placeholder.com/150",
  },
];

function Cart() {
  const [items, setItems] = useState(cartItems);

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const getTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="flex flex-col items-center bg-green-50 min-h-screen py-10">
      <h1 className="text-4xl font-bold text-green-900 mb-10">Your Cart</h1>
      <h3 className="text-xl font-bold text-green-900 mb-4">Canteen Name</h3>
      <div className="w-full max-w-4xl flex flex-col bg-white shadow-lg rounded-lg p-5 border-2 border-green-300">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center border-b border-green-200 p-4 hover:bg-green-50 "
          >
            <img
              src={item.img}
              alt={item.name}
              className="w-20 h-20 rounded-lg"
            />
            <div className="ml-4 flex-grow">
              <h2 className="text-2xl text-green-900">{item.name}</h2>
              <p className="text-lg text-green-700">
                ₹{item.price} x {item.quantity}
              </p>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 hover:text-red-700 transition duration-300 ease-in-out"
              >
                <FaTrashAlt className="text-2xl" />
              </button>
            </div>
          </div>
        ))}
        <div className="flex justify-between items-center py-4">
          <h2 className="text-2xl font-bold text-green-900">
            Total: ₹{getTotal()}
          </h2>
          <button className="bg-green-500 text-white text-lg px-6 py-2 rounded-lg hover:bg-green-700 transition duration-300 ease-in-out">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
