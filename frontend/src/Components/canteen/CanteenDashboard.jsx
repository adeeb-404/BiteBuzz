/* eslint-disable react/prop-types */
import OrderBox from "./orderBox";
import { useSelector } from "react-redux";

function CanteenDashboard({ index }) {
  const orderItems = useSelector((state) => state.canteen.currOrders);
  if (index === null)
    return (
      <h1 className="py-5 text-green-900 dark:text-green-200 text-center w-[80%] h-full flex items-center justify-center text-[4rem]">
        No order selected
      </h1>
    );

  async function handleOrderComplete(usn) {
    const obj = {
      canteenId: localStorage.getItem("canteen"),
      usn,
    };
    const response = await fetch(
      "http://localhost:5000/api/canteen/orderComplete",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      }
    );
    console.log(response);
    const data = response.json();
    console.log(data);
  }

  return (
    <div className="w-[80%] p-8 dark:bg-[#121212]">
      <div className="py-3">
        <h1 className="font-semibold px-2 text-green-900 dark:text-green-200 text-2xl">
          {orderItems[index].usn}
        </h1>
        <h1 className="font-weight-600 text-green-900 dark:text-green-200">
          ({orderItems[index].name})
        </h1>
      </div>
      <div className="grid grid-cols-5 gap-4">
        {orderItems[index].orders.map((foods, ind) => {
          return <OrderBox key={ind} foods={foods} />;
        })}
      </div>
      <button
        className="bg-green-800 py-3 px-2 rounded-md text-white fixed bottom-5 right-5 hover:bg-green-900"
        onClick={() => handleOrderComplete(orderItems[index].usn)}
      >
        Order Completed
      </button>
    </div>
  );
}

export default CanteenDashboard;
