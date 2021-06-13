import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, unfollowUserById } from "../../services/auth";
import axios from "axios";
import { getUser } from "../../services/profile";
import { followUserById } from "../../services/auth";

export const loginUserWithCredentials = createAsyncThunk(
  "auth/loginUserWithCredentials",
  async ({ email, password }) => {
    const user = await loginUser({ email, password });
    return { token: user.token, id: user.id };
  }
);

export const initializeUser = createAsyncThunk(
  "auth/initializeUser",
  async (userId) => {
    try {
      const user = await getUser(userId);
      return user;
    } catch (error) {
      console.log(error);
    }
  }
);

export const followUser = createAsyncThunk(
  "auth/followUser",
  async (variables) => {
    try {
      const followedUser = await followUserById(variables);
      return followedUser;
    } catch (error) {
      console.log(error);
    }
  }
);

export const unfollowUser = createAsyncThunk(
  "auth/unfollowUser",
  async (variables) => {
    try {
      const followedUser = await unfollowUserById(variables);
      return followedUser;
    } catch (error) {
      console.log(error);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: JSON.parse(localStorage?.getItem("authUserToken"))
      ? "tokenReceived"
      : "idle",
    userToken: JSON.parse(localStorage?.getItem("authUserToken")) || null,
    userId: JSON.parse(localStorage?.getItem("authUserId")) || null,
    isAuthenticated:
      JSON.parse(localStorage?.getItem("isAuthenticated")) || null,
    user: null,
    error: null,
  },
  reducers: {
    logoutUser: (state) => {
      console.log("here");
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("authUserToken");
      localStorage.removeItem("authUserId");
      return {
        status: "idle",
        userToken: null,
        userId: null,
        isAuthenticated: false,
        user: null,
      };
    },
  },
  extraReducers: {
    [loginUserWithCredentials.pending]: (state) => {
      state.status = "loading";
      console.log("pending");
    },
    [loginUserWithCredentials.fulfilled]: (state, action) => {
      const { token, id } = action.payload;
      state.userToken = token;
      state.userId = id;
      state.isAuthenticated = true;
      localStorage.setItem("authUserToken", JSON.stringify(token));
      localStorage.setItem("authUserId", JSON.stringify(id));
      localStorage.setItem("isAuthenticated", JSON.stringify(true));
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      state.status = "tokenReceived";
    },
    [loginUserWithCredentials.error]: (state) => {
      state.status = "error";
    },
    [initializeUser.pending]: (state) => {
      state.status = "loading";
    },
    [initializeUser.fulfilled]: (state, action) => {
      const user = action.payload;
      user.followers = user.followers.map((follower) => follower.follower_id);
      user.following = user.following.map(
        (followingItem) => followingItem.following_id
      );
      state.user = action.payload;
      state.status = "initComplete";
    },
    [initializeUser.error]: (state) => {
      state.status = "error";
    },
    [followUser.pending]: (state) => {
      state.status = "loading";
    },
    [followUser.fulfilled]: (state, action) => {
      state.user.following.push(action.payload.following_id);
      state.status = "fulfilled";
    },
    [followUser.error]: (state) => {
      state.status = "error";
    },
    [unfollowUser.pending]: (state) => {
      state.status = "loading";
    },
    [unfollowUser.fulfilled]: (state, action) => {
      console.log("unfollowing user....");
      const { following_id } = action.payload;
      const updatedFollowing = state.user.following.filter(
        (followingItem) => followingItem !== following_id
      );
      console.log("following_id ", following_id);
      console.log("updatedFollowing ", updatedFollowing);
      state.user.following = updatedFollowing;
      state.status = "fulfilled";
    },
    [unfollowUser.error]: (state) => {
      state.status = "error";
    },
  },
});

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
