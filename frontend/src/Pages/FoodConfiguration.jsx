import { useState, useEffect } from 'react';
import menuItems from '../assets/menuItems';
import FoodConfigBox from '../Components/foodConfig/FoodConfigBox';
import AddFood from '../Components/foodConfig/AddFood';

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
    <div>
      <div className='flex flex-col'>
        <div className='min-h-[20rem] border-b-black'>
          {addedFoods.length ? (
            <div className='flex gap-10 m-4 flex-nowrap overflow-x-scroll custom-scrollbar '>
              {addedFoods.map((food, index) => (
                <FoodConfigBox foods={food} key={index} index={index} removeFood={setTobeRemovedIndex} />
              ))}
            </div>
          ) : (
            <h1 className='text-2xl text-center'>No Food Added</h1>
          )}
        </div>
        <div className='flex gap-10 flex-nowrap overflow-x-scroll min-h-[20rem]'>
          {allFoods.map((food, index) => (
            <AddFood foods={food} key={index} index={index} addFood={setClickedId} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FoodConfiguration;
