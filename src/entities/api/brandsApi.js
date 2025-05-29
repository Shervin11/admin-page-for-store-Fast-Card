import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API from "../../shared/config/api";

export const getBrands = createAsyncThunk("brand/getBrands", async () => {
  try {
    let { data } = await axios.get(`${API}Brand/get-brands`);
    return data.data;
  } catch (error) {
    console.error(error);
  }
});

export const deleteBrands = createAsyncThunk("brand/deleteBrands", async (id, {dispatch}) => {
  try {
    await axios.delete(`${API}Brand/delete-brand?id=${id}`, {
      headers: {Authorization: `Bearer ${localStorage.getItem('adminToken')}`}
    });
    dispatch(getBrands())
  } catch (error) {
    console.error(error);
  }
});

export const addBrands = createAsyncThunk("brand/addBrands", async (name, {dispatch}) => {
  try {
    await axios.post(`${API}Brand/add-brand?BrandName=${name}`, {}, {
      headers: {Authorization: `Bearer ${localStorage.getItem('adminToken')}`}
    });
    dispatch(getBrands())
  } catch (error) {
    console.error(error);
  }
});