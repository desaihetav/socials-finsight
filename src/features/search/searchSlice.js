import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUsers } from "../../services/search";

export const getAllUsers = createAsyncThunk("search/getAllUsers", async () => {
  try {
    const users = await getUsers();
    return users;
  } catch (error) {
    console.log(error);
  }
});

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    status: "idle",
    error: "",
    users: [],
  },
  reducers: {},
  extraReducers: {
    [getAllUsers.pending]: (state) => {
      state.status = "loading";
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.users = action.payload;
      state.status = "fulfilled";
    },
    [getAllUsers.rejected]: (state) => {
      state.status = "error";
    },
  },
});

export default searchSlice.reducer;
