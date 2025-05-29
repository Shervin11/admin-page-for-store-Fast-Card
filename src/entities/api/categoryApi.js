import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../shared/config/api";
import axios from "axios";


export const getCategory = createAsyncThunk("category/getCategory", async () => {
  try {
    let { data } = await axios.get(`${API}Category/get-categories`);
    return data.data;
  } catch (error) {
    console.error(error);
  }
});