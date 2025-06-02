import { createSlice } from "@reduxjs/toolkit";
import { getProduct, getProductById } from "../api/productsApi";

export const ProductSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    product: {}
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder.addCase(getProductById.fulfilled, (state, action) => {
      state.product = action.payload;
    });
  },
});

export default ProductSlice.reducer;
