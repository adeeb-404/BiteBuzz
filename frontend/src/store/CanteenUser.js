import { createSlice } from "@reduxjs/toolkit";

const canteenInitialState = {
  description: "",
  name: "",
  currOrders: [],
  email: "",
  history: [],
  menu: [],
  canteenName: "",
  phone: "",
  photos: [],
  rating: 0,
  _id: "",
};

const canteenSlice = createSlice({
  name: "canteen",
  initialState: canteenInitialState,
  reducers: {
    setUser(state, action) {
      state.description = action.payload.description;
      state.name = action.payload.name;
      state.currOrders = action.payload.currOrders;
      state.email = action.payload.email;
      state.history = action.payload.history;
      state.menu = action.payload.menu;
      state.canteenName = action.payload.canteenName;
      state.phone = action.payload.phone;
      state.photos = action.payload.photos;
      state.rating = action.payload.rating;
      state._id = action.payload.id;
    },
    setCurrOrder(state, action) {
      state.currOrders = action.payload.currOrders;
    },
    resetUser(state) {
      state.description = "";
      state.name = "";
      state.currOrders = [];
      state.email = "";
      state.history = [];
      state.menu = [];
      state.canteenName = "";
      state.phone = "";
      state.photos = [];
      state.rating = 0;
      state._id = "";
    },
  },
});
export default canteenSlice.reducer;
export const userActions = canteenSlice.actions;
