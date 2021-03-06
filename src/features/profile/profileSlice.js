import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUser, updateUser } from "../../services/profile";

export const getUserData = createAsyncThunk(
  "profile/getUserData",
  async (userId) => {
    try {
      const user = await getUser(userId);
      return user;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateUserData = createAsyncThunk(
  "profile/updateUserData",
  async (updatedUser) => {
    try {
      const user = await updateUser(updatedUser);
      return user;
    } catch (error) {
      console.log(error);
    }
  }
);

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    status: "idle",
    error: "",
    user: {},
  },
  reducers: {
    updateUserField: (state, action) => {
      const { key, value } = action.payload;
      state.user[key] = value;
    },
  },
  extraReducers: {
    [getUserData.pending]: (state) => {
      state.status = "loading";
    },
    [getUserData.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.status = "fulfilled";
    },
    [getUserData.error]: (state) => {
      state.status = "error";
    },
    [updateUserData.pending]: (state) => {
      state.status = "loading";
      console.log("pending");
    },
    [updateUserData.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.user = action.payload;
    },
    [updateUserData.error]: (state) => {
      state.status = "error";
    },
  },
});

export const { updateUserField } = profileSlice.actions;

export default profileSlice.reducer;
