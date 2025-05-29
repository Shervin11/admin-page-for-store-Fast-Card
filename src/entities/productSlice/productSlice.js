import { createSlice } from "@reduxjs/toolkit";
import { getProduct } from "../api/productsApi";
import { getCategory } from "../api/categoryApi";
import { getBrands } from "../api/brandsApi";

export const ProductSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    categories: [],
    brands: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder.addCase(getCategory.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
    builder.addCase(getBrands.fulfilled, (state, action) => {
      state.brands = action.payload;
    });
    
  },
});

export default ProductSlice.reducer;
