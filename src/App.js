import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { Counter, Login, Profile, EditProfile, Home } from "./features";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { initializeUser } from "./features/auth/authSlice";
import { PrivateRoute, Sidebar } from "./components";

function App() {
  const dispatch = useDispatch();
  const { status, userId, userToken } = useSelector((state) => state.auth);

  useEffect(() => {
    if (status === "tokenReceived") {
      axios.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
      console.log("dispatching with userId: ", userId);
      dispatch(initializeUser(userId));
    }
  }, [status]);

  return (
    <div className="bg-gray-900 min-h-screen text-gray-50 flex flex-col px-4">
      <div className="w-full max-w-7xl mx-auto flex">
        <div
          className={`w-full -ml-4 sm:w-24 md:w-5/12 md:flex-grow md:max-w-xs sm:ml-0 sm:mr-6 fixed sm:static bottom-0 sm:h-full`}
        >
          <Sidebar />
        </div>
        <div className="w-full">
          <div className="w-full flex items-center justify-center py-4 border-b border-gray-700">
            <img src="/icons/finsight.svg" alt="" />
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <PrivateRoute path="/profile" element={<Profile />} />
            <Route path="/profile/edit" element={<EditProfile />} />
            <Route path="/counter" element={<Counter />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
