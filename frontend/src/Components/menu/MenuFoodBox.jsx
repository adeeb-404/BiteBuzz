import React from 'react'
import { FaStar } from "react-icons/fa6";

function MenuFoodBox({currFood}) {
  return (
    <div className="h-fit w-[10rem] bg-slate-400 flex flex-col items-center gap-1 p-2 rounded-lg">
        <h1 className="text-[1.5rem]">{currFood.foodName}</h1>
        <img className="h-[4rem] w-[4rem] rounded-md"src={currFood.foodImg} />
        <div className="flex justify-between gap-8">
            <div className="flex items-center"> <span className="text-[1.2rem]">₹</span><span className="text-[1.3rem]">{currFood.price}</span></div>
            <div className="text-[1.2rem] flex flex-row items-center gap-1"> <FaStar className="size-[0.8rem]"/> <p>{currFood.rating}</p> </div>
        </div>
        <div className="flex flex-row gap-2 text-md ">
            <div className='bg-green-600 cust-menu-add '>+</div>
            <div> {currFood.quantity} </div>
            <div className='bg-red-600 cust-menu-add'> - </div>
        </div>
    </div>
  )
}

export default MenuFoodBox