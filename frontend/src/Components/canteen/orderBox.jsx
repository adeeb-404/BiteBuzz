/* eslint-disable react/prop-types */

function OrderBox({ foods }) {
  return (
    <div className="bg-green-200 dark:bg-[#282828] w-[12rem] h-[12rem] flex items-center flex-col rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg border-2 border-green-950 dark:border-green-900">
      <h1 className="pb-1 text-[1.5rem] font-semibold text-green-900 dark:text-green-200">
        {foods.itemName}
      </h1>
      <img
        src={foods.photo}
        alt={foods.itemName}
        className="h-[5rem] w-[5rem] rounded-md"
      />
      <div className="text-[1.2rem] text-green-700 dark:text-green-400">
        Quantity: {foods.quantity}
      </div>
      <div className="flex items-center justify-around w-full text-green-900 dark:text-green-200">
        <div className="text-[1.2rem]">₹ {foods.price}</div>
      </div>
    </div>
  );
}

export default OrderBox;
