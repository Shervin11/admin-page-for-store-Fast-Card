import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "/src/entities/productSlice/productSlice"
import categorySlice from "/src/entities/categorySlice/categorySlice";
import brandSlice from "../entities/brandSlice/brandsSlice";
import colorSlice from "../entities/colorSlice/colorSlice";
import subCategorySlice from "../entities/subCategorySlice/subCategorySlice";

export const store = configureStore({
  reducer: {
    product: ProductSlice,
    category: categorySlice,
    brand: brandSlice,
    color: colorSlice,
    subCategory: subCategorySlice
  },
});
