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

export const deleteSubCategory = createAsyncThunk(
  "subCategory/deleteSubCategory",
  async (id, { dispatch }) => {
    try {
      await axios.delete(`${API}SubCategory/delete-sub-category?id=${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
      });
      dispatch(getSubCategory());
    } catch (error) {
      console.error(error);
    }
  }
);

export const addSubCategory = createAsyncThunk(
  "subCategory/addSubCategory",
  async (subCategory, { dispatch }) => {
    try {
      await axios.post(
        `${API}SubCategory/add-sub-category?CategoryId=${subCategory.CategoryId}&SubCategoryName=${subCategory.subCategoryName}`,{},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
        }
      );
      dispatch(getSubCategory());
    } catch (error) {
      console.error(error);
    }
  }
);