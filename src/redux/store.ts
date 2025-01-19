import { configureStore } from "@reduxjs/toolkit";
import catsSlice from "./slices/catsSlice";
import navbarSlice from "./slices/navbarSlice";

const store = configureStore({
  reducer: {
    catsSlice: catsSlice,
    navbarSlice: navbarSlice
  },
});

export default store;
