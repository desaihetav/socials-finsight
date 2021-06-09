import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { Counter, Login, Profile, EditProfile } from "./features";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { initializeUser } from "./features/auth/authSlice";
import { PrivateRoute } from "./components";

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
      <div className="w-full max-w-3xl mx-auto">
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/login" element={<Login />} />
          <PrivateRoute path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/counter" element={<Counter />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
