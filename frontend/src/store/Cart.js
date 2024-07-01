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
      const index = state.orders.findIndex(
        (ele) => ele.dishName === action.payload.dishName
      );
      if (index === -1) {
        action.payload.quantity = 1;
        state.orders.push(action.payload);
        state.price += action.payload.price;
      } else {
        state.orders[index].quantity++;
        state.price += action.payload.price;
      }
    },
    removeOrder: (state, action) => {
      const index = state.orders.findIndex(
        (order) => order.dishName === action.payload.dishName
      );
      if (index !== -1) {
        state.price -=
          state.orders[index].price * (state.orders[index].quantity || 1);
        state.orders.splice(index, 1);
      }
    },
    updateOrderQuantity: (state, action) => {
      const { dishName, quantity } = action.payload;
      const order = state.orders.find((order) => order.dishName === dishName);
      if (order) {
        const difference = quantity - order.quantity;
        order.quantity = quantity;
        state.price += order.price * difference;
      }
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
