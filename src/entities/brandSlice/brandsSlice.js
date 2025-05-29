import { createSlice } from "@reduxjs/toolkit";
import { getBrands } from "../api/brandsApi";

export const brandSlice = createSlice({
  name: "brand",
  initialState: {
    brands: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBrands.fulfilled, (state, action) => {
      state.brands = action.payload;
    });
    
  },
});

export default brandSlice.reducer;
