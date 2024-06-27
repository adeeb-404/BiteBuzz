import React, { useState } from 'react';
import menuItems from '../../assets/menuItems';

function FoodConfigBox({ foods, index,removeFood }) {
  const [quant, setQuant] = useState(1);

  function handleAdd() {
    setQuant(prev => prev + 1);
    console.log(quant); 
  }

  function handleMinus() {
      if(quant === 1){
        setQuant(prev => prev - 1);
          handleRemove();
      }
      else setQuant(prev => prev - 1);
  }

  function handleRemove(){
    removeFood(index);
  }

  return (
    <div className='flex flex-row gap-10 '>
      <div className='bg-slate-300 h-[11rem] w-[11rem] flex flex-col justify-center items-center rounded-lg'>
        <h1>{foods.foodName}</h1>
        <img src={foods.foodImg} alt="Food image" className='h-[6rem] w-[6rem] rounded-md' />
        <p>{foods.price}</p>
        <div className='flex gap-5'>
          <button onClick={handleAdd}> + </button>
          <p>{quant}</p>
          <button onClick={handleMinus}> - </button>
        </div>
        {/* <button onClick={handleRemove}>Remove food</button> */}
      </div>
    </div>
  );
}

export default FoodConfigBox;
