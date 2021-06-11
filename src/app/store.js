import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import profileReducer from "../features/profile/profileSlice";
import authReducer from "../features/auth/authSlice";
import postsSlice from "../features/posts/postsSlice";
import notificationsSlice from "../features/notifications/notificationsSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    profile: profileReducer,
    auth: authReducer,
    posts: postsSlice,
    notifications: notificationsSlice,
  },
});
