import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../shared/config/api";
import axios from "axios";


export const logFunc = createAsyncThunk("product/logFunc", async (obj) => {
  try {
    let { data } = await axios.post(`${API}Account/login`, obj);
    localStorage.setItem("adminToken", data.data);
  } catch (error) {
      console.error(error);
  }
});
