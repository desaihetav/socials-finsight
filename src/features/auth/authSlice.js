import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, signupUser, unfollowUserById } from "../../services/auth";
import { getUser } from "../../services/profile";
import { followUserById } from "../../services/auth";

export const loginUserWithCredentials = createAsyncThunk(
  "auth/loginUserWithCredentials",
  async ({ email, password }) => {
    // const user = await loginUser({ email, password });
    // return { token: user.token, id: user.id };
    const response = await loginUser({ email, password });
    if (response.data.errors) {
      throw new Error(response.data.errors[0].message);
    }
    const user = response.data.data.login;

    return { token: user.token, id: user.id };
  }
);

export const signupUserWithCredentials = createAsyncThunk(
  "auth/signupUserWithCredentials",
  async (variables) => {
    const response = await signupUser(variables);
    if (response.data.errors) {
      throw new Error(response.data.errors[0].message);
    }
    const user = response.data.data.signup;
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
    logoutUser: () => {
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
    resetAuthStatus: (state) => {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: {
    [loginUserWithCredentials.pending]: (state) => {
      state.status = "loading";
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
    [loginUserWithCredentials.rejected]: (state, action) => {
      console.log("error");
      state.status = "error";
      state.error = action.error.message;
    },
    [signupUserWithCredentials.pending]: (state) => {
      state.status = "loading";
      console.log("pending");
    },
    [signupUserWithCredentials.fulfilled]: (state, action) => {
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
    [signupUserWithCredentials.rejected]: (state, action) => {
      console.log(action);
      state.status = "error";
      state.error = action.error.message;
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

export const { resetAuthStatus, logoutUser } = authSlice.actions;

export default authSlice.reducer;
