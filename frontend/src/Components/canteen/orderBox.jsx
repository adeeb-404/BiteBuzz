/* eslint-disable react/prop-types */
import { FaClock } from "react-icons/fa6";

function OrderBox({ foods }) {
  return (
    <div className="bg-green-200 w-[12rem] h-[12rem] flex items-center flex-col rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg border-2 border-green-950">
      <h1 className="pb-1 text-[1.5rem] font-semibold text-green-900">
        {foods.foodName}
      </h1>
      <img
        src={foods.foodImg}
        alt={foods.foodName}
        className="h-[5rem] w-[5rem] rounded-md"
      />
      <div className="text-[1.2rem] text-green-700">
        Quantity: {foods.quantity}
      </div>
      <div className="flex items-center justify-around w-full text-green-900">
        <div className="text-[1.2rem]">₹ {foods.price}</div>
        <div className="text-[1.2rem] flex items-center">
          <FaClock className="mr-1 text-green-500" />
          <div>{foods.preparationTime}</div>
        </div>
      </div>
    </div>
  );
}

export default OrderBox;
