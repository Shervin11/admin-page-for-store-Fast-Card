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

export const getProductById = createAsyncThunk("product/getProductById", async (id) => {
  try {
    let { data } = await axios.get(`${API}Product/get-product-by-id?id=${id}`);
    return data.data
  } catch (error) {
    console.error(error);
  }
});

export const editProduct = createAsyncThunk("product/editProduct", async (obj) => {
  try {
    let res = await axios.put(`${API}Product/update-product?Id=${obj.id}&BrandId=${obj.brandId}&ColorId=${obj.colorId}&ProductName=${obj.productName}&Description=${obj.description}&Quantity=${obj.quantity}&Weight=${obj.weight}&Size=${obj.size}&Code=${obj.code}&Price=${obj.price}&HasDiscount=${obj.hasDiscount}&DiscountPrice=${obj.discountPrice}&SubCategoryId=${obj.subCategory}`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` } 
    });
    console.log(res);
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