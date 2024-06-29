import React, { useState } from 'react';
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

function FoodConfigBox({ foods, index, removeFood }) {
  const [quant, setQuant] = useState(1);

  function handleAdd() {
    setQuant(prev => prev + 1);
  }

  function handleMinus() {
    if (quant === 1) {
      handleRemove();
    } else {
      setQuant(prev => prev - 1);
    }
  }

  function handleRemove() {
    removeFood(index);
  }

  return (
    <div className="bg-green-100 p-4 min-h-[13rem] h-fit min-w-[13rem] w-fit m-3 flex justify-center items-center flex-col rounded-lg shadow-lg">
      <h1 className="text-xl font-semibold text-green-900">{foods.foodName}</h1>
      <img src={foods.foodImg} alt="Food image" className="h-24 w-24 rounded-md my-2 border-green-300 border-2" />
      <p className="text-green-700">{foods.price}</p>
      <div className="flex gap-5 mt-2">
        <button
          className="bg-green-700 text-white px-2 py-1 h-[2rem] w-[2rem] rounded hover:bg-green-800 transition duration-300"
          onClick={handleAdd}
        >
          <FaPlus />
        </button>
        <p className="text-green-900">{quant}</p>
        <button
          className="bg-green-700 text-white px-2 py-1 h-[2rem] w-[2rem]  rounded hover:bg-green-800 transition duration-300"
          onClick={handleMinus}
        >
          <FaMinus />
        </button>
      </div>
    </div>
  );
}

export default FoodConfigBox;
