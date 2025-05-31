import { createSlice } from "@reduxjs/toolkit";
import { getSubCategory } from "../api/subCategoryApi";

export const subCategorySlice = createSlice({
  name: "subCategory",
  initialState: {
    subCategory: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSubCategory.fulfilled, (state, action) => {
      state.subCategory = action.payload;
    });
    
  },
});

export default subCategorySlice.reducer;
