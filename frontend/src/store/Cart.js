import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userID: "",
  canteenID: "",
  canteenName: "",
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
      state.canteenName = action.payload.canteenName;
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
