import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "idle",
    userToken: JSON.parse(localStorage?.getItem("authUserToken")) || null,
  },
  reducers: {
    loginUser: (state, action) => {},
  },
  extraReducers: {},
});

export const {} = authSlice.actions;

export default authSlice.reducer;
