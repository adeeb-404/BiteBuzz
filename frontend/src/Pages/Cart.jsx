import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../Customs/BackButton";
import { useSelector } from "react-redux";

function Cart() {
  const [showModal, setShowModal] = useState(false);
  const [arrivalTime, setArrivalTime] = useState("");
  const cart = useSelector((state) => state.cart);
  const [orderedDetail] = useState(cart);
  const [newOrderDetail, setNewOrderDetail] = useState(cart);
  const navigator = useNavigate();
  const canteenId = useParams().canteenId;

  function backButtonHandler() {
    navigator("..");
  }

  function handleConfirmClick() {
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  async function handleConfirmOrder() {
    setNewOrderDetail((prev) => {
      return { ...prev, arrivalTime };
    });

    setShowModal(() => false);

    const response = await fetch("http://localhost:5000/api/user/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newOrderDetail),
    });
    console.log(response);
    navigator(`/user/${canteenId}/history`);
  }

  useEffect(() => {
    console.log(newOrderDetail);
  }, [newOrderDetail]);

  return (
    <div className="relative min-h-screen w-screen flex flex-col items-center py-2 bg-green-50 dark:bg-[#121212]">
      <div className="flex items-center w-full">
        <BackButton
          className="mb-5 py-2 px-4 inline bg-green-700 dark:bg-green-600 text-white rounded-lg hover:bg-green-800 dark:hover:bg-green-700 transition duration-300 self-start"
          onClick={backButtonHandler}
        >
          Back
        </BackButton>
      </div>
      <h1 className="text-4xl self-center font-bold text-green-900 dark:text-green-200 mb-10">
        Ordered from {orderedDetail.canteenName}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {orderedDetail.orders.map((food, index) => (
          <div
            key={index}
            className="bg-white dark:bg-[#181818] flex items-center rounded-lg shadow-lg overflow-hidden transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl"
          >
            <img
              src={food.photo}
              alt={food.dishName}
              className="h-[12rem] w-[12rem] object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold text-green-900 dark:text-green-200 mb-2">
                {food.dishName}
              </h2>
              <p className="text-green-700 dark:text-green-300">
                Price: ₹{food.price}
              </p>
              <p className="text-green-700 dark:text-green-300">
                Quantity: {food.quantity}
              </p>
              <p className="text-green-700 dark:text-green-300">
                Preparation Time: {food.preparationTime} minutes
              </p>
            </div>
          </div>
        ))}
      </div>
      <p className="text-2xl font-semibold text-green-900 dark:text-green-200 p-5">
        Total price : ₹{orderedDetail.price}
      </p>
      <div className="flex justify-between w-full h-fit overflow-hidden custom-scrollbar px-4 py-4">
        <div> </div>
        <button
          onClick={handleConfirmClick}
          className="bg-green-700 text-white text-xl px-6 py-2 rounded-lg hover:bg-green-700 transition duration-300"
        >
          Confirm
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div
            className="relative bg-white dark:bg-[#181818] p-6 rounded-lg shadow-lg z-60"
            style={{
              boxShadow: "0 0 6px 3px white",
            }}
          >
            <h2 className="text-xl font-bold text-green-900 dark:text-green-200 mb-4">
              Confirm your order
            </h2>
            <label className="text-green-700 dark:text-green-300 mb-2 block">
              Arrival Time:
            </label>
            <input
              type="time"
              value={arrivalTime}
              onChange={(e) => setArrivalTime(e.target.value)}
              className="w-full p-2 mb-4 border border-green-300 rounded"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={handleCloseModal}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmOrder}
                className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition duration-300"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
