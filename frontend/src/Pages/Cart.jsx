import React from 'react';
import cartItems from '../assets/cartItems';
import '../index.css';

function Cart() {
  return (
    <div className='p-4'>
        <div>Ordered food:</div>
        <div className='flex overflow-x-scroll gap-5 flex-nowrap custom-scrollbar'>
            {cartItems.map(canteen => 
                canteen.orderedFood.map(item => (
                    <div key={`${canteen.canteenName}-${item.foodName}`} className='min-w-[11rem] min-h-[11rem] bg-slate-400 flex flex-col justify-center items-center rounded-md'>
                        <img src={item.foodImg} alt="Food image" className='h-[6rem] w-[6rem] rounded-md'/>
                        <div>{item.foodName}</div>
                        <div>{canteen.canteenName}</div>
                        <div className='flex flex-row gap-5 justify-between'>
                            <div>{item.quantity}</div>
                            <div>{item.price}</div>
                        </div>
                    </div>
                ))
            )}
        </div>
    </div>
  )
}

export default Cart;
