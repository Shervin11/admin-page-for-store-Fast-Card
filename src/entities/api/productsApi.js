import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API from "../../shared/config/api";

export const getProduct = createAsyncThunk("product/getProduct", async () => {
  try {
    let { data } = await axios.get(`${API}Product/get-products?PageSize=1000`);
    return data.data.products
  } catch (error) {
    console.error(error);
  }
});

export const addProduct = createAsyncThunk("product/addProduct", async (form, { dispatch }) => {
  try {
    await axios.post(`${API}Product/add-product`, form, {
      headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
    });
    dispatch(getProduct())
  } catch (error) {
    console.error(error);
  }
});

export const deleteProduct = createAsyncThunk("table/deleteProduct", async (id, {dispatch}) => {
  try {
    const { data } = await axios.delete(
      `${API}Product/delete-product?id=${id}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
      }
    );
    dispatch(getProduct())
  } catch (error) {
    console.error(error);
  }
});