import { createSlice } from "@reduxjs/toolkit";

const canteenInitialState = {
  Description: "",
  Name: "",
  currOrders: [],
  emailID: "",
  history: [],
  menu: [],
  owner_name: "",
  phoneNo: "",
  photos: [],
  rating: 0,
  _id: "",
};

const canteenSlice = createSlice({
  name: "canteen",
  initialState: canteenInitialState,
  reducers: {
    setUser(state, action) {
      state.Description = action.payload.Description;
      state.Name = action.payload.Name;
      state.currOrders = action.payload.currOrders;
      state.emailID = action.payload.emailID;
      state.history = action.payload.history;
      state.menu = action.payload.menu;
      state.owner_name = action.payload.owner_name;
      state.phoneNo = action.payload.phoneNo;
      state.photos = action.payload.photos;
      state.rating = action.payload.rating;
      state._id = action.payload.id;
    },
    resetUser(state) {
      state.Description = "";
      state.Name = "";
      state.currOrders = [];
      state.emailID = "";
      state.history = [];
      state.menu = [];
      state.owner_name = "";
      state.phoneNo = "";
      state.photos = [];
      state.rating = 0;
      state._id = "";
    },
  },
});
export default canteenSlice;
export const userActions = canteenSlice.actions;
