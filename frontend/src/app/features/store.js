import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./notes/notesSlice";
import authReducer from "./notes/authSlice";

export const store = configureStore({
  reducer: {
    notes: notesReducer,
    auth : authReducer
  },
});
