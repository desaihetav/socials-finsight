import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getNotificationsForUserId } from "../../services/notifications";

export const getNotifications = createAsyncThunk(
  "notifications/getNotifications",
  async (userId) => {
    try {
      const notifications = await getNotificationsForUserId(userId);
      return notifications;
    } catch (error) {
      console.log(error);
    }
  }
);

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    status: "idle",
    error: "",
    notifications: [],
  },
  reducers: {},
  extraReducers: {
    [getNotifications.pending]: (state) => {
      state.status = "loading";
    },
    [getNotifications.fulfilled]: (state, action) => {
      state.notifications = action.payload.notifications;
      state.status = "fulfilled";
    },
    [getNotifications.rejected]: (state) => {
      state.status = "error";
    },
  },
});

export const { updateUserField } = notificationsSlice.actions;

export default notificationsSlice.reducer;
