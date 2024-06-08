import React from 'react'
import orderItems from '../../assets/orderItems';
import { FaClock } from "react-icons/fa6";

function OrderBox({foods}) {
    console.log(foods);
  return (
    <div className='bg-slate-500 w-[12rem] h-[12rem] flex items-center flex-col rounded-lg'> 
        <h1 className='pb-1 text-[1.5rem] font-semibold'>{foods.foodName}</h1>
        <img src={foods.foodImg} className='h-[5rem] w-[5rem] rounded-md' />
        <div className='text-[1.2rem]'>Quantity : {foods.quantity}</div>
        <div className='flex items-center justify-around w-full'>
            <div className='text-[1.2rem]'> ₹ {foods.price}</div>
            <div className='text-[1.2rem] flex items-center'><FaClock className='size-5'/> <div>{foods.preparationTime}</div></div>
        </div>
    </div>
  )
}

export default OrderBox