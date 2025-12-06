import { createSlice } from "@reduxjs/toolkit";

const cakeSlice = createSlice({
  name: "cakes",
  initialState: {
    cakeProduct: [
      { id:1, name: "Cheese Cake", price: 50, image: "./cakes/cake1.png" },
      { id:2, name: "Redberry Cake", price: 340, image: "./cakes/cake2.png" },
      { id:3, name: "Strawberry Cake", price: 450, image: "./cakes/cake3.png" },
      { id:4, name: "Cup Cake", price: 50, image: "./cakes/cake4.png" },
      { id:5, name: "Chocolate Cake", price: 400, image: "./cakes/cake5.png" },
      { id:6, name: "Fruit Cake", price: 350, image: "./cakes/cake6.png" },
    ],
  },
  reducers: {}, // static list, no actions needed
});

export default cakeSlice.reducer;
