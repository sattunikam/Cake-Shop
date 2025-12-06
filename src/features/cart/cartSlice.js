import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addCake: (state, action) => {
      const product = action.payload;
      // const existingProduct = state.items.find((t) => t.id === product.id);
const existingProduct = state.items.find((item) => item.id === product.id);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },
    incrementQty: (state, action) => {
      const item = state.items.find((t) => t.id === action.payload);
      if (item) item.quantity += 1;
    },
    decrementQty: (state, action) => {
      const item = state.items.find((t) => t.id === action.payload);
      if (item) {
        item.quantity -= 1;
        if (item.quantity <= 0) {
          state.items = state.items.filter((t) => t.id !== action.payload);
        }
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);

    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addCake, incrementQty, decrementQty, removeFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
