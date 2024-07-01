import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./Studentuser.js";
import canteenUserReducer from "./CanteenUser.js";
import canteenInfoReducer from "./Canteen.js";
import cartReducer from "./Cart.js";

const store = configureStore({
  reducer: {
    user: studentReducer,
    canteen: canteenUserReducer,
    canteenInfo: canteenInfoReducer,
    cart: cartReducer,
  },
});

export default store;
