import { FaStar } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

const menuItems = [
  {
    id: 1,
    name: "Grilled Chicken Sandwich",
    price: 150,
    rating: 4.5,
    img: "https://via.placeholder.com/150",
    description:
      "Juicy grilled chicken sandwich with fresh vegetables and a tangy sauce.",
  },
  {
    id: 2,
    name: "Caesar Salad",
    price: 120,
    rating: 4.0,
    img: "https://via.placeholder.com/150",
    description:
      "Classic Caesar salad with crisp romaine lettuce, parmesan cheese, and croutons.",
  },
  {
    id: 3,
    name: "Veggie Burger",
    price: 100,
    rating: 4.2,
    img: "https://via.placeholder.com/150",
    description:
      "Delicious veggie burger with a hearty patty and fresh toppings.",
  },
  {
    id: 4,
    name: "Fruit Smoothie",
    price: 80,
    rating: 4.8,
    img: "https://via.placeholder.com/150",
    description:
      "Refreshing fruit smoothie made with a blend of seasonal fruits.",
  },
];

function MenuPage() {
  const navigator = useNavigate();

  function handleClick() {
    navigator("..");
  }

  return (
    <div className="min-h-screen bg-green-50 py-10 px-4">
      <div className="flex justify-between mb-5">
        <button
          className="py-2 px-4 bg-green-700 text-white rounded-lg hover:bg-green-800 transition duration-300"
          onClick={handleClick}
        >
          Back
        </button>
        <Link
          className="py-2 px-4 bg-green-700 text-white rounded-lg hover:bg-green-800 transition duration-300"
          to="history"
        >
          History
        </Link>
      </div>
      <h1 className="text-4xl font-bold text-green-900 mb-10 text-center">
        Menu
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="bg-white p-5 rounded-lg shadow-lg hover:shadow-2xl transition duration-300"
          >
            <img
              src={item.img}
              alt={item.name}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-2xl font-semibold text-green-900">
                {item.name}
              </h2>
              <div className="flex items-center">
                <FaStar className="text-yellow-500 mr-1" />
                <span className="text-green-700">{item.rating}</span>
              </div>
            </div>
            <p className="text-lg text-green-700 mb-4">₹{item.price}</p>
            <p className="text-green-600">{item.description}</p>
            <button className="mt-4 w-full py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition duration-300">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuPage;
