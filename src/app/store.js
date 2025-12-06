import { configureStore } from "@reduxjs/toolkit";
import cakesReducer from "../features/cakes/cakeSlice";
import cartReducer from "../features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    cakes: cakesReducer,
    cart: cartReducer,
  },
});
