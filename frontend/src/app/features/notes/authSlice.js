// features/auth/authSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  error: null,
};

const baseURL = process.env.REACT_APP_API_URL;

export const signupUser = createAsyncThunk("auth/signupUser", async (userData) => {
  try {
    const response = await axios.post(`${baseURL}/users/signup`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
});

export const loginUser = createAsyncThunk("auth/loginUser", async (userData) => {
  try {
    const response = await axios.post(`${baseURL}/users/login`, userData);
    console.log(response)
    return response.data.user;
  } catch (error) {
    console.log("error",error)
    throw error.response.data.message;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log(action.error.message)
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
