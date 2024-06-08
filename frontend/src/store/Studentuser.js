import { createSlice } from "@reduxjs/toolkit";

const userInitialState = {
  _id: "",
  USN: "",
  name: "",
  emailID: "",
  phoneNo: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    setUser(state, action) {
      state._id = action.payload._id;
      state.USN = action.payload.USN;
      state.name = action.payload.Name;
      state.emailID = action.payload.emailID;
      state.phoneNo = action.payload.phoneNo;
    },
    resetUser(state) {
      state._id = "";
      state.USN = "";
      state.name = "";
      state.emailID = "";
      state.phoneNo = "";
    },
  },
});
export default userSlice;
export const userActions = userSlice.actions;
