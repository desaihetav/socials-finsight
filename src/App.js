import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import {
  Login,
  Signup,
  Profile,
  EditProfile,
  Followers,
  Following,
  Home,
  Notifications,
  Search,
  Post,
} from "./features";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { initializeUser } from "./features/auth/authSlice";
import { PrivateRoute, Sidebar } from "./components";
import { loadAllPosts } from "./features/posts/postsSlice";

function App() {
  const dispatch = useDispatch();
  const { status, userId, userToken } = useSelector((state) => state.auth);
  const { status: postsStatus } = useSelector((state) => state.posts);

  useEffect(() => {
    if (status === "tokenReceived") {
      axios.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
      dispatch(initializeUser(userId));
    }
    postsStatus === "idle" &&
      status === "initComplete" &&
      dispatch(loadAllPosts(userId));
  }, [status, userId, userToken, postsStatus, dispatch]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <div className="bg-gray-900 min-h-screen text-gray-50 flex flex-col px-4">
        <div className="w-full max-w-7xl mx-auto flex">
          <div
            className={`w-full -ml-4 sm:w-24 md:w-5/12 md:flex-grow md:max-w-xs sm:ml-0 sm:mr-6 fixed z-10 sm:sticky bottom-0 sm:top-0 sm:h-full`}
          >
            <Sidebar />
          </div>
          <div className="w-full">
            <div className="w-full flex items-center justify-center py-4 border-b border-gray-700">
              <img src="/icons/finsight.svg" alt="" />
            </div>
            <Routes>
              <PrivateRoute path="/" element={<Home />} />
              <PrivateRoute
                path="/profile/:profileUserId"
                element={<Profile />}
              />
              <PrivateRoute
                path="/profile/:profileUserId/followers"
                element={<Followers />}
              />
              <PrivateRoute
                path="/profile/:profileUserId/following"
                element={<Following />}
              />
              <PrivateRoute path="/profile/edit" element={<EditProfile />} />
              <PrivateRoute path="/notifications" element={<Notifications />} />
              <PrivateRoute path="/search" element={<Search />} />
              <PrivateRoute path="/post/:postId" element={<Post />} />
            </Routes>
          </div>
        </div>
      </div>
    </Routes>
  );
}

export default App;
