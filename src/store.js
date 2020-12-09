import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "./pages/Main/mainSlice";

export default configureStore({
  reducer: {
    main: mainReducer,
  },
});
