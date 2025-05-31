import { createSlice } from "@reduxjs/toolkit";
import { getColors } from "../api/colorsApi";

export const colorSlice = createSlice({
  name: "color",
  initialState: {
    colors: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getColors.fulfilled, (state, action) => {
      state.colors = action.payload;
    });
    
  },
});

export default colorSlice.reducer;
