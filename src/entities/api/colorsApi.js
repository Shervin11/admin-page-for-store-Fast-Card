import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API from "../../shared/config/api";

export const getColors = createAsyncThunk("color/getColors", async () => {
  try {
    let { data } = await axios.get(`${API}Color/get-colors`);
    return data.data    
} catch (error) {
    console.error(error);
  }
});