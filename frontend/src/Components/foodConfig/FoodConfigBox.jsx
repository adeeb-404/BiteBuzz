import React,{useState} from 'react'
import menuItems from '../../assets/menuItems'

function FoodConfigBox({foods,index}) {
    // console.log(foods)

    // function addFood(){
    //     console.log("hi");
    // }

    const [quant, setQuant] = useState(foods.quantity)

    function handleAdd(){
        setQuant[quant+1];
        console.log(index);
    }

    function handleMinus(){
        setQuant[quant-1];
    }

  return (
    <div className='flex flex-row gap-10 '>
        <div className='bg-slate-300 h-[11rem] w-[11rem] flex flex-col justify-center items-center rounded-lg'>
            <h1>{foods.fooName}</h1>
            <img src={foods.foodImg} alt="Food image" className='h-[6rem] w-[6rem] rounded-md'/>
            <p> {foods.price}</p>
            <div className='flex gap-5'>
                <button onClick={() => handleAdd}> + </button>
                <p>{quant}</p>
                <button onClick={() => handleMinus}> - </button>
            </div>
        </div>
    </div>
  )
}

export default FoodConfigBox