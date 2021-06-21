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
    user: null,
  },
  reducers: {
    updateUserField: (state, action) => {
      const { key, value } = action.payload;
      state.user[key] = value;
    },
    resetProfile: () => {
      return {
        status: "idle",
        error: "",
        user: null,
      };
    },
  },
  extraReducers: {
    [getUserData.pending]: (state) => {
      state.status = "loading";
    },
    [getUserData.fulfilled]: (state, action) => {
      const user = action.payload;
      user.followers_user_ids = user.followers.map(
        (follower) => follower.follower_id
      );
      user.following_user_ids = user.following.map(
        (followingItem) => followingItem.following_id
      );
      state.user = action.payload;
      state.status = "fulfilled";
    },
    [getUserData.rejected]: (state) => {
      state.status = "error";
    },
    [updateUserData.pending]: (state) => {
      state.status = "loading";
    },
    [updateUserData.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      const user = action.payload;
      user.followers_user_ids = user.followers.map(
        (follower) => follower.follower_id
      );
      user.following_user_ids = user.following.map(
        (followingItem) => followingItem.following_id
      );
      state.user = action.payload;
      state.status = "fulfilled";
    },
    [updateUserData.rejected]: (state) => {
      state.status = "error";
    },
  },
});

export const { updateUserField, resetProfile } = profileSlice.actions;

export default profileSlice.reducer;
