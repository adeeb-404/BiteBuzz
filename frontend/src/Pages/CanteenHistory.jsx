import React from 'react'

const orderedDetail = [{
    studentName:"Adeeb",
    orderedFood:[{
        foodName:"Idli",
        price:30,
        quantity:2,
        orderedTime:"11:00AM",
        foodImg:"https://www.vegrecipesofindia.com/wp-content/uploads/2021/06/idli-recipe-4-500x500.jpg",
    },
    {
        foodName:"Vada",
        price:20,
        quantity:3,
        orderedTime:"11:00AM",
        foodImg:"https://c.ndtvimg.com/2023-09/u113o4r_medu-vada_625x300_06_September_23.jpg",
    }],
},
{
    studentName:"John",
    orderedFood:[{
        foodName:"Pizza",
        price:50,
        quantity:1,
        orderedTime:"11:00AM",
        foodImg:"https://content.jdmagicbox.com/comp/mysore/w1/0821px821.x821.190913203137.a3w1/catalogue/ovenstory-pizza-vijaynagar-1st-stage-mysore-h9wuaxkcc7.jpg",
    },
    {
        foodName:"Burger",
        price:40,
        quantity:4,
        orderedTime:"11:00AM",
        foodImg:"https://www.foodandwine.com/thmb/DI29Houjc_ccAtFKly0BbVsusHc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/crispy-comte-cheesburgers-FT-RECIPE0921-6166c6552b7148e8a8561f7765ddf20b.jpg",
    }],
},
{
    studentName:"Alice",
    orderedFood:[{
        foodName:"Fries",
        price:15,
        quantity:5,
        orderedTime:"11:00AM",
        foodImg:"https://www.foodandwine.com/thmb/DI29Houjc_ccAtFKly0BbVsusHc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/crispy-comte-cheesburgers-FT-RECIPE0921-6166c6552b7148e8a8561f7765ddf20b.jpg",
    },]
}]
function CanteenHistory() {
  return (
    <div>
        <h1>History : </h1>
        <div className='flex flex-col '>
            {orderedDetail.map((student, index) => {
                console.log(student);
                return(
                    <div className=''>
                        {student.orderedFood.map((foods, index) => {
                            return(
                                <div className='bg-green-100 min-h-[8rem] h-fit min-w-[15rem] w-max flex p-4 gap-3 m-10'>
                                    <img src={foods.foodImg} alt="Food Image" className='h-[6rem] w-[6rem]'/>
                                    <div>
                                        <h2>Ordered by : {student.studentName}</h2>
                                        <p>Price : ₹{foods.price}</p>
                                        <p>Quantity : {foods.quantity}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default CanteenHistory