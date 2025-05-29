import { createSlice } from "@reduxjs/toolkit";
import { getCategory } from "../api/categoryApi";

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategory.fulfilled, (state, action) => {
      state.categories = action.payload;
    });   
  },
});

export default categorySlice.reducer;
