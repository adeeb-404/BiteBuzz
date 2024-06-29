import React from 'react';

function AddFood({ foods, index, addFood }) {
  function handleFoodClick(index) {
    addFood(index);
  }

  return (
    <div className="bg-green-100 p-4 min-h-[13rem] h-fit min-w-[13rem] w-fit m-3 flex justify-center items-center flex-col rounded-lg shadow-lg">
      <h1 className="text-xl font-semibold text-green-900">{foods.foodName}</h1>
      <img src={foods.foodImg} alt="Food image" className="h-[5rem] w-[5rem] rounded-md my-2 border-green-300 border-2" />
      <p className="text-green-700">{foods.price}</p>
      <button
        className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition duration-300 mt-2"
        onClick={() => handleFoodClick(index)}
      >
        Add Food
      </button>
    </div>
  );
}

export default AddFood;
