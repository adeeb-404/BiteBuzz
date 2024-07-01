import React, { useEffect, useState } from 'react';
import BackButton from '../Customs/BackButton';

const orderedDetail = {
  userID: '665dd595c3c0655ec83935f1',
  canteenID: '665e957182a6e5f22e0c3390',
  canteenName: 'Red canteen',
  arrivalTime: '',
  price: 260,
  orders: [
    {
      rating: {
        currRating: 4.9,
        noOfRating: 10,
      },
      _id: '6682c0cb1f0737d5bde816d8',
      itemID: 0,
      quantity: 1,
      photo:
        'https://media.istockphoto.com/id/864607392/photo/image-of-a-glass-of-tea-in-street-market.webp?b=1&s=170667a&w=0&k=20&c=rOYheUoYiyQojSZidQLVcpQaWt9H8fnORYsWUMm8uZY=',
      description:
        'orem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, accusamus. Labore sequi nulla eum, atque tempora voluptate quo dignissimos rerum, itaque alias nam nisi reprehenderit odit aut eligendi dolor quisquam.',
      dishName: 'Tea',
      price: 20,
      preparationTime: 5,
    },
    {
      rating: {
        currRating: 4.8,
        noOfRating: 40,
      },
      _id: '6682c0cb1f0737d5bde816d9',
      itemID: 4,
      dishName: 'Paneer Butter Masala',
      quantity: 2,
      photo:
        'https://rakskitchen.net/wp-content/uploads/2012/07/paneer-butter-masala-recipe-500x500.jpg',
      description:
        'Paneer cubes cooked in a rich and creamy tomato-based gravy with butter and spices.',
      price: 120,
      preparationTime: 15,
    },
  ],
};

function Cart() {
  const [showModal, setShowModal] = useState(false);
  const [newArrivalTime, setNewArrivalTime] = useState('');
  const [newOrderDetail, setNewOrderDetail] = useState(orderedDetail);

  function handleConfirmClick () {
    setShowModal(true);
  };

  function handleCloseModal(){
    setShowModal(false);
  };

  function handleConfirmOrder () {
    // Update arrivalTime in newOrderDetail
    const updatedOrderDetail = {
      ...newOrderDetail,
      arrivalTime: newArrivalTime,
    };

    // Update newOrderDetail state
    setNewOrderDetail(updatedOrderDetail);

    // Close the modal
    setShowModal(false);
  };

  useEffect(() =>{
    console.log(newOrderDetail);
  },[newOrderDetail])

  return (
    <div className="relative min-h-screen w-screen flex flex-col items-center py-2 bg-green-50 dark:bg-[#121212]">
      <div className='flex items-center w-full'>
        <BackButton className='mb-5 py-2 px-4 inline bg-green-700 dark:bg-green-600 text-white rounded-lg hover:bg-green-800 dark:hover:bg-green-700 transition duration-300 self-start'>
          Back
        </BackButton>
      </div>
      <h1 className='text-4xl self-center font-bold text-green-900 dark:text-green-200 mb-10'>
        Ordered from {orderedDetail.canteenName}
      </h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        {orderedDetail.orders.map((food, index) => (
          <div
            key={index}
            className='bg-white dark:bg-[#181818] w-[16rem] flex items-center rounded-lg shadow-lg overflow-hidden transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl'
          >
            <img
              src={food.photo}
              alt={food.dishName}
              className='h-[12rem] w-[12rem] object-cover'
            />
            <div className='p-4'>
              <h2 className='text-xl font-bold text-green-900 dark:text-green-200 mb-2'>
                {food.dishName}
              </h2>
              <p className='text-green-700 dark:text-green-300'>
                Price: ₹{food.price}
              </p>
              <p className='text-green-700 dark:text-green-300'>
                Quantity: {food.quantity}
              </p>
              <p className='text-green-700 dark:text-green-300'>
                Preparation Time: {food.preparationTime} minutes
              </p>
            </div>
          </div>
        ))}
      </div>
      <p className='text-2xl font-semibold text-green-900 dark:text-green-200 p-5'>
        Total price : ₹{orderedDetail.price}
      </p>
      <div className='flex justify-between w-full h-fit overflow-hidden custom-scrollbar px-4 py-4'>
        <div> </div>
        <button
          onClick={handleConfirmClick}
          className='bg-green-700 text-white text-xl px-6 py-2 rounded-lg hover:bg-green-700 transition duration-300'
        >
          Confirm
        </button>
      </div>

      {showModal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
          <div
            className='relative bg-white dark:bg-[#181818] p-6 rounded-lg shadow-lg z-60'
            style={{
              boxShadow: '0 0 6px 3px white',
            }}
          >
            <h2 className='text-xl font-bold text-green-900 dark:text-green-200 mb-4'>
              Confirm your order
            </h2>
            <label className='text-green-700 dark:text-green-300 mb-2 block'>
              Arrival Time:
            </label>
            <input
              type='text'
              value={newArrivalTime}
              onChange={(e) => setNewArrivalTime(e.target.value)}
              className='w-full p-2 mb-4 border border-green-300 rounded'
            />
            <div className='flex justify-end gap-4'>
              <button
                onClick={handleCloseModal}
                className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300'
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmOrder}
                className='bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition duration-300'
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
