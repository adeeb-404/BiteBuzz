import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./Studentuser.js";
import canteenUserReducer from "./CanteenUser.js";
import canteenInfoReducer from "./Canteen.js";

const store = configureStore({
  reducer: {
    user: studentReducer,
    canteen: canteenUserReducer,
    canteenInfo: canteenInfoReducer,
  },
});

export default store;
