import React,{useState} from 'react'
import menuItems from '../../assets/menuItems'

function AddFood({foods,index,addFood}) {
    // console.log(foods);
    // const [quant, setQuant] = useState(foods.quantity);

    function handleFoodClick(index){
        // console.log(index);
        addFood(index);
    }

  return (
    <div>
        <div className='bg-slate-400 flex justify-center items-center h-[11rem] w-[11rem] flex-col rounded-lg'>
            <h1>{foods.foodName}</h1>
            <img src={foods.foodImg} className='h-[6rem] w-[6rem] rounded-md'></img>
            <p>{foods.price}</p>
            <button onClick={() => handleFoodClick(index)}>Add food</button>
        </div>
    </div>
  )
}

export default AddFood