import { createSlice } from "@reduxjs/toolkit";

const canteensInitialState = { data: [] };

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
