import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "/src/entities/productSlice/productSlice"
import categorySlice from "/src/entities/categorySlice/categorySlice";
import brandSlice from "../entities/brandSlice/brandsSlice";

export const store = configureStore({
  reducer: {
    product: ProductSlice,
    category: categorySlice,
    brand: brandSlice
  },
});
