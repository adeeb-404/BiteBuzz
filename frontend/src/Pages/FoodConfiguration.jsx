import { useState, useEffect } from "react";
import menuItems from "../assets/menuItems";
import FoodConfigBox from "../Components/foodConfig/FoodConfigBox";
import AddFood from "../Components/foodConfig/AddFood";

function FoodConfiguration() {
  const [addedFoods, setAddedFoods] = useState([]);
  const [allFoods, setAllFoods] = useState(menuItems);
  const [clickedId, setClickedId] = useState(null);
  const [tobeRemovedIndex, setTobeRemovedIndex] = useState(null);

  useEffect(() => {
    if (clickedId !== null) {
      const newMenuList = allFoods.filter((_, id) => id !== clickedId);
      const newFood = allFoods.find((_, id) => id === clickedId);

      setAllFoods(newMenuList);
      setAddedFoods((prevAddedFoods) => [...prevAddedFoods, newFood]);
      setClickedId(null); // Reset clickedId after processing
    }
  }, [clickedId, allFoods]);

  useEffect(() => {
    if (tobeRemovedIndex !== null) {
      const removedFood = addedFoods.find((_, id) => id === tobeRemovedIndex);
      const newMenuList = addedFoods.filter((_, id) => id !== tobeRemovedIndex);

      setAddedFoods(newMenuList);
      setAllFoods((prevAllFoods) => [...prevAllFoods, removedFood]);
      setTobeRemovedIndex(null);
    }
  }, [tobeRemovedIndex, addedFoods]);

  return (
    <div className="min-h-screen bg-green-50 py-10 px-4">
      <h1 className="text-4xl font-bold text-green-900 mb-10 text-center">
        Food Configuration
      </h1>
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Added Foods */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-green-900 mb-4">Added Foods</h2>
          {addedFoods.length ? (
            <div className="flex gap-10 overflow-x-scroll h-fit custom-scrollbar">
              {addedFoods.map((food, index) => (
                <FoodConfigBox
                  foods={food}
                  key={index}
                  index={index}
                  removeFood={setTobeRemovedIndex}
                />
              ))}
            </div>
          ) : (
            <h1 className="text-2xl text-center">No Food Added</h1>
          )}
        </div>

        {/* Available Foods */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-green-900 mb-4">Available Foods</h2>
          <div className="flex gap-10 overflow-x-scroll custom-scrollbar">
            {allFoods.map((food, index) => (
              <AddFood
                foods={food}
                key={index}
                index={index}
                addFood={setClickedId}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodConfiguration;
