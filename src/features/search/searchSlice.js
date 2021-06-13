import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { followUserById, getUsers } from "../../services/search";

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
      console.log(action.payload);
      state.users = action.payload;
      state.status = "fulfilled";
    },
    [getAllUsers.error]: (state) => {
      state.status = "error";
    },
  },
});

export const {} = searchSlice.actions;

export default searchSlice.reducer;
