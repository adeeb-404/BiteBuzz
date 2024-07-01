const cart = {
  userID: "6665995d5271d3c957571d5e",
  canteenID: "665e957182a6e5f22e0c3390",
  arrivalTime: "12.30 pm",
  price: 100,
  orders: [
    {
      dishName: "Idly",
      quantity: 2,
      photo:
        "https://media.istockphoto.com/id/864607392/photo/image-of-a-glass-of-tea-in-street-market.webp?b=1&s=170667a&w=0&k=20&c=rOYheUoYiyQojSZidQLVcpQaWt9H8fnORYsWUMm8uZY=",
      rating: {
        currRating: 4.9,
        noOfRating: 10,
      },
    },
    {
      dishName: "Masala Dosa",
      photo:
        "https://www.cookwithmanali.com/wp-content/uploads/2020/05/Masala-Dosa.jpg",
      description:
        "A crispy rice pancake filled with a spicy potato filling. Served with chutney and sambar.",
      price: 50,
      preparationTime: 10,
      rating: {
        currRating: 4.5,
        noOfRating: 25,
      },
    },
  ],
};

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userID: "",
  canteenID: "",
  arrivalTime: "",
  price: 0,
  orders: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    initialize: (state, action) => {
      state.userID = action.payload.userID;
      state.canteenID = action.payload.canteenID;
      state.arrivalTime = "";
      state.price = 0;
      state.orders = [];
    },
    addOrder: (state, action) => {
      let found = false;
      for (let ele of state.orders) {
        if (ele.dishName === action.payload.dishName) {
          ele.quantity += 1;
          found = true;
          break;
        }
      }
      if (!found) {
        state.orders.push({
          ...action.payload,
          quantity: 1,
        });
      }
      state.price += action.payload.price;
    },
    removeOrder: (state, action) => {
      let updatedOrders = state.orders
        .map((ele) => {
          if (ele.dishName === action.payload.dishName) {
            ele.quantity -= 1;
          }
          return ele;
        })
        .filter((ele) => ele.quantity > 0);

      state.orders = updatedOrders;
      state.price -= action.payload.price;
    },
    setArrivalTime: (state, action) => {
      state.arrivalTime = action.payload;
    },
  },
});

export const {
  initialize,
  addOrder,
  removeOrder,
  updateOrderQuantity,
  setArrivalTime,
} = cartSlice.actions;

export default cartSlice.reducer;
