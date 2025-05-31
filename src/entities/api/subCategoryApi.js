import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API from "../../shared/config/api";

export const getSubCategory = createAsyncThunk("subCategory/getBrands", async () => {
  try {
    let { data } = await axios.get(`${API}SubCategory/get-sub-category`);
    return data.data;
  } catch (error) {
    console.error(error);
  }
});
