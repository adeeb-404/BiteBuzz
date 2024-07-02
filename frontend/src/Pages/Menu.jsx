/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from "react";
import { FaStar, FaPlus, FaMinus } from "react-icons/fa";
import { Link, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { initialize, addOrder, removeOrder } from "../store/Cart.js";
import { userActions } from "../store/Studentuser.js";
function MenuPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const canteenId = useParams().canteenId;
  const canteenName = useSelector(
    (state) => state.canteenInfo.data.find((ele) => ele._id === canteenId)?.name
  );

  function handleClick() {
    navigate("..");
  }

  const doFetch = !useSelector((state) => state.user.name);

  useEffect(() => {
    async function getDashboard() {
      const userId = localStorage.getItem("student");
      const response = await fetch(`http://localhost:5000/api/user/${userId}`);
      const data = await response.json();
      console.log(data);
      dispatch(userActions.setUser(data));
    }
    if (doFetch) getDashboard();
  }, [dispatch, doFetch]);

  useEffect(() => {
    dispatch(
      initialize({
        userID: localStorage.getItem("student"),
        canteenID: canteenId,
        canteenName: canteenName,
      })
    );
  }, [dispatch, canteenId, canteenName]);

  const initialMenuItems = useLoaderData().menu;
  const [menuItems, setMenuItems] = useState(initialMenuItems);

  function handleAdd(_item) {
    if (_item.quantity == 0) {
      alert("Out of stock");
      return;
    }
    dispatch(addOrder(_item));
    setMenuItems((prevItems) =>
      prevItems.map((item) =>
        item.dishName === _item.dishName
          ? {
              ...item,
              userQuantity: item.userQuantity ? item.userQuantity + 1 : 1,
              quantity: item.quantity - 1,
            }
          : item
      )
    );
  }

  function handleRemove(_item) {
    dispatch(removeOrder(_item));
    setMenuItems((prevItems) =>
      prevItems.map((item) =>
        item.dishName === _item.dishName && item.userQuantity > 0
          ? {
              ...item,
              userQuantity: item.userQuantity - 1,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  }

  return (
    <div className="min-h-screen bg-green-50 py-10 px-4 dark:bg-[#121212]">
      <div className="flex justify-between mb-5">
        <button
          className="py-2 px-4 bg-green-700  text-white rounded-lg hover:bg-green-800 transition duration-300"
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
      <h1 className="text-4xl font-bold text-green-900 mb-10 text-center dark:text-green-200">
        Menu
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {menuItems.map((item) => (
          <div
            key={item._id}
            className="bg-white dark:bg-[#15292B] p-5 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 flex flex-col justify-between"
          >
            <div>
              <img
                src={item.photo}
                alt={item.dishName}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-2xl font-semibold text-green-900 dark:text-green-200">
                  {item.dishName}
                </h2>
                <div className="flex items-center">
                  <FaStar className="text-yellow-500 mr-1" />
                  <span className="text-green-700 dark:text-green-400">
                    {item.rating.currRating}
                  </span>
                </div>
              </div>
              <p className="text-lg text-green-700 dark:text-green-400 mb-4">
                ₹{item.price}
              </p>
              <p className="text-green-600 dark:text-slate-200">
                {item.description}
              </p>
            </div>
            {!item.userQuantity ? (
              <button
                className="mt-4 w-full py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition duration-300"
                onClick={() => handleAdd(item)}
              >
                Add to Cart
              </button>
            ) : (
              <div className="flex flex-row justify-center gap-8">
                <button
                  className="bg-green-700 hover:bg-green-800 h-8 w-10 flex justify-center items-center rounded-sm transition duration-300"
                  onClick={() => handleAdd(item)}
                >
                  <FaPlus className="size-3 text-white" />
                </button>
                <p className="text-black dark:text-white">
                  {item.userQuantity}
                </p>
                <button
                  className="bg-green-700 hover:bg-green-800 h-8 w-10 flex justify-center items-center rounded-sm transition duration-300"
                  onClick={() => handleRemove(item)}
                >
                  <FaMinus className="size-3 text-white" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <Link to="cart">
        <button className="fixed bottom-5 right-4 bg-green-700 hover:bg-green-800 text-white px-5 py-2 mr-4 rounded-md ">
          Order Now
        </button>
      </Link>
    </div>
  );
}

export default MenuPage;
