import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./Studentuser.js";
import canteenReducer from "./CanteenUser.js";

const store = configureStore({
  reducer: { user: studentReducer.reducer, canteen: canteenReducer.reducer },
});

export default store;
