import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser } from "../../services/auth";
import axios from "axios";
import { getUser } from "../../services/profile";

export const loginUserWithCredentials = createAsyncThunk(
  "auth/loginUserWithCredentials",
  async ({ email, password }) => {
    try {
      const user = await loginUser({ email, password });
      return { token: user.token, id: user.id };
    } catch (error) {
      console.log(error);
    }
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
      state.user = action.payload;
      state.status = "initComplete";
    },
    [initializeUser.error]: (state) => {
      state.status = "error";
    },
  },
});

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
