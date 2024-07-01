import { createSlice } from "@reduxjs/toolkit";

const cartInitialState = { data: [] };

const cart = [
  {
    name: "redcanteen",
    userId: "kjdf",
    canteenId: "lkdfsj",
    price: 0,
    arrivalTime: { type: String },
    orders: [
      {
        photo: String,
        itemName: { type: String },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        rating: {
          currRating: Number,
          noOfRating: Number,
        },
        expectedTime: { type: String, required: true },
      },
    ],
  },
  {},
];

const canteenSlice = createSlice({
  name: "canteenInfoReducer",
  initialState: canteensInitialState,
  reducers: {
    setCanteens(state, action) {
      state.data = action.payload;
    },
  },
  resetCanteens(state) {
    state.canteens = canteensInitialState.canteens;
  },
});

export const { setCanteens, resetCanteens } = canteenSlice.actions;
export default canteenSlice.reducer;
