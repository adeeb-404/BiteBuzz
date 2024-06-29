import { createSlice } from "@reduxjs/toolkit";

const userInitialState = {
  _id: "",
  usn: "",
  name: "",
  email: "",
  phone: "",
  history: [],
  currOrders: [],
};

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    setUser(state, action) {
      state._id = action.payload._id;
      state.usn = action.payload.usn;
      state.name = action.payload.name;
      state.email = action.payload.emailId;
      state.phone = action.payload.phone;
      state.history = action.payload.history;
      state.currOrders = action.payload.currOrders;
    },
    resetUser(state) {
      state._id = "";
      state.usn = "";
      state.name = "";
      state.email = "";
      state.phone = "";
      state.history = [];
      state.currOrders = [];
    },
  },
});
export default userSlice.reducer;
export const userActions = userSlice.actions;
